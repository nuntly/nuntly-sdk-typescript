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

export interface EmailBouncedEvent {
  id: string;
  createdAt: string;
  type: 'email.bounced';
  data: { id: string; orgId: string; bulkId?: string; messageId: string; sentAt: string; enqueuedAt: string; domainName: string; domainId: string; from: string; to: string | Array<string>; cc?: string | Array<string>; bcc?: string | Array<string>; replyTo?: string | Array<string>; subject: string; headers?: Array<{ name: string; value: string }>; tags?: Record<string, Array<string>>; bounce: { bounceType: 'Permanent' | 'Undetermined' | 'Transient'; bounceSubType: 'Undetermined' | 'General' | 'NoEmail' | 'Suppressed' | 'OnAccountSuppressionList' | 'MailboxFull' | 'MessageTooLarge' | 'CustomTimeoutExceeded' | 'ContentRejected' | 'AttachmentRejected'; bouncedRecipients: Array<{ email: string; action?: string; status?: string; diagnosticCode?: string }>; bouncedAt: string; feedbackId: string; reportingMta?: string } };
}

export interface EmailClickedEvent {
  id: string;
  createdAt: string;
  type: 'email.clicked';
  data: { id: string; orgId: string; bulkId?: string; messageId: string; sentAt: string; enqueuedAt: string; domainName: string; domainId: string; from: string; to: string | Array<string>; cc?: string | Array<string>; bcc?: string | Array<string>; replyTo?: string | Array<string>; subject: string; headers?: Array<{ name: string; value: string }>; tags?: Record<string, Array<string>>; click: { clickedAt: string; userAgent: string; link: string } };
}

export interface EmailComplainedEvent {
  id: string;
  createdAt: string;
  type: 'email.complained';
  data: { id: string; orgId: string; bulkId?: string; messageId: string; sentAt: string; enqueuedAt: string; domainName: string; domainId: string; from: string; to: string | Array<string>; cc?: string | Array<string>; bcc?: string | Array<string>; replyTo?: string | Array<string>; subject: string; headers?: Array<{ name: string; value: string }>; tags?: Record<string, Array<string>>; complaint: { complainedAt: string; complainedRecipients?: Array<{ email: string }>; complaintSubType?: 'OnAccountSuppressionList'; complaintFeedbackType?: 'abuse' | 'auth-failure' | 'fraud' | 'not-spam' | 'other' | 'virus'; feedbackId: string; userAgent?: string; receivedAt?: string } };
}

export interface EmailDeliveredEvent {
  id: string;
  createdAt: string;
  type: 'email.delivered';
  data: { id: string; orgId: string; bulkId?: string; messageId: string; sentAt: string; enqueuedAt: string; domainName: string; domainId: string; from: string; to: string | Array<string>; cc?: string | Array<string>; bcc?: string | Array<string>; replyTo?: string | Array<string>; subject: string; headers?: Array<{ name: string; value: string }>; tags?: Record<string, Array<string>>; delivery: { deliveredAt: string; recipients: Array<string>; smtpResponse: string; remoteMtaIp: string; reportingMta: string; processingTime?: number } };
}

export interface EmailDeliveryDelayedEvent {
  id: string;
  createdAt: string;
  type: 'email.deliveryDelayed';
  data: { id: string; orgId: string; bulkId?: string; messageId: string; sentAt: string; enqueuedAt: string; domainName: string; domainId: string; from: string; to: string | Array<string>; cc?: string | Array<string>; bcc?: string | Array<string>; replyTo?: string | Array<string>; subject: string; headers?: Array<{ name: string; value: string }>; tags?: Record<string, Array<string>>; deliveryDelay: { delayedAt: string; delayType: 'InternalFailure' | 'General' | 'MailboxFull' | 'SpamDetected' | 'RecipientServerError' | 'IPFailure' | 'TransientCommunicationFailure' | 'BYOIPHostNameLookupUnavailable' | 'Undetermined' | 'SendingDeferral'; delayedRecipients: Array<{ email: string; status?: string; diagnosticCode?: string }>; deliveryStoppedAt: string; reportingMta: string } };
}

export interface EmailFailedEvent {
  id: string;
  createdAt: string;
  type: 'email.failed';
  data: { id: string; orgId: string; bulkId?: string; messageId: string; sentAt: string; enqueuedAt: string; domainName: string; domainId: string; from: string; to: string | Array<string>; cc?: string | Array<string>; bcc?: string | Array<string>; replyTo?: string | Array<string>; subject: string; headers?: Array<{ name: string; value: string }>; tags?: Record<string, Array<string>>; failure: { error: Record<string, unknown> } };
}

export interface EmailOpenedEvent {
  id: string;
  createdAt: string;
  type: 'email.opened';
  data: { id: string; orgId: string; bulkId?: string; messageId: string; sentAt: string; enqueuedAt: string; domainName: string; domainId: string; from: string; to: string | Array<string>; cc?: string | Array<string>; bcc?: string | Array<string>; replyTo?: string | Array<string>; subject: string; headers?: Array<{ name: string; value: string }>; tags?: Record<string, Array<string>>; open: { openedAt: string; userAgent: string } };
}

export interface EmailProcessedEvent {
  id: string;
  createdAt: string;
  type: 'email.processed';
  data: { processed: Record<string, unknown> };
}

export interface EmailQueuedEvent {
  id: string;
  createdAt: string;
  type: 'email.queued';
  data: { queue: Record<string, unknown> };
}

export interface EmailRejectedEvent {
  id: string;
  createdAt: string;
  type: 'email.rejected';
  data: { id?: string; orgId?: string; bulkId?: string; messageId?: string; sentAt?: string; enqueuedAt?: string; domainName?: string; domainId?: string; from?: string; to?: string | Array<string>; cc?: string | Array<string>; bcc?: string | Array<string>; replyTo?: string | Array<string>; subject?: string; headers?: Array<{ name: string; value: string }>; tags?: Record<string, Array<string>>; reject: { reason: string } };
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

export interface EmailScheduledEvent {
  id: string;
  createdAt: string;
  type: 'email.scheduled';
  data: { schedule: { scheduledAt: string } };
}

export interface EmailSendingEvent {
  id: string;
  createdAt: string;
  type: 'email.sending';
  data: { id: string; orgId: string; bulkId?: string; messageId: string; sentAt: string; enqueuedAt: string; domainName: string; domainId: string; from: string; to: string | Array<string>; cc?: string | Array<string>; bcc?: string | Array<string>; replyTo?: string | Array<string>; subject: string; headers?: Array<{ name: string; value: string }>; tags?: Record<string, Array<string>>; sending: Record<string, unknown> };
}

export interface EmailSentEvent {
  id: string;
  createdAt: string;
  type: 'email.sent';
  data: { id: string; orgId: string; bulkId?: string; messageId: string; sentAt: string; enqueuedAt: string; domainName: string; domainId: string; from: string; to: string | Array<string>; cc?: string | Array<string>; bcc?: string | Array<string>; replyTo?: string | Array<string>; subject: string; headers?: Array<{ name: string; value: string }>; tags?: Record<string, Array<string>>; send: Record<string, unknown> };
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
