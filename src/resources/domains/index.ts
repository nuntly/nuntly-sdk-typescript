import type { APIPromise, CursorPage, CursorPageParams, PagePromise, RequestOptions } from '../../core/index.js';
import { Resource } from '../../core/index.js';
import type {
  CreateDomainRequest,
  DeleteDomainResponse,
  DomainRecordsResponse,
  DomainsResponseItem,
  UpdateDomainRequest,
  UpdateDomainResponse,
} from '../types.js';

/**
 * Domains resource.
 */
export class Domains extends Resource {
  /**
   * Adds a domain for sending, receiving, or both, and returns the DNS records to publish. Verification starts automatically and the plan domain limit applies.
   *
   * POST /domains
   * @param body - CreateDomainRequest
   * @param options - RequestOptions
   * @returns APIPromise<DomainRecordsResponse>
   */
  create(body: CreateDomainRequest, options?: RequestOptions): APIPromise<DomainRecordsResponse> {
    return this._http
      .post<{ data: DomainRecordsResponse }>({
        path: '/domains',
        body,
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Permanently deletes a domain along with its inboxes, received messages, attachments, and sending configuration. This action is irreversible.
   *
   * DELETE /domains/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns APIPromise<DeleteDomainResponse>
   */
  delete(id: string, options?: RequestOptions): APIPromise<DeleteDomainResponse> {
    return this._http
      .delete<{ data: DeleteDomainResponse }>({
        path: '/domains/{id}',
        pathParams: { id },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Lists the domains of your organization, newest first, with cursor pagination. Each domain shows its verification status and sending and receiving status.
   *
   * GET /domains
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<DomainsResponseItem>, DomainsResponseItem>
   */
  list(
    query?: CursorPageParams,
    options?: RequestOptions,
  ): PagePromise<CursorPage<DomainsResponseItem>, DomainsResponseItem> {
    return this._http.list<DomainsResponseItem>({
      path: '/domains',
      query,
      options,
    });
  }

  /**
   * Retrieves a domain with its capabilities, tracking settings, statuses, and the DNS records to publish, each with its own verification status.
   *
   * GET /domains/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns APIPromise<DomainRecordsResponse>
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<DomainRecordsResponse> {
    return this._http
      .get<{ data: DomainRecordsResponse }>({
        path: '/domains/{id}',
        pathParams: { id },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Turns sending, receiving, open tracking, or click tracking on or off for a domain. Enabling a capability adds its DNS records and restarts verification.
   *
   * PATCH /domains/{id}
   * @param id - string
   * @param body - UpdateDomainRequest
   * @param options - RequestOptions
   * @returns APIPromise<UpdateDomainResponse>
   */
  update(id: string, body: UpdateDomainRequest, options?: RequestOptions): APIPromise<UpdateDomainResponse> {
    return this._http
      .patch<{ data: UpdateDomainResponse }>({
        path: '/domains/{id}',
        pathParams: { id },
        body,
        options,
      })
      .map((r) => r.data);
  }
}
