// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as MessagesAPI from './messages';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Access received messages, download attachments, and send replies or forwards from an inbox.
 */
export class Content extends APIResource {
  /**
   * Returns presigned URLs to download the HTML, plain-text, and raw MIME source of
   * a received message.
   */
  retrieve(
    messageID: string,
    query: ContentRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MessagesAPI.MessageContent> {
    return (
      this._client.get(path`/messages/${messageID}/content`, { query, ...options }) as APIPromise<{
        data: MessagesAPI.MessageContent;
      }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export interface ContentRetrieveParams {
  /**
   * Content formats to retrieve. Defaults to `html` only.
   */
  format?: Array<'html' | 'text' | 'mime'>;
}

export declare namespace Content {
  export { type ContentRetrieveParams as ContentRetrieveParams };
}
