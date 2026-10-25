import type { APIPromise, CursorPage, CursorPageParams, PagePromise, RequestOptions } from '../../../core/index.js';
import { Resource } from '../../../core/index.js';
import type { SegmentMembersResponseItem } from '../../types.js';

/**
 * SegmentsMembers resource.
 */
export class SegmentsMembers extends Resource {
  /**
   * List the members of a segment.
   *
   * GET /segments/{segmentId}/members
   * @param segmentId - string
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<SegmentMembersResponseItem>, SegmentMembersResponseItem>
   */
  list(
    segmentId: string,
    query?: CursorPageParams,
    options?: RequestOptions,
  ): PagePromise<CursorPage<SegmentMembersResponseItem>, SegmentMembersResponseItem> {
    return this._http.list<SegmentMembersResponseItem>({
      path: '/segments/{segmentId}/members',
      pathParams: { segmentId },
      query,
      options,
    });
  }
}
