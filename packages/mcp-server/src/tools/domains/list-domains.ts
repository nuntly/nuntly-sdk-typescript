// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@nuntly/sdk-mcp/filtering';
import { Metadata, asTextContentResult } from '@nuntly/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Nuntly from '@nuntly/sdk';

export const metadata: Metadata = {
  resource: 'domains',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/domains',
  operationId: 'list-domains',
};

export const tool: Tool = {
  name: 'list_domains',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturn a list of your domains\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'array',\n      description: 'The domains registered in your account',\n      items: {\n        type: 'object',\n        properties: {\n          id: {\n            type: 'string',\n            description: 'The id of the domain'\n          },\n          created_at: {\n            type: 'string',\n            description: 'Date at which the object was created (ISO 8601 format)',\n            format: 'date-time'\n          },\n          kind: {\n            type: 'string',\n            description: 'The kind of object returned',\n            enum: [              'domain'\n            ]\n          },\n          name: {\n            type: 'string',\n            description: 'The name of the domain. For example: \\'email.mycompany.com\\''\n          },\n          org_id: {\n            type: 'string',\n            description: 'The id of the organization'\n          },\n          region: {\n            type: 'string',\n            description: 'The region of the related data',\n            enum: [              'eu-west-1'\n            ]\n          },\n          sending_status: {\n            type: 'string',\n            description: 'The sending status for the domain',\n            enum: [              'enabled',\n              'disabled'\n            ]\n          },\n          status: {\n            type: 'string',\n            description: 'The status for the domain',\n            enum: [              'bootstrapping',\n              'pending',\n              'success',\n              'failed',\n              'temporary_failure'\n            ]\n          },\n          status_at: {\n            type: 'string',\n            description: 'The date of the lastest verification of the status'\n          },\n          modified_at: {\n            type: 'string',\n            description: 'Date at which the object was modified (ISO 8601 format)',\n            format: 'date-time'\n          }\n        },\n        required: [          'id',\n          'created_at',\n          'kind',\n          'name',\n          'org_id',\n          'region',\n          'sending_status',\n          'status',\n          'status_at'\n        ]\n      }\n    },\n    next_cursor: {\n      type: 'string'\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      cursor: {
        type: 'string',
        description: 'The cursor to use for pagination',
      },
      limit: {
        type: 'number',
        description: 'The number of emails to return',
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
  const response = await client.domains.list(body).asResponse();
  return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
};

export default { metadata, tool, handler };
