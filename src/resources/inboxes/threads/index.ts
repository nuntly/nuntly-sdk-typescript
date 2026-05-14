import { Resource } from '../../../core/index.js';
import type { APIPromise, RequestOptions, CursorPage, CursorPageParams } from '../../../core/index.js';
import type { ThreadsQuery, ThreadsResponseItem } from '../../types.js';


/**
 * InboxesThreads resource.
 */
export class InboxesThreads extends Resource {

  /**
   * List threads in an inbox.
   *
   * GET /inboxes/{inboxId}/threads
   * @param inboxId - string
   * @param query - ThreadsQuery
   * @param options - RequestOptions
   * @returns Promise<CursorPage<ThreadsResponseItem>>
   */
  async list(inboxId: string, query?: ThreadsQuery, options?: RequestOptions): Promise<CursorPage<ThreadsResponseItem>> {
    return this._http.list<ThreadsResponseItem>({
      path: '/inboxes/{inboxId}/threads',
      pathParams: { inboxId },
      query: query as unknown as Record<string, unknown>,
      options,
    });
  }

}
