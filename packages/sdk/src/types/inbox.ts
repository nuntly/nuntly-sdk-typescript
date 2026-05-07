/**
 * @example
 *     await nuntly.inboxes.create({
 *       address: 'address_value',
 *     });
 */
export interface CreateInboxRequest {
  /** The id of the domain for this inbox. Defaults to your provided domain when omitted. */
  domainId?: string;
  /** The local-part of the email address (before the @). */
  address: string;
  /** The display name of the inbox. */
  name?: string;
  /** The id of the namespace to assign the inbox to. */
  namespaceId?: string;
  /** The external AI agent identifier. */
  agentId?: string;
}

export interface InboxDetailResponse {
  /** The id of the inbox */
  id: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt?: string;
  /** The id of the domain. */
  domainId: string;
  /** The domain name. */
  domainName: string;
  /** The local-part of the email address. */
  address: string;
  /** The display name of the inbox. */
  name: string | null;
  /** The id of the namespace. */
  namespaceId: string | null;
  /** The display name of the namespace. */
  namespaceName: string | null;
  /** The AI agent identifier. */
  agentId: string | null;
}

export interface InboxResponse {
  /** The id of the inbox */
  id: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt?: string;
  /** The id of the domain. */
  domainId: string;
  /** The domain name. */
  domainName: string;
  /** The local-part of the email address. */
  address: string;
  /** The display name of the inbox. */
  name: string | null;
  /** The id of the namespace. */
  namespaceId: string | null;
  /** The display name of the namespace. */
  namespaceName: string | null;
  /** The AI agent identifier. */
  agentId: string | null;
}

export interface InboxesQuery {
  /** The cursor to retrieve the next page of results */
  cursor?: string;
  /** The maximum number of results to return */
  limit?: number;
  /** Filter by namespace. */
  namespaceId?: string;
}

/** A single item from InboxesResponse. */
export interface InboxesResponseItem {
  /** The id of the inbox */
  id: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt?: string;
  /** The id of the domain. */
  domainId: string;
  /** The domain name. */
  domainName: string;
  /** The local-part of the email address. */
  address: string;
  /** The display name of the inbox. */
  name: string | null;
  /** The id of the namespace. */
  namespaceId: string | null;
  /** The display name of the namespace. */
  namespaceName: string | null;
  /** The AI agent identifier. */
  agentId: string | null;
}

export interface UpdateInboxRequest {
  /** The display name of the inbox. */
  name?: string | null;
}
