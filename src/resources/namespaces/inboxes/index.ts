import type { APIPromise, CursorPage, CursorPageParams, PagePromise, RequestOptions } from '../../../core/index.js';
import { Resource } from '../../../core/index.js';
import type { InboxesResponseItem, NamespaceInboxesQuery } from '../../types.js';

/**
 * NamespacesInboxes resource.
 */
export class NamespacesInboxes extends Resource {
  /**
   * Lists the active inboxes assigned to a namespace, newest first, with cursor pagination. Returns the same inbox objects as the inbox list.
   *
   * GET /namespaces/{namespaceId}/inboxes
   * @param namespaceId - string
   * @param query - NamespaceInboxesQuery
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<InboxesResponseItem>, InboxesResponseItem>
   */
  list(
    namespaceId: string,
    query?: NamespaceInboxesQuery,
    options?: RequestOptions,
  ): PagePromise<CursorPage<InboxesResponseItem>, InboxesResponseItem> {
    return this._http.list<InboxesResponseItem>({
      path: '/namespaces/{namespaceId}/inboxes',
      pathParams: { namespaceId },
      query: query as unknown as Record<string, unknown>,
      options,
    });
  }
}
