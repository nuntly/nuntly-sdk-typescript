// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Content extends APIResource {
  /**
   * Retrieve email content by email id
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ContentRetrieveResponse> {
    return (
      this._client.get(path`/emails/${id}/content`, options) as APIPromise<{ data: ContentRetrieveResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export interface ContentRetrieveResponse {
  htmlTemplateUrl?: string;

  htmlUrl?: string;

  mineUrl?: string;

  subjectTemplateUrl?: string;

  textTemplateUrl?: string;

  textUrl?: string;
}

export declare namespace Content {
  export { type ContentRetrieveResponse as ContentRetrieveResponse };
}
