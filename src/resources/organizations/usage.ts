// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Usage extends APIResource {
  /**
   * Return the organization usage
   *
   * @example
   * ```ts
   * const usage = await client.organizations.usage.retrieve(
   *   'id',
   * );
   * ```
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
  daily: UsageRetrieveResponse.Daily;

  monthly: UsageRetrieveResponse.Monthly;
}

export namespace UsageRetrieveResponse {
  export interface Daily {
    consumed: Daily.Consumed;

    period: string;

    quota: Daily.Quota;
  }

  export namespace Daily {
    export interface Consumed {
      transac_emails: number;
    }

    export interface Quota {
      transac_emails: number;
    }
  }

  export interface Monthly {
    consumed: Monthly.Consumed;

    period: string;

    quota: Monthly.Quota;
  }

  export namespace Monthly {
    export interface Consumed {
      transac_emails: number;
    }

    export interface Quota {
      transac_emails: number;
    }
  }
}

export declare namespace Usage {
  export { type UsageRetrieveResponse as UsageRetrieveResponse };
}
