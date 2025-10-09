// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@nuntly/sdk-mcp/filtering';
import { Metadata, asTextContentResult } from '@nuntly/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Nuntly from '@nuntly/sdk';

export const metadata: Metadata = {
  resource: 'organizations',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/organizations/{id}',
  operationId: 'update-organization',
};

export const tool: Tool = {
  name: 'update_organizations',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nPatch the organization\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      $ref: '#/$defs/organization_update_response'\n    }\n  },\n  $defs: {\n    organization_update_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The id of the account'\n        },\n        kind: {\n          type: 'string',\n          description: 'The kind of object returned',\n          enum: [            'organization'\n          ]\n        }\n      },\n      required: [        'id',\n        'kind'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      display_name: {
        type: 'string',
        description: 'The display name of the organization',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id', 'display_name'],
  },
  annotations: {},
};

export const handler = async (client: Nuntly, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.organizations.update(id, body)));
};

export default { metadata, tool, handler };
