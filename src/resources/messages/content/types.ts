export interface MessageContent {
  /** Plain text content, or `null` if not requested or unavailable. */
  text: { downloadUrl: string; size: number | null; expiresAt: string } | null;
  /** HTML content, or `null` if not requested or unavailable. */
  html: { downloadUrl: string; size: number | null; expiresAt: string } | null;
  /** Raw MIME (.eml) content, or `null` if not requested or unavailable. Returned for received messages only. */
  mime: { downloadUrl: string; size: number | null; expiresAt: string } | null;
}
