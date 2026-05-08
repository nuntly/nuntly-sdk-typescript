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
