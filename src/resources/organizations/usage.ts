import { Resource } from '../../core/index.js';
import type { RequestOptions } from '../../core/index.js';
import type { OrganizationUsageResponse } from '../../types/index.js';


/**
 * OrganizationsUsage resource.
 */
export class OrganizationsUsage extends Resource {

  /**
   * Returns current period usage metrics (daily and monthly) for sending and receiving, against your plan limits.
   *
   * GET /organizations/{id}/usage
   * @param id - string
   * @param options - RequestOptions
   * @returns Promise<OrganizationUsageResponse>
   */
  async retrieve(id: string, options?: RequestOptions): Promise<OrganizationUsageResponse> {
    const response = await this._http.get<{ data: OrganizationUsageResponse }>(`/organizations/${id}/usage`, undefined, options);
    return response.data;
  }

}
