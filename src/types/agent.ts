export interface AgentMemory {
  /** The agent memory record id. */
  id: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt?: string;
  /** The agent identifier. */
  agentId: string;
  /** The inbox id. */
  inboxId: string | null;
  /** The thread id. */
  threadId: string | null;
  /** The agent memory data. */
  memory: Record<string, Record<string, unknown>>;
  /** The conversation summary. */
  summary: string | null;
}

export interface AgentMemoryRequest {
  /** The inbox id to scope the memory to. */
  inboxId?: string;
  /** The thread id to scope the memory to. */
  threadId?: string;
  /** The agent memory key-value data. */
  memory: Record<string, string | number | boolean | null | Array<string | number | boolean | null>>;
  /** A human-readable conversation summary. */
  summary?: string | null;
}
