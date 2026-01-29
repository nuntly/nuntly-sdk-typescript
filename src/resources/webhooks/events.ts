// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SharedAPI from '../shared';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Events extends APIResource {
  /**
   * List webhooks events
   */
  list(
    query: EventListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<EventListResponsesCursorPage, EventListResponse> {
    return this._client.getAPIList('/webhooks/events', CursorPage<EventListResponse>, { query, ...options });
  }

  /**
   * List webhook event deliveries
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
   * Replay a webhook event
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

  data: { [key: string]: unknown };

  /**
   * An event
   */
  event: SharedAPI.EventType;

  /**
   * The id of the organization
   */
  orgId: string;

  /**
   * Status of the webhook delivery attempt
   */
  status: 'success' | 'pending' | 'failed';

  /**
   * The id of the webhook
   */
  webhookId: string;

  /**
   * The timestamp when the event was successfully delivered to the endpoint
   */
  successfulAt?: string;
}

/**
 * List of webhook event deliveries
 */
export type EventDeliveriesResponse = Array<EventDeliveriesResponse.EventDeliveriesResponseItem>;

export namespace EventDeliveriesResponse {
  export interface EventDeliveriesResponseItem {
    id: string;

    code: string;

    deliveredAt: string;

    response: { [key: string]: string };

    status: 'pending' | 'success' | 'failed';
  }
}

/**
 * Response for webhook event replay
 */
export type EventReplayResponse = unknown;

export interface EventListParams extends CursorPageParams {}

export interface EventDeliveriesParams {
  /**
   * The id of the webhook
   */
  id: string;
}

export interface EventReplayParams {
  /**
   * The id of the webhook
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
