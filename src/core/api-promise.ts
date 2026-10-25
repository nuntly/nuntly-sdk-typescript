import type { CursorPage } from './pagination.js';
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

  protected readonly responsePromise: Promise<Response>;
  // Tells the client a caller reads the response, so it keeps the body readable for it.
  protected readonly onResponseRequested?: () => void;

  protected constructor(
    executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason: unknown) => void) => void,
    responsePromise: Promise<Response>,
    onResponseRequested?: () => void,
  ) {
    super(executor);
    this.responsePromise = responsePromise;
    this.onResponseRequested = onResponseRequested;
    // Pre-subscribe so an unobserved connection error doesn't surface as
    // `UnhandledPromiseRejection`; the rejection state is still readable.
    this.responsePromise.catch(() => {});
  }

  static fromPromises<T>(
    dataPromise: Promise<T>,
    responsePromise: Promise<Response>,
    onResponseRequested?: () => void,
  ): APIPromise<T> {
    return new APIPromise<T>(
      (resolve, reject) => {
        dataPromise.then(resolve, reject);
      },
      responsePromise,
      onResponseRequested,
    );
  }

  /**
   * Resolves to the parsed data and the raw `Response`, whose body stays readable: once the SDK has
   * read the body, the response is a copy built from it.
   */
  async withResponse(): Promise<ResponseWithData<T>> {
    this.onResponseRequested?.();
    const [data, response] = await Promise.all([this as Promise<T>, this.responsePromise]);
    return { data, response };
  }

  /**
   * Resolves to the raw `Response` as soon as the headers arrive, also on a 4xx or 5xx. Called once the
   * SDK has read the body, such as after the call settled, it resolves to a copy built from that body.
   */
  async asResponse(): Promise<Response> {
    this.onResponseRequested?.();
    // The caller chose the raw response, so the typed error on the data side is not theirs to handle.
    (this as Promise<T>).catch(() => {});
    return this.responsePromise;
  }

  map<U>(fn: (value: T) => U): APIPromise<U> {
    return APIPromise.fromPromises((this as Promise<T>).then(fn), this.responsePromise, this.onResponseRequested);
  }
}

export class PagePromise<TPage extends CursorPage<TItem>, TItem>
  extends APIPromise<TPage>
  implements AsyncIterable<TItem>
{
  static fromPagePromises<TPage extends CursorPage<TItem>, TItem>(
    dataPromise: Promise<TPage>,
    responsePromise: Promise<Response>,
    onResponseRequested?: () => void,
  ): PagePromise<TPage, TItem> {
    return new PagePromise<TPage, TItem>(
      (resolve, reject) => {
        dataPromise.then(resolve, reject);
      },
      responsePromise,
      onResponseRequested,
    );
  }

  async *[Symbol.asyncIterator](): AsyncIterator<TItem> {
    const firstPage = await (this as Promise<TPage>);
    for await (const item of firstPage) {
      yield item;
    }
  }
}
