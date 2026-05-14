import { Resource } from '../../core/index.js';
import type { APIPromise, RequestOptions, CursorPage, CursorPageParams } from '../../core/index.js';
import type { CreateDomainRequest, DeleteDomainResponse, DomainRecordsResponse, DomainsResponseItem, UpdateDomainRequest, UpdateDomainResponse } from '../types.js';


/**
 * Domains resource.
 */
export class Domains extends Resource {

  /**
   * Add a domain to start configuring DNS records for sending or receiving emails.
   *
   * POST /domains
   * @param body - CreateDomainRequest
   * @param options - RequestOptions
   * @returns APIPromise<DomainRecordsResponse>
   */
  create(body: CreateDomainRequest, options?: RequestOptions): APIPromise<DomainRecordsResponse> {
    return this._http.post<{ data: DomainRecordsResponse }>({
      path: '/domains',
      body,
      options,
    }).map((r) => r.data);
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
    return this._http.delete<{ data: DeleteDomainResponse }>({
      path: '/domains/{id}',
      pathParams: { id },
      options,
    }).map((r) => r.data);
  }

  /**
   * Returns all domains with their verification and capability status.
   *
   * GET /domains
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns Promise<CursorPage<DomainsResponseItem>>
   */
  async list(query?: CursorPageParams, options?: RequestOptions): Promise<CursorPage<DomainsResponseItem>> {
    return this._http.list<DomainsResponseItem>({
      path: '/domains',
      query: query as unknown as Record<string, unknown>,
      options,
    });
  }

  /**
   * Returns a domain with its DNS record configuration and current verification status for each record.
   *
   * GET /domains/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns APIPromise<DomainRecordsResponse>
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<DomainRecordsResponse> {
    return this._http.get<{ data: DomainRecordsResponse }>({
      path: '/domains/{id}',
      pathParams: { id },
      options,
    }).map((r) => r.data);
  }

  /**
   * Toggle sending, receiving, open tracking, or click tracking capabilities for a domain.
   *
   * PATCH /domains/{id}
   * @param id - string
   * @param body - UpdateDomainRequest
   * @param options - RequestOptions
   * @returns APIPromise<UpdateDomainResponse>
   */
  update(id: string, body: UpdateDomainRequest, options?: RequestOptions): APIPromise<UpdateDomainResponse> {
    return this._http.patch<{ data: UpdateDomainResponse }>({
      path: '/domains/{id}',
      pathParams: { id },
      body,
      options,
    }).map((r) => r.data);
  }

}
