import { Resource } from '../../core/index.js';
import type { RequestOptions } from '../../core/index.js';
import type { SendMessageRequest, SendMessageResponse } from '../../types/index.js';


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
   * @returns Promise<SendMessageResponse>
   */
  async send(inboxId: string, body: SendMessageRequest, options?: RequestOptions): Promise<SendMessageResponse> {
    const response = await this._http.post<{ data: SendMessageResponse }>(`/inboxes/${inboxId}/messages`, body, options);
    return response.data;
  }

}
