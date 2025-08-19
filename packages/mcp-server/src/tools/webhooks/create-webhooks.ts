// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@nuntly/sdk-mcp/filtering';
import { Metadata, asTextContentResult } from '@nuntly/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Nuntly from '@nuntly/sdk';

export const metadata: Metadata = {
  resource: 'webhooks',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/webhooks',
  operationId: 'create-webhook',
};

export const tool: Tool = {
  name: 'create_webhooks',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreate a webhook so the endpoint is notified from Nuntly platform events (Emails events)\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The id of the webhook'\n        },\n        created_at: {\n          type: 'string',\n          description: 'Date at which the object was created (ISO 8601 format)',\n          format: 'date-time'\n        },\n        endpoint_url: {\n          type: 'string',\n          description: 'The endpoint URL of the webhook'\n        },\n        events: {\n          type: 'array',\n          items: {\n            $ref: '#/$defs/webhook_event_type'\n          }\n        },\n        kind: {\n          type: 'string',\n          description: 'The kind of object returned',\n          enum: [            'webhook'\n          ]\n        },\n        org_id: {\n          type: 'string',\n          description: 'The id of the organization'\n        },\n        region: {\n          type: 'string',\n          description: 'The region of the related data',\n          enum: [            'eu-west-1'\n          ]\n        },\n        signing_secret: {\n          type: 'string',\n          description: 'The signing secret of the webhook.'\n        },\n        status: {\n          type: 'string',\n          description: 'The status of the webhook.',\n          enum: [            'enabled',\n            'disabled',\n            'revoked'\n          ]\n        },\n        modified_at: {\n          type: 'string',\n          description: 'Date at which the object was modified (ISO 8601 format)',\n          format: 'date-time'\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the webhook'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'endpoint_url',\n        'events',\n        'kind',\n        'org_id',\n        'region',\n        'signing_secret',\n        'status'\n      ]\n    }\n  },\n  $defs: {\n    webhook_event_type: {\n      type: 'string',\n      description: 'The webhook events',\n      enum: [        'email.sent',\n        'email.delivered',\n        'email.opened',\n        'email.clicked',\n        'email.bounced',\n        'email.complained',\n        'email.rejected',\n        'email.delivery_delayed',\n        'email.failed'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      endpoint_url: {
        type: 'string',
        description: 'The endpoint URL of the webhook',
      },
      events: {
        type: 'array',
        items: {
          $ref: '#/$defs/webhook_event_type',
        },
      },
      status: {
        type: 'string',
        description: 'The status of the webhook.',
        enum: ['enabled', 'disabled', 'revoked'],
      },
      name: {
        type: 'string',
        description: 'The name of the webhook',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['endpoint_url', 'events', 'status'],
    $defs: {
      webhook_event_type: {
        type: 'string',
        description: 'The webhook events',
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
  annotations: {},
};

export const handler = async (client: Nuntly, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.webhooks.create(body)));
};

export default { metadata, tool, handler };
