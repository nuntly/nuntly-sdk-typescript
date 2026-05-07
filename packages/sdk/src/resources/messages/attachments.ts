import { Resource } from '@nuntly/sdk-core';
import type { RequestOptions } from '@nuntly/sdk-core';
import type { AttachmentResponse, AttachmentsResponse } from '../../types/index.js';


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
   * @returns Promise<AttachmentsResponse>
   */
  async list(messageId: string, options?: RequestOptions): Promise<AttachmentsResponse> {
    const response = await this._http.get<{ data: AttachmentsResponse }>(`/messages/${messageId}/attachments`, undefined, options);
    return response.data;
  }

  /**
   * Retrieve an attachment with a presigned download URL.
   *
   * GET /messages/{messageId}/attachments/{attachmentId}
   * @param messageId - string
   * @param attachmentId - string
   * @param options - RequestOptions
   * @returns Promise<AttachmentResponse>
   */
  async retrieve(messageId: string, attachmentId: string, options?: RequestOptions): Promise<AttachmentResponse> {
    const response = await this._http.get<{ data: AttachmentResponse }>(`/messages/${messageId}/attachments/${attachmentId}`, undefined, options);
    return response.data;
  }

}
