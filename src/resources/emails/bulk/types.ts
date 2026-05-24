import type { EmailStatus, Tag } from '../../shared/types.js';

export interface BulkEmailsResponse {
  id: string;
  emails: Array<{ id: string; status: EmailStatus; detail?: string }>;
}

export interface CreateBulkEmail {
  /** The e-mail address of the sender */
  from?: string;
  /** The primary recipient(s) of the email */
  to?: Array<string> | string;
  /** The carbon copy recipient(s) of the email */
  cc?: Array<string> | string;
  /** The blind carbon copy recipient(s) of the email */
  bcc?: Array<string> | string;
  /** The email address where replies should be sent. If a recipient replies, the response will go to this address instead of the sender's email address */
  replyTo?: Array<string> | string;
  /** The subject of the e-mail */
  subject?: string;
  /** The plaintext version of the email */
  text?: string;
  /** The HTML version of the email */
  html?: string;
  /** The headers to add to the email */
  headers?: Record<string, string>;
  /** The tags to add to the email */
  tags?: Array<Tag>;
  /** The variables for the template */
  variables?: Record<string, string | number | boolean | null>;
}

export interface CreateBulkEmailsRequest {
  /** Used as a fallback field email value if no value is present in emails. */
  fallback?: CreateBulkFallback;
  /** The bulk emails to send. */
  emails: Array<CreateBulkEmail>;
}

export interface CreateBulkEmailsResponse {
  /** The bulk id */
  id?: string;
  emails: Array<{ id?: string; status: EmailStatus }>;
}

export interface CreateBulkFallback {
  /** The e-mail address of the sender */
  from?: string;
  /** The primary recipient(s) of the email */
  to?: Array<string> | string;
  /** The carbon copy recipient(s) of the email */
  cc?: Array<string> | string;
  /** The blind carbon copy recipient(s) of the email */
  bcc?: Array<string> | string;
  /** The email address where replies should be sent. If a recipient replies, the response will go to this address instead of the sender's email address */
  replyTo?: Array<string> | string;
  /** The subject of the e-mail */
  subject?: string;
  /** The plaintext version of the email */
  text?: string;
  /** The HTML version of the email */
  html?: string;
  /** The headers to add to the email */
  headers?: Record<string, string>;
  /** The tags to add to the email */
  tags?: Array<Tag>;
  /** The variables for the template */
  variables?: Record<string, string | number | boolean | null>;
}
