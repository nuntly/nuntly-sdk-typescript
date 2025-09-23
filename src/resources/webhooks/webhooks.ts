// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SharedAPI from '../shared';
import * as EventsAPI from './events';
import {
  EventDeliveriesParams,
  EventDeliveriesResponse,
  EventListParams,
  EventListResponse,
  EventListResponsesCursorPage,
  EventReplayParams,
  EventReplayResponse,
  Events,
} from './events';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Webhooks extends APIResource {
  events: EventsAPI.Events = new EventsAPI.Events(this._client);

  /**
   * Create a webhook so the endpoint is notified from Nuntly platform events (Emails
   * events)
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.create({
   *   endpoint_url:
   *     'https://webhook.site/12345678-1234-5678-1234-123456789012',
   *   events: ['email.delivered', 'email.sent'],
   *   status: 'enabled',
   * });
   * ```
   */
  create(body: WebhookCreateParams, options?: RequestOptions): APIPromise<WebhookCreateResponse> {
    return (
      this._client.post('/webhooks', { body, ...options }) as APIPromise<{ data: WebhookCreateResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Return the webhook with the given ID
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.retrieve(
   *   'wh_YNtYn86oYZmP1ZHbnUBvXXFt',
   * );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<WebhookRetrieveResponse> {
    return (
      this._client.get(path`/webhooks/${id}`, options) as APIPromise<{ data: WebhookRetrieveResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Updates a webhook with the given ID
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.update(
   *   'wh_YNtYn86oYZmP1ZHbnUBvXXFt',
   * );
   * ```
   */
  update(id: string, body: WebhookUpdateParams, options?: RequestOptions): APIPromise<WebhookUpdateResponse> {
    return (
      this._client.put(path`/webhooks/${id}`, { body, ...options }) as APIPromise<{
        data: WebhookUpdateResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Return a list of your webhooks
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const webhookListResponse of client.webhooks.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: WebhookListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WebhookListResponsesCursorPage, WebhookListResponse> {
    return this._client.getAPIList('/webhooks', CursorPage<WebhookListResponse>, { query, ...options });
  }

  /**
   * Delete the webhook with the given ID
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.delete(
   *   'wh_YNtYn86oYZmP1ZHbnUBvXXFt',
   * );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<WebhookDeleteResponse> {
    return (
      this._client.delete(path`/webhooks/${id}`, options) as APIPromise<{ data: WebhookDeleteResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  unwrap(body: string): UnwrapWebhookEvent {
    return JSON.parse(body) as UnwrapWebhookEvent;
  }
}

export type WebhookListResponsesCursorPage = CursorPage<WebhookListResponse>;

export interface BaseEvent {
  id: string;

  created_at: string;

  type: SharedAPI.EventType;

  kind?: 'event';
}

export interface EmailBouncedEvent extends Omit<BaseEvent, 'type'> {
  data: EmailBouncedEvent.Data;

  type?: 'email.bounced';
}

export namespace EmailBouncedEvent {
  export interface Data extends SharedAPI.EmailEvent {
    bounce: SharedAPI.BounceDetail;
  }
}

export interface EmailClickedEvent extends Omit<BaseEvent, 'type'> {
  data: EmailClickedEvent.Data;

  type?: 'email.clicked';
}

export namespace EmailClickedEvent {
  export interface Data extends SharedAPI.EmailEvent {
    click: SharedAPI.ClickDetail;
  }
}

export interface EmailComplainedEvent extends Omit<BaseEvent, 'type'> {
  data: EmailComplainedEvent.Data;

  type?: 'email.complained';
}

export namespace EmailComplainedEvent {
  export interface Data extends SharedAPI.EmailEvent {
    complaint: SharedAPI.ComplaintDetail;
  }
}

export interface EmailDeliveredEvent extends Omit<BaseEvent, 'type'> {
  data: EmailDeliveredEvent.Data;

  type?: 'email.delivered';
}

export namespace EmailDeliveredEvent {
  export interface Data extends SharedAPI.EmailEvent {
    delivery: SharedAPI.DeliveryDetail;
  }
}

export interface EmailDeliveryDelayedEvent extends Omit<BaseEvent, 'type'> {
  data: EmailDeliveryDelayedEvent.Data;

  type?: 'email.delivery_delayed';
}

export namespace EmailDeliveryDelayedEvent {
  export interface Data extends SharedAPI.EmailEvent {
    delivery_delay: SharedAPI.DeliveryDelayDetail;
  }
}

export interface EmailFailedEvent extends Omit<BaseEvent, 'type'> {
  data: EmailFailedEvent.Data;

  type?: 'email.failed';
}

export namespace EmailFailedEvent {
  export interface Data extends SharedAPI.EmailEvent {
    failure: SharedAPI.FailureDetail;
  }
}

export interface EmailOpenedEvent extends Omit<BaseEvent, 'type'> {
  data: EmailOpenedEvent.Data;

  type?: 'email.opened';
}

export namespace EmailOpenedEvent {
  export interface Data extends SharedAPI.EmailEvent {
    open: SharedAPI.OpenDetail;
  }
}

export interface EmailRejectedEvent extends Omit<BaseEvent, 'type'> {
  data: EmailRejectedEvent.Data;

  type?: 'email.rejected';
}

export namespace EmailRejectedEvent {
  export interface Data extends SharedAPI.EmailEvent {
    reject: SharedAPI.RejectDetail;
  }
}

export interface EmailSentEvent extends Omit<BaseEvent, 'type'> {
  data: EmailSentEvent.Data;

  type?: 'email.sent';
}

export namespace EmailSentEvent {
  export interface Data extends SharedAPI.EmailEvent {
    send: SharedAPI.SendDetail;
  }
}

/**
 * The event payload
 */
export type Event =
  | EmailSentEvent
  | EmailDeliveredEvent
  | EmailOpenedEvent
  | EmailClickedEvent
  | EmailBouncedEvent
  | EmailComplainedEvent
  | EmailRejectedEvent
  | EmailDeliveryDelayedEvent
  | EmailFailedEvent;

export interface WebhookCreateResponse {
  /**
   * The id of the webhook
   */
  id: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

  /**
   * The endpoint URL of the webhook
   */
  endpoint_url: string;

  events: Array<SharedAPI.EventType>;

  /**
   * The kind of object returned
   */
  kind: 'webhook';

  /**
   * The id of the organization
   */
  org_id: string;

  /**
   * The region of the related data
   */
  region: 'eu-west-1';

  /**
   * The signing secret of the webhook.
   */
  signing_secret: string;

  /**
   * The status of the webhook.
   */
  status: 'enabled' | 'disabled' | 'revoked';

  /**
   * Date at which the object was modified (ISO 8601 format)
   */
  modified_at?: string;

  /**
   * The name of the webhook
   */
  name?: string;
}

export interface WebhookRetrieveResponse {
  /**
   * The id of the webhook
   */
  id: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

  /**
   * The endpoint URL of the webhook
   */
  endpoint_url: string;

  events: Array<SharedAPI.EventType>;

  /**
   * The kind of object returned
   */
  kind: 'webhook';

  /**
   * The id of the organization
   */
  org_id: string;

  /**
   * The region of the related data
   */
  region: 'eu-west-1';

  /**
   * The status of the webhook.
   */
  status: 'enabled' | 'disabled' | 'revoked';

  /**
   * Date at which the object was modified (ISO 8601 format)
   */
  modified_at?: string;

  /**
   * The name of the webhook
   */
  name?: string;
}

export interface WebhookUpdateResponse {
  /**
   * The id of the webhook
   */
  id: string;

  /**
   * The kind of object returned
   */
  kind: 'webhook';

  /**
   * The id of the organization
   */
  org_id: string;

  /**
   * The signing secret of the webhook.
   */
  signing_secret?: string;
}

export interface WebhookListResponse {
  /**
   * The id of the webhook
   */
  id: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

  /**
   * The endpoint URL of the webhook
   */
  endpoint_url: string;

  events: Array<SharedAPI.EventType>;

  /**
   * The kind of object returned
   */
  kind: 'webhook';

  /**
   * The id of the organization
   */
  org_id: string;

  /**
   * The region of the related data
   */
  region: 'eu-west-1';

  /**
   * The status of the webhook.
   */
  status: 'enabled' | 'disabled' | 'revoked';

  /**
   * Date at which the object was modified (ISO 8601 format)
   */
  modified_at?: string;

  /**
   * The name of the webhook
   */
  name?: string;
}

export interface WebhookDeleteResponse {
  /**
   * The id of the webhook
   */
  id: string;

  /**
   * The kind of object returned
   */
  kind: 'webhook';

  /**
   * The id of the organization
   */
  org_id: string;
}

/**
 * The event payload
 */
export type UnwrapWebhookEvent =
  | EmailSentEvent
  | EmailDeliveredEvent
  | EmailOpenedEvent
  | EmailClickedEvent
  | EmailBouncedEvent
  | EmailComplainedEvent
  | EmailRejectedEvent
  | EmailDeliveryDelayedEvent
  | EmailFailedEvent;

export interface WebhookCreateParams {
  /**
   * The endpoint URL of the webhook
   */
  endpoint_url: string;

  events: Array<SharedAPI.EventType>;

  /**
   * The status of the webhook.
   */
  status: 'enabled' | 'disabled' | 'revoked';

  /**
   * The name of the webhook
   */
  name?: string;
}

export interface WebhookUpdateParams {
  /**
   * The endpoint URL of the webhook
   */
  endpoint_url?: string;

  events?: Array<SharedAPI.EventType>;

  /**
   * The name of the webhook
   */
  name?: string;

  /**
   * If true, a new signing secret will be generated
   */
  rotate_secret?: boolean;

  /**
   * The status of the webhook.
   */
  status?: 'enabled' | 'disabled';
}

export interface WebhookListParams extends CursorPageParams {}

Webhooks.Events = Events;

export declare namespace Webhooks {
  export {
    type BaseEvent as BaseEvent,
    type EmailBouncedEvent as EmailBouncedEvent,
    type EmailClickedEvent as EmailClickedEvent,
    type EmailComplainedEvent as EmailComplainedEvent,
    type EmailDeliveredEvent as EmailDeliveredEvent,
    type EmailDeliveryDelayedEvent as EmailDeliveryDelayedEvent,
    type EmailFailedEvent as EmailFailedEvent,
    type EmailOpenedEvent as EmailOpenedEvent,
    type EmailRejectedEvent as EmailRejectedEvent,
    type EmailSentEvent as EmailSentEvent,
    type Event as Event,
    type WebhookCreateResponse as WebhookCreateResponse,
    type WebhookRetrieveResponse as WebhookRetrieveResponse,
    type WebhookUpdateResponse as WebhookUpdateResponse,
    type WebhookListResponse as WebhookListResponse,
    type WebhookDeleteResponse as WebhookDeleteResponse,
    type UnwrapWebhookEvent as UnwrapWebhookEvent,
    type WebhookListResponsesCursorPage as WebhookListResponsesCursorPage,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookUpdateParams as WebhookUpdateParams,
    type WebhookListParams as WebhookListParams,
  };

  export {
    Events as Events,
    type EventListResponse as EventListResponse,
    type EventDeliveriesResponse as EventDeliveriesResponse,
    type EventReplayResponse as EventReplayResponse,
    type EventListResponsesCursorPage as EventListResponsesCursorPage,
    type EventListParams as EventListParams,
    type EventDeliveriesParams as EventDeliveriesParams,
    type EventReplayParams as EventReplayParams,
  };
}
