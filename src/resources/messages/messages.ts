// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AttachmentsAPI from './attachments';
import { AttachmentListResponse, AttachmentRetrieveParams, Attachments } from './attachments';
import * as ContentAPI from './content';
import { Content, ContentRetrieveParams } from './content';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Access received messages, download attachments, and send replies or forwards from an inbox.
 */
export class Messages extends APIResource {
  content: ContentAPI.Content = new ContentAPI.Content(this._client);
  attachments: AttachmentsAPI.Attachments = new AttachmentsAPI.Attachments(this._client);

  /**
   * Retrieve a single message with inbox enrichment.
   */
  retrieve(messageID: string, options?: RequestOptions): APIPromise<MessageDetail> {
    return (
      this._client.get(path`/messages/${messageID}`, options) as APIPromise<{ data: MessageDetail }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Update message labels. Only available for messages in user-created inboxes.
   */
  update(
    messageID: string,
    body: MessageUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MessageUpdateResponse> {
    return (
      this._client.patch(path`/messages/${messageID}`, { body, ...options }) as APIPromise<{
        data: MessageUpdateResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * List all received messages across inboxes.
   */
  list(
    query: MessageListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MessagesCursorPage, Message> {
    return this._client.getAPIList('/messages', CursorPage<Message>, { query, ...options });
  }

  /**
   * Forward a message to new recipients.
   */
  forward(
    messageID: string,
    body: MessageForwardParams,
    options?: RequestOptions,
  ): APIPromise<MessageForwardResponse> {
    return (
      this._client.post(path`/messages/${messageID}/forward`, { body, ...options }) as APIPromise<{
        data: MessageForwardResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Reply to a message. Set replyAll to true to reply to all recipients.
   */
  reply(
    messageID: string,
    body: MessageReplyParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MessageReplyResponse> {
    return (
      this._client.post(path`/messages/${messageID}/reply`, { body, ...options }) as APIPromise<{
        data: MessageReplyResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export type MessagesCursorPage = CursorPage<Message>;

export interface Message {
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
   * The id of the inbox, or null if routed to the default catch-all.
   */
  inboxId: string | null;

  /**
   * The message labels.
   */
  labels: Array<string>;

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

export interface MessageAttachment {
  /**
   * The id of the attachment
   */
  id: string;

  /**
   * The content disposition (inline or attachment).
   */
  contentDisposition: string | null;

  /**
   * The CID for inline images.
   */
  contentId: string | null;

  /**
   * The MIME content type.
   */
  contentType: string;

  /**
   * The original filename.
   */
  filename: string | null;

  /**
   * The size in bytes.
   */
  size: number;

  /**
   * Presigned download URL (included when retrieving a single attachment).
   */
  downloadUrl?: string;
}

export interface MessageContent {
  /**
   * HTML content, or `null` if not requested or unavailable.
   */
  html: MessageContentItem | null;

  /**
   * Raw MIME (.eml) content, or `null` if not requested or unavailable. Returned for
   * received messages only.
   */
  mime: MessageContentItem | null;

  /**
   * Plain text content, or `null` if not requested or unavailable.
   */
  text: MessageContentItem | null;
}

export interface MessageContentItem {
  /**
   * Presigned download URL.
   */
  downloadUrl: string;

  /**
   * When the URL expires.
   */
  expiresAt: string;

  /**
   * Uncompressed size in bytes.
   */
  size: number | null;
}

export interface MessageDetail {
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
   * The raw email headers.
   */
  headers: { [key: string]: string } | null;

  /**
   * The id of the inbox, or null if routed to the default catch-all.
   */
  inboxId: string | null;

  /**
   * The message labels.
   */
  labels: Array<string>;

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

export interface MessageUpdateResponse {
  /**
   * The id of the resource.
   */
  id: string;
}

export interface MessageForwardResponse {
  /**
   * The id of the message
   */
  id: string;

  /**
   * The RFC 5322 Message-ID header.
   */
  messageId: string;

  /**
   * The subject of the message.
   */
  subject: string;

  /**
   * The id of the thread.
   */
  threadId: string;
}

export interface MessageReplyResponse {
  /**
   * The id of the message
   */
  id: string;

  /**
   * The RFC 5322 Message-ID header.
   */
  messageId: string;

  /**
   * The subject of the message.
   */
  subject: string;

  /**
   * The id of the thread.
   */
  threadId: string;
}

export interface MessageUpdateParams {
  /**
   * Labels to add to the message.
   */
  addLabels?: Array<string>;

  /**
   * Labels to remove from the message.
   */
  removeLabels?: Array<string>;
}

export interface MessageListParams extends CursorPageParams {
  /**
   * Filter by domain.
   */
  domainId?: string;

  /**
   * Filter by sender address.
   */
  from?: string;
}

export interface MessageForwardParams {
  /**
   * The recipient addresses to forward to.
   */
  to: Array<string>;

  /**
   * An optional comment to prepend.
   */
  text?: string;
}

export interface MessageReplyParams {
  /**
   * The HTML body.
   */
  html?: string;

  /**
   * Whether to reply to all recipients.
   */
  replyAll?: boolean;

  /**
   * The plain text body.
   */
  text?: string;
}

Messages.Content = Content;
Messages.Attachments = Attachments;

export declare namespace Messages {
  export {
    type Message as Message,
    type MessageAttachment as MessageAttachment,
    type MessageContent as MessageContent,
    type MessageContentItem as MessageContentItem,
    type MessageDetail as MessageDetail,
    type MessageUpdateResponse as MessageUpdateResponse,
    type MessageForwardResponse as MessageForwardResponse,
    type MessageReplyResponse as MessageReplyResponse,
    type MessagesCursorPage as MessagesCursorPage,
    type MessageUpdateParams as MessageUpdateParams,
    type MessageListParams as MessageListParams,
    type MessageForwardParams as MessageForwardParams,
    type MessageReplyParams as MessageReplyParams,
  };

  export { Content as Content, type ContentRetrieveParams as ContentRetrieveParams };

  export {
    Attachments as Attachments,
    type AttachmentListResponse as AttachmentListResponse,
    type AttachmentRetrieveParams as AttachmentRetrieveParams,
  };
}
