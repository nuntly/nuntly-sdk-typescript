// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@nuntly/sdk-mcp/filtering';
import { Metadata, asTextContentResult } from '@nuntly/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Nuntly from '@nuntly/sdk';

export const metadata: Metadata = {
  resource: 'domains',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/domains/{id}',
  operationId: 'update-domain',
};

export const tool: Tool = {
  name: 'update_domains',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpdates domain tracking settings\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The id of the domain'\n        },\n        kind: {\n          type: 'string',\n          description: 'The kind of object returned',\n          enum: [            'domain'\n          ]\n        },\n        org_id: {\n          type: 'string',\n          description: 'The id of the organization'\n        },\n        click_tracking: {\n          type: 'boolean',\n          description: 'Emit an event for each time the recipient clicks a link in the email'\n        },\n        open_tracking: {\n          type: 'boolean',\n          description: 'Emit an event for each recipient opens an email their email client'\n        }\n      },\n      required: [        'id',\n        'kind',\n        'org_id'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      click_tracking: {
        type: 'boolean',
        description: 'Emit an event for each time the recipient clicks a link in the email',
      },
      open_tracking: {
        type: 'boolean',
        description: 'Emit an event for each recipient opens an email their email client',
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
  annotations: {},
};

export const handler = async (client: Nuntly, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.domains.update(id, body)));
};

export default { metadata, tool, handler };
