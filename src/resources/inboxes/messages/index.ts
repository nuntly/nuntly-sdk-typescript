import type { APIPromise, IdempotentRequestOptions } from '../../../core/index.js';
import { Resource } from '../../../core/index.js';
import { withIdempotencyKey } from '../../../lib/idempotency.js';
import type { SendMessageRequest, SendMessageResponse } from '../../types.js';

/**
 * InboxesMessages resource.
 */
export class InboxesMessages extends Resource {
  /**
   * Sends a new email from an inbox to one or more recipients. The message is queued for delivery and the response returns its id, thread id, and Message-ID.
   *
   * POST /inboxes/{inboxId}/messages
   * @param inboxId - string
   * @param body - SendMessageRequest
   * @param options - IdempotentRequestOptions
   * @returns APIPromise<SendMessageResponse>
   */
  send(inboxId: string, body: SendMessageRequest, options?: IdempotentRequestOptions): APIPromise<SendMessageResponse> {
    return this._http
      .post<{ data: SendMessageResponse }>({
        path: '/inboxes/{inboxId}/messages',
        pathParams: { inboxId },
        body,
        options: withIdempotencyKey(options),
      })
      .map((r) => r.data);
  }
}
