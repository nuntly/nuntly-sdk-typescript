# Shared

Types:

- <code><a href="./src/resources/shared.ts">Error</a></code>
- <code><a href="./src/resources/shared.ts">ErrorResponse</a></code>

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
- <code title="get /api-keys">client.apiKeys.<a href="./src/resources/api-keys.ts">list</a>() -> APIKeyListResponse</code>
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
- <code title="get /domains">client.domains.<a href="./src/resources/domains.ts">list</a>() -> DomainListResponse</code>
- <code title="delete /domains/{id}">client.domains.<a href="./src/resources/domains.ts">delete</a>(id) -> DomainDeleteResponse</code>

# Emails

Types:

- <code><a href="./src/resources/emails.ts">EmailRetrieveResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailListResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailBulkResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailCancelResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailSendResponse</a></code>

Methods:

- <code title="get /emails/{id}">client.emails.<a href="./src/resources/emails.ts">retrieve</a>(id) -> EmailRetrieveResponse</code>
- <code title="get /emails">client.emails.<a href="./src/resources/emails.ts">list</a>() -> EmailListResponse</code>
- <code title="post /emails/bulk">client.emails.<a href="./src/resources/emails.ts">bulk</a>({ ...params }) -> EmailBulkResponse</code>
- <code title="delete /emails/{id}">client.emails.<a href="./src/resources/emails.ts">cancel</a>(id) -> EmailCancelResponse</code>
- <code title="post /emails">client.emails.<a href="./src/resources/emails.ts">send</a>({ ...params }) -> EmailSendResponse</code>

# Webhooks

Types:

- <code><a href="./src/resources/webhooks.ts">WebhookCreateResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookRetrieveResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookUpdateResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookListResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookDeleteResponse</a></code>

Methods:

- <code title="post /webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">create</a>({ ...params }) -> WebhookCreateResponse</code>
- <code title="get /webhooks/{id}">client.webhooks.<a href="./src/resources/webhooks.ts">retrieve</a>(id) -> WebhookRetrieveResponse</code>
- <code title="put /webhooks/{id}">client.webhooks.<a href="./src/resources/webhooks.ts">update</a>(id, { ...params }) -> WebhookUpdateResponse</code>
- <code title="get /webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">list</a>() -> WebhookListResponse</code>
- <code title="delete /webhooks/{id}">client.webhooks.<a href="./src/resources/webhooks.ts">delete</a>(id) -> WebhookDeleteResponse</code>

# Organizations

Types:

- <code><a href="./src/resources/organizations/organizations.ts">OrganizationRetrieveResponse</a></code>
- <code><a href="./src/resources/organizations/organizations.ts">OrganizationListResponse</a></code>

Methods:

- <code title="get /organizations/{id}">client.organizations.<a href="./src/resources/organizations/organizations.ts">retrieve</a>(id) -> OrganizationRetrieveResponse</code>
- <code title="get /organizations">client.organizations.<a href="./src/resources/organizations/organizations.ts">list</a>() -> OrganizationListResponse</code>

## Memberships

Types:

- <code><a href="./src/resources/organizations/memberships.ts">MembershipListResponse</a></code>
- <code><a href="./src/resources/organizations/memberships.ts">MembershipRevokeResponse</a></code>

Methods:

- <code title="get /organizations/{id}/memberships">client.organizations.memberships.<a href="./src/resources/organizations/memberships.ts">list</a>(id) -> MembershipListResponse</code>
- <code title="delete /organizations/{id}/memberships/{user_id}">client.organizations.memberships.<a href="./src/resources/organizations/memberships.ts">revoke</a>(id, userId) -> MembershipRevokeResponse</code>

## Invitations

Types:

- <code><a href="./src/resources/organizations/invitations.ts">InvitationDeleteResponse</a></code>
- <code><a href="./src/resources/organizations/invitations.ts">InvitationSendResponse</a></code>

Methods:

- <code title="delete /organizations/{id}/invitations/{invitation_id}">client.organizations.invitations.<a href="./src/resources/organizations/invitations.ts">delete</a>(id, invitationId) -> InvitationDeleteResponse</code>
- <code title="post /organizations/{id}/invitations">client.organizations.invitations.<a href="./src/resources/organizations/invitations.ts">send</a>(id, { ...params }) -> InvitationSendResponse</code>

# Account

Types:

- <code><a href="./src/resources/account.ts">AccountRetrieveResponse</a></code>
- <code><a href="./src/resources/account.ts">AccountUpdateResponse</a></code>

Methods:

- <code title="get /account">client.account.<a href="./src/resources/account.ts">retrieve</a>() -> AccountRetrieveResponse</code>
- <code title="patch /account">client.account.<a href="./src/resources/account.ts">update</a>({ ...params }) -> AccountUpdateResponse</code>
