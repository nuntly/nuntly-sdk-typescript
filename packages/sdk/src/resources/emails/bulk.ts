import { Resource } from '@nuntly/sdk-core';
import type { RequestOptions } from '@nuntly/sdk-core';
import type { BulkEmailsResponse, CreateBulkEmailsRequest, CreateBulkEmailsResponse } from '../../types/index.js';


/**
 * EmailsBulk resource.
 */
export class EmailsBulk extends Resource {

  /**
   * Send up to 20 emails in a single request. Use `fallback` to set default values shared across all messages.
   *
   * POST /emails/bulk
   * @param body - CreateBulkEmailsRequest
   * @param options - RequestOptions
   * @returns Promise<CreateBulkEmailsResponse>
   */
  async send(body: CreateBulkEmailsRequest, options?: RequestOptions): Promise<CreateBulkEmailsResponse> {
    const response = await this._http.post<{ data: CreateBulkEmailsResponse }>('/emails/bulk', body, options);
    return response.data;
  }

  /**
   * Returns the delivery status of all emails submitted in a bulk request.
   *
   * GET /emails/bulk/{bulkId}
   * @param bulkId - string
   * @param options - RequestOptions
   * @returns Promise<BulkEmailsResponse>
   */
  async list(bulkId: string, options?: RequestOptions): Promise<BulkEmailsResponse> {
    const response = await this._http.get<{ data: BulkEmailsResponse }>(`/emails/bulk/${bulkId}`, undefined, options);
    return response.data;
  }

}
