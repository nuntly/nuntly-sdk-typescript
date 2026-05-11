import { Resource } from '../../../core/index.js';
import type { RequestOptions } from '../../../core/index.js';
import { generateIdempotencyKey } from '../../../lib/idempotency.js';
import type { BulkEmailsResponse, CreateBulkEmailsRequest, CreateBulkEmailsResponse } from '../../types.js';


/**
 * EmailsBulk resource.
 */
export class EmailsBulk extends Resource {

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

  /**
   * Send up to 20 emails in a single request. Use `fallback` to set default values shared across all messages.
   *
   * POST /emails/bulk
   * @param body - CreateBulkEmailsRequest
   * @param options - RequestOptions
   * @returns Promise<CreateBulkEmailsResponse>
   */
  async send(body: CreateBulkEmailsRequest, options?: RequestOptions): Promise<CreateBulkEmailsResponse> {
    const idempotencyKey = options?.idempotencyKey ?? generateIdempotencyKey();
    options = { ...options, headers: { 'Idempotency-Key': idempotencyKey, ...options?.headers } };
    const response = await this._http.post<{ data: CreateBulkEmailsResponse }>('/emails/bulk', body, options);
    return response.data;
  }

}
