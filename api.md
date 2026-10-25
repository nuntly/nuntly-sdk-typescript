# API Reference

Complete reference for `@nuntly/sdk`.

## Table of Contents

- [agents](#agents)
  - [agents.memory](#agentsmemory)
- [apiKeys](#apikeys)
- [broadcasts](#broadcasts)
  - [broadcasts.recipients](#broadcastsrecipients)
- [contactProperties](#contactproperties)
- [contacts](#contacts)
  - [contacts.segments](#contactssegments)
  - [contacts.topics](#contactstopics)
- [domains](#domains)
- [emails](#emails)
  - [emails.bulk](#emailsbulk)
  - [emails.content](#emailscontent)
  - [emails.events](#emailsevents)
  - [emails.stats](#emailsstats)
- [inboxes](#inboxes)
  - [inboxes.messages](#inboxesmessages)
  - [inboxes.threads](#inboxesthreads)
- [messages](#messages)
  - [messages.attachments](#messagesattachments)
  - [messages.content](#messagescontent)
- [namespaces](#namespaces)
  - [namespaces.inboxes](#namespacesinboxes)
- [organizations](#organizations)
  - [organizations.usage](#organizationsusage)
- [segments](#segments)
  - [segments.members](#segmentsmembers)
- [templates](#templates)
  - [templates.versions](#templatesversions)
  - [templates.versions.content](#templatesversionscontent)
- [threads](#threads)
  - [threads.messages](#threadsmessages)
- [topics](#topics)
  - [topics.memberships](#topicsmemberships)
- [webhooks](#webhooks)
  - [webhooks.events](#webhooksevents)
  - [webhooks.events.deliveries](#webhookseventsdeliveries)

## agents

## agents.memory

### `agents.memory.retrieve(agentId: string, query?: AgentMemoryQuery, options?: RequestOptions)`

Retrieves the key-value memory and summary saved for an AI agent, at organization level or scoped to one inbox or thread via query parameters.

- **HTTP**: `GET /agents/{agentId}/memory`
- **Returns**: `AgentMemory`

**AgentMemory**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string \| null` | The agent memory record id. |
| `createdAt` | `string \| null` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string \| null` | Date at which the object was updated (ISO 8601 format) |
| `agentId` | `string` | The agent identifier. |
| `inboxId` | `string \| null` | The inbox id. |
| `threadId` | `string \| null` | The thread id. |
| `memory` | `Record<string, string \| number \| boolean \| null \| Array<string \| number \| boolean \| null>>` | The agent memory data. |
| `summary` | `string \| null` | The conversation summary. |

### `agents.memory.upsert(agentId: string, body: AgentMemoryRequest, options?: RequestOptions)`

Saves the key-value memory and optional summary of an AI agent, at organization level or scoped to a specific inbox or thread. Returns the saved memory.

- **HTTP**: `PUT /agents/{agentId}/memory`
- **Returns**: `AgentMemory`

**AgentMemoryRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `inboxId?` | `string` | The id of an inbox in your organization. Scopes memory to that inbox. |
| `threadId?` | `string` | The id of a thread in your organization. Scopes memory to that thread. |
| `memory` | `Record<string, string \| number \| boolean \| null \| Array<string \| number \| boolean \| null>>` | The agent memory key-value data. |
| `summary?` | `string \| null` | A human-readable conversation summary. |

**AgentMemory**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string \| null` | The agent memory record id. |
| `createdAt` | `string \| null` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string \| null` | Date at which the object was updated (ISO 8601 format) |
| `agentId` | `string` | The agent identifier. |
| `inboxId` | `string \| null` | The inbox id. |
| `threadId` | `string \| null` | The thread id. |
| `memory` | `Record<string, string \| number \| boolean \| null \| Array<string \| number \| boolean \| null>>` | The agent memory data. |
| `summary` | `string \| null` | The conversation summary. |

## apiKeys

### `apiKeys.create(body: CreateApiKeyRequest, options?: RequestOptions)`

Creates an API key with full access or send-only access, optionally limited to chosen domains. The secret key value is returned only in this response.

- **HTTP**: `POST /api-keys`
- **Returns**: `CreateApiKeyResponse`

**CreateApiKeyRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name?` | `string` | The name of the api key |
| `status?` | `'enabled' \| 'disabled' \| 'revoked'` | The status for the api key |
| `permission?` | `'fullAccess' \| 'sendingAccess'` | The permission type for the api key |
| `domainIds?` | `Array<string>` | The domain ids to restrict the api key to (only for sendingAccess) |

**CreateApiKeyResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the api key |
| `name?` | `string` | The name of the api key |
| `apiKey` | `string` | The content of the api key |
| `shortToken` | `string` | The last 6 characters of the api key token |
| `status` | `'enabled' \| 'disabled' \| 'revoked'` | The status for the api key |

### `apiKeys.delete(id: string, options?: RequestOptions)`

Permanently deletes an API key. Any request that authenticates with this key is rejected from then on. This cannot be undone.

- **HTTP**: `DELETE /api-keys/{id}`
- **Returns**: `DeleteApiKeyResponse`

**DeleteApiKeyResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the api key |

### `apiKeys.list(query?: CursorPageParams, options?: RequestOptions)`

Lists the API keys of your organization, newest first, with cursor pagination. Each key shows its name, status, creation date, and a short token hint.

- **HTTP**: `GET /api-keys`
- **Returns**: `CursorPage<ApiKeysResponseItem>`
- **Paginated**: yes

**ApiKeysResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the api key |
| `name?` | `string` | The name of the api key |
| `shortToken` | `string` | The last 6 characters of the api key token |
| `status` | `'enabled' \| 'disabled' \| 'revoked'` | The status for the api key |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |

### `apiKeys.retrieve(id: string, options?: RequestOptions)`

Retrieves an API key by id with its name, status, creation date, and a short token hint. The full secret key value is never returned after creation.

- **HTTP**: `GET /api-keys/{id}`
- **Returns**: `ApiKeyResponse`

**ApiKeyResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the api key |
| `name?` | `string` | The name of the api key |
| `shortToken` | `string` | The last 6 characters of the api key token |
| `status` | `'enabled' \| 'disabled' \| 'revoked'` | The status for the api key |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |

### `apiKeys.update(id: string, body: UpdateApiKeyRequest, options?: RequestOptions)`

Updates the name of an API key, enables or disables it, or changes its access level and domain restrictions. Returns the id of the updated key.

- **HTTP**: `PATCH /api-keys/{id}`
- **Returns**: `UpdateApiKeyResponse`

**UpdateApiKeyRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name?` | `string` | The name of the api key |
| `status?` | `'enabled' \| 'disabled'` |  |
| `permission?` | `'fullAccess' \| 'sendingAccess'` | The permission type for the api key |
| `domainIds?` | `Array<string>` | The domain ids to restrict the api key to (only for sendingAccess) |

**UpdateApiKeyResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the api key |

## broadcasts

### `broadcasts.create(body: CreateBroadcastRequest, options?: IdempotentRequestOptions)`

Create a broadcast for your contacts.

- **HTTP**: `POST /broadcasts`
- **Returns**: `BroadcastResponse`

**CreateBroadcastRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `templateId?` | `string` | The template to send. |
| `from` | `string` | The sender address, on a verified domain. |
| `name?` | `string` | An internal label, shown only to your team. |
| `subject?` | `string` | The subject. Defaults to the template version’s subject. |
| `replyTo?` | `Array<string> \| string` | The email address where replies should be sent. If a recipient replies, the response will go to this address instead of the sender's email address |
| `topicId?` | `string` | The topic to send to. |
| `segmentId?` | `string` | The segment to send to. |
| `variables?` | `Record<string, string \| number \| boolean>` | Variable values keyed by declared name. |

**BroadcastResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the broadcast. |
| `name?` | `string` | An internal label, shown only to your team. |
| `templateId?` | `string` | The id of the template. |
| `templateVersionId?` | `string` | The content version this broadcast sends. Frozen once queued. |
| `domainId?` | `string` | The id of the sending domain. |
| `topicId?` | `string` | The topic this broadcast targets. |
| `segmentId?` | `string` | The segment this broadcast targets. |
| `from` | `string` |  |
| `subject?` | `string` | The subject, falling back to the template version’s subject. |
| `replyTo?` | `Array<string> \| string` | The email address where replies should be sent. If a recipient replies, the response will go to this address instead of the sender's email address |
| `status` | `BroadcastStatus` | The lifecycle state of the broadcast. |
| `statusAt` | `string` | Date at which the broadcast reached its current state. |
| `statusReason?` | `Record<string, unknown>` | May provide more information about the status. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string` | Date at which the object was updated (ISO 8601 format) |
| `variables?` | `Record<string, string \| number \| boolean>` | The stored variable values. |

### `broadcasts.delete(broadcastId: string, options?: RequestOptions)`

Delete a draft, scheduled, or failed broadcast.

- **HTTP**: `DELETE /broadcasts/{broadcastId}`
- **Returns**: `IdResponse`

**IdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the resource. |

### `broadcasts.list(query?: CursorPageParams, options?: RequestOptions)`

List the organization broadcasts.

- **HTTP**: `GET /broadcasts`
- **Returns**: `CursorPage<BroadcastsResponseItem>`
- **Paginated**: yes

**BroadcastsResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the broadcast. |
| `name?` | `string` | An internal label, shown only to your team. |
| `templateId?` | `string` | The id of the template. |
| `templateVersionId?` | `string` | The content version this broadcast sends. Frozen once queued. |
| `domainId?` | `string` | The id of the sending domain. |
| `topicId?` | `string` | The topic this broadcast targets. |
| `segmentId?` | `string` | The segment this broadcast targets. |
| `from` | `string` |  |
| `subject?` | `string` | The subject, falling back to the template version’s subject. |
| `replyTo?` | `Array<string> \| string` | The email address where replies should be sent. If a recipient replies, the response will go to this address instead of the sender's email address |
| `status` | `BroadcastStatus` | The lifecycle state of the broadcast. |
| `statusAt` | `string` | Date at which the broadcast reached its current state. |
| `statusReason?` | `Record<string, unknown>` | May provide more information about the status. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string` | Date at which the object was updated (ISO 8601 format) |
| `variables?` | `Record<string, string \| number \| boolean>` | The stored variable values. |

### `broadcasts.retrieve(broadcastId: string, options?: RequestOptions)`

Retrieve a broadcast and its status.

- **HTTP**: `GET /broadcasts/{broadcastId}`
- **Returns**: `BroadcastResponse`

**BroadcastResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the broadcast. |
| `name?` | `string` | An internal label, shown only to your team. |
| `templateId?` | `string` | The id of the template. |
| `templateVersionId?` | `string` | The content version this broadcast sends. Frozen once queued. |
| `domainId?` | `string` | The id of the sending domain. |
| `topicId?` | `string` | The topic this broadcast targets. |
| `segmentId?` | `string` | The segment this broadcast targets. |
| `from` | `string` |  |
| `subject?` | `string` | The subject, falling back to the template version’s subject. |
| `replyTo?` | `Array<string> \| string` | The email address where replies should be sent. If a recipient replies, the response will go to this address instead of the sender's email address |
| `status` | `BroadcastStatus` | The lifecycle state of the broadcast. |
| `statusAt` | `string` | Date at which the broadcast reached its current state. |
| `statusReason?` | `Record<string, unknown>` | May provide more information about the status. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string` | Date at which the object was updated (ISO 8601 format) |
| `variables?` | `Record<string, string \| number \| boolean>` | The stored variable values. |

### `broadcasts.send(broadcastId: string, body?: SendBroadcastRequest, options?: IdempotentRequestOptions)`

Send a broadcast now or schedule it.

- **HTTP**: `POST /broadcasts/{broadcastId}/send`
- **Returns**: `SendBroadcastResponse`

**SendBroadcastRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `scheduledAt?` | `string` | When to send. Omit to send immediately. |

**SendBroadcastResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the broadcast. |
| `status` | `BroadcastStatus` | The lifecycle state of the broadcast. |

### `broadcasts.update(broadcastId: string, body: UpdateBroadcastRequest, options?: RequestOptions)`

Edit a draft or scheduled broadcast.

- **HTTP**: `PATCH /broadcasts/{broadcastId}`
- **Returns**: `IdResponse`

**UpdateBroadcastRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `templateId?` | `string \| null` | Set to null to detach the template. |
| `from?` | `string` | The sender address, on a verified domain. |
| `name?` | `string \| null` | Set to null to remove the name. |
| `subject?` | `string \| null` | Set to null to fall back to the template version’s subject. |
| `replyTo?` | `Array<string> \| string \| null` | The email address where replies should be sent. If a recipient replies, the response will go to this address instead of the sender's email address |
| `topicId?` | `string \| null` | Set to null to remove the topic. |
| `segmentId?` | `string \| null` | Set to null to remove the segment. |
| `variables?` | `Record<string, string \| number \| boolean>` | Replaces the stored values. Send {} to clear them. |
| `status?` | `BroadcastStatus` | Only draft is accepted. |

**IdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the resource. |

## broadcasts.recipients

### `broadcasts.recipients.list(broadcastId: string, query?: CursorPageParams, options?: RequestOptions)`

List the recipients of a broadcast.

- **HTTP**: `GET /broadcasts/{broadcastId}/recipients`
- **Returns**: `CursorPage<BroadcastRecipientsResponseItem>`
- **Paginated**: yes

**BroadcastRecipientsResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the recipient record. |
| `contactId` | `string \| null` | The source contact, absent once deleted. |
| `email` | `string` | The recipient address, kept until your retention window ends. |
| `outcome` | `EmailStatus` | The current status of the recipient’s email. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |

## contactProperties

### `contactProperties.create(body: CreateContactPropertyRequest, options?: RequestOptions)`

Create a contact property.

- **HTTP**: `POST /contact-properties`
- **Returns**: `ContactPropertyResponse`

**CreateContactPropertyRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name` | `string` | A name for the property, used as its key in a contact's properties. Stored trimmed, with the letter case it was typed with. |
| `type` | `'string' \| 'number'` | The declared type of the property. Immutable after creation. |
| `description?` | `string \| null` | An optional description of the property. |
| `defaultValue?` | `string \| number \| null` | Applied to new contacts that omit this property. |

**ContactPropertyResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the contact property. |
| `name` | `string` | A name for the property, used as its key in a contact's properties. Stored trimmed, with the letter case it was typed with. |
| `type` | `'string' \| 'number'` | The declared type of the property. Immutable after creation. |
| `description?` | `string \| null` | An optional description of the property. |
| `defaultValue?` | `string \| number` |  |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string` | Date at which the object was updated (ISO 8601 format) |

### `contactProperties.delete(contactPropertyId: string, options?: RequestOptions)`

Delete a contact property.

- **HTTP**: `DELETE /contact-properties/{contactPropertyId}`
- **Returns**: `IdResponse`

**IdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the resource. |

### `contactProperties.list(query?: CursorPageParams, options?: RequestOptions)`

List the organization contact properties.

- **HTTP**: `GET /contact-properties`
- **Returns**: `CursorPage<ContactPropertiesResponseItem>`
- **Paginated**: yes

**ContactPropertiesResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the contact property. |
| `name` | `string` | A name for the property, used as its key in a contact's properties. Stored trimmed, with the letter case it was typed with. |
| `type` | `'string' \| 'number'` | The declared type of the property. Immutable after creation. |
| `description?` | `string \| null` | An optional description of the property. |
| `defaultValue?` | `string \| number` |  |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string` | Date at which the object was updated (ISO 8601 format) |

### `contactProperties.retrieve(contactPropertyId: string, options?: RequestOptions)`

Retrieve one contact property.

- **HTTP**: `GET /contact-properties/{contactPropertyId}`
- **Returns**: `ContactPropertyResponse`

**ContactPropertyResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the contact property. |
| `name` | `string` | A name for the property, used as its key in a contact's properties. Stored trimmed, with the letter case it was typed with. |
| `type` | `'string' \| 'number'` | The declared type of the property. Immutable after creation. |
| `description?` | `string \| null` | An optional description of the property. |
| `defaultValue?` | `string \| number` |  |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string` | Date at which the object was updated (ISO 8601 format) |

### `contactProperties.update(contactPropertyId: string, body: UpdateContactPropertyRequest, options?: RequestOptions)`

Update a contact property.

- **HTTP**: `PATCH /contact-properties/{contactPropertyId}`
- **Returns**: `IdResponse`

**UpdateContactPropertyRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `description?` | `string \| null` | An optional description of the property. |
| `defaultValue?` | `string \| number \| null` |  |

**IdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the resource. |

## contacts

### `contacts.create(body: CreateContactRequest, options?: RequestOptions)`

Create a contact.

- **HTTP**: `POST /contacts`
- **Returns**: `ContactResponse`

**CreateContactRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `email` | `string` | The contact email address. Stored lowercased and trimmed. |
| `properties?` | `Record<string, string \| number \| null>` | Contact properties keyed by name. A null value means not supplied. |

**ContactResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the contact. |
| `email` | `string` | The contact email address. Stored lowercased and trimmed. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string` | Date at which the object was updated (ISO 8601 format) |
| `properties?` | `Record<string, string \| number \| null>` | The contact's properties, keyed by property name. |

### `contacts.delete(contactId: string, options?: RequestOptions)`

Delete a contact.

- **HTTP**: `DELETE /contacts/{contactId}`
- **Returns**: `IdResponse`

**IdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the resource. |

### `contacts.list(query?: CursorPageParams, options?: RequestOptions)`

List the organization contacts.

- **HTTP**: `GET /contacts`
- **Returns**: `CursorPage<ContactsResponseItem>`
- **Paginated**: yes

**ContactsResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the contact. |
| `email` | `string` | The contact email address. Stored lowercased and trimmed. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string` | Date at which the object was updated (ISO 8601 format) |

### `contacts.retrieve(contactId: string, options?: RequestOptions)`

Retrieve one contact.

- **HTTP**: `GET /contacts/{contactId}`
- **Returns**: `ContactResponse`

**ContactResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the contact. |
| `email` | `string` | The contact email address. Stored lowercased and trimmed. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string` | Date at which the object was updated (ISO 8601 format) |
| `properties?` | `Record<string, string \| number \| null>` | The contact's properties, keyed by property name. |

### `contacts.update(contactId: string, body: UpdateContactRequest, options?: RequestOptions)`

Update a contact's properties.

- **HTTP**: `PATCH /contacts/{contactId}`
- **Returns**: `IdResponse`

**UpdateContactRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `email?` | `string` | The contact's current address, in any letter case. The address cannot be changed: a different address is refused with the error code contact_email_immutable. |
| `properties?` | `Record<string, string \| number \| null>` | Contact properties keyed by name, matched exactly. A null value removes the property. |

**IdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the resource. |

## contacts.segments

### `contacts.segments.add(contactId: string, segmentId: string, options?: RequestOptions)`

Add a contact to a segment. Idempotent.

- **HTTP**: `POST /contacts/{contactId}/segments/{segmentId}`
- **Returns**: `ContactSegmentMembershipResponse`

**ContactSegmentMembershipResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `contactId` | `string` | The id of the contact. |
| `segmentId` | `string` | The id of the segment. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |

### `contacts.segments.list(contactId: string, options?: RequestOptions)`

List a contact's segments.

- **HTTP**: `GET /contacts/{contactId}/segments`
- **Returns**: `ContactSegmentsResponse`

**ContactSegmentsResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `segmentId` | `string` | The id of the segment. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |

### `contacts.segments.remove(contactId: string, segmentId: string, options?: RequestOptions)`

Remove a contact from a segment.

- **HTTP**: `DELETE /contacts/{contactId}/segments/{segmentId}`
- **Returns**: `ContactSegmentMembershipIdResponse`

**ContactSegmentMembershipIdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the contact removed from the segment. |
| `segmentId` | `string` | The id of the segment the contact was removed from. The segment itself is not deleted. |

### `contacts.segments.retrieve(contactId: string, segmentId: string, options?: RequestOptions)`

Check if a contact is in a segment.

- **HTTP**: `GET /contacts/{contactId}/segments/{segmentId}`
- **Returns**: `ContactSegmentMembershipResponse`

**ContactSegmentMembershipResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `contactId` | `string` | The id of the contact. |
| `segmentId` | `string` | The id of the segment. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |

## contacts.topics

### `contacts.topics.list(contactId: string, options?: RequestOptions)`

List a contact's subscription state per topic.

- **HTTP**: `GET /contacts/{contactId}/topics`
- **Returns**: `ContactTopicMembershipsResponse`

**ContactTopicMembershipsResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `topicId` | `string` | The id of the topic. |
| `state` | `'subscribed' \| 'unsubscribed'` | The subscribe/unsubscribe state. |
| `source` | `'explicit' \| 'default' \| 'platform_opt_out'` | How this state was derived: an explicit membership record, the organization default (subscribed, when no record exists), or a platform-wide opt-out, which overrides every other source. |

### `contacts.topics.update(contactId: string, topicId: string, body: SetContactTopicMembershipRequest, options?: RequestOptions)`

Subscribe or unsubscribe a contact from a topic.

- **HTTP**: `PUT /contacts/{contactId}/topics/{topicId}`
- **Returns**: `SetContactTopicMembershipResponse`

**SetContactTopicMembershipRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `state` | `'subscribed' \| 'unsubscribed'` | The subscribe/unsubscribe state. |

**SetContactTopicMembershipResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `contactId` | `string` | The id of the contact. |
| `topicId` | `string` | The id of the topic. |
| `state` | `'subscribed' \| 'unsubscribed'` | The subscribe/unsubscribe state. |
| `updatedAt` | `string` | Date at which the object was updated (ISO 8601 format) |

## domains

### `domains.create(body: CreateDomainRequest, options?: RequestOptions)`

Adds a domain for sending, receiving, or both, and returns the DNS records to publish. Verification starts automatically and the plan domain limit applies.

- **HTTP**: `POST /domains`
- **Returns**: `DomainRecordsResponse`

**CreateDomainRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name` | `string` | The name of the domain to send e-mails' |
| `sending?` | `boolean` | Enable sending |
| `receiving?` | `boolean` | Enable receiving |

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
| `sendingStatus` | `DomainSendingStatus` | The sending status for the domain |
| `sendingStatusAt` | `string` | The date of the latest sending status change |
| `receivingStatus` | `DomainReceivingStatus` | The receiving status for the domain |
| `receivingStatusAt` | `string` | The date of the latest receiving status change |
| `openTracking` | `boolean` | Emit an event for each recipient opens an email their email client |
| `clickTracking` | `boolean` | Emit an event for each time the recipient clicks a link in the email |
| `records` | `Array<{ name: string; fullname: string; recordType: 'TXT' \| 'MX' \| 'CNAME'; ttl: string; group: 'DKIM' \| 'SPF' \| 'MX' \| 'DMARC' \| 'MX_RECEIVING'; selector?: string; priority?: string; value: string; status: DomainStatus; statusAt: string }>` | The DNS records for your domain. |

### `domains.delete(id: string, options?: RequestOptions)`

Permanently deletes a domain along with its inboxes, received messages, attachments, and sending configuration. This action is irreversible.

- **HTTP**: `DELETE /domains/{id}`
- **Returns**: `DeleteDomainResponse`

**DeleteDomainResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the domain |

### `domains.list(query?: CursorPageParams, options?: RequestOptions)`

Lists the domains of your organization, newest first, with cursor pagination. Each domain shows its verification status and sending and receiving status.

- **HTTP**: `GET /domains`
- **Returns**: `CursorPage<DomainsResponseItem>`
- **Paginated**: yes

**DomainsResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the domain |
| `name` | `string` | The name of the domain to send e-mails' |
| `status` | `DomainStatus` | The status for the domain |
| `sendingStatus` | `DomainSendingStatus` | The sending status for the domain |
| `receivingStatus` | `DomainReceivingStatus` | The receiving status for the domain |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `region` | `'eu-west-1'` | The region of the domain data |

### `domains.retrieve(id: string, options?: RequestOptions)`

Retrieves a domain with its capabilities, tracking settings, statuses, and the DNS records to publish, each with its own verification status.

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
| `sendingStatus` | `DomainSendingStatus` | The sending status for the domain |
| `sendingStatusAt` | `string` | The date of the latest sending status change |
| `receivingStatus` | `DomainReceivingStatus` | The receiving status for the domain |
| `receivingStatusAt` | `string` | The date of the latest receiving status change |
| `openTracking` | `boolean` | Emit an event for each recipient opens an email their email client |
| `clickTracking` | `boolean` | Emit an event for each time the recipient clicks a link in the email |
| `records` | `Array<{ name: string; fullname: string; recordType: 'TXT' \| 'MX' \| 'CNAME'; ttl: string; group: 'DKIM' \| 'SPF' \| 'MX' \| 'DMARC' \| 'MX_RECEIVING'; selector?: string; priority?: string; value: string; status: DomainStatus; statusAt: string }>` | The DNS records for your domain. |

### `domains.update(id: string, body: UpdateDomainRequest, options?: RequestOptions)`

Turns sending, receiving, open tracking, or click tracking on or off for a domain. Enabling a capability adds its DNS records and restarts verification.

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

## emails

### `emails.cancel(id: string, options?: RequestOptions)`

Cancels a scheduled email before it is sent and returns its id with status canceled. Only scheduled emails sent outside a bulk request qualify.

- **HTTP**: `DELETE /emails/{id}`
- **Returns**: `DeleteEmailResponse`

**DeleteEmailResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the email |
| `status` | `EmailStatus` | The status of the email. |

### `emails.list(query?: CursorPageParams, options?: RequestOptions)`

Lists your emails newest first with cursor pagination, up to 30 per page. Each item has its sender, recipients, subject, status and submission date.

- **HTTP**: `GET /emails`
- **Returns**: `CursorPage<EmailsResponseItem>`
- **Paginated**: yes

**EmailsResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the email |
| `from` | `string` | The e-mail address of the sender |
| `to` | `Array<string> \| string` | The primary recipient(s) of the email |
| `subject` | `string` | The subject of the e-mail |
| `status` | `EmailStatus` | The status of the email. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `scheduledAt?` | `string` | The date at which the email is scheduled to be sent |

### `emails.retrieve(id: string, options?: RequestOptions)`

Returns a single email by id with its delivery status, status reason, recipients, subject, headers, tags, attachment metadata and schedule.

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
| `to` | `Array<string> \| string` | The primary recipient(s) of the email |
| `cc?` | `Array<string> \| string` | The carbon copy recipient(s) of the email |
| `bcc?` | `Array<string> \| string` | The blind carbon copy recipient(s) of the email |
| `status` | `EmailStatus` | The status of the email. |
| `statusReason?` | `Record<string, unknown>` | May provide more informations about the status |
| `subject` | `string` | The subject of the e-mail |
| `replyTo?` | `Array<string> \| string` | The email address where replies should be sent. If a recipient replies, the response will go to this address instead of the sender's email address |
| `headers?` | `Record<string, string>` | The headers to add to the email |
| `tags?` | `Array<Tag>` | The tags to add to the email |
| `attachments?` | `Array<{ filename?: string; contentType?: string; size?: number }>` | The attachements |
| `variables?` | `Record<string, string \| number \| boolean \| null>` | The variables for the template |
| `scheduledAt?` | `string` | The date at which the email is scheduled to be sent |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |

### `emails.send(body: CreateEmailRequest, options?: IdempotentRequestOptions)`

Send transactional emails through Nuntly platform. It supports HTML and plain-text emails, attachments, labels, custom headers and scheduling.

- **HTTP**: `POST /emails`
- **Returns**: `CreateEmailResponse`

**CreateEmailRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `from` | `string` | The e-mail address of the sender |
| `to` | `Array<string> \| string` | The primary recipient(s) of the email |
| `cc?` | `Array<string> \| string` | The carbon copy recipient(s) of the email |
| `bcc?` | `Array<string> \| string` | The blind carbon copy recipient(s) of the email |
| `replyTo?` | `Array<string> \| string` | The email address where replies should be sent. If a recipient replies, the response will go to this address instead of the sender's email address |
| `subject` | `string` | The subject of the e-mail |
| `text?` | `string` | The plaintext version of the email |
| `html?` | `string` | The HTML version of the email |
| `headers?` | `Record<string, string>` | The headers to add to the email |
| `tags?` | `Array<Tag>` | The tags to add to the email |
| `attachments?` | `Array<Attachment>` | The attachements to add to the email |
| `variables?` | `Record<string, string \| number \| boolean \| null>` | The variables for the template |
| `scheduledAt?` | `string` | The date at which the email is scheduled to be sent |

**CreateEmailResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the email |
| `status` | `EmailStatus` | The status of the email. |

## emails.bulk

### `emails.bulk.retrieve(bulkId: string, options?: RequestOptions)`

Returns the emails created by a bulk request, with the id and current status of each one, looked up by the bulk id returned when it was sent.

- **HTTP**: `GET /emails/bulk/{bulkId}`
- **Returns**: `BulkEmailsResponse`

**BulkEmailsResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` |  |
| `emails` | `Array<{ id: string; status: EmailStatus; detail?: string }>` |  |

### `emails.bulk.send(body: CreateBulkEmailsRequest, options?: IdempotentRequestOptions)`

Queues 1 to 20 emails in one request with optional shared fallback values, and returns a bulk id plus the id and status of each email. No scheduling.

- **HTTP**: `POST /emails/bulk`
- **Returns**: `CreateBulkEmailsResponse`

**CreateBulkEmailsRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `fallback?` | `CreateBulkFallback` | Used as a fallback field email value if no value is present in emails. |
| `emails` | `Array<CreateBulkEmail>` | The bulk emails to send. |

**CreateBulkEmailsResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id?` | `string` | The bulk id |
| `emails` | `Array<{ id?: string; status: EmailStatus }>` |  |

## emails.content

### `emails.content.retrieve(id: string, options?: RequestOptions)`

Returns download links, valid for 2 minutes, for the HTML, plain-text and raw MIME versions of an email, plus its stored subject and body templates.

- **HTTP**: `GET /emails/{id}/content`
- **Returns**: `EmailContentResponse`

**EmailContentResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `html` | `EmailContentItem \| null` | HTML content, or `null` if unavailable. |
| `text` | `EmailContentItem \| null` | Plain text content, or `null` if unavailable. |
| `mime` | `EmailContentItem \| null` | Raw MIME (.eml) content, or `null` if unavailable. |
| `subjectTemplate` | `EmailContentItem \| null` | Subject template content, or `null` if unavailable. Returned for failed emails only. |
| `htmlTemplate` | `EmailContentItem \| null` | HTML template content, or `null` if unavailable. Returned for failed emails only. |
| `textTemplate` | `EmailContentItem \| null` | Text template content, or `null` if unavailable. Returned for failed emails only. |

## emails.events

### `emails.events.list(id: string, options?: RequestOptions)`

Returns the full event history of an email, newest first, such as queued, sent, delivered, opened, clicked or bounced. The list is not paginated.

- **HTTP**: `GET /emails/{id}/events`
- **Returns**: `EmailEventsResponse`

**EmailEventsResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` |  |
| `orgId` | `string` | The id of the organization |
| `emailId` | `string` | The id of the email |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `occurredAt?` | `string` | The date at which the event occurred |
| `eventType` | `EventType` | An event |
| `payload` | `Record<string, unknown>` |  |

## emails.stats

### `emails.stats.retrieve(options?: RequestOptions)`

Returns daily email counts for the last 30 days and today, per status and engagement type (sent, delivered, bounced, opened, clicked and more).

- **HTTP**: `GET /emails/stats`
- **Returns**: `EmailsStatsResponse`

**EmailsStatsResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `start` | `string` | The start date of the stats range |
| `end` | `string` | The end date of the stats range |
| `stats` | `Array<{ occurredOn: string; queued: number; scheduled: number; processed: number; sending: number; sent: number; delivered: number; deliveryDelayed: number; bounced: number; failed: number; rejected: number; canceled: number; complaintReceived: number; renderingFailed: number; opened: number; uniqueOpened: number; clicked: number; uniqueClicked: number }>` |  |

## inboxes

### `inboxes.create(body: CreateInboxRequest, options?: IdempotentRequestOptions)`

Creates an inbox address on a verified domain with receiving active, or on your provided domain if none is given. Can assign a namespace and agent id.

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
| `name` | `string \| null` | The display name of the inbox. |
| `namespaceId` | `string \| null` | The id of the namespace. |
| `namespaceName` | `string \| null` | The display name of the namespace. |
| `agentId` | `string \| null` | The AI agent identifier. |

### `inboxes.delete(inboxId: string, options?: RequestOptions)`

Deletes an inbox so it no longer appears in lists and stops matching incoming mail. The default catch-all inbox of a domain cannot be deleted.

- **HTTP**: `DELETE /inboxes/{inboxId}`
- **Returns**: `IdResponse`

**IdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the resource. |

### `inboxes.list(query?: InboxesQuery, options?: RequestOptions)`

Lists the active inboxes of your organization, newest first, with cursor pagination. Optionally filter the results to a single namespace.

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
| `name` | `string \| null` | The display name of the inbox. |
| `namespaceId` | `string \| null` | The id of the namespace. |
| `namespaceName` | `string \| null` | The display name of the namespace. |
| `agentId` | `string \| null` | The AI agent identifier. |

### `inboxes.retrieve(inboxId: string, options?: RequestOptions)`

Retrieves an inbox by id, including its address, domain, display name, namespace, and assigned agent id. Deleted inboxes return a not found error.

- **HTTP**: `GET /inboxes/{inboxId}`
- **Returns**: `InboxResponse`

**InboxResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the inbox |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt?` | `string` | Date at which the object was updated (ISO 8601 format) |
| `domainId` | `string` | The id of the domain. |
| `domainName` | `string` | The domain name. |
| `address` | `string` | The local-part of the email address. |
| `name` | `string \| null` | The display name of the inbox. |
| `namespaceId` | `string \| null` | The id of the namespace. |
| `namespaceName` | `string \| null` | The display name of the namespace. |
| `agentId` | `string \| null` | The AI agent identifier. |

### `inboxes.update(inboxId: string, body: UpdateInboxRequest, options?: RequestOptions)`

Updates the display name of an inbox, used as the sender name on messages it sends. Set the name to null to clear it. Returns the inbox id.

- **HTTP**: `PATCH /inboxes/{inboxId}`
- **Returns**: `IdResponse`

**UpdateInboxRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name?` | `string \| null` | The display name of the inbox. |

**IdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the resource. |

## inboxes.messages

### `inboxes.messages.send(inboxId: string, body: SendMessageRequest, options?: IdempotentRequestOptions)`

Sends a new email from an inbox to one or more recipients. The message is queued for delivery and the response returns its id, thread id, and Message-ID.

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

## inboxes.threads

### `inboxes.threads.list(inboxId: string, query?: ThreadsQuery, options?: RequestOptions)`

Lists the threads in an inbox, most recently active first, with cursor pagination. Filter by labels; spam and trash threads are excluded by default.

- **HTTP**: `GET /inboxes/{inboxId}/threads`
- **Returns**: `CursorPage<ThreadsResponseItem>`
- **Paginated**: yes

**ThreadsResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the thread |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt?` | `string` | Date at which the object was updated (ISO 8601 format) |
| `domainId` | `string \| null` | The id of the domain. |
| `domainName` | `string` | The domain name. |
| `inboxId` | `string` | The id of the inbox. |
| `subject` | `string` | The original subject line. |
| `lastMessageAt` | `string` | The timestamp of the most recent message. |
| `messageCount` | `number` | The number of messages in the thread. |
| `labels` | `Array<string>` | Aggregated labels from all messages in the thread. |
| `agentId` | `string \| null` | The AI agent identifier. |

## messages

### `messages.forward(messageId: string, body: ForwardMessageRequest, options?: IdempotentRequestOptions)`

Sends a message with a Fwd: subject from the inbox of the original message to one or more new recipients, in a new thread, with an optional text note.

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

### `messages.list(query?: MessagesQuery, options?: RequestOptions)`

Lists messages newest first, with cursor pagination and optional filters by domain and sender. Each item includes its labels, status and attachment count.

- **HTTP**: `GET /messages`
- **Returns**: `CursorPage<MessagesResponseItem>`
- **Paginated**: yes

**MessagesResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the message |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `inboxId` | `string \| null` | The id of the inbox, or null if routed to the default catch-all. |
| `threadId` | `string` | The id of the thread. |
| `messageId` | `string` | The email Message-ID header. |
| `from` | `string` | The sender address (RFC 5322 format, e.g. "Jane Doe <jane@example.com>" or "jane@example.com"). |
| `to` | `Array<string>` | The recipient addresses. |
| `cc` | `Array<string> \| null` | The CC addresses. |
| `bcc` | `Array<string> \| null` | The BCC addresses. |
| `replyTo` | `Array<string> \| null` | The Reply-To addresses. |
| `subject` | `string` | The message subject. |
| `receivedAt` | `string` | The original date of the message. |
| `status` | `'received' \| 'sent' \| 'discarded' \| 'failed'` | The status of the message |
| `labels` | `Array<string>` | The message labels. |
| `attachmentCount` | `number` | The number of attachments. |

### `messages.reply(messageId: string, body: ReplyMessageRequest, options?: IdempotentRequestOptions)`

Replies from the inbox that holds the message, in the same thread. Set replyAll to true to also copy the other recipients. The send is queued.

- **HTTP**: `POST /messages/{messageId}/reply`
- **Returns**: `SendMessageResponse`

**ReplyMessageRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `text?` | `string` | The plain text body. |
| `html?` | `string` | The HTML body. |
| `replyAll?` | `boolean` | Whether to reply to all recipients. |

**SendMessageResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the message |
| `threadId` | `string` | The id of the thread. |
| `messageId` | `string` | The RFC 5322 Message-ID header. |
| `subject` | `string` | The subject of the message. |

### `messages.retrieve(messageId: string, options?: RequestOptions)`

Retrieves a received or sent message by id, including its sender, recipients, subject, labels, status, attachment count and raw headers.

- **HTTP**: `GET /messages/{messageId}`
- **Returns**: `MessageResponse`

**MessageResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the message |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `inboxId` | `string \| null` | The id of the inbox, or null if routed to the default catch-all. |
| `threadId` | `string` | The id of the thread. |
| `messageId` | `string` | The email Message-ID header. |
| `from` | `string` | The sender address (RFC 5322 format, e.g. "Jane Doe <jane@example.com>" or "jane@example.com"). |
| `to` | `Array<string>` | The recipient addresses. |
| `cc` | `Array<string> \| null` | The CC addresses. |
| `bcc` | `Array<string> \| null` | The BCC addresses. |
| `replyTo` | `Array<string> \| null` | The Reply-To addresses. |
| `subject` | `string` | The message subject. |
| `receivedAt` | `string` | The original date of the message. |
| `status` | `'received' \| 'sent' \| 'discarded' \| 'failed'` | The status of the message |
| `labels` | `Array<string>` | The message labels. |
| `attachmentCount` | `number` | The number of attachments. |
| `headers` | `Record<string, string> \| null` | The raw email headers. |

### `messages.update(messageId: string, body: UpdateMessageRequest, options?: RequestOptions)`

Adds or removes labels on a message. Only messages in user-created inboxes accept labels, and a message can hold at most 10 labels.

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

## messages.attachments

### `messages.attachments.list(messageId: string, options?: RequestOptions)`

Lists the attachments of a message with their filename, content type, size, disposition and content id. Download links are not included.

- **HTTP**: `GET /messages/{messageId}/attachments`
- **Returns**: `AttachmentsResponse`

**AttachmentResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the attachment |
| `filename` | `string \| null` | The original filename. |
| `contentType` | `string` | The MIME content type. |
| `size` | `number` | The size in bytes. |
| `contentDisposition` | `string \| null` | The content disposition (inline or attachment). |
| `contentId` | `string \| null` | The CID for inline images. |
| `downloadUrl?` | `string` | Presigned download URL (included when retrieving a single attachment). |

### `messages.attachments.retrieve(messageId: string, attachmentId: string, options?: RequestOptions)`

Retrieves the metadata of an attachment and a temporary download URL that expires after 15 minutes. Use it to fetch the attachment file itself.

- **HTTP**: `GET /messages/{messageId}/attachments/{attachmentId}`
- **Returns**: `AttachmentResponse`

**AttachmentResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the attachment |
| `filename` | `string \| null` | The original filename. |
| `contentType` | `string` | The MIME content type. |
| `size` | `number` | The size in bytes. |
| `contentDisposition` | `string \| null` | The content disposition (inline or attachment). |
| `contentId` | `string \| null` | The CID for inline images. |
| `downloadUrl?` | `string` | Presigned download URL (included when retrieving a single attachment). |

## messages.content

### `messages.content.retrieve(messageId: string, query?: MessageContentQuery, options?: RequestOptions)`

Returns temporary download URLs, valid for 2 minutes, for the HTML, plain-text or raw MIME content of a message. Only HTML is returned by default.

- **HTTP**: `GET /messages/{messageId}/content`
- **Returns**: `MessageContent`

**MessageContent**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `text` | `MessageContentItem \| null` | Plain text content, or `null` if not requested or unavailable. |
| `html` | `MessageContentItem \| null` | HTML content, or `null` if not requested or unavailable. |
| `mime` | `MessageContentItem \| null` | Raw MIME (.eml) content, or `null` if not requested or unavailable. Returned for received messages only. |

## namespaces

### `namespaces.create(body: CreateNamespaceRequest, options?: RequestOptions)`

Creates a namespace to group inboxes, with a display name and an optional external id that maps it to a customer or tenant in your own system.

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
| `externalId` | `string \| null` | The external identifier for the namespace. |

### `namespaces.delete(namespaceId: string, options?: RequestOptions)`

Deletes a namespace by id. The request is rejected with a validation error while the namespace still has active inboxes, so delete them first.

- **HTTP**: `DELETE /namespaces/{namespaceId}`
- **Returns**: `IdResponse`

**IdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the resource. |

### `namespaces.list(query?: NamespacesQuery, options?: RequestOptions)`

Lists the namespaces of your organization, newest first, with cursor pagination. Each item includes the name and the optional external id.

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
| `externalId` | `string \| null` | The external identifier for the namespace. |

### `namespaces.retrieve(namespaceId: string, options?: RequestOptions)`

Retrieves a namespace by id with its name, its optional external id, and inbox counts, including how many of its inboxes are currently active.

- **HTTP**: `GET /namespaces/{namespaceId}`
- **Returns**: `NamespaceDetail`

**NamespaceDetail**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the namespace |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt?` | `string` | Date at which the object was updated (ISO 8601 format) |
| `name` | `string` | The display name of the namespace. |
| `externalId` | `string \| null` | The external identifier for the namespace. |
| `inboxCount` | `number` | The total number of inboxes in this namespace. |
| `activeInboxCount` | `number` | The number of active inboxes in this namespace. |

### `namespaces.update(namespaceId: string, body: UpdateNamespaceRequest, options?: RequestOptions)`

Updates the display name or external id of a namespace. Set the external id to null to clear it. Returns the id of the updated namespace.

- **HTTP**: `PATCH /namespaces/{namespaceId}`
- **Returns**: `IdResponse`

**UpdateNamespaceRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name?` | `string` | The display name of the namespace. |
| `externalId?` | `string \| null` | An optional external identifier for the namespace. |

**IdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the resource. |

## namespaces.inboxes

### `namespaces.inboxes.list(namespaceId: string, query?: NamespaceInboxesQuery, options?: RequestOptions)`

Lists the active inboxes assigned to a namespace, newest first, with cursor pagination. Returns the same inbox objects as the inbox list.

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
| `name` | `string \| null` | The display name of the inbox. |
| `namespaceId` | `string \| null` | The id of the namespace. |
| `namespaceName` | `string \| null` | The display name of the namespace. |
| `agentId` | `string \| null` | The AI agent identifier. |

## organizations

### `organizations.list(query?: CursorPageParams, options?: RequestOptions)`

Lists the organization that the API key belongs to, with its id, name, and status. The result is paginated with a cursor like other list endpoints.

- **HTTP**: `GET /organizations`
- **Returns**: `CursorPage<OrganizationsResponseItem>`
- **Paginated**: yes

**OrganizationsResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the organization |
| `name` | `string` | The name of the organization |
| `status` | `'enabled' \| 'disabled'` | The status of the organization |

### `organizations.retrieve(id: string, options?: RequestOptions)`

Retrieves the organization that the API key belongs to by id, returning its name and its status (enabled or disabled).

- **HTTP**: `GET /organizations/{id}`
- **Returns**: `OrganizationResponse`

**OrganizationResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the organization |
| `name` | `string` | The name of the organization |
| `status` | `'enabled' \| 'disabled'` | The status of the organization |

## organizations.usage

### `organizations.usage.retrieve(id: string, options?: RequestOptions)`

Returns the daily and monthly email usage of the organization, with each limit, its reset time, and a breakdown by channel.

- **HTTP**: `GET /organizations/{id}/usage`
- **Returns**: `OrganizationUsageResponse`

**OrganizationUsageResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `email` | `{ daily: { used: number; limit: number \| null; breakdown: { transactional: { sent: number; received: number }; broadcast: { sent: number } }; resetsAt: string }; monthly: { used: number; limit: number \| null; breakdown: { transactional: { sent: number; received: number }; broadcast: { sent: number } }; resetsAt: string \| null } }` |  |

## segments

### `segments.create(body: CreateSegmentRequest, options?: RequestOptions)`

Create an organization-level static segment.

- **HTTP**: `POST /segments`
- **Returns**: `SegmentResponse`

**CreateSegmentRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name` | `string` | A name for the segment, shown to your team. Stored lowercased and trimmed. |

**SegmentResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the segment. |
| `name` | `string` | A name for the segment, shown to your team. Stored lowercased and trimmed. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string` | Date at which the object was updated (ISO 8601 format) |

### `segments.delete(segmentId: string, options?: RequestOptions)`

Delete a segment.

- **HTTP**: `DELETE /segments/{segmentId}`
- **Returns**: `IdResponse`

**IdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the resource. |

### `segments.list(query?: CursorPageParams, options?: RequestOptions)`

List the organization segments.

- **HTTP**: `GET /segments`
- **Returns**: `CursorPage<SegmentsResponseItem>`
- **Paginated**: yes

**SegmentsResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the segment. |
| `name` | `string` | A name for the segment, shown to your team. Stored lowercased and trimmed. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string` | Date at which the object was updated (ISO 8601 format) |

### `segments.retrieve(segmentId: string, options?: RequestOptions)`

Retrieve one segment.

- **HTTP**: `GET /segments/{segmentId}`
- **Returns**: `SegmentResponse`

**SegmentResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the segment. |
| `name` | `string` | A name for the segment, shown to your team. Stored lowercased and trimmed. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string` | Date at which the object was updated (ISO 8601 format) |

### `segments.update(segmentId: string, body: UpdateSegmentRequest, options?: RequestOptions)`

Rename a segment.

- **HTTP**: `PATCH /segments/{segmentId}`
- **Returns**: `IdResponse`

**UpdateSegmentRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name` | `string` | A name for the segment, shown to your team. Stored lowercased and trimmed. |

**IdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the resource. |

## segments.members

### `segments.members.list(segmentId: string, query?: CursorPageParams, options?: RequestOptions)`

List the members of a segment.

- **HTTP**: `GET /segments/{segmentId}/members`
- **Returns**: `CursorPage<SegmentMembersResponseItem>`
- **Paginated**: yes

**SegmentMembersResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `contactId` | `string` | The id of the contact. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |

## templates

### `templates.create(body: CreateTemplateRequest, options?: RequestOptions)`

Create a template.

- **HTTP**: `POST /templates`
- **Returns**: `TemplateResponse`

**CreateTemplateRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name` | `string` | A name for the template, shown only to your team. |

**TemplateResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the template. |
| `name` | `string` | A name for the template, shown only to your team. |
| `status` | `'draft' \| 'published'` | The lifecycle state of the template. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string` | Date at which the object was updated (ISO 8601 format) |

### `templates.delete(templateId: string, options?: RequestOptions)`

Delete a template and its versions.

- **HTTP**: `DELETE /templates/{templateId}`
- **Returns**: `IdResponse`

**IdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the resource. |

### `templates.list(query?: CursorPageParams, options?: RequestOptions)`

List the organization templates.

- **HTTP**: `GET /templates`
- **Returns**: `CursorPage<TemplatesResponseItem>`
- **Paginated**: yes

**TemplatesResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the template. |
| `name` | `string` | A name for the template, shown only to your team. |
| `status` | `'draft' \| 'published'` | The lifecycle state of the template. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string` | Date at which the object was updated (ISO 8601 format) |

### `templates.retrieve(templateId: string, options?: RequestOptions)`

Retrieve one template.

- **HTTP**: `GET /templates/{templateId}`
- **Returns**: `TemplateResponse`

**TemplateResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the template. |
| `name` | `string` | A name for the template, shown only to your team. |
| `status` | `'draft' \| 'published'` | The lifecycle state of the template. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string` | Date at which the object was updated (ISO 8601 format) |

### `templates.update(templateId: string, body: UpdateTemplateRequest, options?: RequestOptions)`

Rename a template.

- **HTTP**: `PATCH /templates/{templateId}`
- **Returns**: `IdResponse`

**UpdateTemplateRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name?` | `string` | A name for the template, shown only to your team. |

**IdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the resource. |

## templates.versions

### `templates.versions.create(templateId: string, body: CreateTemplateVersionRequest, options?: RequestOptions)`

Create a draft version of a template.

- **HTTP**: `POST /templates/{templateId}/versions`
- **Returns**: `TemplateVersionResponse`

**CreateTemplateVersionRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `subject` | `string` |  |
| `html` | `string` |  |
| `text?` | `string` | The plain-text body. |
| `variables?` | `Array<VariableDeclaration>` | Variables the content may reference, at most 20. Immutable once created. |

**TemplateVersionResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the content version. |
| `templateId` | `string` | The id of the template. |
| `status` | `'draft' \| 'active'` | The lifecycle state of the content version. |
| `subject` | `string` |  |
| `publishedAt?` | `string` | Date at which this version was published. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string` | Date at which the object was updated (ISO 8601 format) |
| `variables?` | `Array<VariableDeclaration>` | The declared variables. |

### `templates.versions.list(templateId: string, query?: CursorPageParams, options?: RequestOptions)`

List the versions of a template.

- **HTTP**: `GET /templates/{templateId}/versions`
- **Returns**: `CursorPage<TemplateVersionsResponseItem>`
- **Paginated**: yes

**TemplateVersionsResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the content version. |
| `templateId` | `string` | The id of the template. |
| `status` | `'draft' \| 'active'` | The lifecycle state of the content version. |
| `subject` | `string` |  |
| `publishedAt?` | `string` | Date at which this version was published. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string` | Date at which the object was updated (ISO 8601 format) |
| `variables?` | `Array<VariableDeclaration>` | The declared variables. |

### `templates.versions.publish(templateId: string, versionId: string, options?: RequestOptions)`

Publish a draft template version.

- **HTTP**: `PATCH /templates/{templateId}/versions/{versionId}/publish`
- **Returns**: `TemplateVersionIdResponse`

**TemplateVersionIdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the template. |
| `templateVersionId` | `string` | The id of the version that was published. |

### `templates.versions.retrieve(templateId: string, versionId: string, options?: RequestOptions)`

Retrieve one content version.

- **HTTP**: `GET /templates/{templateId}/versions/{versionId}`
- **Returns**: `TemplateVersionResponse`

**TemplateVersionResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the content version. |
| `templateId` | `string` | The id of the template. |
| `status` | `'draft' \| 'active'` | The lifecycle state of the content version. |
| `subject` | `string` |  |
| `publishedAt?` | `string` | Date at which this version was published. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string` | Date at which the object was updated (ISO 8601 format) |
| `variables?` | `Array<VariableDeclaration>` | The declared variables. |

## templates.versions.content

### `templates.versions.content.retrieve(templateId: string, versionId: string, options?: RequestOptions)`

Get download links for a version's HTML and text.

- **HTTP**: `GET /templates/{templateId}/versions/{versionId}/content`
- **Returns**: `TemplateVersionContentResponse`

**TemplateVersionContentResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `html` | `{ status: 'available'; downloadUrl: string; expiresAt: string } \| { status: 'absent' } \| { status: 'unavailable' }` |  |
| `text` | `{ status: 'available'; downloadUrl: string; expiresAt: string } \| { status: 'absent' } \| { status: 'unavailable' }` |  |

## threads

### `threads.retrieve(threadId: string, query?: RetrieveThreadQuery, options?: RequestOptions)`

Retrieves a thread with its subject, message count, last activity and labels from all its messages. Pass markRead=true to clear unread labels.

- **HTTP**: `GET /threads/{threadId}`
- **Returns**: `ThreadResponse`

**ThreadResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the thread |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt?` | `string` | Date at which the object was updated (ISO 8601 format) |
| `domainId` | `string \| null` | The id of the domain. |
| `domainName` | `string` | The domain name. |
| `inboxId` | `string` | The id of the inbox. |
| `subject` | `string` | The original subject line. |
| `lastMessageAt` | `string` | The timestamp of the most recent message. |
| `messageCount` | `number` | The number of messages in the thread. |
| `labels` | `Array<string>` | Aggregated labels from all messages in the thread. |
| `agentId` | `string \| null` | The AI agent identifier. |

### `threads.update(threadId: string, body: UpdateThreadRequest, options?: RequestOptions)`

Adds or removes labels on every message in a thread, or sets its agent. Label operations only work on threads in user-created inboxes.

- **HTTP**: `PATCH /threads/{threadId}`
- **Returns**: `IdResponse`

**UpdateThreadRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `addLabels?` | `Array<string>` | Labels to add to all messages in the thread. |
| `removeLabels?` | `Array<string>` | Labels to remove from all messages in the thread. |
| `agentId?` | `string \| null` | The AI agent identifier. |

**IdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the resource. |

## threads.messages

### `threads.messages.list(threadId: string, query?: CursorPageParams, options?: RequestOptions)`

Lists the messages in a thread in chronological order, oldest first, with cursor pagination. Returns up to 30 messages per page.

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
| `cc` | `Array<string> \| null` | The CC addresses. |
| `bcc` | `Array<string> \| null` | The BCC addresses. |
| `replyTo` | `Array<string> \| null` | The Reply-To addresses. |
| `subject` | `string` | The message subject. |
| `receivedAt` | `string` | The original date of the message. |
| `status` | `'received' \| 'sent' \| 'discarded' \| 'failed'` | The status of the message |
| `labels` | `Array<string>` | The message labels. |
| `attachmentCount` | `number` | The number of attachments. |

## topics

### `topics.create(body: CreateTopicRequest, options?: RequestOptions)`

Create a topic.

- **HTTP**: `POST /topics`
- **Returns**: `TopicResponse`

**CreateTopicRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name` | `string` | A name for the topic, shown to your team. Stored lowercased and trimmed. |

**TopicResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the topic. |
| `name` | `string` | A name for the topic, shown to your team. Stored lowercased and trimmed. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string` | Date at which the object was updated (ISO 8601 format) |

### `topics.delete(topicId: string, options?: RequestOptions)`

Delete a topic.

- **HTTP**: `DELETE /topics/{topicId}`
- **Returns**: `IdResponse`

**IdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the resource. |

### `topics.list(query?: CursorPageParams, options?: RequestOptions)`

List the organization topics.

- **HTTP**: `GET /topics`
- **Returns**: `CursorPage<TopicsResponseItem>`
- **Paginated**: yes

**TopicsResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the topic. |
| `name` | `string` | A name for the topic, shown to your team. Stored lowercased and trimmed. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string` | Date at which the object was updated (ISO 8601 format) |

### `topics.retrieve(topicId: string, options?: RequestOptions)`

Retrieve one topic.

- **HTTP**: `GET /topics/{topicId}`
- **Returns**: `TopicResponse`

**TopicResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the topic. |
| `name` | `string` | A name for the topic, shown to your team. Stored lowercased and trimmed. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string` | Date at which the object was updated (ISO 8601 format) |

### `topics.update(topicId: string, body: UpdateTopicRequest, options?: RequestOptions)`

Rename a topic.

- **HTTP**: `PATCH /topics/{topicId}`
- **Returns**: `IdResponse`

**UpdateTopicRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name` | `string` | A name for the topic, shown to your team. Stored lowercased and trimmed. |

**IdResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the resource. |

## topics.memberships

### `topics.memberships.list(topicId: string, query?: CursorPageParams, options?: RequestOptions)`

List a topic's explicit membership records only. A contact without one is subscribed by default.

- **HTTP**: `GET /topics/{topicId}/memberships`
- **Returns**: `CursorPage<TopicMembershipsResponseItem>`
- **Paginated**: yes

**TopicMembershipsResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `contactId` | `string` | The id of the contact. |
| `state` | `'subscribed' \| 'unsubscribed'` | The subscribe/unsubscribe state. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |
| `updatedAt` | `string` | Date at which the object was updated (ISO 8601 format) |

## webhooks

### `webhooks.create(body: CreateWebhookRequest, options?: RequestOptions)`

Registers an HTTPS endpoint to receive the event types you subscribe to. The response includes the signing secret used to verify webhook payloads.

- **HTTP**: `POST /webhooks`
- **Returns**: `CreateWebhookResponse`

**CreateWebhookRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name?` | `string` | The name of the webhook |
| `endpointUrl` | `string` | The endpoint URL of the webhook |
| `status?` | `'enabled' \| 'disabled'` | The status of the webhook. |
| `events` | `Array<WebhookEventType>` | The event types to subscribe to |

**CreateWebhookResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the webhook |
| `name?` | `string` | The name of the webhook |
| `endpointUrl` | `string` | The endpoint URL of the webhook |
| `status` | `'enabled' \| 'disabled' \| 'revoked'` | The status of the webhook. |
| `disabledReason` | `'manual' \| 'auto_consecutive_failures' \| null` | The reason the webhook was disabled, or `null` if it is not disabled. |
| `disabledAt` | `string \| null` | The timestamp when the webhook was disabled, or `null` if it is not disabled. |
| `events` | `Array<EventType>` | The event types to subscribe to |
| `signingSecret` | `string` | The signing secret of the webhook. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |

### `webhooks.delete(id: string, options?: RequestOptions)`

Permanently deletes a webhook endpoint. Events are no longer delivered to its URL after deletion. This cannot be undone.

- **HTTP**: `DELETE /webhooks/{id}`
- **Returns**: `DeleteWebhookResponse`

**DeleteWebhookResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the webhook |

### `webhooks.list(query?: CursorPageParams, options?: RequestOptions)`

Lists the webhook endpoints of your organization, newest first, with cursor pagination. Each entry shows its URL, event types, and status.

- **HTTP**: `GET /webhooks`
- **Returns**: `CursorPage<WebhooksResponseItem>`
- **Paginated**: yes

**WebhooksResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the webhook |
| `name?` | `string` | The name of the webhook |
| `endpointUrl` | `string` | The endpoint URL of the webhook |
| `status` | `'enabled' \| 'disabled' \| 'revoked'` | The status of the webhook. |
| `disabledReason` | `'manual' \| 'auto_consecutive_failures' \| null` | The reason the webhook was disabled, or `null` if it is not disabled. |
| `disabledAt` | `string \| null` | The timestamp when the webhook was disabled, or `null` if it is not disabled. |
| `events` | `Array<EventType>` | The event types to subscribe to |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |

### `webhooks.retrieve(id: string, options?: RequestOptions)`

Retrieves a webhook endpoint with its URL, subscribed event types, status, and the reason and time it was disabled, if it is disabled.

- **HTTP**: `GET /webhooks/{id}`
- **Returns**: `WebhookResponse`

**WebhookResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the webhook |
| `name?` | `string` | The name of the webhook |
| `endpointUrl` | `string` | The endpoint URL of the webhook |
| `events` | `Array<EventType>` | The event types to subscribe to |
| `status` | `'enabled' \| 'disabled' \| 'revoked'` | The status of the webhook. |
| `disabledReason` | `'manual' \| 'auto_consecutive_failures' \| null` | The reason the webhook was disabled, or `null` if it is not disabled. |
| `disabledAt` | `string \| null` | The timestamp when the webhook was disabled, or `null` if it is not disabled. |
| `createdAt` | `string` | Date at which the object was created (ISO 8601 format) |

### `webhooks.update(id: string, body: UpdateWebhookRequest, options?: RequestOptions)`

Updates the name, URL, event types, or status of a webhook, or rotates its signing secret. The new secret is returned only when you rotate it.

- **HTTP**: `PATCH /webhooks/{id}`
- **Returns**: `UpdateWebhookResponse`

**UpdateWebhookRequest**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name?` | `string` | The name of the webhook |
| `endpointUrl?` | `string` | The endpoint URL of the webhook |
| `events?` | `Array<WebhookEventType>` | The event types to subscribe to |
| `status?` | `'enabled' \| 'disabled'` | The status of the webhook. |
| `rotateSecret?` | `boolean` | If true, a new signing secret will be generated |

**UpdateWebhookResponse**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | The id of the webhook |
| `signingSecret?` | `string` | The signing secret of the webhook. |

## webhooks.events

### `webhooks.events.list(query?: CursorPageParams, options?: RequestOptions)`

Lists the webhook events of the last 48 hours across all your endpoints, with their delivery status and payload. Results use cursor pagination.

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
| `data` | `Record<string, unknown>` |  |
| `status` | `'success' \| 'pending' \| 'failed'` | Status of the webhook delivery attempt |

### `webhooks.events.replay(id: string, eventId: string, options?: RequestOptions)`

Queues a new delivery of a past webhook event to the endpoint. The request is accepted asynchronously and returns 202 before the delivery runs.

- **HTTP**: `POST /webhooks/{id}/events/{eventId}/replay`
- **Returns**: `void`

## webhooks.events.deliveries

### `webhooks.events.deliveries.list(id: string, eventId: string, options?: RequestOptions)`

Lists the delivery attempts of a webhook event to an endpoint, with the status, HTTP response code, response data, and delivery time of each attempt.

- **HTTP**: `GET /webhooks/{id}/events/{eventId}/deliveries`
- **Returns**: `WebhookEventDeliveriesResponse`

**WebhookEventDeliveriesResponseItem**

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` |  |
| `deliveredAt` | `string` |  |
| `code` | `string` |  |
| `status` | `'pending' \| 'success' \| 'failed'` |  |
| `response` | `Record<string, unknown>` |  |
