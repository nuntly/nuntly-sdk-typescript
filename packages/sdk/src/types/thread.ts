/** A single item from ThreadMessagesResponse. */
export interface ThreadMessagesResponseItem {
  /** The id of the message */
  id: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
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

export interface ThreadResponse {
  /** The id of the thread */
  id: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt?: string;
  /** The id of the domain. */
  domainId: string | null;
  /** The domain name. */
  domainName: string;
  /** The id of the inbox. */
  inboxId: string;
  /** The original subject line. */
  subject: string;
  /** The timestamp of the most recent message. */
  lastMessageAt: string;
  /** The number of messages in the thread. */
  messageCount: number;
  /** Aggregated labels from all messages in the thread. */
  labels: Array<string>;
  /** The AI agent identifier. */
  agentId: string | null;
}

export interface ThreadsQuery {
  /** The cursor to retrieve the next page of results */
  cursor?: string;
  /** The maximum number of results to return */
  limit?: number;
  /** Comma-separated labels to filter by (AND logic). Threads with spam/trash are excluded by default unless explicitly requested via ?labels=spam or ?labels=trash. */
  labels?: string;
}

/** A single item from ThreadsResponse. */
export interface ThreadsResponseItem {
  /** The id of the thread */
  id: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt?: string;
  /** The id of the domain. */
  domainId: string | null;
  /** The domain name. */
  domainName: string;
  /** The id of the inbox. */
  inboxId: string;
  /** The original subject line. */
  subject: string;
  /** The timestamp of the most recent message. */
  lastMessageAt: string;
  /** The number of messages in the thread. */
  messageCount: number;
  /** Aggregated labels from all messages in the thread. */
  labels: Array<string>;
  /** The AI agent identifier. */
  agentId: string | null;
}

export interface UpdateThreadRequest {
  /** Labels to add to all messages in the thread. */
  addLabels?: Array<string>;
  /** Labels to remove from all messages in the thread. */
  removeLabels?: Array<string>;
  /** The AI agent identifier. */
  agentId?: string | null;
}
