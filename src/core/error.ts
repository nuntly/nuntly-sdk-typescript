export class NuntlyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NuntlyError';
  }
}

export class APIError extends NuntlyError {
  /** HTTP wire status. Equals `error.status` in the body by API contract; sourced from `Response.status`. */
  readonly status: number;
  readonly headers: Headers;
  /** API-specific error code, e.g. `'not_found'`. */
  readonly code: string;
  /** Short, human-readable summary of the error. */
  readonly title: string;
  /** Optional additional details about this occurrence (best effort). */
  readonly details?: unknown;
  readonly requestId: string | null;
  readonly rawResponse: Response | undefined;

  constructor(status: number, body: unknown, headers: Headers, rawResponse?: Response) {
    const parsed = APIError.parseBody(status, body);
    super(`${status}: ${parsed.title}`);
    this.name = 'APIError';
    this.status = status;
    this.headers = headers;
    this.code = parsed.code;
    this.title = parsed.title;
    this.details = parsed.details;
    this.requestId = headers.get('x-request-id');
    this.rawResponse = rawResponse;
  }

  private static parseBody(status: number, body: unknown): { code: string; title: string; details?: unknown } {
    if (body && typeof body === 'object' && 'error' in body) {
      const err = (body as Record<string, unknown>).error;
      if (err && typeof err === 'object') {
        const e = err as Record<string, unknown>;
        return {
          code: typeof e.code === 'string' ? e.code : 'unknown',
          title: typeof e.title === 'string' ? e.title : 'Request failed',
          details: e.details,
        };
      }
    }
    return {
      code: 'unknown',
      title: typeof body === 'string' && body.length > 0 ? body : 'Request failed',
    };
  }

  static from(status: number, body: unknown, headers: Headers, rawResponse?: Response): APIError {
    switch (status) {
      case 400: return new BadRequestError(body, headers, rawResponse);
      case 401: return new AuthenticationError(body, headers, rawResponse);
      case 403: return new PermissionDeniedError(body, headers, rawResponse);
      case 404: return new NotFoundError(body, headers, rawResponse);
      case 409: return new ConflictError(body, headers, rawResponse);
      case 422: return new UnprocessableEntityError(body, headers, rawResponse);
      case 429: return new RateLimitError(body, headers, rawResponse);
      default:
        if (status >= 500) return new InternalServerError(status, body, headers, rawResponse);
        return new APIError(status, body, headers, rawResponse);
    }
  }
}

export class BadRequestError extends APIError {
  constructor(body: unknown, headers: Headers, rawResponse?: Response) {
    super(400, body, headers, rawResponse);
    this.name = 'BadRequestError';
  }
}

export class AuthenticationError extends APIError {
  constructor(body: unknown, headers: Headers, rawResponse?: Response) {
    super(401, body, headers, rawResponse);
    this.name = 'AuthenticationError';
  }
}

export class PermissionDeniedError extends APIError {
  constructor(body: unknown, headers: Headers, rawResponse?: Response) {
    super(403, body, headers, rawResponse);
    this.name = 'PermissionDeniedError';
  }
}

export class NotFoundError extends APIError {
  constructor(body: unknown, headers: Headers, rawResponse?: Response) {
    super(404, body, headers, rawResponse);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends APIError {
  constructor(body: unknown, headers: Headers, rawResponse?: Response) {
    super(409, body, headers, rawResponse);
    this.name = 'ConflictError';
  }
}

export class UnprocessableEntityError extends APIError {
  constructor(body: unknown, headers: Headers, rawResponse?: Response) {
    super(422, body, headers, rawResponse);
    this.name = 'UnprocessableEntityError';
  }
}

export class RateLimitError extends APIError {
  readonly retryAfter: number | null;

  constructor(body: unknown, headers: Headers, rawResponse?: Response) {
    super(429, body, headers, rawResponse);
    this.name = 'RateLimitError';
    this.retryAfter = RateLimitError.parseRetryAfter(headers);
  }

  private static parseRetryAfter(headers: Headers): number | null {
    const value = headers.get('retry-after');
    if (!value) return null;
    const seconds = Number(value);
    if (!Number.isNaN(seconds)) return seconds * 1000;
    const date = Date.parse(value);
    if (!Number.isNaN(date)) return Math.max(0, date - Date.now());
    return null;
  }
}

export class InternalServerError extends APIError {
  constructor(status: number, body: unknown, headers: Headers, rawResponse?: Response) {
    super(status, body, headers, rawResponse);
    this.name = 'InternalServerError';
  }
}

export class APIConnectionError extends NuntlyError {
  constructor(message: string, public readonly cause?: Error) {
    super(message);
    this.name = 'APIConnectionError';
  }
}

export class APIConnectionTimeoutError extends APIConnectionError {
  constructor(cause?: Error) {
    super('Request timed out', cause);
    this.name = 'APIConnectionTimeoutError';
  }
}
