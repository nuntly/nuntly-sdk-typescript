import type { APIPromise, NuntlyClient, RequestOptions } from '../../core/index.js';
import { Resource } from '../../core/index.js';
import type { IdResponse, RetrieveThreadQuery, ThreadResponse, UpdateThreadRequest } from '../types.js';

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
   * Retrieves a thread with its subject, message count, last activity and labels from all its messages. Pass markRead=true to clear unread labels.
   *
   * GET /threads/{threadId}
   * @param threadId - string
   * @param query - RetrieveThreadQuery
   * @param options - RequestOptions
   * @returns APIPromise<ThreadResponse>
   */
  retrieve(threadId: string, query?: RetrieveThreadQuery, options?: RequestOptions): APIPromise<ThreadResponse> {
    return this._http
      .get<{ data: ThreadResponse }>({
        path: '/threads/{threadId}',
        pathParams: { threadId },
        query,
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Adds or removes labels on every message in a thread, or sets its agent. Label operations only work on threads in user-created inboxes.
   *
   * PATCH /threads/{threadId}
   * @param threadId - string
   * @param body - UpdateThreadRequest
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  update(threadId: string, body: UpdateThreadRequest, options?: RequestOptions): APIPromise<IdResponse> {
    return this._http
      .patch<{ data: IdResponse }>({
        path: '/threads/{threadId}',
        pathParams: { threadId },
        body,
        options,
      })
      .map((r) => r.data);
  }
}
