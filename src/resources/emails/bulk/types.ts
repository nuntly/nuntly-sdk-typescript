import type { EmailStatus, Tag } from '../../shared/types.js';

export interface BulkEmailsResponse {
  id: string;
  emails: Array<{ id: string; status: EmailStatus; detail?: string }>;
}

export interface CreateBulkEmailsRequest {
  /** Used as a fallback field email value if no value is present in emails */
  fallback?: { from?: string; to?: Array<string> | string; cc?: Array<string> | string; bcc?: Array<string> | string; replyTo?: Array<string> | string; subject?: string; text?: string; html?: string; headers?: Record<string, string>; tags?: Array<Tag>; variables?: Record<string, string | number | boolean | null>; scheduledAt?: string };
  /** The bulk emails to send */
  emails: Array<{ from?: string; to?: Array<string> | string; cc?: Array<string> | string; bcc?: Array<string> | string; replyTo?: Array<string> | string; subject?: string; text?: string; html?: string; headers?: Record<string, string>; tags?: Array<Tag>; variables?: Record<string, string | number | boolean | null>; scheduledAt?: string }>;
}

export interface CreateBulkEmailsResponse {
  /** The bulk id */
  id?: string;
  emails: Array<{ id?: string; status: EmailStatus }>;
}
