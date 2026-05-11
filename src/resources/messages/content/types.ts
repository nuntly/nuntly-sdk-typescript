export interface MessageContent {
  /** Plain text content, or `null` if not requested or unavailable. */
  text: MessageContentItem | null;
  /** HTML content, or `null` if not requested or unavailable. */
  html: MessageContentItem | null;
  /** Raw MIME (.eml) content, or `null` if not requested or unavailable. Returned for received messages only. */
  mime: MessageContentItem | null;
}

export interface MessageContentItem {
  /** Presigned download URL. */
  downloadUrl: string;
  /** Uncompressed size in bytes. */
  size: number | null;
  /** When the URL expires. */
  expiresAt: string;
}
