import { Resource } from '../../../core/index.js';
import type { APIPromise, RequestOptions } from '../../../core/index.js';
import { generateIdempotencyKey } from '../../../lib/idempotency.js';
import type { BulkEmailsResponse, CreateBulkEmailsRequest, CreateBulkEmailsResponse } from '../../types.js';


/**
 * EmailsBulk resource.
 */
export class EmailsBulk extends Resource {

  /**
   * Returns the emails submitted in a bulk request.
   *
   * GET /emails/bulk/{bulkId}
   * @param bulkId - string
   * @param options - RequestOptions
   * @returns APIPromise<BulkEmailsResponse>
   */
  list(bulkId: string, options?: RequestOptions): APIPromise<BulkEmailsResponse> {
    return this._http.get<{ data: BulkEmailsResponse }>({
      path: '/emails/bulk/{bulkId}',
      pathParams: { bulkId },
      options,
    }).map((r) => r.data);
  }

  /**
   * Send up to 20 emails in a single request. Use `fallback` to set default values shared across all messages.
   *
   * POST /emails/bulk
   * @param body - CreateBulkEmailsRequest
   * @param options - RequestOptions
   * @returns APIPromise<CreateBulkEmailsResponse>
   */
  send(body: CreateBulkEmailsRequest, options?: RequestOptions): APIPromise<CreateBulkEmailsResponse> {
    const idempotencyKey = options?.idempotencyKey ?? generateIdempotencyKey();
    options = { ...options, headers: { 'Idempotency-Key': idempotencyKey, ...options?.headers } };
    return this._http.post<{ data: CreateBulkEmailsResponse }>({
      path: '/emails/bulk',
      body,
      options,
    }).map((r) => r.data);
  }

}
