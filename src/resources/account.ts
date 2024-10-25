// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as AccountAPI from './account';

export class AccountResource extends APIResource {
  /**
   * Retrieve your account informations
   */
  retrieve(options?: Core.RequestOptions): Core.APIPromise<AccountRetrieveResponse> {
    return this._client.get('/account', options);
  }

  /**
   * Update your account
   */
  update(body: AccountUpdateParams, options?: Core.RequestOptions): Core.APIPromise<AccountUpdateResponse> {
    return this._client.patch('/account', { body, ...options });
  }
}

export interface Account {
  /**
   * The display name
   */
  display_name: string;

  /**
   * The email address associated with the account
   */
  email: string;

  /**
   * The id of the user
   */
  user_id: string;
}

export interface AccountRetrieveResponse {
  data?: Account;
}

export interface AccountUpdateResponse {
  data?: AccountUpdateResponse.Data;
}

export namespace AccountUpdateResponse {
  export interface Data {
    /**
     * The id of the user
     */
    user_id: string;
  }
}

export interface AccountUpdateParams {
  /**
   * The display name
   */
  display_name: string;
}

export namespace AccountResource {
  export import Account = AccountAPI.Account;
  export import AccountRetrieveResponse = AccountAPI.AccountRetrieveResponse;
  export import AccountUpdateResponse = AccountAPI.AccountUpdateResponse;
  export import AccountUpdateParams = AccountAPI.AccountUpdateParams;
}
