import { NuntlyError } from './error.js';
import type { CursorPageParams, CursorPageResponse } from './types.js';

function repeatedCursor(cursor: string): NuntlyError {
  return new NuntlyError(`The API returned the cursor '${cursor}' again: pagination stopped to avoid a loop.`);
}

export class CursorPage<T> implements AsyncIterable<T> {
  readonly data: T[];
  readonly nextCursor: string | null;

  private readonly fetchPage: (params: CursorPageParams) => Promise<CursorPageResponse<T>>;
  private readonly params: CursorPageParams;

  constructor(
    response: CursorPageResponse<T>,
    params: CursorPageParams,
    fetchPage: (params: CursorPageParams) => Promise<CursorPageResponse<T>>,
  ) {
    this.data = response.data;
    // The API leaves nextCursor out on the last page; a blank cursor names no page either, as in Java.
    this.nextCursor = response.nextCursor?.trim() ? response.nextCursor : null;
    this.params = params;
    this.fetchPage = fetchPage;
  }

  hasNextPage(): boolean {
    return this.nextCursor !== null;
  }

  /**
   * Fetches the page after this one.
   *
   * @throws {Error} `No more pages` when this is the last page (`hasNextPage()` is false).
   * @throws {NuntlyError} when the next cursor is the cursor this page was requested with, which would
   *   fetch this page again. Iterating the page detects any repeated cursor.
   */
  async nextPage(): Promise<CursorPage<T>> {
    if (!this.hasNextPage()) {
      throw new Error('No more pages');
    }
    const cursor = this.nextCursor as string;
    if (cursor === this.params.cursor) throw repeatedCursor(cursor);
    const params = { ...this.params, cursor };
    return new CursorPage(await this.fetchPage(params), params, this.fetchPage);
  }

  // Each iteration keeps the cursors it requested, the starting page's own included, so a repeat
  // throws before it is fetched again.
  async *pages(): AsyncGenerator<CursorPage<T>> {
    let page: CursorPage<T> = this;
    const requested = new Set(page.params.cursor ? [page.params.cursor] : []);
    yield page;
    while (page.hasNextPage()) {
      const cursor = page.nextCursor as string;
      if (requested.has(cursor)) throw repeatedCursor(cursor);
      requested.add(cursor);
      page = await page.nextPage();
      yield page;
    }
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<T> {
    for await (const page of this.pages()) {
      for (const item of page.data) {
        yield item;
      }
    }
  }
}
