import type { CursorPageParams, CursorPageResponse } from './types.js';

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
    this.nextCursor = response.nextCursor;
    this.params = params;
    this.fetchPage = fetchPage;
  }

  hasNextPage(): boolean {
    return this.nextCursor !== null && this.nextCursor !== undefined;
  }

  async nextPage(): Promise<CursorPage<T>> {
    if (!this.hasNextPage()) {
      throw new Error('No more pages');
    }
    const response = await this.fetchPage({
      ...this.params,
      cursor: this.nextCursor,
    });
    return new CursorPage(response, this.params, this.fetchPage);
  }

  async *pages(): AsyncGenerator<CursorPage<T>> {
    let page: CursorPage<T> = this;
    yield page;
    while (page.hasNextPage()) {
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
