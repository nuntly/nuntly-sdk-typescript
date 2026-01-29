// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Stats extends APIResource {
  /**
   * Retrieve email statistics
   */
  list(options?: RequestOptions): APIPromise<StatListResponse> {
    return (this._client.get('/emails/stats', options) as APIPromise<{ data: StatListResponse }>)._thenUnwrap(
      (obj) => obj.data,
    );
  }
}

export interface StatListResponse {
  /**
   * The end date of the stats range
   */
  end: string;

  /**
   * The start date of the stats range
   */
  start: string;

  stats: Array<StatListResponse.Stat>;
}

export namespace StatListResponse {
  export interface Stat {
    /**
     * Number of emails bounced
     */
    bounced: number;

    /**
     * Number of emails canceled
     */
    canceled: number;

    /**
     * Number of emails clicked
     */
    clicked: number;

    /**
     * Number of complaint received
     */
    complaintReceived: number;

    /**
     * Number of emails delivered
     */
    delivered: number;

    /**
     * Number of emails delivered with delay
     */
    deliveredDelayed: number;

    /**
     * Number of emails failed
     */
    failed: number;

    /**
     * The date of the stats
     */
    occurredOn: string;

    /**
     * Number of emails opened
     */
    opened: number;

    /**
     * Number of emails processed
     */
    processed: number;

    /**
     * Number of emails queued
     */
    queued: number;

    /**
     * Number of emails rejected
     */
    rejected: number;

    /**
     * Number of emails with rendering failed
     */
    renderingFailed: number;

    /**
     * Number of emails scheduled
     */
    scheduled: number;

    /**
     * Number of emails sending
     */
    sending: number;

    /**
     * Number of emails sent
     */
    sent: number;
  }
}

export declare namespace Stats {
  export { type StatListResponse as StatListResponse };
}
