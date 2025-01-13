// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as SharedAPI from '../shared';
import * as EventsAPI from './events';
import { EventListResponse, Events } from './events';

export class Emails extends APIResource {
  events: EventsAPI.Events = new EventsAPI.Events(this._client);

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
   * Send bulk emails
   */
  bulk(body: EmailBulkParams, options?: Core.RequestOptions): Core.APIPromise<EmailBulkResponse> {
    return (
      this._client.post('/emails/bulk', { body, ...options }) as Core.APIPromise<{ data: EmailBulkResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Cancel an email or a scheduled email
   */
  cancel(id: string, options?: Core.RequestOptions): Core.APIPromise<EmailCancelResponse> {
    return (
      this._client.delete(`/emails/${id}`, options) as Core.APIPromise<{ data: EmailCancelResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Send an email
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
   * The email address where replies should be sent. If a recipient replies, the
   * response will go to this address instead of the sender's email address
   */
  reply_to?: Array<string> | string;

  /**
   * The date at which the email is scheduled to be sent
   */
  scheduled_at?: string;

  /**
   * May provide information about the status
   */
  status_reason?: string;

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
     * The email address where replies should be sent. If a recipient replies, the
     * response will go to this address instead of the sender's email address
     */
    reply_to?: Array<string> | string;

    /**
     * The date at which the email is scheduled to be sent
     */
    scheduled_at?: string;

    /**
     * May provide information about the status
     */
    status_reason?: string;

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

export type EmailBulkResponse = Array<EmailBulkResponse.EmailBulkResponseItem>;

export namespace EmailBulkResponse {
  export interface EmailBulkResponseItem {
    /**
     * The kind of object returned
     */
    kind: 'email';

    /**
     * The status of the email in the bulk.
     */
    status: SharedAPI.BulkEmailsStatus;

    /**
     * The id of the email
     */
    id?: string;

    error?: string;

    /**
     * The id of the organization
     */
    org_id?: string;
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

export interface EmailBulkParams {
  /**
   * The emails to send
   */
  emails: Array<EmailBulkParams.Email>;

  /**
   * Used as a fallback field email value if no value is present in emails
   */
  fallback?: EmailBulkParams.Fallback;
}

export namespace EmailBulkParams {
  export interface Email {
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
    tags?: Array<Email.Tag>;

    /**
     * The plaintext version of the email
     */
    text?: string;
  }

  export namespace Email {
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
   * Used as a fallback field email value if no value is present in emails
   */
  export interface Fallback {
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
     * The e-mail address of the sender
     */
    from?: string;

    /**
     * The headers to add to the email
     */
    headers?: Record<string, string>;

    /**
     * The HTML version of the email
     */
    html?: string;

    /**
     * The region of the related data
     */
    region?: 'eu-west-1';

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
     * The subject of the e-mail
     */
    subject?: string;

    /**
     * The tags to add to the email
     */
    tags?: Array<Fallback.Tag>;

    /**
     * The plaintext version of the email
     */
    text?: string;

    /**
     * The primary recipient(s) of the email
     */
    to?: Array<string> | string;
  }

  export namespace Fallback {
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

Emails.Events = Events;

export declare namespace Emails {
  export {
    type EmailRetrieveResponse as EmailRetrieveResponse,
    type EmailListResponse as EmailListResponse,
    type EmailBulkResponse as EmailBulkResponse,
    type EmailCancelResponse as EmailCancelResponse,
    type EmailSendResponse as EmailSendResponse,
    type EmailBulkParams as EmailBulkParams,
    type EmailSendParams as EmailSendParams,
  };

  export { Events as Events, type EventListResponse as EventListResponse };
}
