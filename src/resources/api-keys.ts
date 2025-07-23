// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class APIKeys extends APIResource {
  /**
   * Create a new api key
   *
   * @example
   * ```ts
   * const apiKey = await client.apiKeys.create();
   * ```
   */
  create(
    body: APIKeyCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<APIKeyCreateResponse> {
    return (
      this._client.post('/api-keys', { body, ...options }) as APIPromise<{ data: APIKeyCreateResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Return the api-key with the given ID
   *
   * @example
   * ```ts
   * const apiKey = await client.apiKeys.retrieve(
   *   'apk_pdGukGd4BTmHj8dscBDE5Mc9',
   * );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<APIKeyRetrieveResponse> {
    return (
      this._client.get(path`/api-keys/${id}`, options) as APIPromise<{ data: APIKeyRetrieveResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Updates partial api key fields with the given id
   *
   * @example
   * ```ts
   * const apiKey = await client.apiKeys.update(
   *   'ak_pdGukGd4BTmHj8dscBDE5Mc9',
   * );
   * ```
   */
  update(id: string, body: APIKeyUpdateParams, options?: RequestOptions): APIPromise<APIKeyUpdateResponse> {
    return (
      this._client.put(path`/api-keys/${id}`, { body, ...options }) as APIPromise<{
        data: APIKeyUpdateResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Return a list of your api keys
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const apiKeyListResponse of client.apiKeys.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: APIKeyListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<APIKeyListResponsesCursorPage, APIKeyListResponse> {
    return this._client.getAPIList('/api-keys', CursorPage<APIKeyListResponse>, { query, ...options });
  }

  /**
   * Delete the api key with the given ID
   *
   * @example
   * ```ts
   * const apiKey = await client.apiKeys.delete(
   *   'ak_pdGukGd4BTmHj8dscBDE5Mc9',
   * );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<APIKeyDeleteResponse> {
    return (
      this._client.delete(path`/api-keys/${id}`, options) as APIPromise<{ data: APIKeyDeleteResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export type APIKeyListResponsesCursorPage = CursorPage<APIKeyListResponse>;

export interface APIKeyCreateResponse {
  /**
   * The id of the api key
   */
  id: string;

  /**
   * The content of the api key
   */
  apikey: string;

  /**
   * The truncated content of the api key
   */
  apikey_truncated: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

  /**
   * The kind of object returned
   */
  kind: 'api-key';

  /**
   * The id of the organization
   */
  org_id: string;

  /**
   * The region of the related data
   */
  region: 'eu-west-1';

  /**
   * The status of the api key
   */
  status: 'enabled' | 'disabled' | 'revoked';

  /**
   * The id of the user
   */
  user_id: string;

  /**
   * Date at which the object was modified (ISO 8601 format)
   */
  modified_at?: string;

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
   * The truncated content of the api key
   */
  apikey_truncated: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

  /**
   * The kind of object returned
   */
  kind: 'api-key';

  /**
   * The id of the organization
   */
  org_id: string;

  /**
   * The region of the related data
   */
  region: 'eu-west-1';

  /**
   * The status of the api key
   */
  status: 'enabled' | 'disabled' | 'revoked';

  /**
   * The id of the user
   */
  user_id: string;

  /**
   * Date at which the object was modified (ISO 8601 format)
   */
  modified_at?: string;

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

  /**
   * The kind of object returned
   */
  kind: 'api-key';

  /**
   * The id of the organization
   */
  org_id: string;
}

export interface APIKeyListResponse {
  /**
   * The id of the api key
   */
  id: string;

  /**
   * The truncated content of the api key
   */
  apikey_truncated: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

  /**
   * The kind of object returned
   */
  kind: 'api-key';

  /**
   * The id of the organization
   */
  org_id: string;

  /**
   * The region of the related data
   */
  region: 'eu-west-1';

  /**
   * The status of the api key
   */
  status: 'enabled' | 'disabled' | 'revoked';

  /**
   * The id of the user
   */
  user_id: string;

  /**
   * Date at which the object was modified (ISO 8601 format)
   */
  modified_at?: string;

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

  /**
   * The kind of object returned
   */
  kind: 'api-key';

  /**
   * The id of the organization
   */
  org_id: string;
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

export interface APIKeyListParams extends CursorPageParams {}

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
    type APIKeyListParams as APIKeyListParams,
  };
}
