// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@nuntly/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Nuntly from '@nuntly/sdk';

export const metadata: Metadata = {
  resource: 'webhooks.events',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/webhooks/{id}/events/{event_id}/replay',
  operationId: 'replay-webhook-event',
};

export const tool: Tool = {
  name: 'replay_webhooks_events',
  description: 'Replay the webhook event',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      event_id: {
        type: 'string',
      },
    },
    required: ['id', 'event_id'],
  },
  annotations: {},
};

export const handler = async (client: Nuntly, args: Record<string, unknown> | undefined) => {
  const { event_id, ...body } = args as any;
  return asTextContentResult((await client.webhooks.events.replay(event_id, body)) as object);
};

export default { metadata, tool, handler };
