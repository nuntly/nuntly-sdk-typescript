// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AgentsAPI from './agents';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Read and write persistent state for an AI agent, optionally scoped to a specific inbox or thread.
 */
export class Memory extends APIResource {
  /**
   * Retrieve the memory for an AI agent.
   */
  retrieve(agentID: string, query: MemoryRetrieveParams | null | undefined = {}, options?: RequestOptions): APIPromise<AgentsAPI.AgentMemory> {
    return (this._client.get(path`/agents/${agentID}/memory`, { query, ...options }) as APIPromise<{ data: AgentsAPI.AgentMemory }>)._thenUnwrap((obj) => obj.data);
  }

  /**
   * Create or update the memory for an AI agent.
   */
  upsert(agentID: string, body: MemoryUpsertParams, options?: RequestOptions): APIPromise<AgentsAPI.AgentMemory> {
    return (this._client.put(path`/agents/${agentID}/memory`, { body, ...options }) as APIPromise<{ data: AgentsAPI.AgentMemory }>)._thenUnwrap((obj) => obj.data);
  }
}

export interface MemoryRetrieveParams {
  /**
   * Scope memory to a specific inbox.
   */
  inboxId?: string;

  /**
   * Scope memory to a specific thread.
   */
  threadId?: string;
}

export interface MemoryUpsertParams {
  /**
   * The agent memory key-value data.
   */
  memory: { [key: string]: string | number | boolean | null | Array<string | number | boolean | null> };

  /**
   * The inbox id to scope the memory to.
   */
  inboxId?: string;

  /**
   * A human-readable conversation summary.
   */
  summary?: string | null;

  /**
   * The thread id to scope the memory to.
   */
  threadId?: string;
}

export declare namespace Memory {
  export {
    type MemoryRetrieveParams as MemoryRetrieveParams,
    type MemoryUpsertParams as MemoryUpsertParams
  };
}
