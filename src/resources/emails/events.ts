// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Events extends APIResource {
  /**
   * Return the events related to this email id
   */
  list(id: string, options?: Core.RequestOptions): Core.APIPromise<EventListResponse> {
    return (
      this._client.get(`/emails/${id}/events`, options) as Core.APIPromise<{ data: EventListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

/**
 * The events email
 */
export type EventListResponse = Array<EventListResponse.EventListResponseItem>;

export namespace EventListResponse {
  export interface EventListResponseItem {
    /**
     * The email event id
     */
    id: string;

    /**
     * The id of the email
     */
    email_id: string;

    /**
     * Date at which the events occurs (ISO 8601 format)
     */
    event_at: string;

    /**
     * The kind of object returned
     */
    kind: 'event-email';

    /**
     * The id of the organization
     */
    org_id: string;

    /**
     * The type of the email event
     */
    type:
      | 'bounced'
      | 'clicked'
      | 'complaint_received'
      | 'delivered'
      | 'delivery_delayed'
      | 'opened'
      | 'rejected'
      | 'rendering_failed'
      | 'sent'
      | 'subscribed';

    /**
     * Detail of the event
     */
    details?: string;
  }
}

export declare namespace Events {
  export { type EventListResponse as EventListResponse };
}
