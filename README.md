# @nuntly/sdk

[![npm version](https://img.shields.io/npm/v/@nuntly/sdk.svg)](https://www.npmjs.com/package/@nuntly/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/nuntly/nuntly-sdk-typescript/blob/main/LICENSE)

The official TypeScript SDK for [Nuntly](https://nuntly.com), the developer-first email platform. Send transactional emails, manage domains, handle webhooks, and receive inbound mail with full type safety and zero runtime dependencies.

[Documentation](https://nuntly.com/docs) | [API Reference](https://github.com/nuntly/nuntly-sdk-typescript/blob/main/api.md) | [Website](https://nuntly.com) | [Get your API key](https://nuntly.com/auth/sign-up)

## Table of contents

- [Installation](#installation)
- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Broadcast quick start](#broadcast-quick-start)
- [Configuration](#configuration)
- [Pagination](#pagination)
- [Error handling](#error-handling)
- [Webhook verification](#webhook-verification)
- [Safe mode (error as value)](#safe-mode-error-as-value)
- [Lifecycle hooks](#lifecycle-hooks)
- [Retry configuration](#retry-configuration)
- [Raw response access](#raw-response-access)
- [Per-request options and timeouts](#per-request-options-and-timeouts)
- [More](#more)
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

Sending needs a verified domain: the `from` address must be on a domain you added to Nuntly and verified (see [sending domains](https://nuntly.com/docs/guides/sending-domains)). Until then, a send fails with the `domain_not_verified` error code, or `domain_not_found` for a domain you never added.

## Broadcast quick start

A broadcast sends one template to the contacts of a segment. This script creates a contact in a segment, publishes a template version, then schedules a broadcast:

```typescript
import { Nuntly } from '@nuntly/sdk';

const nuntly = new Nuntly({ apiKey: process.env.NUNTLY_API_KEY });

// A contact in a segment
const contact = await nuntly.contacts.create({ email: 'jane@yourcustomer.com' });
const segment = await nuntly.segments.create({ name: 'Early adopters' });
await nuntly.contacts.segments.add(contact.id, segment.id);

// A template with one published version
const template = await nuntly.templates.create({ name: 'Monthly product update' });
const version = await nuntly.templates.versions.create(template.id, {
  subject: 'What shipped in {{month}}',
  html: '<p>Here is what shipped in {{month}}.</p><p><a href="{{system.unsubscribeUrl}}">Unsubscribe</a></p>',
  variables: [{ name: 'month', type: 'string' }],
});
await nuntly.templates.versions.publish(template.id, version.id);

// A broadcast to the segment, scheduled in one hour
const broadcast = await nuntly.broadcasts.create({
  from: 'Your Company <updates@yourcompany.com>',
  templateId: template.id,
  segmentId: segment.id,
  variables: { month: 'October' },
});
const { status } = await nuntly.broadcasts.send(broadcast.id, {
  scheduledAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
});

console.log(status); // 'scheduled'
```

Leave out `scheduledAt` to send the broadcast right away. A version whose HTML has no `{{system.unsubscribeUrl}}` link cannot be published. The broadcast `from` address needs a verified domain too, or `broadcasts.create` fails with `broadcast_no_eligible_domain`. See the [broadcast guides](https://nuntly.com/docs/guides/broadcast-overview) for segments, topics and unsubscribes.

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
| `timeout` | `number` | `60000` | Timeout of each attempt in milliseconds. `0`, `Infinity` or a value above `2147483647` sets none; a negative or NaN value throws |
| `maxRetries` | `number` | `2` | Number of retry attempts on failure |
| `retry` | `RetryStrategy` | `'backoff'` | Retry strategy: `'backoff'`, `'none'`, or custom backoff config |
| `debug` | `boolean` | `false` | Log HTTP requests and responses |
| `logger` | `Logger` | - | Custom logger (compatible with console, pino, winston) |
| `hooks` | `Hooks` | - | Lifecycle hooks (see [Lifecycle hooks](#lifecycle-hooks)) |
| `fetch` | `typeof fetch` | `globalThis.fetch` | Custom fetch implementation |
| `defaultHeaders` | `Record<string, string>` | - | Headers sent on every request (tenant id, telemetry). Overridden by per-request `headers`. |

`nuntly.withOptions(partial)` returns a new client with some options changed, such as one API key per customer. See [client cloning](https://nuntly.com/docs/api-reference/typescript-sdk#client-cloning).

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
    console.log(error.rawResponse?.status);
    console.log(error.headers.get('x-ratelimit-remaining'));
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
  default:
    console.log(`Unhandled event ${event.type}`);
}
```

`event` is a `WebhookEvent`, one of the event types a webhook delivers. Keep a `default` branch: a webhook only receives the types it subscribes to, so a type added in a later release reaches your handler only once you subscribe to it.

The function throws `WebhookVerificationError` on invalid signatures, timestamps outside the tolerance (default: 5 minutes), or a payload that is not a JSON object.

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

`error` is an `APIError` for an error response, an `APIConnectionError` when no response arrived, or a plain `NuntlyError` when a 2xx body is not the JSON object the SDK expects, when the SDK refuses the call before sending it (an empty, `.` or `..` id, an empty list or a `null` element in a query param, an invalid `timeout`) or when something else, such as one of your hooks, throws a value that is not an SDK error: its `cause` is that value. To use this shape for some calls only, see [safe mode for one call](https://nuntly.com/docs/api-reference/typescript-sdk#safe-mode-for-one-call).

## Lifecycle hooks

Hooks run around each HTTP request, for logging or telemetry:

```typescript
import { Nuntly } from '@nuntly/sdk';

const nuntly = new Nuntly({
  apiKey: process.env.NUNTLY_API_KEY,
  hooks: {
    onRetry: (ctx) => console.warn(`Retry #${ctx.attempt} ${ctx.request.path}`),
    onError: (ctx) => console.error(ctx.error),
  },
});
```

The other hooks are `onRequest`, `onResponse` and `onSuccess`. See [lifecycle hooks](https://nuntly.com/docs/api-reference/typescript-sdk#lifecycle-hooks) for their signatures and order.

## Retry configuration

The SDK retries transient failures with exponential backoff, up to `maxRetries` times:

```typescript
const nuntly = new Nuntly({
  apiKey: process.env.NUNTLY_API_KEY,
  maxRetries: 5,
  retry: { strategy: 'backoff', backoff: { initialInterval: 200, maxInterval: 30000, exponent: 1.5 } },
});
```

Pass `retry: 'none'` to turn retries off. Which responses are retried, and how `Retry-After` and `Idempotency-Key` change it: see [retries](https://nuntly.com/docs/api-reference/typescript-sdk#retries), and [MIGRATION.md](https://github.com/nuntly/nuntly-sdk-typescript/blob/main/MIGRATION.md) for the changes since 1.x.

## Raw response access

Every resource method returns an `APIPromise<T>`, a `Promise<T>` with `.withResponse()` to read the parsed data and the underlying `Response`:

```typescript
const { data, response } = await nuntly.emails.retrieve('em_01ka8k8s80gvx9604cn9am5st4').withResponse();

console.log(data.status);                          // 'delivered'
console.log(response.headers.get('x-request-id')); // request ID
console.log(response.headers.get('x-ratelimit-remaining'));
```

To read the headers without the body, see [`.asResponse()`](https://nuntly.com/docs/api-reference/typescript-sdk#response-headers-without-the-body).

## Per-request options and timeouts

```typescript
await nuntly.emails.send(payload, {
  timeout: 30000,
  maxRetries: 0,
  idempotencyKey: 'unique-key-123',
});
```

The wire header is `Idempotency-Key` (no `X-` prefix). Only the eight methods
whose endpoint deduplicates by key accept `idempotencyKey` (their options type is
`IdempotentRequestOptions`): `emails.send`, `emails.bulk.send`, `messages.reply`,
`messages.forward`, `inboxes.messages.send`, `inboxes.create`,
`broadcasts.create` and `broadcasts.send`. They generate a UUID v4 per call when
you pass none and reuse it across that call's retries. Pass your own value to
deduplicate across processes.

The timeout applies to each attempt, not to the whole call: with the default 2 retries, a call can take about three times the timeout plus the waits between attempts. The default is 60 seconds, and `0` turns it off. Override it for every request in the client options, or per request as above:

```typescript
const nuntly = new Nuntly({
  apiKey: process.env.NUNTLY_API_KEY,
  timeout: 10_000, // 10 seconds
});
```

An attempt that exceeds its timeout aborts. The call rejects with an `APIConnectionTimeoutError` when no retry is left. A failure while reading the response body, such as a timeout or a connection reset mid-body, is not retried. To bound the whole call, pass `signal: AbortSignal.timeout(ms)` in the per-request options.

## More

The [TypeScript SDK docs page](https://nuntly.com/docs/api-reference/typescript-sdk) covers client cloning, every lifecycle hook, the retry rules, aborting a request, debug logging, a custom logger, a custom `fetch`, and HTTP and HTTPS proxies.

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

This SDK follows [Semantic Versioning 2.0](https://semver.org): only a major version breaks the public API, and identifiers prefixed with `_` are internal.

## Previous versions

Versions `0.x` remain installable from npm via `npm install @nuntly/sdk@0` for backwards compatibility.

Upgrading from `1.x` to `2.0.0`, or from `0.x` to `1.0.0`? See [MIGRATION.md](https://github.com/nuntly/nuntly-sdk-typescript/blob/main/MIGRATION.md) for the breaking changes, with before and after code.

## Contributing

Issues, bug reports, and feature requests are welcome at [github.com/nuntly/nuntly-sdk-typescript/issues](https://github.com/nuntly/nuntly-sdk-typescript/issues).

## License

MIT. See [LICENSE](https://github.com/nuntly/nuntly-sdk-typescript/blob/main/LICENSE).
