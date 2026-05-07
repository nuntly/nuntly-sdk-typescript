import { Resource } from '../core/index.js';
import type { NuntlyClient } from '../core/index.js';

import { AgentsMemory } from './agents/memory.js';

/**
 * Agents resource.
 */
export class Agents extends Resource {
  memory: AgentsMemory;

  constructor(client: NuntlyClient) {
    super(client);
    this.memory = new AgentsMemory(client);
  }

}
