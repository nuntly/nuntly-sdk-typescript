// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@nuntly/sdk-mcp/filtering';
import { Metadata, asTextContentResult } from '@nuntly/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Nuntly from '@nuntly/sdk';

export const metadata: Metadata = {
  resource: 'organizations.usage',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/organizations/{id}/usage',
  operationId: 'retrieve-organization-usage',
};

export const tool: Tool = {
  name: 'retrieve_organizations_usage',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturn the organization usage\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/usage_retrieve_response',\n  $defs: {\n    usage_retrieve_response: {\n      type: 'object',\n      properties: {\n        daily: {\n          type: 'object',\n          properties: {\n            consumed: {\n              type: 'object',\n              properties: {\n                transac_emails: {\n                  type: 'number'\n                }\n              },\n              required: [                'transac_emails'\n              ]\n            },\n            period: {\n              type: 'string'\n            },\n            quota: {\n              type: 'object',\n              properties: {\n                transac_emails: {\n                  type: 'number'\n                }\n              },\n              required: [                'transac_emails'\n              ]\n            }\n          },\n          required: [            'consumed',\n            'period',\n            'quota'\n          ]\n        },\n        monthly: {\n          type: 'object',\n          properties: {\n            consumed: {\n              type: 'object',\n              properties: {\n                transac_emails: {\n                  type: 'number'\n                }\n              },\n              required: [                'transac_emails'\n              ]\n            },\n            period: {\n              type: 'string'\n            },\n            quota: {\n              type: 'object',\n              properties: {\n                transac_emails: {\n                  type: 'number'\n                }\n              },\n              required: [                'transac_emails'\n              ]\n            }\n          },\n          required: [            'consumed',\n            'period',\n            'quota'\n          ]\n        }\n      },\n      required: [        'daily',\n        'monthly'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Nuntly, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.organizations.usage.retrieve(id)));
};

export default { metadata, tool, handler };
