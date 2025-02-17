// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as InvitationsAPI from './invitations';
import {
  InvitationDeleteResponse,
  InvitationSendParams,
  InvitationSendResponse,
  Invitations,
} from './invitations';
import * as MembershipsAPI from './memberships';
import { MembershipListResponse, MembershipRevokeResponse, Memberships } from './memberships';
import * as SubscriptionsAPI from './subscriptions';
import { SubscriptionListResponse, Subscriptions } from './subscriptions';
import * as UsageAPI from './usage';
import { Usage, UsageRetrieveResponse } from './usage';

export class Organizations extends APIResource {
  memberships: MembershipsAPI.Memberships = new MembershipsAPI.Memberships(this._client);
  invitations: InvitationsAPI.Invitations = new InvitationsAPI.Invitations(this._client);
  subscriptions: SubscriptionsAPI.Subscriptions = new SubscriptionsAPI.Subscriptions(this._client);
  usage: UsageAPI.Usage = new UsageAPI.Usage(this._client);

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
   * Return the organizations that the current user is a member
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
   * The kind of object returned
   */
  kind: 'organization';

  /**
   * The id of the organization
   */
  org_id: string;

  /**
   * The region of the related data
   */
  region: 'eu-west-1';

  /**
   * The status of the organization
   */
  status: 'active' | 'pending' | 'revoked';

  /**
   * Date at which the object was modified (ISO 8601 format)
   */
  modified_at?: string;

  /**
   * The last user who modified the object
   */
  modified_by?: string;
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
     * The kind of object returned
     */
    kind: 'organization';

    /**
     * The id of the organization
     */
    org_id: string;

    /**
     * The region of the related data
     */
    region: 'eu-west-1';

    /**
     * The status of the organization
     */
    status: 'active' | 'pending' | 'revoked';

    /**
     * Date at which the object was modified (ISO 8601 format)
     */
    modified_at?: string;

    /**
     * The last user who modified the object
     */
    modified_by?: string;
  }
}

Organizations.Memberships = Memberships;
Organizations.Invitations = Invitations;
Organizations.Subscriptions = Subscriptions;
Organizations.Usage = Usage;

export declare namespace Organizations {
  export {
    type OrganizationRetrieveResponse as OrganizationRetrieveResponse,
    type OrganizationListResponse as OrganizationListResponse,
  };

  export {
    Memberships as Memberships,
    type MembershipListResponse as MembershipListResponse,
    type MembershipRevokeResponse as MembershipRevokeResponse,
  };

  export {
    Invitations as Invitations,
    type InvitationDeleteResponse as InvitationDeleteResponse,
    type InvitationSendResponse as InvitationSendResponse,
    type InvitationSendParams as InvitationSendParams,
  };

  export { Subscriptions as Subscriptions, type SubscriptionListResponse as SubscriptionListResponse };

  export { Usage as Usage, type UsageRetrieveResponse as UsageRetrieveResponse };
}
