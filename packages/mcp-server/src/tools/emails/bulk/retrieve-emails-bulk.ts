// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@nuntly/sdk-mcp/filtering';
import { Metadata, asTextContentResult } from '@nuntly/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Nuntly from '@nuntly/sdk';

export const metadata: Metadata = {
  resource: 'emails.bulk',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/emails/bulk/{id}',
  operationId: 'retrieve-bulk-emails',
};

export const tool: Tool = {
  name: 'retrieve_emails_bulk',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturn a list of emails\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/bulk_retrieve_response',\n  $defs: {\n    bulk_retrieve_response: {\n      type: 'object',\n      description: 'The emails in a given bulk',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The bulk id'\n        },\n        emails: {\n          type: 'array',\n          items: {\n            type: 'object',\n            properties: {\n              id: {\n                type: 'string',\n                description: 'The id of the email'\n              },\n              kind: {\n                type: 'string',\n                description: 'The kind of object returned',\n                enum: [                  'email'\n                ]\n              },\n              org_id: {\n                type: 'string',\n                description: 'The id of the organization'\n              },\n              status: {\n                $ref: '#/$defs/email_status'\n              },\n              status_at: {\n                type: 'string',\n                description: 'Date xhen the status changed'\n              }\n            },\n            required: [              'id',\n              'kind',\n              'org_id',\n              'status',\n              'status_at'\n            ]\n          }\n        },\n        kind: {\n          type: 'string',\n          description: 'The kind of object returned',\n          enum: [            'bulk-email'\n          ]\n        }\n      },\n      required: [        'id',\n        'emails',\n        'kind'\n      ]\n    },\n    email_status: {\n      type: 'string',\n      description: 'The status of the email.',\n      enum: [        'queued',\n        'scheduled',\n        'processed',\n        'failed',\n        'sending',\n        'sent',\n        'delivered',\n        'bounced',\n        'canceled',\n        'rejected'\n      ]\n    }\n  }\n}\n```",
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.emails.bulk.retrieve(id)));
};

export default { metadata, tool, handler };
