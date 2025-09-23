// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SharedAPI from '../shared';
import * as WebhooksAPI from './webhooks';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Events extends APIResource {
  /**
   * Return the last events sent by webhooks
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const eventListResponse of client.webhooks.events.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: EventListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<EventListResponsesCursorPage, EventListResponse> {
    return this._client.getAPIList('/webhooks/events', CursorPage<EventListResponse>, { query, ...options });
  }

  /**
   * Return the delivery attempts for the given webhook event ID
   *
   * @example
   * ```ts
   * const response = await client.webhooks.events.deliveries(
   *   'event_id',
   *   { id: 'id' },
   * );
   * ```
   */
  deliveries(
    eventID: string,
    params: EventDeliveriesParams,
    options?: RequestOptions,
  ): APIPromise<EventDeliveriesResponse> {
    const { id } = params;
    return (
      this._client.get(path`/webhooks/${id}/events/${eventID}/deliveries`, options) as APIPromise<{
        data: EventDeliveriesResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Replay the webhook event
   *
   * @example
   * ```ts
   * const response = await client.webhooks.events.replay(
   *   'event_id',
   *   { id: 'wh_YNtYn86oYZmP1ZHbnUBvXXFt' },
   * );
   * ```
   */
  replay(
    eventID: string,
    params: EventReplayParams,
    options?: RequestOptions,
  ): APIPromise<EventReplayResponse> {
    const { id } = params;
    return (
      this._client.post(path`/webhooks/${id}/events/${eventID}/replay`, options) as APIPromise<{
        data: EventReplayResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export type EventListResponsesCursorPage = CursorPage<EventListResponse>;

export interface EventListResponse {
  /**
   * The id of the webhook event
   */
  id: string;

  /**
   * The event payload
   */
  data: WebhooksAPI.Event;

  /**
   * Type of the event
   */
  event: SharedAPI.EventType;

  /**
   * The id of the organization
   */
  org_id: string;

  /**
   * The timestamp when the event was received by the webhook system
   */
  received_at: string;

  /**
   * Status of the webhook delivery attempt
   */
  status: 'success' | 'pending' | 'failed';

  /**
   * The id of the webhook
   */
  webhook_id: string;
}

export type EventDeliveriesResponse = Array<EventDeliveriesResponse.EventDeliveriesResponseItem>;

export namespace EventDeliveriesResponse {
  export interface EventDeliveriesResponseItem {
    id: string;

    code: string;

    delivered_at: string;

    response: { [key: string]: string } | null;

    status: 'pending' | 'success' | 'failed';
  }
}

export type EventReplayResponse = unknown;

export interface EventListParams extends CursorPageParams {}

export interface EventDeliveriesParams {
  /**
   * The webhook id
   */
  id: string;
}

export interface EventReplayParams {
  /**
   * The webhook id
   */
  id: string;
}

export declare namespace Events {
  export {
    type EventListResponse as EventListResponse,
    type EventDeliveriesResponse as EventDeliveriesResponse,
    type EventReplayResponse as EventReplayResponse,
    type EventListResponsesCursorPage as EventListResponsesCursorPage,
    type EventListParams as EventListParams,
    type EventDeliveriesParams as EventDeliveriesParams,
    type EventReplayParams as EventReplayParams,
  };
}
