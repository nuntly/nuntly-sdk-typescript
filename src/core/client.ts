import { up } from 'up-fetch';
import { APIPromise, PagePromise } from './api-promise.js';
import { APIConnectionError, APIConnectionTimeoutError, APIError, describeThrown, NuntlyError } from './error.js';
import { CursorPage } from './pagination.js';
import { parseRetryAfter } from './retry-after.js';
import type {
  BackoffStrategy,
  ClientOptions,
  CursorPageParams,
  CursorPageResponse,
  ErrorContext,
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
const IDEMPOTENT_METHODS = new Set(['GET', 'PUT', 'DELETE']);
const DEFAULT_BACKOFF: Required<BackoffStrategy> = { initialInterval: 500, maxInterval: 8000, exponent: 2 };
// A longer Retry-After is not waited on: the caller gets that response's error at once.
const MAX_RETRY_AFTER_MS = 60_000;
const MAX_TIMEOUT = 2 ** 31 - 1;

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

// fetch rejects a network failure with a TypeError; these messages and errno codes tell it from a bug.
const NETWORK_ERROR_MESSAGES = new Set([
  'fetch failed', // Node.js
  'Failed to fetch', // Chromium
  'NetworkError when attempting to fetch resource.', // Firefox
  'Load failed', // Safari
  'The Internet connection appears to be offline.', // Safari
  'Network request failed', // React Native
  'Network connection lost.', // Cloudflare Workers
]);

function isNetworkError(error: unknown): boolean {
  if (!(error instanceof TypeError)) return false;
  // Bun 1.4 sets an errno code (ECONNREFUSED, ENOTFOUND, ECONNRESET); Deno prefixes its message.
  const code = (error as { code?: unknown }).code;
  return (
    NETWORK_ERROR_MESSAGES.has(error.message) ||
    (typeof code === 'string' && /^E[A-Z]+$/.test(code)) ||
    error.message.startsWith('error sending request')
  );
}

function shouldRetry(
  request: Request,
  response: Response | undefined,
  error: unknown,
  idempotent: boolean,
  callerSignal?: AbortSignal,
): boolean {
  // A caller abort, including the caller's own AbortSignal.timeout, is never retried.
  if (callerSignal?.aborted || error instanceof HookError) return false;
  // A POST or PATCH may already have been applied: only a 429 is safe to replay, unless the
  // operation is one the API deduplicates by Idempotency-Key and the request carries a key.
  const replaySafe = IDEMPOTENT_METHODS.has(request.method) || (idempotent && request.headers.has('idempotency-key'));
  // up-fetch keeps the previous attempt's response when an attempt throws: judge the error alone.
  if (error !== undefined) {
    return replaySafe && ((error as Error | null)?.name === 'TimeoutError' || isNetworkError(error));
  }
  if (!response || response.ok) return false;
  // The cap holds even against x-should-retry: true.
  if ((parseRetryAfter(response.headers.get('retry-after')) ?? 0) > MAX_RETRY_AFTER_MS) return false;
  // A server may force or suppress a retry via x-should-retry, in any letter case; obey it before the status rules.
  const header = response.headers.get('x-should-retry')?.toLowerCase();
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

function normalizeError(error: unknown, callerSignal?: AbortSignal): APIError | APIConnectionError {
  if (error instanceof APIError) return error;
  if (error instanceof APIConnectionError) return error;
  // The caller's own AbortSignal.timeout stays a timeout; any other caller abort is not one.
  if (callerSignal?.aborted && (callerSignal.reason as Error | undefined)?.name !== 'TimeoutError') {
    return new APIConnectionError('Request aborted', error instanceof Error ? error : undefined);
  }
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

// A JSON body, or the raw text when it is not JSON (a proxy's HTML error page).
function parseText(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

// Every 2xx of the API carries a JSON object; anything else is no answer the caller can use. A 2xx means the
// API may have applied the request, so the error says so before the caller retries it.
function parseSuccess(status: number, text: string): unknown {
  const fail = (what: string) =>
    new NuntlyError(`The API answered ${status} with ${what}: the request may have been applied.`);
  if (text === '') throw fail('an empty body where JSON was expected');
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    throw fail('a body that is not JSON');
  }
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    throw fail('a JSON body that is not an object');
  }
  return body;
}

// A readable copy of a response whose body the SDK already read. The text is decoded, so the
// original encoding and byte length no longer describe it.
function replayResponse(response: Response, text: string): Response {
  const { status, statusText } = response;
  const headers = new Headers(response.headers);
  headers.delete('content-encoding');
  headers.delete('content-length');
  const copy = new Response(text === '' ? null : text, { status, statusText, headers });
  Object.defineProperty(copy, 'url', { value: response.url });
  return copy;
}

// Settles in every case: with the call's own error when it fails, else with `error`.
export function rejectWithCallError(call: Promise<unknown>, error: unknown, reject: (reason: unknown) => void): void {
  call.then(() => reject(error), reject);
}

const REDACTED_AUTHORIZATION = 'Bearer [redacted]';

// Hooks see every header but the API key.
function headersToRecord(h: Headers): Record<string, string> {
  const out: Record<string, string> = {};
  h.forEach((v, k) => {
    out[k] = k === 'authorization' ? REDACTED_AUTHORIZATION : v;
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

// An empty list sends no key, which the API reads as its default; a null element would go out as "null".
function checkQuery(query?: object): void {
  for (const [key, value] of Object.entries(query ?? {})) {
    if (!Array.isArray(value)) continue;
    if (value.length === 0) {
      throw new NuntlyError(`Query param '${key}' must not be empty: leave it out to get the default.`);
    }
    if (value.some((item) => item === null || item === undefined)) {
      throw new NuntlyError(`Query param '${key}' must not contain null.`);
    }
  }
}

// 0, Infinity or more than a timer can wait (2^31 - 1 ms, past which it fires at once) turns the
// timeout off; a negative or NaN value is a bug, not a request for none.
function checkTimeout(timeout: number): number {
  if (timeout === 0) return timeout;
  if (timeout > MAX_TIMEOUT) return Number.POSITIVE_INFINITY;
  if (Number.isFinite(timeout) && timeout > 0) return Math.ceil(timeout);
  throw new NuntlyError(`timeout must be 0, Infinity or a positive number of milliseconds, not ${timeout}.`);
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
  query?: object;
  options?: RequestOptions;
  /**
   * The API deduplicates this operation by `Idempotency-Key`, so a keyed request is replayed on a
   * 408, a 5xx, a timeout or a network error. Set it on no other operation: a replay could apply it twice.
   */
  idempotent?: boolean;
  /** The operation returns nothing, so its 2xx body is not read as JSON. */
  voidResponse?: boolean;
}

export class NuntlyClient {
  private readonly baseUrl: string;
  private readonly timeout: number;
  private readonly maxRetries: number;
  private readonly retryEnabled: boolean;
  private readonly log: Logger;
  private readonly hooks: Hooks;
  private readonly http: ReturnType<typeof up>;
  private readonly retryConfig: ReturnType<typeof buildRetryConfig>;

  constructor(options: ClientOptions) {
    const apiKey = options.apiKey ?? (typeof process !== 'undefined' ? process.env?.['NUNTLY_API_KEY'] : undefined);
    if (!apiKey) {
      throw new Error(
        'API key is required. Pass it via `new Nuntly({ apiKey })` or set the NUNTLY_API_KEY environment variable.',
      );
    }
    const envBaseUrl = typeof process !== 'undefined' ? process.env?.['NUNTLY_BASE_URL'] : undefined;
    this.baseUrl = (options.baseUrl ?? envBaseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, '');
    this.timeout = checkTimeout(options.timeout ?? DEFAULT_TIMEOUT);
    this.maxRetries = options.maxRetries ?? DEFAULT_MAX_RETRIES;
    this.retryEnabled = options.retry !== 'none';
    this.log = options.logger ?? (options.debug ? console : NOOP_LOGGER);
    this.hooks = options.hooks ?? {};
    this.retryConfig = buildRetryConfig(options.retry, this.maxRetries);

    const fetchFn = (options.fetch ?? globalThis.fetch) as typeof fetch;
    // The timeout bounds each attempt's fetch, not the wait before a retry: up-fetch would
    // abort a Retry-After wait with its own per-attempt timeout signal.
    const timedFetch = ((input: Request, init: RequestInit & { attemptTimeout: number }) => {
      // 0 or Infinity means no timeout, as in 1.x; AbortSignal.timeout(Infinity) throws.
      if (init.attemptTimeout === 0 || init.attemptTimeout === Number.POSITIVE_INFINITY) return fetchFn(input, init);
      const timeout = AbortSignal.timeout(init.attemptTimeout);
      return fetchFn(input, { ...init, signal: init.signal ? anySignal(init.signal, timeout) : timeout });
    }) as typeof fetch;

    const headers: Record<string, string> = {
      // User-supplied `defaultHeaders` come first so Authorization / User-Agent
      // (set below) always override them. Per-request `RequestOptions.headers`
      // is applied later by up-fetch and wins over everything here.
      ...options.defaultHeaders,
      // The key lives only in this closure: no field, string form or hook argument carries it.
      Authorization: `Bearer ${apiKey}`,
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
      retry: this.retryConfig,
    }));
  }

  // A failing onError hook must not replace the error the caller gets.
  private async reportError(ctx: ErrorContext): Promise<void> {
    try {
      await this.hooks.onError?.(ctx);
    } catch (hookError) {
      this.log.error(`!! onError hook failed: ${describeThrown(hookError)}`);
    }
  }

  private request<T>(args: InternalRequestArgs): APIPromise<T> {
    const { data, response, onResponseRequested } = this.send<T>(args);
    return APIPromise.fromPromises(data, response, onResponseRequested);
  }

  private send<T>(args: InternalRequestArgs): {
    data: Promise<T>;
    response: Promise<Response>;
    onResponseRequested: () => void;
  } {
    let resolveResponse!: (response: Response) => void;
    let rejectResponse!: (reason: unknown) => void;
    const responsePromise = new Promise<Response>((res, rej) => {
      resolveResponse = res;
      rejectResponse = rej;
    });

    let resolvedPath: string;
    let attemptTimeout: number;
    try {
      attemptTimeout = checkTimeout(args.options?.timeout ?? this.timeout);
      resolvedPath = resolvePath(args.path, args.pathParams);
      checkQuery(args.query);
    } catch (error) {
      const refused = error as NuntlyError;
      const request: RequestContext = {
        method: args.method,
        path: args.path,
        url: `${this.baseUrl}${args.path}`,
        headers: {},
        body: args.body,
      };
      const rejected = (async (): Promise<never> => {
        this.log.error(`!! ${args.method} ${args.path} refused: ${refused.message}`);
        await this.reportError({ request, error: refused });
        throw refused;
      })();
      return { data: rejected, response: rejected, onResponseRequested: () => {} };
    }
    let reqCtx: RequestContext | undefined;
    let reportedError: NuntlyError | undefined;
    // up-fetch keeps the previous attempt's response when an attempt throws: track the last attempt's own.
    let attemptResponse: Response | undefined;
    // The SDK reads the final response's body once, as text. A reader before that gets a clone,
    // a reader after it a copy built from that text, so no response is cloned for nothing.
    let responseRequested = false;
    let finalResponse: Response | undefined;
    let bodyText: Promise<string> | undefined;
    const readText = (response: Response) => {
      bodyText = response.text();
      return bodyText;
    };
    // Rejects when the SDK's own body read failed (a timeout or a reset mid-body).
    const readableResponse = async (response: Response): Promise<Response> => {
      if (!bodyText) return response.clone();
      return replayResponse(response, await bodyText);
    };
    const onResponseRequested = () => {
      if (responseRequested) return;
      responseRequested = true;
      // After a failed body read, the caller gets the error the call rejects with.
      if (finalResponse) {
        readableResponse(finalResponse).then(resolveResponse, (error) =>
          rejectWithCallError(dataPromise, error, rejectResponse),
        );
      }
    };

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
      onResponse: async () => {
        // No response when the last attempt failed (timeout, abort, connection error):
        // the error surfaces through onError.
        const response = attemptResponse;
        if (!response) return;
        finalResponse = response;
        if (responseRequested) resolveResponse(response.clone());
        const requestId = response.headers.get('x-request-id') ?? '';
        this.log.info(`<- ${response.status} ${args.method} ${resolvedPath}${requestId ? ` [${requestId}]` : ''}`);
        if (reqCtx) {
          const request = reqCtx;
          const hook = this.hooks.onResponse;
          if (hook) {
            // The hook may read the body, which the SDK still has to parse.
            const copy = response.clone();
            await runHook(() => hook({ request, response: copy }));
          }
        }
      },
      parseResponse: async (response: Response) => {
        const text = await readText(response);
        return args.voidResponse ? null : parseSuccess(response.status, text);
      },
      parseRejected: async (response: Response) => {
        const text = await readText(response);
        // The error keeps a readable copy: the SDK just consumed the original body.
        return APIError.from(response.status, parseText(text), response.headers, replayResponse(response, text));
      },
      onSuccess: async (data: unknown) => {
        const hook = this.hooks.onSuccess;
        if (reqCtx && finalResponse && hook) {
          const ctx = { request: reqCtx, response: await readableResponse(finalResponse), data };
          await runHook(() => hook(ctx));
        }
      },
      onError: async (error: unknown) => {
        if (error instanceof HookError) return;
        // A NuntlyError of its own, such as a 2xx body that is not JSON, reaches the caller as is.
        const normalized = error instanceof NuntlyError ? error : normalizeError(error, args.options?.signal);
        reportedError = normalized;
        this.log.error(`!! ${args.method} ${resolvedPath} failed: ${normalized.message}`);
        if (reqCtx && this.hooks.onError) {
          // After a failed body read the hook still gets the status and headers.
          const response = finalResponse && (await readableResponse(finalResponse).catch(() => finalResponse));
          await this.reportError({ request: reqCtx, response, error: normalized });
        }
      },
      onRetry: async (ctx: { attempt: number; response: Response | undefined; error: unknown; request: Request }) => {
        if (!reqCtx) return;
        this.log.warn(`~> Retry #${ctx.attempt} ${reqCtx.method} ${reqCtx.url}`);
        const retryCtx = {
          request: reqCtx,
          attempt: ctx.attempt,
          response: ctx.error === undefined ? ctx.response : undefined,
          error: ctx.error !== undefined ? normalizeError(ctx.error, args.options?.signal) : undefined,
        };
        await runHook(() => this.hooks.onRetry?.(retryCtx));
      },
    };

    opts.attemptTimeout = attemptTimeout;

    // Always set `when`: without it up-fetch retries every non-2xx with no delay.
    opts.retry = {
      ...(args.options?.maxRetries !== undefined ? { attempts: args.options.maxRetries } : {}),
      when: ({ request, response, error }: { request: Request; response: Response | undefined; error: unknown }) => {
        attemptResponse = error === undefined ? response : undefined;
        return (
          this.retryEnabled && shouldRetry(request, response, error, args.idempotent === true, args.options?.signal)
        );
      },
      // Called only once a retry is scheduled: from then on this attempt's response is not the final one,
      // even if onRetry throws or the caller aborts before the next attempt.
      delay: (ctx: { response: Response | undefined; error: unknown; attempt: number }) => {
        attemptResponse = undefined;
        return this.retryConfig.delay?.(ctx) ?? 0;
      },
    };

    const dataPromise = (async (): Promise<T> => {
      try {
        return (await this.http(resolvedPath as unknown as Request, opts as never)) as T;
      } catch (error) {
        const failure =
          error instanceof HookError ? error.hookError : (reportedError ?? normalizeError(error, args.options?.signal));
        // Without a response, `.asResponse()` gets the call's own error instead of hanging.
        if (!finalResponse) rejectResponse(failure);
        throw failure;
      }
    })();

    return { data: dataPromise, response: responsePromise, onResponseRequested };
  }

  get<T>(args: {
    path: string;
    pathParams?: Record<string, unknown>;
    query?: object;
    options?: RequestOptions;
  }): APIPromise<T> {
    return this.request<T>({ method: 'GET', ...args });
  }

  post<T>(args: {
    path: string;
    pathParams?: Record<string, unknown>;
    body?: unknown;
    options?: RequestOptions;
    idempotent?: boolean;
    voidResponse?: boolean;
  }): APIPromise<T> {
    return this.request<T>({ method: 'POST', ...args });
  }

  put<T>(args: {
    path: string;
    pathParams?: Record<string, unknown>;
    body?: unknown;
    options?: RequestOptions;
    voidResponse?: boolean;
  }): APIPromise<T> {
    return this.request<T>({ method: 'PUT', ...args });
  }

  patch<T>(args: {
    path: string;
    pathParams?: Record<string, unknown>;
    body?: unknown;
    options?: RequestOptions;
    voidResponse?: boolean;
  }): APIPromise<T> {
    return this.request<T>({ method: 'PATCH', ...args });
  }

  delete<T>(args: {
    path: string;
    pathParams?: Record<string, unknown>;
    options?: RequestOptions;
    voidResponse?: boolean;
  }): APIPromise<T> {
    return this.request<T>({ method: 'DELETE', ...args });
  }

  list<T>(args: {
    path: string;
    pathParams?: Record<string, unknown>;
    query?: object;
    options?: RequestOptions;
  }): PagePromise<CursorPage<T>, T> {
    const params: CursorPageParams = (args.query as CursorPageParams) ?? {};
    const first = this.send<CursorPageResponse<T>>({ method: 'GET', ...args });
    const pagePromise = (async () => {
      const response = await first.data;
      return new CursorPage<T>(response, params, (nextParams) =>
        this.get<CursorPageResponse<T>>({ ...args, query: nextParams }),
      );
    })();
    return PagePromise.fromPagePromises<CursorPage<T>, T>(pagePromise, first.response, first.onResponseRequested);
  }
}
