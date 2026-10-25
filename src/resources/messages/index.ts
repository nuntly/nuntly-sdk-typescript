import type {
  APIPromise,
  CursorPage,
  CursorPageParams,
  IdempotentRequestOptions,
  NuntlyClient,
  PagePromise,
  RequestOptions,
} from '../../core/index.js';
import { Resource } from '../../core/index.js';
import { withIdempotencyKey } from '../../lib/idempotency.js';
import type {
  ForwardMessageRequest,
  IdResponse,
  MessageResponse,
  MessagesQuery,
  MessagesResponseItem,
  ReplyMessageRequest,
  SendMessageResponse,
  UpdateMessageRequest,
} from '../types.js';

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
   * Sends a message with a Fwd: subject from the inbox of the original message to one or more new recipients, in a new thread, with an optional text note.
   *
   * POST /messages/{messageId}/forward
   * @param messageId - string
   * @param body - ForwardMessageRequest
   * @param options - IdempotentRequestOptions
   * @returns APIPromise<SendMessageResponse>
   */
  forward(
    messageId: string,
    body: ForwardMessageRequest,
    options?: IdempotentRequestOptions,
  ): APIPromise<SendMessageResponse> {
    return this._http
      .post<{ data: SendMessageResponse }>({
        path: '/messages/{messageId}/forward',
        pathParams: { messageId },
        body,
        options: withIdempotencyKey(options),
      })
      .map((r) => r.data);
  }

  /**
   * Lists messages newest first, with cursor pagination and optional filters by domain and sender. Each item includes its labels, status and attachment count.
   *
   * GET /messages
   * @param query - MessagesQuery
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<MessagesResponseItem>, MessagesResponseItem>
   */
  list(
    query?: MessagesQuery,
    options?: RequestOptions,
  ): PagePromise<CursorPage<MessagesResponseItem>, MessagesResponseItem> {
    return this._http.list<MessagesResponseItem>({
      path: '/messages',
      query: query as unknown as Record<string, unknown>,
      options,
    });
  }

  /**
   * Replies from the inbox that holds the message, in the same thread. Set replyAll to true to also copy the other recipients. The send is queued.
   *
   * POST /messages/{messageId}/reply
   * @param messageId - string
   * @param body - ReplyMessageRequest
   * @param options - IdempotentRequestOptions
   * @returns APIPromise<SendMessageResponse>
   */
  reply(
    messageId: string,
    body: ReplyMessageRequest,
    options?: IdempotentRequestOptions,
  ): APIPromise<SendMessageResponse> {
    return this._http
      .post<{ data: SendMessageResponse }>({
        path: '/messages/{messageId}/reply',
        pathParams: { messageId },
        body,
        options: withIdempotencyKey(options),
      })
      .map((r) => r.data);
  }

  /**
   * Retrieves a received or sent message by id, including its sender, recipients, subject, labels, status, attachment count and raw headers.
   *
   * GET /messages/{messageId}
   * @param messageId - string
   * @param options - RequestOptions
   * @returns APIPromise<MessageResponse>
   */
  retrieve(messageId: string, options?: RequestOptions): APIPromise<MessageResponse> {
    return this._http
      .get<{ data: MessageResponse }>({
        path: '/messages/{messageId}',
        pathParams: { messageId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Adds or removes labels on a message. Only messages in user-created inboxes accept labels, and a message can hold at most 10 labels.
   *
   * PATCH /messages/{messageId}
   * @param messageId - string
   * @param body - UpdateMessageRequest
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  update(messageId: string, body: UpdateMessageRequest, options?: RequestOptions): APIPromise<IdResponse> {
    return this._http
      .patch<{ data: IdResponse }>({
        path: '/messages/{messageId}',
        pathParams: { messageId },
        body,
        options,
      })
      .map((r) => r.data);
  }
}
