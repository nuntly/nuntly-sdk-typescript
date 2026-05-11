export interface EmailContentItem {
  /** Presigned download URL. */
  downloadUrl: string;
  /** Uncompressed size in bytes. */
  size: number | null;
  /** When the URL expires. */
  expiresAt: string;
}

export interface EmailContentResponse {
  /** HTML content, or `null` if unavailable. */
  html: EmailContentItem | null;
  /** Plain text content, or `null` if unavailable. */
  text: EmailContentItem | null;
  /** Raw MIME (.eml) content, or `null` if unavailable. */
  mime: EmailContentItem | null;
  /** Subject template content, or `null` if unavailable. Returned for failed emails only. */
  subjectTemplate: EmailContentItem | null;
  /** HTML template content, or `null` if unavailable. Returned for failed emails only. */
  htmlTemplate: EmailContentItem | null;
  /** Text template content, or `null` if unavailable. Returned for failed emails only. */
  textTemplate: EmailContentItem | null;
}
