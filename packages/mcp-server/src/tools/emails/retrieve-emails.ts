// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@nuntly/sdk-mcp/filtering';
import { Metadata, asTextContentResult } from '@nuntly/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Nuntly from '@nuntly/sdk';

export const metadata: Metadata = {
  resource: 'emails',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/emails/{id}',
  operationId: 'retrieve-email',
};

export const tool: Tool = {
  name: 'retrieve_emails',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturn the email with the given id\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The id of the email'\n        },\n        created_at: {\n          type: 'string',\n          description: 'Date at which the object was created (ISO 8601 format)',\n          format: 'date-time'\n        },\n        from: {\n          type: 'string',\n          description: 'The e-mail address of the sender'\n        },\n        kind: {\n          type: 'string',\n          description: 'The kind of object returned',\n          enum: [            'email'\n          ]\n        },\n        org_id: {\n          type: 'string',\n          description: 'The id of the organization'\n        },\n        region: {\n          type: 'string',\n          description: 'The region of the related data',\n          enum: [            'eu-west-1'\n          ]\n        },\n        status: {\n          $ref: '#/$defs/email_status'\n        },\n        status_at: {\n          type: 'string',\n          description: 'Date xhen the status changed'\n        },\n        subject: {\n          type: 'string',\n          description: 'The subject of the e-mail'\n        },\n        to: {\n          anyOf: [            {\n              type: 'array',\n              items: {\n                type: 'string'\n              }\n            },\n            {\n              type: 'string'\n            }\n          ],\n          description: 'The primary recipient(s) of the email'\n        },\n        attachments: {\n          type: 'array',\n          description: 'The attachements',\n          items: {\n            type: 'object',\n            description: 'The attachment',\n            properties: {\n              content_type: {\n                type: 'string',\n                description: 'Content type of the attachment (the MIME type)'\n              },\n              filename: {\n                type: 'string',\n                description: 'The name of the attached file to be displayed to the recipient'\n              }\n            }\n          }\n        },\n        bcc: {\n          anyOf: [            {\n              type: 'array',\n              items: {\n                type: 'string'\n              }\n            },\n            {\n              type: 'string'\n            }\n          ],\n          description: 'The blind carbon copy recipient(s) of the email'\n        },\n        bulk_id: {\n          type: 'string',\n          description: 'The bulk id'\n        },\n        cc: {\n          anyOf: [            {\n              type: 'array',\n              items: {\n                type: 'string'\n              }\n            },\n            {\n              type: 'string'\n            }\n          ],\n          description: 'The carbon copy recipient(s) of the email'\n        },\n        context: {\n          type: 'object',\n          description: 'The context for the template',\n          additionalProperties: true\n        },\n        headers: {\n          type: 'object',\n          description: 'The headers to add to the email',\n          additionalProperties: true\n        },\n        message_id: {\n          type: 'string',\n          description: 'The id from email provider'\n        },\n        modified_at: {\n          type: 'string',\n          description: 'Date at which the object was modified (ISO 8601 format)',\n          format: 'date-time'\n        },\n        reply_to: {\n          anyOf: [            {\n              type: 'array',\n              items: {\n                type: 'string'\n              }\n            },\n            {\n              type: 'string'\n            }\n          ],\n          description: 'The email address where replies should be sent. If a recipient replies, the response will go to this address instead of the sender\\'s email address'\n        },\n        scheduled_at: {\n          type: 'string',\n          description: 'The date at which the email is scheduled to be sent',\n          format: 'date-time'\n        },\n        status_reason: {\n          type: 'object',\n          description: 'May provide more informations about the status',\n          additionalProperties: true\n        },\n        tags: {\n          type: 'array',\n          description: 'The tags to add to the email',\n          items: {\n            type: 'object',\n            description: 'The tag to add to the email and you can get via email id or in webhook events',\n            properties: {\n              name: {\n                type: 'string',\n                description: 'The name of the tag'\n              },\n              value: {\n                type: 'string',\n                description: 'The tag to add to the email'\n              }\n            },\n            required: [              'name',\n              'value'\n            ]\n          }\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'from',\n        'kind',\n        'org_id',\n        'region',\n        'status',\n        'status_at',\n        'subject',\n        'to'\n      ]\n    }\n  },\n  $defs: {\n    email_status: {\n      type: 'string',\n      description: 'The status of the email.',\n      enum: [        'queued',\n        'scheduled',\n        'processed',\n        'failed',\n        'sending',\n        'sent',\n        'delivered',\n        'bounced',\n        'canceled',\n        'rejected'\n      ]\n    }\n  }\n}\n```",
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.emails.retrieve(id)));
};

export default { metadata, tool, handler };
