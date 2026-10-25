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
  CreateInboxRequest,
  IdResponse,
  InboxesQuery,
  InboxesResponseItem,
  InboxResponse,
  UpdateInboxRequest,
} from '../types.js';

import { InboxesMessages } from './messages/index.js';
import { InboxesThreads } from './threads/index.js';

/**
 * Inboxes resource.
 */
export class Inboxes extends Resource {
  messages: InboxesMessages;
  threads: InboxesThreads;

  constructor(client: NuntlyClient) {
    super(client);
    this.messages = new InboxesMessages(client);
    this.threads = new InboxesThreads(client);
  }

  /**
   * Creates an inbox address on a verified domain with receiving active, or on your provided domain if none is given. Can assign a namespace and agent id.
   *
   * POST /inboxes
   * @param body - CreateInboxRequest
   * @param options - IdempotentRequestOptions
   * @returns APIPromise<InboxResponse>
   */
  create(body: CreateInboxRequest, options?: IdempotentRequestOptions): APIPromise<InboxResponse> {
    return this._http
      .post<{ data: InboxResponse }>({
        path: '/inboxes',
        body,
        options: withIdempotencyKey(options),
        idempotent: true,
      })
      .map((r) => r.data);
  }

  /**
   * Deletes an inbox so it no longer appears in lists and stops matching incoming mail. The default catch-all inbox of a domain cannot be deleted.
   *
   * DELETE /inboxes/{inboxId}
   * @param inboxId - string
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  delete(inboxId: string, options?: RequestOptions): APIPromise<IdResponse> {
    return this._http
      .delete<{ data: IdResponse }>({
        path: '/inboxes/{inboxId}',
        pathParams: { inboxId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Lists the active inboxes of your organization, newest first, with cursor pagination. Optionally filter the results to a single namespace.
   *
   * GET /inboxes
   * @param query - InboxesQuery
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<InboxesResponseItem>, InboxesResponseItem>
   */
  list(
    query?: InboxesQuery,
    options?: RequestOptions,
  ): PagePromise<CursorPage<InboxesResponseItem>, InboxesResponseItem> {
    return this._http.list<InboxesResponseItem>({
      path: '/inboxes',
      query,
      options,
    });
  }

  /**
   * Retrieves an inbox by id, including its address, domain, display name, namespace, and assigned agent id. Deleted inboxes return a not found error.
   *
   * GET /inboxes/{inboxId}
   * @param inboxId - string
   * @param options - RequestOptions
   * @returns APIPromise<InboxResponse>
   */
  retrieve(inboxId: string, options?: RequestOptions): APIPromise<InboxResponse> {
    return this._http
      .get<{ data: InboxResponse }>({
        path: '/inboxes/{inboxId}',
        pathParams: { inboxId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Updates the display name of an inbox, used as the sender name on messages it sends. Set the name to null to clear it. Returns the inbox id.
   *
   * PATCH /inboxes/{inboxId}
   * @param inboxId - string
   * @param body - UpdateInboxRequest
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  update(inboxId: string, body: UpdateInboxRequest, options?: RequestOptions): APIPromise<IdResponse> {
    return this._http
      .patch<{ data: IdResponse }>({
        path: '/inboxes/{inboxId}',
        pathParams: { inboxId },
        body,
        options,
      })
      .map((r) => r.data);
  }
}
