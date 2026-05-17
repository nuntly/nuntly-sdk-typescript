import { Resource } from '../../../core/index.js';
import type { APIPromise, RequestOptions, CursorPage, CursorPageParams, PagePromise } from '../../../core/index.js';
import type { ThreadMessagesResponseItem } from '../../types.js';


/**
 * ThreadsMessages resource.
 */
export class ThreadsMessages extends Resource {

  /**
   * List messages in a thread (chronological order).
   *
   * GET /threads/{threadId}/messages
   * @param threadId - string
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<ThreadMessagesResponseItem>, ThreadMessagesResponseItem>
   */
  list(threadId: string, query?: CursorPageParams, options?: RequestOptions): PagePromise<CursorPage<ThreadMessagesResponseItem>, ThreadMessagesResponseItem> {
    return this._http.list<ThreadMessagesResponseItem>({
      path: '/threads/{threadId}/messages',
      pathParams: { threadId },
      query: query as unknown as Record<string, unknown>,
      options,
    });
  }

}
