// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as EmailsAPI from './emails';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Bulk extends APIResource {
  /**
   * Retrieve bulk emails
   */
  retrieve(bulkID: string, options?: RequestOptions): APIPromise<BulkRetrieveResponse> {
    return (
      this._client.get(path`/emails/bulk/${bulkID}`, options) as APIPromise<{ data: BulkRetrieveResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Send bulk emails through Nuntly platform.
   */
  send(body: BulkSendParams, options?: RequestOptions): APIPromise<BulkSendResponse> {
    return (
      this._client.post('/emails/bulk', { body, ...options }) as APIPromise<{ data: BulkSendResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export interface BulkRetrieveResponse {
  /**
   * The bulk id
   */
  id: string;

  emails: Array<BulkRetrieveResponse.Email>;
}

export namespace BulkRetrieveResponse {
  export interface Email {
    /**
     * The id of the email
     */
    id: string;

    /**
     * The status of the email.
     */
    status: EmailsAPI.Status;

    detail?: string;
  }
}

export interface BulkSendResponse {
  emails: Array<BulkSendResponse.Email>;

  /**
   * The bulk id
   */
  id?: string;
}

export namespace BulkSendResponse {
  export interface Email {
    /**
     * The status of the email.
     */
    status: EmailsAPI.Status;

    /**
     * The id of the email
     */
    id?: string;
  }
}

export interface BulkSendParams {
  /**
   * The bulk emails to send
   */
  emails: Array<BulkSendParams.Email>;

  /**
   * Used as a fallback field email value if no value is present in emails
   */
  fallback?: BulkSendParams.Fallback;
}

export namespace BulkSendParams {
  export interface Email {
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
     * The e-mail address of the sender
     */
    from?: string;

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
     * The subject of the e-mail
     */
    subject?: string;

    /**
     * The tags to add to the email
     */
    tags?: Array<EmailsAPI.Tag>;

    /**
     * The plaintext version of the email
     */
    text?: string;

    /**
     * The primary recipient(s) of the email
     */
    to?: Array<string> | string;
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
    context?: { [key: string]: string | number | boolean | null };

    /**
     * The e-mail address of the sender
     */
    from?: string;

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
     * The subject of the e-mail
     */
    subject?: string;

    /**
     * The tags to add to the email
     */
    tags?: Array<EmailsAPI.Tag>;

    /**
     * The plaintext version of the email
     */
    text?: string;

    /**
     * The primary recipient(s) of the email
     */
    to?: Array<string> | string;
  }
}

export declare namespace Bulk {
  export {
    type BulkRetrieveResponse as BulkRetrieveResponse,
    type BulkSendResponse as BulkSendResponse,
    type BulkSendParams as BulkSendParams,
  };
}
