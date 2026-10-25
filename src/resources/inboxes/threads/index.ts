import type { APIPromise, CursorPage, CursorPageParams, PagePromise, RequestOptions } from '../../../core/index.js';
import { Resource } from '../../../core/index.js';
import type { ThreadsQuery, ThreadsResponseItem } from '../../types.js';

/**
 * InboxesThreads resource.
 */
export class InboxesThreads extends Resource {
  /**
   * Lists the threads in an inbox, most recently active first, with cursor pagination. Filter by labels; spam and trash threads are excluded by default.
   *
   * GET /inboxes/{inboxId}/threads
   * @param inboxId - string
   * @param query - ThreadsQuery
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<ThreadsResponseItem>, ThreadsResponseItem>
   */
  list(
    inboxId: string,
    query?: ThreadsQuery,
    options?: RequestOptions,
  ): PagePromise<CursorPage<ThreadsResponseItem>, ThreadsResponseItem> {
    return this._http.list<ThreadsResponseItem>({
      path: '/inboxes/{inboxId}/threads',
      pathParams: { inboxId },
      query,
      options,
    });
  }
}
