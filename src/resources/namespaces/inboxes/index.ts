import { Resource } from '../../../core/index.js';
import type { APIPromise, RequestOptions, CursorPage, CursorPageParams } from '../../../core/index.js';
import type { InboxesResponseItem, NamespaceInboxesQuery } from '../../types.js';


/**
 * NamespacesInboxes resource.
 */
export class NamespacesInboxes extends Resource {

  /**
   * List inboxes in a namespace.
   *
   * GET /namespaces/{namespaceId}/inboxes
   * @param namespaceId - string
   * @param query - NamespaceInboxesQuery
   * @param options - RequestOptions
   * @returns Promise<CursorPage<InboxesResponseItem>>
   */
  async list(namespaceId: string, query?: NamespaceInboxesQuery, options?: RequestOptions): Promise<CursorPage<InboxesResponseItem>> {
    return this._http.list<InboxesResponseItem>({
      path: '/namespaces/{namespaceId}/inboxes',
      pathParams: { namespaceId },
      query: query as unknown as Record<string, unknown>,
      options,
    });
  }

}
