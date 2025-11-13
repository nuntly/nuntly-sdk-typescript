// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@nuntly/sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@nuntly/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Nuntly from '@nuntly/sdk';

export const metadata: Metadata = {
  resource: 'organizations.memberships',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/organizations/{id}/memberships',
  operationId: 'list-organizations-memberships',
};

export const tool: Tool = {
  name: 'list_organizations_memberships',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturn the organization memberships\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'array',\n      description: 'The organization membership',\n      items: {\n        $ref: '#/$defs/membership_list_response'\n      }\n    },\n    next_cursor: {\n      type: 'string'\n    }\n  },\n  $defs: {\n    membership_list_response: {\n      type: 'object',\n      properties: {\n        created_at: {\n          type: 'string',\n          description: 'Date at which the object was created (ISO 8601 format)',\n          format: 'date-time'\n        },\n        display_name: {\n          type: 'string',\n          description: 'The display name of the organization'\n        },\n        email: {\n          type: 'string',\n          description: 'The e-mail to send an invitation'\n        },\n        kind: {\n          type: 'string',\n          description: 'The kind of object returned',\n          enum: [            'org-membership'\n          ]\n        },\n        org_id: {\n          type: 'string',\n          description: 'The id of the organization'\n        },\n        region: {\n          type: 'string',\n          description: 'The region of the related data',\n          enum: [            'eu-west-1'\n          ]\n        },\n        role: {\n          type: 'string',\n          description: 'The role in the organization',\n          enum: [            'owner',\n            'member'\n          ]\n        },\n        status: {\n          type: 'string',\n          description: 'The status of the membership',\n          enum: [            'active',\n            'pending',\n            'revoked',\n            'suspended'\n          ]\n        },\n        user_id: {\n          type: 'string',\n          description: 'The id of the account'\n        },\n        modified_at: {\n          type: 'string',\n          description: 'Date at which the object was modified (ISO 8601 format)',\n          format: 'date-time'\n        }\n      },\n      required: [        'created_at',\n        'display_name',\n        'email',\n        'kind',\n        'org_id',\n        'region',\n        'role',\n        'status',\n        'user_id'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
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
    required: ['id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Nuntly, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  const response = await client.organizations.memberships.list(id, body).asResponse();
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
