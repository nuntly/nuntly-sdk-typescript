import { up } from 'up-fetch';
import { APIError, APIConnectionError, APIConnectionTimeoutError } from './error.js';
import { CursorPage } from './pagination.js';
import type { Logger, Hooks, BackoffStrategy, RetryStrategy, ClientOptions, RequestOptions, ResponseWithData, CursorPageResponse, CursorPageParams } from './types.js';
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

function buildRetryConfig(retry: RetryStrategy | undefined, maxRetries: number) {
  if (retry === 'none') return { attempts: 0 };

  const backoff = typeof retry === 'object' ? { ...DEFAULT_BACKOFF, ...retry.backoff } : DEFAULT_BACKOFF;

  return {
    attempts: maxRetries,
    delay: ({ response, attempt }: { response: Response | undefined; attempt: number }) => {
      if (response?.status === 429) {
        const retryAfter = response.headers.get('retry-after');
        if (retryAfter) {
          const seconds = Number(retryAfter);
          if (!Number.isNaN(seconds)) return seconds * 1000;
        }
      }
      return Math.min(backoff.initialInterval * backoff.exponent ** attempt, backoff.maxInterval)
        * (0.75 + 0.25 * Math.random());
    },
    when: ({ response, error }: { response: Response | undefined; error: unknown }) =>
      (error as Error | null)?.name === 'TimeoutError' ||
      (response != null && RETRYABLE_STATUS_CODES.has(response.status)),
  };
}

const NOOP_LOGGER: Logger = {
  debug: () => {},
  info: () => {},
  warn: () => {},
  error: () => {},
};

export class NuntlyClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly timeout: number;
  private readonly maxRetries: number;
  private readonly log: Logger;
  private readonly hooks: Hooks;
  private readonly http: ReturnType<typeof up>;
  private _lastResponse: Response | undefined;

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
    const requestTimings = new WeakMap<Request, number>();

    const headers: Record<string, string> = {
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

    const retryConfig = buildRetryConfig(options.retry, self.maxRetries);

    this.http = up(fetchFn, () => ({
      baseUrl: self.baseUrl,
      timeout: self.timeout,
      headers,
      retry: retryConfig,
      parseRejected: async (response: Response) => {
        let body: unknown;
        try { body = await response.json(); } catch { body = await response.text(); }
        return APIError.from(response.status, body, response.headers, response);
      },
      onRequest: async (request: Request) => {
        requestTimings.set(request, performance.now());
        self.log.debug(`-> ${request.method} ${request.url}`);
        await self.hooks.onRequest?.(request);
      },
      onResponse: async (response: Response, request: Request) => {
        self._lastResponse = response;
        const start = requestTimings.get(request);
        const duration = start ? Math.round(performance.now() - start) : 0;
        const requestId = response.headers.get('x-request-id') ?? '';
        self.log.info(`<- ${response.status} ${request.method} ${request.url} (${duration}ms)${requestId ? ` [${requestId}]` : ''}`);
        await self.hooks.onResponse?.(response, request);
      },
      onSuccess: async (data: unknown, request: Request) => {
        await self.hooks.onSuccess?.(data, request);
      },
      onRetry: async (ctx: { attempt: number; response: Response | undefined; error: unknown; request: Request }) => {
        self.log.warn(`~> Retry #${ctx.attempt} ${ctx.request.method} ${ctx.request.url}`);
        await self.hooks.onRetry?.(ctx);
      },
      onError: async (error: unknown, request: Request) => {
        self.log.error(`!! ${request.method} ${request.url} failed: ${error instanceof Error ? error.message : String(error)}`);
        await self.hooks.onError?.(error, request);
      },
    }));
  }

  private buildOptions(base: Record<string, unknown>, requestOptions?: RequestOptions): Record<string, unknown> {
    const opts: Record<string, unknown> = {
      ...base,
      timeout: requestOptions?.timeout,
      headers: requestOptions?.headers as Record<string, string> | undefined,
      signal: requestOptions?.signal,
    };
    if (requestOptions?.maxRetries !== undefined) {
      opts.retry = { attempts: requestOptions.maxRetries };
    }
    return opts;
  }

  private async request<T>(path: string, options: Record<string, unknown>): Promise<T> {
    try {
      return await this.http(path as unknown as Request, options as never);
    } catch (error) {
      if (error instanceof APIError) throw error;
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new APIConnectionTimeoutError(error);
      }
      if (error instanceof Error && error.name === 'TimeoutError') {
        throw new APIConnectionTimeoutError(error);
      }
      if (error instanceof TypeError) {
        throw new APIConnectionError(error.message, error);
      }
      throw new APIConnectionError(
        error instanceof Error ? error.message : 'Request failed',
        error instanceof Error ? error : undefined,
      );
    }
  }

  async get<T>(path: string, query?: Record<string, unknown>, requestOptions?: RequestOptions): Promise<T> {
    return this.request(path, this.buildOptions({ method: 'GET', params: query }, requestOptions));
  }

  async post<T>(path: string, body?: unknown, requestOptions?: RequestOptions): Promise<T> {
    return this.request(path, this.buildOptions({ method: 'POST', body: body as Record<string, unknown> }, requestOptions));
  }

  async put<T>(path: string, body?: unknown, requestOptions?: RequestOptions): Promise<T> {
    return this.request(path, this.buildOptions({ method: 'PUT', body: body as Record<string, unknown> }, requestOptions));
  }

  async patch<T>(path: string, body?: unknown, requestOptions?: RequestOptions): Promise<T> {
    return this.request(path, this.buildOptions({ method: 'PATCH', body: body as Record<string, unknown> }, requestOptions));
  }

  async delete<T>(path: string, requestOptions?: RequestOptions): Promise<T> {
    return this.request(path, this.buildOptions({ method: 'DELETE' }, requestOptions));
  }

  async list<T>(
    path: string,
    query?: Record<string, unknown>,
    requestOptions?: RequestOptions,
  ): Promise<CursorPage<T>> {
    const params: CursorPageParams = (query as CursorPageParams) ?? {};
    const response = await this.get<CursorPageResponse<T>>(path, query, requestOptions);
    return new CursorPage<T>(
      response,
      params,
      (nextParams) => this.get<CursorPageResponse<T>>(path, nextParams as Record<string, unknown>, requestOptions),
    );
  }

  get lastResponse(): Response | undefined {
    return this._lastResponse;
  }
}
