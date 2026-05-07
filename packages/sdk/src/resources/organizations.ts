import { Resource } from '@nuntly/sdk-core';
import type { NuntlyClient } from '@nuntly/sdk-core';
import type { RequestOptions, CursorPage, CursorPageParams } from '@nuntly/sdk-core';
import type { OrganizationResponse, OrganizationsResponseItem } from '../types/index.js';

import { OrganizationsUsage } from './organizations/usage.js';

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
   * @returns Promise<CursorPage<OrganizationsResponseItem>>
   */
  async list(query?: CursorPageParams, options?: RequestOptions): Promise<CursorPage<OrganizationsResponseItem>> {
    return this._http.list<OrganizationsResponseItem>('/organizations', query as unknown as Record<string, unknown>, options);
  }

  /**
   * Returns the organization's profile, plan, region, and account status.
   *
   * GET /organizations/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns Promise<OrganizationResponse>
   */
  async retrieve(id: string, options?: RequestOptions): Promise<OrganizationResponse> {
    const response = await this._http.get<{ data: OrganizationResponse }>(`/organizations/${id}`, undefined, options);
    return response.data;
  }

}
