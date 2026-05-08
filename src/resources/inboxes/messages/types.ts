/**
 * @example
 *     await nuntly.inboxes.messages.send({
 *       to: 'user@example.com',
 *       subject: 'Welcome to Nuntly',
 *     });
 */
export interface SendMessageRequest {
  /** The recipient addresses. */
  to: Array<string>;
  /** The CC addresses. */
  cc?: Array<string>;
  /** The BCC addresses. */
  bcc?: Array<string>;
  /** The message subject. */
  subject: string;
  /** The plain text body. */
  text?: string;
  /** The HTML body. */
  html?: string;
}
