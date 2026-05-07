/**
 * @example
 *     await nuntly.namespaces.create({
 *       name: 'example.com',
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

export interface NamespaceInboxesQuery {
  /** The cursor to retrieve the next page of results */
  cursor?: string;
  /** The maximum number of results to return */
  limit?: number;
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
  /** The maximum number of results to return */
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

export interface UpdateNamespaceRequest {
  /** The display name of the namespace. */
  name?: string;
  /** An optional external identifier for the namespace. */
  externalId?: string | null;
}
