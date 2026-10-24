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
  CreateTopicRequest,
  IdResponse,
  TopicResponse,
  TopicsResponseItem,
  UpdateTopicRequest,
} from '../types.js';

import { TopicsMemberships } from './memberships/index.js';

/**
 * Topics resource.
 */
export class Topics extends Resource {
  memberships: TopicsMemberships;

  constructor(client: NuntlyClient) {
    super(client);
    this.memberships = new TopicsMemberships(client);
  }

  /**
   * Create a topic.
   *
   * POST /topics
   * @param body - CreateTopicRequest
   * @param options - RequestOptions
   * @returns APIPromise<TopicResponse>
   */
  create(body: CreateTopicRequest, options?: RequestOptions): APIPromise<TopicResponse> {
    return this._http
      .post<{ data: TopicResponse }>({
        path: '/topics',
        body,
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Delete a topic.
   *
   * DELETE /topics/{topicId}
   * @param topicId - string
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  delete(topicId: string, options?: RequestOptions): APIPromise<IdResponse> {
    return this._http
      .delete<{ data: IdResponse }>({
        path: '/topics/{topicId}',
        pathParams: { topicId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * List the organization topics.
   *
   * GET /topics
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<TopicsResponseItem>, TopicsResponseItem>
   */
  list(
    query?: CursorPageParams,
    options?: RequestOptions,
  ): PagePromise<CursorPage<TopicsResponseItem>, TopicsResponseItem> {
    return this._http.list<TopicsResponseItem>({
      path: '/topics',
      query: query as unknown as Record<string, unknown>,
      options,
    });
  }

  /**
   * Retrieve one topic.
   *
   * GET /topics/{topicId}
   * @param topicId - string
   * @param options - RequestOptions
   * @returns APIPromise<TopicResponse>
   */
  retrieve(topicId: string, options?: RequestOptions): APIPromise<TopicResponse> {
    return this._http
      .get<{ data: TopicResponse }>({
        path: '/topics/{topicId}',
        pathParams: { topicId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Rename a topic.
   *
   * PATCH /topics/{topicId}
   * @param topicId - string
   * @param body - UpdateTopicRequest
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  update(topicId: string, body: UpdateTopicRequest, options?: RequestOptions): APIPromise<IdResponse> {
    return this._http
      .patch<{ data: IdResponse }>({
        path: '/topics/{topicId}',
        pathParams: { topicId },
        body,
        options,
      })
      .map((r) => r.data);
  }
}
