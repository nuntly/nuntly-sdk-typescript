// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as EmailsAPI from './emails';

export class Emails extends APIResource {
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
   * The e-mail address of the sender
   */
  from: string;

  /**
   * The status of the email.
   */
  status: 'queued' | 'scheduled' | 'processed' | 'sending' | 'sent' | 'delivered' | 'canceled' | 'blocked';

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

  desired_delivery?: EmailRetrieveResponse.DesiredDelivery;

  /**
   * The headers to add to the email
   */
  headers?: Record<string, string>;

  /**
   * The email address where replies should be sent. If a recipient replies, the
   * response will go to this address instead of the sender's email address
   */
  reply_to?: Array<string> | string;

  /**
   * The subject of the e-mail
   */
  subject?: string;

  /**
   * The tags to add to the email
   */
  tags?: Array<EmailRetrieveResponse.Tag>;
}

export namespace EmailRetrieveResponse {
  export interface DesiredDelivery {
    delivery_time: string;

    delivery_timezone?: string;
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
   * The emails
   */
  emails: Array<EmailListResponse.Email>;
}

export namespace EmailListResponse {
  export interface Email {
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
     * The status of the email.
     */
    status: 'queued' | 'scheduled' | 'processed' | 'sending' | 'sent' | 'delivered' | 'canceled' | 'blocked';

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

    desired_delivery?: Email.DesiredDelivery;

    /**
     * The headers to add to the email
     */
    headers?: Record<string, string>;

    /**
     * The email address where replies should be sent. If a recipient replies, the
     * response will go to this address instead of the sender's email address
     */
    reply_to?: Array<string> | string;

    /**
     * The subject of the e-mail
     */
    subject?: string;

    /**
     * The tags to add to the email
     */
    tags?: Array<Email.Tag>;
  }

  export namespace Email {
    export interface DesiredDelivery {
      delivery_time: string;

      delivery_timezone?: string;
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

export interface EmailBulkResponse {
  emails: Array<EmailBulkResponse.Email>;
}

export namespace EmailBulkResponse {
  export interface Email {
    /**
     * The id of the email
     */
    id: string;
  }
}

export interface EmailCancelResponse {
  /**
   * The id of the email
   */
  id: string;
}

export interface EmailSendResponse {
  /**
   * The id of the email
   */
  id: string;

  /**
   * The status of the email.
   */
  status: 'queued' | 'scheduled';
}

export interface EmailBulkParams {
  /**
   * The emails to send by bulk
   */
  emails: Array<EmailBulkParams.Email>;

  /**
   * Used as a fallback field email value if no value is present in email
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

    desired_delivery?: Email.DesiredDelivery;

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
     * The subject of the e-mail
     */
    subject?: string;

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
    export interface DesiredDelivery {
      delivery_time: string;

      delivery_timezone?: string;
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
   * Used as a fallback field email value if no value is present in email
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

    desired_delivery?: Fallback.DesiredDelivery;

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
     * The email address where replies should be sent. If a recipient replies, the
     * response will go to this address instead of the sender's email address
     */
    reply_to?: Array<string> | string;

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
  }

  export namespace Fallback {
    export interface DesiredDelivery {
      delivery_time: string;

      delivery_timezone?: string;
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

export interface EmailSendParams {
  /**
   * The e-mail address of the sender
   */
  from: string;

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

  desired_delivery?: EmailSendParams.DesiredDelivery;

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
   * The subject of the e-mail
   */
  subject?: string;

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
     * Content type for the attachment
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

  export interface DesiredDelivery {
    delivery_time: string;

    delivery_timezone?: string;
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

export namespace Emails {
  export import EmailRetrieveResponse = EmailsAPI.EmailRetrieveResponse;
  export import EmailListResponse = EmailsAPI.EmailListResponse;
  export import EmailBulkResponse = EmailsAPI.EmailBulkResponse;
  export import EmailCancelResponse = EmailsAPI.EmailCancelResponse;
  export import EmailSendResponse = EmailsAPI.EmailSendResponse;
  export import EmailBulkParams = EmailsAPI.EmailBulkParams;
  export import EmailSendParams = EmailsAPI.EmailSendParams;
}
