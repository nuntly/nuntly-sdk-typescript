// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Browse email conversations grouped by subject. Mark threads as read or spam, and assign them to an agent.
 */
export class Messages extends APIResource {
  /**
   * List messages in a thread (chronological order).
   */
  list(
    threadID: string,
    query: MessageListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MessageListResponsesCursorPage, MessageListResponse> {
    return this._client.getAPIList(path`/threads/${threadID}/messages`, CursorPage<MessageListResponse>, {
      query,
      ...options,
    });
  }
}

export type MessageListResponsesCursorPage = CursorPage<MessageListResponse>;

export interface MessageListResponse {
  /**
   * The id of the message
   */
  id: string;

  /**
   * The number of attachments.
   */
  attachmentCount: number;

  /**
   * The BCC addresses.
   */
  bcc: Array<string> | null;

  /**
   * The CC addresses.
   */
  cc: Array<string> | null;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  createdAt: string;

  /**
   * The sender address (RFC 5322 format, e.g. "Jane Doe <jane@example.com>" or
   * "jane@example.com").
   */
  from: string;

  /**
   * The email Message-ID header.
   */
  messageId: string;

  /**
   * The original date of the message.
   */
  receivedAt: string;

  /**
   * The Reply-To addresses.
   */
  replyTo: Array<string> | null;

  /**
   * The status of the message
   */
  status: 'received' | 'sent' | 'discarded' | 'failed';

  /**
   * The message subject.
   */
  subject: string;

  /**
   * The id of the thread.
   */
  threadId: string;

  /**
   * The recipient addresses.
   */
  to: Array<string>;
}

export interface MessageListParams extends CursorPageParams {}

export declare namespace Messages {
  export {
    type MessageListResponse as MessageListResponse,
    type MessageListResponsesCursorPage as MessageListResponsesCursorPage,
    type MessageListParams as MessageListParams,
  };
}
