import type { EventType } from '../shared/types.js';

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
  status?: 'enabled' | 'disabled';
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
  status?: 'enabled' | 'disabled';
  /** If true, a new signing secret will be generated */
  rotateSecret?: boolean;
}

export interface UpdateWebhookResponse {
  /** The id of the webhook */
  id: string;
  /** The signing secret of the webhook. */
  signingSecret?: string;
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
