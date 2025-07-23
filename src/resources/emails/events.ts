// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Events extends APIResource {
  /**
   * Return the events related to this email id
   *
   * @example
   * ```ts
   * const events = await client.emails.events.list(
   *   'em_qiPSkLrTmXvDohbxCcYt3pFEMGgnjHD6kbDL8d4uGKvNGboT',
   * );
   * ```
   */
  list(
    id: string,
    query: EventListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EventListResponse> {
    return (
      this._client.get(path`/emails/${id}/events`, { query, ...options }) as APIPromise<{
        data: EventListResponse;
      }>
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
     * Detail of the event
     */
    details: { [key: string]: unknown };

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
      | 'email.delivery_delayed'
      | 'email.failed';
  }
}

export interface EventListParams {
  /**
   * The cursor to use for pagination
   */
  cursor?: string;

  /**
   * The number of emails to return
   */
  limit?: number;
}

export declare namespace Events {
  export { type EventListResponse as EventListResponse, type EventListParams as EventListParams };
}
