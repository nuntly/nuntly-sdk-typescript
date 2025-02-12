// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Subscriptions extends APIResource {
  /**
   * Return the organization subscriptions
   */
  list(id: string, options?: Core.RequestOptions): Core.APIPromise<SubscriptionListResponse> {
    return (
      this._client.get(`/organizations/${id}/subscriptions`, options) as Core.APIPromise<{
        data: SubscriptionListResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export type SubscriptionListResponse = Array<SubscriptionListResponse.SubscriptionListResponseItem>;

export namespace SubscriptionListResponse {
  export interface SubscriptionListResponseItem {
    /**
     * If the subscription has been canceled, the date of that cancellation
     */
    cancel_at: string | null;

    /**
     * Whether this subscription will or did cancel at the end of the current billing
     * period
     */
    cancel_at_period_end: boolean;

    /**
     * End of the current period that the subscription has been invoiced for
     */
    current_period_end: string;

    /**
     * Start of the current period that the subscription has been invoiced for
     */
    current_period_start: string;

    /**
     * The id of the organization
     */
    org_id: string;

    price: SubscriptionListResponseItem.Price;

    /**
     * The type of the subscription (plan or addon
     */
    status:
      | 'active'
      | 'canceled'
      | 'incomplete'
      | 'incomplete_expired'
      | 'past_due'
      | 'paused'
      | 'trialing'
      | 'unpaid';

    /**
     * The status of the subscription
     */
    type: 'plan' | 'addon';

    /**
     * The name of the addon
     */
    addon?: 'dedicated-ip';

    /**
     * The name of the plan
     */
    product?: 'free' | 'pro' | 'enterprise';

    quota?: SubscriptionListResponseItem.Quota;

    schedule?: SubscriptionListResponseItem.Schedule;
  }

  export namespace SubscriptionListResponseItem {
    export interface Price {
      /**
       * ISO currency code
       */
      currency: string;

      recurring: Price.Recurring;

      /**
       * The unit amount in cents (or local equivalent) to be charged
       */
      unit_amount: number | null;
    }

    export namespace Price {
      export interface Recurring {
        /**
         * The frequency at which a subscription is billed.
         */
        interval?: string;

        /**
         * The number of intervals between subscription billings
         */
        interval_count?: number;
      }
    }

    export interface Quota {
      /**
       * The quota of the emails subscribed (if applicable)
       */
      emails?: number;
    }

    export interface Schedule {
      /**
       * The date of the creation of the schedule
       */
      created: string;

      phases: Array<Schedule.Phase>;
    }

    export namespace Schedule {
      export interface Phase {
        /**
         * ISO currency code
         */
        currency: string;

        recurring: Phase.Recurring;

        /**
         * The unit amount in cents (or local equivalent) to be charged
         */
        unit_amount: number | null;
      }

      export namespace Phase {
        export interface Recurring {
          /**
           * The frequency at which a subscription is billed.
           */
          interval?: string;

          /**
           * The number of intervals between subscription billings
           */
          interval_count?: number;
        }
      }
    }
  }
}

export declare namespace Subscriptions {
  export { type SubscriptionListResponse as SubscriptionListResponse };
}
