// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@nuntly/sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@nuntly/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Nuntly from '@nuntly/sdk';

export const metadata: Metadata = {
  resource: 'webhooks.events',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/webhooks/events',
  operationId: 'list-webhook-events',
};

export const tool: Tool = {
  name: 'list_webhooks_events',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturn the last events sent by webhooks\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'array',\n      description: 'The events sent by a webhook',\n      items: {\n        $ref: '#/$defs/event_list_response'\n      }\n    },\n    next_cursor: {\n      type: 'string'\n    }\n  },\n  $defs: {\n    event_list_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The id of the webhook event'\n        },\n        data: {\n          $ref: '#/$defs/event'\n        },\n        event: {\n          $ref: '#/$defs/event_type'\n        },\n        org_id: {\n          type: 'string',\n          description: 'The id of the organization'\n        },\n        received_at: {\n          type: 'string',\n          description: 'The timestamp when the event was received by the webhook system',\n          format: 'date-time'\n        },\n        status: {\n          type: 'string',\n          description: 'Status of the webhook delivery attempt',\n          enum: [            'success',\n            'pending',\n            'failed'\n          ]\n        },\n        webhook_id: {\n          type: 'string',\n          description: 'The id of the webhook'\n        }\n      },\n      required: [        'id',\n        'data',\n        'event',\n        'org_id',\n        'received_at',\n        'status',\n        'webhook_id'\n      ]\n    },\n    event: {\n      anyOf: [        {\n          $ref: '#/$defs/email_sent_event'\n        },\n        {\n          $ref: '#/$defs/email_delivered_event'\n        },\n        {\n          $ref: '#/$defs/email_opened_event'\n        },\n        {\n          $ref: '#/$defs/email_clicked_event'\n        },\n        {\n          $ref: '#/$defs/email_bounced_event'\n        },\n        {\n          $ref: '#/$defs/email_complained_event'\n        },\n        {\n          $ref: '#/$defs/email_rejected_event'\n        },\n        {\n          $ref: '#/$defs/email_delivery_delayed_event'\n        },\n        {\n          $ref: '#/$defs/email_failed_event'\n        }\n      ],\n      description: 'The event payload'\n    },\n    email_sent_event: {\n      allOf: [        {\n          $ref: '#/$defs/base_event'\n        }\n      ]\n    },\n    base_event: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        created_at: {\n          type: 'string'\n        },\n        type: {\n          $ref: '#/$defs/event_type'\n        },\n        kind: {\n          type: 'string',\n          enum: [            'event'\n          ]\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'type'\n      ]\n    },\n    event_type: {\n      type: 'string',\n      enum: [        'email.sent',\n        'email.delivered',\n        'email.opened',\n        'email.clicked',\n        'email.bounced',\n        'email.complained',\n        'email.rejected',\n        'email.delivery_delayed',\n        'email.failed'\n      ]\n    },\n    email_delivered_event: {\n      allOf: [        {\n          $ref: '#/$defs/base_event'\n        }\n      ]\n    },\n    email_opened_event: {\n      allOf: [        {\n          $ref: '#/$defs/base_event'\n        }\n      ]\n    },\n    email_clicked_event: {\n      allOf: [        {\n          $ref: '#/$defs/base_event'\n        }\n      ]\n    },\n    email_bounced_event: {\n      allOf: [        {\n          $ref: '#/$defs/base_event'\n        }\n      ]\n    },\n    email_complained_event: {\n      allOf: [        {\n          $ref: '#/$defs/base_event'\n        }\n      ]\n    },\n    email_rejected_event: {\n      allOf: [        {\n          $ref: '#/$defs/base_event'\n        }\n      ]\n    },\n    email_delivery_delayed_event: {\n      allOf: [        {\n          $ref: '#/$defs/base_event'\n        }\n      ]\n    },\n    email_failed_event: {\n      allOf: [        {\n          $ref: '#/$defs/base_event'\n        }\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      cursor: {
        type: 'string',
        description: 'The cursor to use for pagination',
      },
      limit: {
        type: 'number',
        description: 'The maximum number of items to return',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Nuntly, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  const response = await client.webhooks.events.list(body).asResponse();
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
