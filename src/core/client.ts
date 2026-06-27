import { up } from 'up-fetch';
import { APIPromise, PagePromise } from './api-promise.js';
import { APIError, APIConnectionError, APIConnectionTimeoutError } from './error.js';
import { CursorPage } from './pagination.js';
import type {
  Logger,
  Hooks,
  HttpMethod,
  RequestContext,
  BackoffStrategy,
  RetryStrategy,
  ClientOptions,
  RequestOptions,
  CursorPageResponse,
  CursorPageParams,
} from './types.js';
import { SDK_VERSION } from './version.js';

const DEFAULT_BASE_URL = 'https://api.nuntly.com';
const DEFAULT_TIMEOUT = 60_000;
const DEFAULT_MAX_RETRIES = 2;
const RETRYABLE_STATUS_CODES = new Set([408, 409, 429, 500, 502, 503, 504]);
const DEFAULT_BACKOFF: Required<BackoffStrategy> = { initialInterval: 500, maxInterval: 8000, exponent: 2 };

declare const Deno: unknown;
declare const Bun: unknown;
declare const EdgeRuntime: unknown;
declare const window: unknown;

function isBrowserLike(): boolean {
  const gt: unknown = typeof globalThis === 'undefined' ? null : globalThis;
  if (typeof gt === 'object' && gt != null && 'importScripts' in gt) return true;
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) return true;
  if (typeof window === 'object' && typeof (window as any).document !== 'undefined') return true;
  return false;
}

function detectPlatform(): string {
  if (typeof Deno !== 'undefined') return `Deno/${(Deno as any).version?.deno ?? 'unknown'}`;
  if (typeof Bun !== 'undefined') return `Bun/${(Bun as any).version ?? 'unknown'}`;
  if (typeof EdgeRuntime !== 'undefined') return 'Edge';
  if (typeof process !== 'undefined' && process.versions?.node) return `Node/${process.versions.node}`;
  if (isBrowserLike()) return 'Browser';
  return 'Unknown';
}

// `Retry-After` may be a number of seconds or an HTTP-date (RFC 9110). Returns
// the delay in milliseconds, or undefined when the header is absent/unparseable.
function parseRetryAfter(value: string | null): number | undefined {
  if (!value) return undefined;
  const seconds = Number(value);
  if (!Number.isNaN(seconds)) return Math.max(0, seconds * 1000);
  const date = Date.parse(value);
  if (!Number.isNaN(date)) return Math.max(0, date - Date.now());
  return undefined;
}

function buildRetryConfig(retry: RetryStrategy | undefined, maxRetries: number) {
  if (retry === 'none') return { attempts: 0 };

  const backoff = typeof retry === 'object' ? { ...DEFAULT_BACKOFF, ...retry.backoff } : DEFAULT_BACKOFF;

  return {
    attempts: maxRetries,
    delay: ({ response, attempt }: { response: Response | undefined; attempt: number }) => {
      // Honor a server-sent Retry-After (seconds or HTTP-date) on any response,
      // not just 429 (e.g. 503 during maintenance).
      const retryAfterMs = parseRetryAfter(response?.headers.get('retry-after') ?? null);
      if (retryAfterMs !== undefined) return retryAfterMs;
      return Math.min(backoff.initialInterval * backoff.exponent ** attempt, backoff.maxInterval)
        * (0.75 + 0.25 * Math.random());
    },
    when: ({ response, error }: { response: Response | undefined; error: unknown }) => {
      // A server may force or suppress a retry via x-should-retry; obey it
      // before falling back to the status-code policy.
      const shouldRetry = response?.headers.get('x-should-retry');
      if (shouldRetry === 'true') return true;
      if (shouldRetry === 'false') return false;
      return (
        (error as Error | null)?.name === 'TimeoutError' ||
        (response != null && RETRYABLE_STATUS_CODES.has(response.status))
      );
    },
  };
}

function normalizeError(error: unknown): APIError | APIConnectionError {
  if (error instanceof APIError) return error;
  if (error instanceof APIConnectionError) return error;
  if (error instanceof DOMException && error.name === 'AbortError') {
    return new APIConnectionTimeoutError(error);
  }
  if (error instanceof Error && error.name === 'TimeoutError') {
    return new APIConnectionTimeoutError(error);
  }
  if (error instanceof TypeError) {
    return new APIConnectionError(error.message, error);
  }
  return new APIConnectionError(
    error instanceof Error ? error.message : 'Request failed',
    error instanceof Error ? error : undefined,
  );
}

function headersToRecord(h: Headers): Record<string, string> {
  const out: Record<string, string> = {};
  h.forEach((v, k) => { out[k] = v; });
  return out;
}

function resolvePath(template: string, pathParams?: Record<string, unknown>): string {
  if (!pathParams) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const value = pathParams[key];
    if (value === undefined || value === null) {
      throw new Error(`Missing path param '${key}' for path '${template}'.`);
    }
    return encodeURIComponent(String(value));
  });
}

const NOOP_LOGGER: Logger = {
  debug: () => {},
  info: () => {},
  warn: () => {},
  error: () => {},
};

interface InternalRequestArgs {
  method: HttpMethod;
  /** Path template with `{name}` placeholders, e.g. `/emails/{id}`. */
  path: string;
  pathParams?: Record<string, unknown>;
  body?: unknown;
  query?: Record<string, unknown>;
  options?: RequestOptions;
}

export class NuntlyClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly timeout: number;
  private readonly maxRetries: number;
  private readonly log: Logger;
  private readonly hooks: Hooks;
  private readonly http: ReturnType<typeof up>;

  constructor(options: ClientOptions) {
    const apiKey = options.apiKey ?? (typeof process !== 'undefined' ? process.env?.['NUNTLY_API_KEY'] : undefined);
    if (!apiKey) {
      throw new Error(
        'API key is required. Pass it via `new Nuntly({ apiKey })` or set the NUNTLY_API_KEY environment variable.',
      );
    }
    this.apiKey = apiKey;
    const envBaseUrl = typeof process !== 'undefined' ? process.env?.['NUNTLY_BASE_URL'] : undefined;
    this.baseUrl = (options.baseUrl ?? envBaseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, '');
    this.timeout = options.timeout ?? DEFAULT_TIMEOUT;
    this.maxRetries = options.maxRetries ?? DEFAULT_MAX_RETRIES;
    this.log = options.logger ?? (options.debug ? console : NOOP_LOGGER);
    this.hooks = options.hooks ?? {};

    const self = this;
    const fetchFn = (options.fetch ?? globalThis.fetch) as typeof fetch;

    const headers: Record<string, string> = {
      // User-supplied `defaultHeaders` come first so Authorization / User-Agent
      // (set below) always override them. Per-request `RequestOptions.headers`
      // is applied later by up-fetch and wins over everything here.
      ...options.defaultHeaders,
      Authorization: `Bearer ${self.apiKey}`,
    };
    if (!isBrowserLike()) {
      // Browsers ignore User-Agent assignment and emit a console warning,
      // so only set it on non-browser runtimes. The `@nuntly/sdk` identifier
      // is always present; `appInfo` only appends wrapper telemetry.
      const appInfoSuffix = options.appInfo
        ? ` (${options.appInfo.name}${options.appInfo.version ? `/${options.appInfo.version}` : ''})`
        : '';
      headers['User-Agent'] = `@nuntly/sdk/${SDK_VERSION}${appInfoSuffix} ${detectPlatform()}`;
    }

    this.http = up(fetchFn, () => ({
      baseUrl: self.baseUrl,
      timeout: self.timeout,
      headers,
      retry: buildRetryConfig(options.retry, self.maxRetries),
      parseRejected: async (response: Response) => {
        let body: unknown;
        try { body = await response.json(); } catch { body = await response.text(); }
        return APIError.from(response.status, body, response.headers, response);
      },
    }));
  }

  private request<T>(args: InternalRequestArgs): APIPromise<T> {
    let resolveResponse!: (response: Response) => void;
    let rejectResponse!: (reason: unknown) => void;
    const responsePromise = new Promise<Response>((res, rej) => {
      resolveResponse = res;
      rejectResponse = rej;
    });

    const resolvedPath = resolvePath(args.path, args.pathParams);
    let reqCtx: RequestContext | undefined;
    let capturedResponse: Response | undefined;
    const self = this;

    const opts: Record<string, unknown> = {
      method: args.method,
      body: args.body as never,
      params: args.query,
      headers: args.options?.headers,
      signal: args.options?.signal,
      onRequest: async (request: Request) => {
        reqCtx = {
          method: args.method,
          path: resolvedPath,
          url: request.url,
          headers: headersToRecord(request.headers),
          body: args.body,
        };
        self.log.debug(`-> ${reqCtx.method} ${reqCtx.url}`);
        await self.hooks.onRequest?.(reqCtx);
      },
      onResponse: async (response: Response | undefined) => {
        // up-fetch invokes onResponse even when the request failed before a
        // response arrived (timeout, abort, connection error). Bail out so the
        // real error surfaces through onError instead of a TypeError here.
        if (!response) return;
        capturedResponse = response;
        const requestId = response.headers.get('x-request-id') ?? '';
        self.log.info(`<- ${response.status} ${args.method} ${resolvedPath}${requestId ? ` [${requestId}]` : ''}`);
        if (reqCtx) {
          await self.hooks.onResponse?.({ request: reqCtx, response });
        }
        resolveResponse(response);
      },
      onSuccess: async (data: unknown) => {
        if (reqCtx && capturedResponse) {
          await self.hooks.onSuccess?.({ request: reqCtx, response: capturedResponse, data });
        }
      },
      onError: async (error: unknown) => {
        const normalized = normalizeError(error);
        self.log.error(`!! ${args.method} ${resolvedPath} failed: ${normalized.message}`);
        if (reqCtx) {
          await self.hooks.onError?.({
            request: reqCtx,
            response: capturedResponse,
            error: normalized,
          });
        }
      },
      onRetry: async (ctx: { attempt: number; response: Response | undefined; error: unknown; request: Request }) => {
        if (!reqCtx) return;
        self.log.warn(`~> Retry #${ctx.attempt} ${reqCtx.method} ${reqCtx.url}`);
        await self.hooks.onRetry?.({
          request: reqCtx,
          attempt: ctx.attempt,
          response: ctx.response,
          error: ctx.error !== undefined ? normalizeError(ctx.error) : undefined,
        });
      },
    };

    // Only forward a per-request timeout when the caller set one. Passing
    // `timeout: undefined` would override up-fetch's configured default and
    // leave the request with no timeout at all.
    if (args.options?.timeout !== undefined) {
      opts.timeout = args.options.timeout;
    }

    if (args.options?.maxRetries !== undefined) {
      opts.retry = { attempts: args.options.maxRetries };
    }

    const dataPromise = (async (): Promise<T> => {
      try {
        return (await this.http(resolvedPath as unknown as Request, opts as never)) as T;
      } catch (error) {
        // Surface the failure on `responsePromise` so consumers of
        // `.asResponse()` observe it instead of hanging when no response
        // was ever received.
        rejectResponse(error);
        throw normalizeError(error);
      }
    })();

    return APIPromise.fromPromises(dataPromise, responsePromise);
  }

  get<T>(args: { path: string; pathParams?: Record<string, unknown>; query?: Record<string, unknown>; options?: RequestOptions }): APIPromise<T> {
    return this.request<T>({ method: 'GET', ...args });
  }

  post<T>(args: { path: string; pathParams?: Record<string, unknown>; body?: unknown; options?: RequestOptions }): APIPromise<T> {
    return this.request<T>({ method: 'POST', ...args });
  }

  put<T>(args: { path: string; pathParams?: Record<string, unknown>; body?: unknown; options?: RequestOptions }): APIPromise<T> {
    return this.request<T>({ method: 'PUT', ...args });
  }

  patch<T>(args: { path: string; pathParams?: Record<string, unknown>; body?: unknown; options?: RequestOptions }): APIPromise<T> {
    return this.request<T>({ method: 'PATCH', ...args });
  }

  delete<T>(args: { path: string; pathParams?: Record<string, unknown>; options?: RequestOptions }): APIPromise<T> {
    return this.request<T>({ method: 'DELETE', ...args });
  }

  list<T>(args: {
    path: string;
    pathParams?: Record<string, unknown>;
    query?: Record<string, unknown>;
    options?: RequestOptions;
  }): PagePromise<CursorPage<T>, T> {
    const params: CursorPageParams = (args.query as CursorPageParams) ?? {};
    const firstResponse = this.get<CursorPageResponse<T>>(args);
    const pagePromise = (async () => {
      const response = await firstResponse;
      return new CursorPage<T>(
        response,
        params,
        (nextParams) => this.get<CursorPageResponse<T>>({ ...args, query: nextParams as Record<string, unknown> }),
      );
    })();
    return PagePromise.fromPagePromises<CursorPage<T>, T>(pagePromise, firstResponse.asResponse());
  }
}
