import { Resource } from '../../../core/index.js';
import type { APIPromise, RequestOptions } from '../../../core/index.js';
import type { AttachmentResponse, AttachmentsResponse } from '../../types.js';


/**
 * MessagesAttachments resource.
 */
export class MessagesAttachments extends Resource {

  /**
   * List all attachments for a message.
   *
   * GET /messages/{messageId}/attachments
   * @param messageId - string
   * @param options - RequestOptions
   * @returns APIPromise<AttachmentsResponse>
   */
  list(messageId: string, options?: RequestOptions): APIPromise<AttachmentsResponse> {
    return this._http.get<{ data: AttachmentsResponse }>({
      path: '/messages/{messageId}/attachments',
      pathParams: { messageId },
      options,
    }).map((r) => r.data);
  }

  /**
   * Retrieve an attachment with a presigned download URL.
   *
   * GET /messages/{messageId}/attachments/{attachmentId}
   * @param messageId - string
   * @param attachmentId - string
   * @param options - RequestOptions
   * @returns APIPromise<AttachmentResponse>
   */
  retrieve(messageId: string, attachmentId: string, options?: RequestOptions): APIPromise<AttachmentResponse> {
    return this._http.get<{ data: AttachmentResponse }>({
      path: '/messages/{messageId}/attachments/{attachmentId}',
      pathParams: { messageId, attachmentId },
      options,
    }).map((r) => r.data);
  }

}
