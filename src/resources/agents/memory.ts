import { Resource } from '../../core/index.js';
import type { RequestOptions } from '../../core/index.js';
import type { AgentMemory, AgentMemoryRequest } from '../../types/index.js';


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
   * @returns Promise<AgentMemory>
   */
  async retrieve(agentId: string, options?: RequestOptions): Promise<AgentMemory> {
    const response = await this._http.get<{ data: AgentMemory }>(`/agents/${agentId}/memory`, undefined, options);
    return response.data;
  }

  /**
   * Create or update the memory for an AI agent.
   *
   * PUT /agents/{agentId}/memory
   * @param agentId - string
   * @param body - AgentMemoryRequest
   * @param options - RequestOptions
   * @returns Promise<AgentMemory>
   */
  async upsert(agentId: string, body: AgentMemoryRequest, options?: RequestOptions): Promise<AgentMemory> {
    const response = await this._http.put<{ data: AgentMemory }>(`/agents/${agentId}/memory`, body, options);
    return response.data;
  }

}
