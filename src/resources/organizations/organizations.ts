// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as InvitationsAPI from './invitations';
import {
  InvitationDeleteParams,
  InvitationDeleteResponse,
  InvitationListParams,
  InvitationListResponse,
  InvitationListResponsesCursorPage,
  InvitationSendParams,
  InvitationSendResponse,
  Invitations,
} from './invitations';
import * as MembershipsAPI from './memberships';
import {
  MembershipListParams,
  MembershipListResponse,
  MembershipListResponsesCursorPage,
  MembershipRevokeParams,
  MembershipRevokeResponse,
  Memberships,
} from './memberships';
import * as SubscriptionsAPI from './subscriptions';
import { SubscriptionListResponse, Subscriptions } from './subscriptions';
import * as UsageAPI from './usage';
import { Usage, UsageRetrieveResponse } from './usage';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Organizations extends APIResource {
  memberships: MembershipsAPI.Memberships = new MembershipsAPI.Memberships(this._client);
  invitations: InvitationsAPI.Invitations = new InvitationsAPI.Invitations(this._client);
  subscriptions: SubscriptionsAPI.Subscriptions = new SubscriptionsAPI.Subscriptions(this._client);
  usage: UsageAPI.Usage = new UsageAPI.Usage(this._client);

  /**
   * Return the organization
   *
   * @example
   * ```ts
   * const organization = await client.organizations.retrieve(
   *   'org_9UTZz2PisZ68YwE3NJu9urQ9',
   * );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<OrganizationRetrieveResponse> {
    return (
      this._client.get(path`/organizations/${id}`, options) as APIPromise<{
        data: OrganizationRetrieveResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Patch the organization
   *
   * @example
   * ```ts
   * const organization = await client.organizations.update(
   *   'org_9UTZz2PisZ68YwE3NJu9urQ9',
   *   { display_name: 'Ray Tomlinson org.' },
   * );
   * ```
   */
  update(
    id: string,
    body: OrganizationUpdateParams,
    options?: RequestOptions,
  ): APIPromise<OrganizationUpdateResponse> {
    return (
      this._client.patch(path`/organizations/${id}`, { body, ...options }) as APIPromise<{
        data: OrganizationUpdateResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Return the organizations that the current user is a member
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const organizationListResponse of client.organizations.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: OrganizationListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<OrganizationListResponsesCursorPage, OrganizationListResponse> {
    return this._client.getAPIList('/organizations', CursorPage<OrganizationListResponse>, {
      query,
      ...options,
    });
  }
}

export type OrganizationListResponsesCursorPage = CursorPage<OrganizationListResponse>;

export interface OrganizationRetrieveResponse {
  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

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
}

export interface OrganizationUpdateResponse {
  /**
   * The id of the account
   */
  id: string;

  /**
   * The kind of object returned
   */
  kind: 'organization';
}

export interface OrganizationListResponse {
  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

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
}

export interface OrganizationUpdateParams {
  /**
   * The display name of the organization
   */
  display_name: string;
}

export interface OrganizationListParams extends CursorPageParams {}

Organizations.Memberships = Memberships;
Organizations.Invitations = Invitations;
Organizations.Subscriptions = Subscriptions;
Organizations.Usage = Usage;

export declare namespace Organizations {
  export {
    type OrganizationRetrieveResponse as OrganizationRetrieveResponse,
    type OrganizationUpdateResponse as OrganizationUpdateResponse,
    type OrganizationListResponse as OrganizationListResponse,
    type OrganizationListResponsesCursorPage as OrganizationListResponsesCursorPage,
    type OrganizationUpdateParams as OrganizationUpdateParams,
    type OrganizationListParams as OrganizationListParams,
  };

  export {
    Memberships as Memberships,
    type MembershipListResponse as MembershipListResponse,
    type MembershipRevokeResponse as MembershipRevokeResponse,
    type MembershipListResponsesCursorPage as MembershipListResponsesCursorPage,
    type MembershipListParams as MembershipListParams,
    type MembershipRevokeParams as MembershipRevokeParams,
  };

  export {
    Invitations as Invitations,
    type InvitationListResponse as InvitationListResponse,
    type InvitationDeleteResponse as InvitationDeleteResponse,
    type InvitationSendResponse as InvitationSendResponse,
    type InvitationListResponsesCursorPage as InvitationListResponsesCursorPage,
    type InvitationListParams as InvitationListParams,
    type InvitationDeleteParams as InvitationDeleteParams,
    type InvitationSendParams as InvitationSendParams,
  };

  export { Subscriptions as Subscriptions, type SubscriptionListResponse as SubscriptionListResponse };

  export { Usage as Usage, type UsageRetrieveResponse as UsageRetrieveResponse };
}
