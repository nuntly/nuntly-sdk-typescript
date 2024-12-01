// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

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
     * The id of the invitation
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
     * The e-mail to send an invitation
     */
    email: string;

    invitation_expired_at: string;

    /**
     * The inviter e-mail
     */
    inviter_email: string;

    /**
     * The kind of object returned
     */
    kind: 'invitation';

    /**
     * Date at which the object was modified (ISO 8601 format)
     */
    modified_at: string;

    /**
     * The last user who modified the object
     */
    modified_by: string;

    /**
     * The id of the organization
     */
    org_id: string;

    /**
     * The region of the related data
     */
    region: 'eu-west-1';

    /**
     * The status of the invitation
     */
    status: 'pending' | 'accepted' | 'declined';
  }

  export interface Member {
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
     * Date at which the object was modified (ISO 8601 format)
     */
    modified_at: string;

    /**
     * The last user who modified the object
     */
    modified_by: string;

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
  }
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

export declare namespace Memberships {
  export {
    type MembershipListResponse as MembershipListResponse,
    type MembershipRevokeResponse as MembershipRevokeResponse,
  };
}
