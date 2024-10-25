// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as OrganizationsAPI from './organizations';
import * as InvitationsAPI from './invitations';
import * as MembershipsAPI from './memberships';

export class Organizations extends APIResource {
  memberships: MembershipsAPI.Memberships = new MembershipsAPI.Memberships(this._client);
  invitations: InvitationsAPI.Invitations = new InvitationsAPI.Invitations(this._client);

  /**
   * Return the organization
   */
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<OrganizationRetrieveResponse> {
    return (
      this._client.get(`/organizations/${id}`, options) as Core.APIPromise<{
        data: OrganizationRetrieveResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Return the organizations
   */
  list(options?: Core.RequestOptions): Core.APIPromise<OrganizationListResponse> {
    return (
      this._client.get('/organizations', options) as Core.APIPromise<{ data: OrganizationListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export interface OrganizationRetrieveResponse {
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
   * The status of the organization
   */
  status: 'active' | 'pending' | 'revoked';
}

/**
 * The organizations for the user
 */
export type OrganizationListResponse = Array<OrganizationListResponse.OrganizationListResponseItem>;

export namespace OrganizationListResponse {
  export interface OrganizationListResponseItem {
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
     * The status of the organization
     */
    status: 'active' | 'pending' | 'revoked';
  }
}

export namespace Organizations {
  export import OrganizationRetrieveResponse = OrganizationsAPI.OrganizationRetrieveResponse;
  export import OrganizationListResponse = OrganizationsAPI.OrganizationListResponse;
  export import Memberships = MembershipsAPI.Memberships;
  export import MembershipListResponse = MembershipsAPI.MembershipListResponse;
  export import MembershipRevokeResponse = MembershipsAPI.MembershipRevokeResponse;
  export import Invitations = InvitationsAPI.Invitations;
  export import InvitationDeleteResponse = InvitationsAPI.InvitationDeleteResponse;
  export import InvitationSendResponse = InvitationsAPI.InvitationSendResponse;
  export import InvitationSendParams = InvitationsAPI.InvitationSendParams;
}
