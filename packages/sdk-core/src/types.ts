export interface Logger {
  debug: (message: string, ...args: unknown[]) => void;
  info: (message: string, ...args: unknown[]) => void;
  warn: (message: string, ...args: unknown[]) => void;
  error: (message: string, ...args: unknown[]) => void;
}

export interface RetryContext {
  attempt: number;
  response?: Response;
  error?: unknown;
  request: Request;
}

export interface Hooks {
  onRequest?: (request: Request) => void | Promise<void>;
  onResponse?: (response: Response, request: Request) => void | Promise<void>;
  onSuccess?: (data: unknown, request: Request) => void | Promise<void>;
  onRetry?: (context: RetryContext) => void | Promise<void>;
  onError?: (error: unknown, request: Request) => void | Promise<void>;
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
}

export interface RequestOptions {
  timeout?: number;
  maxRetries?: number;
  headers?: Record<string, string>;
  signal?: AbortSignal;
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
