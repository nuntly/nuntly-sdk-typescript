import { Resource } from '../../core/index.js';
import type { NuntlyClient } from '../../core/index.js';
import type { APIPromise, RequestOptions, CursorPage, CursorPageParams } from '../../core/index.js';
import type { CreateNamespaceRequest, IdResponse, NamespaceDetail, NamespaceResponse, NamespacesQuery, NamespacesResponseItem, UpdateNamespaceRequest } from '../types.js';

import { NamespacesInboxes } from './inboxes/index.js';

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
   * @returns APIPromise<NamespaceResponse>
   */
  create(body: CreateNamespaceRequest, options?: RequestOptions): APIPromise<NamespaceResponse> {
    return this._http.post<{ data: NamespaceResponse }>({
      path: '/namespaces',
      body,
      options,
    }).map((r) => r.data);
  }

  /**
   * Soft-delete a namespace. Rejects if it has active inboxes.
   *
   * DELETE /namespaces/{namespaceId}
   * @param namespaceId - string
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  delete(namespaceId: string, options?: RequestOptions): APIPromise<IdResponse> {
    return this._http.delete<{ data: IdResponse }>({
      path: '/namespaces/{namespaceId}',
      pathParams: { namespaceId },
      options,
    }).map((r) => r.data);
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
    return this._http.list<NamespacesResponseItem>({
      path: '/namespaces',
      query: query as unknown as Record<string, unknown>,
      options,
    });
  }

  /**
   * Retrieve a namespace with inbox stats.
   *
   * GET /namespaces/{namespaceId}
   * @param namespaceId - string
   * @param options - RequestOptions
   * @returns APIPromise<NamespaceDetail>
   */
  retrieve(namespaceId: string, options?: RequestOptions): APIPromise<NamespaceDetail> {
    return this._http.get<{ data: NamespaceDetail }>({
      path: '/namespaces/{namespaceId}',
      pathParams: { namespaceId },
      options,
    }).map((r) => r.data);
  }

  /**
   * Update a namespace.
   *
   * PATCH /namespaces/{namespaceId}
   * @param namespaceId - string
   * @param body - UpdateNamespaceRequest
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  update(namespaceId: string, body: UpdateNamespaceRequest, options?: RequestOptions): APIPromise<IdResponse> {
    return this._http.patch<{ data: IdResponse }>({
      path: '/namespaces/{namespaceId}',
      pathParams: { namespaceId },
      body,
      options,
    }).map((r) => r.data);
  }

}
