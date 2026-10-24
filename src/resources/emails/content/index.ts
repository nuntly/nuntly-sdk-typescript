import type { APIPromise, RequestOptions } from '../../../core/index.js';
import { Resource } from '../../../core/index.js';
import type { EmailContentResponse } from '../../types.js';

/**
 * EmailsContent resource.
 */
export class EmailsContent extends Resource {
  /**
   * Returns download links, valid for 2 minutes, for the HTML, plain-text and raw MIME versions of an email, plus its stored subject and body templates.
   *
   * GET /emails/{id}/content
   * @param id - string
   * @param options - RequestOptions
   * @returns APIPromise<EmailContentResponse>
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<EmailContentResponse> {
    return this._http
      .get<{ data: EmailContentResponse }>({
        path: '/emails/{id}/content',
        pathParams: { id },
        options,
      })
      .map((r) => r.data);
  }
}
