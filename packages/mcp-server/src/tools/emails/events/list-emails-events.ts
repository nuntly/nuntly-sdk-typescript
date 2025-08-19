// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@nuntly/sdk-mcp/filtering';
import { Metadata, asTextContentResult } from '@nuntly/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Nuntly from '@nuntly/sdk';

export const metadata: Metadata = {
  resource: 'emails.events',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/emails/{id}/events',
  operationId: 'retrieve-email-events',
};

export const tool: Tool = {
  name: 'list_emails_events',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturn the events related to this email id\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'array',\n      description: 'The events email',\n      items: {\n        type: 'object',\n        properties: {\n          id: {\n            type: 'string',\n            description: 'The email event id'\n          },\n          details: {\n            type: 'object',\n            description: 'Detail of the event',\n            additionalProperties: true\n          },\n          email_id: {\n            type: 'string',\n            description: 'The id of the email'\n          },\n          event_at: {\n            type: 'string',\n            description: 'Date at which the events occurs (ISO 8601 format)',\n            format: 'date-time'\n          },\n          kind: {\n            type: 'string',\n            description: 'The kind of object returned',\n            enum: [              'event-email'\n            ]\n          },\n          org_id: {\n            type: 'string',\n            description: 'The id of the organization'\n          },\n          type: {\n            type: 'string',\n            description: 'The type of the email event',\n            enum: [              'email.queued',\n              'email.scheduled',\n              'email.processed',\n              'email.sending',\n              'email.sent',\n              'email.delivered',\n              'email.opened',\n              'email.clicked',\n              'email.bounced',\n              'email.complained',\n              'email.rejected',\n              'email.delivery_delayed',\n              'email.failed'\n            ]\n          }\n        },\n        required: [          'id',\n          'details',\n          'email_id',\n          'event_at',\n          'kind',\n          'org_id',\n          'type'\n        ]\n      }\n    },\n    next_cursor: {\n      type: 'string'\n    }\n  }\n}\n```",
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
        description: 'The number of emails to return',
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.emails.events.list(id, body)));
};

export default { metadata, tool, handler };
