import { Resource } from '@nuntly/sdk-core';
import type { RequestOptions } from '@nuntly/sdk-core';
import type { EmailContentResponse } from '../../types/index.js';


/**
 * EmailsContent resource.
 */
export class EmailsContent extends Resource {

  /**
   * Returns presigned URLs to download the HTML, plain-text, and raw MIME source of a sent email.
   *
   * GET /emails/{id}/content
   * @param id - string
   * @param options - RequestOptions
   * @returns Promise<EmailContentResponse>
   */
  async retrieve(id: string, options?: RequestOptions): Promise<EmailContentResponse> {
    const response = await this._http.get<{ data: EmailContentResponse }>(`/emails/${id}/content`, undefined, options);
    return response.data;
  }

}
