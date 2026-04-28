// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage your organization profile, team members, and account-level settings.
 */
export class Usage extends APIResource {
  /**
   * Returns current period usage metrics (daily and monthly) for sending and
   * receiving, against your plan limits.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<UsageRetrieveResponse> {
    return (
      this._client.get(path`/organizations/${id}/usage`, options) as APIPromise<{
        data: UsageRetrieveResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export interface UsageRetrieveResponse {
  transactional: UsageRetrieveResponse.Transactional;
}

export namespace UsageRetrieveResponse {
  export interface Transactional {
    limits: Transactional.Limits;

    /**
     * Receiving email usage breakdown.
     */
    receiving: Transactional.Receiving;

    /**
     * Sending email usage breakdown.
     */
    sending: Transactional.Sending;

    usage: Transactional.Usage;
  }

  export namespace Transactional {
    export interface Limits {
      /**
       * The daily email limit for the organization.
       */
      daily: number;

      /**
       * The monthly email limit for the organization.
       */
      monthly: number;
    }

    /**
     * Receiving email usage breakdown.
     */
    export interface Receiving {
      /**
       * Daily email count.
       */
      daily: number;

      /**
       * Monthly email count.
       */
      monthly: number;
    }

    /**
     * Sending email usage breakdown.
     */
    export interface Sending {
      /**
       * Daily email count.
       */
      daily: number;

      /**
       * Monthly email count.
       */
      monthly: number;
    }

    export interface Usage {
      /**
       * The daily total (sending + receiving) usage.
       */
      daily: number;

      /**
       * The monthly total (sending + receiving) usage.
       */
      monthly: number;
    }
  }
}

export declare namespace Usage {
  export { type UsageRetrieveResponse as UsageRetrieveResponse };
}
