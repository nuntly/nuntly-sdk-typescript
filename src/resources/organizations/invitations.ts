// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as InvitationsAPI from './invitations';

export class Invitations extends APIResource {
  /**
   * Delete an invitation
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

export interface InvitationDeleteResponse {
  /**
   * The id of the organization
   */
  id: string;
}

export interface InvitationSendResponse {
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

export interface InvitationSendParams {
  /**
   * The e-mail to send an invitation
   */
  email: string;
}

export namespace Invitations {
  export import InvitationDeleteResponse = InvitationsAPI.InvitationDeleteResponse;
  export import InvitationSendResponse = InvitationsAPI.InvitationSendResponse;
  export import InvitationSendParams = InvitationsAPI.InvitationSendParams;
}
