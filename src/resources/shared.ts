// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class Shared extends APIResource {}

/**
 * An event
 */
export type EventType =
  | 'email.queued'
  | 'email.scheduled'
  | 'email.processed'
  | 'email.sending'
  | 'email.sent'
  | 'email.delivered'
  | 'email.opened'
  | 'email.clicked'
  | 'email.bounced'
  | 'email.complained'
  | 'email.rejected'
  | 'email.deliveryDelayed'
  | 'email.failed'
  | 'email.renderingFailed'
  | 'email.subscribed'
  | 'email.unsubscribed';

export declare namespace Shared {
  export { type EventType as EventType };
}
