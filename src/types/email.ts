import type { EmailStatus, EventType } from './shared.js';

export interface BulkEmailsResponse {
  id: string;
  emails: Array<{ id: string; status: EmailStatus; detail?: string }>;
}

export interface CreateBulkEmailsRequest {
  /** Used as a fallback field email value if no value is present in emails */
  fallback?: { from?: string; to?: Array<string> | string; cc?: Array<string> | string; bcc?: Array<string> | string; replyTo?: Array<string> | string; subject?: string; text?: string; html?: string; headers?: Record<string, string>; tags?: Array<{ name: string; value: string }>; variables?: Record<string, string | number | boolean | null>; scheduledAt?: string };
  /** The bulk emails to send */
  emails: Array<{ from?: string; to?: Array<string> | string; cc?: Array<string> | string; bcc?: Array<string> | string; replyTo?: Array<string> | string; subject?: string; text?: string; html?: string; headers?: Record<string, string>; tags?: Array<{ name: string; value: string }>; variables?: Record<string, string | number | boolean | null>; scheduledAt?: string }>;
}

export interface CreateBulkEmailsResponse {
  /** The bulk id */
  id?: string;
  emails: Array<{ id?: string; status: EmailStatus }>;
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
  tags?: Array<{ name: string; value: string }>;
  /** The attachements to add to the email */
  attachments?: Array<{ content: string; filename?: string; contentType?: string }>;
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

export type EmailEventsResponse = Array<EmailEventsResponseItem>;

export interface EmailEventsResponseItem {
  id: string;
  /** The id of the organization */
  orgId: string;
  /** The id of the email */
  emailId: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** The date at which the event occurred */
  occurredAt?: string;
  /** An event */
  eventType: EventType;
  payload: Record<string, unknown>;
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
  tags?: Array<{ name: string; value: string }>;
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

export interface EmailsStatsResponse {
  /** The start date of the stats range */
  start: string;
  /** The end date of the stats range */
  end: string;
  stats: Array<{ occurredOn: string; queued: number; scheduled: number; processed: number; sending: number; sent: number; delivered: number; deliveredDelayed: number; bounced: number; failed: number; rejected: number; canceled: number; complaintReceived: number; renderingFailed: number; opened: number; uniqueOpened: number; clicked: number; uniqueClicked: number }>;
}
