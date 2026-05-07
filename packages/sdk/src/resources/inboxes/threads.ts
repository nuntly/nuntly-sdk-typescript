import { Resource } from '@nuntly/sdk-core';
import type { RequestOptions, CursorPage, CursorPageParams } from '@nuntly/sdk-core';
import type { ThreadsQuery, ThreadsResponseItem } from '../../types/index.js';


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
    return this._http.list<ThreadsResponseItem>(`/inboxes/${inboxId}/threads`, query as unknown as Record<string, unknown>, options);
  }

}
