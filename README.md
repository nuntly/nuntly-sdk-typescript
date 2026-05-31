# @nuntly/sdk

[![npm version](https://img.shields.io/npm/v/@nuntly/sdk.svg)](https://www.npmjs.com/package/@nuntly/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

The official TypeScript SDK for [Nuntly](https://nuntly.com), the developer-first email platform. Send transactional emails, manage domains, handle webhooks, and receive inbound mail with full type safety and zero runtime dependencies.

[Documentation](https://nuntly.com/docs) | [API Reference](./api.md) | [Website](https://nuntly.com) | [Get your API key](https://nuntly.com/auth/sign-up)

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
import { Nuntly } from '@nuntly/sdk';

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
| `defaultHeaders` | `Record<string, string>` | - | Headers sent on every request (tenant id, telemetry, proxy auth). Overridden by per-request `headers`. |

### Multi-tenant and client cloning

Real-world problems `defaultHeaders` and `withOptions(partial)` solve:

**Problem: each customer in your SaaS has their own Nuntly API key.**
Building a new `Nuntly` per request loses hooks, retry config, and the warm fetch pool.

```typescript
const root = new Nuntly({ apiKey: process.env.NUNTLY_API_KEY });

// Per-tenant client, reuses the root config except apiKey
const tenant = root.withOptions({ apiKey: tenantApiKey });
await tenant.emails.send({ from, to, subject, html });
```

**Problem: an inbound request in your app fans out to several services (DB, Stripe, Nuntly...). You want one trace ID across all of them.**
Forward your trace ID on every Nuntly call so your APM correlates the outbound email send with the inbound request that triggered it.

```typescript
const traced = root.withOptions({
  defaultHeaders: { 'X-Trace-Id': req.traceId },
});
await traced.emails.send({ from, to, subject, html });
```

**Problem: audit/compliance team needs to know "which user in our app sent this email".**
Stamp `X-Initiated-By` on every request. Your gateway / proxy / log pipeline records it; Nuntly itself ignores it.

```typescript
const audited = root.withOptions({
  defaultHeaders: { 'X-Initiated-By': `user:${userId}` },
});
```

**Problem: your CI/staging environment runs behind a corporate egress proxy that requires auth.**

```typescript
const corpClient = new Nuntly({
  apiKey: process.env.NUNTLY_API_KEY,
  defaultHeaders: { 'Proxy-Authorization': `Basic ${process.env.PROXY_TOKEN}` },
});
```

#### Mental model

- `withOptions(partial)` returns a **new** client. The original instance is untouched, hooks and retry config are reused. `defaultHeaders` is deep-merged; the rest of the options is shallow-replaced.
- `defaultHeaders` is **passthrough**: the SDK sets them on every HTTP request, but Nuntly does not parse or route on them. The value lives in your own observability, proxy, and audit chain.

## Pagination

List methods return a `PagePromise` that you can either `await` for a
single `CursorPage` or iterate with `for await` to auto-paginate:

```typescript
// Auto-paginate all items
for await (const email of nuntly.emails.list({ limit: 10 })) {
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
import { APIError, NotFoundError, RateLimitError, AuthenticationError } from '@nuntly/sdk';

try {
  await nuntly.emails.retrieve('em_nonexistent');
} catch (error) {
  if (error instanceof APIError) {
    if (error instanceof NotFoundError) {
      console.log('Email not found:', error.message);
    } else if (error instanceof RateLimitError) {
      console.log('Rate limited, retry in:', error.retryAfter, 'ms');
    } else if (error instanceof AuthenticationError) {
      console.log('Invalid API key');
    }

    // Structured error fields on every API error
    console.log(error.status);    // HTTP status code (e.g. 400)
    console.log(error.title);     // human-readable summary
    console.log(error.code);      // machine-readable error code (e.g. invalid_body)
    console.log(error.details);   // optional details (e.g. which field is invalid)
    console.log(error.requestId); // x-request-id for support

    // Access the raw Response for advanced inspection
    console.log(error.rawResponse.status);
    console.log(error.rawResponse.headers.get('x-ratelimit-remaining'));
  }
}
```

Error classes: `BadRequestError` (400), `AuthenticationError` (401), `PermissionDeniedError` (403), `NotFoundError` (404), `ConflictError` (409), `UnprocessableEntityError` (422), `RateLimitError` (429), `InternalServerError` (5xx).

Every error exposes `status`, `code`, `title`, `details`, `headers`, `requestId`, and `rawResponse`.

## Webhook verification

Verify incoming webhook signatures and get typed events:

```typescript
import { verifyWebhook } from '@nuntly/sdk';

const event = await verifyWebhook(
  requestBody,                     // raw body (string or Uint8Array)
  headers['webhook-signature'],    // signature header in the form t=<seconds>,v0=<hex>
  process.env.WEBHOOK_SECRET!,     // signing secret (with or without the whsec_ prefix)
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
  console.error(error.message);
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

Hook into the HTTP lifecycle for logging, telemetry, or auth refresh. Every
hook receives a single structured `ctx` argument:

```typescript
import type { Hooks } from '@nuntly/sdk';
import { APIError } from '@nuntly/sdk';

const nuntly = new Nuntly({
  apiKey: process.env.NUNTLY_API_KEY,
  hooks: {
    onRequest: (ctx) => {
      console.log(`-> ${ctx.method} ${ctx.url}`);
    },
    onResponse: (ctx) => {
      console.log(`<- ${ctx.response.status} ${ctx.request.path}`);
    },
    onSuccess: (ctx) => {
      metrics.increment('api.success');
    },
    onRetry: (ctx) => {
      console.warn(`Retry #${ctx.attempt} ${ctx.request.path}`);
    },
    onError: (ctx) => {
      if (ctx.error instanceof APIError) {
        sentry.captureException(ctx.error, { tags: { code: ctx.error.code } });
      } else {
        sentry.captureException(ctx.error);
      }
    },
  },
});
```

| Hook | Signature | When |
|------|-----------|------|
| `onRequest` | `(ctx: RequestContext) => void \| Promise<void>` | Before each HTTP request |
| `onResponse` | `(ctx: ResponseContext) => void \| Promise<void>` | After each HTTP response (2xx, 4xx, 5xx); not called on network errors |
| `onSuccess` | `(ctx: SuccessContext) => void \| Promise<void>` | After each 2xx response, with the parsed payload |
| `onRetry` | `(ctx: RetryContext) => void \| Promise<void>` | Before each retry attempt |
| `onError` | `(ctx: ErrorContext) => void \| Promise<void>` | On 4xx/5xx (`APIError`) or network/timeout (`APIConnectionError`) |

Per-request invocation order on the happy path:
`onRequest -> [onRetry x N] -> onResponse -> (onSuccess | onError)`.

All hooks may return a `Promise<void>` and are awaited by the client.

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

Every resource method returns an `APIPromise<T>`. It is a `Promise<T>` you can
`await` as usual, with two extra methods for accessing the raw `Response`.

Use `.withResponse()` when you need both the parsed data and the
underlying `Response`:

```typescript
const { data, response } = await nuntly.emails.retrieve('em_123').withResponse();

console.log(data.status);                          // 'delivered'
console.log(response.headers.get('x-request-id')); // request ID
console.log(response.headers.get('x-ratelimit-remaining'));
```

Use `.asResponse()` to get the raw `Response` as soon as headers are
received, without consuming the body. Useful for streaming or for
header-only inspection:

```typescript
const response = await nuntly.emails.retrieve('em_123').asResponse();
console.log(response.status, response.headers.get('x-request-id'));
```

## Advanced

### Per-request options

```typescript
await nuntly.emails.send(payload, {
  timeout: 30000,
  maxRetries: 0,
  idempotencyKey: 'unique-key-123',
});
```

The wire header is `Idempotency-Key` (no `X-` prefix). The SDK auto-generates
a UUID v4 for `emails.send`, `emails.bulk.send`, `messages.reply`,
`messages.forward`, and `inboxes.messages.send` when `idempotencyKey` is not
provided. Pass an explicit value to wire up your own retry key (e.g. for
cross-process deduplication). You can also set the header manually via
`headers: { 'Idempotency-Key': '...' }` if you prefer.

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

A request that exceeds its timeout aborts with an `APIConnectionTimeoutError`.

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

Versions `0.x` remain installable from npm via `npm install @nuntly/sdk@0` for backwards compatibility.

Upgrading from `0.x` to `1.0.0`? See [MIGRATION.md](./MIGRATION.md) for the breaking-change cheat-sheet.

## Contributing

Issues, bug reports, and feature requests are welcome at [github.com/nuntly/nuntly-sdk-typescript/issues](https://github.com/nuntly/nuntly-sdk-typescript/issues).

## License

MIT. See [LICENSE](./LICENSE).
