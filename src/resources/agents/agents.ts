// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as MemoryAPI from './memory';
import { Memory, MemoryRetrieveParams, MemoryUpsertParams } from './memory';

export class Agents extends APIResource {
  memory: MemoryAPI.Memory = new MemoryAPI.Memory(this._client);
}

export interface AgentMemory {
  /**
   * The agent memory record id.
   */
  id: string;

  /**
   * The agent identifier.
   */
  agentId: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  createdAt: string;

  /**
   * The inbox id.
   */
  inboxId: string | null;

  /**
   * The agent memory data.
   */
  memory: { [key: string]: unknown };

  /**
   * The conversation summary.
   */
  summary: string | null;

  /**
   * The thread id.
   */
  threadId: string | null;

  /**
   * Date at which the object was updated (ISO 8601 format)
   */
  updatedAt?: string;
}

Agents.Memory = Memory;

export declare namespace Agents {
  export { type AgentMemory as AgentMemory };

  export {
    Memory as Memory,
    type MemoryRetrieveParams as MemoryRetrieveParams,
    type MemoryUpsertParams as MemoryUpsertParams,
  };
}
