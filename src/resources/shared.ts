// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class Shared extends APIResource {}

export interface BounceDetail {
  bounce_subtype: string;

  bounce_type: string;

  bounced_at: string;

  bounced_recipients: Array<BounceDetail.BouncedRecipient>;

  feedback_id: string;

  reporting_mta?: string;
}

export namespace BounceDetail {
  export interface BouncedRecipient {
    email: string;

    action?: string;

    diagnostic_code?: string;

    status?: string;
  }
}

/**
 * The status of the email in the bulk.
 */
export type BulkEmailsStatus = 'queued' | 'scheduled' | 'rejected';

export interface ClickDetail {
  clicked_at: string;

  link: string;

  user_agent: string;
}

export interface ComplaintDetail {
  complained_at: string;

  feedback_id: string;

  complained_recipients?: Array<ComplaintDetail.ComplainedRecipient>;

  complaint_feedback_type?: string;

  complaint_subtype?: string;

  received_at?: string;

  user_agent?: string;
}

export namespace ComplaintDetail {
  export interface ComplainedRecipient {
    email: string;
  }
}

export interface DeliveryDelayDetail {
  delay_type: string;

  delayed_at: string;

  delayed_recipients: Array<DeliveryDelayDetail.DelayedRecipient>;

  delivery_stopped_at: string;

  reporting_mta: string;
}

export namespace DeliveryDelayDetail {
  export interface DelayedRecipient {
    email: string;

    diagnostic_code?: string;

    status?: string;
  }
}

export interface DeliveryDetail {
  delivered_at: string;

  recipients: Array<string>;

  remote_mta_ip: string;

  reporting_mta: string;

  smtp_response: string;

  processing_time?: number;
}

export interface EmailEvent {
  id: string;

  domain: string;

  domain_id: string;

  enqueue_at: string;

  from: string;

  message_id: string;

  org_id: string;

  sent_at: string;

  subject: string;

  to: string | Array<string>;

  bcc?: string | Array<string>;

  bulk_id?: string;

  cc?: string | Array<string>;

  headers?: Array<EmailEvent.Header>;

  reply_to?: string | Array<string>;

  tags?: { [key: string]: Array<string> };
}

export namespace EmailEvent {
  export interface Header {
    name: string;

    value: string;
  }
}

/**
 * The headers to add to the email
 */
export type EmailHeaders = { [key: string]: string };

/**
 * The status of the email.
 */
export type EmailStatus =
  | 'queued'
  | 'scheduled'
  | 'processed'
  | 'failed'
  | 'sending'
  | 'sent'
  | 'delivered'
  | 'bounced'
  | 'canceled'
  | 'rejected';

export type EventType =
  | 'email.sent'
  | 'email.delivered'
  | 'email.opened'
  | 'email.clicked'
  | 'email.bounced'
  | 'email.complained'
  | 'email.rejected'
  | 'email.delivery_delayed'
  | 'email.failed';

export interface FailureDetail {
  error?: unknown;
}

export interface OpenDetail {
  opened_at: string;

  user_agent: string;
}

export interface RejectDetail {
  reason: string;
}

export type SendDetail = unknown;

export declare namespace Shared {
  export {
    type BounceDetail as BounceDetail,
    type BulkEmailsStatus as BulkEmailsStatus,
    type ClickDetail as ClickDetail,
    type ComplaintDetail as ComplaintDetail,
    type DeliveryDelayDetail as DeliveryDelayDetail,
    type DeliveryDetail as DeliveryDetail,
    type EmailEvent as EmailEvent,
    type EmailHeaders as EmailHeaders,
    type EmailStatus as EmailStatus,
    type EventType as EventType,
    type FailureDetail as FailureDetail,
    type OpenDetail as OpenDetail,
    type RejectDetail as RejectDetail,
    type SendDetail as SendDetail,
  };
}
