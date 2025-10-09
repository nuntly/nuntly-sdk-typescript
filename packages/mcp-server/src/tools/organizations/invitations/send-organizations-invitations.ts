// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@nuntly/sdk-mcp/filtering';
import { Metadata, asTextContentResult } from '@nuntly/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Nuntly from '@nuntly/sdk';

export const metadata: Metadata = {
  resource: 'organizations.invitations',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/organizations/{id}/invitations',
  operationId: 'create-organizations-invitations',
};

export const tool: Tool = {
  name: 'send_organizations_invitations',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nSend an invitation to someone you wish to invite to join your organization\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      $ref: '#/$defs/invitation_send_response'\n    }\n  },\n  $defs: {\n    invitation_send_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The id of the invitation'\n        },\n        created_at: {\n          type: 'string',\n          description: 'Date at which the object was created (ISO 8601 format)',\n          format: 'date-time'\n        },\n        email: {\n          type: 'string',\n          description: 'The e-mail to send an invitation'\n        },\n        invitation_expired_at: {\n          type: 'string'\n        },\n        inviter_email: {\n          type: 'string',\n          description: 'The inviter e-mail'\n        },\n        kind: {\n          type: 'string',\n          description: 'The kind of object returned',\n          enum: [            'invitation'\n          ]\n        },\n        org_id: {\n          type: 'string',\n          description: 'The id of the organization'\n        },\n        region: {\n          type: 'string',\n          description: 'The region of the related data',\n          enum: [            'eu-west-1'\n          ]\n        },\n        status: {\n          type: 'string',\n          description: 'The status of the invitation',\n          enum: [            'pending',\n            'accepted',\n            'declined',\n            'done'\n          ]\n        },\n        modified_at: {\n          type: 'string',\n          description: 'Date at which the object was modified (ISO 8601 format)',\n          format: 'date-time'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'email',\n        'invitation_expired_at',\n        'inviter_email',\n        'kind',\n        'org_id',\n        'region',\n        'status'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      email: {
        type: 'string',
        description: 'The e-mail to send an invitation',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id', 'email'],
  },
  annotations: {},
};

export const handler = async (client: Nuntly, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await client.organizations.invitations.send(id, body)),
  );
};

export default { metadata, tool, handler };
