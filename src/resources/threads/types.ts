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

export interface UpdateThreadRequest {
  /** Labels to add to all messages in the thread. */
  addLabels?: Array<string>;
  /** Labels to remove from all messages in the thread. */
  removeLabels?: Array<string>;
  /** The AI agent identifier. */
  agentId?: string | null;
}
