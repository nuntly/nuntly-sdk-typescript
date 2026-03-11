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

- <code><a href="./src/resources/emails/emails.ts">EmailContentItem</a></code>
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

# Namespaces

Types:

- <code><a href="./src/resources/namespaces/namespaces.ts">Namespace</a></code>
- <code><a href="./src/resources/namespaces/namespaces.ts">NamespaceDetail</a></code>
- <code><a href="./src/resources/namespaces/namespaces.ts">NamespaceUpdateResponse</a></code>
- <code><a href="./src/resources/namespaces/namespaces.ts">NamespaceDeleteResponse</a></code>

Methods:

- <code title="post /namespaces">client.namespaces.<a href="./src/resources/namespaces/namespaces.ts">create</a>({ ...params }) -> Namespace</code>
- <code title="get /namespaces/{namespaceId}">client.namespaces.<a href="./src/resources/namespaces/namespaces.ts">retrieve</a>(namespaceID) -> NamespaceDetail</code>
- <code title="patch /namespaces/{namespaceId}">client.namespaces.<a href="./src/resources/namespaces/namespaces.ts">update</a>(namespaceID, { ...params }) -> NamespaceUpdateResponse</code>
- <code title="get /namespaces">client.namespaces.<a href="./src/resources/namespaces/namespaces.ts">list</a>({ ...params }) -> NamespacesCursorPage</code>
- <code title="delete /namespaces/{namespaceId}">client.namespaces.<a href="./src/resources/namespaces/namespaces.ts">delete</a>(namespaceID) -> NamespaceDeleteResponse</code>

## Inboxes

Methods:

- <code title="get /namespaces/{namespaceId}/inboxes">client.namespaces.inboxes.<a href="./src/resources/namespaces/inboxes.ts">list</a>(namespaceID, { ...params }) -> InboxesCursorPage</code>

# Inboxes

Types:

- <code><a href="./src/resources/inboxes/inboxes.ts">Inbox</a></code>
- <code><a href="./src/resources/inboxes/inboxes.ts">InboxUpdateResponse</a></code>
- <code><a href="./src/resources/inboxes/inboxes.ts">InboxDeleteResponse</a></code>
- <code><a href="./src/resources/inboxes/inboxes.ts">InboxSendResponse</a></code>

Methods:

- <code title="post /inboxes">client.inboxes.<a href="./src/resources/inboxes/inboxes.ts">create</a>({ ...params }) -> Inbox</code>
- <code title="get /inboxes/{inboxId}">client.inboxes.<a href="./src/resources/inboxes/inboxes.ts">retrieve</a>(inboxID) -> Inbox</code>
- <code title="patch /inboxes/{inboxId}">client.inboxes.<a href="./src/resources/inboxes/inboxes.ts">update</a>(inboxID, { ...params }) -> InboxUpdateResponse</code>
- <code title="get /inboxes">client.inboxes.<a href="./src/resources/inboxes/inboxes.ts">list</a>({ ...params }) -> InboxesCursorPage</code>
- <code title="delete /inboxes/{inboxId}">client.inboxes.<a href="./src/resources/inboxes/inboxes.ts">delete</a>(inboxID) -> InboxDeleteResponse</code>
- <code title="post /inboxes/{inboxId}/messages">client.inboxes.<a href="./src/resources/inboxes/inboxes.ts">send</a>(inboxID, { ...params }) -> InboxSendResponse</code>

## Threads

Methods:

- <code title="get /inboxes/{inboxId}/threads">client.inboxes.threads.<a href="./src/resources/inboxes/threads.ts">list</a>(inboxID, { ...params }) -> ThreadsCursorPage</code>

# Threads

Types:

- <code><a href="./src/resources/threads/threads.ts">Thread</a></code>
- <code><a href="./src/resources/threads/threads.ts">ThreadUpdateResponse</a></code>

Methods:

- <code title="get /threads/{threadId}">client.threads.<a href="./src/resources/threads/threads.ts">retrieve</a>(threadID) -> Thread</code>
- <code title="patch /threads/{threadId}">client.threads.<a href="./src/resources/threads/threads.ts">update</a>(threadID, { ...params }) -> ThreadUpdateResponse</code>

## Messages

Types:

- <code><a href="./src/resources/threads/messages.ts">MessageListResponse</a></code>

Methods:

- <code title="get /threads/{threadId}/messages">client.threads.messages.<a href="./src/resources/threads/messages.ts">list</a>(threadID, { ...params }) -> MessageListResponsesCursorPage</code>

# Messages

Types:

- <code><a href="./src/resources/messages/messages.ts">Message</a></code>
- <code><a href="./src/resources/messages/messages.ts">MessageAttachment</a></code>
- <code><a href="./src/resources/messages/messages.ts">MessageContent</a></code>
- <code><a href="./src/resources/messages/messages.ts">MessageContentItem</a></code>
- <code><a href="./src/resources/messages/messages.ts">MessageDetail</a></code>
- <code><a href="./src/resources/messages/messages.ts">MessageForwardResponse</a></code>
- <code><a href="./src/resources/messages/messages.ts">MessageReplyResponse</a></code>

Methods:

- <code title="get /messages/{messageId}">client.messages.<a href="./src/resources/messages/messages.ts">retrieve</a>(messageID) -> MessageDetail</code>
- <code title="get /messages">client.messages.<a href="./src/resources/messages/messages.ts">list</a>({ ...params }) -> MessagesCursorPage</code>
- <code title="post /messages/{messageId}/forward">client.messages.<a href="./src/resources/messages/messages.ts">forward</a>(messageID, { ...params }) -> MessageForwardResponse</code>
- <code title="post /messages/{messageId}/reply">client.messages.<a href="./src/resources/messages/messages.ts">reply</a>(messageID, { ...params }) -> MessageReplyResponse</code>

## Content

Methods:

- <code title="get /messages/{messageId}/content">client.messages.content.<a href="./src/resources/messages/content.ts">retrieve</a>(messageID, { ...params }) -> MessageContent</code>

## Attachments

Types:

- <code><a href="./src/resources/messages/attachments.ts">AttachmentListResponse</a></code>

Methods:

- <code title="get /messages/{messageId}/attachments/{attachmentId}">client.messages.attachments.<a href="./src/resources/messages/attachments.ts">retrieve</a>(attachmentID, { ...params }) -> MessageAttachment</code>
- <code title="get /messages/{messageId}/attachments">client.messages.attachments.<a href="./src/resources/messages/attachments.ts">list</a>(messageID) -> AttachmentListResponse</code>

# Agents

Types:

- <code><a href="./src/resources/agents/agents.ts">AgentMemory</a></code>

## Memory

Methods:

- <code title="get /agents/{agentId}/memory">client.agents.memory.<a href="./src/resources/agents/memory.ts">retrieve</a>(agentID, { ...params }) -> AgentMemory</code>
- <code title="put /agents/{agentId}/memory">client.agents.memory.<a href="./src/resources/agents/memory.ts">upsert</a>(agentID, { ...params }) -> AgentMemory</code>

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
- <code><a href="./src/resources/webhooks/webhooks.ts">MessageAgentTriggeredEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">MessageReceivedEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">MessageSecurityFlaggedEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">MessageSentEvent</a></code>
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
