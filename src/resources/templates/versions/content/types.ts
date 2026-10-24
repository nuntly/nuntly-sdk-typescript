export interface TemplateVersionContentResponse {
  html:
    | {
        status: 'available';
        /** Presigned download URL. */
        downloadUrl: string;
        /** When the URL expires. */
        expiresAt: string;
      }
    | { status: 'absent' }
    | { status: 'unavailable' };
  text:
    | {
        status: 'available';
        /** Presigned download URL. */
        downloadUrl: string;
        /** When the URL expires. */
        expiresAt: string;
      }
    | { status: 'absent' }
    | { status: 'unavailable' };
}
