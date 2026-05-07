import { Resource } from '../core/index.js';
import type { NuntlyClient } from '../core/index.js';
import type { RequestOptions, CursorPage, CursorPageParams } from '../core/index.js';
import type { CreateNamespaceRequest, IdResponse, NamespaceDetail, NamespaceResponse, NamespacesQuery, NamespacesResponseItem, UpdateNamespaceRequest } from '../types/index.js';

import { NamespacesInboxes } from './namespaces/inboxes.js';

/**
 * Namespaces resource.
 */
export class Namespaces extends Resource {
  inboxes: NamespacesInboxes;

  constructor(client: NuntlyClient) {
    super(client);
    this.inboxes = new NamespacesInboxes(client);
  }

  /**
   * Create a new namespace.
   *
   * POST /namespaces
   * @param body - CreateNamespaceRequest
   * @param options - RequestOptions
   * @returns Promise<NamespaceResponse>
   */
  async create(body: CreateNamespaceRequest, options?: RequestOptions): Promise<NamespaceResponse> {
    const response = await this._http.post<{ data: NamespaceResponse }>('/namespaces', body, options);
    return response.data;
  }

  /**
   * List all namespaces.
   *
   * GET /namespaces
   * @param query - NamespacesQuery
   * @param options - RequestOptions
   * @returns Promise<CursorPage<NamespacesResponseItem>>
   */
  async list(query?: NamespacesQuery, options?: RequestOptions): Promise<CursorPage<NamespacesResponseItem>> {
    return this._http.list<NamespacesResponseItem>('/namespaces', query as unknown as Record<string, unknown>, options);
  }

  /**
   * Retrieve a namespace with inbox stats.
   *
   * GET /namespaces/{namespaceId}
   * @param namespaceId - string
   * @param options - RequestOptions
   * @returns Promise<NamespaceDetail>
   */
  async retrieve(namespaceId: string, options?: RequestOptions): Promise<NamespaceDetail> {
    const response = await this._http.get<{ data: NamespaceDetail }>(`/namespaces/${namespaceId}`, undefined, options);
    return response.data;
  }

  /**
   * Update a namespace.
   *
   * PATCH /namespaces/{namespaceId}
   * @param namespaceId - string
   * @param body - UpdateNamespaceRequest
   * @param options - RequestOptions
   * @returns Promise<IdResponse>
   */
  async update(namespaceId: string, body: UpdateNamespaceRequest, options?: RequestOptions): Promise<IdResponse> {
    const response = await this._http.patch<{ data: IdResponse }>(`/namespaces/${namespaceId}`, body, options);
    return response.data;
  }

  /**
   * Soft-delete a namespace. Rejects if it has active inboxes.
   *
   * DELETE /namespaces/{namespaceId}
   * @param namespaceId - string
   * @param options - RequestOptions
   * @returns Promise<IdResponse>
   */
  async delete(namespaceId: string, options?: RequestOptions): Promise<IdResponse> {
    const response = await this._http.delete<{ data: IdResponse }>(`/namespaces/${namespaceId}`, options);
    return response.data;
  }

}
