import type { EventType } from './shared.js';

/**
 * @example
 *     await nuntly.webhooks.create({
 *       endpointUrl: 'https://example.com/webhooks',
 *       events: ['email.delivered', 'email.bounced'],
 *     });
 */
export interface CreateWebhookRequest {
  /** The name of the webhook */
  name?: string;
  /** The endpoint URL of the webhook */
  endpointUrl: string;
  /** The status of the webhook. */
  status?: 'enabled' | 'disabled' | 'revoked';
  /** The event types to subscribe to */
  events: Array<EventType>;
}

export interface CreateWebhookResponse {
  /** The id of the webhook */
  id: string;
  /** The name of the webhook */
  name?: string;
  /** The endpoint URL of the webhook */
  endpointUrl: string;
  /** The status of the webhook. */
  status: 'enabled' | 'disabled' | 'revoked';
  /** The event types to subscribe to */
  events: Array<EventType>;
  /** The signing secret of the webhook. */
  signingSecret: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
}

export interface DeleteWebhookResponse {
  /** The id of the webhook */
  id: string;
}

export interface UpdateWebhookRequest {
  /** The name of the webhook */
  name?: string;
  /** The endpoint URL of the webhook */
  endpointUrl?: string;
  /** The event types to subscribe to */
  events?: Array<EventType>;
  /** The status of the webhook. */
  status?: 'enabled' | 'disabled' | 'revoked';
  /** If true, a new signing secret will be generated */
  rotateSecret?: boolean;
}

export interface UpdateWebhookResponse {
  /** The id of the webhook */
  id: string;
  /** The signing secret of the webhook. */
  signingSecret?: string;
}

export type WebhookEventDeliveriesResponse = Array<WebhookEventDeliveriesResponseItem>;

export interface WebhookEventDeliveriesResponseItem {
  id: string;
  deliveredAt: string;
  code: string;
  status: 'pending' | 'success' | 'failed';
  response: Record<string, Record<string, unknown>>;
}

/** A single item from WebhookEventsResponse. */
export interface WebhookEventsResponseItem {
  /** The id of the webhook event */
  id: string;
  /** The id of the webhook */
  webhookId: string;
  /** The id of the organization */
  orgId: string;
  /** An event */
  event: EventType;
  /** The timestamp when the event was successfully delivered to the endpoint */
  successfulAt?: string;
  data: Record<string, Record<string, unknown>>;
  /** Status of the webhook delivery attempt */
  status: 'success' | 'pending' | 'failed';
}

export interface WebhookResponse {
  /** The id of the webhook */
  id: string;
  /** The name of the webhook */
  name?: string;
  /** The endpoint URL of the webhook */
  endpointUrl: string;
  /** The event types to subscribe to */
  events: Array<EventType>;
  /** The status of the webhook. */
  status: 'enabled' | 'disabled' | 'revoked';
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
}

/** A single item from WebhooksResponse. */
export interface WebhooksResponseItem {
  /** The id of the webhook */
  id: string;
  /** The name of the webhook */
  name?: string;
  /** The endpoint URL of the webhook */
  endpointUrl: string;
  /** The status of the webhook. */
  status: 'enabled' | 'disabled' | 'revoked';
  /** The event types to subscribe to */
  events: Array<EventType>;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
}
