// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@nuntly/sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@nuntly/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Nuntly from '@nuntly/sdk';

export const metadata: Metadata = {
  resource: 'domains',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/domains',
  operationId: 'create-domain',
};

export const tool: Tool = {
  name: 'create_domains',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturn the domain with the given ID\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/domain_create_response',\n  $defs: {\n    domain_create_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The id of the domain'\n        },\n        click_tracking: {\n          type: 'boolean'\n        },\n        created_at: {\n          type: 'string',\n          description: 'Date at which the object was created (ISO 8601 format)',\n          format: 'date-time'\n        },\n        kind: {\n          type: 'string',\n          description: 'The kind of object returned',\n          enum: [            'domain'\n          ]\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the domain. For example: \\'email.mycompany.com\\''\n        },\n        open_tracking: {\n          type: 'boolean'\n        },\n        org_id: {\n          type: 'string',\n          description: 'The id of the organization'\n        },\n        region: {\n          type: 'string',\n          description: 'The region of the related data',\n          enum: [            'eu-west-1'\n          ]\n        },\n        sending_records: {\n          type: 'array',\n          description: 'The records for your domain',\n          items: {\n            type: 'object',\n            properties: {\n              fullname: {\n                type: 'string',\n                description: 'The FQDN of the domain record'\n              },\n              group: {\n                type: 'string',\n                description: 'The group of group: \"DKIM\", \"SPF\", \"MX\" or \"DMARC\". It is useful to group the records',\n                enum: [                  'DKIM',\n                  'SPF',\n                  'MX',\n                  'DMARC'\n                ]\n              },\n              kind: {\n                type: 'string',\n                description: 'The kind of object returned',\n                enum: [                  'record'\n                ]\n              },\n              name: {\n                type: 'string',\n                description: 'The name of the record.'\n              },\n              region: {\n                type: 'string',\n                description: 'The region of the related data',\n                enum: [                  'eu-west-1'\n                ]\n              },\n              status: {\n                type: 'string',\n                description: 'The status of the record',\n                enum: [                  'bootstrapping',\n                  'pending',\n                  'success',\n                  'failed',\n                  'temporary_failure'\n                ]\n              },\n              status_at: {\n                type: 'string',\n                description: 'The date of the lastest verification of this record'\n              },\n              ttl: {\n                type: 'string',\n                description: 'TTL (Time To Live) for this DNS record specifies the duration (in seconds)'\n              },\n              type: {\n                type: 'string',\n                description: 'The type of the record: \"TXT\", \"MX\" or \"CNAME\"',\n                enum: [                  'TXT',\n                  'MX',\n                  'CNAME'\n                ]\n              },\n              value: {\n                type: 'string',\n                description: 'The value of a DNS record is the data that the record points to'\n              },\n              priority: {\n                type: 'string',\n                description: 'Priority in a DNS record, typically used in MX (Mail Exchange) records, specifies the order in which mail servers should be used, with lower values indicating higher priority for email delivery'\n              },\n              selector: {\n                type: 'string',\n                description: 'A unique identifier in DKIM record to create CNAME records for verifying domain ownership and enabling email authentication'\n              }\n            },\n            required: [              'fullname',\n              'group',\n              'kind',\n              'name',\n              'region',\n              'status',\n              'status_at',\n              'ttl',\n              'type',\n              'value'\n            ]\n          }\n        },\n        sending_status: {\n          type: 'string',\n          description: 'The sending status for the domain',\n          enum: [            'enabled',\n            'disabled'\n          ]\n        },\n        status: {\n          type: 'string',\n          description: 'The status for the domain',\n          enum: [            'bootstrapping',\n            'pending',\n            'success',\n            'failed',\n            'temporary_failure'\n          ]\n        },\n        status_at: {\n          type: 'string',\n          description: 'The date of the lastest verification of the status'\n        },\n        modified_at: {\n          type: 'string',\n          description: 'Date at which the object was modified (ISO 8601 format)',\n          format: 'date-time'\n        }\n      },\n      required: [        'id',\n        'click_tracking',\n        'created_at',\n        'kind',\n        'name',\n        'open_tracking',\n        'org_id',\n        'region',\n        'sending_records',\n        'sending_status',\n        'status',\n        'status_at'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: "The name of the domain. For example: 'email.mycompany.com'",
      },
      region: {
        type: 'string',
        description: 'The region of the related data',
        enum: ['eu-west-1'],
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['name', 'region'],
  },
  annotations: {},
};

export const handler = async (client: Nuntly, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.domains.create(body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
