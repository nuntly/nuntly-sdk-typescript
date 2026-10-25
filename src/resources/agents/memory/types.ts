export interface AgentMemory {
  /** The agent memory record id. */
  id: string | null;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string | null;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt: string | null;
  /** The agent identifier. */
  agentId: string;
  /** The inbox id. */
  inboxId: string | null;
  /** The thread id. */
  threadId: string | null;
  /** The agent memory data. */
  memory: Record<string, string | number | boolean | null | Array<string | number | boolean | null>>;
  /** The conversation summary. */
  summary: string | null;
}

export interface AgentMemoryQuery {
  /** The id of an inbox in your organization. Scopes memory to that inbox. */
  inboxId?: string;
  /** The id of a thread in your organization. Scopes memory to that thread. */
  threadId?: string;
}

/**
 * @example
 *     await nuntly.agents.memory.upsert('aB3dE7fG', {
 *       memory: { lastTopic: 'billing', openTickets: 2 },
 *     });
 */
export interface AgentMemoryRequest {
  /** The id of an inbox in your organization. Scopes memory to that inbox. */
  inboxId?: string;
  /** The id of a thread in your organization. Scopes memory to that thread. */
  threadId?: string;
  /** The agent memory key-value data. */
  memory: Record<string, string | number | boolean | null | Array<string | number | boolean | null>>;
  /** A human-readable conversation summary. */
  summary?: string | null;
}
