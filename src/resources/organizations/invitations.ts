// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import { CursorPage, type CursorPageParams } from '../../pagination';

export class Invitations extends APIResource {
  /**
   * Return the organization invitations
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const invitationListResponse of client.organizations.invitations.list(
   *   'id',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    id: string,
    query?: InvitationListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<InvitationListResponsesCursorPage, InvitationListResponse>;
  list(
    id: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<InvitationListResponsesCursorPage, InvitationListResponse>;
  list(
    id: string,
    query: InvitationListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<InvitationListResponsesCursorPage, InvitationListResponse> {
    if (isRequestOptions(query)) {
      return this.list(id, {}, query);
    }
    return this._client.getAPIList(`/organizations/${id}/invitations`, InvitationListResponsesCursorPage, {
      query,
      ...options,
    });
  }

  /**
   * Delete an invitation
   *
   * @example
   * ```ts
   * const invitation =
   *   await client.organizations.invitations.delete(
   *     'id',
   *     'invitation_id',
   *   );
   * ```
   */
  delete(
    id: string,
    invitationId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<InvitationDeleteResponse> {
    return (
      this._client.delete(`/organizations/${id}/invitations/${invitationId}`, options) as Core.APIPromise<{
        data: InvitationDeleteResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Send an invitation to someone you wish to invite to join your organization
   *
   * @example
   * ```ts
   * const response =
   *   await client.organizations.invitations.send('id', {
   *     email: 'sarah.connor@sky.net',
   *   });
   * ```
   */
  send(
    id: string,
    body: InvitationSendParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<InvitationSendResponse> {
    return (
      this._client.post(`/organizations/${id}/invitations`, { body, ...options }) as Core.APIPromise<{
        data: InvitationSendResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export class InvitationListResponsesCursorPage extends CursorPage<InvitationListResponse> {}

export interface InvitationListResponse {
  /**
   * The id of the invitation
   */
  id: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

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
  status: 'pending' | 'accepted' | 'declined' | 'done';

  /**
   * Date at which the object was modified (ISO 8601 format)
   */
  modified_at?: string;
}

export interface InvitationDeleteResponse {
  /**
   * The id of the organization
   */
  id: string;

  /**
   * The id of the invitation
   */
  invitation_id: string;

  /**
   * The kind of object returned
   */
  kind: 'invitation';
}

export interface InvitationSendResponse {
  /**
   * The id of the invitation
   */
  id: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

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
  status: 'pending' | 'accepted' | 'declined' | 'done';

  /**
   * Date at which the object was modified (ISO 8601 format)
   */
  modified_at?: string;
}

export interface InvitationListParams extends CursorPageParams {
  /**
   * The status of the invitation
   */
  status?: 'pending' | 'accepted' | 'declined' | 'done';
}

export interface InvitationSendParams {
  /**
   * The e-mail to send an invitation
   */
  email: string;
}

Invitations.InvitationListResponsesCursorPage = InvitationListResponsesCursorPage;

export declare namespace Invitations {
  export {
    type InvitationListResponse as InvitationListResponse,
    type InvitationDeleteResponse as InvitationDeleteResponse,
    type InvitationSendResponse as InvitationSendResponse,
    InvitationListResponsesCursorPage as InvitationListResponsesCursorPage,
    type InvitationListParams as InvitationListParams,
    type InvitationSendParams as InvitationSendParams,
  };
}
