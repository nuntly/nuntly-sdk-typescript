// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

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
    query: InvitationListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<InvitationListResponsesCursorPage, InvitationListResponse> {
    return this._client.getAPIList(
      path`/organizations/${id}/invitations`,
      CursorPage<InvitationListResponse>,
      { query, ...options },
    );
  }

  /**
   * Delete an invitation
   *
   * @example
   * ```ts
   * const invitation =
   *   await client.organizations.invitations.delete(
   *     'invitation_id',
   *     { id: 'id' },
   *   );
   * ```
   */
  delete(
    invitationID: string,
    params: InvitationDeleteParams,
    options?: RequestOptions,
  ): APIPromise<InvitationDeleteResponse> {
    const { id } = params;
    return (
      this._client.delete(path`/organizations/${id}/invitations/${invitationID}`, options) as APIPromise<{
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
  send(id: string, body: InvitationSendParams, options?: RequestOptions): APIPromise<InvitationSendResponse> {
    return (
      this._client.post(path`/organizations/${id}/invitations`, { body, ...options }) as APIPromise<{
        data: InvitationSendResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export type InvitationListResponsesCursorPage = CursorPage<InvitationListResponse>;

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

export interface InvitationDeleteParams {
  /**
   * The organization id
   */
  id: string;
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
    type InvitationListResponsesCursorPage as InvitationListResponsesCursorPage,
    type InvitationListParams as InvitationListParams,
    type InvitationDeleteParams as InvitationDeleteParams,
    type InvitationSendParams as InvitationSendParams,
  };
}
