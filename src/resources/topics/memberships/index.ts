import type { APIPromise, CursorPage, CursorPageParams, PagePromise, RequestOptions } from '../../../core/index.js';
import { Resource } from '../../../core/index.js';
import type { TopicMembershipsResponseItem } from '../../types.js';

/**
 * TopicsMemberships resource.
 */
export class TopicsMemberships extends Resource {
  /**
   * List a topic's explicit membership records only. A contact without one is subscribed by default.
   *
   * GET /topics/{topicId}/memberships
   * @param topicId - string
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<TopicMembershipsResponseItem>, TopicMembershipsResponseItem>
   */
  list(
    topicId: string,
    query?: CursorPageParams,
    options?: RequestOptions,
  ): PagePromise<CursorPage<TopicMembershipsResponseItem>, TopicMembershipsResponseItem> {
    return this._http.list<TopicMembershipsResponseItem>({
      path: '/topics/{topicId}/memberships',
      pathParams: { topicId },
      query,
      options,
    });
  }
}
