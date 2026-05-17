import type { APIError, APIConnectionError } from './error.js';

export interface Logger {
  debug: (message: string, ...args: unknown[]) => void;
  info: (message: string, ...args: unknown[]) => void;
  warn: (message: string, ...args: unknown[]) => void;
  error: (message: string, ...args: unknown[]) => void;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestContext {
  method: HttpMethod;
  /** Resolved path with substituted params, e.g. `/emails/em_123`. */
  path: string;
  /** Full URL: baseUrl + path + querystring. */
  url: string;
  headers: Record<string, string>;
  body?: unknown;
}

export interface ResponseContext {
  request: RequestContext;
  response: Response;
}

export interface SuccessContext<T = unknown> {
  request: RequestContext;
  response: Response;
  data: T;
}

export interface ErrorContext {
  request: RequestContext;
  response?: Response;
  error: APIError | APIConnectionError;
}

export interface RetryContext {
  request: RequestContext;
  /** 1-indexed: `1` = first retry after the original failed attempt. */
  attempt: number;
  response?: Response;
  error?: APIError | APIConnectionError;
}

/**
 * Hooks fired during the lifecycle of every request.
 *
 * Order of invocation per request (happy path):
 *   onRequest -> [onRetry x N] -> onResponse -> (onSuccess | onError)
 *
 * | Status      | onResponse | onSuccess | onError |
 * |-------------|------------|-----------|---------|
 * | 2xx         | yes        | yes       | no      |
 * | 4xx / 5xx   | yes        | no        | yes     |
 * | network err | no         | no        | yes     |
 */
export interface Hooks {
  /** Before each HTTP request is sent. */
  onRequest?: (ctx: RequestContext) => void | Promise<void>;
  /** After each HTTP response received (2xx, 4xx, 5xx). Not called on network errors. */
  onResponse?: (ctx: ResponseContext) => void | Promise<void>;
  /** After each 2xx response, with the parsed payload. */
  onSuccess?: (ctx: SuccessContext) => void | Promise<void>;
  /** On 4xx/5xx (`APIError`) or network/timeout (`APIConnectionError`). */
  onError?: (ctx: ErrorContext) => void | Promise<void>;
  /** Before each retry attempt. */
  onRetry?: (ctx: RetryContext) => void | Promise<void>;
}

export interface BackoffStrategy {
  initialInterval?: number;
  maxInterval?: number;
  exponent?: number;
}

export type RetryStrategy =
  | 'none'
  | 'backoff'
  | { strategy: 'backoff'; backoff?: BackoffStrategy };

export interface AppInfo {
  /** Identifier of the wrapping application, e.g. `@nuntly/cli` or `my-saas`. */
  name: string;
  /** Optional version of the wrapping application. */
  version?: string;
}

export interface ClientOptions {
  apiKey?: string;
  baseUrl?: string;
  timeout?: number;
  maxRetries?: number;
  retry?: RetryStrategy;
  debug?: boolean;
  logger?: Logger;
  fetch?: typeof globalThis.fetch;
  hooks?: Hooks;
  /**
   * Optional application info appended to the User-Agent for telemetry.
   * The wire format is `@nuntly/sdk/<version> (<name>/<version>) <runtime>`.
   * The `@nuntly/sdk` identifier is always preserved; appInfo cannot remove
   * or replace it, only append to it.
   */
  appInfo?: AppInfo;
  /**
   * Headers sent on every request. Merged with per-request `RequestOptions.headers`
   * (per-request wins on conflict). Useful for tenant-id forwarding, telemetry
   * (e.g. `X-Trace-Id`), or corporate proxy auth.
   */
  defaultHeaders?: Record<string, string>;
}

export interface RequestOptions {
  timeout?: number;
  maxRetries?: number;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  /**
   * Idempotency key to deduplicate the request server-side. The SDK
   * auto-generates a UUID v4 for endpoints that support idempotency
   * (currently `emails.send` and `emails.bulk.send`) when this option
   * is not provided. Pass an explicit value to wire up your own retry
   * key (e.g. for cross-process deduplication).
   */
  idempotencyKey?: string;
}

export interface CursorPageResponse<T> {
  data: T[];
  nextCursor: string | null;
}

export interface CursorPageParams {
  cursor?: string | null;
  limit?: number;
}

export interface ResponseWithData<T> {
  data: T;
  response: Response;
}
