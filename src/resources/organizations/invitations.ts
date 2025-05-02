// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';

export class Invitations extends APIResource {
  /**
   * Return the organization invitations
   */
  list(
    id: string,
    query?: InvitationListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<InvitationListResponse>;
  list(id: string, options?: Core.RequestOptions): Core.APIPromise<InvitationListResponse>;
  list(
    id: string,
    query: InvitationListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<InvitationListResponse> {
    if (isRequestOptions(query)) {
      return this.list(id, {}, query);
    }
    return this._client.get(`/organizations/${id}/invitations`, { query, ...options });
  }

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

export interface InvitationListResponse {
  data?: InvitationListResponse.Data;

  next_cursor?: string | null;
}

export namespace InvitationListResponse {
  export interface Data {
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

  /**
   * Date at which the object was modified (ISO 8601 format)
   */
  modified_at?: string;

  /**
   * The last user who modified the object
   */
  modified_by?: string;
}

export interface InvitationListParams {
  /**
   * The cursor to use for pagination
   */
  cursor?: string;

  /**
   * The number of emails to return
   */
  limit?: number;
}

export interface InvitationSendParams {
  /**
   * The e-mail to send an invitation
   */
  email: string;
}

export declare namespace Invitations {
  export {
    type InvitationListResponse as InvitationListResponse,
    type InvitationDeleteResponse as InvitationDeleteResponse,
    type InvitationSendResponse as InvitationSendResponse,
    type InvitationListParams as InvitationListParams,
    type InvitationSendParams as InvitationSendParams,
  };
}
