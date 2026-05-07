import { Resource } from '../../core/index.js';
import type { RequestOptions } from '../../core/index.js';
import type { MessageContent } from '../../types/index.js';


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
   * @returns Promise<MessageContent>
   */
  async retrieve(messageId: string, options?: RequestOptions): Promise<MessageContent> {
    const response = await this._http.get<{ data: MessageContent }>(`/messages/${messageId}/content`, undefined, options);
    return response.data;
  }

}
