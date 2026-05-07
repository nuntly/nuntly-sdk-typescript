import { Resource } from '@nuntly/sdk-core';
import type { NuntlyClient } from '@nuntly/sdk-core';
import type { RequestOptions } from '@nuntly/sdk-core';
import type { IdResponse, ThreadResponse, UpdateThreadRequest } from '../types/index.js';

import { ThreadsMessages } from './threads/messages.js';

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
   * @returns Promise<ThreadResponse>
   */
  async retrieve(threadId: string, options?: RequestOptions): Promise<ThreadResponse> {
    const response = await this._http.get<{ data: ThreadResponse }>(`/threads/${threadId}`, undefined, options);
    return response.data;
  }

  /**
   * Update thread labels and agent assignment. Label operations apply to all messages in the thread.
   *
   * PATCH /threads/{threadId}
   * @param threadId - string
   * @param body - UpdateThreadRequest
   * @param options - RequestOptions
   * @returns Promise<IdResponse>
   */
  async update(threadId: string, body: UpdateThreadRequest, options?: RequestOptions): Promise<IdResponse> {
    const response = await this._http.patch<{ data: IdResponse }>(`/threads/${threadId}`, body, options);
    return response.data;
  }

}
