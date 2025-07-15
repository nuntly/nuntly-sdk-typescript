// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Subscriptions extends APIResource {
  /**
   * Return the organization subscriptions
   *
   * @example
   * ```ts
   * const subscriptions =
   *   await client.organizations.subscriptions.list('id');
   * ```
   */
  list(id: string, options?: RequestOptions): APIPromise<SubscriptionListResponse> {
    return (
      this._client.get(path`/organizations/${id}/subscriptions`, options) as APIPromise<{
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
     * The status of the subscription (plan or addon
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
     * The type of the subscription
     */
    type: 'plan' | 'addon';

    /**
     * The name of the addon
     */
    addon?: 'dedicated-ips';

    /**
     * The name of the plan
     */
    plan?: 'free' | 'starter' | 'scale' | 'enterprise';

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
        interval?: 'day' | 'month' | 'week' | 'year';

        /**
         * The number of intervals between subscription billings
         */
        interval_count?: number;
      }
    }

    export interface Quota {
      daily: Quota.Daily;

      monthly: Quota.Monthly;
    }

    export namespace Quota {
      export interface Daily {
        /**
         * The quota of the emails subscribed (if applicable)
         */
        transac_emails: number;
      }

      export interface Monthly {
        /**
         * The quota of the emails subscribed (if applicable)
         */
        transac_emails: number;
      }
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
        price: Phase.Price;
      }

      export namespace Phase {
        export interface Price {
          /**
           * ISO currency code
           */
          currency: string;

          recurring: Price.Recurring;

          /**
           * The type of the subscription
           */
          type: 'plan' | 'addon';

          /**
           * The unit amount in cents (or local equivalent) to be charged
           */
          unit_amount: number | null;

          /**
           * The name of the plan
           */
          plan?: 'free' | 'starter' | 'scale' | 'enterprise';

          quota?: Price.Quota;
        }

        export namespace Price {
          export interface Recurring {
            /**
             * The frequency at which a subscription is billed.
             */
            interval?: 'day' | 'month' | 'week' | 'year';

            /**
             * The number of intervals between subscription billings
             */
            interval_count?: number;
          }

          export interface Quota {
            daily: Quota.Daily;

            monthly: Quota.Monthly;
          }

          export namespace Quota {
            export interface Daily {
              /**
               * The quota of the emails subscribed (if applicable)
               */
              transac_emails: number;
            }

            export interface Monthly {
              /**
               * The quota of the emails subscribed (if applicable)
               */
              transac_emails: number;
            }
          }
        }
      }
    }
  }
}

export declare namespace Subscriptions {
  export { type SubscriptionListResponse as SubscriptionListResponse };
}
