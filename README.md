# @nuntly/sdk

[![npm version](https://img.shields.io/npm/v/@nuntly/sdk.svg)](https://www.npmjs.com/package/@nuntly/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

The official TypeScript SDK for [Nuntly](https://nuntly.com), the developer-first email platform. Send transactional emails, manage domains, handle webhooks, and receive inbound mail with full type safety and zero runtime dependencies.

[Documentation](https://nuntly.com/docs) | [API Reference](./api.md) | [Website](https://nuntly.com) | [Get your API key](https://nuntly.com/auth/sign-up)

This repository hosts two packages:

| Package | Published to npm | Description |
|---------|------------------|-------------|
| [`@nuntly/sdk`](./packages/sdk) | yes | Public SDK consumed by applications |
| `@nuntly/sdk-core` | no (private) | Internal HTTP infrastructure, bundled into `@nuntly/sdk` at build time |

For SDK usage, see [`packages/sdk/README.md`](./packages/sdk/README.md).

## Repository structure

```
packages/
├── sdk/         Public @nuntly/sdk package
└── sdk-core/    Internal HTTP infrastructure
```

## Table of contents

- [Installation](#installation)
- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Configuration](#configuration)
- [Pagination](#pagination)
- [Error handling](#error-handling)
- [Webhook verification](#webhook-verification)
- [Safe mode (error as value)](#safe-mode-error-as-value)
- [Lifecycle hooks](#lifecycle-hooks)
- [Retry configuration](#retry-configuration)
- [Raw response access](#raw-response-access)
- [Advanced](#advanced)
- [MCP Server](#mcp-server)
- [FAQ](#faq)
- [Semantic versioning](#semantic-versioning)
- [Previous versions](#previous-versions)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install @nuntly/sdk
# or
bun add @nuntly/sdk
# or
pnpm add @nuntly/sdk
```

The SDK has zero runtime dependencies.

## Requirements

- Node.js 20 or later, Bun, Deno, or any modern edge runtime (Cloudflare Workers, Vercel Edge)
- TypeScript 5.0 or later for full type inference (the SDK ships `.d.ts` and works in plain JavaScript too)
- A Nuntly API key, available at [https://nuntly.com/auth/sign-up](https://nuntly.com/auth/sign-up)

## Quick start

```typescript
import Nuntly from '@nuntly/sdk';

const nuntly = new Nuntly({ apiKey: process.env.NUNTLY_API_KEY });

const email = await nuntly.emails.send({
  from: 'hello@yourcompany.com',
  to: 'recipient@example.com',
  subject: 'Welcome to Nuntly',
  html: '<h1>Welcome!</h1><p>Your account is ready.</p>',
});

console.log(email.id); // em_01ka8k8s80gvx9604cn9am5st4
```

## Configuration

```typescript
import { Nuntly } from '@nuntly/sdk';

const nuntly = new Nuntly({
  apiKey: process.env.NUNTLY_API_KEY,
});
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | `string` | `NUNTLY_API_KEY` env var | Your Nuntly API key |
| `baseUrl` | `string` | `https://api.nuntly.com` | API base URL |
| `timeout` | `number` | `60000` | Request timeout in milliseconds |
| `maxRetries` | `number` | `2` | Number of retry attempts on failure |
| `retry` | `RetryStrategy` | `'backoff'` | Retry strategy: `'backoff'`, `'none'`, or custom backoff config |
| `debug` | `boolean` | `false` | Log HTTP requests and responses |
| `logger` | `Logger` | - | Custom logger (compatible with console, pino, winston) |
| `hooks` | `Hooks` | - | Lifecycle hooks (see [Lifecycle hooks](#lifecycle-hooks)) |
| `fetch` | `typeof fetch` | `globalThis.fetch` | Custom fetch implementation |

## Pagination

List methods return a `CursorPage` with auto-pagination:

```typescript
// Auto-paginate all items
for await (const email of await nuntly.emails.list({ limit: 10 })) {
  console.log(email.id);
}

// Manual pagination
const page1 = await nuntly.emails.list({ limit: 10 });
console.log(page1.data);         // current page items
console.log(page1.hasNextPage()); // true/false

const page2 = await page1.nextPage();
```

## Error handling

Every API error throws a typed exception:

```typescript
import { NotFoundError, RateLimitError, AuthenticationError } from '@nuntly/sdk';

try {
  await nuntly.emails.retrieve('em_nonexistent');
} catch (error) {
  if (error instanceof NotFoundError) {
    console.log('Email not found:', error.message);
  } else if (error instanceof RateLimitError) {
    console.log('Rate limited, retry in:', error.retryAfter, 'ms');
  } else if (error instanceof AuthenticationError) {
    console.log('Invalid API key');
  }

  // Structured error body and request ID on every API error
  console.log(error.body.message);
  console.log(error.body.errors);  // field-level validation errors (422)
  console.log(error.requestId);    // x-request-id for support

  // Access the raw Response for advanced inspection
  console.log(error.rawResponse.status);
  console.log(error.rawResponse.headers.get('x-ratelimit-remaining'));
}
```

Error classes: `BadRequestError` (400), `AuthenticationError` (401), `PermissionDeniedError` (403), `NotFoundError` (404), `ConflictError` (409), `UnprocessableEntityError` (422), `RateLimitError` (429), `InternalServerError` (5xx).

Every error exposes `status`, `body`, `headers`, `requestId`, and `rawResponse`.

## Webhook verification

Verify incoming webhook signatures and get typed events:

```typescript
import { verifyWebhook } from '@nuntly/sdk';

const event = await verifyWebhook(
  requestBody,                    // raw body string
  headers['x-nuntly-signature'],  // HMAC-SHA256 signature
  headers['x-nuntly-timestamp'],  // unix timestamp
  process.env.WEBHOOK_SECRET!,
);

switch (event.type) {
  case 'email.delivered':
    console.log(event.data.delivery.recipients);
    break;
  case 'email.bounced':
    console.log(event.data.bounce.bounceType);
    break;
  case 'message.received':
    console.log(event.data.from, event.data.subject);
    break;
}
```

The function throws `WebhookVerificationError` on invalid signatures or expired timestamps (default: 5 minutes).

## Safe mode (error as value)

Use `createSafeNuntly` for error-as-value (no try/catch):

```typescript
import { createSafeNuntly } from '@nuntly/sdk';

const nuntly = createSafeNuntly({ apiKey: process.env.NUNTLY_API_KEY });

const { data, error } = await nuntly.emails.send({
  from: 'hello@yourcompany.com',
  to: 'recipient@example.com',
  subject: 'Welcome',
  html: '<p>Hello!</p>',
});

if (error) {
  console.log(error.status, error.message);
} else {
  console.log(data.id);
}
```

Or wrap per-call with `safe()`:

```typescript
import { Nuntly, safe } from '@nuntly/sdk';

const nuntly = new Nuntly({ apiKey: process.env.NUNTLY_API_KEY });
const { data, error } = await safe(nuntly).emails.retrieve('em_123');
```

## Lifecycle hooks

Hook into the HTTP lifecycle for logging, telemetry, or auth refresh:

```typescript
import type { Hooks } from '@nuntly/sdk';

const nuntly = new Nuntly({
  apiKey: process.env.NUNTLY_API_KEY,
  hooks: {
    onRequest: (request) => {
      console.log(`-> ${request.method} ${request.url}`);
    },
    onResponse: (response, request) => {
      console.log(`<- ${response.status} (${response.headers.get('x-request-id')})`);
    },
    onSuccess: (data, request) => {
      metrics.increment('api.success');
    },
    onRetry: ({ attempt, response }) => {
      console.warn(`Retry #${attempt}, status: ${response?.status}`);
    },
    onError: (error, request) => {
      sentry.captureException(error);
    },
  },
});
```

| Hook | Signature | When |
|------|-----------|------|
| `onRequest` | `(request: Request) => void` | Before each HTTP request |
| `onResponse` | `(response: Response, request: Request) => void` | After final response (post-retry) |
| `onSuccess` | `(data: unknown, request: Request) => void` | After successful response parsing |
| `onRetry` | `(context: RetryContext) => void` | Before each retry attempt |
| `onError` | `(error: unknown, request: Request) => void` | On any error |

All hooks support async (return `Promise<void>`).

## Retry configuration

Default: exponential backoff (500ms initial, 8s max, exponent 2) with jitter.

```typescript
// Disable retries
const nuntly = new Nuntly({
  apiKey: process.env.NUNTLY_API_KEY,
  retry: 'none',
});

// Custom backoff
const nuntly = new Nuntly({
  apiKey: process.env.NUNTLY_API_KEY,
  maxRetries: 5,
  retry: {
    strategy: 'backoff',
    backoff: {
      initialInterval: 200,  // ms
      maxInterval: 30000,    // ms
      exponent: 1.5,
    },
  },
});

// Per-request override
await nuntly.emails.send(payload, { maxRetries: 0 });
```

The SDK automatically respects `Retry-After` headers on 429 responses.

## Raw response access

Access the raw `Response` object (headers, status) via `withResponse()`:

```typescript
const { data, response } = await nuntly.emails.withResponse(
  nuntly.emails.retrieve('em_123'),
);

console.log(data.status);                          // 'delivered'
console.log(response.headers.get('x-request-id')); // request ID
console.log(response.headers.get('x-ratelimit-remaining'));
```

## Advanced

### Per-request options

```typescript
await nuntly.emails.send(payload, {
  timeout: 30000,
  maxRetries: 0,
  headers: { 'X-Idempotency-Key': 'unique-key-123' },
});
```

### Abort a request

```typescript
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);

await nuntly.emails.list(undefined, { signal: controller.signal });
```

### Debug logging

```typescript
const nuntly = new Nuntly({
  apiKey: process.env.NUNTLY_API_KEY,
  debug: true,
});
// -> POST https://api.nuntly.com/emails
// <- 201 POST https://api.nuntly.com/emails (42ms) [req_abc123]
```

### Custom logger

```typescript
import pino from 'pino';

const nuntly = new Nuntly({
  apiKey: process.env.NUNTLY_API_KEY,
  logger: pino({ level: 'debug' }),
});
```

### Custom fetch implementation

Replace the default `globalThis.fetch` with any compatible function. Useful for instrumentation, custom retry, or alternative HTTP clients:

```typescript
import { Nuntly } from '@nuntly/sdk';

const nuntly = new Nuntly({
  apiKey: process.env.NUNTLY_API_KEY,
  fetch: async (url, init) => {
    console.time(`fetch ${url}`);
    const response = await globalThis.fetch(url, init);
    console.timeEnd(`fetch ${url}`);
    return response;
  },
});
```

### HTTP / HTTPS proxies

Use `undici` to route requests through a corporate or debugging proxy:

```typescript
import { Nuntly } from '@nuntly/sdk';
import { ProxyAgent, fetch as undiciFetch } from 'undici';

const proxy = new ProxyAgent('http://corporate-proxy:8080');

const nuntly = new Nuntly({
  apiKey: process.env.NUNTLY_API_KEY,
  fetch: (url, init) => undiciFetch(url, { ...init, dispatcher: proxy }) as unknown as Response,
});
```

### Timeouts

The default request timeout is 60 seconds. Override globally:

```typescript
const nuntly = new Nuntly({
  apiKey: process.env.NUNTLY_API_KEY,
  timeout: 10_000, // 10 seconds
});
```

Or per-request:

```typescript
await nuntly.emails.send(payload, { timeout: 5_000 });
```

A request that exceeds its timeout aborts with a `ConnectionError`.

## MCP Server

For LLM and agent integrations, see [`@nuntly/sdk-mcp`](https://www.npmjs.com/package/@nuntly/sdk-mcp), which exposes the SDK as a Model Context Protocol server consumable by Claude Desktop, Cursor, Continue, and other MCP-aware clients.

## FAQ

**Does the SDK work in browsers?**
Yes. The package ships an ESM build and uses standard `fetch`. Calling Nuntly directly from a browser exposes your API key, so generate short-lived tokens server-side and pass them to the browser instead.

**Are request bodies or API keys included in errors?**
No. Errors include `requestId` (for support), HTTP status, response headers, and the API error body returned by the server. The request body and API key are never serialized into errors.

**Can I use a custom domain?**
Yes, set `baseUrl` in the client options.

**ESM or CommonJS?**
Both. The package ships dual entry points: `import` resolves to ESM, `require` resolves to CJS. Types are bundled for both formats.

**How do I report a bug or request a feature?**
Open an issue at [github.com/nuntly/nuntly-sdk-typescript/issues](https://github.com/nuntly/nuntly-sdk-typescript/issues).

## Semantic versioning

This SDK follows [Semantic Versioning 2.0](https://semver.org). Versions before `1.0.0` (alpha, beta) may include breaking changes between minor versions.

After `1.0.0`:

- **Major** version bumps signal breaking changes to the public API
- **Minor** version bumps add backwards-compatible features
- **Patch** version bumps include backwards-compatible fixes

Identifiers prefixed with `_` are internal and not subject to semver.

## Previous versions

Versions `0.x` are preserved on the [`legacy/stainless-v0.x`](https://github.com/nuntly/nuntly-sdk-typescript/tree/legacy/stainless-v0.x) branch. Those releases remain installable from npm via `npm install @nuntly/sdk@0`.

## Contributing

Issues, bug reports, and feature requests are welcome at [github.com/nuntly/nuntly-sdk-typescript/issues](https://github.com/nuntly/nuntly-sdk-typescript/issues). The public API surface is generated from the Nuntly OpenAPI spec, so direct PRs that modify it will likely be redirected to upstream feedback. Documentation, examples, and developer-experience improvements are the highest-impact contribution areas.

## License

MIT. See [LICENSE](./LICENSE).
