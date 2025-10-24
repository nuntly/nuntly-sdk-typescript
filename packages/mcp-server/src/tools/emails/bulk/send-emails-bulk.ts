// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@nuntly/sdk-mcp/filtering';
import { Metadata, asTextContentResult } from '@nuntly/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Nuntly from '@nuntly/sdk';

export const metadata: Metadata = {
  resource: 'emails.bulk',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/emails/bulk',
  operationId: 'bulk-emails',
};

export const tool: Tool = {
  name: 'send_emails_bulk',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nSend bulk emails\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/bulk_send_response',\n  $defs: {\n    bulk_send_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The bulk id'\n        },\n        emails: {\n          type: 'array',\n          items: {\n            type: 'object',\n            properties: {\n              kind: {\n                type: 'string',\n                description: 'The kind of object returned',\n                enum: [                  'email'\n                ]\n              },\n              status: {\n                $ref: '#/$defs/bulk_emails_status'\n              },\n              id: {\n                type: 'string',\n                description: 'The id of the email'\n              },\n              error: {\n                type: 'string'\n              },\n              org_id: {\n                type: 'string',\n                description: 'The id of the organization'\n              }\n            },\n            required: [              'kind',\n              'status'\n            ]\n          }\n        },\n        kind: {\n          type: 'string',\n          description: 'The kind of object returned',\n          enum: [            'bulk-email'\n          ]\n        }\n      },\n      required: [        'id',\n        'emails',\n        'kind'\n      ]\n    },\n    bulk_emails_status: {\n      type: 'string',\n      description: 'The status of the email in the bulk.',\n      enum: [        'queued',\n        'scheduled',\n        'rejected'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      emails: {
        type: 'array',
        description: 'The emails to send',
        items: {
          type: 'object',
          properties: {
            to: {
              anyOf: [
                {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
                {
                  type: 'string',
                },
              ],
              description: 'The primary recipient(s) of the email',
            },
            bcc: {
              anyOf: [
                {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
                {
                  type: 'string',
                },
              ],
              description: 'The blind carbon copy recipient(s) of the email',
            },
            cc: {
              anyOf: [
                {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
                {
                  type: 'string',
                },
              ],
              description: 'The carbon copy recipient(s) of the email',
            },
            context: {
              type: 'object',
              description: 'The context for the template',
              additionalProperties: true,
            },
            from: {
              type: 'string',
              description: 'The e-mail address of the sender',
            },
            headers: {
              $ref: '#/$defs/email_headers',
            },
            html: {
              type: 'string',
              description: 'The HTML version of the email',
            },
            reply_to: {
              anyOf: [
                {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
                {
                  type: 'string',
                },
              ],
              description:
                "The email address where replies should be sent. If a recipient replies, the response will go to this address instead of the sender's email address",
            },
            scheduled_at: {
              type: 'string',
              description: 'The date at which the email is scheduled to be sent',
              format: 'date-time',
            },
            subject: {
              type: 'string',
              description: 'The subject of the e-mail',
            },
            tags: {
              type: 'array',
              description: 'The tags to add to the email',
              items: {
                type: 'object',
                description: 'The tag to add to the email and you can get via email id or in webhook events',
                properties: {
                  name: {
                    type: 'string',
                    description: 'The name of the tag',
                  },
                  value: {
                    type: 'string',
                    description: 'The tag to add to the email',
                  },
                },
                required: ['name', 'value'],
              },
            },
            text: {
              type: 'string',
              description: 'The plaintext version of the email',
            },
          },
          required: ['to'],
        },
      },
      fallback: {
        type: 'object',
        description: 'Used as a fallback field email value if no value is present in emails',
        properties: {
          bcc: {
            anyOf: [
              {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              {
                type: 'string',
              },
            ],
            description: 'The blind carbon copy recipient(s) of the email',
          },
          cc: {
            anyOf: [
              {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              {
                type: 'string',
              },
            ],
            description: 'The carbon copy recipient(s) of the email',
          },
          context: {
            type: 'object',
            description: 'The context for the template',
            additionalProperties: true,
          },
          from: {
            type: 'string',
            description: 'The e-mail address of the sender',
          },
          headers: {
            $ref: '#/$defs/email_headers',
          },
          html: {
            type: 'string',
            description: 'The HTML version of the email',
          },
          reply_to: {
            anyOf: [
              {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              {
                type: 'string',
              },
            ],
            description:
              "The email address where replies should be sent. If a recipient replies, the response will go to this address instead of the sender's email address",
          },
          scheduled_at: {
            type: 'string',
            description: 'The date at which the email is scheduled to be sent',
            format: 'date-time',
          },
          subject: {
            type: 'string',
            description: 'The subject of the e-mail',
          },
          tags: {
            type: 'array',
            description: 'The tags to add to the email',
            items: {
              type: 'object',
              description: 'The tag to add to the email and you can get via email id or in webhook events',
              properties: {
                name: {
                  type: 'string',
                  description: 'The name of the tag',
                },
                value: {
                  type: 'string',
                  description: 'The tag to add to the email',
                },
              },
              required: ['name', 'value'],
            },
          },
          text: {
            type: 'string',
            description: 'The plaintext version of the email',
          },
          to: {
            anyOf: [
              {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              {
                type: 'string',
              },
            ],
            description: 'The primary recipient(s) of the email',
          },
        },
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['emails'],
    $defs: {
      email_headers: {
        type: 'object',
        description: 'The headers to add to the email',
        additionalProperties: true,
      },
    },
  },
  annotations: {},
};

export const handler = async (client: Nuntly, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.emails.bulk.send(body)));
};

export default { metadata, tool, handler };
