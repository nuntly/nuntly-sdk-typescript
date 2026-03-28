// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'create',
    endpoint: '/api-keys',
    httpMethod: 'post',
    summary: 'Create API Key',
    description: 'Generate a new API key. The key value is only returned once — store it securely.',
    stainlessPath: '(resource) api_keys > (method) create',
    qualified: 'client.apiKeys.create',
    params: [
      'domainIds?: string[];',
      'name?: string;',
      "permission?: 'fullAccess' | 'sendingAccess';",
      "status?: 'enabled' | 'disabled' | 'revoked';",
    ],
    response:
      "{ id: string; apiKey: string; shortToken: string; status: 'enabled' | 'disabled' | 'revoked'; name?: string; }",
    markdown:
      "## create\n\n`client.apiKeys.create(domainIds?: string[], name?: string, permission?: 'fullAccess' | 'sendingAccess', status?: 'enabled' | 'disabled' | 'revoked'): { id: string; apiKey: string; shortToken: string; status: 'enabled' | 'disabled' | 'revoked'; name?: string; }`\n\n**post** `/api-keys`\n\nGenerate a new API key. The key value is only returned once — store it securely.\n\n### Parameters\n\n- `domainIds?: string[]`\n  The domain ids to restrict the api key to (only for sendingAccess)\n\n- `name?: string`\n  The name of the api key\n\n- `permission?: 'fullAccess' | 'sendingAccess'`\n  The permission type for the api key\n\n- `status?: 'enabled' | 'disabled' | 'revoked'`\n  The status for the api key\n\n### Returns\n\n- `{ id: string; apiKey: string; shortToken: string; status: 'enabled' | 'disabled' | 'revoked'; name?: string; }`\n\n  - `id: string`\n  - `apiKey: string`\n  - `shortToken: string`\n  - `status: 'enabled' | 'disabled' | 'revoked'`\n  - `name?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst apiKey = await client.apiKeys.create();\n\nconsole.log(apiKey);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/api-keys/{id}',
    httpMethod: 'get',
    summary: 'Retrieve API Key',
    description: 'Returns API key metadata. The key value is never returned after creation.',
    stainlessPath: '(resource) api_keys > (method) retrieve',
    qualified: 'client.apiKeys.retrieve',
    params: ['id: string;'],
    response:
      "{ id: string; createdAt: string; shortToken: string; status: 'enabled' | 'disabled' | 'revoked'; name?: string; }",
    markdown:
      "## retrieve\n\n`client.apiKeys.retrieve(id: string): { id: string; createdAt: string; shortToken: string; status: 'enabled' | 'disabled' | 'revoked'; name?: string; }`\n\n**get** `/api-keys/{id}`\n\nReturns API key metadata. The key value is never returned after creation.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; createdAt: string; shortToken: string; status: 'enabled' | 'disabled' | 'revoked'; name?: string; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `shortToken: string`\n  - `status: 'enabled' | 'disabled' | 'revoked'`\n  - `name?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst apiKey = await client.apiKeys.retrieve('apk_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(apiKey);\n```",
  },
  {
    name: 'update',
    endpoint: '/api-keys/{id}',
    httpMethod: 'put',
    summary: 'Update API Key',
    description: 'Update the key name, permissions, or restrict it to specific sending domains.',
    stainlessPath: '(resource) api_keys > (method) update',
    qualified: 'client.apiKeys.update',
    params: [
      'id: string;',
      "permission: 'fullAccess' | 'sendingAccess';",
      'domainIds?: string[];',
      'name?: string;',
      "status?: 'enabled' | 'disabled';",
    ],
    response: '{ id: string; }',
    markdown:
      "## update\n\n`client.apiKeys.update(id: string, permission: 'fullAccess' | 'sendingAccess', domainIds?: string[], name?: string, status?: 'enabled' | 'disabled'): { id: string; }`\n\n**put** `/api-keys/{id}`\n\nUpdate the key name, permissions, or restrict it to specific sending domains.\n\n### Parameters\n\n- `id: string`\n\n- `permission: 'fullAccess' | 'sendingAccess'`\n  The permission type for the api key\n\n- `domainIds?: string[]`\n  The domain ids to restrict the api key to (only for sendingAccess)\n\n- `name?: string`\n  The name of the api key\n\n- `status?: 'enabled' | 'disabled'`\n\n### Returns\n\n- `{ id: string; }`\n\n  - `id: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst apiKey = await client.apiKeys.update('apk_01ka8k8s80gvx9604cn9am5st4', { permission: 'fullAccess' });\n\nconsole.log(apiKey);\n```",
  },
  {
    name: 'list',
    endpoint: '/api-keys',
    httpMethod: 'get',
    summary: 'List API Keys',
    description:
      'Returns all API keys for the organization. Key values are never included in list responses.',
    stainlessPath: '(resource) api_keys > (method) list',
    qualified: 'client.apiKeys.list',
    params: ['cursor?: string;', 'limit?: number;'],
    response:
      "{ id: string; createdAt: string; shortToken: string; status: 'enabled' | 'disabled' | 'revoked'; name?: string; }",
    markdown:
      "## list\n\n`client.apiKeys.list(cursor?: string, limit?: number): { id: string; createdAt: string; shortToken: string; status: 'enabled' | 'disabled' | 'revoked'; name?: string; }`\n\n**get** `/api-keys`\n\nReturns all API keys for the organization. Key values are never included in list responses.\n\n### Parameters\n\n- `cursor?: string`\n  The cursor to retrieve the next page of results\n\n- `limit?: number`\n  The maximum number of results to return\n\n### Returns\n\n- `{ id: string; createdAt: string; shortToken: string; status: 'enabled' | 'disabled' | 'revoked'; name?: string; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `shortToken: string`\n  - `status: 'enabled' | 'disabled' | 'revoked'`\n  - `name?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\n// Automatically fetches more pages as needed.\nfor await (const apiKeyListResponse of client.apiKeys.list()) {\n  console.log(apiKeyListResponse);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/api-keys/{id}',
    httpMethod: 'delete',
    summary: 'Delete API Key',
    description: 'Revoke an API key. Requests authenticating with this key will be rejected immediately.',
    stainlessPath: '(resource) api_keys > (method) delete',
    qualified: 'client.apiKeys.delete',
    params: ['id: string;'],
    response: '{ id: string; }',
    markdown:
      "## delete\n\n`client.apiKeys.delete(id: string): { id: string; }`\n\n**delete** `/api-keys/{id}`\n\nRevoke an API key. Requests authenticating with this key will be rejected immediately.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; }`\n\n  - `id: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst apiKey = await client.apiKeys.delete('apk_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(apiKey);\n```",
  },
  {
    name: 'create',
    endpoint: '/domains',
    httpMethod: 'post',
    summary: 'Create Domain',
    description: 'Add a domain to start configuring DNS records for sending or receiving emails.',
    stainlessPath: '(resource) domains > (method) create',
    qualified: 'client.domains.create',
    params: ['name: string;', 'receiving?: boolean;', 'sending?: boolean;'],
    response:
      "{ id: string; clickTracking: boolean; createdAt: string; name: string; openTracking: boolean; receiving: boolean; receivingStatus: 'disabled' | 'bootstrapping' | 'pending' | 'active' | 'failed'; receivingStatusAt: string; records: { fullname: string; group: 'DKIM' | 'SPF' | 'MX' | 'DMARC' | 'MX_RECEIVING'; name: string; recordType: 'TXT' | 'MX' | 'CNAME'; status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure'; statusAt: string; ttl: string; value: string; priority?: string; selector?: string; }[]; region: 'eu-west-1'; sending: boolean; sendingStatus: 'enabled' | 'disabled' | 'paused'; sendingStatusAt: string; status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure'; statusAt: string; }",
    markdown:
      "## create\n\n`client.domains.create(name: string, receiving?: boolean, sending?: boolean): { id: string; clickTracking: boolean; createdAt: string; name: string; openTracking: boolean; receiving: boolean; receivingStatus: 'disabled' | 'bootstrapping' | 'pending' | 'active' | 'failed'; receivingStatusAt: string; records: object[]; region: 'eu-west-1'; sending: boolean; sendingStatus: 'enabled' | 'disabled' | 'paused'; sendingStatusAt: string; status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure'; statusAt: string; }`\n\n**post** `/domains`\n\nAdd a domain to start configuring DNS records for sending or receiving emails.\n\n### Parameters\n\n- `name: string`\n  The name of the domain to send e-mails'\n\n- `receiving?: boolean`\n  Enable receiving\n\n- `sending?: boolean`\n  Enable sending\n\n### Returns\n\n- `{ id: string; clickTracking: boolean; createdAt: string; name: string; openTracking: boolean; receiving: boolean; receivingStatus: 'disabled' | 'bootstrapping' | 'pending' | 'active' | 'failed'; receivingStatusAt: string; records: { fullname: string; group: 'DKIM' | 'SPF' | 'MX' | 'DMARC' | 'MX_RECEIVING'; name: string; recordType: 'TXT' | 'MX' | 'CNAME'; status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure'; statusAt: string; ttl: string; value: string; priority?: string; selector?: string; }[]; region: 'eu-west-1'; sending: boolean; sendingStatus: 'enabled' | 'disabled' | 'paused'; sendingStatusAt: string; status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure'; statusAt: string; }`\n\n  - `id: string`\n  - `clickTracking: boolean`\n  - `createdAt: string`\n  - `name: string`\n  - `openTracking: boolean`\n  - `receiving: boolean`\n  - `receivingStatus: 'disabled' | 'bootstrapping' | 'pending' | 'active' | 'failed'`\n  - `receivingStatusAt: string`\n  - `records: { fullname: string; group: 'DKIM' | 'SPF' | 'MX' | 'DMARC' | 'MX_RECEIVING'; name: string; recordType: 'TXT' | 'MX' | 'CNAME'; status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure'; statusAt: string; ttl: string; value: string; priority?: string; selector?: string; }[]`\n  - `region: 'eu-west-1'`\n  - `sending: boolean`\n  - `sendingStatus: 'enabled' | 'disabled' | 'paused'`\n  - `sendingStatusAt: string`\n  - `status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure'`\n  - `statusAt: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst domain = await client.domains.create({ name: 'name' });\n\nconsole.log(domain);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/domains/{id}',
    httpMethod: 'get',
    summary: 'Retrieve Domain',
    description:
      'Returns a domain with its DNS record configuration and current verification status for each record.',
    stainlessPath: '(resource) domains > (method) retrieve',
    qualified: 'client.domains.retrieve',
    params: ['id: string;'],
    response:
      "{ id: string; clickTracking: boolean; createdAt: string; name: string; openTracking: boolean; receiving: boolean; receivingStatus: 'disabled' | 'bootstrapping' | 'pending' | 'active' | 'failed'; receivingStatusAt: string; records: { fullname: string; group: 'DKIM' | 'SPF' | 'MX' | 'DMARC' | 'MX_RECEIVING'; name: string; recordType: 'TXT' | 'MX' | 'CNAME'; status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure'; statusAt: string; ttl: string; value: string; priority?: string; selector?: string; }[]; region: 'eu-west-1'; sending: boolean; sendingStatus: 'enabled' | 'disabled' | 'paused'; sendingStatusAt: string; status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure'; statusAt: string; }",
    markdown:
      "## retrieve\n\n`client.domains.retrieve(id: string): { id: string; clickTracking: boolean; createdAt: string; name: string; openTracking: boolean; receiving: boolean; receivingStatus: 'disabled' | 'bootstrapping' | 'pending' | 'active' | 'failed'; receivingStatusAt: string; records: object[]; region: 'eu-west-1'; sending: boolean; sendingStatus: 'enabled' | 'disabled' | 'paused'; sendingStatusAt: string; status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure'; statusAt: string; }`\n\n**get** `/domains/{id}`\n\nReturns a domain with its DNS record configuration and current verification status for each record.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; clickTracking: boolean; createdAt: string; name: string; openTracking: boolean; receiving: boolean; receivingStatus: 'disabled' | 'bootstrapping' | 'pending' | 'active' | 'failed'; receivingStatusAt: string; records: { fullname: string; group: 'DKIM' | 'SPF' | 'MX' | 'DMARC' | 'MX_RECEIVING'; name: string; recordType: 'TXT' | 'MX' | 'CNAME'; status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure'; statusAt: string; ttl: string; value: string; priority?: string; selector?: string; }[]; region: 'eu-west-1'; sending: boolean; sendingStatus: 'enabled' | 'disabled' | 'paused'; sendingStatusAt: string; status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure'; statusAt: string; }`\n\n  - `id: string`\n  - `clickTracking: boolean`\n  - `createdAt: string`\n  - `name: string`\n  - `openTracking: boolean`\n  - `receiving: boolean`\n  - `receivingStatus: 'disabled' | 'bootstrapping' | 'pending' | 'active' | 'failed'`\n  - `receivingStatusAt: string`\n  - `records: { fullname: string; group: 'DKIM' | 'SPF' | 'MX' | 'DMARC' | 'MX_RECEIVING'; name: string; recordType: 'TXT' | 'MX' | 'CNAME'; status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure'; statusAt: string; ttl: string; value: string; priority?: string; selector?: string; }[]`\n  - `region: 'eu-west-1'`\n  - `sending: boolean`\n  - `sendingStatus: 'enabled' | 'disabled' | 'paused'`\n  - `sendingStatusAt: string`\n  - `status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure'`\n  - `statusAt: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst domain = await client.domains.retrieve('dns_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(domain);\n```",
  },
  {
    name: 'update',
    endpoint: '/domains/{id}',
    httpMethod: 'patch',
    summary: 'Update Domain',
    description: 'Toggle sending, receiving, open tracking, or click tracking capabilities for a domain.',
    stainlessPath: '(resource) domains > (method) update',
    qualified: 'client.domains.update',
    params: [
      'id: string;',
      'clickTracking?: boolean;',
      'openTracking?: boolean;',
      'receiving?: boolean;',
      'sending?: boolean;',
    ],
    response: '{ id: string; clickTracking: boolean; openTracking: boolean; }',
    markdown:
      "## update\n\n`client.domains.update(id: string, clickTracking?: boolean, openTracking?: boolean, receiving?: boolean, sending?: boolean): { id: string; clickTracking: boolean; openTracking: boolean; }`\n\n**patch** `/domains/{id}`\n\nToggle sending, receiving, open tracking, or click tracking capabilities for a domain.\n\n### Parameters\n\n- `id: string`\n\n- `clickTracking?: boolean`\n  Emit an event for each time the recipient clicks a link in the email\n\n- `openTracking?: boolean`\n  Emit an event for each recipient opens an email their email client\n\n- `receiving?: boolean`\n  Enable or disable receiving\n\n- `sending?: boolean`\n  Enable or disable sending\n\n### Returns\n\n- `{ id: string; clickTracking: boolean; openTracking: boolean; }`\n\n  - `id: string`\n  - `clickTracking: boolean`\n  - `openTracking: boolean`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst domain = await client.domains.update('dns_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(domain);\n```",
  },
  {
    name: 'list',
    endpoint: '/domains',
    httpMethod: 'get',
    summary: 'List Domains',
    description: 'Returns all domains with their verification and capability status.',
    stainlessPath: '(resource) domains > (method) list',
    qualified: 'client.domains.list',
    params: ['cursor?: string;', 'limit?: number;'],
    response:
      "{ id: string; createdAt: string; name: string; receivingStatus: 'disabled' | 'bootstrapping' | 'pending' | 'active' | 'failed'; region: 'eu-west-1'; sendingStatus: 'enabled' | 'disabled' | 'paused'; status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure'; }",
    markdown:
      "## list\n\n`client.domains.list(cursor?: string, limit?: number): { id: string; createdAt: string; name: string; receivingStatus: 'disabled' | 'bootstrapping' | 'pending' | 'active' | 'failed'; region: 'eu-west-1'; sendingStatus: 'enabled' | 'disabled' | 'paused'; status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure'; }`\n\n**get** `/domains`\n\nReturns all domains with their verification and capability status.\n\n### Parameters\n\n- `cursor?: string`\n  The cursor to retrieve the next page of results\n\n- `limit?: number`\n  The maximum number of results to return\n\n### Returns\n\n- `{ id: string; createdAt: string; name: string; receivingStatus: 'disabled' | 'bootstrapping' | 'pending' | 'active' | 'failed'; region: 'eu-west-1'; sendingStatus: 'enabled' | 'disabled' | 'paused'; status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure'; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `name: string`\n  - `receivingStatus: 'disabled' | 'bootstrapping' | 'pending' | 'active' | 'failed'`\n  - `region: 'eu-west-1'`\n  - `sendingStatus: 'enabled' | 'disabled' | 'paused'`\n  - `status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure'`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\n// Automatically fetches more pages as needed.\nfor await (const domainListResponse of client.domains.list()) {\n  console.log(domainListResponse);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/domains/{id}',
    httpMethod: 'delete',
    summary: 'Delete Domain',
    description:
      'Remove a domain from the organization. Cannot be deleted if it has active sending or receiving.',
    stainlessPath: '(resource) domains > (method) delete',
    qualified: 'client.domains.delete',
    params: ['id: string;'],
    response: '{ id: string; }',
    markdown:
      "## delete\n\n`client.domains.delete(id: string): { id: string; }`\n\n**delete** `/domains/{id}`\n\nRemove a domain from the organization. Cannot be deleted if it has active sending or receiving.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; }`\n\n  - `id: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst domain = await client.domains.delete('dns_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(domain);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/emails/{id}',
    httpMethod: 'get',
    summary: 'Retrieve Email',
    description: 'Returns an email with its current delivery status and metadata.',
    stainlessPath: '(resource) emails > (method) retrieve',
    qualified: 'client.emails.retrieve',
    params: ['id: string;'],
    response:
      '{ id: string; createdAt: string; from: string; orgId: string; status: string; subject: string; to: string[] | string; attachments?: { contentType?: string; filename?: string; size?: number; }[]; bcc?: string[] | string; bulkId?: string; cc?: string[] | string; headers?: object; messageId?: string; replyTo?: string[] | string; scheduledAt?: string; statusReason?: object; tags?: { name: string; value: string; }[]; variables?: object; }',
    markdown:
      "## retrieve\n\n`client.emails.retrieve(id: string): { id: string; createdAt: string; from: string; orgId: string; status: status; subject: string; to: string[] | string; attachments?: object[]; bcc?: string[] | string; bulkId?: string; cc?: string[] | string; headers?: object; messageId?: string; replyTo?: string[] | string; scheduledAt?: string; statusReason?: object; tags?: tag[]; variables?: object; }`\n\n**get** `/emails/{id}`\n\nReturns an email with its current delivery status and metadata.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; createdAt: string; from: string; orgId: string; status: string; subject: string; to: string[] | string; attachments?: { contentType?: string; filename?: string; size?: number; }[]; bcc?: string[] | string; bulkId?: string; cc?: string[] | string; headers?: object; messageId?: string; replyTo?: string[] | string; scheduledAt?: string; statusReason?: object; tags?: { name: string; value: string; }[]; variables?: object; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `from: string`\n  - `orgId: string`\n  - `status: string`\n  - `subject: string`\n  - `to: string[] | string`\n  - `attachments?: { contentType?: string; filename?: string; size?: number; }[]`\n  - `bcc?: string[] | string`\n  - `bulkId?: string`\n  - `cc?: string[] | string`\n  - `headers?: object`\n  - `messageId?: string`\n  - `replyTo?: string[] | string`\n  - `scheduledAt?: string`\n  - `statusReason?: object`\n  - `tags?: { name: string; value: string; }[]`\n  - `variables?: object`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst email = await client.emails.retrieve('em_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(email);\n```",
  },
  {
    name: 'list',
    endpoint: '/emails',
    httpMethod: 'get',
    summary: 'List Emails',
    description: 'Returns sent emails ordered by submission date, newest first.',
    stainlessPath: '(resource) emails > (method) list',
    qualified: 'client.emails.list',
    params: ['cursor?: string;', 'limit?: number;'],
    response:
      '{ id: string; createdAt: string; from: string; status: string; subject: string; to: string[] | string; scheduledAt?: string; }',
    markdown:
      "## list\n\n`client.emails.list(cursor?: string, limit?: number): { id: string; createdAt: string; from: string; status: status; subject: string; to: string[] | string; scheduledAt?: string; }`\n\n**get** `/emails`\n\nReturns sent emails ordered by submission date, newest first.\n\n### Parameters\n\n- `cursor?: string`\n  The cursor to retrieve the next page of results\n\n- `limit?: number`\n  The maximum number of results to return\n\n### Returns\n\n- `{ id: string; createdAt: string; from: string; status: string; subject: string; to: string[] | string; scheduledAt?: string; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `from: string`\n  - `status: string`\n  - `subject: string`\n  - `to: string[] | string`\n  - `scheduledAt?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\n// Automatically fetches more pages as needed.\nfor await (const emailListResponse of client.emails.list()) {\n  console.log(emailListResponse);\n}\n```",
  },
  {
    name: 'cancel',
    endpoint: '/emails/{id}',
    httpMethod: 'delete',
    summary: 'Cancel Email',
    description:
      'Cancel a scheduled email before delivery. Only emails with `scheduled` status can be cancelled.',
    stainlessPath: '(resource) emails > (method) cancel',
    qualified: 'client.emails.cancel',
    params: ['id: string;'],
    response: '{ id: string; status: string; }',
    markdown:
      "## cancel\n\n`client.emails.cancel(id: string): { id: string; status: status; }`\n\n**delete** `/emails/{id}`\n\nCancel a scheduled email before delivery. Only emails with `scheduled` status can be cancelled.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; status: string; }`\n\n  - `id: string`\n  - `status: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst response = await client.emails.cancel('em_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(response);\n```",
  },
  {
    name: 'send',
    endpoint: '/emails',
    httpMethod: 'post',
    summary: 'Send Email',
    description:
      'Send transactional emails through Nuntly platform. It supports HTML and plain-text emails, attachments, labels, custom headers and scheduling.',
    stainlessPath: '(resource) emails > (method) send',
    qualified: 'client.emails.send',
    params: [
      'from: string;',
      'subject: string;',
      'to: string[] | string;',
      'attachments?: { content: string; contentType?: string; filename?: string; }[];',
      'bcc?: string[] | string;',
      'cc?: string[] | string;',
      'headers?: object;',
      'html?: string;',
      'replyTo?: string[] | string;',
      'scheduledAt?: string;',
      'tags?: { name: string; value: string; }[];',
      'text?: string;',
      'variables?: object;',
    ],
    response: '{ id: string; status: string; }',
    markdown:
      "## send\n\n`client.emails.send(from: string, subject: string, to: string[] | string, attachments?: { content: string; contentType?: string; filename?: string; }[], bcc?: string[] | string, cc?: string[] | string, headers?: object, html?: string, replyTo?: string[] | string, scheduledAt?: string, tags?: { name: string; value: string; }[], text?: string, variables?: object): { id: string; status: status; }`\n\n**post** `/emails`\n\nSend transactional emails through Nuntly platform. It supports HTML and plain-text emails, attachments, labels, custom headers and scheduling.\n\n### Parameters\n\n- `from: string`\n  The e-mail address of the sender\n\n- `subject: string`\n  The subject of the e-mail\n\n- `to: string[] | string`\n  The primary recipient(s) of the email\n\n- `attachments?: { content: string; contentType?: string; filename?: string; }[]`\n  The attachements to add to the email\n\n- `bcc?: string[] | string`\n  The blind carbon copy recipient(s) of the email\n\n- `cc?: string[] | string`\n  The carbon copy recipient(s) of the email\n\n- `headers?: object`\n  The headers to add to the email\n\n- `html?: string`\n  The HTML version of the email\n\n- `replyTo?: string[] | string`\n  The email address where replies should be sent. If a recipient replies, the response will go to this address instead of the sender's email address\n\n- `scheduledAt?: string`\n  The date at which the email is scheduled to be sent\n\n- `tags?: { name: string; value: string; }[]`\n  The tags to add to the email\n\n- `text?: string`\n  The plaintext version of the email\n\n- `variables?: object`\n  The variables for the template\n\n### Returns\n\n- `{ id: string; status: string; }`\n\n  - `id: string`\n  - `status: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst response = await client.emails.send({\n  from: 'Tomlinson AI <ray@info.tomlinson.ai>',\n  subject: 'Verify your email address',\n  to: 'brian67@gmail.com',\n});\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/emails/bulk/{bulkId}',
    httpMethod: 'get',
    summary: 'Retrieve Bulk Emails',
    description: 'Returns the delivery status of all emails submitted in a bulk request.',
    stainlessPath: '(resource) emails.bulk > (method) retrieve',
    qualified: 'client.emails.bulk.retrieve',
    params: ['bulkId: string;'],
    response: '{ id: string; emails: { id: string; status: string; detail?: string; }[]; }',
    markdown:
      "## retrieve\n\n`client.emails.bulk.retrieve(bulkId: string): { id: string; emails: object[]; }`\n\n**get** `/emails/bulk/{bulkId}`\n\nReturns the delivery status of all emails submitted in a bulk request.\n\n### Parameters\n\n- `bulkId: string`\n  The bulk id\n\n### Returns\n\n- `{ id: string; emails: { id: string; status: string; detail?: string; }[]; }`\n\n  - `id: string`\n  - `emails: { id: string; status: string; detail?: string; }[]`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst bulk = await client.emails.bulk.retrieve('blk_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(bulk);\n```",
  },
  {
    name: 'send',
    endpoint: '/emails/bulk',
    httpMethod: 'post',
    summary: 'Send Bulk Emails',
    description:
      'Send up to 100 emails in a single request. Use `fallback` to set default values shared across all messages.',
    stainlessPath: '(resource) emails.bulk > (method) send',
    qualified: 'client.emails.bulk.send',
    params: [
      'emails: { bcc?: string[] | string; cc?: string[] | string; from?: string; headers?: object; html?: string; replyTo?: string[] | string; scheduledAt?: string; subject?: string; tags?: { name: string; value: string; }[]; text?: string; to?: string[] | string; variables?: object; }[];',
      'fallback?: { bcc?: string[] | string; cc?: string[] | string; from?: string; headers?: object; html?: string; replyTo?: string[] | string; scheduledAt?: string; subject?: string; tags?: { name: string; value: string; }[]; text?: string; to?: string[] | string; variables?: object; };',
    ],
    response: '{ emails: { status: string; id?: string; }[]; id?: string; }',
    markdown:
      "## send\n\n`client.emails.bulk.send(emails: { bcc?: string[] | string; cc?: string[] | string; from?: string; headers?: object; html?: string; replyTo?: string[] | string; scheduledAt?: string; subject?: string; tags?: object[]; text?: string; to?: string[] | string; variables?: object; }[], fallback?: { bcc?: string[] | string; cc?: string[] | string; from?: string; headers?: object; html?: string; replyTo?: string[] | string; scheduledAt?: string; subject?: string; tags?: object[]; text?: string; to?: string[] | string; variables?: object; }): { emails: object[]; id?: string; }`\n\n**post** `/emails/bulk`\n\nSend up to 100 emails in a single request. Use `fallback` to set default values shared across all messages.\n\n### Parameters\n\n- `emails: { bcc?: string[] | string; cc?: string[] | string; from?: string; headers?: object; html?: string; replyTo?: string[] | string; scheduledAt?: string; subject?: string; tags?: { name: string; value: string; }[]; text?: string; to?: string[] | string; variables?: object; }[]`\n  The bulk emails to send\n\n- `fallback?: { bcc?: string[] | string; cc?: string[] | string; from?: string; headers?: object; html?: string; replyTo?: string[] | string; scheduledAt?: string; subject?: string; tags?: { name: string; value: string; }[]; text?: string; to?: string[] | string; variables?: object; }`\n  Used as a fallback field email value if no value is present in emails\n  - `bcc?: string[] | string`\n    The blind carbon copy recipient(s) of the email\n  - `cc?: string[] | string`\n    The carbon copy recipient(s) of the email\n  - `from?: string`\n    The e-mail address of the sender\n  - `headers?: object`\n    The headers to add to the email\n  - `html?: string`\n    The HTML version of the email\n  - `replyTo?: string[] | string`\n    The email address where replies should be sent. If a recipient replies, the response will go to this address instead of the sender's email address\n  - `scheduledAt?: string`\n    The date at which the email is scheduled to be sent\n  - `subject?: string`\n    The subject of the e-mail\n  - `tags?: { name: string; value: string; }[]`\n    The tags to add to the email\n  - `text?: string`\n    The plaintext version of the email\n  - `to?: string[] | string`\n    The primary recipient(s) of the email\n  - `variables?: object`\n    The variables for the template\n\n### Returns\n\n- `{ emails: { status: string; id?: string; }[]; id?: string; }`\n\n  - `emails: { status: string; id?: string; }[]`\n  - `id?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst response = await client.emails.bulk.send({ emails: [{}] });\n\nconsole.log(response);\n```",
  },
  {
    name: 'list',
    endpoint: '/emails/{id}/events',
    httpMethod: 'get',
    summary: 'Retrieve Email Events',
    description:
      'Returns the full delivery event history for an email (sent, delivered, opened, bounced, etc.).',
    stainlessPath: '(resource) emails.events > (method) list',
    qualified: 'client.emails.events.list',
    params: ['id: string;'],
    response:
      '{ id: string; createdAt: string; emailId: string; eventType: string; orgId: string; payload: object; occurredAt?: string; }[]',
    markdown:
      "## list\n\n`client.emails.events.list(id: string): { id: string; createdAt: string; emailId: string; eventType: event_type; orgId: string; payload: object; occurredAt?: string; }[]`\n\n**get** `/emails/{id}/events`\n\nReturns the full delivery event history for an email (sent, delivered, opened, bounced, etc.).\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; createdAt: string; emailId: string; eventType: string; orgId: string; payload: object; occurredAt?: string; }[]`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst events = await client.emails.events.list('em_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(events);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/emails/{id}/content',
    httpMethod: 'get',
    summary: 'Retrieve Email Content',
    description:
      'Returns presigned URLs to download the HTML, plain-text, and raw MIME source of a sent email.',
    stainlessPath: '(resource) emails.content > (method) retrieve',
    qualified: 'client.emails.content.retrieve',
    params: ['id: string;'],
    response:
      '{ html: { downloadUrl: string; expiresAt: string; size: number; }; htmlTemplate: { downloadUrl: string; expiresAt: string; size: number; }; mime: { downloadUrl: string; expiresAt: string; size: number; }; subjectTemplate: { downloadUrl: string; expiresAt: string; size: number; }; text: { downloadUrl: string; expiresAt: string; size: number; }; textTemplate: { downloadUrl: string; expiresAt: string; size: number; }; }',
    markdown:
      "## retrieve\n\n`client.emails.content.retrieve(id: string): { html: email_content_item; htmlTemplate: email_content_item; mime: email_content_item; subjectTemplate: email_content_item; text: email_content_item; textTemplate: email_content_item; }`\n\n**get** `/emails/{id}/content`\n\nReturns presigned URLs to download the HTML, plain-text, and raw MIME source of a sent email.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ html: { downloadUrl: string; expiresAt: string; size: number; }; htmlTemplate: { downloadUrl: string; expiresAt: string; size: number; }; mime: { downloadUrl: string; expiresAt: string; size: number; }; subjectTemplate: { downloadUrl: string; expiresAt: string; size: number; }; text: { downloadUrl: string; expiresAt: string; size: number; }; textTemplate: { downloadUrl: string; expiresAt: string; size: number; }; }`\n\n  - `html: { downloadUrl: string; expiresAt: string; size: number; }`\n  - `htmlTemplate: { downloadUrl: string; expiresAt: string; size: number; }`\n  - `mime: { downloadUrl: string; expiresAt: string; size: number; }`\n  - `subjectTemplate: { downloadUrl: string; expiresAt: string; size: number; }`\n  - `text: { downloadUrl: string; expiresAt: string; size: number; }`\n  - `textTemplate: { downloadUrl: string; expiresAt: string; size: number; }`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst content = await client.emails.content.retrieve('em_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(content);\n```",
  },
  {
    name: 'list',
    endpoint: '/emails/stats',
    httpMethod: 'get',
    summary: 'Retrieve Email Statistics',
    description: 'Returns aggregated daily sending statistics for the current period.',
    stainlessPath: '(resource) emails.stats > (method) list',
    qualified: 'client.emails.stats.list',
    response:
      '{ end: string; start: string; stats: { bounced: number; canceled: number; clicked: number; complaintReceived: number; delivered: number; deliveredDelayed: number; failed: number; occurredOn: string; opened: number; processed: number; queued: number; rejected: number; renderingFailed: number; scheduled: number; sending: number; sent: number; uniqueClicked: number; uniqueOpened: number; }[]; }',
    markdown:
      "## list\n\n`client.emails.stats.list(): { end: string; start: string; stats: object[]; }`\n\n**get** `/emails/stats`\n\nReturns aggregated daily sending statistics for the current period.\n\n### Returns\n\n- `{ end: string; start: string; stats: { bounced: number; canceled: number; clicked: number; complaintReceived: number; delivered: number; deliveredDelayed: number; failed: number; occurredOn: string; opened: number; processed: number; queued: number; rejected: number; renderingFailed: number; scheduled: number; sending: number; sent: number; uniqueClicked: number; uniqueOpened: number; }[]; }`\n\n  - `end: string`\n  - `start: string`\n  - `stats: { bounced: number; canceled: number; clicked: number; complaintReceived: number; delivered: number; deliveredDelayed: number; failed: number; occurredOn: string; opened: number; processed: number; queued: number; rejected: number; renderingFailed: number; scheduled: number; sending: number; sent: number; uniqueClicked: number; uniqueOpened: number; }[]`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst stats = await client.emails.stats.list();\n\nconsole.log(stats);\n```",
  },
  {
    name: 'create',
    endpoint: '/namespaces',
    httpMethod: 'post',
    summary: 'Create Namespace',
    description: 'Create a new namespace.',
    stainlessPath: '(resource) namespaces > (method) create',
    qualified: 'client.namespaces.create',
    params: ['name: string;', 'externalId?: string;'],
    response: '{ id: string; createdAt: string; externalId: string; name: string; updatedAt?: string; }',
    markdown:
      "## create\n\n`client.namespaces.create(name: string, externalId?: string): { id: string; createdAt: string; externalId: string; name: string; updatedAt?: string; }`\n\n**post** `/namespaces`\n\nCreate a new namespace.\n\n### Parameters\n\n- `name: string`\n  The display name of the namespace.\n\n- `externalId?: string`\n  An optional external identifier for the namespace.\n\n### Returns\n\n- `{ id: string; createdAt: string; externalId: string; name: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `externalId: string`\n  - `name: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst namespace = await client.namespaces.create({ name: 'x' });\n\nconsole.log(namespace);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/namespaces/{namespaceId}',
    httpMethod: 'get',
    summary: 'Retrieve Namespace',
    description: 'Retrieve a namespace with inbox stats.',
    stainlessPath: '(resource) namespaces > (method) retrieve',
    qualified: 'client.namespaces.retrieve',
    params: ['namespaceId: string;'],
    response:
      '{ id: string; activeInboxCount: number; createdAt: string; externalId: string; inboxCount: number; name: string; updatedAt?: string; }',
    markdown:
      "## retrieve\n\n`client.namespaces.retrieve(namespaceId: string): { id: string; activeInboxCount: number; createdAt: string; externalId: string; inboxCount: number; name: string; updatedAt?: string; }`\n\n**get** `/namespaces/{namespaceId}`\n\nRetrieve a namespace with inbox stats.\n\n### Parameters\n\n- `namespaceId: string`\n\n### Returns\n\n- `{ id: string; activeInboxCount: number; createdAt: string; externalId: string; inboxCount: number; name: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `activeInboxCount: number`\n  - `createdAt: string`\n  - `externalId: string`\n  - `inboxCount: number`\n  - `name: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst namespaceDetail = await client.namespaces.retrieve('ns_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(namespaceDetail);\n```",
  },
  {
    name: 'update',
    endpoint: '/namespaces/{namespaceId}',
    httpMethod: 'patch',
    summary: 'Update Namespace',
    description: 'Update a namespace.',
    stainlessPath: '(resource) namespaces > (method) update',
    qualified: 'client.namespaces.update',
    params: ['namespaceId: string;', 'externalId?: string;', 'name?: string;'],
    response: '{ id: string; }',
    markdown:
      "## update\n\n`client.namespaces.update(namespaceId: string, externalId?: string, name?: string): { id: string; }`\n\n**patch** `/namespaces/{namespaceId}`\n\nUpdate a namespace.\n\n### Parameters\n\n- `namespaceId: string`\n\n- `externalId?: string`\n  An optional external identifier for the namespace.\n\n- `name?: string`\n  The display name of the namespace.\n\n### Returns\n\n- `{ id: string; }`\n\n  - `id: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst namespace = await client.namespaces.update('ns_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(namespace);\n```",
  },
  {
    name: 'list',
    endpoint: '/namespaces',
    httpMethod: 'get',
    summary: 'List Namespaces',
    description: 'List all namespaces.',
    stainlessPath: '(resource) namespaces > (method) list',
    qualified: 'client.namespaces.list',
    params: ['cursor?: string;', 'limit?: number;'],
    response: '{ id: string; createdAt: string; externalId: string; name: string; updatedAt?: string; }',
    markdown:
      "## list\n\n`client.namespaces.list(cursor?: string, limit?: number): { id: string; createdAt: string; externalId: string; name: string; updatedAt?: string; }`\n\n**get** `/namespaces`\n\nList all namespaces.\n\n### Parameters\n\n- `cursor?: string`\n  The cursor to retrieve the next page of results\n\n- `limit?: number`\n  The maximum number of results to return\n\n### Returns\n\n- `{ id: string; createdAt: string; externalId: string; name: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `externalId: string`\n  - `name: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\n// Automatically fetches more pages as needed.\nfor await (const namespace of client.namespaces.list()) {\n  console.log(namespace);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/namespaces/{namespaceId}',
    httpMethod: 'delete',
    summary: 'Delete Namespace',
    description: 'Soft-delete a namespace. Rejects if it has active inboxes.',
    stainlessPath: '(resource) namespaces > (method) delete',
    qualified: 'client.namespaces.delete',
    params: ['namespaceId: string;'],
    response: '{ id: string; }',
    markdown:
      "## delete\n\n`client.namespaces.delete(namespaceId: string): { id: string; }`\n\n**delete** `/namespaces/{namespaceId}`\n\nSoft-delete a namespace. Rejects if it has active inboxes.\n\n### Parameters\n\n- `namespaceId: string`\n\n### Returns\n\n- `{ id: string; }`\n\n  - `id: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst namespace = await client.namespaces.delete('ns_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(namespace);\n```",
  },
  {
    name: 'list',
    endpoint: '/namespaces/{namespaceId}/inboxes',
    httpMethod: 'get',
    summary: 'List Namespace Inboxes',
    description: 'List inboxes in a namespace.',
    stainlessPath: '(resource) namespaces.inboxes > (method) list',
    qualified: 'client.namespaces.inboxes.list',
    params: ['namespaceId: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      '{ id: string; address: string; agentId: string; createdAt: string; domainId: string; domainName: string; name: string; namespaceId: string; namespaceName: string; updatedAt?: string; }',
    markdown:
      "## list\n\n`client.namespaces.inboxes.list(namespaceId: string, cursor?: string, limit?: number): { id: string; address: string; agentId: string; createdAt: string; domainId: string; domainName: string; name: string; namespaceId: string; namespaceName: string; updatedAt?: string; }`\n\n**get** `/namespaces/{namespaceId}/inboxes`\n\nList inboxes in a namespace.\n\n### Parameters\n\n- `namespaceId: string`\n\n- `cursor?: string`\n  The cursor to retrieve the next page of results\n\n- `limit?: number`\n  The maximum number of results to return\n\n### Returns\n\n- `{ id: string; address: string; agentId: string; createdAt: string; domainId: string; domainName: string; name: string; namespaceId: string; namespaceName: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `address: string`\n  - `agentId: string`\n  - `createdAt: string`\n  - `domainId: string`\n  - `domainName: string`\n  - `name: string`\n  - `namespaceId: string`\n  - `namespaceName: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\n// Automatically fetches more pages as needed.\nfor await (const inbox of client.namespaces.inboxes.list('ns_01kabn43yqyxn2bx4ve84mczd3')) {\n  console.log(inbox);\n}\n```",
  },
  {
    name: 'create',
    endpoint: '/inboxes',
    httpMethod: 'post',
    summary: 'Create Inbox',
    description: 'Create a new inbox on a verified domain.',
    stainlessPath: '(resource) inboxes > (method) create',
    qualified: 'client.inboxes.create',
    params: [
      'address: string;',
      'agentId?: string;',
      'domainId?: string;',
      'name?: string;',
      'namespaceId?: string;',
    ],
    response:
      '{ id: string; address: string; agentId: string; createdAt: string; domainId: string; domainName: string; name: string; namespaceId: string; namespaceName: string; updatedAt?: string; }',
    markdown:
      "## create\n\n`client.inboxes.create(address: string, agentId?: string, domainId?: string, name?: string, namespaceId?: string): { id: string; address: string; agentId: string; createdAt: string; domainId: string; domainName: string; name: string; namespaceId: string; namespaceName: string; updatedAt?: string; }`\n\n**post** `/inboxes`\n\nCreate a new inbox on a verified domain.\n\n### Parameters\n\n- `address: string`\n  The local-part of the email address (before the @).\n\n- `agentId?: string`\n  The external AI agent identifier.\n\n- `domainId?: string`\n  The id of the domain for this inbox. Defaults to your provided domain when omitted.\n\n- `name?: string`\n  The display name of the inbox.\n\n- `namespaceId?: string`\n  The id of the namespace to assign the inbox to.\n\n### Returns\n\n- `{ id: string; address: string; agentId: string; createdAt: string; domainId: string; domainName: string; name: string; namespaceId: string; namespaceName: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `address: string`\n  - `agentId: string`\n  - `createdAt: string`\n  - `domainId: string`\n  - `domainName: string`\n  - `name: string`\n  - `namespaceId: string`\n  - `namespaceName: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst inbox = await client.inboxes.create({ address: 'x' });\n\nconsole.log(inbox);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/inboxes/{inboxId}',
    httpMethod: 'get',
    summary: 'Retrieve Inbox',
    description: 'Retrieve an inbox with thread stats.',
    stainlessPath: '(resource) inboxes > (method) retrieve',
    qualified: 'client.inboxes.retrieve',
    params: ['inboxId: string;'],
    response:
      '{ id: string; address: string; agentId: string; createdAt: string; domainId: string; domainName: string; name: string; namespaceId: string; namespaceName: string; updatedAt?: string; }',
    markdown:
      "## retrieve\n\n`client.inboxes.retrieve(inboxId: string): { id: string; address: string; agentId: string; createdAt: string; domainId: string; domainName: string; name: string; namespaceId: string; namespaceName: string; updatedAt?: string; }`\n\n**get** `/inboxes/{inboxId}`\n\nRetrieve an inbox with thread stats.\n\n### Parameters\n\n- `inboxId: string`\n\n### Returns\n\n- `{ id: string; address: string; agentId: string; createdAt: string; domainId: string; domainName: string; name: string; namespaceId: string; namespaceName: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `address: string`\n  - `agentId: string`\n  - `createdAt: string`\n  - `domainId: string`\n  - `domainName: string`\n  - `name: string`\n  - `namespaceId: string`\n  - `namespaceName: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst inbox = await client.inboxes.retrieve('ibx_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(inbox);\n```",
  },
  {
    name: 'update',
    endpoint: '/inboxes/{inboxId}',
    httpMethod: 'patch',
    summary: 'Update Inbox',
    description: 'Update an inbox.',
    stainlessPath: '(resource) inboxes > (method) update',
    qualified: 'client.inboxes.update',
    params: ['inboxId: string;', 'name?: string;'],
    response: '{ id: string; }',
    markdown:
      "## update\n\n`client.inboxes.update(inboxId: string, name?: string): { id: string; }`\n\n**patch** `/inboxes/{inboxId}`\n\nUpdate an inbox.\n\n### Parameters\n\n- `inboxId: string`\n\n- `name?: string`\n  The display name of the inbox.\n\n### Returns\n\n- `{ id: string; }`\n\n  - `id: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst inbox = await client.inboxes.update('ibx_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(inbox);\n```",
  },
  {
    name: 'list',
    endpoint: '/inboxes',
    httpMethod: 'get',
    summary: 'List Inboxes',
    description: 'List all inboxes.',
    stainlessPath: '(resource) inboxes > (method) list',
    qualified: 'client.inboxes.list',
    params: ['cursor?: string;', 'limit?: number;', 'namespaceId?: string;'],
    response:
      '{ id: string; address: string; agentId: string; createdAt: string; domainId: string; domainName: string; name: string; namespaceId: string; namespaceName: string; updatedAt?: string; }',
    markdown:
      "## list\n\n`client.inboxes.list(cursor?: string, limit?: number, namespaceId?: string): { id: string; address: string; agentId: string; createdAt: string; domainId: string; domainName: string; name: string; namespaceId: string; namespaceName: string; updatedAt?: string; }`\n\n**get** `/inboxes`\n\nList all inboxes.\n\n### Parameters\n\n- `cursor?: string`\n  The cursor to retrieve the next page of results\n\n- `limit?: number`\n  The maximum number of results to return\n\n- `namespaceId?: string`\n  Filter by namespace.\n\n### Returns\n\n- `{ id: string; address: string; agentId: string; createdAt: string; domainId: string; domainName: string; name: string; namespaceId: string; namespaceName: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `address: string`\n  - `agentId: string`\n  - `createdAt: string`\n  - `domainId: string`\n  - `domainName: string`\n  - `name: string`\n  - `namespaceId: string`\n  - `namespaceName: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\n// Automatically fetches more pages as needed.\nfor await (const inbox of client.inboxes.list()) {\n  console.log(inbox);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/inboxes/{inboxId}',
    httpMethod: 'delete',
    summary: 'Delete Inbox',
    description: 'Soft-delete an inbox.',
    stainlessPath: '(resource) inboxes > (method) delete',
    qualified: 'client.inboxes.delete',
    params: ['inboxId: string;'],
    response: '{ id: string; }',
    markdown:
      "## delete\n\n`client.inboxes.delete(inboxId: string): { id: string; }`\n\n**delete** `/inboxes/{inboxId}`\n\nSoft-delete an inbox.\n\n### Parameters\n\n- `inboxId: string`\n\n### Returns\n\n- `{ id: string; }`\n\n  - `id: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst inbox = await client.inboxes.delete('ibx_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(inbox);\n```",
  },
  {
    name: 'send',
    endpoint: '/inboxes/{inboxId}/messages',
    httpMethod: 'post',
    summary: 'Send Message',
    description: 'Send a new message from an inbox.',
    stainlessPath: '(resource) inboxes > (method) send',
    qualified: 'client.inboxes.send',
    params: [
      'inboxId: string;',
      'subject: string;',
      'to: string[];',
      'bcc?: string[];',
      'cc?: string[];',
      'html?: string;',
      'text?: string;',
    ],
    response: '{ id: string; messageId: string; subject: string; threadId: string; }',
    markdown:
      "## send\n\n`client.inboxes.send(inboxId: string, subject: string, to: string[], bcc?: string[], cc?: string[], html?: string, text?: string): { id: string; messageId: string; subject: string; threadId: string; }`\n\n**post** `/inboxes/{inboxId}/messages`\n\nSend a new message from an inbox.\n\n### Parameters\n\n- `inboxId: string`\n\n- `subject: string`\n  The message subject.\n\n- `to: string[]`\n  The recipient addresses.\n\n- `bcc?: string[]`\n  The BCC addresses.\n\n- `cc?: string[]`\n  The CC addresses.\n\n- `html?: string`\n  The HTML body.\n\n- `text?: string`\n  The plain text body.\n\n### Returns\n\n- `{ id: string; messageId: string; subject: string; threadId: string; }`\n\n  - `id: string`\n  - `messageId: string`\n  - `subject: string`\n  - `threadId: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst response = await client.inboxes.send('ibx_01kabn43yqyxn2bx4ve84mczd3', { subject: 'x', to: ['dev@stainless.com'] });\n\nconsole.log(response);\n```",
  },
  {
    name: 'list',
    endpoint: '/inboxes/{inboxId}/threads',
    httpMethod: 'get',
    summary: 'List Threads',
    description: 'List threads in an inbox.',
    stainlessPath: '(resource) inboxes.threads > (method) list',
    qualified: 'client.inboxes.threads.list',
    params: [
      'inboxId: string;',
      'cursor?: string;',
      'isRead?: boolean;',
      'isSpam?: boolean;',
      'limit?: number;',
    ],
    response:
      '{ id: string; agentId: string; createdAt: string; domainId: string; domainName: string; inboxId: string; isRead: boolean; isSpam: boolean; lastMessageAt: string; messageCount: number; subject: string; updatedAt?: string; }',
    markdown:
      "## list\n\n`client.inboxes.threads.list(inboxId: string, cursor?: string, isRead?: boolean, isSpam?: boolean, limit?: number): { id: string; agentId: string; createdAt: string; domainId: string; domainName: string; inboxId: string; isRead: boolean; isSpam: boolean; lastMessageAt: string; messageCount: number; subject: string; updatedAt?: string; }`\n\n**get** `/inboxes/{inboxId}/threads`\n\nList threads in an inbox.\n\n### Parameters\n\n- `inboxId: string`\n\n- `cursor?: string`\n  The cursor to retrieve the next page of results\n\n- `isRead?: boolean`\n  Filter by read status.\n\n- `isSpam?: boolean`\n  Filter by spam status.\n\n- `limit?: number`\n  The maximum number of results to return\n\n### Returns\n\n- `{ id: string; agentId: string; createdAt: string; domainId: string; domainName: string; inboxId: string; isRead: boolean; isSpam: boolean; lastMessageAt: string; messageCount: number; subject: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `agentId: string`\n  - `createdAt: string`\n  - `domainId: string`\n  - `domainName: string`\n  - `inboxId: string`\n  - `isRead: boolean`\n  - `isSpam: boolean`\n  - `lastMessageAt: string`\n  - `messageCount: number`\n  - `subject: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\n// Automatically fetches more pages as needed.\nfor await (const thread of client.inboxes.threads.list('ibx_01kabn43yqyxn2bx4ve84mczd3')) {\n  console.log(thread);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/threads/{threadId}',
    httpMethod: 'get',
    summary: 'Retrieve Thread',
    description: 'Retrieve a thread. Auto-marks as read.',
    stainlessPath: '(resource) threads > (method) retrieve',
    qualified: 'client.threads.retrieve',
    params: ['threadId: string;'],
    response:
      '{ id: string; agentId: string; createdAt: string; domainId: string; domainName: string; inboxId: string; isRead: boolean; isSpam: boolean; lastMessageAt: string; messageCount: number; subject: string; updatedAt?: string; }',
    markdown:
      "## retrieve\n\n`client.threads.retrieve(threadId: string): { id: string; agentId: string; createdAt: string; domainId: string; domainName: string; inboxId: string; isRead: boolean; isSpam: boolean; lastMessageAt: string; messageCount: number; subject: string; updatedAt?: string; }`\n\n**get** `/threads/{threadId}`\n\nRetrieve a thread. Auto-marks as read.\n\n### Parameters\n\n- `threadId: string`\n\n### Returns\n\n- `{ id: string; agentId: string; createdAt: string; domainId: string; domainName: string; inboxId: string; isRead: boolean; isSpam: boolean; lastMessageAt: string; messageCount: number; subject: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `agentId: string`\n  - `createdAt: string`\n  - `domainId: string`\n  - `domainName: string`\n  - `inboxId: string`\n  - `isRead: boolean`\n  - `isSpam: boolean`\n  - `lastMessageAt: string`\n  - `messageCount: number`\n  - `subject: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst thread = await client.threads.retrieve('thr_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(thread);\n```",
  },
  {
    name: 'update',
    endpoint: '/threads/{threadId}',
    httpMethod: 'patch',
    summary: 'Update Thread',
    description: 'Update thread properties (read status, spam, agent).',
    stainlessPath: '(resource) threads > (method) update',
    qualified: 'client.threads.update',
    params: ['threadId: string;', 'agentId?: string;', 'isRead?: boolean;', 'isSpam?: boolean;'],
    response: '{ id: string; }',
    markdown:
      "## update\n\n`client.threads.update(threadId: string, agentId?: string, isRead?: boolean, isSpam?: boolean): { id: string; }`\n\n**patch** `/threads/{threadId}`\n\nUpdate thread properties (read status, spam, agent).\n\n### Parameters\n\n- `threadId: string`\n\n- `agentId?: string`\n  The AI agent identifier.\n\n- `isRead?: boolean`\n  Mark the thread as read or unread.\n\n- `isSpam?: boolean`\n  Mark the thread as spam or not spam.\n\n### Returns\n\n- `{ id: string; }`\n\n  - `id: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst thread = await client.threads.update('thr_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(thread);\n```",
  },
  {
    name: 'list',
    endpoint: '/threads/{threadId}/messages',
    httpMethod: 'get',
    summary: 'List Thread Messages',
    description: 'List messages in a thread (chronological order).',
    stainlessPath: '(resource) threads.messages > (method) list',
    qualified: 'client.threads.messages.list',
    params: ['threadId: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      "{ id: string; attachmentCount: number; bcc: string[]; cc: string[]; createdAt: string; from: string; messageId: string; receivedAt: string; replyTo: string[]; status: 'received' | 'sent' | 'discarded' | 'failed'; subject: string; threadId: string; to: string[]; }",
    markdown:
      "## list\n\n`client.threads.messages.list(threadId: string, cursor?: string, limit?: number): { id: string; attachmentCount: number; bcc: string[]; cc: string[]; createdAt: string; from: string; messageId: string; receivedAt: string; replyTo: string[]; status: 'received' | 'sent' | 'discarded' | 'failed'; subject: string; threadId: string; to: string[]; }`\n\n**get** `/threads/{threadId}/messages`\n\nList messages in a thread (chronological order).\n\n### Parameters\n\n- `threadId: string`\n\n- `cursor?: string`\n  The cursor to retrieve the next page of results\n\n- `limit?: number`\n  The maximum number of results to return\n\n### Returns\n\n- `{ id: string; attachmentCount: number; bcc: string[]; cc: string[]; createdAt: string; from: string; messageId: string; receivedAt: string; replyTo: string[]; status: 'received' | 'sent' | 'discarded' | 'failed'; subject: string; threadId: string; to: string[]; }`\n\n  - `id: string`\n  - `attachmentCount: number`\n  - `bcc: string[]`\n  - `cc: string[]`\n  - `createdAt: string`\n  - `from: string`\n  - `messageId: string`\n  - `receivedAt: string`\n  - `replyTo: string[]`\n  - `status: 'received' | 'sent' | 'discarded' | 'failed'`\n  - `subject: string`\n  - `threadId: string`\n  - `to: string[]`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\n// Automatically fetches more pages as needed.\nfor await (const messageListResponse of client.threads.messages.list('thr_01kabn43yqyxn2bx4ve84mczd3')) {\n  console.log(messageListResponse);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/messages/{messageId}',
    httpMethod: 'get',
    summary: 'Retrieve Message',
    description: 'Retrieve a single message with inbox enrichment.',
    stainlessPath: '(resource) messages > (method) retrieve',
    qualified: 'client.messages.retrieve',
    params: ['messageId: string;'],
    response:
      "{ id: string; attachmentCount: number; bcc: string[]; cc: string[]; createdAt: string; from: string; headers: object; inboxId: string; messageId: string; receivedAt: string; replyTo: string[]; status: 'received' | 'sent' | 'discarded' | 'failed'; subject: string; threadId: string; to: string[]; }",
    markdown:
      "## retrieve\n\n`client.messages.retrieve(messageId: string): { id: string; attachmentCount: number; bcc: string[]; cc: string[]; createdAt: string; from: string; headers: object; inboxId: string; messageId: string; receivedAt: string; replyTo: string[]; status: 'received' | 'sent' | 'discarded' | 'failed'; subject: string; threadId: string; to: string[]; }`\n\n**get** `/messages/{messageId}`\n\nRetrieve a single message with inbox enrichment.\n\n### Parameters\n\n- `messageId: string`\n\n### Returns\n\n- `{ id: string; attachmentCount: number; bcc: string[]; cc: string[]; createdAt: string; from: string; headers: object; inboxId: string; messageId: string; receivedAt: string; replyTo: string[]; status: 'received' | 'sent' | 'discarded' | 'failed'; subject: string; threadId: string; to: string[]; }`\n\n  - `id: string`\n  - `attachmentCount: number`\n  - `bcc: string[]`\n  - `cc: string[]`\n  - `createdAt: string`\n  - `from: string`\n  - `headers: object`\n  - `inboxId: string`\n  - `messageId: string`\n  - `receivedAt: string`\n  - `replyTo: string[]`\n  - `status: 'received' | 'sent' | 'discarded' | 'failed'`\n  - `subject: string`\n  - `threadId: string`\n  - `to: string[]`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst messageDetail = await client.messages.retrieve('imsg_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(messageDetail);\n```",
  },
  {
    name: 'list',
    endpoint: '/messages',
    httpMethod: 'get',
    summary: 'List Messages',
    description: 'List all received messages across inboxes.',
    stainlessPath: '(resource) messages > (method) list',
    qualified: 'client.messages.list',
    params: ['cursor?: string;', 'domainId?: string;', 'from?: string;', 'limit?: number;'],
    response:
      "{ id: string; attachmentCount: number; bcc: string[]; cc: string[]; createdAt: string; from: string; inboxId: string; messageId: string; receivedAt: string; replyTo: string[]; status: 'received' | 'sent' | 'discarded' | 'failed'; subject: string; threadId: string; to: string[]; }",
    markdown:
      "## list\n\n`client.messages.list(cursor?: string, domainId?: string, from?: string, limit?: number): { id: string; attachmentCount: number; bcc: string[]; cc: string[]; createdAt: string; from: string; inboxId: string; messageId: string; receivedAt: string; replyTo: string[]; status: 'received' | 'sent' | 'discarded' | 'failed'; subject: string; threadId: string; to: string[]; }`\n\n**get** `/messages`\n\nList all received messages across inboxes.\n\n### Parameters\n\n- `cursor?: string`\n  The cursor to retrieve the next page of results\n\n- `domainId?: string`\n  Filter by domain.\n\n- `from?: string`\n  Filter by sender address.\n\n- `limit?: number`\n  The maximum number of results to return\n\n### Returns\n\n- `{ id: string; attachmentCount: number; bcc: string[]; cc: string[]; createdAt: string; from: string; inboxId: string; messageId: string; receivedAt: string; replyTo: string[]; status: 'received' | 'sent' | 'discarded' | 'failed'; subject: string; threadId: string; to: string[]; }`\n\n  - `id: string`\n  - `attachmentCount: number`\n  - `bcc: string[]`\n  - `cc: string[]`\n  - `createdAt: string`\n  - `from: string`\n  - `inboxId: string`\n  - `messageId: string`\n  - `receivedAt: string`\n  - `replyTo: string[]`\n  - `status: 'received' | 'sent' | 'discarded' | 'failed'`\n  - `subject: string`\n  - `threadId: string`\n  - `to: string[]`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\n// Automatically fetches more pages as needed.\nfor await (const message of client.messages.list()) {\n  console.log(message);\n}\n```",
  },
  {
    name: 'forward',
    endpoint: '/messages/{messageId}/forward',
    httpMethod: 'post',
    summary: 'Forward Message',
    description: 'Forward a message to new recipients.',
    stainlessPath: '(resource) messages > (method) forward',
    qualified: 'client.messages.forward',
    params: ['messageId: string;', 'to: string[];', 'text?: string;'],
    response: '{ id: string; messageId: string; subject: string; threadId: string; }',
    markdown:
      "## forward\n\n`client.messages.forward(messageId: string, to: string[], text?: string): { id: string; messageId: string; subject: string; threadId: string; }`\n\n**post** `/messages/{messageId}/forward`\n\nForward a message to new recipients.\n\n### Parameters\n\n- `messageId: string`\n\n- `to: string[]`\n  The recipient addresses to forward to.\n\n- `text?: string`\n  An optional comment to prepend.\n\n### Returns\n\n- `{ id: string; messageId: string; subject: string; threadId: string; }`\n\n  - `id: string`\n  - `messageId: string`\n  - `subject: string`\n  - `threadId: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst response = await client.messages.forward('imsg_01kabn43yqyxn2bx4ve84mczd3', { to: ['dev@stainless.com'] });\n\nconsole.log(response);\n```",
  },
  {
    name: 'reply',
    endpoint: '/messages/{messageId}/reply',
    httpMethod: 'post',
    summary: 'Reply to Message',
    description: 'Reply to a message. Set replyAll to true to reply to all recipients.',
    stainlessPath: '(resource) messages > (method) reply',
    qualified: 'client.messages.reply',
    params: ['messageId: string;', 'html?: string;', 'replyAll?: boolean;', 'text?: string;'],
    response: '{ id: string; messageId: string; subject: string; threadId: string; }',
    markdown:
      "## reply\n\n`client.messages.reply(messageId: string, html?: string, replyAll?: boolean, text?: string): { id: string; messageId: string; subject: string; threadId: string; }`\n\n**post** `/messages/{messageId}/reply`\n\nReply to a message. Set replyAll to true to reply to all recipients.\n\n### Parameters\n\n- `messageId: string`\n\n- `html?: string`\n  The HTML body.\n\n- `replyAll?: boolean`\n  Whether to reply to all recipients.\n\n- `text?: string`\n  The plain text body.\n\n### Returns\n\n- `{ id: string; messageId: string; subject: string; threadId: string; }`\n\n  - `id: string`\n  - `messageId: string`\n  - `subject: string`\n  - `threadId: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst response = await client.messages.reply('imsg_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/messages/{messageId}/content',
    httpMethod: 'get',
    summary: 'Retrieve Message Content',
    description:
      'Returns presigned URLs to download the HTML, plain-text, and raw MIME source of a received message.',
    stainlessPath: '(resource) messages.content > (method) retrieve',
    qualified: 'client.messages.content.retrieve',
    params: ['messageId: string;', "format?: 'html' | 'text' | 'mime'[];"],
    response:
      '{ html: { downloadUrl: string; expiresAt: string; size: number; }; mime: { downloadUrl: string; expiresAt: string; size: number; }; text: { downloadUrl: string; expiresAt: string; size: number; }; }',
    markdown:
      "## retrieve\n\n`client.messages.content.retrieve(messageId: string, format?: 'html' | 'text' | 'mime'[]): { html: message_content_item; mime: message_content_item; text: message_content_item; }`\n\n**get** `/messages/{messageId}/content`\n\nReturns presigned URLs to download the HTML, plain-text, and raw MIME source of a received message.\n\n### Parameters\n\n- `messageId: string`\n\n- `format?: 'html' | 'text' | 'mime'[]`\n  Content formats to retrieve. Defaults to `html` only.\n\n### Returns\n\n- `{ html: { downloadUrl: string; expiresAt: string; size: number; }; mime: { downloadUrl: string; expiresAt: string; size: number; }; text: { downloadUrl: string; expiresAt: string; size: number; }; }`\n\n  - `html: { downloadUrl: string; expiresAt: string; size: number; }`\n  - `mime: { downloadUrl: string; expiresAt: string; size: number; }`\n  - `text: { downloadUrl: string; expiresAt: string; size: number; }`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst messageContent = await client.messages.content.retrieve('imsg_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(messageContent);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/messages/{messageId}/attachments/{attachmentId}',
    httpMethod: 'get',
    summary: 'Retrieve Attachment',
    description: 'Retrieve an attachment with a presigned download URL.',
    stainlessPath: '(resource) messages.attachments > (method) retrieve',
    qualified: 'client.messages.attachments.retrieve',
    params: ['messageId: string;', 'attachmentId: string;'],
    response:
      '{ id: string; contentDisposition: string; contentId: string; contentType: string; filename: string; size: number; downloadUrl?: string; }',
    markdown:
      "## retrieve\n\n`client.messages.attachments.retrieve(messageId: string, attachmentId: string): { id: string; contentDisposition: string; contentId: string; contentType: string; filename: string; size: number; downloadUrl?: string; }`\n\n**get** `/messages/{messageId}/attachments/{attachmentId}`\n\nRetrieve an attachment with a presigned download URL.\n\n### Parameters\n\n- `messageId: string`\n\n- `attachmentId: string`\n\n### Returns\n\n- `{ id: string; contentDisposition: string; contentId: string; contentType: string; filename: string; size: number; downloadUrl?: string; }`\n\n  - `id: string`\n  - `contentDisposition: string`\n  - `contentId: string`\n  - `contentType: string`\n  - `filename: string`\n  - `size: number`\n  - `downloadUrl?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst messageAttachment = await client.messages.attachments.retrieve('iatt_01kabn43yqyxn2bx4ve84mczd3', { messageId: 'imsg_01kabn43yqyxn2bx4ve84mczd3' });\n\nconsole.log(messageAttachment);\n```",
  },
  {
    name: 'list',
    endpoint: '/messages/{messageId}/attachments',
    httpMethod: 'get',
    summary: 'List Attachments',
    description: 'List all attachments for a message.',
    stainlessPath: '(resource) messages.attachments > (method) list',
    qualified: 'client.messages.attachments.list',
    params: ['messageId: string;'],
    response:
      '{ id: string; contentDisposition: string; contentId: string; contentType: string; filename: string; size: number; downloadUrl?: string; }[]',
    markdown:
      "## list\n\n`client.messages.attachments.list(messageId: string): object[]`\n\n**get** `/messages/{messageId}/attachments`\n\nList all attachments for a message.\n\n### Parameters\n\n- `messageId: string`\n\n### Returns\n\n- `{ id: string; contentDisposition: string; contentId: string; contentType: string; filename: string; size: number; downloadUrl?: string; }[]`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst messageAttachments = await client.messages.attachments.list('imsg_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(messageAttachments);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/agents/{agentId}/memory',
    httpMethod: 'get',
    summary: 'Retrieve Agent Memory',
    description: 'Retrieve the memory for an AI agent.',
    stainlessPath: '(resource) agents.memory > (method) retrieve',
    qualified: 'client.agents.memory.retrieve',
    params: ['agentId: string;', 'inboxId?: string;', 'threadId?: string;'],
    response:
      '{ id: string; agentId: string; createdAt: string; inboxId: string; memory: object; summary: string; threadId: string; updatedAt?: string; }',
    markdown:
      "## retrieve\n\n`client.agents.memory.retrieve(agentId: string, inboxId?: string, threadId?: string): { id: string; agentId: string; createdAt: string; inboxId: string; memory: object; summary: string; threadId: string; updatedAt?: string; }`\n\n**get** `/agents/{agentId}/memory`\n\nRetrieve the memory for an AI agent.\n\n### Parameters\n\n- `agentId: string`\n\n- `inboxId?: string`\n  Scope memory to a specific inbox.\n\n- `threadId?: string`\n  Scope memory to a specific thread.\n\n### Returns\n\n- `{ id: string; agentId: string; createdAt: string; inboxId: string; memory: object; summary: string; threadId: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `agentId: string`\n  - `createdAt: string`\n  - `inboxId: string`\n  - `memory: object`\n  - `summary: string`\n  - `threadId: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst agentMemory = await client.agents.memory.retrieve('x');\n\nconsole.log(agentMemory);\n```",
  },
  {
    name: 'upsert',
    endpoint: '/agents/{agentId}/memory',
    httpMethod: 'put',
    summary: 'Upsert Agent Memory',
    description: 'Create or update the memory for an AI agent.',
    stainlessPath: '(resource) agents.memory > (method) upsert',
    qualified: 'client.agents.memory.upsert',
    params: [
      'agentId: string;',
      'memory: object;',
      'inboxId?: string;',
      'summary?: string;',
      'threadId?: string;',
    ],
    response:
      '{ id: string; agentId: string; createdAt: string; inboxId: string; memory: object; summary: string; threadId: string; updatedAt?: string; }',
    markdown:
      "## upsert\n\n`client.agents.memory.upsert(agentId: string, memory: object, inboxId?: string, summary?: string, threadId?: string): { id: string; agentId: string; createdAt: string; inboxId: string; memory: object; summary: string; threadId: string; updatedAt?: string; }`\n\n**put** `/agents/{agentId}/memory`\n\nCreate or update the memory for an AI agent.\n\n### Parameters\n\n- `agentId: string`\n\n- `memory: object`\n  The agent memory key-value data.\n\n- `inboxId?: string`\n  The inbox id to scope the memory to.\n\n- `summary?: string`\n  A human-readable conversation summary.\n\n- `threadId?: string`\n  The thread id to scope the memory to.\n\n### Returns\n\n- `{ id: string; agentId: string; createdAt: string; inboxId: string; memory: object; summary: string; threadId: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `agentId: string`\n  - `createdAt: string`\n  - `inboxId: string`\n  - `memory: object`\n  - `summary: string`\n  - `threadId: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst agentMemory = await client.agents.memory.upsert('x', { memory: { foo: 'string' } });\n\nconsole.log(agentMemory);\n```",
  },
  {
    name: 'create',
    endpoint: '/webhooks',
    httpMethod: 'post',
    summary: 'Create Webhook',
    description: 'Register an endpoint to start receiving webhook events for your organization.',
    stainlessPath: '(resource) webhooks > (method) create',
    qualified: 'client.webhooks.create',
    params: [
      'endpointUrl: string;',
      'events: string[];',
      'name?: string;',
      "status?: 'enabled' | 'disabled' | 'revoked';",
    ],
    response:
      "{ id: string; createdAt: string; endpointUrl: string; events: string[]; signingSecret: string; status: 'enabled' | 'disabled' | 'revoked'; name?: string; }",
    markdown:
      "## create\n\n`client.webhooks.create(endpointUrl: string, events: string[], name?: string, status?: 'enabled' | 'disabled' | 'revoked'): { id: string; createdAt: string; endpointUrl: string; events: event_type[]; signingSecret: string; status: 'enabled' | 'disabled' | 'revoked'; name?: string; }`\n\n**post** `/webhooks`\n\nRegister an endpoint to start receiving webhook events for your organization.\n\n### Parameters\n\n- `endpointUrl: string`\n  The endpoint URL of the webhook\n\n- `events: string[]`\n\n- `name?: string`\n  The name of the webhook\n\n- `status?: 'enabled' | 'disabled' | 'revoked'`\n  The status of the webhook.\n\n### Returns\n\n- `{ id: string; createdAt: string; endpointUrl: string; events: string[]; signingSecret: string; status: 'enabled' | 'disabled' | 'revoked'; name?: string; }`\n  Response after creating a webhook\n\n  - `id: string`\n  - `createdAt: string`\n  - `endpointUrl: string`\n  - `events: string[]`\n  - `signingSecret: string`\n  - `status: 'enabled' | 'disabled' | 'revoked'`\n  - `name?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst webhook = await client.webhooks.create({ endpointUrl: 'https://example.com', events: ['email.queued'] });\n\nconsole.log(webhook);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/webhooks/{id}',
    httpMethod: 'get',
    summary: 'Retrieve Webhook',
    description: 'Returns a webhook endpoint with its URL, subscribed events, and configuration.',
    stainlessPath: '(resource) webhooks > (method) retrieve',
    qualified: 'client.webhooks.retrieve',
    params: ['id: string;'],
    response:
      "{ id: string; createdAt: string; endpointUrl: string; events: string[]; status: 'enabled' | 'disabled' | 'revoked'; name?: string; }",
    markdown:
      "## retrieve\n\n`client.webhooks.retrieve(id: string): { id: string; createdAt: string; endpointUrl: string; events: event_type[]; status: 'enabled' | 'disabled' | 'revoked'; name?: string; }`\n\n**get** `/webhooks/{id}`\n\nReturns a webhook endpoint with its URL, subscribed events, and configuration.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; createdAt: string; endpointUrl: string; events: string[]; status: 'enabled' | 'disabled' | 'revoked'; name?: string; }`\n  Webhook details\n\n  - `id: string`\n  - `createdAt: string`\n  - `endpointUrl: string`\n  - `events: string[]`\n  - `status: 'enabled' | 'disabled' | 'revoked'`\n  - `name?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst webhook = await client.webhooks.retrieve('wh_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(webhook);\n```",
  },
  {
    name: 'update',
    endpoint: '/webhooks/{id}',
    httpMethod: 'put',
    summary: 'Update Webhook',
    description: 'Update the endpoint URL, subscribed event types, or rotate the signing secret.',
    stainlessPath: '(resource) webhooks > (method) update',
    qualified: 'client.webhooks.update',
    params: [
      'id: string;',
      'endpointUrl?: string;',
      'events?: string[];',
      'name?: string;',
      'rotateSecret?: boolean;',
      "status?: 'enabled' | 'disabled' | 'revoked';",
    ],
    response: '{ id: string; signingSecret?: string; }',
    markdown:
      "## update\n\n`client.webhooks.update(id: string, endpointUrl?: string, events?: string[], name?: string, rotateSecret?: boolean, status?: 'enabled' | 'disabled' | 'revoked'): { id: string; signingSecret?: string; }`\n\n**put** `/webhooks/{id}`\n\nUpdate the endpoint URL, subscribed event types, or rotate the signing secret.\n\n### Parameters\n\n- `id: string`\n\n- `endpointUrl?: string`\n  The endpoint URL of the webhook\n\n- `events?: string[]`\n\n- `name?: string`\n  The name of the webhook\n\n- `rotateSecret?: boolean`\n  If true, a new signing secret will be generated\n\n- `status?: 'enabled' | 'disabled' | 'revoked'`\n  The status of the webhook.\n\n### Returns\n\n- `{ id: string; signingSecret?: string; }`\n  Response after updating a webhook\n\n  - `id: string`\n  - `signingSecret?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst webhook = await client.webhooks.update('wh_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(webhook);\n```",
  },
  {
    name: 'list',
    endpoint: '/webhooks',
    httpMethod: 'get',
    summary: 'List Webhooks',
    description: 'Returns all registered webhook endpoints for the organization.',
    stainlessPath: '(resource) webhooks > (method) list',
    qualified: 'client.webhooks.list',
    params: ['cursor?: string;', 'limit?: number;'],
    response:
      "{ id: string; createdAt: string; endpointUrl: string; events: string[]; status: 'enabled' | 'disabled' | 'revoked'; name?: string; }",
    markdown:
      "## list\n\n`client.webhooks.list(cursor?: string, limit?: number): { id: string; createdAt: string; endpointUrl: string; events: event_type[]; status: 'enabled' | 'disabled' | 'revoked'; name?: string; }`\n\n**get** `/webhooks`\n\nReturns all registered webhook endpoints for the organization.\n\n### Parameters\n\n- `cursor?: string`\n  The cursor to retrieve the next page of results\n\n- `limit?: number`\n  The maximum number of results to return\n\n### Returns\n\n- `{ id: string; createdAt: string; endpointUrl: string; events: string[]; status: 'enabled' | 'disabled' | 'revoked'; name?: string; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `endpointUrl: string`\n  - `events: string[]`\n  - `status: 'enabled' | 'disabled' | 'revoked'`\n  - `name?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\n// Automatically fetches more pages as needed.\nfor await (const webhookListResponse of client.webhooks.list()) {\n  console.log(webhookListResponse);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/webhooks/{id}',
    httpMethod: 'delete',
    summary: 'Delete Webhook',
    description: 'Remove a webhook endpoint. No further events will be delivered to this URL.',
    stainlessPath: '(resource) webhooks > (method) delete',
    qualified: 'client.webhooks.delete',
    params: ['id: string;'],
    response: '{ id: string; }',
    markdown:
      "## delete\n\n`client.webhooks.delete(id: string): { id: string; }`\n\n**delete** `/webhooks/{id}`\n\nRemove a webhook endpoint. No further events will be delivered to this URL.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; }`\n  Response after deleting a webhook\n\n  - `id: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst webhook = await client.webhooks.delete('wh_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(webhook);\n```",
  },
  {
    name: 'list',
    endpoint: '/webhooks/events',
    httpMethod: 'get',
    summary: 'List Webhook Events',
    description: 'Returns recent webhook events across all registered endpoints.',
    stainlessPath: '(resource) webhooks.events > (method) list',
    qualified: 'client.webhooks.events.list',
    params: ['cursor?: string;', 'limit?: number;'],
    response:
      "{ id: string; data: object; event: string; orgId: string; status: 'success' | 'pending' | 'failed'; webhookId: string; successfulAt?: string; }",
    markdown:
      "## list\n\n`client.webhooks.events.list(cursor?: string, limit?: number): { id: string; data: object; event: event_type; orgId: string; status: 'success' | 'pending' | 'failed'; webhookId: string; successfulAt?: string; }`\n\n**get** `/webhooks/events`\n\nReturns recent webhook events across all registered endpoints.\n\n### Parameters\n\n- `cursor?: string`\n  The cursor to retrieve the next page of results\n\n- `limit?: number`\n  The maximum number of results to return\n\n### Returns\n\n- `{ id: string; data: object; event: string; orgId: string; status: 'success' | 'pending' | 'failed'; webhookId: string; successfulAt?: string; }`\n\n  - `id: string`\n  - `data: object`\n  - `event: string`\n  - `orgId: string`\n  - `status: 'success' | 'pending' | 'failed'`\n  - `webhookId: string`\n  - `successfulAt?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\n// Automatically fetches more pages as needed.\nfor await (const eventListResponse of client.webhooks.events.list()) {\n  console.log(eventListResponse);\n}\n```",
  },
  {
    name: 'deliveries',
    endpoint: '/webhooks/{id}/events/{eventId}/deliveries',
    httpMethod: 'get',
    summary: 'List Webhook Event Deliveries',
    description:
      'Returns all delivery attempts for a webhook event, including HTTP status codes and response times.',
    stainlessPath: '(resource) webhooks.events > (method) deliveries',
    qualified: 'client.webhooks.events.deliveries',
    params: ['id: string;', 'eventId: string;'],
    response:
      "{ id: string; code: string; deliveredAt: string; response: object; status: 'pending' | 'success' | 'failed'; }[]",
    markdown:
      "## deliveries\n\n`client.webhooks.events.deliveries(id: string, eventId: string): { id: string; code: string; deliveredAt: string; response: object; status: 'pending' | 'success' | 'failed'; }[]`\n\n**get** `/webhooks/{id}/events/{eventId}/deliveries`\n\nReturns all delivery attempts for a webhook event, including HTTP status codes and response times.\n\n### Parameters\n\n- `id: string`\n\n- `eventId: string`\n\n### Returns\n\n- `{ id: string; code: string; deliveredAt: string; response: object; status: 'pending' | 'success' | 'failed'; }[]`\n  List of webhook event deliveries\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst response = await client.webhooks.events.deliveries('evt_01ka8k8s80gvx9604cn9am5st4', { id: 'wh_01ka8k8s80gvx9604cn9am5st4' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'replay',
    endpoint: '/webhooks/{id}/events/{eventId}/replay',
    httpMethod: 'post',
    summary: 'Replay Webhook Event',
    description: 'Re-deliver a webhook event to its endpoint. Useful for retrying failed deliveries.',
    stainlessPath: '(resource) webhooks.events > (method) replay',
    qualified: 'client.webhooks.events.replay',
    params: ['id: string;', 'eventId: string;'],
    response: 'object',
    markdown:
      "## replay\n\n`client.webhooks.events.replay(id: string, eventId: string): object`\n\n**post** `/webhooks/{id}/events/{eventId}/replay`\n\nRe-deliver a webhook event to its endpoint. Useful for retrying failed deliveries.\n\n### Parameters\n\n- `id: string`\n\n- `eventId: string`\n\n### Returns\n\n- `object`\n  Response for webhook event replay\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst response = await client.webhooks.events.replay('evt_01ka8k8s80gvx9604cn9am5st4', { id: 'wh_01ka8k8s80gvx9604cn9am5st4' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/organizations/{id}',
    httpMethod: 'get',
    summary: 'Retrieve Organization',
    description: "Returns the organization's profile, plan, region, and account status.",
    stainlessPath: '(resource) organizations > (method) retrieve',
    qualified: 'client.organizations.retrieve',
    params: ['id: string;'],
    response: "{ id: string; name: string; status: 'enabled' | 'disabled'; }",
    markdown:
      "## retrieve\n\n`client.organizations.retrieve(id: string): { id: string; name: string; status: 'enabled' | 'disabled'; }`\n\n**get** `/organizations/{id}`\n\nReturns the organization's profile, plan, region, and account status.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; name: string; status: 'enabled' | 'disabled'; }`\n\n  - `id: string`\n  - `name: string`\n  - `status: 'enabled' | 'disabled'`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst organization = await client.organizations.retrieve('org_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(organization);\n```",
  },
  {
    name: 'list',
    endpoint: '/organizations',
    httpMethod: 'get',
    summary: 'Retrieve Organizations',
    description: 'Returns all organizations the authenticated user belongs to.',
    stainlessPath: '(resource) organizations > (method) list',
    qualified: 'client.organizations.list',
    params: ['cursor?: string;', 'limit?: number;'],
    response: "{ id: string; name: string; status: 'enabled' | 'disabled'; }",
    markdown:
      "## list\n\n`client.organizations.list(cursor?: string, limit?: number): { id: string; name: string; status: 'enabled' | 'disabled'; }`\n\n**get** `/organizations`\n\nReturns all organizations the authenticated user belongs to.\n\n### Parameters\n\n- `cursor?: string`\n  The cursor to retrieve the next page of results\n\n- `limit?: number`\n  The maximum number of results to return\n\n### Returns\n\n- `{ id: string; name: string; status: 'enabled' | 'disabled'; }`\n\n  - `id: string`\n  - `name: string`\n  - `status: 'enabled' | 'disabled'`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\n// Automatically fetches more pages as needed.\nfor await (const organizationListResponse of client.organizations.list()) {\n  console.log(organizationListResponse);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/organizations/{id}/usage',
    httpMethod: 'get',
    summary: 'Retrieve Organization Usage',
    description:
      'Returns current period usage metrics (daily and monthly) for sending and receiving, against your plan limits.',
    stainlessPath: '(resource) organizations.usage > (method) retrieve',
    qualified: 'client.organizations.usage.retrieve',
    params: ['id: string;'],
    response:
      '{ transactional: { limits: { daily: number; monthly: number; }; receiving: { daily: number; monthly: number; }; sending: { daily: number; monthly: number; }; usage: { daily: number; monthly: number; }; }; }',
    markdown:
      "## retrieve\n\n`client.organizations.usage.retrieve(id: string): { transactional: object; }`\n\n**get** `/organizations/{id}/usage`\n\nReturns current period usage metrics (daily and monthly) for sending and receiving, against your plan limits.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ transactional: { limits: { daily: number; monthly: number; }; receiving: { daily: number; monthly: number; }; sending: { daily: number; monthly: number; }; usage: { daily: number; monthly: number; }; }; }`\n\n  - `transactional: { limits: { daily: number; monthly: number; }; receiving: { daily: number; monthly: number; }; sending: { daily: number; monthly: number; }; usage: { daily: number; monthly: number; }; }`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst usage = await client.organizations.usage.retrieve('org_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(usage);\n```",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.2,
    boost: {
      name: 3,
      endpoint: 2,
      summary: 2,
      qualified: 2,
      content: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  // Note: Language is accepted for interface consistency with remote search, but currently has no
  // effect since this local search only supports TypeScript docs.
  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex.search(query).map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          fullResults.push({
            method: m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          this.indexProse(content, file.name);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}
