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
  period_start: string;

  quota: UsageRetrieveResponse.Quota;

  usage: UsageRetrieveResponse.Usage;
}

export namespace UsageRetrieveResponse {
  export interface Quota {
    emails: number;
  }

  export interface Usage {
    emails: number;
  }
}

export declare namespace Usage {
  export { type UsageRetrieveResponse as UsageRetrieveResponse };
}
