# Migration: `v0.x` → `v1.0.0`

Cheat-sheet for the 6 user-visible breaking areas. All breakage is
intentional and will not be reversed before `1.0.0` stable.

## 1. Errors are flat

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

## 2. `APIPromise` for raw `Response` access

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

## 3. Structured hook contexts

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

## 4. Renamed response types

| `v0.x` | `v1.0.0` |
|---|---|
| `CreateDomainResponse` | `DomainRecordsResponse` |
| `InboxDetailResponse` | `InboxResponse` |

Same wire shape; only the imported type name changes. `domains.create()`
and `domains.retrieve()` now return the same type; same for inboxes.

## 5. `PATCH` instead of `PUT` on updates

The wire verb moved for two endpoints:

- `PUT /api-keys/:id` → `PATCH /api-keys/:id`
- `PUT /webhooks/:id` → `PATCH /webhooks/:id`

If you call the API directly, update the verb. SDK callers
(`nuntly.apiKeys.update(...)`, `nuntly.webhooks.update(...)`) are
unchanged. The SDK emits `PATCH` automatically. Send at least one
field; an empty body returns `422`.

`UpdateApiKeyRequest.permission` is now optional.

## 6. Event payload shape

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
