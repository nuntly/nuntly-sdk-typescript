// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as EmailsAPI from './emails';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Send transactional emails, retrieve sending history, and track delivery status per message.
 */
export class Content extends APIResource {
  /**
   * Returns presigned URLs to download the HTML, plain-text, and raw MIME source of
   * a sent email.
   *
   * @example
   * ```ts
   * const content = await client.emails.content.retrieve(
   *   'em_01ka8k8s80gvx9604cn9am5st4',
   * );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ContentRetrieveResponse> {
    return (
      this._client.get(path`/emails/${id}/content`, options) as APIPromise<{ data: ContentRetrieveResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export interface ContentRetrieveResponse {
  /**
   * HTML content, or `null` if unavailable.
   */
  html: EmailsAPI.EmailContentItem | null;

  /**
   * HTML template content, or `null` if unavailable. Returned for failed emails
   * only.
   */
  htmlTemplate: EmailsAPI.EmailContentItem | null;

  /**
   * Raw MIME (.eml) content, or `null` if unavailable.
   */
  mime: EmailsAPI.EmailContentItem | null;

  /**
   * Subject template content, or `null` if unavailable. Returned for failed emails
   * only.
   */
  subjectTemplate: EmailsAPI.EmailContentItem | null;

  /**
   * Plain text content, or `null` if unavailable.
   */
  text: EmailsAPI.EmailContentItem | null;

  /**
   * Text template content, or `null` if unavailable. Returned for failed emails
   * only.
   */
  textTemplate: EmailsAPI.EmailContentItem | null;
}

export declare namespace Content {
  export { type ContentRetrieveResponse as ContentRetrieveResponse };
}
