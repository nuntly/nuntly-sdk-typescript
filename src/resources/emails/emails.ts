// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as BulkAPI from './bulk';
import { Bulk, BulkRetrieveResponse, BulkSendParams, BulkSendResponse } from './bulk';
import * as ContentAPI from './content';
import { Content, ContentRetrieveResponse } from './content';
import * as EventsAPI from './events';
import { EventListResponse, Events } from './events';
import * as StatsAPI from './stats';
import { StatListResponse, Stats } from './stats';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Emails extends APIResource {
  bulk: BulkAPI.Bulk = new BulkAPI.Bulk(this._client);
  events: EventsAPI.Events = new EventsAPI.Events(this._client);
  content: ContentAPI.Content = new ContentAPI.Content(this._client);
  stats: StatsAPI.Stats = new StatsAPI.Stats(this._client);

  /**
   * Retrieve an email by its id
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<EmailRetrieveResponse> {
    return (
      this._client.get(path`/emails/${id}`, options) as APIPromise<{ data: EmailRetrieveResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Return a list of recent emails
   */
  list(
    query: EmailListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<EmailListResponsesCursorPage, EmailListResponse> {
    return this._client.getAPIList('/emails', CursorPage<EmailListResponse>, { query, ...options });
  }

  /**
   * Cancel a scheduled email
   */
  cancel(id: string, options?: RequestOptions): APIPromise<EmailCancelResponse> {
    return (
      this._client.delete(path`/emails/${id}`, options) as APIPromise<{ data: EmailCancelResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Send transactional emails through Nuntly platform. It supports HTML and
   * plain-text emails, attachments, labels, custom headers and scheduling.
   */
  send(body: EmailSendParams, options?: RequestOptions): APIPromise<EmailSendResponse> {
    return (
      this._client.post('/emails', { body, ...options }) as APIPromise<{ data: EmailSendResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export type EmailListResponsesCursorPage = CursorPage<EmailListResponse>;

/**
 * The status of the email.
 */
export type Status =
  | 'queued'
  | 'scheduled'
  | 'processed'
  | 'failed'
  | 'sending'
  | 'sent'
  | 'delivered'
  | 'bounced'
  | 'complained'
  | 'canceled'
  | 'rejected';

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

export interface EmailRetrieveResponse {
  /**
   * The id of the email
   */
  id: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  createdAt: string;

  /**
   * The e-mail address of the sender
   */
  from: string;

  /**
   * The id of the organization
   */
  orgId: string;

  /**
   * The status of the email.
   */
  status: Status;

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
  bulkId?: string;

  /**
   * The carbon copy recipient(s) of the email
   */
  cc?: Array<string> | string;

  /**
   * The context for the template
   */
  context?: { [key: string]: string | number | boolean | null };

  /**
   * The headers to add to the email
   */
  headers?: { [key: string]: string };

  /**
   * The id from email provider
   */
  messageId?: string;

  /**
   * The email address where replies should be sent. If a recipient replies, the
   * response will go to this address instead of the sender's email address
   */
  replyTo?: Array<string> | string;

  /**
   * The date at which the email is scheduled to be sent
   */
  scheduledAt?: string;

  /**
   * May provide more informations about the status
   */
  statusReason?: { [key: string]: unknown };

  /**
   * The tags to add to the email
   */
  tags?: Array<Tag>;
}

export namespace EmailRetrieveResponse {
  export interface Attachment {
    /**
     * Content type of the attachment (the MIME type)
     */
    contentType?: string;

    /**
     * The name of the attached file to be displayed to the recipient
     */
    filename?: string;

    /**
     * The size of the attachment in bytes
     */
    size?: number;
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
  createdAt: string;

  /**
   * The e-mail address of the sender
   */
  from: string;

  /**
   * The status of the email.
   */
  status: Status;

  /**
   * The subject of the e-mail
   */
  subject: string;

  /**
   * The primary recipient(s) of the email
   */
  to: Array<string> | string;

  /**
   * The date at which the email is scheduled to be sent
   */
  scheduledAt?: string;
}

export interface EmailCancelResponse {
  /**
   * The id of the email
   */
  id: string;

  /**
   * The status of the email.
   */
  status: Status;
}

export interface EmailSendResponse {
  /**
   * The id of the email
   */
  id: string;

  /**
   * The status of the email.
   */
  status: Status;
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
  context?: { [key: string]: string | number | boolean | null };

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
  replyTo?: Array<string> | string;

  /**
   * The date at which the email is scheduled to be sent
   */
  scheduledAt?: string;

  /**
   * The tags to add to the email
   */
  tags?: Array<Tag>;

  /**
   * The plaintext version of the email
   */
  text?: string;
}

export namespace EmailSendParams {
  export interface Attachment {
    /**
     * The base64-encoded content of the attachment
     */
    content: string;

    /**
     * Content type of the attachment (the MIME type)
     */
    contentType?: string;

    /**
     * The name of the attached file to be displayed to the recipient
     */
    filename?: string;
  }
}

Emails.Bulk = Bulk;
Emails.Events = Events;
Emails.Content = Content;
Emails.Stats = Stats;

export declare namespace Emails {
  export {
    type Status as Status,
    type Tag as Tag,
    type EmailRetrieveResponse as EmailRetrieveResponse,
    type EmailListResponse as EmailListResponse,
    type EmailCancelResponse as EmailCancelResponse,
    type EmailSendResponse as EmailSendResponse,
    type EmailListResponsesCursorPage as EmailListResponsesCursorPage,
    type EmailListParams as EmailListParams,
    type EmailSendParams as EmailSendParams,
  };

  export {
    Bulk as Bulk,
    type BulkRetrieveResponse as BulkRetrieveResponse,
    type BulkSendResponse as BulkSendResponse,
    type BulkSendParams as BulkSendParams,
  };

  export { Events as Events, type EventListResponse as EventListResponse };

  export { Content as Content, type ContentRetrieveResponse as ContentRetrieveResponse };

  export { Stats as Stats, type StatListResponse as StatListResponse };
}
