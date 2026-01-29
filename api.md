# Shared

Types:

- <code><a href="./src/resources/shared.ts">EventType</a></code>

# APIKeys

Types:

- <code><a href="./src/resources/api-keys.ts">APIKeyCreateResponse</a></code>
- <code><a href="./src/resources/api-keys.ts">APIKeyRetrieveResponse</a></code>
- <code><a href="./src/resources/api-keys.ts">APIKeyUpdateResponse</a></code>
- <code><a href="./src/resources/api-keys.ts">APIKeyListResponse</a></code>
- <code><a href="./src/resources/api-keys.ts">APIKeyDeleteResponse</a></code>

Methods:

- <code title="post /api-keys">client.apiKeys.<a href="./src/resources/api-keys.ts">create</a>({ ...params }) -> APIKeyCreateResponse</code>
- <code title="get /api-keys/{id}">client.apiKeys.<a href="./src/resources/api-keys.ts">retrieve</a>(id) -> APIKeyRetrieveResponse</code>
- <code title="put /api-keys/{id}">client.apiKeys.<a href="./src/resources/api-keys.ts">update</a>(id, { ...params }) -> APIKeyUpdateResponse</code>
- <code title="get /api-keys">client.apiKeys.<a href="./src/resources/api-keys.ts">list</a>({ ...params }) -> APIKeyListResponsesCursorPage</code>
- <code title="delete /api-keys/{id}">client.apiKeys.<a href="./src/resources/api-keys.ts">delete</a>(id) -> APIKeyDeleteResponse</code>

# Domains

Types:

- <code><a href="./src/resources/domains.ts">DomainCreateResponse</a></code>
- <code><a href="./src/resources/domains.ts">DomainRetrieveResponse</a></code>
- <code><a href="./src/resources/domains.ts">DomainUpdateResponse</a></code>
- <code><a href="./src/resources/domains.ts">DomainListResponse</a></code>
- <code><a href="./src/resources/domains.ts">DomainDeleteResponse</a></code>

Methods:

- <code title="post /domains">client.domains.<a href="./src/resources/domains.ts">create</a>({ ...params }) -> DomainCreateResponse</code>
- <code title="get /domains/{id}">client.domains.<a href="./src/resources/domains.ts">retrieve</a>(id) -> DomainRetrieveResponse</code>
- <code title="patch /domains/{id}">client.domains.<a href="./src/resources/domains.ts">update</a>(id, { ...params }) -> DomainUpdateResponse</code>
- <code title="get /domains">client.domains.<a href="./src/resources/domains.ts">list</a>({ ...params }) -> DomainListResponsesCursorPage</code>
- <code title="delete /domains/{id}">client.domains.<a href="./src/resources/domains.ts">delete</a>(id) -> DomainDeleteResponse</code>

# Emails

Types:

- <code><a href="./src/resources/emails/emails.ts">Status</a></code>
- <code><a href="./src/resources/emails/emails.ts">Tag</a></code>
- <code><a href="./src/resources/emails/emails.ts">EmailRetrieveResponse</a></code>
- <code><a href="./src/resources/emails/emails.ts">EmailListResponse</a></code>
- <code><a href="./src/resources/emails/emails.ts">EmailCancelResponse</a></code>
- <code><a href="./src/resources/emails/emails.ts">EmailSendResponse</a></code>

Methods:

- <code title="get /emails/{id}">client.emails.<a href="./src/resources/emails/emails.ts">retrieve</a>(id) -> EmailRetrieveResponse</code>
- <code title="get /emails">client.emails.<a href="./src/resources/emails/emails.ts">list</a>({ ...params }) -> EmailListResponsesCursorPage</code>
- <code title="delete /emails/{id}">client.emails.<a href="./src/resources/emails/emails.ts">cancel</a>(id) -> EmailCancelResponse</code>
- <code title="post /emails">client.emails.<a href="./src/resources/emails/emails.ts">send</a>({ ...params }) -> EmailSendResponse</code>

## Bulk

Types:

- <code><a href="./src/resources/emails/bulk.ts">BulkRetrieveResponse</a></code>
- <code><a href="./src/resources/emails/bulk.ts">BulkSendResponse</a></code>

Methods:

- <code title="get /emails/bulk/{bulkId}">client.emails.bulk.<a href="./src/resources/emails/bulk.ts">retrieve</a>(bulkID) -> BulkRetrieveResponse</code>
- <code title="post /emails/bulk">client.emails.bulk.<a href="./src/resources/emails/bulk.ts">send</a>({ ...params }) -> BulkSendResponse</code>

## Events

Types:

- <code><a href="./src/resources/emails/events.ts">EventListResponse</a></code>

Methods:

- <code title="get /emails/{id}/events">client.emails.events.<a href="./src/resources/emails/events.ts">list</a>(id) -> EventListResponse</code>

## Content

Types:

- <code><a href="./src/resources/emails/content.ts">ContentRetrieveResponse</a></code>

Methods:

- <code title="get /emails/{id}/content">client.emails.content.<a href="./src/resources/emails/content.ts">retrieve</a>(id) -> ContentRetrieveResponse</code>

## Stats

Types:

- <code><a href="./src/resources/emails/stats.ts">StatListResponse</a></code>

Methods:

- <code title="get /emails/stats">client.emails.stats.<a href="./src/resources/emails/stats.ts">list</a>() -> StatListResponse</code>

# Webhooks

Types:

- <code><a href="./src/resources/webhooks/webhooks.ts">EmailBouncedEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">EmailClickedEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">EmailComplainedEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">EmailDeliveredEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">EmailDeliveryDelayedEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">EmailFailedEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">EmailOpenedEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">EmailProcessedEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">EmailQueuedEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">EmailRejectedEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">EmailScheduledEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">EmailSendingEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">EmailSentEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">Event</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">WebhookCreateResponse</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">WebhookRetrieveResponse</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">WebhookUpdateResponse</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">WebhookListResponse</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">WebhookDeleteResponse</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">UnwrapWebhookEvent</a></code>

Methods:

- <code title="post /webhooks">client.webhooks.<a href="./src/resources/webhooks/webhooks.ts">create</a>({ ...params }) -> WebhookCreateResponse</code>
- <code title="get /webhooks/{id}">client.webhooks.<a href="./src/resources/webhooks/webhooks.ts">retrieve</a>(id) -> WebhookRetrieveResponse</code>
- <code title="put /webhooks/{id}">client.webhooks.<a href="./src/resources/webhooks/webhooks.ts">update</a>(id, { ...params }) -> WebhookUpdateResponse</code>
- <code title="get /webhooks">client.webhooks.<a href="./src/resources/webhooks/webhooks.ts">list</a>({ ...params }) -> WebhookListResponsesCursorPage</code>
- <code title="delete /webhooks/{id}">client.webhooks.<a href="./src/resources/webhooks/webhooks.ts">delete</a>(id) -> WebhookDeleteResponse</code>
- <code>client.webhooks.<a href="./src/resources/webhooks/webhooks.ts">unwrap</a>(body) -> void</code>

## Events

Types:

- <code><a href="./src/resources/webhooks/events.ts">EventListResponse</a></code>
- <code><a href="./src/resources/webhooks/events.ts">EventDeliveriesResponse</a></code>
- <code><a href="./src/resources/webhooks/events.ts">EventReplayResponse</a></code>

Methods:

- <code title="get /webhooks/events">client.webhooks.events.<a href="./src/resources/webhooks/events.ts">list</a>({ ...params }) -> EventListResponsesCursorPage</code>
- <code title="get /webhooks/{id}/events/{eventId}/deliveries">client.webhooks.events.<a href="./src/resources/webhooks/events.ts">deliveries</a>(eventID, { ...params }) -> EventDeliveriesResponse</code>
- <code title="post /webhooks/{id}/events/{eventId}/replay">client.webhooks.events.<a href="./src/resources/webhooks/events.ts">replay</a>(eventID, { ...params }) -> EventReplayResponse</code>

# Organizations

Types:

- <code><a href="./src/resources/organizations/organizations.ts">OrganizationRetrieveResponse</a></code>
- <code><a href="./src/resources/organizations/organizations.ts">OrganizationListResponse</a></code>

Methods:

- <code title="get /organizations/{id}">client.organizations.<a href="./src/resources/organizations/organizations.ts">retrieve</a>(id) -> OrganizationRetrieveResponse</code>
- <code title="get /organizations">client.organizations.<a href="./src/resources/organizations/organizations.ts">list</a>({ ...params }) -> OrganizationListResponsesCursorPage</code>

## Usage

Types:

- <code><a href="./src/resources/organizations/usage.ts">UsageRetrieveResponse</a></code>

Methods:

- <code title="get /organizations/{id}/usage">client.organizations.usage.<a href="./src/resources/organizations/usage.ts">retrieve</a>(id) -> UsageRetrieveResponse</code>
