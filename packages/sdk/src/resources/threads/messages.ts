import { Resource } from '@nuntly/sdk-core';
import type { RequestOptions, CursorPage, CursorPageParams } from '@nuntly/sdk-core';
import type { ThreadMessagesResponseItem } from '../../types/index.js';


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
   * @returns Promise<CursorPage<ThreadMessagesResponseItem>>
   */
  async list(threadId: string, query?: CursorPageParams, options?: RequestOptions): Promise<CursorPage<ThreadMessagesResponseItem>> {
    return this._http.list<ThreadMessagesResponseItem>(`/threads/${threadId}/messages`, query as unknown as Record<string, unknown>, options);
  }

}
