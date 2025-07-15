// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Account extends APIResource {
  /**
   * Retrieve your account informations
   *
   * @example
   * ```ts
   * const account = await client.account.retrieve();
   * ```
   */
  retrieve(options?: RequestOptions): APIPromise<AccountRetrieveResponse> {
    return (
      this._client.get('/account', options) as APIPromise<{ data: AccountRetrieveResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Update your account
   *
   * @example
   * ```ts
   * const account = await client.account.update({
   *   display_name: 'Ray Tomlinson',
   * });
   * ```
   */
  update(body: AccountUpdateParams, options?: RequestOptions): APIPromise<AccountUpdateResponse> {
    return (
      this._client.patch('/account', { body, ...options }) as APIPromise<{ data: AccountUpdateResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export interface AccountRetrieveResponse {
  /**
   * The id of the user
   */
  id: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

  /**
   * The display name
   */
  display_name: string;

  /**
   * The email address associated with this account
   */
  email: string;

  /**
   * The kind of object returned
   */
  kind: 'user';

  /**
   * The region of the related data
   */
  region: 'eu-west-1';

  /**
   * Date at which the object was modified (ISO 8601 format)
   */
  modified_at?: string;

  /**
   * The profile picture of the user
   */
  picture?: string;
}

export interface AccountUpdateResponse {
  /**
   * The id of the user
   */
  id: string;

  /**
   * The kind of object returned
   */
  kind: 'user';
}

export interface AccountUpdateParams {
  /**
   * The display name
   */
  display_name: string;
}

export declare namespace Account {
  export {
    type AccountRetrieveResponse as AccountRetrieveResponse,
    type AccountUpdateResponse as AccountUpdateResponse,
    type AccountUpdateParams as AccountUpdateParams,
  };
}
