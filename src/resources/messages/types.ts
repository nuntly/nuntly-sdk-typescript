/**
 * @example
 *     await nuntly.messages.forward({
 *       to: 'user@example.com',
 *     });
 */
export interface ForwardMessageRequest {
  /** The recipient addresses to forward to. */
  to: Array<string>;
  /** An optional comment to prepend. */
  text?: string;
}

export interface MessageResponse {
  /** The id of the message */
  id: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** The id of the inbox, or null if routed to the default catch-all. */
  inboxId: string | null;
  /** The id of the thread. */
  threadId: string;
  /** The email Message-ID header. */
  messageId: string;
  /** The sender address (RFC 5322 format, e.g. "Jane Doe <jane@example.com>" or "jane@example.com"). */
  from: string;
  /** The recipient addresses. */
  to: Array<string>;
  /** The CC addresses. */
  cc: Array<string> | null;
  /** The BCC addresses. */
  bcc: Array<string> | null;
  /** The Reply-To addresses. */
  replyTo: Array<string> | null;
  /** The message subject. */
  subject: string;
  /** The original date of the message. */
  receivedAt: string;
  /** The status of the message */
  status: 'received' | 'sent' | 'discarded' | 'failed';
  /** The message labels. */
  labels: Array<string>;
  /** The number of attachments. */
  attachmentCount: number;
  /** The raw email headers. */
  headers: Record<string, string> | null;
}

export interface MessagesQuery {
  /** The cursor to retrieve the next page of results */
  cursor?: string;
  /** The maximum number of results to return */
  limit?: number;
  /** Filter by domain. */
  domainId?: string;
  /** Filter by sender address. */
  from?: string;
}

/** A single item from MessagesResponse. */
export interface MessagesResponseItem {
  /** The id of the message */
  id: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** The id of the inbox, or null if routed to the default catch-all. */
  inboxId: string | null;
  /** The id of the thread. */
  threadId: string;
  /** The email Message-ID header. */
  messageId: string;
  /** The sender address (RFC 5322 format, e.g. "Jane Doe <jane@example.com>" or "jane@example.com"). */
  from: string;
  /** The recipient addresses. */
  to: Array<string>;
  /** The CC addresses. */
  cc: Array<string> | null;
  /** The BCC addresses. */
  bcc: Array<string> | null;
  /** The Reply-To addresses. */
  replyTo: Array<string> | null;
  /** The message subject. */
  subject: string;
  /** The original date of the message. */
  receivedAt: string;
  /** The status of the message */
  status: 'received' | 'sent' | 'discarded' | 'failed';
  /** The message labels. */
  labels: Array<string>;
  /** The number of attachments. */
  attachmentCount: number;
}

/**
 * @example
 *     await nuntly.messages.reply({
 *       replyAll: false,
 *     });
 */
export interface ReplyMessageRequest {
  /** The plain text body. */
  text?: string;
  /** The HTML body. */
  html?: string;
  /** Whether to reply to all recipients. */
  replyAll: boolean;
}

export interface UpdateMessageRequest {
  /** Labels to add to the message. */
  addLabels?: Array<string>;
  /** Labels to remove from the message. */
  removeLabels?: Array<string>;
}
