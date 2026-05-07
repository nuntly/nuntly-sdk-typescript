import { Resource } from '@nuntly/sdk-core';
import type { NuntlyClient } from '@nuntly/sdk-core';

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
