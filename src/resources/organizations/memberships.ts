// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as MembershipsAPI from './memberships';

export class Memberships extends APIResource {
  /**
   * Return the organization memberships
   */
  list(id: string, options?: Core.RequestOptions): Core.APIPromise<MembershipListResponse> {
    return (
      this._client.get(`/organizations/${id}/memberships`, options) as Core.APIPromise<{
        data: MembershipListResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Revoke a user from an organization
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

export interface MembershipListResponse {
  /**
   * The invitations of this organization
   */
  invitations: Array<MembershipListResponse.Invitation>;

  /**
   * The organization membership
   */
  members: Array<MembershipListResponse.Member>;
}

export namespace MembershipListResponse {
  export interface Invitation {
    /**
     * The id of the organization
     */
    id: string;

    /**
     * Date at which the object was created (ISO 8601 format)
     */
    created_at: string;

    email: string;

    invitation_expired_at: string;

    inviter_email: string;

    kind: string;

    /**
     * The id of the organization
     */
    org_id: string;

    /**
     * The status of the invitation
     */
    status: 'pending' | 'accepted' | 'declined';
  }

  export interface Member {
    members: Array<Member.Member>;
  }

  export namespace Member {
    export interface Member {
      /**
       * Date at which the object was created (ISO 8601 format)
       */
      created_at: string;

      /**
       * The user who created the object
       */
      created_by: string;

      display_name: string;

      email: string;

      kind: string;

      /**
       * Date at which the object was modified (ISO 8601 format)
       */
      modified_at: string;

      /**
       * The last user who modified the object
       */
      modified_by: string;

      org_id: string;

      /**
       * The role of the membership
       */
      role: 'owner' | 'member';

      user_id: string;
    }
  }
}

export interface MembershipRevokeResponse {
  /**
   * The id of the organization
   */
  org_id: string;

  /**
   * The id of the organization
   */
  user_id: string;
}

export namespace Memberships {
  export import MembershipListResponse = MembershipsAPI.MembershipListResponse;
  export import MembershipRevokeResponse = MembershipsAPI.MembershipRevokeResponse;
}
