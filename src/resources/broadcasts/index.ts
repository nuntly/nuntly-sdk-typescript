import type {
  APIPromise,
  CursorPage,
  CursorPageParams,
  IdempotentRequestOptions,
  NuntlyClient,
  PagePromise,
  RequestOptions,
} from '../../core/index.js';
import { Resource } from '../../core/index.js';
import { withIdempotencyKey } from '../../lib/idempotency.js';
import type {
  BroadcastResponse,
  BroadcastsResponseItem,
  CreateBroadcastRequest,
  IdResponse,
  SendBroadcastRequest,
  SendBroadcastResponse,
  UpdateBroadcastRequest,
} from '../types.js';

import { BroadcastsRecipients } from './recipients/index.js';

/**
 * Broadcasts resource.
 */
export class Broadcasts extends Resource {
  recipients: BroadcastsRecipients;

  constructor(client: NuntlyClient) {
    super(client);
    this.recipients = new BroadcastsRecipients(client);
  }

  /**
   * Create a broadcast for your contacts.
   *
   * POST /broadcasts
   * @param body - CreateBroadcastRequest
   * @param options - IdempotentRequestOptions
   * @returns APIPromise<BroadcastResponse>
   */
  create(body: CreateBroadcastRequest, options?: IdempotentRequestOptions): APIPromise<BroadcastResponse> {
    return this._http
      .post<{ data: BroadcastResponse }>({
        path: '/broadcasts',
        body,
        options: withIdempotencyKey(options),
      })
      .map((r) => r.data);
  }

  /**
   * Delete a draft, scheduled, or failed broadcast.
   *
   * DELETE /broadcasts/{broadcastId}
   * @param broadcastId - string
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  delete(broadcastId: string, options?: RequestOptions): APIPromise<IdResponse> {
    return this._http
      .delete<{ data: IdResponse }>({
        path: '/broadcasts/{broadcastId}',
        pathParams: { broadcastId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * List the organization broadcasts.
   *
   * GET /broadcasts
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<BroadcastsResponseItem>, BroadcastsResponseItem>
   */
  list(
    query?: CursorPageParams,
    options?: RequestOptions,
  ): PagePromise<CursorPage<BroadcastsResponseItem>, BroadcastsResponseItem> {
    return this._http.list<BroadcastsResponseItem>({
      path: '/broadcasts',
      query: query as unknown as Record<string, unknown>,
      options,
    });
  }

  /**
   * Retrieve a broadcast and its status.
   *
   * GET /broadcasts/{broadcastId}
   * @param broadcastId - string
   * @param options - RequestOptions
   * @returns APIPromise<BroadcastResponse>
   */
  retrieve(broadcastId: string, options?: RequestOptions): APIPromise<BroadcastResponse> {
    return this._http
      .get<{ data: BroadcastResponse }>({
        path: '/broadcasts/{broadcastId}',
        pathParams: { broadcastId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Send a broadcast now or schedule it.
   *
   * POST /broadcasts/{broadcastId}/send
   * @param broadcastId - string
   * @param body - SendBroadcastRequest
   * @param options - IdempotentRequestOptions
   * @returns APIPromise<SendBroadcastResponse>
   */
  send(
    broadcastId: string,
    body?: SendBroadcastRequest,
    options?: IdempotentRequestOptions,
  ): APIPromise<SendBroadcastResponse> {
    return this._http
      .post<{ data: SendBroadcastResponse }>({
        path: '/broadcasts/{broadcastId}/send',
        pathParams: { broadcastId },
        body,
        options: withIdempotencyKey(options),
      })
      .map((r) => r.data);
  }

  /**
   * Edit a draft or scheduled broadcast.
   *
   * PATCH /broadcasts/{broadcastId}
   * @param broadcastId - string
   * @param body - UpdateBroadcastRequest
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  update(broadcastId: string, body: UpdateBroadcastRequest, options?: RequestOptions): APIPromise<IdResponse> {
    return this._http
      .patch<{ data: IdResponse }>({
        path: '/broadcasts/{broadcastId}',
        pathParams: { broadcastId },
        body,
        options,
      })
      .map((r) => r.data);
  }
}
