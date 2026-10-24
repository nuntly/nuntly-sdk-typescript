import type { APIPromise, RequestOptions } from '../../../core/index.js';
import { Resource } from '../../../core/index.js';
import type { AttachmentResponse, AttachmentsResponse } from '../../types.js';

/**
 * MessagesAttachments resource.
 */
export class MessagesAttachments extends Resource {
  /**
   * Lists the attachments of a message with their filename, content type, size, disposition and content id. Download links are not included.
   *
   * GET /messages/{messageId}/attachments
   * @param messageId - string
   * @param options - RequestOptions
   * @returns APIPromise<AttachmentsResponse>
   */
  list(messageId: string, options?: RequestOptions): APIPromise<AttachmentsResponse> {
    return this._http
      .get<{ data: AttachmentsResponse }>({
        path: '/messages/{messageId}/attachments',
        pathParams: { messageId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Retrieves the metadata of an attachment and a temporary download URL that expires after 15 minutes. Use it to fetch the attachment file itself.
   *
   * GET /messages/{messageId}/attachments/{attachmentId}
   * @param messageId - string
   * @param attachmentId - string
   * @param options - RequestOptions
   * @returns APIPromise<AttachmentResponse>
   */
  retrieve(messageId: string, attachmentId: string, options?: RequestOptions): APIPromise<AttachmentResponse> {
    return this._http
      .get<{ data: AttachmentResponse }>({
        path: '/messages/{messageId}/attachments/{attachmentId}',
        pathParams: { messageId, attachmentId },
        options,
      })
      .map((r) => r.data);
  }
}
