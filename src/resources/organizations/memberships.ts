// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import { CursorPage, type CursorPageParams } from '../../pagination';

export class Memberships extends APIResource {
  /**
   * Return the organization memberships
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const membershipListResponse of client.organizations.memberships.list(
   *   'id',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    id: string,
    query?: MembershipListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<MembershipListResponsesCursorPage, MembershipListResponse>;
  list(
    id: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<MembershipListResponsesCursorPage, MembershipListResponse>;
  list(
    id: string,
    query: MembershipListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<MembershipListResponsesCursorPage, MembershipListResponse> {
    if (isRequestOptions(query)) {
      return this.list(id, {}, query);
    }
    return this._client.getAPIList(`/organizations/${id}/memberships`, MembershipListResponsesCursorPage, {
      query,
      ...options,
    });
  }

  /**
   * Revoke a user from an organization
   *
   * @example
   * ```ts
   * const response =
   *   await client.organizations.memberships.revoke(
   *     'id',
   *     'user_id',
   *   );
   * ```
   */
  revoke(
    id: string,
    userId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<MembershipRevokeResponse> {
    return (
      this._client.delete(`/organizations/${id}/memberships/${userId}`, options) as Core.APIPromise<{
        data: MembershipRevokeResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export class MembershipListResponsesCursorPage extends CursorPage<MembershipListResponse> {}

export interface MembershipListResponse {
  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

  /**
   * The user who created the object
   */
  created_by: string;

  /**
   * The display name of the organization
   */
  display_name: string;

  /**
   * The e-mail to send an invitation
   */
  email: string;

  /**
   * The kind of object returned
   */
  kind: 'org-membership';

  /**
   * The id of the organization
   */
  org_id: string;

  /**
   * The region of the related data
   */
  region: 'eu-west-1';

  /**
   * The role in the organization
   */
  role: 'owner' | 'member';

  /**
   * The status of the membership
   */
  status: 'active' | 'pending' | 'revoked' | 'suspended';

  /**
   * The id of the account
   */
  user_id: string;

  /**
   * Date at which the object was modified (ISO 8601 format)
   */
  modified_at?: string;

  /**
   * The last user who modified the object
   */
  modified_by?: string;
}

export interface MembershipRevokeResponse {
  /**
   * The kind of object returned
   */
  kind: 'org-membership';

  /**
   * The id of the organization
   */
  org_id: string;

  /**
   * The id of the account
   */
  user_id: string;
}

export interface MembershipListParams extends CursorPageParams {}

Memberships.MembershipListResponsesCursorPage = MembershipListResponsesCursorPage;

export declare namespace Memberships {
  export {
    type MembershipListResponse as MembershipListResponse,
    type MembershipRevokeResponse as MembershipRevokeResponse,
    MembershipListResponsesCursorPage as MembershipListResponsesCursorPage,
    type MembershipListParams as MembershipListParams,
  };
}
