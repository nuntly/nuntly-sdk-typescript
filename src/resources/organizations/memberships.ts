// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

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
    query: MembershipListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MembershipListResponsesCursorPage, MembershipListResponse> {
    return this._client.getAPIList(
      path`/organizations/${id}/memberships`,
      CursorPage<MembershipListResponse>,
      { query, ...options },
    );
  }

  /**
   * Revoke a user from an organization
   *
   * @example
   * ```ts
   * const response =
   *   await client.organizations.memberships.revoke('user_id', {
   *     id: 'id',
   *   });
   * ```
   */
  revoke(
    userID: string,
    params: MembershipRevokeParams,
    options?: RequestOptions,
  ): APIPromise<MembershipRevokeResponse> {
    const { id } = params;
    return (
      this._client.delete(path`/organizations/${id}/memberships/${userID}`, options) as APIPromise<{
        data: MembershipRevokeResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export type MembershipListResponsesCursorPage = CursorPage<MembershipListResponse>;

export interface MembershipListResponse {
  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

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

export interface MembershipRevokeParams {
  /**
   * The organization id previously created
   */
  id: string;
}

export declare namespace Memberships {
  export {
    type MembershipListResponse as MembershipListResponse,
    type MembershipRevokeResponse as MembershipRevokeResponse,
    type MembershipListResponsesCursorPage as MembershipListResponsesCursorPage,
    type MembershipListParams as MembershipListParams,
    type MembershipRevokeParams as MembershipRevokeParams,
  };
}
