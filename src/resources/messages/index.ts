import { Resource } from '../../core/index.js';
import type { NuntlyClient } from '../../core/index.js';
import type { APIPromise, RequestOptions, CursorPage, CursorPageParams } from '../../core/index.js';
import type { ForwardMessageRequest, IdResponse, MessageResponse, MessagesQuery, MessagesResponseItem, ReplyMessageRequest, SendMessageResponse, UpdateMessageRequest } from '../types.js';

import { MessagesAttachments } from './attachments/index.js';
import { MessagesContent } from './content/index.js';

/**
 * Messages resource.
 */
export class Messages extends Resource {
  attachments: MessagesAttachments;
  content: MessagesContent;

  constructor(client: NuntlyClient) {
    super(client);
    this.attachments = new MessagesAttachments(client);
    this.content = new MessagesContent(client);
  }

  /**
   * Forward a message to new recipients.
   *
   * POST /messages/{messageId}/forward
   * @param messageId - string
   * @param body - ForwardMessageRequest
   * @param options - RequestOptions
   * @returns APIPromise<SendMessageResponse>
   */
  forward(messageId: string, body: ForwardMessageRequest, options?: RequestOptions): APIPromise<SendMessageResponse> {
    return this._http.post<{ data: SendMessageResponse }>({
      path: '/messages/{messageId}/forward',
      pathParams: { messageId },
      body,
      options,
    }).map((r) => r.data);
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
    return this._http.list<MessagesResponseItem>({
      path: '/messages',
      query: query as unknown as Record<string, unknown>,
      options,
    });
  }

  /**
   * Reply to a message. Set replyAll to true to reply to all recipients.
   *
   * POST /messages/{messageId}/reply
   * @param messageId - string
   * @param body - ReplyMessageRequest
   * @param options - RequestOptions
   * @returns APIPromise<SendMessageResponse>
   */
  reply(messageId: string, body: ReplyMessageRequest, options?: RequestOptions): APIPromise<SendMessageResponse> {
    return this._http.post<{ data: SendMessageResponse }>({
      path: '/messages/{messageId}/reply',
      pathParams: { messageId },
      body,
      options,
    }).map((r) => r.data);
  }

  /**
   * Retrieve a single message with inbox enrichment.
   *
   * GET /messages/{messageId}
   * @param messageId - string
   * @param options - RequestOptions
   * @returns APIPromise<MessageResponse>
   */
  retrieve(messageId: string, options?: RequestOptions): APIPromise<MessageResponse> {
    return this._http.get<{ data: MessageResponse }>({
      path: '/messages/{messageId}',
      pathParams: { messageId },
      options,
    }).map((r) => r.data);
  }

  /**
   * Update message labels. Only available for messages in user-created inboxes.
   *
   * PATCH /messages/{messageId}
   * @param messageId - string
   * @param body - UpdateMessageRequest
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  update(messageId: string, body: UpdateMessageRequest, options?: RequestOptions): APIPromise<IdResponse> {
    return this._http.patch<{ data: IdResponse }>({
      path: '/messages/{messageId}',
      pathParams: { messageId },
      body,
      options,
    }).map((r) => r.data);
  }

}
