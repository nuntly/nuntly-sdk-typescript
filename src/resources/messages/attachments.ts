// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as MessagesAPI from './messages';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Access received messages, download attachments, and send replies or forwards from an inbox.
 */
export class Attachments extends APIResource {
  /**
   * Retrieve an attachment with a presigned download URL.
   */
  retrieve(attachmentID: string, params: AttachmentRetrieveParams, options?: RequestOptions): APIPromise<MessagesAPI.MessageAttachment> {
    const { messageId } = params
    return (this._client.get(path`/messages/${messageId}/attachments/${attachmentID}`, options) as APIPromise<{ data: MessagesAPI.MessageAttachment }>)._thenUnwrap((obj) => obj.data);
  }

  /**
   * List all attachments for a message.
   */
  list(messageID: string, options?: RequestOptions): APIPromise<AttachmentListResponse> {
    return (this._client.get(path`/messages/${messageID}/attachments`, options) as APIPromise<{ data: AttachmentListResponse }>)._thenUnwrap((obj) => obj.data);
  }
}

export type AttachmentListResponse = Array<MessagesAPI.MessageAttachment>

export interface AttachmentRetrieveParams {
  /**
   * The id of the message
   */
  messageId: string;
}

export declare namespace Attachments {
  export {
    type AttachmentListResponse as AttachmentListResponse,
    type AttachmentRetrieveParams as AttachmentRetrieveParams
  };
}
