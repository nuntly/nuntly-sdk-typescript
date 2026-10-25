import type { APIPromise, RequestOptions } from '../../../core/index.js';
import { Resource } from '../../../core/index.js';
import type { MessageContent, MessageContentQuery } from '../../types.js';

/**
 * MessagesContent resource.
 */
export class MessagesContent extends Resource {
  /**
   * Returns temporary download URLs, valid for 2 minutes, for the HTML, plain-text or raw MIME content of a message. Only HTML is returned by default.
   *
   * GET /messages/{messageId}/content
   * @param messageId - string
   * @param query - MessageContentQuery
   * @param options - RequestOptions
   * @returns APIPromise<MessageContent>
   */
  retrieve(messageId: string, query?: MessageContentQuery, options?: RequestOptions): APIPromise<MessageContent> {
    return this._http
      .get<{ data: MessageContent }>({
        path: '/messages/{messageId}/content',
        pathParams: { messageId },
        query,
        options,
      })
      .map((r) => r.data);
  }
}
