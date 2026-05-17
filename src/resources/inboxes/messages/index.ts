import { Resource } from '../../../core/index.js';
import type { APIPromise, RequestOptions } from '../../../core/index.js';
import { generateIdempotencyKey } from '../../../lib/idempotency.js';
import type { SendMessageRequest, SendMessageResponse } from '../../types.js';


/**
 * InboxesMessages resource.
 */
export class InboxesMessages extends Resource {

  /**
   * Send a new message from an inbox.
   *
   * POST /inboxes/{inboxId}/messages
   * @param inboxId - string
   * @param body - SendMessageRequest
   * @param options - RequestOptions
   * @returns APIPromise<SendMessageResponse>
   */
  send(inboxId: string, body: SendMessageRequest, options?: RequestOptions): APIPromise<SendMessageResponse> {
    const idempotencyKey = options?.idempotencyKey ?? generateIdempotencyKey();
    options = { ...options, headers: { 'Idempotency-Key': idempotencyKey, ...options?.headers } };
    return this._http.post<{ data: SendMessageResponse }>({
      path: '/inboxes/{inboxId}/messages',
      pathParams: { inboxId },
      body,
      options,
    }).map((r) => r.data);
  }

}
