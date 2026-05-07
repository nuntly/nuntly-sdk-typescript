import { Resource } from '@nuntly/sdk-core';
import type { NuntlyClient } from '@nuntly/sdk-core';
import type { RequestOptions, CursorPage, CursorPageParams } from '@nuntly/sdk-core';
import type { ForwardMessageRequest, IdResponse, MessageResponse, MessagesQuery, MessagesResponseItem, ReplyMessageRequest, SendMessageResponse, UpdateMessageRequest } from '../types/index.js';

import { MessagesContent } from './messages/content.js';
import { MessagesAttachments } from './messages/attachments.js';

/**
 * Messages resource.
 */
export class Messages extends Resource {
  content: MessagesContent;
  attachments: MessagesAttachments;

  constructor(client: NuntlyClient) {
    super(client);
    this.content = new MessagesContent(client);
    this.attachments = new MessagesAttachments(client);
  }

  /**
   * List all received messages across inboxes.
   *
   * GET /messages
   * @param query - MessagesQuery
   * @param options - RequestOptions
   * @returns Promise<CursorPage<MessagesResponseItem>>
   */
  async list(query?: MessagesQuery, options?: RequestOptions): Promise<CursorPage<MessagesResponseItem>> {
    return this._http.list<MessagesResponseItem>('/messages', query as unknown as Record<string, unknown>, options);
  }

  /**
   * Retrieve a single message with inbox enrichment.
   *
   * GET /messages/{messageId}
   * @param messageId - string
   * @param options - RequestOptions
   * @returns Promise<MessageResponse>
   */
  async retrieve(messageId: string, options?: RequestOptions): Promise<MessageResponse> {
    const response = await this._http.get<{ data: MessageResponse }>(`/messages/${messageId}`, undefined, options);
    return response.data;
  }

  /**
   * Update message labels. Only available for messages in user-created inboxes.
   *
   * PATCH /messages/{messageId}
   * @param messageId - string
   * @param body - UpdateMessageRequest
   * @param options - RequestOptions
   * @returns Promise<IdResponse>
   */
  async update(messageId: string, body: UpdateMessageRequest, options?: RequestOptions): Promise<IdResponse> {
    const response = await this._http.patch<{ data: IdResponse }>(`/messages/${messageId}`, body, options);
    return response.data;
  }

  /**
   * Reply to a message. Set replyAll to true to reply to all recipients.
   *
   * POST /messages/{messageId}/reply
   * @param messageId - string
   * @param body - ReplyMessageRequest
   * @param options - RequestOptions
   * @returns Promise<SendMessageResponse>
   */
  async reply(messageId: string, body: ReplyMessageRequest, options?: RequestOptions): Promise<SendMessageResponse> {
    const response = await this._http.post<{ data: SendMessageResponse }>(`/messages/${messageId}/reply`, body, options);
    return response.data;
  }

  /**
   * Forward a message to new recipients.
   *
   * POST /messages/{messageId}/forward
   * @param messageId - string
   * @param body - ForwardMessageRequest
   * @param options - RequestOptions
   * @returns Promise<SendMessageResponse>
   */
  async forward(messageId: string, body: ForwardMessageRequest, options?: RequestOptions): Promise<SendMessageResponse> {
    const response = await this._http.post<{ data: SendMessageResponse }>(`/messages/${messageId}/forward`, body, options);
    return response.data;
  }

}
