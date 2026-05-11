import type { EmailStatus, Tag } from '../shared/types.js';

export interface Attachment {
  /** The base64-encoded content of the attachment */
  content: string;
  /** The name of the attached file to be displayed to the recipient */
  filename?: string;
  /** Content type of the attachment (the MIME type) */
  contentType?: string;
}

/**
 * @example
 *     await nuntly.emails.send({
 *       from: 'hello@nuntly.com',
 *       to: 'user@example.com',
 *       subject: 'Welcome to Nuntly',
 *     });
 */
export interface CreateEmailRequest {
  /** The e-mail address of the sender */
  from: string;
  /** The primary recipient(s) of the email */
  to: Array<string> | string;
  /** The carbon copy recipient(s) of the email */
  cc?: Array<string> | string;
  /** The blind carbon copy recipient(s) of the email */
  bcc?: Array<string> | string;
  /** The email address where replies should be sent. If a recipient replies, the response will go to this address instead of the sender's email address */
  replyTo?: Array<string> | string;
  /** The subject of the e-mail */
  subject: string;
  /** The plaintext version of the email */
  text?: string;
  /** The HTML version of the email */
  html?: string;
  /** The headers to add to the email */
  headers?: Record<string, string>;
  /** The tags to add to the email */
  tags?: Array<Tag>;
  /** The attachements to add to the email */
  attachments?: Array<Attachment>;
  /** The variables for the template */
  variables?: Record<string, string | number | boolean | null>;
  /** The date at which the email is scheduled to be sent */
  scheduledAt?: string;
}

export interface CreateEmailResponse {
  /** The id of the email */
  id: string;
  /** The status of the email. */
  status: EmailStatus;
}

export interface DeleteEmailResponse {
  /** The id of the email */
  id: string;
  /** The status of the email. */
  status: EmailStatus;
}

export interface EmailResponse {
  /** The id of the email */
  id: string;
  /** The id of the organization */
  orgId: string;
  /** The id from email provider */
  messageId?: string;
  /** The bulk id */
  bulkId?: string;
  /** The e-mail address of the sender */
  from: string;
  /** The primary recipient(s) of the email */
  to: Array<string> | string;
  /** The carbon copy recipient(s) of the email */
  cc?: Array<string> | string;
  /** The blind carbon copy recipient(s) of the email */
  bcc?: Array<string> | string;
  /** The status of the email. */
  status: EmailStatus;
  /** May provide more informations about the status */
  statusReason?: Record<string, Record<string, unknown>>;
  /** The subject of the e-mail */
  subject: string;
  /** The email address where replies should be sent. If a recipient replies, the response will go to this address instead of the sender's email address */
  replyTo?: Array<string> | string;
  /** The headers to add to the email */
  headers?: Record<string, string>;
  /** The tags to add to the email */
  tags?: Array<Tag>;
  /** The attachements */
  attachments?: Array<{ filename?: string; contentType?: string; size?: number }>;
  /** The variables for the template */
  variables?: Record<string, string | number | boolean | null>;
  /** The date at which the email is scheduled to be sent */
  scheduledAt?: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
}

/** A single item from EmailsResponse. */
export interface EmailsResponseItem {
  /** The id of the email */
  id: string;
  /** The e-mail address of the sender */
  from: string;
  /** The primary recipient(s) of the email */
  to: Array<string> | string;
  /** The subject of the e-mail */
  subject: string;
  /** The status of the email. */
  status: EmailStatus;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** The date at which the email is scheduled to be sent */
  scheduledAt?: string;
}
