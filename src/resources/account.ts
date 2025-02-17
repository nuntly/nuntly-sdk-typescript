// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Account extends APIResource {
  /**
   * Retrieve your account informations
   */
  retrieve(options?: Core.RequestOptions): Core.APIPromise<AccountRetrieveResponse> {
    return (
      this._client.get('/account', options) as Core.APIPromise<{ data: AccountRetrieveResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Update your account
   */
  update(body: AccountUpdateParams, options?: Core.RequestOptions): Core.APIPromise<AccountUpdateResponse> {
    return (
      this._client.patch('/account', { body, ...options }) as Core.APIPromise<{ data: AccountUpdateResponse }>
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
   * The user who created the object
   */
  created_by: string;

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
   * The last user who modified the object
   */
  modified_by?: string;

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
