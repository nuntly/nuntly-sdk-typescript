// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as SharedAPI from '../shared';
import * as BulkAPI from './bulk';
import { Bulk, BulkRetrieveResponse, BulkSendParams, BulkSendResponse } from './bulk';
import * as EventsAPI from './events';
import { EventListResponse, Events } from './events';
import * as StatsAPI from './stats';
import { StatListResponse, Stats } from './stats';

export class Emails extends APIResource {
  bulk: BulkAPI.Bulk = new BulkAPI.Bulk(this._client);
  events: EventsAPI.Events = new EventsAPI.Events(this._client);
  stats: StatsAPI.Stats = new StatsAPI.Stats(this._client);

  /**
   * Return the email with the given id
   */
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<EmailRetrieveResponse> {
    return (
      this._client.get(`/emails/${id}`, options) as Core.APIPromise<{ data: EmailRetrieveResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Return a list of your last emails
   */
  list(options?: Core.RequestOptions): Core.APIPromise<EmailListResponse> {
    return (this._client.get('/emails', options) as Core.APIPromise<{ data: EmailListResponse }>)._thenUnwrap(
      (obj) => obj.data,
    );
  }

  /**
   * Cancel a scheduled email
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
   * @param {EmailSendParams} body - Email sending parameters.
   *
   * @param {Core.RequestOptions} options - Options to pass to the http request.
   *
   * @returns {Core.APIPromise<EmailSendResponse>} - The email object.
   */
  send(body: EmailSendParams, options?: Core.RequestOptions): Core.APIPromise<EmailSendResponse> {
    return (
      this._client.post('/emails', { body, ...options }) as Core.APIPromise<{ data: EmailSendResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

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
  headers?: Record<string, string>;

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
  status_reason?: Record<string, unknown>;

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
     * Content type of the attachment
     */
    content_type?: string;

    /**
     * The name of the attached file
     */
    filename?: string;

    /**
     * Attachement URL
     */
    path?: string;
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

/**
 * The emails
 */
export type EmailListResponse = Array<EmailListResponse.EmailListResponseItem>;

export namespace EmailListResponse {
  export interface EmailListResponseItem {
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
    attachments?: Array<EmailListResponseItem.Attachment>;

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
    headers?: Record<string, string>;

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
    status_reason?: Record<string, unknown>;

    /**
     * The tags to add to the email
     */
    tags?: Array<EmailListResponseItem.Tag>;
  }

  export namespace EmailListResponseItem {
    /**
     * The attachment
     */
    export interface Attachment {
      /**
       * Content type of the attachment
       */
      content_type?: string;

      /**
       * The name of the attached file
       */
      filename?: string;

      /**
       * Attachement URL
       */
      path?: string;
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

export interface EmailSendParams {
  /**
   * The e-mail address of the sender
   */
  from: string;

  /**
   * The region of the related data
   */
  region: 'eu-west-1';

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
  headers?: Record<string, string>;

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
     * Content type of the attachment
     */
    content_type?: string;

    /**
     * The name of the attached file
     */
    filename?: string;

    /**
     * Attachement URL
     */
    path?: string;
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

Emails.Bulk = Bulk;
Emails.Events = Events;
Emails.Stats = Stats;

export declare namespace Emails {
  export {
    type EmailRetrieveResponse as EmailRetrieveResponse,
    type EmailListResponse as EmailListResponse,
    type EmailCancelResponse as EmailCancelResponse,
    type EmailSendResponse as EmailSendResponse,
    type EmailSendParams as EmailSendParams,
  };

  export {
    Bulk as Bulk,
    type BulkRetrieveResponse as BulkRetrieveResponse,
    type BulkSendResponse as BulkSendResponse,
    type BulkSendParams as BulkSendParams,
  };

  export { Events as Events, type EventListResponse as EventListResponse };

  export { Stats as Stats, type StatListResponse as StatListResponse };
}
