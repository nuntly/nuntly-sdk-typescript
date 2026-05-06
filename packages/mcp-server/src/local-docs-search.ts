// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

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
  perLanguage?: Record<string, PerLanguageData>;
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
    perLanguage: {
      typescript: {
        method: 'client.apiKeys.retrieve',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiKey = await client.apiKeys.retrieve('apk_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(apiKey.id);",
      },
      java: {
        method: 'apiKeys().retrieve',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.apikeys.ApiKeyRetrieveParams;\nimport com.nuntly.models.apikeys.ApiKeyRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        ApiKeyRetrieveResponse apiKey = client.apiKeys().retrieve("apk_01ka8k8s80gvx9604cn9am5st4");\n    }\n}',
      },
      go: {
        method: 'client.APIKeys.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiKey, err := client.APIKeys.Get(context.TODO(), "apk_01ka8k8s80gvx9604cn9am5st4")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiKey.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/api-keys/$ID \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.apiKeys.update',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiKey = await client.apiKeys.update('apk_01ka8k8s80gvx9604cn9am5st4', {\n  permission: 'fullAccess',\n});\n\nconsole.log(apiKey.id);",
      },
      java: {
        method: 'apiKeys().update',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.apikeys.ApiKeyUpdateParams;\nimport com.nuntly.models.apikeys.ApiKeyUpdateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        ApiKeyUpdateParams params = ApiKeyUpdateParams.builder()\n            .id("apk_01ka8k8s80gvx9604cn9am5st4")\n            .permission(ApiKeyUpdateParams.Permission.FULL_ACCESS)\n            .build();\n        ApiKeyUpdateResponse apiKey = client.apiKeys().update(params);\n    }\n}',
      },
      go: {
        method: 'client.APIKeys.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiKey, err := client.APIKeys.Update(\n\t\tcontext.TODO(),\n\t\t"apk_01ka8k8s80gvx9604cn9am5st4",\n\t\tnuntly.APIKeyUpdateParams{\n\t\t\tPermission: nuntly.APIKeyUpdateParamsPermissionFullAccess,\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiKey.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/api-keys/$ID \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY" \\\n    -d \'{\n          "permission": "fullAccess"\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.apiKeys.delete',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiKey = await client.apiKeys.delete('apk_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(apiKey.id);",
      },
      java: {
        method: 'apiKeys().delete',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.apikeys.ApiKeyDeleteParams;\nimport com.nuntly.models.apikeys.ApiKeyDeleteResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        ApiKeyDeleteResponse apiKey = client.apiKeys().delete("apk_01ka8k8s80gvx9604cn9am5st4");\n    }\n}',
      },
      go: {
        method: 'client.APIKeys.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiKey, err := client.APIKeys.Delete(context.TODO(), "apk_01ka8k8s80gvx9604cn9am5st4")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiKey.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/api-keys/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
  },
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
    perLanguage: {
      typescript: {
        method: 'client.apiKeys.create',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiKey = await client.apiKeys.create();\n\nconsole.log(apiKey.id);",
      },
      java: {
        method: 'apiKeys().create',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.apikeys.ApiKeyCreateParams;\nimport com.nuntly.models.apikeys.ApiKeyCreateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        ApiKeyCreateResponse apiKey = client.apiKeys().create();\n    }\n}',
      },
      go: {
        method: 'client.APIKeys.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiKey, err := client.APIKeys.New(context.TODO(), nuntly.APIKeyNewParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiKey.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/api-keys \\\n    -X POST \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.apiKeys.list',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const apiKeyListResponse of client.apiKeys.list()) {\n  console.log(apiKeyListResponse.id);\n}",
      },
      java: {
        method: 'apiKeys().list',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.apikeys.ApiKeyListPage;\nimport com.nuntly.models.apikeys.ApiKeyListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        ApiKeyListPage page = client.apiKeys().list();\n    }\n}',
      },
      go: {
        method: 'client.APIKeys.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.APIKeys.List(context.TODO(), nuntly.APIKeyListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.nuntly.com/api-keys \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.domains.retrieve',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst domain = await client.domains.retrieve('dns_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(domain.id);",
      },
      java: {
        method: 'domains().retrieve',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.domains.DomainRetrieveParams;\nimport com.nuntly.models.domains.DomainRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        DomainRetrieveResponse domain = client.domains().retrieve("dns_01kabn43yqyxn2bx4ve84mczd3");\n    }\n}',
      },
      go: {
        method: 'client.Domains.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tdomain, err := client.Domains.Get(context.TODO(), "dns_01kabn43yqyxn2bx4ve84mczd3")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", domain.ID)\n}\n',
      },
      http: {
        example: 'curl https://api.nuntly.com/domains/$ID \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.domains.update',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst domain = await client.domains.update('dns_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(domain.id);",
      },
      java: {
        method: 'domains().update',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.domains.DomainUpdateParams;\nimport com.nuntly.models.domains.DomainUpdateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        DomainUpdateResponse domain = client.domains().update("dns_01kabn43yqyxn2bx4ve84mczd3");\n    }\n}',
      },
      go: {
        method: 'client.Domains.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tdomain, err := client.Domains.Update(\n\t\tcontext.TODO(),\n\t\t"dns_01kabn43yqyxn2bx4ve84mczd3",\n\t\tnuntly.DomainUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", domain.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/domains/$ID \\\n    -X PATCH \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.domains.delete',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst domain = await client.domains.delete('dns_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(domain.id);",
      },
      java: {
        method: 'domains().delete',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.domains.DomainDeleteParams;\nimport com.nuntly.models.domains.DomainDeleteResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        DomainDeleteResponse domain = client.domains().delete("dns_01kabn43yqyxn2bx4ve84mczd3");\n    }\n}',
      },
      go: {
        method: 'client.Domains.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tdomain, err := client.Domains.Delete(context.TODO(), "dns_01kabn43yqyxn2bx4ve84mczd3")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", domain.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/domains/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.domains.create',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst domain = await client.domains.create({ name: 'name' });\n\nconsole.log(domain.id);",
      },
      java: {
        method: 'domains().create',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.domains.DomainCreateParams;\nimport com.nuntly.models.domains.DomainCreateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        DomainCreateParams params = DomainCreateParams.builder()\n            .name("name")\n            .build();\n        DomainCreateResponse domain = client.domains().create(params);\n    }\n}',
      },
      go: {
        method: 'client.Domains.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tdomain, err := client.Domains.New(context.TODO(), nuntly.DomainNewParams{\n\t\tName: "name",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", domain.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/domains \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY" \\\n    -d \'{\n          "name": "name"\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.domains.list',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const domainListResponse of client.domains.list()) {\n  console.log(domainListResponse.id);\n}",
      },
      java: {
        method: 'domains().list',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.domains.DomainListPage;\nimport com.nuntly.models.domains.DomainListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        DomainListPage page = client.domains().list();\n    }\n}',
      },
      go: {
        method: 'client.Domains.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Domains.List(context.TODO(), nuntly.DomainListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.nuntly.com/domains \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.emails.retrieve',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst email = await client.emails.retrieve('em_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(email.id);",
      },
      java: {
        method: 'emails().retrieve',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.emails.EmailRetrieveParams;\nimport com.nuntly.models.emails.EmailRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        EmailRetrieveResponse email = client.emails().retrieve("em_01ka8k8s80gvx9604cn9am5st4");\n    }\n}',
      },
      go: {
        method: 'client.Emails.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\temail, err := client.Emails.Get(context.TODO(), "em_01ka8k8s80gvx9604cn9am5st4")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", email.ID)\n}\n',
      },
      http: {
        example: 'curl https://api.nuntly.com/emails/$ID \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.emails.cancel',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.emails.cancel('em_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(response.id);",
      },
      java: {
        method: 'emails().cancel',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.emails.EmailCancelParams;\nimport com.nuntly.models.emails.EmailCancelResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        EmailCancelResponse response = client.emails().cancel("em_01ka8k8s80gvx9604cn9am5st4");\n    }\n}',
      },
      go: {
        method: 'client.Emails.Cancel',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Emails.Cancel(context.TODO(), "em_01ka8k8s80gvx9604cn9am5st4")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/emails/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.emails.list',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const emailListResponse of client.emails.list()) {\n  console.log(emailListResponse.id);\n}",
      },
      java: {
        method: 'emails().list',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.emails.EmailListPage;\nimport com.nuntly.models.emails.EmailListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        EmailListPage page = client.emails().list();\n    }\n}',
      },
      go: {
        method: 'client.Emails.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Emails.List(context.TODO(), nuntly.EmailListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.nuntly.com/emails \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.emails.send',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.emails.send({\n  from: 'Tomlinson AI <ray@info.tomlinson.ai>',\n  subject: 'Verify your email address',\n  to: 'brian67@gmail.com',\n});\n\nconsole.log(response.id);",
      },
      java: {
        method: 'emails().send',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.emails.EmailSendParams;\nimport com.nuntly.models.emails.EmailSendResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        EmailSendParams params = EmailSendParams.builder()\n            .from("Tomlinson AI <ray@info.tomlinson.ai>")\n            .subject("Verify your email address")\n            .to("brian67@gmail.com")\n            .build();\n        EmailSendResponse response = client.emails().send(params);\n    }\n}',
      },
      go: {
        method: 'client.Emails.Send',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Emails.Send(context.TODO(), nuntly.EmailSendParams{\n\t\tFrom:    "Tomlinson AI <ray@info.tomlinson.ai>",\n\t\tSubject: "Verify your email address",\n\t\tTo: nuntly.EmailSendParamsToUnion{\n\t\t\tOfString: nuntly.String("brian67@gmail.com"),\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/emails \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY" \\\n    --retry 0 \\\n    --max-time 0.15 \\\n    -d \'{\n          "from": "Tomlinson AI <ray@info.tomlinson.ai>",\n          "subject": "Verify your email address",\n          "to": "brian67@gmail.com"\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.emails.bulk.send',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.emails.bulk.send({ emails: [{}] });\n\nconsole.log(response.id);",
      },
      java: {
        method: 'emails().bulk().send',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.emails.bulk.BulkSendParams;\nimport com.nuntly.models.emails.bulk.BulkSendResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        BulkSendParams params = BulkSendParams.builder()\n            .addEmail(BulkSendParams.Email.builder().build())\n            .build();\n        BulkSendResponse response = client.emails().bulk().send(params);\n    }\n}',
      },
      go: {
        method: 'client.Emails.Bulk.Send',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Emails.Bulk.Send(context.TODO(), nuntly.EmailBulkSendParams{\n\t\tEmails: []nuntly.EmailBulkSendParamsEmail{{}},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/emails/bulk \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY" \\\n    -d \'{\n          "emails": [\n            {}\n          ]\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.emails.bulk.retrieve',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst bulk = await client.emails.bulk.retrieve('blk_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(bulk.id);",
      },
      java: {
        method: 'emails().bulk().retrieve',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.emails.bulk.BulkRetrieveParams;\nimport com.nuntly.models.emails.bulk.BulkRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        BulkRetrieveResponse bulk = client.emails().bulk().retrieve("blk_01ka8k8s80gvx9604cn9am5st4");\n    }\n}',
      },
      go: {
        method: 'client.Emails.Bulk.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tbulk, err := client.Emails.Bulk.Get(context.TODO(), "blk_01ka8k8s80gvx9604cn9am5st4")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", bulk.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/emails/bulk/$BULK_ID \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.emails.events.list',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst events = await client.emails.events.list('em_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(events);",
      },
      java: {
        method: 'emails().events().list',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.emails.events.EventListParams;\nimport com.nuntly.models.emails.events.EventListResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        List<EventListResponse> events = client.emails().events().list("em_01ka8k8s80gvx9604cn9am5st4");\n    }\n}',
      },
      go: {
        method: 'client.Emails.Events.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tevents, err := client.Emails.Events.List(context.TODO(), "em_01ka8k8s80gvx9604cn9am5st4")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", events)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/emails/$ID/events \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.emails.content.retrieve',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst content = await client.emails.content.retrieve('em_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(content.html);",
      },
      java: {
        method: 'emails().content().retrieve',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.emails.content.ContentRetrieveParams;\nimport com.nuntly.models.emails.content.ContentRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        ContentRetrieveResponse content = client.emails().content().retrieve("em_01ka8k8s80gvx9604cn9am5st4");\n    }\n}',
      },
      go: {
        method: 'client.Emails.Content.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcontent, err := client.Emails.Content.Get(context.TODO(), "em_01ka8k8s80gvx9604cn9am5st4")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", content.HTML)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/emails/$ID/content \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.emails.stats.list',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst stats = await client.emails.stats.list();\n\nconsole.log(stats.end);",
      },
      java: {
        method: 'emails().stats().list',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.emails.stats.StatListParams;\nimport com.nuntly.models.emails.stats.StatListResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        StatListResponse stats = client.emails().stats().list();\n    }\n}',
      },
      go: {
        method: 'client.Emails.Stats.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tstats, err := client.Emails.Stats.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", stats.End)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/emails/stats \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.namespaces.create',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst namespace = await client.namespaces.create({ name: 'x' });\n\nconsole.log(namespace.id);",
      },
      java: {
        method: 'namespaces().create',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.namespaces.Namespace;\nimport com.nuntly.models.namespaces.NamespaceCreateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        NamespaceCreateParams params = NamespaceCreateParams.builder()\n            .name("x")\n            .build();\n        Namespace namespace = client.namespaces().create(params);\n    }\n}',
      },
      go: {
        method: 'client.Namespaces.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tnamespace, err := client.Namespaces.New(context.TODO(), nuntly.NamespaceNewParams{\n\t\tName: "x",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", namespace.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/namespaces \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY" \\\n    -d \'{\n          "name": "x"\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.namespaces.list',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const namespace of client.namespaces.list()) {\n  console.log(namespace.id);\n}",
      },
      java: {
        method: 'namespaces().list',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.namespaces.NamespaceListPage;\nimport com.nuntly.models.namespaces.NamespaceListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        NamespaceListPage page = client.namespaces().list();\n    }\n}',
      },
      go: {
        method: 'client.Namespaces.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Namespaces.List(context.TODO(), nuntly.NamespaceListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.nuntly.com/namespaces \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.namespaces.retrieve',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst namespaceDetail = await client.namespaces.retrieve('ns_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(namespaceDetail.id);",
      },
      java: {
        method: 'namespaces().retrieve',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.namespaces.NamespaceDetail;\nimport com.nuntly.models.namespaces.NamespaceRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        NamespaceDetail namespaceDetail = client.namespaces().retrieve("ns_01kabn43yqyxn2bx4ve84mczd3");\n    }\n}',
      },
      go: {
        method: 'client.Namespaces.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tnamespaceDetail, err := client.Namespaces.Get(context.TODO(), "ns_01kabn43yqyxn2bx4ve84mczd3")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", namespaceDetail.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/namespaces/$NAMESPACE_ID \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.namespaces.update',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst namespace = await client.namespaces.update('ns_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(namespace.id);",
      },
      java: {
        method: 'namespaces().update',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.namespaces.NamespaceUpdateParams;\nimport com.nuntly.models.namespaces.NamespaceUpdateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        NamespaceUpdateResponse namespace = client.namespaces().update("ns_01kabn43yqyxn2bx4ve84mczd3");\n    }\n}',
      },
      go: {
        method: 'client.Namespaces.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tnamespace, err := client.Namespaces.Update(\n\t\tcontext.TODO(),\n\t\t"ns_01kabn43yqyxn2bx4ve84mczd3",\n\t\tnuntly.NamespaceUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", namespace.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/namespaces/$NAMESPACE_ID \\\n    -X PATCH \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.namespaces.delete',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst namespace = await client.namespaces.delete('ns_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(namespace.id);",
      },
      java: {
        method: 'namespaces().delete',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.namespaces.NamespaceDeleteParams;\nimport com.nuntly.models.namespaces.NamespaceDeleteResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        NamespaceDeleteResponse namespace = client.namespaces().delete("ns_01kabn43yqyxn2bx4ve84mczd3");\n    }\n}',
      },
      go: {
        method: 'client.Namespaces.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tnamespace, err := client.Namespaces.Delete(context.TODO(), "ns_01kabn43yqyxn2bx4ve84mczd3")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", namespace.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/namespaces/$NAMESPACE_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.namespaces.inboxes.list',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const inbox of client.namespaces.inboxes.list('ns_01kabn43yqyxn2bx4ve84mczd3')) {\n  console.log(inbox.id);\n}",
      },
      java: {
        method: 'namespaces().inboxes().list',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.namespaces.inboxes.InboxListPage;\nimport com.nuntly.models.namespaces.inboxes.InboxListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        InboxListPage page = client.namespaces().inboxes().list("ns_01kabn43yqyxn2bx4ve84mczd3");\n    }\n}',
      },
      go: {
        method: 'client.Namespaces.Inboxes.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Namespaces.Inboxes.List(\n\t\tcontext.TODO(),\n\t\t"ns_01kabn43yqyxn2bx4ve84mczd3",\n\t\tnuntly.NamespaceInboxListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/namespaces/$NAMESPACE_ID/inboxes \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.inboxes.create',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst inbox = await client.inboxes.create({ address: 'x' });\n\nconsole.log(inbox.id);",
      },
      java: {
        method: 'inboxes().create',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.inboxes.Inbox;\nimport com.nuntly.models.inboxes.InboxCreateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        InboxCreateParams params = InboxCreateParams.builder()\n            .address("x")\n            .build();\n        Inbox inbox = client.inboxes().create(params);\n    }\n}',
      },
      go: {
        method: 'client.Inboxes.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tinbox, err := client.Inboxes.New(context.TODO(), nuntly.InboxNewParams{\n\t\tAddress: "x",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", inbox.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/inboxes \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY" \\\n    -d \'{\n          "address": "x"\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.inboxes.list',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const inbox of client.inboxes.list()) {\n  console.log(inbox.id);\n}",
      },
      java: {
        method: 'inboxes().list',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.inboxes.InboxListPage;\nimport com.nuntly.models.inboxes.InboxListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        InboxListPage page = client.inboxes().list();\n    }\n}',
      },
      go: {
        method: 'client.Inboxes.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Inboxes.List(context.TODO(), nuntly.InboxListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.nuntly.com/inboxes \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.inboxes.retrieve',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst inbox = await client.inboxes.retrieve('ibx_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(inbox.id);",
      },
      java: {
        method: 'inboxes().retrieve',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.inboxes.Inbox;\nimport com.nuntly.models.inboxes.InboxRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        Inbox inbox = client.inboxes().retrieve("ibx_01kabn43yqyxn2bx4ve84mczd3");\n    }\n}',
      },
      go: {
        method: 'client.Inboxes.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tinbox, err := client.Inboxes.Get(context.TODO(), "ibx_01kabn43yqyxn2bx4ve84mczd3")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", inbox.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/inboxes/$INBOX_ID \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.inboxes.update',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst inbox = await client.inboxes.update('ibx_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(inbox.id);",
      },
      java: {
        method: 'inboxes().update',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.inboxes.InboxUpdateParams;\nimport com.nuntly.models.inboxes.InboxUpdateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        InboxUpdateResponse inbox = client.inboxes().update("ibx_01kabn43yqyxn2bx4ve84mczd3");\n    }\n}',
      },
      go: {
        method: 'client.Inboxes.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tinbox, err := client.Inboxes.Update(\n\t\tcontext.TODO(),\n\t\t"ibx_01kabn43yqyxn2bx4ve84mczd3",\n\t\tnuntly.InboxUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", inbox.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/inboxes/$INBOX_ID \\\n    -X PATCH \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.inboxes.delete',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst inbox = await client.inboxes.delete('ibx_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(inbox.id);",
      },
      java: {
        method: 'inboxes().delete',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.inboxes.InboxDeleteParams;\nimport com.nuntly.models.inboxes.InboxDeleteResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        InboxDeleteResponse inbox = client.inboxes().delete("ibx_01kabn43yqyxn2bx4ve84mczd3");\n    }\n}',
      },
      go: {
        method: 'client.Inboxes.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tinbox, err := client.Inboxes.Delete(context.TODO(), "ibx_01kabn43yqyxn2bx4ve84mczd3")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", inbox.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/inboxes/$INBOX_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.inboxes.send',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.inboxes.send('ibx_01kabn43yqyxn2bx4ve84mczd3', {\n  subject: 'x',\n  to: ['dev@stainless.com'],\n});\n\nconsole.log(response.id);",
      },
      java: {
        method: 'inboxes().send',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.inboxes.InboxSendParams;\nimport com.nuntly.models.inboxes.InboxSendResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        InboxSendParams params = InboxSendParams.builder()\n            .inboxId("ibx_01kabn43yqyxn2bx4ve84mczd3")\n            .subject("x")\n            .addTo("dev@stainless.com")\n            .build();\n        InboxSendResponse response = client.inboxes().send(params);\n    }\n}',
      },
      go: {
        method: 'client.Inboxes.Send',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Inboxes.Send(\n\t\tcontext.TODO(),\n\t\t"ibx_01kabn43yqyxn2bx4ve84mczd3",\n\t\tnuntly.InboxSendParams{\n\t\t\tSubject: "x",\n\t\t\tTo:      []string{"dev@stainless.com"},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/inboxes/$INBOX_ID/messages \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY" \\\n    -d \'{\n          "subject": "x",\n          "to": [\n            "dev@stainless.com"\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/inboxes/{inboxId}/threads',
    httpMethod: 'get',
    summary: 'List Threads',
    description: 'List threads in an inbox.',
    stainlessPath: '(resource) inboxes.threads > (method) list',
    qualified: 'client.inboxes.threads.list',
    params: ['inboxId: string;', 'cursor?: string;', 'labels?: string;', 'limit?: number;'],
    response:
      '{ id: string; agentId: string; createdAt: string; domainId: string; domainName: string; inboxId: string; labels: string[]; lastMessageAt: string; messageCount: number; subject: string; updatedAt?: string; }',
    markdown:
      "## list\n\n`client.inboxes.threads.list(inboxId: string, cursor?: string, labels?: string, limit?: number): { id: string; agentId: string; createdAt: string; domainId: string; domainName: string; inboxId: string; labels: string[]; lastMessageAt: string; messageCount: number; subject: string; updatedAt?: string; }`\n\n**get** `/inboxes/{inboxId}/threads`\n\nList threads in an inbox.\n\n### Parameters\n\n- `inboxId: string`\n\n- `cursor?: string`\n  The cursor to retrieve the next page of results\n\n- `labels?: string`\n  Comma-separated labels to filter by (AND logic). Threads with spam/trash are excluded by default unless explicitly requested via ?labels=spam or ?labels=trash.\n\n- `limit?: number`\n  The maximum number of results to return\n\n### Returns\n\n- `{ id: string; agentId: string; createdAt: string; domainId: string; domainName: string; inboxId: string; labels: string[]; lastMessageAt: string; messageCount: number; subject: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `agentId: string`\n  - `createdAt: string`\n  - `domainId: string`\n  - `domainName: string`\n  - `inboxId: string`\n  - `labels: string[]`\n  - `lastMessageAt: string`\n  - `messageCount: number`\n  - `subject: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\n// Automatically fetches more pages as needed.\nfor await (const thread of client.inboxes.threads.list('ibx_01kabn43yqyxn2bx4ve84mczd3')) {\n  console.log(thread);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.inboxes.threads.list',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const thread of client.inboxes.threads.list('ibx_01kabn43yqyxn2bx4ve84mczd3')) {\n  console.log(thread.id);\n}",
      },
      java: {
        method: 'inboxes().threads().list',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.inboxes.threads.ThreadListPage;\nimport com.nuntly.models.inboxes.threads.ThreadListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        ThreadListPage page = client.inboxes().threads().list("ibx_01kabn43yqyxn2bx4ve84mczd3");\n    }\n}',
      },
      go: {
        method: 'client.Inboxes.Threads.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Inboxes.Threads.List(\n\t\tcontext.TODO(),\n\t\t"ibx_01kabn43yqyxn2bx4ve84mczd3",\n\t\tnuntly.InboxThreadListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/inboxes/$INBOX_ID/threads \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/threads/{threadId}',
    httpMethod: 'get',
    summary: 'Retrieve Thread',
    description:
      'Retrieve a thread. Pass ?markRead=true to automatically remove the unread label from all messages.',
    stainlessPath: '(resource) threads > (method) retrieve',
    qualified: 'client.threads.retrieve',
    params: ['threadId: string;', 'markRead?: string;'],
    response:
      '{ id: string; agentId: string; createdAt: string; domainId: string; domainName: string; inboxId: string; labels: string[]; lastMessageAt: string; messageCount: number; subject: string; updatedAt?: string; }',
    markdown:
      "## retrieve\n\n`client.threads.retrieve(threadId: string, markRead?: string): { id: string; agentId: string; createdAt: string; domainId: string; domainName: string; inboxId: string; labels: string[]; lastMessageAt: string; messageCount: number; subject: string; updatedAt?: string; }`\n\n**get** `/threads/{threadId}`\n\nRetrieve a thread. Pass ?markRead=true to automatically remove the unread label from all messages.\n\n### Parameters\n\n- `threadId: string`\n\n- `markRead?: string`\n  Set to \"true\" to automatically remove the unread label from all messages in the thread.\n\n### Returns\n\n- `{ id: string; agentId: string; createdAt: string; domainId: string; domainName: string; inboxId: string; labels: string[]; lastMessageAt: string; messageCount: number; subject: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `agentId: string`\n  - `createdAt: string`\n  - `domainId: string`\n  - `domainName: string`\n  - `inboxId: string`\n  - `labels: string[]`\n  - `lastMessageAt: string`\n  - `messageCount: number`\n  - `subject: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst thread = await client.threads.retrieve('thr_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(thread);\n```",
    perLanguage: {
      typescript: {
        method: 'client.threads.retrieve',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst thread = await client.threads.retrieve('thr_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(thread.id);",
      },
      java: {
        method: 'threads().retrieve',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.threads.Thread;\nimport com.nuntly.models.threads.ThreadRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        Thread thread = client.threads().retrieve("thr_01kabn43yqyxn2bx4ve84mczd3");\n    }\n}',
      },
      go: {
        method: 'client.Threads.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tthread, err := client.Threads.Get(\n\t\tcontext.TODO(),\n\t\t"thr_01kabn43yqyxn2bx4ve84mczd3",\n\t\tnuntly.ThreadGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", thread.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/threads/$THREAD_ID \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/threads/{threadId}',
    httpMethod: 'patch',
    summary: 'Update Thread',
    description:
      'Update thread labels and agent assignment. Label operations apply to all messages in the thread.',
    stainlessPath: '(resource) threads > (method) update',
    qualified: 'client.threads.update',
    params: ['threadId: string;', 'addLabels?: string[];', 'agentId?: string;', 'removeLabels?: string[];'],
    response: '{ id: string; }',
    markdown:
      "## update\n\n`client.threads.update(threadId: string, addLabels?: string[], agentId?: string, removeLabels?: string[]): { id: string; }`\n\n**patch** `/threads/{threadId}`\n\nUpdate thread labels and agent assignment. Label operations apply to all messages in the thread.\n\n### Parameters\n\n- `threadId: string`\n\n- `addLabels?: string[]`\n  Labels to add to all messages in the thread.\n\n- `agentId?: string`\n  The AI agent identifier.\n\n- `removeLabels?: string[]`\n  Labels to remove from all messages in the thread.\n\n### Returns\n\n- `{ id: string; }`\n\n  - `id: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst thread = await client.threads.update('thr_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(thread);\n```",
    perLanguage: {
      typescript: {
        method: 'client.threads.update',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst thread = await client.threads.update('thr_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(thread.id);",
      },
      java: {
        method: 'threads().update',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.threads.ThreadUpdateParams;\nimport com.nuntly.models.threads.ThreadUpdateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        ThreadUpdateResponse thread = client.threads().update("thr_01kabn43yqyxn2bx4ve84mczd3");\n    }\n}',
      },
      go: {
        method: 'client.Threads.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tthread, err := client.Threads.Update(\n\t\tcontext.TODO(),\n\t\t"thr_01kabn43yqyxn2bx4ve84mczd3",\n\t\tnuntly.ThreadUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", thread.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/threads/$THREAD_ID \\\n    -X PATCH \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
      "{ id: string; attachmentCount: number; bcc: string[]; cc: string[]; createdAt: string; from: string; labels: string[]; messageId: string; receivedAt: string; replyTo: string[]; status: 'received' | 'sent' | 'discarded' | 'failed'; subject: string; threadId: string; to: string[]; }",
    markdown:
      "## list\n\n`client.threads.messages.list(threadId: string, cursor?: string, limit?: number): { id: string; attachmentCount: number; bcc: string[]; cc: string[]; createdAt: string; from: string; labels: string[]; messageId: string; receivedAt: string; replyTo: string[]; status: 'received' | 'sent' | 'discarded' | 'failed'; subject: string; threadId: string; to: string[]; }`\n\n**get** `/threads/{threadId}/messages`\n\nList messages in a thread (chronological order).\n\n### Parameters\n\n- `threadId: string`\n\n- `cursor?: string`\n  The cursor to retrieve the next page of results\n\n- `limit?: number`\n  The maximum number of results to return\n\n### Returns\n\n- `{ id: string; attachmentCount: number; bcc: string[]; cc: string[]; createdAt: string; from: string; labels: string[]; messageId: string; receivedAt: string; replyTo: string[]; status: 'received' | 'sent' | 'discarded' | 'failed'; subject: string; threadId: string; to: string[]; }`\n\n  - `id: string`\n  - `attachmentCount: number`\n  - `bcc: string[]`\n  - `cc: string[]`\n  - `createdAt: string`\n  - `from: string`\n  - `labels: string[]`\n  - `messageId: string`\n  - `receivedAt: string`\n  - `replyTo: string[]`\n  - `status: 'received' | 'sent' | 'discarded' | 'failed'`\n  - `subject: string`\n  - `threadId: string`\n  - `to: string[]`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\n// Automatically fetches more pages as needed.\nfor await (const messageListResponse of client.threads.messages.list('thr_01kabn43yqyxn2bx4ve84mczd3')) {\n  console.log(messageListResponse);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.threads.messages.list',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const messageListResponse of client.threads.messages.list(\n  'thr_01kabn43yqyxn2bx4ve84mczd3',\n)) {\n  console.log(messageListResponse.id);\n}",
      },
      java: {
        method: 'threads().messages().list',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.threads.messages.MessageListPage;\nimport com.nuntly.models.threads.messages.MessageListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        MessageListPage page = client.threads().messages().list("thr_01kabn43yqyxn2bx4ve84mczd3");\n    }\n}',
      },
      go: {
        method: 'client.Threads.Messages.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Threads.Messages.List(\n\t\tcontext.TODO(),\n\t\t"thr_01kabn43yqyxn2bx4ve84mczd3",\n\t\tnuntly.ThreadMessageListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/threads/$THREAD_ID/messages \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
      "{ id: string; attachmentCount: number; bcc: string[]; cc: string[]; createdAt: string; from: string; inboxId: string; labels: string[]; messageId: string; receivedAt: string; replyTo: string[]; status: 'received' | 'sent' | 'discarded' | 'failed'; subject: string; threadId: string; to: string[]; }",
    markdown:
      "## list\n\n`client.messages.list(cursor?: string, domainId?: string, from?: string, limit?: number): { id: string; attachmentCount: number; bcc: string[]; cc: string[]; createdAt: string; from: string; inboxId: string; labels: string[]; messageId: string; receivedAt: string; replyTo: string[]; status: 'received' | 'sent' | 'discarded' | 'failed'; subject: string; threadId: string; to: string[]; }`\n\n**get** `/messages`\n\nList all received messages across inboxes.\n\n### Parameters\n\n- `cursor?: string`\n  The cursor to retrieve the next page of results\n\n- `domainId?: string`\n  Filter by domain.\n\n- `from?: string`\n  Filter by sender address.\n\n- `limit?: number`\n  The maximum number of results to return\n\n### Returns\n\n- `{ id: string; attachmentCount: number; bcc: string[]; cc: string[]; createdAt: string; from: string; inboxId: string; labels: string[]; messageId: string; receivedAt: string; replyTo: string[]; status: 'received' | 'sent' | 'discarded' | 'failed'; subject: string; threadId: string; to: string[]; }`\n\n  - `id: string`\n  - `attachmentCount: number`\n  - `bcc: string[]`\n  - `cc: string[]`\n  - `createdAt: string`\n  - `from: string`\n  - `inboxId: string`\n  - `labels: string[]`\n  - `messageId: string`\n  - `receivedAt: string`\n  - `replyTo: string[]`\n  - `status: 'received' | 'sent' | 'discarded' | 'failed'`\n  - `subject: string`\n  - `threadId: string`\n  - `to: string[]`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\n// Automatically fetches more pages as needed.\nfor await (const message of client.messages.list()) {\n  console.log(message);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.messages.list',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const message of client.messages.list()) {\n  console.log(message.id);\n}",
      },
      java: {
        method: 'messages().list',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.messages.MessageListPage;\nimport com.nuntly.models.messages.MessageListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        MessageListPage page = client.messages().list();\n    }\n}',
      },
      go: {
        method: 'client.Messages.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Messages.List(context.TODO(), nuntly.MessageListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.nuntly.com/messages \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
      "{ id: string; attachmentCount: number; bcc: string[]; cc: string[]; createdAt: string; from: string; headers: object; inboxId: string; labels: string[]; messageId: string; receivedAt: string; replyTo: string[]; status: 'received' | 'sent' | 'discarded' | 'failed'; subject: string; threadId: string; to: string[]; }",
    markdown:
      "## retrieve\n\n`client.messages.retrieve(messageId: string): { id: string; attachmentCount: number; bcc: string[]; cc: string[]; createdAt: string; from: string; headers: object; inboxId: string; labels: string[]; messageId: string; receivedAt: string; replyTo: string[]; status: 'received' | 'sent' | 'discarded' | 'failed'; subject: string; threadId: string; to: string[]; }`\n\n**get** `/messages/{messageId}`\n\nRetrieve a single message with inbox enrichment.\n\n### Parameters\n\n- `messageId: string`\n\n### Returns\n\n- `{ id: string; attachmentCount: number; bcc: string[]; cc: string[]; createdAt: string; from: string; headers: object; inboxId: string; labels: string[]; messageId: string; receivedAt: string; replyTo: string[]; status: 'received' | 'sent' | 'discarded' | 'failed'; subject: string; threadId: string; to: string[]; }`\n\n  - `id: string`\n  - `attachmentCount: number`\n  - `bcc: string[]`\n  - `cc: string[]`\n  - `createdAt: string`\n  - `from: string`\n  - `headers: object`\n  - `inboxId: string`\n  - `labels: string[]`\n  - `messageId: string`\n  - `receivedAt: string`\n  - `replyTo: string[]`\n  - `status: 'received' | 'sent' | 'discarded' | 'failed'`\n  - `subject: string`\n  - `threadId: string`\n  - `to: string[]`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst messageDetail = await client.messages.retrieve('imsg_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(messageDetail);\n```",
    perLanguage: {
      typescript: {
        method: 'client.messages.retrieve',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst messageDetail = await client.messages.retrieve('imsg_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(messageDetail.id);",
      },
      java: {
        method: 'messages().retrieve',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.messages.MessageDetail;\nimport com.nuntly.models.messages.MessageRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        MessageDetail messageDetail = client.messages().retrieve("imsg_01kabn43yqyxn2bx4ve84mczd3");\n    }\n}',
      },
      go: {
        method: 'client.Messages.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmessageDetail, err := client.Messages.Get(context.TODO(), "imsg_01kabn43yqyxn2bx4ve84mczd3")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", messageDetail.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/messages/$MESSAGE_ID \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/messages/{messageId}',
    httpMethod: 'patch',
    summary: 'Update Message',
    description: 'Update message labels. Only available for messages in user-created inboxes.',
    stainlessPath: '(resource) messages > (method) update',
    qualified: 'client.messages.update',
    params: ['messageId: string;', 'addLabels?: string[];', 'removeLabels?: string[];'],
    response: '{ id: string; }',
    markdown:
      "## update\n\n`client.messages.update(messageId: string, addLabels?: string[], removeLabels?: string[]): { id: string; }`\n\n**patch** `/messages/{messageId}`\n\nUpdate message labels. Only available for messages in user-created inboxes.\n\n### Parameters\n\n- `messageId: string`\n\n- `addLabels?: string[]`\n  Labels to add to the message.\n\n- `removeLabels?: string[]`\n  Labels to remove from the message.\n\n### Returns\n\n- `{ id: string; }`\n\n  - `id: string`\n\n### Example\n\n```typescript\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly();\n\nconst message = await client.messages.update('imsg_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(message);\n```",
    perLanguage: {
      typescript: {
        method: 'client.messages.update',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst message = await client.messages.update('imsg_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(message.id);",
      },
      java: {
        method: 'messages().update',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.messages.MessageUpdateParams;\nimport com.nuntly.models.messages.MessageUpdateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        MessageUpdateResponse message = client.messages().update("imsg_01kabn43yqyxn2bx4ve84mczd3");\n    }\n}',
      },
      go: {
        method: 'client.Messages.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmessage, err := client.Messages.Update(\n\t\tcontext.TODO(),\n\t\t"imsg_01kabn43yqyxn2bx4ve84mczd3",\n\t\tnuntly.MessageUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", message.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/messages/$MESSAGE_ID \\\n    -X PATCH \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.messages.reply',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.messages.reply('imsg_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(response.id);",
      },
      java: {
        method: 'messages().reply',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.messages.MessageReplyParams;\nimport com.nuntly.models.messages.MessageReplyResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        MessageReplyResponse response = client.messages().reply("imsg_01kabn43yqyxn2bx4ve84mczd3");\n    }\n}',
      },
      go: {
        method: 'client.Messages.Reply',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Messages.Reply(\n\t\tcontext.TODO(),\n\t\t"imsg_01kabn43yqyxn2bx4ve84mczd3",\n\t\tnuntly.MessageReplyParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/messages/$MESSAGE_ID/reply \\\n    -X POST \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.messages.forward',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.messages.forward('imsg_01kabn43yqyxn2bx4ve84mczd3', {\n  to: ['dev@stainless.com'],\n});\n\nconsole.log(response.id);",
      },
      java: {
        method: 'messages().forward',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.messages.MessageForwardParams;\nimport com.nuntly.models.messages.MessageForwardResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        MessageForwardParams params = MessageForwardParams.builder()\n            .messageId("imsg_01kabn43yqyxn2bx4ve84mczd3")\n            .addTo("dev@stainless.com")\n            .build();\n        MessageForwardResponse response = client.messages().forward(params);\n    }\n}',
      },
      go: {
        method: 'client.Messages.Forward',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Messages.Forward(\n\t\tcontext.TODO(),\n\t\t"imsg_01kabn43yqyxn2bx4ve84mczd3",\n\t\tnuntly.MessageForwardParams{\n\t\t\tTo: []string{"dev@stainless.com"},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/messages/$MESSAGE_ID/forward \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY" \\\n    -d \'{\n          "to": [\n            "dev@stainless.com"\n          ]\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.messages.content.retrieve',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst messageContent = await client.messages.content.retrieve('imsg_01kabn43yqyxn2bx4ve84mczd3');\n\nconsole.log(messageContent.html);",
      },
      java: {
        method: 'messages().content().retrieve',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.messages.MessageContent;\nimport com.nuntly.models.messages.content.ContentRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        MessageContent messageContent = client.messages().content().retrieve("imsg_01kabn43yqyxn2bx4ve84mczd3");\n    }\n}',
      },
      go: {
        method: 'client.Messages.Content.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmessageContent, err := client.Messages.Content.Get(\n\t\tcontext.TODO(),\n\t\t"imsg_01kabn43yqyxn2bx4ve84mczd3",\n\t\tnuntly.MessageContentGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", messageContent.HTML)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/messages/$MESSAGE_ID/content \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.messages.attachments.list',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst messageAttachments = await client.messages.attachments.list(\n  'imsg_01kabn43yqyxn2bx4ve84mczd3',\n);\n\nconsole.log(messageAttachments);",
      },
      java: {
        method: 'messages().attachments().list',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.messages.MessageAttachment;\nimport com.nuntly.models.messages.attachments.AttachmentListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        List<MessageAttachment> messageAttachments = client.messages().attachments().list("imsg_01kabn43yqyxn2bx4ve84mczd3");\n    }\n}',
      },
      go: {
        method: 'client.Messages.Attachments.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmessageAttachments, err := client.Messages.Attachments.List(context.TODO(), "imsg_01kabn43yqyxn2bx4ve84mczd3")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", messageAttachments)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/messages/$MESSAGE_ID/attachments \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.messages.attachments.retrieve',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst messageAttachment = await client.messages.attachments.retrieve(\n  'iatt_01kabn43yqyxn2bx4ve84mczd3',\n  { messageId: 'imsg_01kabn43yqyxn2bx4ve84mczd3' },\n);\n\nconsole.log(messageAttachment.id);",
      },
      java: {
        method: 'messages().attachments().retrieve',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.messages.MessageAttachment;\nimport com.nuntly.models.messages.attachments.AttachmentRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        AttachmentRetrieveParams params = AttachmentRetrieveParams.builder()\n            .messageId("imsg_01kabn43yqyxn2bx4ve84mczd3")\n            .attachmentId("iatt_01kabn43yqyxn2bx4ve84mczd3")\n            .build();\n        MessageAttachment messageAttachment = client.messages().attachments().retrieve(params);\n    }\n}',
      },
      go: {
        method: 'client.Messages.Attachments.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmessageAttachment, err := client.Messages.Attachments.Get(\n\t\tcontext.TODO(),\n\t\t"iatt_01kabn43yqyxn2bx4ve84mczd3",\n\t\tnuntly.MessageAttachmentGetParams{\n\t\t\tMessageID: "imsg_01kabn43yqyxn2bx4ve84mczd3",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", messageAttachment.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/messages/$MESSAGE_ID/attachments/$ATTACHMENT_ID \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.agents.memory.retrieve',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst agentMemory = await client.agents.memory.retrieve('x');\n\nconsole.log(agentMemory.id);",
      },
      java: {
        method: 'agents().memory().retrieve',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.agents.AgentMemory;\nimport com.nuntly.models.agents.memory.MemoryRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        AgentMemory agentMemory = client.agents().memory().retrieve("x");\n    }\n}',
      },
      go: {
        method: 'client.Agents.Memory.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tagentMemory, err := client.Agents.Memory.Get(\n\t\tcontext.TODO(),\n\t\t"x",\n\t\tnuntly.AgentMemoryGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", agentMemory.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/agents/$AGENT_ID/memory \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.agents.memory.upsert',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst agentMemory = await client.agents.memory.upsert('x', { memory: { foo: 'string' } });\n\nconsole.log(agentMemory.id);",
      },
      java: {
        method: 'agents().memory().upsert',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.core.JsonValue;\nimport com.nuntly.models.agents.AgentMemory;\nimport com.nuntly.models.agents.memory.MemoryUpsertParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        MemoryUpsertParams params = MemoryUpsertParams.builder()\n            .agentId("x")\n            .memory(MemoryUpsertParams.Memory.builder()\n                .putAdditionalProperty("foo", JsonValue.from("string"))\n                .build())\n            .build();\n        AgentMemory agentMemory = client.agents().memory().upsert(params);\n    }\n}',
      },
      go: {
        method: 'client.Agents.Memory.Upsert',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tagentMemory, err := client.Agents.Memory.Upsert(\n\t\tcontext.TODO(),\n\t\t"x",\n\t\tnuntly.AgentMemoryUpsertParams{\n\t\t\tMemory: map[string]nuntly.AgentMemoryUpsertParamsMemoryUnion{\n\t\t\t\t"foo": {\n\t\t\t\t\tOfString: nuntly.String("string"),\n\t\t\t\t},\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", agentMemory.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/agents/$AGENT_ID/memory \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY" \\\n    -d \'{\n          "memory": {\n            "foo": "string"\n          }\n        }\'',
      },
    },
  },
  {
    name: 'unwrap',
    endpoint: '',
    httpMethod: '',
    summary: '',
    description: '',
    stainlessPath: '(resource) webhooks > (method) unwrap',
    qualified: 'client.webhooks.unwrap',
    perLanguage: {
      typescript: {
        method: 'client.webhooks.unwrap',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.webhooks.unwrap();",
      },
      java: {
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.webhooks.WebhookUnwrapParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        client.webhooks().unwrap();\n    }\n}',
      },
      go: {
        method: 'client.Webhooks.Unwrap',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Webhooks.Unwrap(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.webhooks.retrieve',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhook = await client.webhooks.retrieve('wh_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(webhook.id);",
      },
      java: {
        method: 'webhooks().retrieve',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.webhooks.WebhookRetrieveParams;\nimport com.nuntly.models.webhooks.WebhookRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        WebhookRetrieveResponse webhook = client.webhooks().retrieve("wh_01ka8k8s80gvx9604cn9am5st4");\n    }\n}',
      },
      go: {
        method: 'client.Webhooks.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhook, err := client.Webhooks.Get(context.TODO(), "wh_01ka8k8s80gvx9604cn9am5st4")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhook.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/webhooks/$ID \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.webhooks.update',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhook = await client.webhooks.update('wh_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(webhook.id);",
      },
      java: {
        method: 'webhooks().update',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.webhooks.WebhookUpdateParams;\nimport com.nuntly.models.webhooks.WebhookUpdateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        WebhookUpdateResponse webhook = client.webhooks().update("wh_01ka8k8s80gvx9604cn9am5st4");\n    }\n}',
      },
      go: {
        method: 'client.Webhooks.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhook, err := client.Webhooks.Update(\n\t\tcontext.TODO(),\n\t\t"wh_01ka8k8s80gvx9604cn9am5st4",\n\t\tnuntly.WebhookUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhook.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/webhooks/$ID \\\n    -X PUT \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.webhooks.delete',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhook = await client.webhooks.delete('wh_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(webhook.id);",
      },
      java: {
        method: 'webhooks().delete',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.webhooks.WebhookDeleteParams;\nimport com.nuntly.models.webhooks.WebhookDeleteResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        WebhookDeleteResponse webhook = client.webhooks().delete("wh_01ka8k8s80gvx9604cn9am5st4");\n    }\n}',
      },
      go: {
        method: 'client.Webhooks.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhook, err := client.Webhooks.Delete(context.TODO(), "wh_01ka8k8s80gvx9604cn9am5st4")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhook.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/webhooks/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.webhooks.create',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhook = await client.webhooks.create({\n  endpointUrl: 'https://example.com',\n  events: ['email.queued'],\n});\n\nconsole.log(webhook.id);",
      },
      java: {
        method: 'webhooks().create',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.shared.EventType;\nimport com.nuntly.models.webhooks.WebhookCreateParams;\nimport com.nuntly.models.webhooks.WebhookCreateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        WebhookCreateParams params = WebhookCreateParams.builder()\n            .endpointUrl("https://example.com")\n            .addEvent(EventType.EMAIL_QUEUED)\n            .build();\n        WebhookCreateResponse webhook = client.webhooks().create(params);\n    }\n}',
      },
      go: {
        method: 'client.Webhooks.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhook, err := client.Webhooks.New(context.TODO(), nuntly.WebhookNewParams{\n\t\tEndpointURL: "https://example.com",\n\t\tEvents:      []nuntly.EventType{nuntly.EventTypeEmailQueued},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhook.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/webhooks \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY" \\\n    -d \'{\n          "endpointUrl": "https://example.com",\n          "events": [\n            "email.queued"\n          ]\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.webhooks.list',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const webhookListResponse of client.webhooks.list()) {\n  console.log(webhookListResponse.id);\n}",
      },
      java: {
        method: 'webhooks().list',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.webhooks.WebhookListPage;\nimport com.nuntly.models.webhooks.WebhookListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        WebhookListPage page = client.webhooks().list();\n    }\n}',
      },
      go: {
        method: 'client.Webhooks.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Webhooks.List(context.TODO(), nuntly.WebhookListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.nuntly.com/webhooks \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.webhooks.events.replay',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.webhooks.events.replay('evt_01ka8k8s80gvx9604cn9am5st4', {\n  id: 'wh_01ka8k8s80gvx9604cn9am5st4',\n});\n\nconsole.log(response);",
      },
      java: {
        method: 'webhooks().events().replay',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.webhooks.events.EventReplayParams;\nimport com.nuntly.models.webhooks.events.EventReplayResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        EventReplayParams params = EventReplayParams.builder()\n            .id("wh_01ka8k8s80gvx9604cn9am5st4")\n            .eventId("evt_01ka8k8s80gvx9604cn9am5st4")\n            .build();\n        EventReplayResponse response = client.webhooks().events().replay(params);\n    }\n}',
      },
      go: {
        method: 'client.Webhooks.Events.Replay',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Webhooks.Events.Replay(\n\t\tcontext.TODO(),\n\t\t"evt_01ka8k8s80gvx9604cn9am5st4",\n\t\tnuntly.WebhookEventReplayParams{\n\t\t\tID: "wh_01ka8k8s80gvx9604cn9am5st4",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/webhooks/$ID/events/$EVENT_ID/replay \\\n    -X POST \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.webhooks.events.deliveries',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.webhooks.events.deliveries('evt_01ka8k8s80gvx9604cn9am5st4', {\n  id: 'wh_01ka8k8s80gvx9604cn9am5st4',\n});\n\nconsole.log(response);",
      },
      java: {
        method: 'webhooks().events().deliveries',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.webhooks.events.EventDeliveriesParams;\nimport com.nuntly.models.webhooks.events.EventDeliveriesResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        EventDeliveriesParams params = EventDeliveriesParams.builder()\n            .id("wh_01ka8k8s80gvx9604cn9am5st4")\n            .eventId("evt_01ka8k8s80gvx9604cn9am5st4")\n            .build();\n        List<EventDeliveriesResponse> response = client.webhooks().events().deliveries(params);\n    }\n}',
      },
      go: {
        method: 'client.Webhooks.Events.Deliveries',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Webhooks.Events.Deliveries(\n\t\tcontext.TODO(),\n\t\t"evt_01ka8k8s80gvx9604cn9am5st4",\n\t\tnuntly.WebhookEventDeliveriesParams{\n\t\t\tID: "wh_01ka8k8s80gvx9604cn9am5st4",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/webhooks/$ID/events/$EVENT_ID/deliveries \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.webhooks.events.list',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const eventListResponse of client.webhooks.events.list()) {\n  console.log(eventListResponse.id);\n}",
      },
      java: {
        method: 'webhooks().events().list',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.webhooks.events.EventListPage;\nimport com.nuntly.models.webhooks.events.EventListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        EventListPage page = client.webhooks().events().list();\n    }\n}',
      },
      go: {
        method: 'client.Webhooks.Events.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Webhooks.Events.List(context.TODO(), nuntly.WebhookEventListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/webhooks/events \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.organizations.list',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const organizationListResponse of client.organizations.list()) {\n  console.log(organizationListResponse.id);\n}",
      },
      java: {
        method: 'organizations().list',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.organizations.OrganizationListPage;\nimport com.nuntly.models.organizations.OrganizationListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        OrganizationListPage page = client.organizations().list();\n    }\n}',
      },
      go: {
        method: 'client.Organizations.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Organizations.List(context.TODO(), nuntly.OrganizationListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/organizations \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.organizations.retrieve',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst organization = await client.organizations.retrieve('org_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(organization.id);",
      },
      java: {
        method: 'organizations().retrieve',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.organizations.OrganizationRetrieveParams;\nimport com.nuntly.models.organizations.OrganizationRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        OrganizationRetrieveResponse organization = client.organizations().retrieve("org_01ka8k8s80gvx9604cn9am5st4");\n    }\n}',
      },
      go: {
        method: 'client.Organizations.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\torganization, err := client.Organizations.Get(context.TODO(), "org_01ka8k8s80gvx9604cn9am5st4")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", organization.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/organizations/$ID \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.organizations.usage.retrieve',
        example:
          "import Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst usage = await client.organizations.usage.retrieve('org_01ka8k8s80gvx9604cn9am5st4');\n\nconsole.log(usage.transactional);",
      },
      java: {
        method: 'organizations().usage().retrieve',
        example:
          'package com.nuntly.example;\n\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.organizations.usage.UsageRetrieveParams;\nimport com.nuntly.models.organizations.usage.UsageRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        NuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\n        UsageRetrieveResponse usage = client.organizations().usage().retrieve("org_01ka8k8s80gvx9604cn9am5st4");\n    }\n}',
      },
      go: {
        method: 'client.Organizations.Usage.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tusage, err := client.Organizations.Usage.Get(context.TODO(), "org_01ka8k8s80gvx9604cn9am5st4")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", usage.Transactional)\n}\n',
      },
      http: {
        example:
          'curl https://api.nuntly.com/organizations/$ID/usage \\\n    -H "Authorization: Bearer $NUNTLY_API_KEY"',
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'go',
    content:
      '# Nuntly Go API Library\n\n<a href="https://pkg.go.dev/github.com/stainless-sdks/nuntly-go"><img src="https://pkg.go.dev/badge/github.com/stainless-sdks/nuntly-go.svg" alt="Go Reference"></a>\n\nThe Nuntly Go library provides convenient access to the [Nuntly REST API](http://developers.nuntly.com)\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Nuntly MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40nuntly%2Fsdk-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBudW50bHkvc2RrLW1jcCJdLCJlbnYiOnsiTlVOVExZX0FQSV9LRVkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40nuntly%2Fsdk-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40nuntly%2Fsdk-mcp%22%5D%2C%22env%22%3A%7B%22NUNTLY_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n\n\n```go\nimport (\n\t"github.com/stainless-sdks/nuntly-go" // imported as SDK_PackageName\n)\n```\n\n\n\nOr to pin the version:\n\n\n\n```sh\ngo get -u \'github.com/stainless-sdks/nuntly-go@v0.0.1\'\n```\n\n\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/nuntly-go"\n\t"github.com/stainless-sdks/nuntly-go/option"\n)\n\nfunc main() {\n\tclient := nuntly.NewClient(\n\t\toption.WithAPIKey("My API Key"), // defaults to os.LookupEnv("NUNTLY_API_KEY")\n\t)\n\temail, err := client.Emails.Send(context.TODO(), nuntly.EmailSendParams{\n\t\tFrom:    "ray@info.tomlinson.ai",\n\t\tSubject: "Verify Your Email Address",\n\t\tTo: nuntly.EmailSendParamsToUnion{\n\t\t\tOfString: nuntly.String("brian67@gmail.com"),\n\t\t},\n\t\tText: nuntly.String("Thank you for signing up! Please verify your email address..."),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", email.ID)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.APIKeys.New(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/stainless-sdks/nuntly-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n```go\niter := client.Emails.ListAutoPaging(context.TODO(), nuntly.EmailListParams{\n\tCursor: nuntly.String("eyJwYWdlIjoxfQ=="),\n\tLimit:  nuntly.Float(10),\n})\n// Automatically fetches more pages as needed.\nfor iter.Next() {\n\temailListResponse := iter.Current()\n\tfmt.Printf("%+v\\n", emailListResponse)\n}\nif err := iter.Err(); err != nil {\n\tpanic(err.Error())\n}\n```\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n```go\nemails, err := client.Emails.List(context.TODO(), nuntly.EmailListParams{\n\tCursor: nuntly.String("eyJwYWdlIjoxfQ=="),\n\tLimit:  nuntly.Float(10),\n})\nfor page != nil {\n\tfor _, email := range page.Data {\n\t\tfmt.Printf("%+v\\n", email)\n\t}\n\tpage, err = page.GetNextPage()\n}\nif err != nil {\n\tpanic(err.Error())\n}\n```\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.APIKeys.New(context.TODO(), nuntly.APIKeyNewParams{})\nif err != nil {\n\tvar apierr *nuntly.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/api-keys": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.APIKeys.New(\n\tctx,\n\tnuntly.APIKeyNewParams{},\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := nuntly.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.APIKeys.New(\n\tcontext.TODO(),\n\tnuntly.APIKeyNewParams{},\n\toption.WithMaxRetries(5),\n)\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\napiKey, err := client.APIKeys.New(\n\tcontext.TODO(),\n\tnuntly.APIKeyNewParams{},\n\toption.WithResponseInto(&response),\n)\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", apiKey)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/stainless-sdks/nuntly-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'java',
    content:
      '# Nuntly Java API Library\n\n<!-- x-release-please-start-version -->\n[![Maven Central](https://img.shields.io/maven-central/v/com.nuntly/nuntly-java)](https://central.sonatype.com/artifact/com.nuntly/nuntly-java/0.0.1)\n[![javadoc](https://javadoc.io/badge2/com.nuntly/nuntly-java/0.0.1/javadoc.svg)](https://javadoc.io/doc/com.nuntly/nuntly-java/0.0.1)\n<!-- x-release-please-end -->\n\nThe Nuntly Java SDK provides convenient access to the [Nuntly REST API](http://developers.nuntly.com)   from applications written in Java.\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Nuntly MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40nuntly%2Fsdk-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBudW50bHkvc2RrLW1jcCJdLCJlbnYiOnsiTlVOVExZX0FQSV9LRVkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40nuntly%2Fsdk-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40nuntly%2Fsdk-mcp%22%5D%2C%22env%22%3A%7B%22NUNTLY_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n<!-- x-release-please-start-version -->\n\nThe REST API documentation can be found on [developers.nuntly.com](http://developers.nuntly.com). Javadocs are available on [javadoc.io](https://javadoc.io/doc/com.nuntly/nuntly-java/0.0.1).\n\n<!-- x-release-please-end -->\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n### Gradle\n\n~~~kotlin\nimplementation("com.nuntly:nuntly-java:0.0.1")\n~~~\n\n### Maven\n\n~~~xml\n<dependency>\n  <groupId>com.nuntly</groupId>\n  <artifactId>nuntly-java</artifactId>\n  <version>0.0.1</version>\n</dependency>\n~~~\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Java 8 or later.\n\n## Usage\n\n```java\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.emails.EmailSendParams;\nimport com.nuntly.models.emails.EmailSendResponse;\n\n// Configures using the `nuntly.apiKey` and `nuntly.baseUrl` system properties\n// Or configures using the `NUNTLY_API_KEY` and `NUNTLY_BASE_URL` environment variables\nNuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\nEmailSendParams params = EmailSendParams.builder()\n    .from("ray@info.tomlinson.ai")\n    .subject("Verify Your Email Address")\n    .to("brian67@gmail.com")\n    .text("Thank you for signing up! Please verify your email address...")\n    .build();\nEmailSendResponse email = client.emails().send(params);\n```\n\n## Client configuration\n\nConfigure the client using system properties or environment variables:\n\n```java\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\n\n// Configures using the `nuntly.apiKey` and `nuntly.baseUrl` system properties\n// Or configures using the `NUNTLY_API_KEY` and `NUNTLY_BASE_URL` environment variables\nNuntlyClient client = NuntlyOkHttpClient.fromEnv();\n```\n\nOr manually:\n\n```java\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\n\nNuntlyClient client = NuntlyOkHttpClient.builder()\n    .apiKey("My API Key")\n    .build();\n```\n\nOr using a combination of the two approaches:\n\n```java\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\n\nNuntlyClient client = NuntlyOkHttpClient.builder()\n    // Configures using the `nuntly.apiKey` and `nuntly.baseUrl` system properties\n    // Or configures using the `NUNTLY_API_KEY` and `NUNTLY_BASE_URL` environment variables\n    .fromEnv()\n    .apiKey("My API Key")\n    .build();\n```\n\nSee this table for the available options:\n\n| Setter    | System property  | Environment variable | Required | Default value              |\n| --------- | ---------------- | -------------------- | -------- | -------------------------- |\n| `apiKey`  | `nuntly.apiKey`  | `NUNTLY_API_KEY`     | false    | -                          |\n| `baseUrl` | `nuntly.baseUrl` | `NUNTLY_BASE_URL`    | true     | `"https://api.nuntly.com"` |\n\nSystem properties take precedence over environment variables.\n\n> [!TIP]\n> Don\'t create more than one client in the same application. Each client has a connection pool and\n> thread pools, which are more efficient to share between requests.\n\n### Modifying configuration\n\nTo temporarily use a modified client configuration, while reusing the same connection and thread       pools, call `withOptions()` on any client or service:\n\n```java\nimport com.nuntly.client.NuntlyClient;\n\nNuntlyClient clientWithOptions = client.withOptions(optionsBuilder -> {\n    optionsBuilder.baseUrl("https://example.com");\n    optionsBuilder.maxRetries(42);\n});\n```\n\nThe `withOptions()` method does not affect the original client or service.\n\n## Requests and responses\n\nTo send a request to the Nuntly API, build an instance of some `Params` class and pass it to the     corresponding client method. When the response is received, it will be deserialized into an instance of     a Java class.\n\nFor example, `client.emails().send(...)` should be called with an instance of `EmailSendParams`, and it     will return an instance of `EmailSendResponse`.\n\n## Immutability\n\nEach class in the SDK has an associated   [builder](https://blogs.oracle.com/javamagazine/post/exploring-joshua-blochs-builder-design-pattern-in-java)   or factory method for constructing it.\n\nEach class is [immutable](https://docs.oracle.com/javase/tutorial/essential/concurrency/immutable.html)   once constructed. If the class has an associated builder, then it has a `toBuilder()` method, which can   be used to convert it back to a builder for making a modified copy.\n\nBecause each class is immutable, builder modification will _never_ affect already built class instances.\n\n## Asynchronous execution\n\nThe default client is synchronous. To switch to asynchronous execution, call the `async()` method:\n\n```java\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.models.emails.EmailSendParams;\nimport com.nuntly.models.emails.EmailSendResponse;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `nuntly.apiKey` and `nuntly.baseUrl` system properties\n// Or configures using the `NUNTLY_API_KEY` and `NUNTLY_BASE_URL` environment variables\nNuntlyClient client = NuntlyOkHttpClient.fromEnv();\n\nEmailSendParams params = EmailSendParams.builder()\n    .from("ray@info.tomlinson.ai")\n    .subject("Verify Your Email Address")\n    .to("brian67@gmail.com")\n    .text("Thank you for signing up! Please verify your email address...")\n    .build();\nCompletableFuture<EmailSendResponse> email = client.async().emails().send(params);\n```\n\nOr create an asynchronous client from the beginning:\n\n```java\nimport com.nuntly.client.NuntlyClientAsync;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClientAsync;\nimport com.nuntly.models.emails.EmailSendParams;\nimport com.nuntly.models.emails.EmailSendResponse;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `nuntly.apiKey` and `nuntly.baseUrl` system properties\n// Or configures using the `NUNTLY_API_KEY` and `NUNTLY_BASE_URL` environment variables\nNuntlyClientAsync client = NuntlyOkHttpClientAsync.fromEnv();\n\nEmailSendParams params = EmailSendParams.builder()\n    .from("ray@info.tomlinson.ai")\n    .subject("Verify Your Email Address")\n    .to("brian67@gmail.com")\n    .text("Thank you for signing up! Please verify your email address...")\n    .build();\nCompletableFuture<EmailSendResponse> email = client.emails().send(params);\n```\n\nThe asynchronous client supports the same options as the synchronous one, except most methods return `CompletableFuture`s.\n\n\n\n\n\n\n\n## Raw responses\n\nThe SDK defines methods that deserialize responses into instances of Java classes.       However, these methods don\'t provide access to the response headers, status code, or the raw response       body.\n\nTo access this data, prefix any HTTP method call on a client or service with `withRawResponse()`:\n\n```java\nimport com.nuntly.core.http.Headers;\nimport com.nuntly.core.http.HttpResponseFor;\nimport com.nuntly.models.apikeys.ApiKeyCreateParams;\nimport com.nuntly.models.apikeys.ApiKeyCreateResponse;\n\nHttpResponseFor<ApiKeyCreateResponse> apiKey = client.apiKeys().withRawResponse().create();\n\nint statusCode = apiKey.statusCode();\nHeaders headers = apiKey.headers();\n```\n\nYou can still deserialize the response into an instance of a Java class if needed:\n\n```java\nimport com.nuntly.models.apikeys.ApiKeyCreateResponse;\n\nApiKeyCreateResponse parsedApiKey = apiKey.parse();\n```\n\n## Error handling\n\nThe SDK throws custom unchecked exception types:\n\n- [`NuntlyServiceException`](nuntly-java-core/src/main/kotlin/com/nuntly/errors/NuntlyServiceException.kt): Base class for HTTP errors. See this table for which exception       subclass is thrown for each HTTP status code:\n\n  | Status | Exception                                          |\n  | ------ | -------------------------------------------------- |\n  | 400    | [`BadRequestException`](nuntly-java-core/src/main/kotlin/com/nuntly/errors/BadRequestException.kt)           |\n  | 401    | [`UnauthorizedException`](nuntly-java-core/src/main/kotlin/com/nuntly/errors/UnauthorizedException.kt)         |\n  | 403    | [`PermissionDeniedException`](nuntly-java-core/src/main/kotlin/com/nuntly/errors/PermissionDeniedException.kt)     |\n  | 404    | [`NotFoundException`](nuntly-java-core/src/main/kotlin/com/nuntly/errors/NotFoundException.kt)             |\n  | 422    | [`UnprocessableEntityException`](nuntly-java-core/src/main/kotlin/com/nuntly/errors/UnprocessableEntityException.kt)  |\n  | 429    | [`RateLimitException`](nuntly-java-core/src/main/kotlin/com/nuntly/errors/RateLimitException.kt)            |\n  | 5xx    | [`InternalServerException`](nuntly-java-core/src/main/kotlin/com/nuntly/errors/InternalServerException.kt)       |\n  | others | [`UnexpectedStatusCodeException`](nuntly-java-core/src/main/kotlin/com/nuntly/errors/UnexpectedStatusCodeException.kt) |\n\n- [`NuntlyIoException`](nuntly-java-core/src/main/kotlin/com/nuntly/errors/NuntlyIoException.kt): I/O networking errors.\n\n- [`NuntlyRetryableException`](nuntly-java-core/src/main/kotlin/com/nuntly/errors/NuntlyRetryableException.kt): Generic error indicating a failure that could be retried by the client.\n\n- [`NuntlyInvalidDataException`](nuntly-java-core/src/main/kotlin/com/nuntly/errors/NuntlyInvalidDataException.kt): Failure to interpret successfully parsed data. For example,       when accessing a property that\'s supposed to be required, but the API unexpectedly omitted it from the       response.\n\n- [`NuntlyException`](nuntly-java-core/src/main/kotlin/com/nuntly/errors/NuntlyException.kt): Base class for all exceptions. Most errors will result in one of the       previously mentioned ones, but completely generic errors may be thrown using the base class.\n\n## Pagination\n\nThe SDK defines methods that return a paginated lists of results. It provides convenient ways to access     the results either one page at a time or item-by-item across all pages.\n\n### Auto-pagination\n\nTo iterate through all results across all pages, use the `autoPager()` method, which automatically     fetches more pages as needed.\n\nWhen using the synchronous client, the method returns an [`Iterable`](https://docs.oracle.com/javase/8/docs/api/java/lang/Iterable.html)\n\n```java\nimport com.nuntly.models.emails.EmailListPage;\nimport com.nuntly.models.emails.EmailListResponse;\n\nEmailListPage page = client.emails().list();\n\n// Process as an Iterable\nfor (EmailListResponse email : page.autoPager()) {\n    System.out.println(email);\n}\n\n// Process as a Stream\npage.autoPager()\n    .stream()\n    .limit(50)\n    .forEach(email -> System.out.println(email));\n```\n\nWhen using the asynchronous client, the method returns an [`AsyncStreamResponse`](nuntly-java-core/src/main/kotlin/com/nuntly/core/http/AsyncStreamResponse.kt):\n\n```java\nimport com.nuntly.core.http.AsyncStreamResponse;\nimport com.nuntly.models.emails.EmailListPageAsync;\nimport com.nuntly.models.emails.EmailListResponse;\nimport java.util.Optional;\nimport java.util.concurrent.CompletableFuture;\n\nCompletableFuture<EmailListPageAsync> pageFuture = client.async().emails().list();\n\npageFuture.thenRun(page -> page.autoPager().subscribe(email -> {\n    System.out.println(email);\n}));\n\n// If you need to handle errors or completion of the stream\npageFuture.thenRun(page -> page.autoPager().subscribe(new AsyncStreamResponse.Handler<>() {\n    @Override\n    public void onNext(EmailListResponse email) {\n        System.out.println(email);\n    }\n\n    @Override\n    public void onComplete(Optional<Throwable> error) {\n        if (error.isPresent()) {\n            System.out.println("Something went wrong!");\n            throw new RuntimeException(error.get());\n        } else {\n            System.out.println("No more!");\n        }\n    }\n}));\n\n// Or use futures\npageFuture.thenRun(page -> page.autoPager()\n    .subscribe(email -> {\n        System.out.println(email);\n    })\n    .onCompleteFuture()\n    .whenComplete((unused, error) -> {\n        if (error != null) {\n            System.out.println("Something went wrong!");\n            throw new RuntimeException(error);\n        } else {\n            System.out.println("No more!");\n        }\n    }));\n```\n\n### Manual pagination\n\nTo access individual page items and manually request the next page, use the `items()`,\n`hasNextPage()`, and `nextPage()` methods:\n\n```java\nimport com.nuntly.models.emails.EmailListPage;\nimport com.nuntly.models.emails.EmailListResponse;\n\nEmailListPage page = client.emails().list();\nwhile (true) {\n    for (EmailListResponse email : page.items()) {\n        System.out.println(email);\n    }\n\n    if (!page.hasNextPage()) {\n        break;\n    }\n\n    page = page.nextPage();\n}\n```\n\n## Logging\n\nThe SDK uses the standard   [OkHttp logging interceptor](https://github.com/square/okhttp/tree/master/okhttp-logging-interceptor).\n\nEnable logging by setting the `NUNTLY_LOG` environment variable to   `info`:\n\n```sh\nexport NUNTLY_LOG=info\n```\n\nOr to `debug` for more verbose logging:\n\n```sh\nexport NUNTLY_LOG=debug\n```\n\n## ProGuard and R8\n\nAlthough the SDK uses reflection, it is still usable with     [ProGuard](https://github.com/Guardsquare/proguard) and     [R8](https://developer.android.com/topic/performance/app-optimization/enable-app-optimization) because     `nuntly-java-core` is published with a     [configuration file](nuntly-java-core/src/main/resources/META-INF/proguard/nuntly-java-core.pro) containing     [keep rules](https://www.guardsquare.com/manual/configuration/usage).\n\nProGuard and R8 should automatically detect and use the published rules, but you can also manually copy     the keep rules if necessary.\n\n\n\n\n\n## Jackson\n\nThe SDK depends on [Jackson](https://github.com/FasterXML/jackson) for JSON     serialization/deserialization. It is compatible with version 2.13.4 or higher,     but depends on version 2.18.2 by default.\n\nThe SDK throws an exception if it detects an incompatible Jackson version at runtime (e.g. if the     default version was overridden in your Maven or Gradle config).\n\nIf the SDK threw an exception, but you\'re _certain_ the version is compatible, then disable the version     check using the `checkJacksonVersionCompatibility` on [`NuntlyOkHttpClient`](nuntly-java-client-okhttp/src/main/kotlin/com/nuntly/client/okhttp/NuntlyOkHttpClient.kt) or     [`NuntlyOkHttpClientAsync`](nuntly-java-client-okhttp/src/main/kotlin/com/nuntly/client/okhttp/NuntlyOkHttpClientAsync.kt).\n\n> [!CAUTION]\n> We make no guarantee that the SDK works correctly when the Jackson version check is disabled.\n\nAlso note that there are bugs in older Jackson versions that can affect the SDK. We don\'t work around all     Jackson bugs ([example](https://github.com/FasterXML/jackson-databind/issues/3240)) and expect users to     upgrade Jackson for those instead.\n\n## Network options\n\n### Retries\n\nThe SDK automatically retries 2 times by default, with a short exponential backoff between requests.\n\nOnly the following error types are retried:\n- Connection errors (for example, due to a network connectivity problem)\n- 408 Request Timeout\n- 409 Conflict\n- 429 Rate Limit\n- 5xx Internal\n\nThe API may also explicitly instruct the SDK to retry or not retry a request.\n\nTo set a custom number of retries, configure the client using the `maxRetries` method:\n\n```java\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\n\nNuntlyClient client = NuntlyOkHttpClient.builder()\n    .fromEnv()\n    .maxRetries(4)\n    .build();\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default.\n\nTo set a custom timeout, configure the method call using the `timeout` method:\n\n```java\nimport com.nuntly.models.apikeys.ApiKeyCreateResponse;\n\nApiKeyCreateResponse apiKey = client.apiKeys().create(RequestOptions.builder().timeout(Duration.ofSeconds(30)).build());\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport java.time.Duration;\n\nNuntlyClient client = NuntlyOkHttpClient.builder()\n    .fromEnv()\n    .timeout(Duration.ofSeconds(30))\n    .build();\n```\n\n### Proxies\n\nTo route requests through a proxy, configure the client using the `proxy` method:\n\n```java\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport java.net.InetSocketAddress;\nimport java.net.Proxy;\n\nNuntlyClient client = NuntlyOkHttpClient.builder()\n    .fromEnv()\n    .proxy(new Proxy(\n      Proxy.Type.HTTP, new InetSocketAddress(\n        "https://example.com", 8080\n      )\n    ))\n    .build();\n```\n\nIf the proxy responds with `407 Proxy Authentication Required`, supply credentials by also   configuring `proxyAuthenticator`:\n\n```java\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport com.nuntly.core.http.ProxyAuthenticator;\n\nNuntlyClient client = NuntlyOkHttpClient.builder()\n    .fromEnv()\n    .proxy(...)\n    // Or a custom implementation of `ProxyAuthenticator`.\n    .proxyAuthenticator(ProxyAuthenticator.basic("username", "password"))\n    .build();\n```\n\n### Connection pooling\n\nTo customize the underlying OkHttp connection pool, configure the client using the   `maxIdleConnections` and `keepAliveDuration` methods:\n\n```java\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\nimport java.time.Duration;\n\nNuntlyClient client = NuntlyOkHttpClient.builder()\n    .fromEnv()\n    // If `maxIdleConnections` is set, then `keepAliveDuration` must be set, and vice versa.\n    .maxIdleConnections(10)\n    .keepAliveDuration(Duration.ofMinutes(2))\n    .build();\n```\n\nIf both options are unset, OkHttp\'s default connection pool settings are used.\n\n### HTTPS\n\n> [!NOTE]\n> Most applications should not call these methods, and instead use the system defaults. The defaults include\n> special optimizations that can be lost if the implementations are modified.\n\nTo configure how HTTPS connections are secured, configure the client using the `sslSocketFactory`,   `trustManager`, and `hostnameVerifier` methods:\n\n```java\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\n\nNuntlyClient client = NuntlyOkHttpClient.builder()\n    .fromEnv()\n    // If `sslSocketFactory` is set, then `trustManager` must be set, and vice versa.\n    .sslSocketFactory(yourSSLSocketFactory)\n    .trustManager(yourTrustManager)\n    .hostnameVerifier(yourHostnameVerifier)\n    .build();\n```\n\n\n\n### Custom HTTP client\n\nThe SDK consists of three artifacts:\n- `nuntly-java-core`\n  - Contains core SDK logic\n  - Does not depend on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`NuntlyClient`](nuntly-java-core/src/main/kotlin/com/nuntly/client/NuntlyClient.kt), [`NuntlyClientAsync`](nuntly-java-core/src/main/kotlin/com/nuntly/client/NuntlyClientAsync.kt),             [`NuntlyClientImpl`](nuntly-java-core/src/main/kotlin/com/nuntly/client/NuntlyClientImpl.kt), and [`NuntlyClientAsyncImpl`](nuntly-java-core/src/main/kotlin/com/nuntly/client/NuntlyClientAsyncImpl.kt), all of which can             work with any HTTP client\n- `nuntly-java-client-okhttp`\n  - Depends on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`NuntlyOkHttpClient`](nuntly-java-client-okhttp/src/main/kotlin/com/nuntly/client/okhttp/NuntlyOkHttpClient.kt) and [`NuntlyOkHttpClientAsync`](nuntly-java-client-okhttp/src/main/kotlin/com/nuntly/client/okhttp/NuntlyOkHttpClientAsync.kt), which             provide a way to construct [`NuntlyClientImpl`](nuntly-java-core/src/main/kotlin/com/nuntly/client/NuntlyClientImpl.kt) and             [`NuntlyClientAsyncImpl`](nuntly-java-core/src/main/kotlin/com/nuntly/client/NuntlyClientAsyncImpl.kt), respectively, using OkHttp\n- `nuntly-java`\n  - Depends on and exposes the APIs of both `nuntly-java-core` and `nuntly-java-client-okhttp`\n  - Does not have its own logic\n\nThis structure allows replacing the SDK\'s default HTTP client without pulling in unnecessary dependencies.\n\n#### Customized [`OkHttpClient`](https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html)\n\n> [!TIP]\n> Try the available [network options](#network-options) before replacing the default client.\n\nTo use a customized `OkHttpClient`:\n\n1. Replace your [`nuntly-java` dependency](#installation) with `nuntly-java-core`\n2. Copy `nuntly-java-client-okhttp`\'s [`OkHttpClient`](nuntly-java-client-okhttp/src/main/kotlin/com/nuntly/client/okhttp/OkHttpClient.kt) class into your code and        customize it\n3. Construct [`NuntlyClientImpl`](nuntly-java-core/src/main/kotlin/com/nuntly/client/NuntlyClientImpl.kt) or [`NuntlyClientAsyncImpl`](nuntly-java-core/src/main/kotlin/com/nuntly/client/NuntlyClientAsyncImpl.kt), similarly to        [`NuntlyOkHttpClient`](nuntly-java-client-okhttp/src/main/kotlin/com/nuntly/client/okhttp/NuntlyOkHttpClient.kt) or [`NuntlyOkHttpClientAsync`](nuntly-java-client-okhttp/src/main/kotlin/com/nuntly/client/okhttp/NuntlyOkHttpClientAsync.kt), using your        customized client\n\n### Completely custom HTTP client\n\nTo use a completely custom HTTP client:\n\n1. Replace your [`nuntly-java` dependency](#installation) with `nuntly-java-core`\n2. Write a class that implements the [`HttpClient`](nuntly-java-core/src/main/kotlin/com/nuntly/core/http/HttpClient.kt) interface\n3. Construct [`NuntlyClientImpl`](nuntly-java-core/src/main/kotlin/com/nuntly/client/NuntlyClientImpl.kt) or [`NuntlyClientAsyncImpl`](nuntly-java-core/src/main/kotlin/com/nuntly/client/NuntlyClientAsyncImpl.kt), similarly to        [`NuntlyOkHttpClient`](nuntly-java-client-okhttp/src/main/kotlin/com/nuntly/client/okhttp/NuntlyOkHttpClient.kt) or [`NuntlyOkHttpClientAsync`](nuntly-java-client-okhttp/src/main/kotlin/com/nuntly/client/okhttp/NuntlyOkHttpClientAsync.kt), using your new        client class\n\n## Undocumented API functionality\n\nThe SDK is typed for convenient usage of the documented API. However, it also supports working with undocumented or not yet supported parts of the API.\n\n### Parameters\n\nTo set undocumented parameters, call the `putAdditionalHeader`, `putAdditionalQueryParam`, or       `putAdditionalBodyProperty` methods on any `Params` class:\n\n```java\nimport com.nuntly.core.JsonValue;\nimport com.nuntly.models.emails.EmailSendParams;\n\nEmailSendParams params = EmailSendParams.builder()\n    .putAdditionalHeader("Secret-Header", "42")\n    .putAdditionalQueryParam("secret_query_param", "42")\n    .putAdditionalBodyProperty("secretProperty", JsonValue.from("42"))\n    .build();\n```\n\nThese can be accessed on the built object later using the `_additionalHeaders()`,       `_additionalQueryParams()`, and `_additionalBodyProperties()` methods.\n\nTo set undocumented parameters on _nested_ headers, query params, or body classes, call the         `putAdditionalProperty` method on the nested class:\n\n```java\nimport com.nuntly.core.JsonValue;\nimport com.nuntly.models.emails.bulk.BulkSendParams;\n\nBulkSendParams params = BulkSendParams.builder()\n    .fallback(BulkSendParams.Fallback.builder()\n        .putAdditionalProperty("secretProperty", JsonValue.from("42"))\n        .build())\n    .build();\n```\n\nThese properties can be accessed on the nested built object later using the         `_additionalProperties()` method.\n\nTo set a documented parameter or property to an undocumented or not yet supported _value_, pass a       [`JsonValue`](nuntly-java-core/src/main/kotlin/com/nuntly/core/Values.kt) object to its setter:\n\n```java\nimport com.nuntly.core.JsonValue;\nimport com.nuntly.models.emails.EmailSendParams;\n\nEmailSendParams params = EmailSendParams.builder()\n    .from(JsonValue.from(42))\n    .subject("Verify Your Email Address")\n    .to("brian67@gmail.com")\n    .text("Thank you for signing up! Please verify your email address...")\n    .build();\n```\n\nThe most straightforward way to create a [`JsonValue`](nuntly-java-core/src/main/kotlin/com/nuntly/core/Values.kt) is using its       `from(...)` method:\n\n```java\nimport com.nuntly.core.JsonValue;\nimport java.util.List;\nimport java.util.Map;\n\n// Create primitive JSON values\nJsonValue nullValue = JsonValue.from(null);\nJsonValue booleanValue = JsonValue.from(true);\nJsonValue numberValue = JsonValue.from(42);\nJsonValue stringValue = JsonValue.from("Hello World!");\n\n// Create a JSON array value equivalent to `["Hello", "World"]`\nJsonValue arrayValue = JsonValue.from(List.of(\n  "Hello", "World"\n));\n\n// Create a JSON object value equivalent to `{ "a": 1, "b": 2 }`\nJsonValue objectValue = JsonValue.from(Map.of(\n  "a", 1,\n  "b", 2\n));\n\n// Create an arbitrarily nested JSON equivalent to:\n// {\n//   "a": [1, 2],\n//   "b": [3, 4]\n// }\nJsonValue complexValue = JsonValue.from(Map.of(\n  "a", List.of(\n    1, 2\n  ),\n  "b", List.of(\n    3, 4\n  )\n));\n```\n\nNormally a `Builder` class\'s `build` method will throw         [`IllegalStateException`](https://docs.oracle.com/javase/8/docs/api/java/lang/IllegalStateException.html)         if any required parameter or property is unset.\n\nTo forcibly omit a required parameter or property, pass [`JsonMissing`](nuntly-java-core/src/main/kotlin/com/nuntly/core/Values.kt):\n\n```java\nimport com.nuntly.core.JsonMissing;\nimport com.nuntly.models.emails.EmailSendParams;\n\nEmailSendParams params = EmailSendParams.builder()\n    .subject("Verify your email address")\n    .to("brian67@gmail.com")\n    .from(JsonMissing.of())\n    .build();\n```\n\n### Response properties\n\nTo access undocumented response properties, call the `_additionalProperties()` method:\n\n```java\nimport com.nuntly.core.JsonValue;\nimport java.util.Map;\n\nMap<String, JsonValue> additionalProperties = client.emails().send(params)._additionalProperties();\nJsonValue secretPropertyValue = additionalProperties.get("secretProperty");\n\nString result = secretPropertyValue.accept(new JsonValue.Visitor<>() {\n    @Override\n    public String visitNull() {\n        return "It\'s null!";\n    }\n\n    @Override\n    public String visitBoolean(boolean value) {\n        return "It\'s a boolean!";\n    }\n\n    @Override\n    public String visitNumber(Number value) {\n        return "It\'s a number!";\n    }\n\n    // Other methods include `visitMissing`, `visitString`, `visitArray`, and `visitObject`\n    // The default implementation of each unimplemented method delegates to `visitDefault`, which throws by default, but can also be overridden\n});\n```\n\nTo access a property\'s raw JSON value, which may be undocumented, call its `_` prefixed method:\n\n```java\nimport com.nuntly.core.JsonField;\nimport java.util.Optional;\n\nJsonField<String> from = client.emails().send(params)._from();\n\nif (from.isMissing()) {\n  // The property is absent from the JSON response\n} else if (from.isNull()) {\n  // The property was set to literal null\n} else {\n  // Check if value was provided as a string\n  // Other methods include `asNumber()`, `asBoolean()`, etc.\n  Optional<String> jsonString = from.asString();\n\n  // Try to deserialize into a custom type\n  MyClass myObject = from.asUnknown().orElseThrow().convert(MyClass.class);\n}\n```\n\n### Response validation\n\nIn rare cases, the API may return a response that doesn\'t match the expected type. For example, the SDK     may expect a property to contain a `String`, but the API could return something else.\n\nBy default, the SDK will not throw an exception in this case. It will throw     [`NuntlyInvalidDataException`](nuntly-java-core/src/main/kotlin/com/nuntly/errors/NuntlyInvalidDataException.kt) only if you directly access the property.\n\nValidating the response is _not_ forwards compatible with new types from the API for existing fields.\n\nIf you would still prefer to check that the response is completely well-typed upfront, then either call     `validate()`:\n\n```java\nimport com.nuntly.models.emails.EmailSendResponse;\n\nEmailSendResponse email = client.emails().send(params).validate();\n```\n\nOr configure the method call to validate the response using the `responseValidation` method:\n\n```java\nimport com.nuntly.models.emails.EmailSendResponse;\n\nEmailSendResponse email = client.emails().send(\n  params, RequestOptions.builder().responseValidation(true).build()\n);\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport com.nuntly.client.NuntlyClient;\nimport com.nuntly.client.okhttp.NuntlyOkHttpClient;\n\nNuntlyClient client = NuntlyOkHttpClient.builder()\n    .fromEnv()\n    .responseValidation(true)\n    .build();\n```\n\n## FAQ\n\n### Why don\'t you use plain `enum` classes?\n\nJava `enum` classes are not trivially   [forwards compatible](https://www.stainless.com/blog/making-java-enums-forwards-compatible). Using them in   the SDK could cause runtime exceptions if the API is updated to respond with a new enum value.\n\n### Why do you represent fields using `JsonField<T>` instead of just plain `T`?\n\nUsing `JsonField<T>` enables a few features:\n\n- Allowing usage of [undocumented API functionality](#undocumented-api-functionality)\n- Lazily [validating the API response against the expected shape](#response-validation)\n- Representing absent vs explicitly null values\n\n### Why don\'t you use [`data` classes](https://kotlinlang.org/docs/data-classes.html)?\n\nIt is not [backwards compatible to add new fields to a data class](https://kotlinlang.org/docs/api-guidelines-backward-compatibility.html#avoid-using-data-classes-in-your-api)   and we don\'t want to introduce a breaking change every time we add a field to a class.\n\n### Why don\'t you use checked exceptions?\n\nChecked exceptions are widely considered a mistake in the Java programming language. In fact, they were   omitted from Kotlin for this reason.\n\nChecked exceptions:\n\n- Are verbose to handle\n- Encourage error handling at the wrong level of abstraction, where nothing can be done about the error\n- Are tedious to propagate due to the [function coloring problem](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function)\n- Don\'t play well with lambdas (also due to the function coloring problem)\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/nuntly/nuntly-sdk-java/issues) with questions, bugs, or suggestions.\n',
  },
  {
    language: 'typescript',
    content:
      "# Nuntly TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/@nuntly/sdk.svg?label=npm%20(stable))](https://npmjs.org/package/@nuntly/sdk) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@nuntly/sdk)\n\nThis library provides convenient access to the Nuntly REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [developers.nuntly.com](http://developers.nuntly.com). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Nuntly MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40nuntly%2Fsdk-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBudW50bHkvc2RrLW1jcCJdLCJlbnYiOnsiTlVOVExZX0FQSV9LRVkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40nuntly%2Fsdk-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40nuntly%2Fsdk-mcp%22%5D%2C%22env%22%3A%7B%22NUNTLY_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install @nuntly/sdk\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst email = await client.emails.send({\n  from: 'ray@info.tomlinson.ai',\n  subject: 'Verify Your Email Address',\n  to: 'brian67@gmail.com',\n  text: 'Thank you for signing up! Please verify your email address...',\n});\n\nconsole.log(email.id);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  apiKey: process.env['NUNTLY_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiKey: Nuntly.APIKeyCreateResponse = await client.apiKeys.create();\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst apiKey = await client.apiKeys.create().catch(async (err) => {\n  if (err instanceof Nuntly.APIError) {\n    console.log(err.status); // 400\n    console.log(err.name); // BadRequestError\n    console.log(err.headers); // {server: 'nginx', ...}\n  } else {\n    throw err;\n  }\n});\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Nuntly({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.apiKeys.create({\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Nuntly({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.apiKeys.create({\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n## Auto-pagination\n\nList methods in the Nuntly API are paginated.\nYou can use the `for await … of` syntax to iterate through items across all pages:\n\n```ts\nasync function fetchAllEmailListResponses(params) {\n  const allEmailListResponses = [];\n  // Automatically fetches more pages as needed.\n  for await (const emailListResponse of client.emails.list({\n    cursor: 'eyJwYWdlIjoxfQ==',\n    limit: 10,\n  })) {\n    allEmailListResponses.push(emailListResponse);\n  }\n  return allEmailListResponses;\n}\n```\n\nAlternatively, you can request a single page at a time:\n\n```ts\nlet page = await client.emails.list({ cursor: 'eyJwYWdlIjoxfQ==', limit: 10 });\nfor (const emailListResponse of page.data) {\n  console.log(emailListResponse);\n}\n\n// Convenience methods are provided for manually paginating:\nwhile (page.hasNextPage()) {\n  page = await page.getNextPage();\n  // ...\n}\n```\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Nuntly();\n\nconst response = await client.apiKeys.create().asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: apiKey, response: raw } = await client.apiKeys.create().withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(apiKey.id);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `NUNTLY_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Nuntly from '@nuntly/sdk';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Nuntly({\n  logger: logger.child({ name: 'Nuntly' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.emails.send({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Nuntly from '@nuntly/sdk';\nimport fetch from 'my-fetch';\n\nconst client = new Nuntly({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Nuntly from '@nuntly/sdk';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Nuntly({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Nuntly from '@nuntly/sdk';\n\nconst client = new Nuntly({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Nuntly from 'npm:@nuntly/sdk';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Nuntly({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/nuntly/nuntly-sdk-typescript/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
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
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
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
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
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
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
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
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
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

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
