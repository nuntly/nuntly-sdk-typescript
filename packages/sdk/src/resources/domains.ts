import { Resource } from '@nuntly/sdk-core';
import type { RequestOptions, CursorPage, CursorPageParams } from '@nuntly/sdk-core';
import type { CreateDomainRequest, CreateDomainResponse, DeleteDomainResponse, DomainRecordsResponse, DomainsResponseItem, UpdateDomainRequest, UpdateDomainResponse } from '../types/index.js';


/**
 * Domains resource.
 */
export class Domains extends Resource {

  /**
   * Returns all domains with their verification and capability status.
   *
   * GET /domains
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns Promise<CursorPage<DomainsResponseItem>>
   */
  async list(query?: CursorPageParams, options?: RequestOptions): Promise<CursorPage<DomainsResponseItem>> {
    return this._http.list<DomainsResponseItem>('/domains', query as unknown as Record<string, unknown>, options);
  }

  /**
   * Returns a domain with its DNS record configuration and current verification status for each record.
   *
   * GET /domains/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns Promise<DomainRecordsResponse>
   */
  async retrieve(id: string, options?: RequestOptions): Promise<DomainRecordsResponse> {
    const response = await this._http.get<{ data: DomainRecordsResponse }>(`/domains/${id}`, undefined, options);
    return response.data;
  }

  /**
   * Permanently deletes a domain along with its inboxes, received messages, attachments, and sending configuration. This action is irreversible.
   *
   * DELETE /domains/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns Promise<DeleteDomainResponse>
   */
  async delete(id: string, options?: RequestOptions): Promise<DeleteDomainResponse> {
    const response = await this._http.delete<{ data: DeleteDomainResponse }>(`/domains/${id}`, options);
    return response.data;
  }

  /**
   * Add a domain to start configuring DNS records for sending or receiving emails.
   *
   * POST /domains
   * @param body - CreateDomainRequest
   * @param options - RequestOptions
   * @returns Promise<CreateDomainResponse>
   */
  async create(body: CreateDomainRequest, options?: RequestOptions): Promise<CreateDomainResponse> {
    const response = await this._http.post<{ data: CreateDomainResponse }>('/domains', body, options);
    return response.data;
  }

  /**
   * Toggle sending, receiving, open tracking, or click tracking capabilities for a domain.
   *
   * PATCH /domains/{id}
   * @param id - string
   * @param body - UpdateDomainRequest
   * @param options - RequestOptions
   * @returns Promise<UpdateDomainResponse>
   */
  async update(id: string, body: UpdateDomainRequest, options?: RequestOptions): Promise<UpdateDomainResponse> {
    const response = await this._http.patch<{ data: UpdateDomainResponse }>(`/domains/${id}`, body, options);
    return response.data;
  }

}
