// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as SharedAPI from '../shared';
import * as BulkAPI from './bulk';
import { Bulk, BulkRetrieveResponse, BulkSendParams, BulkSendResponse } from './bulk';
import * as EventsAPI from './events';
import { EventListParams, EventListResponse, Events } from './events';
import * as StatsAPI from './stats';
import { StatListResponse, Stats } from './stats';
import { CursorPage, type CursorPageParams } from '../../pagination';

export class Emails extends APIResource {
  bulk: BulkAPI.Bulk = new BulkAPI.Bulk(this._client);
  events: EventsAPI.Events = new EventsAPI.Events(this._client);
  stats: StatsAPI.Stats = new StatsAPI.Stats(this._client);

  /**
   * Return the email with the given id
   *
   * @example
   * ```ts
   * const email = await client.emails.retrieve(
   *   'em_qiPSkLrTmXvDohbxCcYt3pFEMGgnjHD6kbDL8d4uGKvNGboT',
   * );
   * ```
   */
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<EmailRetrieveResponse> {
    return (
      this._client.get(`/emails/${id}`, options) as Core.APIPromise<{ data: EmailRetrieveResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Return a list of your last emails
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const emailListResponse of client.emails.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query?: EmailListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<EmailListResponsesCursorPage, EmailListResponse>;
  list(options?: Core.RequestOptions): Core.PagePromise<EmailListResponsesCursorPage, EmailListResponse>;
  list(
    query: EmailListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<EmailListResponsesCursorPage, EmailListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/emails', EmailListResponsesCursorPage, { query, ...options });
  }

  /**
   * Cancel a scheduled email
   *
   * @example
   * ```ts
   * const response = await client.emails.cancel(
   *   'em_qiPSkLrTmXvDohbxCcYt3pFEMGgnjHD6kbDL8d4uGKvNGboT',
   * );
   * ```
   */
  cancel(id: string, options?: Core.RequestOptions): Core.APIPromise<EmailCancelResponse> {
    return (
      this._client.delete(`/emails/${id}`, options) as Core.APIPromise<{ data: EmailCancelResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Send transactional emails through the Nuntly platform. It supports HTML and
   * plain-text emails, attachments, labels, custom headers and scheduling.
   *
   * @example
   * ```ts
   * const response = await client.emails.send({
   *   from: 'ray@info.tomlinson.ai',
   *   subject: 'Welcome to Tomlinson AI!',
   *   to: 'carlo43@gmail.com',
   * });
   * ```
   */
  send(body: EmailSendParams, options?: Core.RequestOptions): Core.APIPromise<EmailSendResponse> {
    return (
      this._client.post('/emails', { body, ...options }) as Core.APIPromise<{ data: EmailSendResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export class EmailListResponsesCursorPage extends CursorPage<EmailListResponse> {}

export interface EmailRetrieveResponse {
  /**
   * The id of the email
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
   * The e-mail address of the sender
   */
  from: string;

  /**
   * The kind of object returned
   */
  kind: 'email';

  /**
   * The id of the organization
   */
  org_id: string;

  /**
   * The region of the related data
   */
  region: 'eu-west-1';

  /**
   * The status of the email.
   */
  status: SharedAPI.EmailStatus;

  /**
   * Date xhen the status changed
   */
  status_at: string;

  /**
   * The subject of the e-mail
   */
  subject: string;

  /**
   * The primary recipient(s) of the email
   */
  to: Array<string> | string;

  /**
   * The attachements
   */
  attachments?: Array<EmailRetrieveResponse.Attachment>;

  /**
   * The blind carbon copy recipient(s) of the email
   */
  bcc?: Array<string> | string;

  /**
   * The bulk id
   */
  bulk_id?: string;

  /**
   * The carbon copy recipient(s) of the email
   */
  cc?: Array<string> | string;

  /**
   * The context for the template
   */
  context?: unknown;

  /**
   * The headers to add to the email
   */
  headers?: { [key: string]: string };

  /**
   * The id from email provider
   */
  message_id?: string;

  /**
   * Date at which the object was modified (ISO 8601 format)
   */
  modified_at?: string;

  /**
   * The last user who modified the object
   */
  modified_by?: string;

  /**
   * The email address where replies should be sent. If a recipient replies, the
   * response will go to this address instead of the sender's email address
   */
  reply_to?: Array<string> | string;

  /**
   * The date at which the email is scheduled to be sent
   */
  scheduled_at?: string;

  /**
   * May provide more informations about the status
   */
  status_reason?: { [key: string]: unknown };

  /**
   * The tags to add to the email
   */
  tags?: Array<EmailRetrieveResponse.Tag>;
}

export namespace EmailRetrieveResponse {
  /**
   * The attachment
   */
  export interface Attachment {
    /**
     * Content type of the attachment (the MIME type)
     */
    content_type?: string;

    /**
     * The name of the attached file to be displayed to the recipient
     */
    filename?: string;
  }

  /**
   * The tag to add to the email and you can get via email id or in webhook events
   */
  export interface Tag {
    /**
     * The name of the tag
     */
    name: string;

    /**
     * The tag to add to the email
     */
    value: string;
  }
}

export interface EmailListResponse {
  /**
   * The id of the email
   */
  id: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

  /**
   * The e-mail address of the sender
   */
  from: string;

  /**
   * The kind of object returned
   */
  kind: 'email';

  /**
   * The id of the organization
   */
  org_id: string;

  /**
   * The region of the related data
   */
  region: 'eu-west-1';

  /**
   * The status of the email.
   */
  status: SharedAPI.EmailStatus;

  /**
   * Date xhen the status changed
   */
  status_at: string;

  /**
   * The subject of the e-mail
   */
  subject: string;

  /**
   * The primary recipient(s) of the email
   */
  to: Array<string> | string;

  /**
   * The bulk id
   */
  bulk_id?: string;

  /**
   * The id from email provider
   */
  message_id?: string;

  /**
   * The date at which the email is scheduled to be sent
   */
  scheduled_at?: string;
}

export interface EmailCancelResponse {
  /**
   * The id of the email
   */
  id: string;

  /**
   * The kind of object returned
   */
  kind: 'email';

  /**
   * The id of the organization
   */
  org_id: string;
}

export interface EmailSendResponse {
  /**
   * The id of the email
   */
  id: string;

  /**
   * The kind of object returned
   */
  kind: 'email';

  /**
   * The id of the organization
   */
  org_id: string;

  /**
   * The status of the email.
   */
  status: 'queued' | 'scheduled';
}

export interface EmailListParams extends CursorPageParams {}

export interface EmailSendParams {
  /**
   * The e-mail address of the sender
   */
  from: string;

  /**
   * The subject of the e-mail
   */
  subject: string;

  /**
   * The primary recipient(s) of the email
   */
  to: Array<string> | string;

  /**
   * The attachements to add to the email
   */
  attachments?: Array<EmailSendParams.Attachment>;

  /**
   * The blind carbon copy recipient(s) of the email
   */
  bcc?: Array<string> | string;

  /**
   * The carbon copy recipient(s) of the email
   */
  cc?: Array<string> | string;

  /**
   * The context for the template
   */
  context?: unknown;

  /**
   * The headers to add to the email
   */
  headers?: { [key: string]: string };

  /**
   * The HTML version of the email
   */
  html?: string;

  /**
   * The email address where replies should be sent. If a recipient replies, the
   * response will go to this address instead of the sender's email address
   */
  reply_to?: Array<string> | string;

  /**
   * The date at which the email is scheduled to be sent
   */
  scheduled_at?: string;

  /**
   * The tags to add to the email
   */
  tags?: Array<EmailSendParams.Tag>;

  /**
   * The plaintext version of the email
   */
  text?: string;
}

export namespace EmailSendParams {
  /**
   * The attachment
   */
  export interface Attachment {
    /**
     * The base64-encoded content of the attachment
     */
    content?: string;

    /**
     * Content type of the attachment (the MIME type)
     */
    content_type?: string;

    /**
     * The name of the attached file to be displayed to the recipient
     */
    filename?: string;
  }

  /**
   * The tag to add to the email and you can get via email id or in webhook events
   */
  export interface Tag {
    /**
     * The name of the tag
     */
    name: string;

    /**
     * The tag to add to the email
     */
    value: string;
  }
}

Emails.EmailListResponsesCursorPage = EmailListResponsesCursorPage;
Emails.Bulk = Bulk;
Emails.Events = Events;
Emails.Stats = Stats;

export declare namespace Emails {
  export {
    type EmailRetrieveResponse as EmailRetrieveResponse,
    type EmailListResponse as EmailListResponse,
    type EmailCancelResponse as EmailCancelResponse,
    type EmailSendResponse as EmailSendResponse,
    EmailListResponsesCursorPage as EmailListResponsesCursorPage,
    type EmailListParams as EmailListParams,
    type EmailSendParams as EmailSendParams,
  };

  export {
    Bulk as Bulk,
    type BulkRetrieveResponse as BulkRetrieveResponse,
    type BulkSendResponse as BulkSendResponse,
    type BulkSendParams as BulkSendParams,
  };

  export {
    Events as Events,
    type EventListResponse as EventListResponse,
    type EventListParams as EventListParams,
  };

  export { Stats as Stats, type StatListResponse as StatListResponse };
}
