/**
 * @example
 *     await nuntly.namespaces.create({
 *       name: 'Customer support',
 *     });
 */
export interface CreateNamespaceRequest {
  /** The display name of the namespace. */
  name: string;
  /** An optional external identifier for the namespace. */
  externalId?: string;
}

export interface NamespaceDetail {
  /** The id of the namespace */
  id: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt?: string;
  /** The display name of the namespace. */
  name: string;
  /** The external identifier for the namespace. */
  externalId: string | null;
  /** The total number of inboxes in this namespace. */
  inboxCount: number;
  /** The number of active inboxes in this namespace. */
  activeInboxCount: number;
}

export interface NamespaceResponse {
  /** The id of the namespace */
  id: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt?: string;
  /** The display name of the namespace. */
  name: string;
  /** The external identifier for the namespace. */
  externalId: string | null;
}

export interface NamespacesQuery {
  /** The cursor to retrieve the next page of results */
  cursor?: string;
  /** The maximum number of results to return, from 1 to 30. Defaults to 30. */
  limit?: number;
}

/** A single item from NamespacesResponse. */
export interface NamespacesResponseItem {
  /** The id of the namespace */
  id: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt?: string;
  /** The display name of the namespace. */
  name: string;
  /** The external identifier for the namespace. */
  externalId: string | null;
}

/**
 * @example
 *     await nuntly.namespaces.update('ns_01kabn43yqyxn2bx4ve84mczd3', {
 *       name: 'Customer support',
 *     });
 */
export interface UpdateNamespaceRequest {
  /** The display name of the namespace. */
  name?: string;
  /** An optional external identifier for the namespace. */
  externalId?: string | null;
}
