// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SharedAPI from '../shared';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Events extends APIResource {
  /**
   * Retrieve email events by email id
   */
  list(id: string, options?: RequestOptions): APIPromise<EventListResponse> {
    return (
      this._client.get(path`/emails/${id}/events`, options) as APIPromise<{ data: EventListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export type EventListResponse = Array<EventListResponse.EventListResponseItem>;

export namespace EventListResponse {
  /**
   * The event
   */
  export interface EventListResponseItem {
    id: string;

    /**
     * Date at which the object was created (ISO 8601 format)
     */
    createdAt: string;

    /**
     * The id of the email
     */
    emailId: string;

    /**
     * An event
     */
    eventType: SharedAPI.EventType;

    /**
     * The id of the organization
     */
    orgId: string;

    payload: unknown;

    /**
     * The date at which the event occurred
     */
    occurredAt?: string;
  }
}

export declare namespace Events {
  export { type EventListResponse as EventListResponse };
}
