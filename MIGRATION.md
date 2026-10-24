# Migration guides

## `v1.x` → `v2.0.0`

Eight changes break existing TypeScript code. Everything else in 2.0.0 is additive. The Java SDK, the CLI and the MCP server have their own guides: [Java](https://github.com/nuntly/nuntly-sdk-java/blob/main/MIGRATION.md), [CLI](https://github.com/nuntly/nuntly-cli/blob/main/MIGRATION.md) and [MCP](https://github.com/nuntly/nuntly-mcp/blob/main/MIGRATION.md).

### 1. Organization usage has a new shape

`organizations.usage.retrieve()` returns usage under `email`, with one block per window (`daily`, `monthly`). Each block has the count against the limit, the limit itself (`null` when the window is unlimited), the reset time, and a breakdown by channel, now including broadcasts.

```ts
// before
const usage = await nuntly.organizations.usage.retrieve(orgId);
usage.transactional.usage.daily;
usage.transactional.limits.daily;
usage.transactional.sending.daily;
usage.transactional.receiving.daily;

// after
const { email } = await nuntly.organizations.usage.retrieve(orgId);
email.daily.used; // the sum of every breakdown value
email.daily.limit; // number, or null when unlimited
email.daily.breakdown.transactional.sent;
email.daily.breakdown.transactional.received;
email.daily.breakdown.broadcast.sent;
email.daily.resetsAt;
```

### 2. Agent memory values are typed

`AgentMemory.memory` was typed `Record<string, Record<string, unknown>>`, although the API only stores a string, number, boolean, null, or an array of those. It is now typed with that union, so code that reads a memory value as an object no longer compiles. Narrow the value instead.

```ts
// before: compiled, but the value is never an object at runtime
const tone = record.memory.preferences.tone;

// after
const history = record.memory.history;
const lines = Array.isArray(history) ? history : [];
const tone = typeof record.memory.tone === 'string' ? record.memory.tone : 'neutral';
```

### 3. Agent memory reads as empty

`agents.memory.retrieve()` no longer throws a not-found error when nothing is saved for the agent and scope. It returns an empty memory: `id`, `createdAt` and `updatedAt` are `null`, `memory` is `{}` and `summary` is `null`, with the requested `agentId`, `inboxId` and `threadId`. So `AgentMemory.id`, `createdAt` and `updatedAt` are typed `string | null`, and `updatedAt` is always present. `agents.memory.upsert()` returns the same type, although it always returns a saved record.

```ts
// before
const record = await nuntly.agents.memory.retrieve(agentId, { threadId }).catch(() => null);
const history = record?.memory.history ?? [];

// after: a missing memory reads as empty, other errors still throw
const record = await nuntly.agents.memory.retrieve(agentId, { threadId });
const history = Array.isArray(record.memory.history) ? record.memory.history : [];
const isNew = record.id === null;
```

A not-found error now means the scope is wrong, never that nothing is saved yet:

- `retrieve` and `upsert` answer 404 (`The agent memory you requested does not exist`) when the `inboxId` or `threadId` does not exist in your organization. A write to a memory record that already exists is not checked, so you can still overwrite one whose inbox or thread is gone. Pass a Nuntly thread id, such as the `threadId` of the event: a thread id of your own no longer creates a memory record.
- An empty `inboxId` or `threadId` (`''`) is rejected with a 422. It used to read as "not given". Omit the field instead.
- The `agentId` never causes a not-found error.

These statuses come from the API, so a 1.x SDK sees them too: a read that relied on the not-found error gets the empty memory with `id: null` although its type says `string`.

### 4. `markRead` takes `'true'` or `'false'`

`threads.retrieve()` types `markRead` as `'true' | 'false'` instead of `string`. `{ markRead: 'true' }` keeps working; code that passes a `string` variable must narrow it.

The API now answers 422 to any other `markRead` value, which it used to read as `false`. This comes from the API, so a 1.x SDK sees it too: omit `markRead` or pass `'false'` to leave the unread labels.

```ts
// before: compiled, and any value other than 'true' was read as false
await nuntly.threads.retrieve(threadId, { markRead: String(shouldMarkRead) });

// after
await nuntly.threads.retrieve(threadId, { markRead: shouldMarkRead ? 'true' : 'false' });
```

### 5. Retries and non-JSON errors

These changes apply to the TypeScript SDK and to the CLI and the MCP server, which use it.

- A 409 is retried only when the API sends `x-should-retry: true`, as on `idempotency_key_in_progress` during a keyed send. A Nuntly conflict such as `contact_already_exists` does not resolve on its own, so a retry only delayed the error.
- A 5xx means a 500, a 502, a 503 or a 504; any other 5xx is not retried. The first retry waits 375 to 500 ms.
- A `Retry-After` above 60 s is no longer waited on: the error for that response is thrown at once, with `RateLimitError.retryAfter` set on a 429.
- A `POST` is retried on a 408, a 5xx, a timeout or a network error only when it carries an `Idempotency-Key`, so a retry cannot create a duplicate. `emails.send`, `emails.bulk.send`, `messages.reply`, `messages.forward`, `inboxes.messages.send`, `inboxes.create`, `broadcasts.create` and `broadcasts.send` generate one when you pass none. A 429 is still retried on every `POST`.
- `RequestOptions` no longer has `idempotencyKey`, which every method except those eight ignored. Those eight take `IdempotentRequestOptions`, which adds it, so passing a key to any other method is now a type error instead of a key that is never sent.
- A network error (connection reset, DNS failure) is now retried under the same rules. A request you abort through `signal`, including with `AbortSignal.timeout(...)`, and an error thrown by a hook are never retried.
- An error response that is not JSON, such as a proxy's 502 HTML page or a plain-text 413, throws the `APIError` subclass for its status with the first 200 characters of the raw text as `title`. It used to throw `APIConnectionError` with no status.

### 6. Webhooks use the webhook event types only

`webhooks.create` and `webhooks.update` type `events` as `Array<WebhookEventType>`, the 14 event types a webhook delivers, instead of `Array<EventType>`, all 21 event types. The 7 types that are never delivered by webhook (`email.queued`, `email.scheduled`, `email.processed`, `email.sending`, `email.renderingFailed`, `email.subscribed`, `email.unsubscribed`) are a type error, and the API answers 422 `invalid_body` for them. They used to fail with a 500.

Webhook responses still type `events` with every event type (`Array<EventType | (string & {})>`, see 7), so a webhook that holds one of the 7 types reads back unchanged. To change the subscription, build the list from the webhook event types you want to receive, or leave `events` out to keep the stored list.

```ts
// before
const events: EventType[] = webhook.events;
await nuntly.webhooks.update(webhook.id, { events });

// after
import type { WebhookEventType } from '@nuntly/sdk';
const eligible: WebhookEventType[] = ['email.sent', 'email.delivered'];
await nuntly.webhooks.update(webhook.id, { events: eligible });

// keep the stored list: leave events out
await nuntly.webhooks.update(webhook.id, { name: 'Order events' });
```

`verifyWebhook` returns `WebhookEvent`, the union of the 14 webhook event types, instead of `Event`, which also held the internal `email.queued`, `email.scheduled`, `email.processed` and `email.sending` events. `Event` and the four types `EmailQueuedEvent`, `EmailScheduledEvent`, `EmailProcessedEvent` and `EmailSendingEvent` are removed: no webhook delivers those four events and no SDK call returns them, and the name `Event` shadowed the DOM and Node global. `WebhookEvent`, an alias of `Event` in 1.x, is now this 14-type union: replace each `Event` import with `WebhookEvent`. A `case` for one of those four types in a switch over a verified event is now a type error: remove it. Keep a `default` branch: a webhook only receives the types it subscribes to, so a type added in a later release reaches your handler only once you subscribe to it.

```ts
const event = await verifyWebhook(payload, signatureHeader, secret); // WebhookEvent
switch (event.type) {
  case 'email.delivered':
    console.log(event.data.delivery.recipients);
    break;
  default:
    console.log(`Unhandled event ${event.type}`);
}
```

### 7. Response enums accept values added later

A string enum in a response type, such as `BroadcastResponse.status` or `WebhookResponse.events`, is typed `BroadcastStatus | (string & {})`: the known values still autocomplete, and a value the API adds after this release type-checks instead of contradicting the declared type. Request types keep the closed set, so `webhooks.create({ ..., events: ['email.typo'] })` is still a type error. The named enum types (`BroadcastStatus`, `EventType`, ...) still list only the known values.

The webhook payloads that `verifyWebhook` returns follow the same rule: `BounceDetail.bounceType` and `bounceSubType`, `ComplaintDetail.complaintFeedbackType`, `ClickDetail.isBotEvent` and `OpenDetail.isBotEvent`, `DeliveryDelayDetail.delayType` and `MessageRejectedEventData.reason` accept a value added later. The event `type` keeps the literal of its event, so `switch (event.type)` still narrows the event.

An exhaustive `switch` that ends on `const _: never = status` no longer compiles: handle the unknown case in `default`. Assigning a response value to the named type needs a check first.

```ts
// before: compiled, and a status added later fell through unhandled
const status: BroadcastStatus = broadcast.status;

// after
switch (broadcast.status) {
  case 'sent':
    break;
  default:
    // a status this SDK version does not know yet
}
```

### 8. SDK method names and operation ids

Every OpenAPI `operationId` is now the name its SDK method implies: `nuntly.emails.bulk.send()` is `send-email-bulk`. The routes and the request and response bodies do not change, and neither do the SDK methods, except two:

- `emails.bulk.list(bulkId)` reads one bulk request, not a page, so it is now `emails.bulk.retrieve(bulkId)`.
- `webhooks.events.deliveries(id, eventId)` is now the sub-resource method `webhooks.events.deliveries.list(id, eventId)`, so its `operationId` keeps the 1.x name `list-webhook-event-deliveries`.

The MCP tool names are the same ids: the [MCP migration guide](https://github.com/nuntly/nuntly-mcp/blob/main/MIGRATION.md#tool-names-follow-the-sdk-names) maps every renamed one. The contact property operations, new in 2.0.0, take the OpenAPI path parameter `contactPropertyId` instead of `propertyDefinitionId`, and the topic memberships item type `TopicMembershipExceptionsResponseItem` is now `TopicMembershipsResponseItem`.

Update a client generated from the Nuntly OpenAPI document, whose method names come from the `operationId`. The API reference pages moved with their names; the old URLs redirect.

### New in 2.0.0 (no change needed)

- Broadcast resources: `contacts`, `contactProperties`, `segments`, `topics`, `templates` (with `templates.versions`) and `broadcasts` (with `broadcasts.recipients`).
- `new Nuntly()` takes no argument and reads `NUNTLY_API_KEY`.
- `broadcasts.create`, `broadcasts.send` and `inboxes.create` send an `Idempotency-Key`, generated when you pass none.

### Fixed in 2.0.0

- `verifyWebhook` accepts every signature of the header during a signing secret rotation. Since 1.x it kept only the first one, so the header `t=<ts>,v0=<sigNew>,<sigOld>` failed verification with the previous secret until the rotation ended.
- `.asResponse()` on a failed request returns the error response with its body unread, and the typed error it carries no longer goes unhandled. Since 1.x a 404 left an unhandled `NotFoundError` that exited a Node process, and the body of the returned response was already consumed. Awaiting the promise or `.withResponse()` still throws the typed error.
- A path id equal to `''`, `.` or `..` throws `NuntlyError` before any request is sent, in the SDK and in the CLI and the MCP server, which use it. Since 1.x the URL parser resolved it into another route: `contacts.segments.remove('..', segmentId)` sent `DELETE /segments/{segmentId}` and deleted the segment, and `emails.retrieve('')` listed emails. In safe mode the call resolves to `{ data: null, error }` with that `NuntlyError`, and `SafeResult` now declares it next to `APIError` and `APIConnectionError`.

## `v0.x` → `v1.0.0`

Cheat-sheet for the 6 user-visible breaking areas. All breakage is
intentional and will not be reversed before `1.0.0` stable.

### 1. Errors are flat

```ts
// before
catch (e) {
  if (e instanceof APIError) {
    e.status; e.body.status; e.body.code; e.body.title; e.body.details;
  }
}

// after
catch (e) {
  if (e instanceof APIError) {
    e.status; e.code; e.title; e.details;
  }
}
```

`APIErrorBody`, `Error`, `ErrorResponse` are no longer exported. If
you typed the wire body shape explicitly, use `APIError['code']` etc.

### 2. `APIPromise` for raw `Response` access

```ts
// before
const { data, response } = await nuntly.emails.withResponse(
  nuntly.emails.retrieve('em_01ka8k8s80gvx9604cn9am5st4'),
);

// after
const { data, response } = await nuntly.emails
  .retrieve('em_01ka8k8s80gvx9604cn9am5st4')
  .withResponse();
```

### 3. Structured hook contexts

```ts
// before
hooks: {
  onRequest:  (req: Request) => ...,
  onResponse: (res: Response, req: Request) => ...,
  onSuccess:  (data: unknown, req: Request) => ...,
  onError:    (err: unknown, req: Request) => ...,
}

// after
hooks: {
  onRequest:  (ctx) => log(ctx.method, ctx.path),
  onResponse: (ctx) => log(ctx.request.path, ctx.response.status),
  onSuccess:  (ctx) => log(ctx.data),
  onError:    (ctx) => {
    if (ctx.error instanceof APIError) log(ctx.error.status, ctx.error.code);
  },
}
```

`onSuccess` fires only on 2xx. `onResponse` fires on 2xx + 4xx + 5xx.
`onError` covers 4xx/5xx + network/timeout. `ctx.error` is typed
`APIError | APIConnectionError`; narrow with `instanceof`.

### 4. Renamed response types

| `v0.x` | `v1.0.0` |
|---|---|
| `CreateDomainResponse` | `DomainRecordsResponse` |
| `InboxDetailResponse` | `InboxResponse` |

Same wire shape; only the imported type name changes. `domains.create()`
and `domains.retrieve()` now return the same type; same for inboxes.

### 5. `PATCH` instead of `PUT` on updates

The wire verb moved for two endpoints:

- `PUT /api-keys/:id` → `PATCH /api-keys/:id`
- `PUT /webhooks/:id` → `PATCH /webhooks/:id`

If you call the API directly, update the verb. SDK callers
(`nuntly.apiKeys.update(...)`, `nuntly.webhooks.update(...)`) are
unchanged. The SDK emits `PATCH` automatically. Send at least one
field; an empty body returns `422`.

`UpdateApiKeyRequest.permission` is now optional.

### 6. Event payload shape

Per-event `data` is now `EmailEvent & { variant: VariantDetail }`.
Wire JSON unchanged.

```ts
// before
function handleBounce(evt: EmailBouncedEvent) {
  evt.data.from;
  evt.data.bounce.bounceType;
}

// after. Name and reuse the envelope + variant.
import type { EmailEvent, BounceDetail } from '@nuntly/sdk';

function handleBounce(data: EmailEvent & { bounce: BounceDetail }) {
  data.from;
  data.bounce.bounceType;
}
```

New importable types: `EmailEvent`, `BounceDetail`, `ComplaintDetail`,
`DeliveryDetail`, `DeliveryDelayDetail`, `OpenDetail`, `ClickDetail`,
`RejectDetail`, `FailureDetail`, `InboundEventData`,
`MessageRejectedEventData`.

Discriminated-union narrowing on `evt.type === 'email.bounced'` keeps
working. TypeScript projects through the intersection transparently.

---

Need help? Open an issue with `[migration]` in the title.
