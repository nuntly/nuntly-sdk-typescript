import type { APIPromise, RequestOptions } from '../../../core/index.js';
import { Resource } from '../../../core/index.js';
import type { AgentMemory, AgentMemoryQuery, AgentMemoryRequest } from '../../types.js';

/**
 * AgentsMemory resource.
 */
export class AgentsMemory extends Resource {
  /**
   * Retrieves the key-value memory and summary saved for an AI agent, at organization level or scoped to one inbox or thread via query parameters.
   *
   * GET /agents/{agentId}/memory
   * @param agentId - string
   * @param query - AgentMemoryQuery
   * @param options - RequestOptions
   * @returns APIPromise<AgentMemory>
   */
  retrieve(agentId: string, query?: AgentMemoryQuery, options?: RequestOptions): APIPromise<AgentMemory> {
    return this._http
      .get<{ data: AgentMemory }>({
        path: '/agents/{agentId}/memory',
        pathParams: { agentId },
        query: query as unknown as Record<string, unknown>,
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Saves the key-value memory and optional summary of an AI agent, at organization level or scoped to a specific inbox or thread. Returns the saved memory.
   *
   * PUT /agents/{agentId}/memory
   * @param agentId - string
   * @param body - AgentMemoryRequest
   * @param options - RequestOptions
   * @returns APIPromise<AgentMemory>
   */
  upsert(agentId: string, body: AgentMemoryRequest, options?: RequestOptions): APIPromise<AgentMemory> {
    return this._http
      .put<{ data: AgentMemory }>({
        path: '/agents/{agentId}/memory',
        pathParams: { agentId },
        body,
        options,
      })
      .map((r) => r.data);
  }
}
