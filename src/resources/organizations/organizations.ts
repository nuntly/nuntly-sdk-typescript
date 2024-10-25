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
    return this._client.get(`/organizations/${id}`, options);
  }

  /**
   * Return the organizations
   */
  list(options?: Core.RequestOptions): Core.APIPromise<OrganizationListResponse> {
    return this._client.get('/organizations', options);
  }
}

export interface Organization {
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

export interface OrganizationRetrieveResponse {
  data?: Organization;
}

export interface OrganizationListResponse {
  /**
   * The organizations for the user
   */
  data?: Array<Organization>;
}

export namespace Organizations {
  export import Organization = OrganizationsAPI.Organization;
  export import OrganizationRetrieveResponse = OrganizationsAPI.OrganizationRetrieveResponse;
  export import OrganizationListResponse = OrganizationsAPI.OrganizationListResponse;
  export import Memberships = MembershipsAPI.Memberships;
  export import OrganizationMembership = MembershipsAPI.OrganizationMembership;
  export import MembershipListResponse = MembershipsAPI.MembershipListResponse;
  export import MembershipRevokeResponse = MembershipsAPI.MembershipRevokeResponse;
  export import Invitations = InvitationsAPI.Invitations;
  export import Invitation = InvitationsAPI.Invitation;
  export import InvitationDeleteResponse = InvitationsAPI.InvitationDeleteResponse;
  export import InvitationSendResponse = InvitationsAPI.InvitationSendResponse;
  export import InvitationSendParams = InvitationsAPI.InvitationSendParams;
}
