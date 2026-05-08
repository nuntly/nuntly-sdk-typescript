export type EmailStatus = 'queued' | 'scheduled' | 'processed' | 'failed' | 'sending' | 'sent' | 'delivered' | 'bounced' | 'complained' | 'canceled' | 'rejected';

export type EventType = 'email.queued' | 'email.scheduled' | 'email.processed' | 'email.sending' | 'email.sent' | 'email.delivered' | 'email.opened' | 'email.clicked' | 'email.bounced' | 'email.complained' | 'email.rejected' | 'email.deliveryDelayed' | 'email.failed' | 'email.renderingFailed' | 'email.subscribed' | 'email.unsubscribed' | 'message.received' | 'message.security.flagged' | 'message.agent.triggered' | 'message.sent' | 'message.rejected';

export interface IdResponse {
  /** The id of the resource. */
  id: string;
}

/** A single item from InboxesResponse. */
export interface InboxesResponseItem {
  /** The id of the inbox */
  id: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt?: string;
  /** The id of the domain. */
  domainId: string;
  /** The domain name. */
  domainName: string;
  /** The local-part of the email address. */
  address: string;
  /** The display name of the inbox. */
  name: string | null;
  /** The id of the namespace. */
  namespaceId: string | null;
  /** The display name of the namespace. */
  namespaceName: string | null;
  /** The AI agent identifier. */
  agentId: string | null;
}

export interface SendMessageResponse {
  /** The id of the message */
  id: string;
  /** The id of the thread. */
  threadId: string;
  /** The RFC 5322 Message-ID header. */
  messageId: string;
  /** The subject of the message. */
  subject: string;
}
