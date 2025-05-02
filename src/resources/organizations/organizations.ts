// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as InvitationsAPI from './invitations';
import {
  InvitationDeleteResponse,
  InvitationListParams,
  InvitationListResponse,
  InvitationSendParams,
  InvitationSendResponse,
  Invitations,
} from './invitations';
import * as MembershipsAPI from './memberships';
import {
  MembershipListParams,
  MembershipListResponse,
  MembershipListResponsesCursorPage,
  MembershipRevokeResponse,
  Memberships,
} from './memberships';
import * as SubscriptionsAPI from './subscriptions';
import { SubscriptionListResponse, Subscriptions } from './subscriptions';
import * as UsageAPI from './usage';
import { Usage, UsageRetrieveResponse } from './usage';
import { CursorPage, type CursorPageParams } from '../../pagination';

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
  list(
    query?: OrganizationListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<OrganizationListResponsesCursorPage, OrganizationListResponse>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<OrganizationListResponsesCursorPage, OrganizationListResponse>;
  list(
    query: OrganizationListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<OrganizationListResponsesCursorPage, OrganizationListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/organizations', OrganizationListResponsesCursorPage, {
      query,
      ...options,
    });
  }
}

export class OrganizationListResponsesCursorPage extends CursorPage<OrganizationListResponse> {}

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

export interface OrganizationListResponse {
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

export interface OrganizationListParams extends CursorPageParams {}

Organizations.OrganizationListResponsesCursorPage = OrganizationListResponsesCursorPage;
Organizations.Memberships = Memberships;
Organizations.MembershipListResponsesCursorPage = MembershipListResponsesCursorPage;
Organizations.Invitations = Invitations;
Organizations.Subscriptions = Subscriptions;
Organizations.Usage = Usage;

export declare namespace Organizations {
  export {
    type OrganizationRetrieveResponse as OrganizationRetrieveResponse,
    type OrganizationListResponse as OrganizationListResponse,
    OrganizationListResponsesCursorPage as OrganizationListResponsesCursorPage,
    type OrganizationListParams as OrganizationListParams,
  };

  export {
    Memberships as Memberships,
    type MembershipListResponse as MembershipListResponse,
    type MembershipRevokeResponse as MembershipRevokeResponse,
    MembershipListResponsesCursorPage as MembershipListResponsesCursorPage,
    type MembershipListParams as MembershipListParams,
  };

  export {
    Invitations as Invitations,
    type InvitationListResponse as InvitationListResponse,
    type InvitationDeleteResponse as InvitationDeleteResponse,
    type InvitationSendResponse as InvitationSendResponse,
    type InvitationListParams as InvitationListParams,
    type InvitationSendParams as InvitationSendParams,
  };

  export { Subscriptions as Subscriptions, type SubscriptionListResponse as SubscriptionListResponse };

  export { Usage as Usage, type UsageRetrieveResponse as UsageRetrieveResponse };
}
