// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@nuntly/sdk-mcp/filtering';
import { Metadata, asTextContentResult } from '@nuntly/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Nuntly from '@nuntly/sdk';

export const metadata: Metadata = {
  resource: 'emails',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/emails',
  operationId: 'send-email',
};

export const tool: Tool = {
  name: 'send_emails',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nSend transactional emails through the Nuntly platform. It supports HTML and plain-text emails, attachments, labels, custom headers and scheduling.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/email_send_response',\n  $defs: {\n    email_send_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The id of the email'\n        },\n        kind: {\n          type: 'string',\n          description: 'The kind of object returned',\n          enum: [            'email'\n          ]\n        },\n        org_id: {\n          type: 'string',\n          description: 'The id of the organization'\n        },\n        status: {\n          type: 'string',\n          description: 'The status of the email.',\n          enum: [            'queued',\n            'scheduled'\n          ]\n        }\n      },\n      required: [        'id',\n        'kind',\n        'org_id',\n        'status'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      from: {
        type: 'string',
        description: 'The e-mail address of the sender',
      },
      subject: {
        type: 'string',
        description: 'The subject of the e-mail',
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
      attachments: {
        type: 'array',
        description: 'The attachements to add to the email',
        items: {
          type: 'object',
          description: 'The attachment',
          properties: {
            content: {
              type: 'string',
              description: 'The base64-encoded content of the attachment',
            },
            content_type: {
              type: 'string',
              description: 'Content type of the attachment (the MIME type)',
            },
            filename: {
              type: 'string',
              description: 'The name of the attached file to be displayed to the recipient',
            },
          },
        },
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['from', 'subject', 'to'],
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.emails.send(body)));
};

export default { metadata, tool, handler };
