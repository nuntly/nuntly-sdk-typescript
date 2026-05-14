import { Resource } from '../../core/index.js';
import type { NuntlyClient } from '../../core/index.js';
import type { APIPromise, RequestOptions } from '../../core/index.js';
import type { IdResponse, ThreadResponse, UpdateThreadRequest } from '../types.js';

import { ThreadsMessages } from './messages/index.js';

/**
 * Threads resource.
 */
export class Threads extends Resource {
  messages: ThreadsMessages;

  constructor(client: NuntlyClient) {
    super(client);
    this.messages = new ThreadsMessages(client);
  }

  /**
   * Retrieve a thread. Pass ?markRead=true to automatically remove the unread label from all messages.
   *
   * GET /threads/{threadId}
   * @param threadId - string
   * @param options - RequestOptions
   * @returns APIPromise<ThreadResponse>
   */
  retrieve(threadId: string, options?: RequestOptions): APIPromise<ThreadResponse> {
    return this._http.get<{ data: ThreadResponse }>({
      path: '/threads/{threadId}',
      pathParams: { threadId },
      options,
    }).map((r) => r.data);
  }

  /**
   * Update thread labels and agent assignment. Label operations apply to all messages in the thread.
   *
   * PATCH /threads/{threadId}
   * @param threadId - string
   * @param body - UpdateThreadRequest
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  update(threadId: string, body: UpdateThreadRequest, options?: RequestOptions): APIPromise<IdResponse> {
    return this._http.patch<{ data: IdResponse }>({
      path: '/threads/{threadId}',
      pathParams: { threadId },
      body,
      options,
    }).map((r) => r.data);
  }

}
