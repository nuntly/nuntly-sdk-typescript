import { Resource } from '../../../core/index.js';
import type { APIPromise, RequestOptions } from '../../../core/index.js';
import type { MessageContent } from '../../types.js';


/**
 * MessagesContent resource.
 */
export class MessagesContent extends Resource {

  /**
   * Returns presigned URLs to download the HTML, plain-text, and raw MIME source of a received message.
   *
   * GET /messages/{messageId}/content
   * @param messageId - string
   * @param options - RequestOptions
   * @returns APIPromise<MessageContent>
   */
  retrieve(messageId: string, options?: RequestOptions): APIPromise<MessageContent> {
    return this._http.get<{ data: MessageContent }>({
      path: '/messages/{messageId}/content',
      pathParams: { messageId },
      options,
    }).map((r) => r.data);
  }

}
