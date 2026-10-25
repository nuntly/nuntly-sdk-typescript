import { type APIConnectionError, type APIError, describeThrown, NuntlyError } from './error.js';

// A plain `NuntlyError` is a call refused before sending (an empty, `.` or `..` path id, an invalid
// timeout), or any other thrown value, such as one from your own hook, kept as its `cause`.
export type SafeResult<T> =
  | { data: T; error: null }
  | { data: null; error: APIError | APIConnectionError | NuntlyError };

type Safeify<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => Promise<infer R>
    ? (...args: A) => Promise<SafeResult<R>>
    : T[K] extends object
      ? Safeify<T[K]>
      : T[K];
};

// Keeps the declared error type: an SDK error passes as is, any other value is wrapped.
function toSafeError(error: unknown): NuntlyError {
  if (error instanceof NuntlyError) return error;
  return new NuntlyError(describeThrown(error), { cause: error });
}

function wrapSafe<T extends object>(obj: T): Safeify<T> {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);

      if (typeof value === 'function') {
        return (...args: unknown[]) => {
          const result = value.apply(target, args);
          if (result instanceof Promise) {
            return result.then(
              (data: unknown) => ({ data, error: null }),
              (error: unknown) => ({ data: null, error: toSafeError(error) }),
            );
          }
          return result;
        };
      }

      if (typeof value === 'object' && value !== null) {
        return wrapSafe(value);
      }

      return value;
    },
  }) as Safeify<T>;
}

export function safe<T extends object>(client: T): Safeify<T> {
  return wrapSafe(client);
}
