export interface EmailContentResponse {
  /** HTML content, or `null` if unavailable. */
  html: { downloadUrl: string; size: number | null; expiresAt: string } | null;
  /** Plain text content, or `null` if unavailable. */
  text: { downloadUrl: string; size: number | null; expiresAt: string } | null;
  /** Raw MIME (.eml) content, or `null` if unavailable. */
  mime: { downloadUrl: string; size: number | null; expiresAt: string } | null;
  /** Subject template content, or `null` if unavailable. Returned for failed emails only. */
  subjectTemplate: { downloadUrl: string; size: number | null; expiresAt: string } | null;
  /** HTML template content, or `null` if unavailable. Returned for failed emails only. */
  htmlTemplate: { downloadUrl: string; size: number | null; expiresAt: string } | null;
  /** Text template content, or `null` if unavailable. Returned for failed emails only. */
  textTemplate: { downloadUrl: string; size: number | null; expiresAt: string } | null;
}
