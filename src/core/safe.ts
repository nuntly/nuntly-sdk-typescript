import type { APIError } from './error.js';

export type SafeResult<T> = { data: T; error: null } | { data: null; error: APIError };

type Safeify<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => Promise<infer R>
    ? (...args: A) => Promise<SafeResult<R>>
    : T[K] extends object
      ? Safeify<T[K]>
      : T[K];
};

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
              (error: unknown) => ({ data: null, error }),
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
