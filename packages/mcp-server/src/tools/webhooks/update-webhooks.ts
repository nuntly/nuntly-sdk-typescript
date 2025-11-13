// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@nuntly/sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@nuntly/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Nuntly from '@nuntly/sdk';

export const metadata: Metadata = {
  resource: 'webhooks',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/webhooks/{id}',
  operationId: 'update-webhook',
};

export const tool: Tool = {
  name: 'update_webhooks',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpdates a webhook with the given ID\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/webhook_update_response',\n  $defs: {\n    webhook_update_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The id of the webhook'\n        },\n        kind: {\n          type: 'string',\n          description: 'The kind of object returned',\n          enum: [            'webhook'\n          ]\n        },\n        org_id: {\n          type: 'string',\n          description: 'The id of the organization'\n        },\n        signing_secret: {\n          type: 'string',\n          description: 'The signing secret of the webhook.'\n        }\n      },\n      required: [        'id',\n        'kind',\n        'org_id'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      endpoint_url: {
        type: 'string',
        description: 'The endpoint URL of the webhook',
      },
      events: {
        type: 'array',
        items: {
          $ref: '#/$defs/event_type',
        },
      },
      name: {
        type: 'string',
        description: 'The name of the webhook',
      },
      rotate_secret: {
        type: 'boolean',
        description: 'If true, a new signing secret will be generated',
      },
      status: {
        type: 'string',
        description: 'The status of the webhook.',
        enum: ['enabled', 'disabled'],
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id'],
    $defs: {
      event_type: {
        type: 'string',
        enum: [
          'email.sent',
          'email.delivered',
          'email.opened',
          'email.clicked',
          'email.bounced',
          'email.complained',
          'email.rejected',
          'email.delivery_delayed',
          'email.failed',
        ],
      },
    },
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Nuntly, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.webhooks.update(id, body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
