import { up } from 'up-fetch';
import { APIPromise, PagePromise } from './api-promise.js';
import { APIConnectionError, APIConnectionTimeoutError, APIError, NuntlyError } from './error.js';
import { CursorPage } from './pagination.js';
import { parseRetryAfter } from './retry-after.js';
import type {
  BackoffStrategy,
  ClientOptions,
  CursorPageParams,
  CursorPageResponse,
  Hooks,
  HttpMethod,
  Logger,
  RequestContext,
  RequestOptions,
  RetryStrategy,
} from './types.js';
import { SDK_VERSION } from './version.js';

const DEFAULT_BASE_URL = 'https://api.nuntly.com';
const DEFAULT_TIMEOUT = 60_000;
const DEFAULT_MAX_RETRIES = 2;
// 409 is a deterministic business conflict: a retry only adds latency.
const RETRYABLE_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504]);
const DEFAULT_BACKOFF: Required<BackoffStrategy> = { initialInterval: 500, maxInterval: 8000, exponent: 2 };
// A longer Retry-After is not waited on: the caller gets that response's error at once.
const MAX_RETRY_AFTER_MS = 60_000;

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

// Wraps an error thrown by a caller hook, so it is never retried and reaches the caller unchanged.
class HookError extends Error {
  constructor(readonly hookError: unknown) {
    super('hook failed');
  }
}

async function runHook(call: () => void | Promise<void> | undefined): Promise<void> {
  try {
    await call();
  } catch (error) {
    throw new HookError(error);
  }
}

function shouldRetry(
  request: Request,
  response: Response | undefined,
  error: unknown,
  callerSignal?: AbortSignal,
): boolean {
  // A caller abort, including the caller's own AbortSignal.timeout, is never retried.
  if (callerSignal?.aborted || error instanceof HookError) return false;
  // A POST without Idempotency-Key may already have been applied: only a 429 is safe to replay.
  const replaySafe = request.method !== 'POST' || request.headers.has('idempotency-key');
  // up-fetch keeps the previous attempt's response when an attempt throws: judge the error alone.
  if (error !== undefined) {
    // A timeout or a network failure (ECONNRESET, DNS), which fetch rejects with a TypeError.
    return replaySafe && ((error as Error | null)?.name === 'TimeoutError' || error instanceof TypeError);
  }
  if (!response || response.ok) return false;
  if ((parseRetryAfter(response.headers.get('retry-after')) ?? 0) > MAX_RETRY_AFTER_MS) return false;
  // A server may force or suppress a retry via x-should-retry; obey it before the status rules.
  const header = response.headers.get('x-should-retry');
  if (header === 'true') return true;
  if (header === 'false') return false;
  return replaySafe ? RETRYABLE_STATUS_CODES.has(response.status) : response.status === 429;
}

// AbortSignal.any is missing before Node.js 20.3. The listeners go once the timeout fires, so a long-lived caller signal does not collect them.
function anySignal(caller: AbortSignal, timeout: AbortSignal): AbortSignal {
  if ('any' in AbortSignal) return AbortSignal.any([caller, timeout]);
  const controller = new AbortController();
  for (const signal of [caller, timeout]) {
    if (signal.aborted) {
      controller.abort(signal.reason);
      break;
    }
    signal.addEventListener('abort', () => controller.abort(signal.reason), { once: true, signal: controller.signal });
  }
  return controller.signal;
}

function buildRetryConfig(retry: RetryStrategy | undefined, maxRetries: number) {
  if (retry === 'none') return { attempts: 0 };

  const backoff = typeof retry === 'object' ? { ...DEFAULT_BACKOFF, ...retry.backoff } : DEFAULT_BACKOFF;

  return {
    attempts: maxRetries,
    delay: ({ response, error, attempt }: { response: Response | undefined; error: unknown; attempt: number }) => {
      // Honor a server-sent Retry-After (seconds or HTTP-date) on any response,
      // not just 429 (e.g. 503 during maintenance). After an attempt that threw,
      // `response` is the previous attempt's, so the backoff applies.
      const retryAfterMs =
        error === undefined ? parseRetryAfter(response?.headers.get('retry-after') ?? null) : undefined;
      if (retryAfterMs !== undefined) return retryAfterMs;
      // up-fetch counts attempts from 1: the first retry waits initialInterval.
      return (
        Math.min(backoff.initialInterval * backoff.exponent ** (attempt - 1), backoff.maxInterval) *
        (0.75 + 0.25 * Math.random())
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
  h.forEach((v, k) => {
    out[k] = v;
  });
  return out;
}

// Repeat the key for array values (`format=html&format=text`), the form the API reads as a list.
function serializeParams(params: Record<string, unknown>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    for (const item of Array.isArray(value) ? value : [value]) search.append(key, String(item));
  }
  return search.toString();
}

function resolvePath(template: string, pathParams?: Record<string, unknown>): string {
  if (!pathParams) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const value = pathParams[key];
    if (value === undefined || value === null) {
      throw new NuntlyError(`Missing path param '${key}' for path '${template}'.`);
    }
    const segment = String(value);
    // The URL parser resolves these into another route: `/contacts/../segments/seg_1` is `/segments/seg_1`.
    if (segment === '' || segment === '.' || segment === '..') {
      throw new NuntlyError(`Path param '${key}' must not be '${segment}'.`);
    }
    return encodeURIComponent(segment);
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
  private readonly retryEnabled: boolean;
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
    this.retryEnabled = options.retry !== 'none';
    this.log = options.logger ?? (options.debug ? console : NOOP_LOGGER);
    this.hooks = options.hooks ?? {};

    const fetchFn = (options.fetch ?? globalThis.fetch) as typeof fetch;
    // The timeout bounds each attempt's fetch, not the wait before a retry: up-fetch would
    // abort a Retry-After wait with its own per-attempt timeout signal.
    const timedFetch = ((input: Request, init: RequestInit & { attemptTimeout: number }) => {
      const timeout = AbortSignal.timeout(init.attemptTimeout);
      return fetchFn(input, { ...init, signal: init.signal ? anySignal(init.signal, timeout) : timeout });
    }) as typeof fetch;

    const headers: Record<string, string> = {
      // User-supplied `defaultHeaders` come first so Authorization / User-Agent
      // (set below) always override them. Per-request `RequestOptions.headers`
      // is applied later by up-fetch and wins over everything here.
      ...options.defaultHeaders,
      Authorization: `Bearer ${this.apiKey}`,
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

    this.http = up(timedFetch, () => ({
      baseUrl: this.baseUrl,
      headers,
      serializeParams,
      retry: buildRetryConfig(options.retry, this.maxRetries),
      parseRejected: async (response: Response) => {
        // Read once: a failed json() consumes the stream and a text() fallback would throw.
        const text = await response.text();
        let body: unknown = text;
        try {
          body = JSON.parse(text);
        } catch {}
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

    let resolvedPath: string;
    try {
      resolvedPath = resolvePath(args.path, args.pathParams);
    } catch (error) {
      const rejected = Promise.reject(error);
      return APIPromise.fromPromises(rejected, rejected);
    }
    let reqCtx: RequestContext | undefined;
    let capturedResponse: Response | undefined;

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
        this.log.debug(`-> ${reqCtx.method} ${reqCtx.url}`);
        const ctx = reqCtx;
        await runHook(() => this.hooks.onRequest?.(ctx));
      },
      onResponse: async (response: Response | undefined) => {
        // up-fetch invokes onResponse even when the request failed before a
        // response arrived (timeout, abort, connection error). Bail out so the
        // real error surfaces through onError instead of a TypeError here.
        if (!response) return;
        capturedResponse = response;
        const requestId = response.headers.get('x-request-id') ?? '';
        this.log.info(`<- ${response.status} ${args.method} ${resolvedPath}${requestId ? ` [${requestId}]` : ''}`);
        if (reqCtx) {
          const request = reqCtx;
          await runHook(() => this.hooks.onResponse?.({ request, response }));
        }
        // The caller gets its own copy: the SDK reads the original body to build the data or the error.
        resolveResponse(response.clone());
      },
      onSuccess: async (data: unknown) => {
        if (reqCtx && capturedResponse) {
          const ctx = { request: reqCtx, response: capturedResponse, data };
          await runHook(() => this.hooks.onSuccess?.(ctx));
        }
      },
      onError: async (error: unknown) => {
        if (error instanceof HookError) return;
        const normalized = normalizeError(error);
        this.log.error(`!! ${args.method} ${resolvedPath} failed: ${normalized.message}`);
        if (reqCtx) {
          const ctx = { request: reqCtx, response: capturedResponse, error: normalized };
          await runHook(() => this.hooks.onError?.(ctx));
        }
      },
      onRetry: async (ctx: { attempt: number; response: Response | undefined; error: unknown; request: Request }) => {
        if (!reqCtx) return;
        this.log.warn(`~> Retry #${ctx.attempt} ${reqCtx.method} ${reqCtx.url}`);
        const retryCtx = {
          request: reqCtx,
          attempt: ctx.attempt,
          response: ctx.response,
          error: ctx.error !== undefined ? normalizeError(ctx.error) : undefined,
        };
        await runHook(() => this.hooks.onRetry?.(retryCtx));
      },
    };

    opts.attemptTimeout = args.options?.timeout ?? this.timeout;

    // Always set `when`: without it up-fetch retries every non-2xx with no delay.
    opts.retry = {
      ...(args.options?.maxRetries !== undefined ? { attempts: args.options.maxRetries } : {}),
      when: ({ request, response, error }: { request: Request; response: Response | undefined; error: unknown }) =>
        this.retryEnabled && shouldRetry(request, response, error, args.options?.signal),
    };

    const dataPromise = (async (): Promise<T> => {
      try {
        return (await this.http(resolvedPath as unknown as Request, opts as never)) as T;
      } catch (error) {
        const failure = error instanceof HookError ? error.hookError : error;
        // Surface the failure on `responsePromise` so consumers of
        // `.asResponse()` observe it instead of hanging when no response
        // was ever received.
        rejectResponse(failure);
        throw error instanceof HookError ? failure : normalizeError(error);
      }
    })();

    return APIPromise.fromPromises(dataPromise, responsePromise);
  }

  get<T>(args: {
    path: string;
    pathParams?: Record<string, unknown>;
    query?: Record<string, unknown>;
    options?: RequestOptions;
  }): APIPromise<T> {
    return this.request<T>({ method: 'GET', ...args });
  }

  post<T>(args: {
    path: string;
    pathParams?: Record<string, unknown>;
    body?: unknown;
    options?: RequestOptions;
  }): APIPromise<T> {
    return this.request<T>({ method: 'POST', ...args });
  }

  put<T>(args: {
    path: string;
    pathParams?: Record<string, unknown>;
    body?: unknown;
    options?: RequestOptions;
  }): APIPromise<T> {
    return this.request<T>({ method: 'PUT', ...args });
  }

  patch<T>(args: {
    path: string;
    pathParams?: Record<string, unknown>;
    body?: unknown;
    options?: RequestOptions;
  }): APIPromise<T> {
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
      return new CursorPage<T>(response, params, (nextParams) =>
        this.get<CursorPageResponse<T>>({ ...args, query: nextParams as Record<string, unknown> }),
      );
    })();
    return PagePromise.fromPagePromises<CursorPage<T>, T>(pagePromise, firstResponse.asResponse());
  }
}
