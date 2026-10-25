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
  CreateSegmentRequest,
  IdResponse,
  SegmentResponse,
  SegmentsResponseItem,
  UpdateSegmentRequest,
} from '../types.js';

import { SegmentsMembers } from './members/index.js';

/**
 * Segments resource.
 */
export class Segments extends Resource {
  members: SegmentsMembers;

  constructor(client: NuntlyClient) {
    super(client);
    this.members = new SegmentsMembers(client);
  }

  /**
   * Create an organization-level static segment.
   *
   * POST /segments
   * @param body - CreateSegmentRequest
   * @param options - RequestOptions
   * @returns APIPromise<SegmentResponse>
   */
  create(body: CreateSegmentRequest, options?: RequestOptions): APIPromise<SegmentResponse> {
    return this._http
      .post<{ data: SegmentResponse }>({
        path: '/segments',
        body,
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Delete a segment.
   *
   * DELETE /segments/{segmentId}
   * @param segmentId - string
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  delete(segmentId: string, options?: RequestOptions): APIPromise<IdResponse> {
    return this._http
      .delete<{ data: IdResponse }>({
        path: '/segments/{segmentId}',
        pathParams: { segmentId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * List the organization segments.
   *
   * GET /segments
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<SegmentsResponseItem>, SegmentsResponseItem>
   */
  list(
    query?: CursorPageParams,
    options?: RequestOptions,
  ): PagePromise<CursorPage<SegmentsResponseItem>, SegmentsResponseItem> {
    return this._http.list<SegmentsResponseItem>({
      path: '/segments',
      query,
      options,
    });
  }

  /**
   * Retrieve one segment.
   *
   * GET /segments/{segmentId}
   * @param segmentId - string
   * @param options - RequestOptions
   * @returns APIPromise<SegmentResponse>
   */
  retrieve(segmentId: string, options?: RequestOptions): APIPromise<SegmentResponse> {
    return this._http
      .get<{ data: SegmentResponse }>({
        path: '/segments/{segmentId}',
        pathParams: { segmentId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Rename a segment.
   *
   * PATCH /segments/{segmentId}
   * @param segmentId - string
   * @param body - UpdateSegmentRequest
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  update(segmentId: string, body: UpdateSegmentRequest, options?: RequestOptions): APIPromise<IdResponse> {
    return this._http
      .patch<{ data: IdResponse }>({
        path: '/segments/{segmentId}',
        pathParams: { segmentId },
        body,
        options,
      })
      .map((r) => r.data);
  }
}
