// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as UsageAPI from './usage';
import { Usage, UsageRetrieveResponse } from './usage';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Organizations extends APIResource {
  usage: UsageAPI.Usage = new UsageAPI.Usage(this._client);

  /**
   * Retrieve organization
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<OrganizationRetrieveResponse> {
    return (
      this._client.get(path`/organizations/${id}`, options) as APIPromise<{
        data: OrganizationRetrieveResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Retrieve organizations
   */
  list(
    query: OrganizationListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<OrganizationListResponsesCursorPage, OrganizationListResponse> {
    return this._client.getAPIList('/organizations', CursorPage<OrganizationListResponse>, {
      query,
      ...options,
    });
  }
}

export type OrganizationListResponsesCursorPage = CursorPage<OrganizationListResponse>;

export interface OrganizationRetrieveResponse {
  /**
   * The id of the organization
   */
  id: string;

  /**
   * The name of the organization
   */
  name: string;

  /**
   * The status of the organization
   */
  status: 'enabled' | 'disabled';
}

export interface OrganizationListResponse {
  /**
   * The id of the organization
   */
  id: string;

  /**
   * The name of the organization
   */
  name: string;

  /**
   * The status of the organization
   */
  status: 'enabled' | 'disabled';
}

export interface OrganizationListParams extends CursorPageParams {}

Organizations.Usage = Usage;

export declare namespace Organizations {
  export {
    type OrganizationRetrieveResponse as OrganizationRetrieveResponse,
    type OrganizationListResponse as OrganizationListResponse,
    type OrganizationListResponsesCursorPage as OrganizationListResponsesCursorPage,
    type OrganizationListParams as OrganizationListParams,
  };

  export { Usage as Usage, type UsageRetrieveResponse as UsageRetrieveResponse };
}
