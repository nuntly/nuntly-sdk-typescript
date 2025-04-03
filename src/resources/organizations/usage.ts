// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Usage extends APIResource {
  /**
   * Return the organization usage
   */
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<UsageRetrieveResponse> {
    return (
      this._client.get(`/organizations/${id}/usage`, options) as Core.APIPromise<{
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
