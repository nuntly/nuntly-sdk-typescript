// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Usage extends APIResource {
  /**
   * Retrieve organization usage
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

    usage: Transactional.Usage;
  }

  export namespace Transactional {
    export interface Limits {
      /**
       * The daily email limit for the organization
       */
      daily: number;

      /**
       * The monthly email limit for the organization
       */
      monthly: number;
    }

    export interface Usage {
      /**
       * The daily email usage for the organization
       */
      daily: number;

      /**
       * The monthly email usage for the organization
       */
      monthly: number;
    }
  }
}

export declare namespace Usage {
  export { type UsageRetrieveResponse as UsageRetrieveResponse };
}
