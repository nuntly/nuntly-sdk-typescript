// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@nuntly/sdk-mcp/filtering';
import { Metadata, asTextContentResult } from '@nuntly/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Nuntly from '@nuntly/sdk';

export const metadata: Metadata = {
  resource: 'api_keys',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api-keys',
  operationId: 'list-api-keys',
};

export const tool: Tool = {
  name: 'list_api_keys',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturn a list of your api keys\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'array',\n      description: 'The api keys registered in your account',\n      items: {\n        type: 'object',\n        properties: {\n          id: {\n            type: 'string',\n            description: 'The id of the api key'\n          },\n          apikey_truncated: {\n            type: 'string',\n            description: 'The truncated content of the api key'\n          },\n          created_at: {\n            type: 'string',\n            description: 'Date at which the object was created (ISO 8601 format)',\n            format: 'date-time'\n          },\n          kind: {\n            type: 'string',\n            description: 'The kind of object returned',\n            enum: [              'api-key'\n            ]\n          },\n          org_id: {\n            type: 'string',\n            description: 'The id of the organization'\n          },\n          region: {\n            type: 'string',\n            description: 'The region of the related data',\n            enum: [              'eu-west-1'\n            ]\n          },\n          status: {\n            type: 'string',\n            description: 'The status of the api key',\n            enum: [              'enabled',\n              'disabled',\n              'revoked'\n            ]\n          },\n          user_id: {\n            type: 'string',\n            description: 'The id of the user'\n          },\n          modified_at: {\n            type: 'string',\n            description: 'Date at which the object was modified (ISO 8601 format)',\n            format: 'date-time'\n          },\n          name: {\n            type: 'string',\n            description: 'The name of the api key'\n          }\n        },\n        required: [          'id',\n          'apikey_truncated',\n          'created_at',\n          'kind',\n          'org_id',\n          'region',\n          'status',\n          'user_id'\n        ]\n      }\n    },\n    next_cursor: {\n      type: 'string'\n    }\n  }\n}\n```",
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
  const response = await client.apiKeys.list(body).asResponse();
  return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
};

export default { metadata, tool, handler };
