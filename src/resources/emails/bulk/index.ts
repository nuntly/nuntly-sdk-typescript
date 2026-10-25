import type { APIPromise, IdempotentRequestOptions, RequestOptions } from '../../../core/index.js';
import { Resource } from '../../../core/index.js';
import { withIdempotencyKey } from '../../../lib/idempotency.js';
import type { BulkEmailsResponse, CreateBulkEmailsRequest, CreateBulkEmailsResponse } from '../../types.js';

/**
 * EmailsBulk resource.
 */
export class EmailsBulk extends Resource {
  /**
   * Returns the emails created by a bulk request, with the id and current status of each one, looked up by the bulk id returned when it was sent.
   *
   * GET /emails/bulk/{bulkId}
   * @param bulkId - string
   * @param options - RequestOptions
   * @returns APIPromise<BulkEmailsResponse>
   */
  retrieve(bulkId: string, options?: RequestOptions): APIPromise<BulkEmailsResponse> {
    return this._http
      .get<{ data: BulkEmailsResponse }>({
        path: '/emails/bulk/{bulkId}',
        pathParams: { bulkId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Queues 1 to 20 emails in one request with optional shared fallback values, and returns a bulk id plus the id and status of each email. No scheduling.
   *
   * POST /emails/bulk
   * @param body - CreateBulkEmailsRequest
   * @param options - IdempotentRequestOptions
   * @returns APIPromise<CreateBulkEmailsResponse>
   */
  send(body: CreateBulkEmailsRequest, options?: IdempotentRequestOptions): APIPromise<CreateBulkEmailsResponse> {
    return this._http
      .post<{ data: CreateBulkEmailsResponse }>({
        path: '/emails/bulk',
        body,
        options: withIdempotencyKey(options),
        idempotent: true,
      })
      .map((r) => r.data);
  }
}
