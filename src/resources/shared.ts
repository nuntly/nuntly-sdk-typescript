// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';

export class Shared extends APIResource {}

/**
 * The status of the email in the bulk.
 */
export type BulkEmailsStatus = 'queued' | 'scheduled' | 'rejected';

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

/**
 * The webhook events
 */
export type WebhookEventType =
  | 'email.sent'
  | 'email.delivered'
  | 'email.opened'
  | 'email.clicked'
  | 'email.bounced'
  | 'email.complained'
  | 'email.rejected'
  | 'email.delivery_delayed'
  | 'email.failed';

export declare namespace Shared {
  export {
    type BulkEmailsStatus as BulkEmailsStatus,
    type EmailStatus as EmailStatus,
    type WebhookEventType as WebhookEventType,
  };
}
