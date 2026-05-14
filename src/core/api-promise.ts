import type { ResponseWithData } from './types.js';

/**
 * `Promise<T>` returned by every resource method, with `.withResponse()`
 * and `.asResponse()` to access the raw HTTP `Response`.
 */
export class APIPromise<T> extends Promise<T> {
  // Chained `.then()` / `.catch()` return plain `Promise<T>`; the response
  // capture lives on the original `APIPromise`, not on continuations.
  static get [Symbol.species](): PromiseConstructor {
    return Promise;
  }

  private readonly responsePromise: Promise<Response>;

  private constructor(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason: unknown) => void,
    ) => void,
    responsePromise: Promise<Response>,
  ) {
    super(executor);
    this.responsePromise = responsePromise;
    // Pre-subscribe so an unobserved connection error doesn't surface as
    // `UnhandledPromiseRejection`; the rejection state is still readable.
    this.responsePromise.catch(() => {});
  }

  static fromPromises<T>(dataPromise: Promise<T>, responsePromise: Promise<Response>): APIPromise<T> {
    return new APIPromise<T>((resolve, reject) => {
      dataPromise.then(resolve, reject);
    }, responsePromise);
  }

  async withResponse(): Promise<ResponseWithData<T>> {
    const [data, response] = await Promise.all([this as Promise<T>, this.responsePromise]);
    return { data, response };
  }

  async asResponse(): Promise<Response> {
    return this.responsePromise;
  }

  map<U>(fn: (value: T) => U): APIPromise<U> {
    return APIPromise.fromPromises((this as Promise<T>).then(fn), this.responsePromise);
  }
}
