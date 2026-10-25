import type { APIPromise, CursorPage, CursorPageParams, PagePromise, RequestOptions } from '../../../core/index.js';
import { Resource } from '../../../core/index.js';
import type { ThreadMessagesResponseItem } from '../../types.js';

/**
 * ThreadsMessages resource.
 */
export class ThreadsMessages extends Resource {
  /**
   * Lists the messages in a thread in chronological order, oldest first, with cursor pagination. Returns up to 30 messages per page.
   *
   * GET /threads/{threadId}/messages
   * @param threadId - string
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<ThreadMessagesResponseItem>, ThreadMessagesResponseItem>
   */
  list(
    threadId: string,
    query?: CursorPageParams,
    options?: RequestOptions,
  ): PagePromise<CursorPage<ThreadMessagesResponseItem>, ThreadMessagesResponseItem> {
    return this._http.list<ThreadMessagesResponseItem>({
      path: '/threads/{threadId}/messages',
      pathParams: { threadId },
      query,
      options,
    });
  }
}
