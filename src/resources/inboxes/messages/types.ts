/**
 * @example
 *     await nuntly.inboxes.messages.send('ibx_01kabn43yqyxn2bx4ve84mczd3', {
 *       to: ['brian67@gmail.com'],
 *       subject: 'Verify your email address',
 *       text: 'Thank you for signing up! Please verify your email address.',
 *       html: '<h1>Welcome</h1><p>Thank you for signing up! Please verify your email address.</p>',
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
