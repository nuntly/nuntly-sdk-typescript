// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as APIKeysAPI from './api-keys';

export class APIKeys extends APIResource {
  /**
   * Create a new api key
   */
  create(body?: APIKeyCreateParams, options?: Core.RequestOptions): Core.APIPromise<APIKeyCreateResponse>;
  create(options?: Core.RequestOptions): Core.APIPromise<APIKeyCreateResponse>;
  create(
    body: APIKeyCreateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<APIKeyCreateResponse> {
    if (isRequestOptions(body)) {
      return this.create({}, body);
    }
    return (
      this._client.post('/api-keys', { body, ...options }) as Core.APIPromise<{ data: APIKeyCreateResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Return the api-key with the given ID
   */
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<APIKeyRetrieveResponse> {
    return (
      this._client.get(`/api-keys/${id}`, options) as Core.APIPromise<{ data: APIKeyRetrieveResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Updates partial api key fields with the given id
   */
  update(
    id: string,
    body: APIKeyUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<APIKeyUpdateResponse> {
    return (
      this._client.put(`/api-keys/${id}`, { body, ...options }) as Core.APIPromise<{
        data: APIKeyUpdateResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Return a list of your api keys
   */
  list(options?: Core.RequestOptions): Core.APIPromise<APIKeyListResponse> {
    return (
      this._client.get('/api-keys', options) as Core.APIPromise<{ data: APIKeyListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Delete the api key with the given ID
   */
  delete(id: string, options?: Core.RequestOptions): Core.APIPromise<APIKeyDeleteResponse> {
    return (
      this._client.delete(`/api-keys/${id}`, options) as Core.APIPromise<{ data: APIKeyDeleteResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export interface APIKeyCreateResponse {
  /**
   * The id of the api key
   */
  id: string;

  /**
   * The value of the api key
   */
  apikey: string;

  /**
   * The truncated value of the api key
   */
  apikey_truncated: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

  /**
   * The user who created the object
   */
  created_by: string;

  /**
   * The status of the api key
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
   * The truncated value of the api key
   */
  apikey_truncated: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

  /**
   * The user who created the object
   */
  created_by: string;

  /**
   * Date at which the object was modified (ISO 8601 format)
   */
  modified_at: string;

  /**
   * The last user who modified the object
   */
  modified_by: string;

  /**
   * The status of the api key
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

/**
 * The api keys registered in your account
 */
export type APIKeyListResponse = Array<APIKeyListResponse.APIKeyListResponseItem>;

export namespace APIKeyListResponse {
  export interface APIKeyListResponseItem {
    /**
     * The id of the api key
     */
    id: string;

    /**
     * The truncated value of the api key
     */
    apikey_truncated: string;

    /**
     * Date at which the object was created (ISO 8601 format)
     */
    created_at: string;

    /**
     * The user who created the object
     */
    created_by: string;

    /**
     * Date at which the object was modified (ISO 8601 format)
     */
    modified_at: string;

    /**
     * The last user who modified the object
     */
    modified_by: string;

    /**
     * The status of the api key
     */
    status: 'enabled' | 'disabled' | 'revoked';

    /**
     * The name of the api key
     */
    name?: string;
  }
}

export interface APIKeyDeleteResponse {
  /**
   * The id of the api key
   */
  id: string;
}

export interface APIKeyCreateParams {
  /**
   * The name of the api key
   */
  name?: string;
}

export interface APIKeyUpdateParams {
  /**
   * The name of the api key
   */
  name?: string;

  /**
   * The status of the api key
   */
  status?: 'enabled' | 'disabled';
}

export namespace APIKeys {
  export import APIKeyCreateResponse = APIKeysAPI.APIKeyCreateResponse;
  export import APIKeyRetrieveResponse = APIKeysAPI.APIKeyRetrieveResponse;
  export import APIKeyUpdateResponse = APIKeysAPI.APIKeyUpdateResponse;
  export import APIKeyListResponse = APIKeysAPI.APIKeyListResponse;
  export import APIKeyDeleteResponse = APIKeysAPI.APIKeyDeleteResponse;
  export import APIKeyCreateParams = APIKeysAPI.APIKeyCreateParams;
  export import APIKeyUpdateParams = APIKeysAPI.APIKeyUpdateParams;
}
