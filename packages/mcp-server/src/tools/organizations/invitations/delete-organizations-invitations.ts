// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@nuntly/sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@nuntly/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Nuntly from '@nuntly/sdk';

export const metadata: Metadata = {
  resource: 'organizations.invitations',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/organizations/{id}/invitations/{invitation_id}',
  operationId: 'delete-organizations-invitations',
};

export const tool: Tool = {
  name: 'delete_organizations_invitations',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nDelete an invitation\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/invitation_delete_response',\n  $defs: {\n    invitation_delete_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The id of the organization'\n        },\n        invitation_id: {\n          type: 'string',\n          description: 'The id of the invitation'\n        },\n        kind: {\n          type: 'string',\n          description: 'The kind of object returned',\n          enum: [            'invitation'\n          ]\n        }\n      },\n      required: [        'id',\n        'invitation_id',\n        'kind'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      invitation_id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id', 'invitation_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Nuntly, args: Record<string, unknown> | undefined) => {
  const { invitation_id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(
      await maybeFilter(jq_filter, await client.organizations.invitations.delete(invitation_id, body)),
    );
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
