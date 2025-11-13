// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@nuntly/sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@nuntly/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Nuntly from '@nuntly/sdk';

export const metadata: Metadata = {
  resource: 'emails.stats',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/emails/stats',
  operationId: 'retrieve-emails-stats',
};

export const tool: Tool = {
  name: 'list_emails_stats',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturn the emails stats\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/stat_list_response',\n  $defs: {\n    stat_list_response: {\n      type: 'object',\n      description: 'The emails stats',\n      properties: {\n        end: {\n          type: 'string',\n          format: 'date'\n        },\n        start: {\n          type: 'string',\n          format: 'date'\n        },\n        stats: {\n          type: 'array',\n          items: {\n            type: 'object',\n            properties: {\n              occurred_on: {\n                type: 'string',\n                format: 'date'\n              },\n              bounced: {\n                type: 'number'\n              },\n              clicked: {\n                type: 'number'\n              },\n              complaint_received: {\n                type: 'number'\n              },\n              delivered: {\n                type: 'number'\n              },\n              delivery_delayed: {\n                type: 'number'\n              },\n              opened: {\n                type: 'number'\n              },\n              rejected: {\n                type: 'number'\n              },\n              rendering_failed: {\n                type: 'number'\n              },\n              sent: {\n                type: 'number'\n              },\n              subscribed: {\n                type: 'number'\n              }\n            },\n            required: [              'occurred_on'\n            ]\n          }\n        }\n      },\n      required: [        'end',\n        'start',\n        'stats'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
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
  const { jq_filter } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.emails.stats.list()));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
