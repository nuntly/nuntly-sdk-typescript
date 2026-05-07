# API Reference

Complete reference for `@nuntly/sdk`.

## Table of Contents

- [emails](#emails)
  - [emails.stats](#emailsstats)
  - [emails.events](#emailsevents)
  - [emails.content](#emailscontent)
  - [emails.bulk](#emailsbulk)
- [domains](#domains)
- [webhooks](#webhooks)
  - [webhooks.events](#webhooksevents)
- [organizations](#organizations)
  - [organizations.usage](#organizationsusage)
- [inboxes](#inboxes)
  - [inboxes.threads](#inboxesthreads)
  - [inboxes.messages](#inboxesmessages)
- [agents](#agents)
  - [agents.memory](#agentsmemory)
- [threads](#threads)
  - [threads.messages](#threadsmessages)
- [messages](#messages)
  - [messages.content](#messagescontent)
  - [messages.attachments](#messagesattachments)
- [namespaces](#namespaces)
  - [namespaces.inboxes](#namespacesinboxes)
- [apiKeys](#apikeys)

## emails

### `emails.retrieve(id: string, options?: RequestOptions)`

Returns an email with its current delivery status and metadata.

- **HTTP**: `GET /emails/{id}`
- **Returns**: `EmailResponse`

**EmailResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the email |
| `orgId` | `string` | The id of the organization |
| `messageId?` | `string` | The id from email provider |
| `bulkId?` | `string` | The bulk id |
| `from` | `string` | The e-mail address of the sender |
| `to` | `Array<string> | string` | The primary recipient(s) of the email |
| `cc?` | `Array<string> | string` | The carbon copy recipient(s) of the email |
| `bcc?` | `Array<string> | string` | The blind carbon copy recipient(s) of the email |
| `status` | `EmailStatus` | The status of the email. |
| `statusReason?` | `Record<string, Record<string, unknown>>` | May provide more informations about the status |
| `subject` | `string` | The subject of the e-mail |
| `replyTo?` | `Array<string> | string` | The email address where replies should be sent. If a recipient replies, the response will go to this address instead of the sender's email address |
| `headers?` | `Record<string, string>` | The headers to add to the email |
| `tags?` | `Array<{ name: string; value: string }>` | The tags to add to the email |
| `attachments?` | `Array<{ filename?: string; contentType?: string; size?: number }>` | The attachements |
| `variables?` | `Record<string, string | number | boolean | null>` | The variables for the template |
| `scheduledAt?` | `string` | The date at which the email is scheduled to be sent |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |

### `emails.list(query?: CursorPageParams, options?: RequestOptions)`

Returns sent emails ordered by submission date, newest first.

- **HTTP**: `GET /emails`
- **Returns**: `CursorPage<EmailsResponseItem>`
- **Paginated**: yes

**EmailsResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the email |
| `from` | `string` | The e-mail address of the sender |
| `to` | `Array<string> | string` | The primary recipient(s) of the email |
| `subject` | `string` | The subject of the e-mail |
| `status` | `EmailStatus` | The status of the email. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `scheduledAt?` | `string` | The date at which the email is scheduled to be sent |

### `emails.send(body: CreateEmailRequest, options?: RequestOptions)`

Send transactional emails through Nuntly platform. It supports HTML and plain-text emails, attachments, labels, custom headers and scheduling.

- **HTTP**: `POST /emails`
- **Returns**: `CreateEmailResponse`

**CreateEmailRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `from` | `string` | The e-mail address of the sender |
| `to` | `Array<string> | string` | The primary recipient(s) of the email |
| `cc?` | `Array<string> | string` | The carbon copy recipient(s) of the email |
| `bcc?` | `Array<string> | string` | The blind carbon copy recipient(s) of the email |
| `replyTo?` | `Array<string> | string` | The email address where replies should be sent. If a recipient replies, the response will go to this address instead of the sender's email address |
| `subject` | `string` | The subject of the e-mail |
| `text?` | `string` | The plaintext version of the email |
| `html?` | `string` | The HTML version of the email |
| `headers?` | `Record<string, string>` | The headers to add to the email |
| `tags?` | `Array<{ name: string; value: string }>` | The tags to add to the email |
| `attachments?` | `Array<{ content: string; filename?: string; contentType?: string }>` | The attachements to add to the email |
| `variables?` | `Record<string, string | number | boolean | null>` | The variables for the template |
| `scheduledAt?` | `string` | The date at which the email is scheduled to be sent |

**CreateEmailResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the email |
| `status` | `EmailStatus` | The status of the email. |

### `emails.cancel(id: string, options?: RequestOptions)`

Cancel a scheduled email before delivery. Only emails with `scheduled` status can be cancelled.

- **HTTP**: `DELETE /emails/{id}`
- **Returns**: `DeleteEmailResponse`

**DeleteEmailResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the email |
| `status` | `EmailStatus` | The status of the email. |

## emails.stats

### `emails.stats.retrieve(options?: RequestOptions)`

Returns aggregated daily sending statistics for the current period.

- **HTTP**: `GET /emails/stats`
- **Returns**: `EmailsStatsResponse`

**EmailsStatsResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `start` | `string` | The start date of the stats range |
| `end` | `string` | The end date of the stats range |
| `stats` | `Array<{ occurredOn: string; queued: number; scheduled: number; processed: number; sending: number; sent: number; delivered: number; deliveredDelayed: number; bounced: number; failed: number; rejected: number; canceled: number; complaintReceived: number; renderingFailed: number; opened: number; uniqueOpened: number; clicked: number; uniqueClicked: number }>` |  |

## emails.events

### `emails.events.list(id: string, options?: RequestOptions)`

Returns the full delivery event history for an email (sent, delivered, opened, bounced, etc.).

- **HTTP**: `GET /emails/{id}/events`
- **Returns**: `EmailEventsResponse`

## emails.content

### `emails.content.retrieve(id: string, options?: RequestOptions)`

Returns presigned URLs to download the HTML, plain-text, and raw MIME source of a sent email.

- **HTTP**: `GET /emails/{id}/content`
- **Returns**: `EmailContentResponse`

**EmailContentResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `html` | `{ downloadUrl: string; size: number | null; expiresAt: string } | null` | HTML content, or `null` if unavailable. |
| `text` | `{ downloadUrl: string; size: number | null; expiresAt: string } | null` | Plain text content, or `null` if unavailable. |
| `mime` | `{ downloadUrl: string; size: number | null; expiresAt: string } | null` | Raw MIME (.eml) content, or `null` if unavailable. |
| `subjectTemplate` | `{ downloadUrl: string; size: number | null; expiresAt: string } | null` | Subject template content, or `null` if unavailable. Returned for failed emails only. |
| `htmlTemplate` | `{ downloadUrl: string; size: number | null; expiresAt: string } | null` | HTML template content, or `null` if unavailable. Returned for failed emails only. |
| `textTemplate` | `{ downloadUrl: string; size: number | null; expiresAt: string } | null` | Text template content, or `null` if unavailable. Returned for failed emails only. |

## emails.bulk

### `emails.bulk.send(body: CreateBulkEmailsRequest, options?: RequestOptions)`

Send up to 20 emails in a single request. Use `fallback` to set default values shared across all messages.

- **HTTP**: `POST /emails/bulk`
- **Returns**: `CreateBulkEmailsResponse`

**CreateBulkEmailsRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `fallback?` | `{ from?: string; to?: Array<string> | string; cc?: Array<string> | string; bcc?: Array<string> | string; replyTo?: Array<string> | string; subject?: string; text?: string; html?: string; headers?: Record<string, string>; tags?: Array<{ name: string; value: string }>; variables?: Record<string, string | number | boolean | null>; scheduledAt?: string }` | Used as a fallback field email value if no value is present in emails |
| `emails` | `Array<{ from?: string; to?: Array<string> | string; cc?: Array<string> | string; bcc?: Array<string> | string; replyTo?: Array<string> | string; subject?: string; text?: string; html?: string; headers?: Record<string, string>; tags?: Array<{ name: string; value: string }>; variables?: Record<string, string | number | boolean | null>; scheduledAt?: string }>` | The bulk emails to send |

**CreateBulkEmailsResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id?` | `string` | The bulk id |
| `emails` | `Array<{ id?: string; status: EmailStatus }>` |  |

### `emails.bulk.list(bulkId: string, options?: RequestOptions)`

Returns the delivery status of all emails submitted in a bulk request.

- **HTTP**: `GET /emails/bulk/{bulkId}`
- **Returns**: `BulkEmailsResponse`

**BulkEmailsResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` |  |
| `emails` | `Array<{ id: string; status: EmailStatus; detail?: string }>` |  |

## domains

### `domains.list(query?: CursorPageParams, options?: RequestOptions)`

Returns all domains with their verification and capability status.

- **HTTP**: `GET /domains`
- **Returns**: `CursorPage<DomainsResponseItem>`
- **Paginated**: yes

**DomainsResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the domain |
| `name` | `string` | The name of the domain to send e-mails' |
| `status` | `DomainStatus` | The status for the domain |
| `sendingStatus` | `'enabled' | 'disabled' | 'paused'` | The sending status for the domain |
| `receivingStatus` | `DomainStatus` | The receiving status for the domain |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `region` | `'eu-west-1'` | The region of the domain data |

### `domains.retrieve(id: string, options?: RequestOptions)`

Returns a domain with its DNS record configuration and current verification status for each record.

- **HTTP**: `GET /domains/{id}`
- **Returns**: `DomainRecordsResponse`

**DomainRecordsResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the domain |
| `name` | `string` | The name of the domain to send e-mails' |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `status` | `DomainStatus` | The status for the domain |
| `region` | `'eu-west-1'` | The region of the domain data |
| `statusAt` | `string` | The date of the lastest verification of this record |
| `sending` | `boolean` | Whether sending is enabled for the domain |
| `receiving` | `boolean` | Whether receiving is enabled for the domain |
| `sendingStatus` | `'enabled' | 'disabled' | 'paused'` | The sending status for the domain |
| `sendingStatusAt` | `string` | The date of the latest sending status change |
| `receivingStatus` | `DomainStatus` | The receiving status for the domain |
| `receivingStatusAt` | `string` | The date of the latest receiving status change |
| `openTracking` | `boolean` | Emit an event for each recipient opens an email their email client |
| `clickTracking` | `boolean` | Emit an event for each time the recipient clicks a link in the email |
| `records` | `Array<{ name: string; fullname: string; recordType: 'TXT' | 'MX' | 'CNAME'; ttl: string; group: 'DKIM' | 'SPF' | 'MX' | 'DMARC' | 'MX_RECEIVING'; selector?: string; priority?: string; value: string; status: DomainStatus; statusAt: string }>` | The DNS records for your domain. |

### `domains.delete(id: string, options?: RequestOptions)`

Permanently deletes a domain along with its inboxes, received messages, attachments, and sending configuration. This action is irreversible.

- **HTTP**: `DELETE /domains/{id}`
- **Returns**: `DeleteDomainResponse`

**DeleteDomainResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the domain |

### `domains.create(body: CreateDomainRequest, options?: RequestOptions)`

Add a domain to start configuring DNS records for sending or receiving emails.

- **HTTP**: `POST /domains`
- **Returns**: `CreateDomainResponse`

**CreateDomainRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name` | `string` | The name of the domain to send e-mails' |
| `sending?` | `boolean` | Enable sending |
| `receiving?` | `boolean` | Enable receiving |

**CreateDomainResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the domain |
| `name` | `string` | The name of the domain to send e-mails' |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `status` | `DomainStatus` | The status for the domain |
| `region` | `'eu-west-1'` | The region of the domain data |
| `statusAt` | `string` | The date of the lastest verification of this record |
| `sending` | `boolean` | Whether sending is enabled for the domain |
| `receiving` | `boolean` | Whether receiving is enabled for the domain |
| `sendingStatus` | `'enabled' | 'disabled' | 'paused'` | The sending status for the domain |
| `sendingStatusAt` | `string` | The date of the latest sending status change |
| `receivingStatus` | `DomainStatus` | The receiving status for the domain |
| `receivingStatusAt` | `string` | The date of the latest receiving status change |
| `openTracking` | `boolean` | Emit an event for each recipient opens an email their email client |
| `clickTracking` | `boolean` | Emit an event for each time the recipient clicks a link in the email |
| `records` | `Array<{ name: string; fullname: string; recordType: 'TXT' | 'MX' | 'CNAME'; ttl: string; group: 'DKIM' | 'SPF' | 'MX' | 'DMARC' | 'MX_RECEIVING'; selector?: string; priority?: string; value: string; status: DomainStatus; statusAt: string }>` | The DNS records for your domain. |

### `domains.update(id: string, body: UpdateDomainRequest, options?: RequestOptions)`

Toggle sending, receiving, open tracking, or click tracking capabilities for a domain.

- **HTTP**: `PATCH /domains/{id}`
- **Returns**: `UpdateDomainResponse`

**UpdateDomainRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `openTracking?` | `boolean` | Emit an event for each recipient opens an email their email client |
| `clickTracking?` | `boolean` | Emit an event for each time the recipient clicks a link in the email |
| `sending?` | `boolean` | Enable or disable sending |
| `receiving?` | `boolean` | Enable or disable receiving |

**UpdateDomainResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the domain |
| `openTracking` | `boolean` | Emit an event for each recipient opens an email their email client |
| `clickTracking` | `boolean` | Emit an event for each time the recipient clicks a link in the email |

## webhooks

### `webhooks.retrieve(id: string, options?: RequestOptions)`

Returns a webhook endpoint with its URL, subscribed events, and configuration.

- **HTTP**: `GET /webhooks/{id}`
- **Returns**: `WebhookResponse`

**WebhookResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the webhook |
| `name?` | `string` | The name of the webhook |
| `endpointUrl` | `string` | The endpoint URL of the webhook |
| `events` | `Array<EventType>` | The event types to subscribe to |
| `status` | `'enabled' | 'disabled' | 'revoked'` | The status of the webhook. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |

### `webhooks.update(id: string, body: UpdateWebhookRequest, options?: RequestOptions)`

Update the endpoint URL, subscribed event types, or rotate the signing secret.

- **HTTP**: `PUT /webhooks/{id}`
- **Returns**: `UpdateWebhookResponse`

**UpdateWebhookRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name?` | `string` | The name of the webhook |
| `endpointUrl?` | `string` | The endpoint URL of the webhook |
| `events?` | `Array<EventType>` | The event types to subscribe to |
| `status?` | `'enabled' | 'disabled' | 'revoked'` | The status of the webhook. |
| `rotateSecret?` | `boolean` | If true, a new signing secret will be generated |

**UpdateWebhookResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the webhook |
| `signingSecret?` | `string` | The signing secret of the webhook. |

### `webhooks.delete(id: string, options?: RequestOptions)`

Remove a webhook endpoint. No further events will be delivered to this URL.

- **HTTP**: `DELETE /webhooks/{id}`
- **Returns**: `DeleteWebhookResponse`

**DeleteWebhookResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the webhook |

### `webhooks.create(body: CreateWebhookRequest, options?: RequestOptions)`

Register an endpoint to start receiving webhook events for your organization.

- **HTTP**: `POST /webhooks`
- **Returns**: `CreateWebhookResponse`

**CreateWebhookRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name?` | `string` | The name of the webhook |
| `endpointUrl` | `string` | The endpoint URL of the webhook |
| `status?` | `'enabled' | 'disabled' | 'revoked'` | The status of the webhook. |
| `events` | `Array<EventType>` | The event types to subscribe to |

**CreateWebhookResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the webhook |
| `name?` | `string` | The name of the webhook |
| `endpointUrl` | `string` | The endpoint URL of the webhook |
| `status` | `'enabled' | 'disabled' | 'revoked'` | The status of the webhook. |
| `events` | `Array<EventType>` | The event types to subscribe to |
| `signingSecret` | `string` | The signing secret of the webhook. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |

### `webhooks.list(query?: CursorPageParams, options?: RequestOptions)`

Returns all registered webhook endpoints for the organization.

- **HTTP**: `GET /webhooks`
- **Returns**: `CursorPage<WebhooksResponseItem>`
- **Paginated**: yes

**WebhooksResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the webhook |
| `name?` | `string` | The name of the webhook |
| `endpointUrl` | `string` | The endpoint URL of the webhook |
| `status` | `'enabled' | 'disabled' | 'revoked'` | The status of the webhook. |
| `events` | `Array<EventType>` | The event types to subscribe to |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |

## webhooks.events

### `webhooks.events.list(query?: CursorPageParams, options?: RequestOptions)`

Returns recent webhook events across all registered endpoints.

- **HTTP**: `GET /webhooks/events`
- **Returns**: `CursorPage<WebhookEventsResponseItem>`
- **Paginated**: yes

**WebhookEventsResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the webhook event |
| `webhookId` | `string` | The id of the webhook |
| `orgId` | `string` | The id of the organization |
| `event` | `EventType` | An event |
| `successfulAt?` | `string` | The timestamp when the event was successfully delivered to the endpoint |
| `data` | `Record<string, Record<string, unknown>>` |  |
| `status` | `'success' | 'pending' | 'failed'` | Status of the webhook delivery attempt |

### `webhooks.events.replay(id: string, eventId: string, options?: RequestOptions)`

Re-deliver a webhook event to its endpoint. Useful for retrying failed deliveries.

- **HTTP**: `POST /webhooks/{id}/events/{eventId}/replay`
- **Returns**: `void`

### `webhooks.events.deliveries(id: string, eventId: string, options?: RequestOptions)`

Returns all delivery attempts for a webhook event, including HTTP status codes and response times.

- **HTTP**: `GET /webhooks/{id}/events/{eventId}/deliveries`
- **Returns**: `WebhookEventDeliveriesResponse`

## organizations

### `organizations.list(query?: CursorPageParams, options?: RequestOptions)`

Returns all organizations the authenticated user belongs to.

- **HTTP**: `GET /organizations`
- **Returns**: `CursorPage<OrganizationsResponseItem>`
- **Paginated**: yes

**OrganizationsResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the organization |
| `name` | `string` | The name of the organization |
| `status` | `'enabled' | 'disabled'` | The status of the organization |

### `organizations.retrieve(id: string, options?: RequestOptions)`

Returns the organization's profile, plan, region, and account status.

- **HTTP**: `GET /organizations/{id}`
- **Returns**: `OrganizationResponse`

**OrganizationResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the organization |
| `name` | `string` | The name of the organization |
| `status` | `'enabled' | 'disabled'` | The status of the organization |

## organizations.usage

### `organizations.usage.retrieve(id: string, options?: RequestOptions)`

Returns current period usage metrics (daily and monthly) for sending and receiving, against your plan limits.

- **HTTP**: `GET /organizations/{id}/usage`
- **Returns**: `OrganizationUsageResponse`

**OrganizationUsageResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `transactional` | `{ limits: { daily: number; monthly: number }; usage: { daily: number; monthly: number }; sending: { daily: number; monthly: number }; receiving: { daily: number; monthly: number } }` |  |

## inboxes

### `inboxes.create(body: CreateInboxRequest, options?: RequestOptions)`

Create a new inbox on a verified domain.

- **HTTP**: `POST /inboxes`
- **Returns**: `InboxResponse`

**CreateInboxRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `domainId?` | `string` | The id of the domain for this inbox. Defaults to your provided domain when omitted. |
| `address` | `string` | The local-part of the email address (before the @). |
| `name?` | `string` | The display name of the inbox. |
| `namespaceId?` | `string` | The id of the namespace to assign the inbox to. |
| `agentId?` | `string` | The external AI agent identifier. |

**InboxResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the inbox |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt?` | `string` | Date at which the object was updated (ISO 8601 format) |
| `domainId` | `string` | The id of the domain. |
| `domainName` | `string` | The domain name. |
| `address` | `string` | The local-part of the email address. |
| `name` | `string | null` | The display name of the inbox. |
| `namespaceId` | `string | null` | The id of the namespace. |
| `namespaceName` | `string | null` | The display name of the namespace. |
| `agentId` | `string | null` | The AI agent identifier. |

### `inboxes.list(query?: InboxesQuery, options?: RequestOptions)`

List all inboxes.

- **HTTP**: `GET /inboxes`
- **Returns**: `CursorPage<InboxesResponseItem>`
- **Paginated**: yes

**InboxesResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the inbox |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt?` | `string` | Date at which the object was updated (ISO 8601 format) |
| `domainId` | `string` | The id of the domain. |
| `domainName` | `string` | The domain name. |
| `address` | `string` | The local-part of the email address. |
| `name` | `string | null` | The display name of the inbox. |
| `namespaceId` | `string | null` | The id of the namespace. |
| `namespaceName` | `string | null` | The display name of the namespace. |
| `agentId` | `string | null` | The AI agent identifier. |

### `inboxes.retrieve(inboxId: string, options?: RequestOptions)`

Retrieve an inbox with thread stats.

- **HTTP**: `GET /inboxes/{inboxId}`
- **Returns**: `InboxDetailResponse`

**InboxDetailResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the inbox |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt?` | `string` | Date at which the object was updated (ISO 8601 format) |
| `domainId` | `string` | The id of the domain. |
| `domainName` | `string` | The domain name. |
| `address` | `string` | The local-part of the email address. |
| `name` | `string | null` | The display name of the inbox. |
| `namespaceId` | `string | null` | The id of the namespace. |
| `namespaceName` | `string | null` | The display name of the namespace. |
| `agentId` | `string | null` | The AI agent identifier. |

### `inboxes.update(inboxId: string, body: UpdateInboxRequest, options?: RequestOptions)`

Update an inbox.

- **HTTP**: `PATCH /inboxes/{inboxId}`
- **Returns**: `IdResponse`

**UpdateInboxRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name?` | `string | null` | The display name of the inbox. |

**IdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the resource. |

### `inboxes.delete(inboxId: string, options?: RequestOptions)`

Soft-delete an inbox.

- **HTTP**: `DELETE /inboxes/{inboxId}`
- **Returns**: `IdResponse`

**IdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the resource. |

## inboxes.threads

### `inboxes.threads.list(inboxId: string, query?: ThreadsQuery, options?: RequestOptions)`

List threads in an inbox.

- **HTTP**: `GET /inboxes/{inboxId}/threads`
- **Returns**: `CursorPage<ThreadsResponseItem>`
- **Paginated**: yes

**ThreadsResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the thread |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt?` | `string` | Date at which the object was updated (ISO 8601 format) |
| `domainId` | `string | null` | The id of the domain. |
| `domainName` | `string` | The domain name. |
| `inboxId` | `string` | The id of the inbox. |
| `subject` | `string` | The original subject line. |
| `lastMessageAt` | `string` | The timestamp of the most recent message. |
| `messageCount` | `number` | The number of messages in the thread. |
| `labels` | `Array<string>` | Aggregated labels from all messages in the thread. |
| `agentId` | `string | null` | The AI agent identifier. |

## inboxes.messages

### `inboxes.messages.send(inboxId: string, body: SendMessageRequest, options?: RequestOptions)`

Send a new message from an inbox.

- **HTTP**: `POST /inboxes/{inboxId}/messages`
- **Returns**: `SendMessageResponse`

**SendMessageRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `to` | `Array<string>` | The recipient addresses. |
| `cc?` | `Array<string>` | The CC addresses. |
| `bcc?` | `Array<string>` | The BCC addresses. |
| `subject` | `string` | The message subject. |
| `text?` | `string` | The plain text body. |
| `html?` | `string` | The HTML body. |

**SendMessageResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the message |
| `threadId` | `string` | The id of the thread. |
| `messageId` | `string` | The RFC 5322 Message-ID header. |
| `subject` | `string` | The subject of the message. |

## agents

## agents.memory

### `agents.memory.retrieve(agentId: string, options?: RequestOptions)`

Retrieve the memory for an AI agent.

- **HTTP**: `GET /agents/{agentId}/memory`
- **Returns**: `AgentMemory`

**AgentMemory**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The agent memory record id. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt?` | `string` | Date at which the object was updated (ISO 8601 format) |
| `agentId` | `string` | The agent identifier. |
| `inboxId` | `string | null` | The inbox id. |
| `threadId` | `string | null` | The thread id. |
| `memory` | `Record<string, Record<string, unknown>>` | The agent memory data. |
| `summary` | `string | null` | The conversation summary. |

### `agents.memory.upsert(agentId: string, body: AgentMemoryRequest, options?: RequestOptions)`

Create or update the memory for an AI agent.

- **HTTP**: `PUT /agents/{agentId}/memory`
- **Returns**: `AgentMemory`

**AgentMemoryRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `inboxId?` | `string` | The inbox id to scope the memory to. |
| `threadId?` | `string` | The thread id to scope the memory to. |
| `memory` | `Record<string, string | number | boolean | null | Array<string | number | boolean | null>>` | The agent memory key-value data. |
| `summary?` | `string | null` | A human-readable conversation summary. |

**AgentMemory**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The agent memory record id. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt?` | `string` | Date at which the object was updated (ISO 8601 format) |
| `agentId` | `string` | The agent identifier. |
| `inboxId` | `string | null` | The inbox id. |
| `threadId` | `string | null` | The thread id. |
| `memory` | `Record<string, Record<string, unknown>>` | The agent memory data. |
| `summary` | `string | null` | The conversation summary. |

## threads

### `threads.retrieve(threadId: string, options?: RequestOptions)`

Retrieve a thread. Pass ?markRead=true to automatically remove the unread label from all messages.

- **HTTP**: `GET /threads/{threadId}`
- **Returns**: `ThreadResponse`

**ThreadResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the thread |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt?` | `string` | Date at which the object was updated (ISO 8601 format) |
| `domainId` | `string | null` | The id of the domain. |
| `domainName` | `string` | The domain name. |
| `inboxId` | `string` | The id of the inbox. |
| `subject` | `string` | The original subject line. |
| `lastMessageAt` | `string` | The timestamp of the most recent message. |
| `messageCount` | `number` | The number of messages in the thread. |
| `labels` | `Array<string>` | Aggregated labels from all messages in the thread. |
| `agentId` | `string | null` | The AI agent identifier. |

### `threads.update(threadId: string, body: UpdateThreadRequest, options?: RequestOptions)`

Update thread labels and agent assignment. Label operations apply to all messages in the thread.

- **HTTP**: `PATCH /threads/{threadId}`
- **Returns**: `IdResponse`

**UpdateThreadRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `addLabels?` | `Array<string>` | Labels to add to all messages in the thread. |
| `removeLabels?` | `Array<string>` | Labels to remove from all messages in the thread. |
| `agentId?` | `string | null` | The AI agent identifier. |

**IdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the resource. |

## threads.messages

### `threads.messages.list(threadId: string, query?: CursorPageParams, options?: RequestOptions)`

List messages in a thread (chronological order).

- **HTTP**: `GET /threads/{threadId}/messages`
- **Returns**: `CursorPage<ThreadMessagesResponseItem>`
- **Paginated**: yes

**ThreadMessagesResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the message |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `threadId` | `string` | The id of the thread. |
| `messageId` | `string` | The email Message-ID header. |
| `from` | `string` | The sender address (RFC 5322 format, e.g. "Jane Doe <jane@example.com>" or "jane@example.com"). |
| `to` | `Array<string>` | The recipient addresses. |
| `cc` | `Array<string> | null` | The CC addresses. |
| `bcc` | `Array<string> | null` | The BCC addresses. |
| `replyTo` | `Array<string> | null` | The Reply-To addresses. |
| `subject` | `string` | The message subject. |
| `receivedAt` | `string` | The original date of the message. |
| `status` | `'received' | 'sent' | 'discarded' | 'failed'` | The status of the message |
| `labels` | `Array<string>` | The message labels. |
| `attachmentCount` | `number` | The number of attachments. |

## messages

### `messages.list(query?: MessagesQuery, options?: RequestOptions)`

List all received messages across inboxes.

- **HTTP**: `GET /messages`
- **Returns**: `CursorPage<MessagesResponseItem>`
- **Paginated**: yes

**MessagesResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the message |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `inboxId` | `string | null` | The id of the inbox, or null if routed to the default catch-all. |
| `threadId` | `string` | The id of the thread. |
| `messageId` | `string` | The email Message-ID header. |
| `from` | `string` | The sender address (RFC 5322 format, e.g. "Jane Doe <jane@example.com>" or "jane@example.com"). |
| `to` | `Array<string>` | The recipient addresses. |
| `cc` | `Array<string> | null` | The CC addresses. |
| `bcc` | `Array<string> | null` | The BCC addresses. |
| `replyTo` | `Array<string> | null` | The Reply-To addresses. |
| `subject` | `string` | The message subject. |
| `receivedAt` | `string` | The original date of the message. |
| `status` | `'received' | 'sent' | 'discarded' | 'failed'` | The status of the message |
| `labels` | `Array<string>` | The message labels. |
| `attachmentCount` | `number` | The number of attachments. |

### `messages.retrieve(messageId: string, options?: RequestOptions)`

Retrieve a single message with inbox enrichment.

- **HTTP**: `GET /messages/{messageId}`
- **Returns**: `MessageResponse`

**MessageResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the message |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `inboxId` | `string | null` | The id of the inbox, or null if routed to the default catch-all. |
| `threadId` | `string` | The id of the thread. |
| `messageId` | `string` | The email Message-ID header. |
| `from` | `string` | The sender address (RFC 5322 format, e.g. "Jane Doe <jane@example.com>" or "jane@example.com"). |
| `to` | `Array<string>` | The recipient addresses. |
| `cc` | `Array<string> | null` | The CC addresses. |
| `bcc` | `Array<string> | null` | The BCC addresses. |
| `replyTo` | `Array<string> | null` | The Reply-To addresses. |
| `subject` | `string` | The message subject. |
| `receivedAt` | `string` | The original date of the message. |
| `status` | `'received' | 'sent' | 'discarded' | 'failed'` | The status of the message |
| `labels` | `Array<string>` | The message labels. |
| `attachmentCount` | `number` | The number of attachments. |
| `headers` | `Record<string, string> | null` | The raw email headers. |

### `messages.update(messageId: string, body: UpdateMessageRequest, options?: RequestOptions)`

Update message labels. Only available for messages in user-created inboxes.

- **HTTP**: `PATCH /messages/{messageId}`
- **Returns**: `IdResponse`

**UpdateMessageRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `addLabels?` | `Array<string>` | Labels to add to the message. |
| `removeLabels?` | `Array<string>` | Labels to remove from the message. |

**IdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the resource. |

### `messages.reply(messageId: string, body: ReplyMessageRequest, options?: RequestOptions)`

Reply to a message. Set replyAll to true to reply to all recipients.

- **HTTP**: `POST /messages/{messageId}/reply`
- **Returns**: `SendMessageResponse`

**ReplyMessageRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `text?` | `string` | The plain text body. |
| `html?` | `string` | The HTML body. |
| `replyAll` | `boolean` | Whether to reply to all recipients. |

**SendMessageResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the message |
| `threadId` | `string` | The id of the thread. |
| `messageId` | `string` | The RFC 5322 Message-ID header. |
| `subject` | `string` | The subject of the message. |

### `messages.forward(messageId: string, body: ForwardMessageRequest, options?: RequestOptions)`

Forward a message to new recipients.

- **HTTP**: `POST /messages/{messageId}/forward`
- **Returns**: `SendMessageResponse`

**ForwardMessageRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `to` | `Array<string>` | The recipient addresses to forward to. |
| `text?` | `string` | An optional comment to prepend. |

**SendMessageResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the message |
| `threadId` | `string` | The id of the thread. |
| `messageId` | `string` | The RFC 5322 Message-ID header. |
| `subject` | `string` | The subject of the message. |

## messages.content

### `messages.content.retrieve(messageId: string, options?: RequestOptions)`

Returns presigned URLs to download the HTML, plain-text, and raw MIME source of a received message.

- **HTTP**: `GET /messages/{messageId}/content`
- **Returns**: `MessageContent`

**MessageContent**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `text` | `{ downloadUrl: string; size: number | null; expiresAt: string } | null` | Plain text content, or `null` if not requested or unavailable. |
| `html` | `{ downloadUrl: string; size: number | null; expiresAt: string } | null` | HTML content, or `null` if not requested or unavailable. |
| `mime` | `{ downloadUrl: string; size: number | null; expiresAt: string } | null` | Raw MIME (.eml) content, or `null` if not requested or unavailable. Returned for received messages only. |

## messages.attachments

### `messages.attachments.list(messageId: string, options?: RequestOptions)`

List all attachments for a message.

- **HTTP**: `GET /messages/{messageId}/attachments`
- **Returns**: `AttachmentsResponse`

### `messages.attachments.retrieve(messageId: string, attachmentId: string, options?: RequestOptions)`

Retrieve an attachment with a presigned download URL.

- **HTTP**: `GET /messages/{messageId}/attachments/{attachmentId}`
- **Returns**: `AttachmentResponse`

**AttachmentResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the attachment |
| `filename` | `string | null` | The original filename. |
| `contentType` | `string` | The MIME content type. |
| `size` | `number` | The size in bytes. |
| `contentDisposition` | `string | null` | The content disposition (inline or attachment). |
| `contentId` | `string | null` | The CID for inline images. |
| `downloadUrl?` | `string` | Presigned download URL (included when retrieving a single attachment). |

## namespaces

### `namespaces.create(body: CreateNamespaceRequest, options?: RequestOptions)`

Create a new namespace.

- **HTTP**: `POST /namespaces`
- **Returns**: `NamespaceResponse`

**CreateNamespaceRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name` | `string` | The display name of the namespace. |
| `externalId?` | `string` | An optional external identifier for the namespace. |

**NamespaceResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the namespace |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt?` | `string` | Date at which the object was updated (ISO 8601 format) |
| `name` | `string` | The display name of the namespace. |
| `externalId` | `string | null` | The external identifier for the namespace. |

### `namespaces.list(query?: NamespacesQuery, options?: RequestOptions)`

List all namespaces.

- **HTTP**: `GET /namespaces`
- **Returns**: `CursorPage<NamespacesResponseItem>`
- **Paginated**: yes

**NamespacesResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the namespace |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt?` | `string` | Date at which the object was updated (ISO 8601 format) |
| `name` | `string` | The display name of the namespace. |
| `externalId` | `string | null` | The external identifier for the namespace. |

### `namespaces.retrieve(namespaceId: string, options?: RequestOptions)`

Retrieve a namespace with inbox stats.

- **HTTP**: `GET /namespaces/{namespaceId}`
- **Returns**: `NamespaceDetail`

**NamespaceDetail**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the namespace |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt?` | `string` | Date at which the object was updated (ISO 8601 format) |
| `name` | `string` | The display name of the namespace. |
| `externalId` | `string | null` | The external identifier for the namespace. |
| `inboxCount` | `number` | The total number of inboxes in this namespace. |
| `activeInboxCount` | `number` | The number of active inboxes in this namespace. |

### `namespaces.update(namespaceId: string, body: UpdateNamespaceRequest, options?: RequestOptions)`

Update a namespace.

- **HTTP**: `PATCH /namespaces/{namespaceId}`
- **Returns**: `IdResponse`

**UpdateNamespaceRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name?` | `string` | The display name of the namespace. |
| `externalId?` | `string | null` | An optional external identifier for the namespace. |

**IdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the resource. |

### `namespaces.delete(namespaceId: string, options?: RequestOptions)`

Soft-delete a namespace. Rejects if it has active inboxes.

- **HTTP**: `DELETE /namespaces/{namespaceId}`
- **Returns**: `IdResponse`

**IdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the resource. |

## namespaces.inboxes

### `namespaces.inboxes.list(namespaceId: string, query?: NamespaceInboxesQuery, options?: RequestOptions)`

List inboxes in a namespace.

- **HTTP**: `GET /namespaces/{namespaceId}/inboxes`
- **Returns**: `CursorPage<InboxesResponseItem>`
- **Paginated**: yes

**InboxesResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the inbox |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt?` | `string` | Date at which the object was updated (ISO 8601 format) |
| `domainId` | `string` | The id of the domain. |
| `domainName` | `string` | The domain name. |
| `address` | `string` | The local-part of the email address. |
| `name` | `string | null` | The display name of the inbox. |
| `namespaceId` | `string | null` | The id of the namespace. |
| `namespaceName` | `string | null` | The display name of the namespace. |
| `agentId` | `string | null` | The AI agent identifier. |

## apiKeys

### `apiKeys.retrieve(id: string, options?: RequestOptions)`

Returns API key metadata. The key value is never returned after creation.

- **HTTP**: `GET /api-keys/{id}`
- **Returns**: `ApiKeyResponse`

**ApiKeyResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the api key |
| `name?` | `string` | The name of the api key |
| `shortToken` | `string` | The last 6 characters of the api key token |
| `status` | `'enabled' | 'disabled' | 'revoked'` | The status for the api key |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |

### `apiKeys.update(id: string, body: UpdateApiKeyRequest, options?: RequestOptions)`

Update the key name, permissions, or restrict it to specific sending domains.

- **HTTP**: `PUT /api-keys/{id}`
- **Returns**: `UpdateApiKeyResponse`

**UpdateApiKeyRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name?` | `string` | The name of the api key |
| `status?` | `'enabled' | 'disabled'` |  |
| `permission` | `'fullAccess' | 'sendingAccess'` | The permission type for the api key |
| `domainIds?` | `Array<string>` | The domain ids to restrict the api key to (only for sendingAccess) |

**UpdateApiKeyResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the api key |

### `apiKeys.delete(id: string, options?: RequestOptions)`

Revoke an API key. Requests authenticating with this key will be rejected immediately.

- **HTTP**: `DELETE /api-keys/{id}`
- **Returns**: `DeleteApiKeyResponse`

**DeleteApiKeyResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the api key |

### `apiKeys.create(body: CreateApiKeyRequest, options?: RequestOptions)`

Generate a new API key. The key value is only returned once — store it securely.

- **HTTP**: `POST /api-keys`
- **Returns**: `CreateApiKeyResponse`

**CreateApiKeyRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name?` | `string` | The name of the api key |
| `status?` | `'enabled' | 'disabled' | 'revoked'` | The status for the api key |
| `permission` | `'fullAccess' | 'sendingAccess'` | The permission type for the api key |
| `domainIds?` | `Array<string>` | The domain ids to restrict the api key to (only for sendingAccess) |

**CreateApiKeyResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the api key |
| `name?` | `string` | The name of the api key |
| `apiKey` | `string` | The content of the api key |
| `shortToken` | `string` | The last 6 characters of the api key token |
| `status` | `'enabled' | 'disabled' | 'revoked'` | The status for the api key |

### `apiKeys.list(query?: CursorPageParams, options?: RequestOptions)`

Returns all API keys for the organization. Key values are never included in list responses.

- **HTTP**: `GET /api-keys`
- **Returns**: `CursorPage<ApiKeysResponseItem>`
- **Paginated**: yes

**ApiKeysResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the api key |
| `name?` | `string` | The name of the api key |
| `shortToken` | `string` | The last 6 characters of the api key token |
| `status` | `'enabled' | 'disabled' | 'revoked'` | The status for the api key |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
