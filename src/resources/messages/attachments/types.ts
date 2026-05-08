export interface AttachmentResponse {
  /** The id of the attachment */
  id: string;
  /** The original filename. */
  filename: string | null;
  /** The MIME content type. */
  contentType: string;
  /** The size in bytes. */
  size: number;
  /** The content disposition (inline or attachment). */
  contentDisposition: string | null;
  /** The CID for inline images. */
  contentId: string | null;
  /** Presigned download URL (included when retrieving a single attachment). */
  downloadUrl?: string;
}

export type AttachmentsResponse = Array<AttachmentResponse>;
