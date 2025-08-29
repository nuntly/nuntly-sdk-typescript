// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SharedAPI from '../shared';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Bulk extends APIResource {
  /**
   * Return a list of emails
   *
   * @example
   * ```ts
   * const bulk = await client.emails.bulk.retrieve(
   *   'blk_qiPSkLrTmXvDohbxCcYt3pFEMGgnjHD6kbDL8d4uGKvNGboT',
   * );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<BulkRetrieveResponse> {
    return (
      this._client.get(path`/emails/bulk/${id}`, options) as APIPromise<{ data: BulkRetrieveResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Send bulk emails
   *
   * @example
   * ```ts
   * const response = await client.emails.bulk.send({
   *   emails: [
   *     { to: 'carlo43@gmail.com' },
   *     { to: 'pink42@yahoo.com' },
   *   ],
   * });
   * ```
   */
  send(body: BulkSendParams, options?: RequestOptions): APIPromise<BulkSendResponse> {
    return (
      this._client.post('/emails/bulk', { body, ...options }) as APIPromise<{ data: BulkSendResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

/**
 * The emails in a given bulk
 */
export interface BulkRetrieveResponse {
  /**
   * The bulk id
   */
  id: string;

  emails: Array<BulkRetrieveResponse.Email>;

  /**
   * The kind of object returned
   */
  kind: 'bulk-email';
}

export namespace BulkRetrieveResponse {
  export interface Email {
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
    status: SharedAPI.EmailStatus;

    /**
     * Date xhen the status changed
     */
    status_at: string;
  }
}

export interface BulkSendResponse {
  /**
   * The bulk id
   */
  id: string;

  emails: Array<BulkSendResponse.Email>;

  /**
   * The kind of object returned
   */
  kind: 'bulk-email';
}

export namespace BulkSendResponse {
  export interface Email {
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

export interface BulkSendParams {
  /**
   * The emails to send
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

export declare namespace Bulk {
  export {
    type BulkRetrieveResponse as BulkRetrieveResponse,
    type BulkSendResponse as BulkSendResponse,
    type BulkSendParams as BulkSendParams,
  };
}
