import { ClientOptions, Nuntly } from '../client';
import { APIError } from '../error';
import { APIPromise } from './../api-promise';

type SafeResult<T> = Promise<{ data: T; error: null } | { data: null; error: APIError }>;

type Safeify<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => APIPromise<infer R> ? (...args: A) => SafeResult<R>
  : T[K] extends object ? Safeify<T[K]>
  : T[K];
};

export class NuntlySafe {
  constructor(private client: Nuntly) {
    // nothing to do
  }

  // Dynamically wrap all properties
  static wrap<T>(obj: T): Safeify<T> {
    return new Proxy(obj as any, {
      get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === 'function') {
          return (...args: any[]) => {
            const result = value.apply(target, args);
            if (result instanceof APIPromise) {
              return result.safeAwait();
            }
            return result;
          };
        }
        if (typeof value === 'object' && value !== null) {
          return NuntlySafe.wrap(value);
        }
        return value;
      },
    });
  }

  // Expose all properties of the wrapped client
  [key: string]: any;
}

export function safe(client: Nuntly): Safeify<Nuntly> {
  return NuntlySafe.wrap(client);
}

export function createSafeNuntly(options: ClientOptions = {}): Safeify<Nuntly> {
  const client = new Nuntly(options);
  return NuntlySafe.wrap(client);
}
