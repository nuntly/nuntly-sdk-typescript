import type { InboundEventData } from '../shared/types.js';

/**
 * @example
 *     await nuntly.messages.forward('imsg_01kabn43yqyxn2bx4ve84mczd3', {
 *       to: ['brian67@gmail.com'],
 *       text: 'Thank you for signing up! Please verify your email address.',
 *     });
 */
export interface ForwardMessageRequest {
  /** The recipient addresses to forward to. */
  to: Array<string>;
  /** An optional comment to prepend. */
  text?: string;
}

export interface MessageAgentTriggeredEvent {
  id: string;
  createdAt: string;
  type: 'message.agent.triggered';
  data: InboundEventData;
}

export interface MessageReceivedEvent {
  id: string;
  createdAt: string;
  type: 'message.received';
  data: InboundEventData;
}

export interface MessageRejectedEvent {
  id: string;
  createdAt: string;
  type: 'message.rejected';
  data: MessageRejectedEventData;
}

export interface MessageRejectedEventData {
  orgId: string;
  domainId: string;
  domainName: string;
  inboxId: string;
  from: string;
  subject: string;
  reason: 'inbox_storage_limit_exceeded' | 'message_too_large' | (string & {});
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
  status: 'received' | 'sent' | 'discarded' | 'failed' | (string & {});
  /** The message labels. */
  labels: Array<string>;
  /** The number of attachments. */
  attachmentCount: number;
  /** The raw email headers. */
  headers: Record<string, string> | null;
}

export interface MessageSecurityFlaggedEvent {
  id: string;
  createdAt: string;
  type: 'message.security.flagged';
  data: InboundEventData;
}

export interface MessageSentEvent {
  id: string;
  createdAt: string;
  type: 'message.sent';
  data: InboundEventData;
}

export interface MessagesQuery {
  /** The cursor to retrieve the next page of results */
  cursor?: string;
  /** The maximum number of results to return, from 1 to 30. Defaults to 30. */
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
  status: 'received' | 'sent' | 'discarded' | 'failed' | (string & {});
  /** The message labels. */
  labels: Array<string>;
  /** The number of attachments. */
  attachmentCount: number;
}

/**
 * @example
 *     await nuntly.messages.reply('imsg_01kabn43yqyxn2bx4ve84mczd3', {
 *       text: 'Thank you for signing up! Please verify your email address.',
 *       html: '<h1>Welcome</h1><p>Thank you for signing up! Please verify your email address.</p>',
 *     });
 */
export interface ReplyMessageRequest {
  /** The plain text body. */
  text?: string;
  /** The HTML body. */
  html?: string;
  /** Whether to reply to all recipients. */
  replyAll?: boolean;
}

/**
 * @example
 *     await nuntly.messages.update('imsg_01kabn43yqyxn2bx4ve84mczd3', {
 *       addLabels: ['urgent'],
 *     });
 */
export interface UpdateMessageRequest {
  /** Labels to add to the message. */
  addLabels?: Array<string>;
  /** Labels to remove from the message. */
  removeLabels?: Array<string>;
}
