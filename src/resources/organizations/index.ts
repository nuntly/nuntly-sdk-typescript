import { Resource } from '../../core/index.js';
import type { NuntlyClient } from '../../core/index.js';
import type { APIPromise, RequestOptions, CursorPage, CursorPageParams, PagePromise } from '../../core/index.js';
import type { OrganizationResponse, OrganizationsResponseItem } from '../types.js';

import { OrganizationsUsage } from './usage/index.js';

/**
 * Organizations resource.
 */
export class Organizations extends Resource {
  usage: OrganizationsUsage;

  constructor(client: NuntlyClient) {
    super(client);
    this.usage = new OrganizationsUsage(client);
  }

  /**
   * Returns all organizations the authenticated user belongs to.
   *
   * GET /organizations
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<OrganizationsResponseItem>, OrganizationsResponseItem>
   */
  list(query?: CursorPageParams, options?: RequestOptions): PagePromise<CursorPage<OrganizationsResponseItem>, OrganizationsResponseItem> {
    return this._http.list<OrganizationsResponseItem>({
      path: '/organizations',
      query: query as unknown as Record<string, unknown>,
      options,
    });
  }

  /**
   * Returns the organization's profile, plan, region, and account status.
   *
   * GET /organizations/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns APIPromise<OrganizationResponse>
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<OrganizationResponse> {
    return this._http.get<{ data: OrganizationResponse }>({
      path: '/organizations/{id}',
      pathParams: { id },
      options,
    }).map((r) => r.data);
  }

}
