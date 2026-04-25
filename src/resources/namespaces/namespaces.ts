// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as InboxesAPI from './inboxes';
import { InboxListParams, Inboxes } from './inboxes';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Isolate inboxes by tenant, client, or agent using namespaces. Use an external ID to map namespaces to your own data model.
 */
export class Namespaces extends APIResource {
  inboxes: InboxesAPI.Inboxes = new InboxesAPI.Inboxes(this._client);

  /**
   * Create a new namespace.
   */
  create(body: NamespaceCreateParams, options?: RequestOptions): APIPromise<Namespace> {
    return (this._client.post('/namespaces', { body, ...options }) as APIPromise<{ data: Namespace }>)._thenUnwrap((obj) => obj.data);
  }

  /**
   * Retrieve a namespace with inbox stats.
   */
  retrieve(namespaceID: string, options?: RequestOptions): APIPromise<NamespaceDetail> {
    return (this._client.get(path`/namespaces/${namespaceID}`, options) as APIPromise<{ data: NamespaceDetail }>)._thenUnwrap((obj) => obj.data);
  }

  /**
   * Update a namespace.
   */
  update(namespaceID: string, body: NamespaceUpdateParams | null | undefined = {}, options?: RequestOptions): APIPromise<NamespaceUpdateResponse> {
    return (this._client.patch(path`/namespaces/${namespaceID}`, { body, ...options }) as APIPromise<{ data: NamespaceUpdateResponse }>)._thenUnwrap((obj) => obj.data);
  }

  /**
   * List all namespaces.
   */
  list(query: NamespaceListParams | null | undefined = {}, options?: RequestOptions): PagePromise<NamespacesCursorPage, Namespace> {
    return this._client.getAPIList('/namespaces', CursorPage<Namespace>, { query, ...options });
  }

  /**
   * Soft-delete a namespace. Rejects if it has active inboxes.
   */
  delete(namespaceID: string, options?: RequestOptions): APIPromise<NamespaceDeleteResponse> {
    return (this._client.delete(path`/namespaces/${namespaceID}`, options) as APIPromise<{ data: NamespaceDeleteResponse }>)._thenUnwrap((obj) => obj.data);
  }
}

export type NamespacesCursorPage = CursorPage<Namespace>

export interface Namespace {
  /**
   * The id of the namespace
   */
  id: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  createdAt: string;

  /**
   * The external identifier for the namespace.
   */
  externalId: string | null;

  /**
   * The display name of the namespace.
   */
  name: string;

  /**
   * Date at which the object was updated (ISO 8601 format)
   */
  updatedAt?: string;
}

export interface NamespaceDetail {
  /**
   * The id of the namespace
   */
  id: string;

  /**
   * The number of active inboxes in this namespace.
   */
  activeInboxCount: number;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  createdAt: string;

  /**
   * The external identifier for the namespace.
   */
  externalId: string | null;

  /**
   * The total number of inboxes in this namespace.
   */
  inboxCount: number;

  /**
   * The display name of the namespace.
   */
  name: string;

  /**
   * Date at which the object was updated (ISO 8601 format)
   */
  updatedAt?: string;
}

export interface NamespaceUpdateResponse {
  /**
   * The id of the resource.
   */
  id: string;
}

export interface NamespaceDeleteResponse {
  /**
   * The id of the resource.
   */
  id: string;
}

export interface NamespaceCreateParams {
  /**
   * The display name of the namespace.
   */
  name: string;

  /**
   * An optional external identifier for the namespace.
   */
  externalId?: string;
}

export interface NamespaceUpdateParams {
  /**
   * An optional external identifier for the namespace.
   */
  externalId?: string | null;

  /**
   * The display name of the namespace.
   */
  name?: string;
}

export interface NamespaceListParams extends CursorPageParams {
}

Namespaces.Inboxes = Inboxes;

export declare namespace Namespaces {
  export {
    type Namespace as Namespace,
    type NamespaceDetail as NamespaceDetail,
    type NamespaceUpdateResponse as NamespaceUpdateResponse,
    type NamespaceDeleteResponse as NamespaceDeleteResponse,
    type NamespacesCursorPage as NamespacesCursorPage,
    type NamespaceCreateParams as NamespaceCreateParams,
    type NamespaceUpdateParams as NamespaceUpdateParams,
    type NamespaceListParams as NamespaceListParams
  };

  export {
    Inboxes as Inboxes,
    type InboxListParams as InboxListParams
  };
}
