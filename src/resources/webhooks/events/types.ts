import type { EventType } from '../../shared/types.js';

/** A single item from WebhookEventsResponse. */
export interface WebhookEventsResponseItem {
  /** The id of the webhook event */
  id: string;
  /** The id of the webhook */
  webhookId: string;
  /** The id of the organization */
  orgId: string;
  /** An event */
  event: EventType | (string & {});
  /** The timestamp when the event was successfully delivered to the endpoint */
  successfulAt?: string;
  data: Record<string, Record<string, unknown>>;
  /** Status of the webhook delivery attempt */
  status: 'success' | 'pending' | 'failed' | (string & {});
}
