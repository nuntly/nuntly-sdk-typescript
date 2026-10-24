import type {
  APIPromise,
  CursorPage,
  CursorPageParams,
  NuntlyClient,
  PagePromise,
  RequestOptions,
} from '../../core/index.js';
import { Resource } from '../../core/index.js';
import type {
  CreateNamespaceRequest,
  IdResponse,
  NamespaceDetail,
  NamespaceResponse,
  NamespacesQuery,
  NamespacesResponseItem,
  UpdateNamespaceRequest,
} from '../types.js';

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
   * Creates a namespace to group inboxes, with a display name and an optional external id that maps it to a customer or tenant in your own system.
   *
   * POST /namespaces
   * @param body - CreateNamespaceRequest
   * @param options - RequestOptions
   * @returns APIPromise<NamespaceResponse>
   */
  create(body: CreateNamespaceRequest, options?: RequestOptions): APIPromise<NamespaceResponse> {
    return this._http
      .post<{ data: NamespaceResponse }>({
        path: '/namespaces',
        body,
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Deletes a namespace by id. The request is rejected with a validation error while the namespace still has active inboxes, so delete them first.
   *
   * DELETE /namespaces/{namespaceId}
   * @param namespaceId - string
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  delete(namespaceId: string, options?: RequestOptions): APIPromise<IdResponse> {
    return this._http
      .delete<{ data: IdResponse }>({
        path: '/namespaces/{namespaceId}',
        pathParams: { namespaceId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Lists the namespaces of your organization, newest first, with cursor pagination. Each item includes the name and the optional external id.
   *
   * GET /namespaces
   * @param query - NamespacesQuery
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<NamespacesResponseItem>, NamespacesResponseItem>
   */
  list(
    query?: NamespacesQuery,
    options?: RequestOptions,
  ): PagePromise<CursorPage<NamespacesResponseItem>, NamespacesResponseItem> {
    return this._http.list<NamespacesResponseItem>({
      path: '/namespaces',
      query: query as unknown as Record<string, unknown>,
      options,
    });
  }

  /**
   * Retrieves a namespace by id with its name, its optional external id, and inbox counts, including how many of its inboxes are currently active.
   *
   * GET /namespaces/{namespaceId}
   * @param namespaceId - string
   * @param options - RequestOptions
   * @returns APIPromise<NamespaceDetail>
   */
  retrieve(namespaceId: string, options?: RequestOptions): APIPromise<NamespaceDetail> {
    return this._http
      .get<{ data: NamespaceDetail }>({
        path: '/namespaces/{namespaceId}',
        pathParams: { namespaceId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Updates the display name or external id of a namespace. Set the external id to null to clear it. Returns the id of the updated namespace.
   *
   * PATCH /namespaces/{namespaceId}
   * @param namespaceId - string
   * @param body - UpdateNamespaceRequest
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  update(namespaceId: string, body: UpdateNamespaceRequest, options?: RequestOptions): APIPromise<IdResponse> {
    return this._http
      .patch<{ data: IdResponse }>({
        path: '/namespaces/{namespaceId}',
        pathParams: { namespaceId },
        body,
        options,
      })
      .map((r) => r.data);
  }
}
