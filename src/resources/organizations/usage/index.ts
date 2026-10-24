import type { APIPromise, RequestOptions } from '../../../core/index.js';
import { Resource } from '../../../core/index.js';
import type { OrganizationUsageResponse } from '../../types.js';

/**
 * OrganizationsUsage resource.
 */
export class OrganizationsUsage extends Resource {
  /**
   * Returns the daily and monthly email usage of the organization, with each limit, its reset time, and a breakdown by channel.
   *
   * GET /organizations/{id}/usage
   * @param id - string
   * @param options - RequestOptions
   * @returns APIPromise<OrganizationUsageResponse>
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<OrganizationUsageResponse> {
    return this._http
      .get<{ data: OrganizationUsageResponse }>({
        path: '/organizations/{id}/usage',
        pathParams: { id },
        options,
      })
      .map((r) => r.data);
  }
}
