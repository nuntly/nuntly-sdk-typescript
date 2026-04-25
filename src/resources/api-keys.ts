// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Create and revoke API keys used to authenticate requests to the Nuntly API.
 */
export class APIKeys extends APIResource {
  /**
   * Generate a new API key. The key value is only returned once — store it securely.
   */
  create(body: APIKeyCreateParams | null | undefined = {}, options?: RequestOptions): APIPromise<APIKeyCreateResponse> {
    return (this._client.post('/api-keys', { body, ...options }) as APIPromise<{ data: APIKeyCreateResponse }>)._thenUnwrap((obj) => obj.data);
  }

  /**
   * Returns API key metadata. The key value is never returned after creation.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<APIKeyRetrieveResponse> {
    return (this._client.get(path`/api-keys/${id}`, options) as APIPromise<{ data: APIKeyRetrieveResponse }>)._thenUnwrap((obj) => obj.data);
  }

  /**
   * Update the key name, permissions, or restrict it to specific sending domains.
   */
  update(id: string, body: APIKeyUpdateParams, options?: RequestOptions): APIPromise<APIKeyUpdateResponse> {
    return (this._client.put(path`/api-keys/${id}`, { body, ...options }) as APIPromise<{ data: APIKeyUpdateResponse }>)._thenUnwrap((obj) => obj.data);
  }

  /**
   * Returns all API keys for the organization. Key values are never included in list
   * responses.
   */
  list(query: APIKeyListParams | null | undefined = {}, options?: RequestOptions): PagePromise<APIKeyListResponsesCursorPage, APIKeyListResponse> {
    return this._client.getAPIList('/api-keys', CursorPage<APIKeyListResponse>, { query, ...options });
  }

  /**
   * Revoke an API key. Requests authenticating with this key will be rejected
   * immediately.
   */
  delete(id: string, options?: RequestOptions): APIPromise<APIKeyDeleteResponse> {
    return (this._client.delete(path`/api-keys/${id}`, options) as APIPromise<{ data: APIKeyDeleteResponse }>)._thenUnwrap((obj) => obj.data);
  }
}

export type APIKeyListResponsesCursorPage = CursorPage<APIKeyListResponse>

export interface APIKeyCreateResponse {
  /**
   * The id of the api key
   */
  id: string;

  /**
   * The content of the api key
   */
  apiKey: string;

  /**
   * The last 6 characters of the api key token
   */
  shortToken: string;

  /**
   * The status for the api key
   */
  status: 'enabled' | 'disabled' | 'revoked';

  /**
   * The name of the api key
   */
  name?: string;
}

export interface APIKeyRetrieveResponse {
  /**
   * The id of the api key
   */
  id: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  createdAt: string;

  /**
   * The last 6 characters of the api key token
   */
  shortToken: string;

  /**
   * The status for the api key
   */
  status: 'enabled' | 'disabled' | 'revoked';

  /**
   * The name of the api key
   */
  name?: string;
}

export interface APIKeyUpdateResponse {
  /**
   * The id of the api key
   */
  id: string;
}

export interface APIKeyListResponse {
  /**
   * The id of the api key
   */
  id: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  createdAt: string;

  /**
   * The last 6 characters of the api key token
   */
  shortToken: string;

  /**
   * The status for the api key
   */
  status: 'enabled' | 'disabled' | 'revoked';

  /**
   * The name of the api key
   */
  name?: string;
}

export interface APIKeyDeleteResponse {
  /**
   * The id of the api key
   */
  id: string;
}

export interface APIKeyCreateParams {
  /**
   * The domain ids to restrict the api key to (only for sendingAccess)
   */
  domainIds?: Array<string>;

  /**
   * The name of the api key
   */
  name?: string;

  /**
   * The permission type for the api key
   */
  permission?: 'fullAccess' | 'sendingAccess';

  /**
   * The status for the api key
   */
  status?: 'enabled' | 'disabled' | 'revoked';
}

export interface APIKeyUpdateParams {
  /**
   * The permission type for the api key
   */
  permission: 'fullAccess' | 'sendingAccess';

  /**
   * The domain ids to restrict the api key to (only for sendingAccess)
   */
  domainIds?: Array<string>;

  /**
   * The name of the api key
   */
  name?: string;

  status?: 'enabled' | 'disabled';
}

export interface APIKeyListParams extends CursorPageParams {
}

export declare namespace APIKeys {
  export {
    type APIKeyCreateResponse as APIKeyCreateResponse,
    type APIKeyRetrieveResponse as APIKeyRetrieveResponse,
    type APIKeyUpdateResponse as APIKeyUpdateResponse,
    type APIKeyListResponse as APIKeyListResponse,
    type APIKeyDeleteResponse as APIKeyDeleteResponse,
    type APIKeyListResponsesCursorPage as APIKeyListResponsesCursorPage,
    type APIKeyCreateParams as APIKeyCreateParams,
    type APIKeyUpdateParams as APIKeyUpdateParams,
    type APIKeyListParams as APIKeyListParams
  };
}
