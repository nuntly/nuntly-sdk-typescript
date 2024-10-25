// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as MembershipsAPI from './memberships';
import * as InvitationsAPI from './invitations';

export class Memberships extends APIResource {
  /**
   * Return the organization memberships
   */
  list(id: string, options?: Core.RequestOptions): Core.APIPromise<MembershipListResponse> {
    return this._client.get(`/organizations/${id}/memberships`, options);
  }

  /**
   * Revoke a user from an organization
   */
  revoke(
    id: string,
    userId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<MembershipRevokeResponse> {
    return this._client.delete(`/organizations/${id}/memberships/${userId}`, options);
  }
}

export interface OrganizationMembership {
  /**
   * The invitations of this organization
   */
  invitations: Array<InvitationsAPI.Invitation>;

  /**
   * The organization membership
   */
  members: Array<OrganizationMembership.Member>;
}

export namespace OrganizationMembership {
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

export interface MembershipListResponse {
  data?: OrganizationMembership;
}

export interface MembershipRevokeResponse {
  data?: MembershipRevokeResponse.Data;
}

export namespace MembershipRevokeResponse {
  export interface Data {
    /**
     * The id of the organization
     */
    org_id: string;

    /**
     * The id of the organization
     */
    user_id: string;
  }
}

export namespace Memberships {
  export import OrganizationMembership = MembershipsAPI.OrganizationMembership;
  export import MembershipListResponse = MembershipsAPI.MembershipListResponse;
  export import MembershipRevokeResponse = MembershipsAPI.MembershipRevokeResponse;
}
