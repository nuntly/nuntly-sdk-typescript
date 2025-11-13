// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@nuntly/sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@nuntly/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Nuntly from '@nuntly/sdk';

export const metadata: Metadata = {
  resource: 'organizations.memberships',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/organizations/{id}/memberships/{user_id}',
  operationId: 'delete-organizations-memberships',
};

export const tool: Tool = {
  name: 'revoke_organizations_memberships',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRevoke a user from an organization\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/membership_revoke_response',\n  $defs: {\n    membership_revoke_response: {\n      type: 'object',\n      properties: {\n        kind: {\n          type: 'string',\n          description: 'The kind of object returned',\n          enum: [            'org-membership'\n          ]\n        },\n        org_id: {\n          type: 'string',\n          description: 'The id of the organization'\n        },\n        user_id: {\n          type: 'string',\n          description: 'The id of the account'\n        }\n      },\n      required: [        'kind',\n        'org_id',\n        'user_id'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      user_id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id', 'user_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Nuntly, args: Record<string, unknown> | undefined) => {
  const { user_id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(
      await maybeFilter(jq_filter, await client.organizations.memberships.revoke(user_id, body)),
    );
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
