import type {
  APIPromise,
  CursorPage,
  CursorPageParams,
  NuntlyClient,
  PagePromise,
  RequestOptions,
} from '../../core/index.js';
import { Resource } from '../../core/index.js';
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
   * Lists the organization that the API key belongs to, with its id, name, and status. The result is paginated with a cursor like other list endpoints.
   *
   * GET /organizations
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<OrganizationsResponseItem>, OrganizationsResponseItem>
   */
  list(
    query?: CursorPageParams,
    options?: RequestOptions,
  ): PagePromise<CursorPage<OrganizationsResponseItem>, OrganizationsResponseItem> {
    return this._http.list<OrganizationsResponseItem>({
      path: '/organizations',
      query,
      options,
    });
  }

  /**
   * Retrieves the organization that the API key belongs to by id, returning its name and its status (enabled or disabled).
   *
   * GET /organizations/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns APIPromise<OrganizationResponse>
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<OrganizationResponse> {
    return this._http
      .get<{ data: OrganizationResponse }>({
        path: '/organizations/{id}',
        pathParams: { id },
        options,
      })
      .map((r) => r.data);
  }
}
