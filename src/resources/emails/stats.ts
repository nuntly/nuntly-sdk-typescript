// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Stats extends APIResource {
  /**
   * Return the emails stats
   *
   * @example
   * ```ts
   * const stats = await client.emails.stats.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<StatListResponse> {
    return (this._client.get('/emails/stats', options) as APIPromise<{ data: StatListResponse }>)._thenUnwrap(
      (obj) => obj.data,
    );
  }
}

/**
 * The emails stats
 */
export interface StatListResponse {
  end: string;

  start: string;

  stats: Array<StatListResponse.Stat>;
}

export namespace StatListResponse {
  export interface Stat {
    occurred_on: string;

    bounced?: number;

    clicked?: number;

    complaint_received?: number;

    delivered?: number;

    delivery_delayed?: number;

    opened?: number;

    rejected?: number;

    rendering_failed?: number;

    sent?: number;

    subscribed?: number;
  }
}

export declare namespace Stats {
  export { type StatListResponse as StatListResponse };
}
