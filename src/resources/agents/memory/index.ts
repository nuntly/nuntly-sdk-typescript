import { Resource } from '../../../core/index.js';
import type { APIPromise, RequestOptions } from '../../../core/index.js';
import type { AgentMemory, AgentMemoryRequest } from '../../types.js';


/**
 * AgentsMemory resource.
 */
export class AgentsMemory extends Resource {

  /**
   * Retrieve the memory for an AI agent.
   *
   * GET /agents/{agentId}/memory
   * @param agentId - string
   * @param options - RequestOptions
   * @returns APIPromise<AgentMemory>
   */
  retrieve(agentId: string, options?: RequestOptions): APIPromise<AgentMemory> {
    return this._http.get<{ data: AgentMemory }>({
      path: '/agents/{agentId}/memory',
      pathParams: { agentId },
      options,
    }).map((r) => r.data);
  }

  /**
   * Create or update the memory for an AI agent.
   *
   * PUT /agents/{agentId}/memory
   * @param agentId - string
   * @param body - AgentMemoryRequest
   * @param options - RequestOptions
   * @returns APIPromise<AgentMemory>
   */
  upsert(agentId: string, body: AgentMemoryRequest, options?: RequestOptions): APIPromise<AgentMemory> {
    return this._http.put<{ data: AgentMemory }>({
      path: '/agents/{agentId}/memory',
      pathParams: { agentId },
      body,
      options,
    }).map((r) => r.data);
  }

}
