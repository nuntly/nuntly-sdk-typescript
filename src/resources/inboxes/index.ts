import { Resource } from '../../core/index.js';
import type { NuntlyClient } from '../../core/index.js';
import type { APIPromise, RequestOptions, CursorPage, CursorPageParams } from '../../core/index.js';
import type { CreateInboxRequest, IdResponse, InboxResponse, InboxesQuery, InboxesResponseItem, UpdateInboxRequest } from '../types.js';

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
   * Create a new inbox on a verified domain.
   *
   * POST /inboxes
   * @param body - CreateInboxRequest
   * @param options - RequestOptions
   * @returns APIPromise<InboxResponse>
   */
  create(body: CreateInboxRequest, options?: RequestOptions): APIPromise<InboxResponse> {
    return this._http.post<{ data: InboxResponse }>({
      path: '/inboxes',
      body,
      options,
    }).map((r) => r.data);
  }

  /**
   * Soft-delete an inbox.
   *
   * DELETE /inboxes/{inboxId}
   * @param inboxId - string
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  delete(inboxId: string, options?: RequestOptions): APIPromise<IdResponse> {
    return this._http.delete<{ data: IdResponse }>({
      path: '/inboxes/{inboxId}',
      pathParams: { inboxId },
      options,
    }).map((r) => r.data);
  }

  /**
   * List all inboxes.
   *
   * GET /inboxes
   * @param query - InboxesQuery
   * @param options - RequestOptions
   * @returns Promise<CursorPage<InboxesResponseItem>>
   */
  async list(query?: InboxesQuery, options?: RequestOptions): Promise<CursorPage<InboxesResponseItem>> {
    return this._http.list<InboxesResponseItem>({
      path: '/inboxes',
      query: query as unknown as Record<string, unknown>,
      options,
    });
  }

  /**
   * Retrieve an inbox.
   *
   * GET /inboxes/{inboxId}
   * @param inboxId - string
   * @param options - RequestOptions
   * @returns APIPromise<InboxResponse>
   */
  retrieve(inboxId: string, options?: RequestOptions): APIPromise<InboxResponse> {
    return this._http.get<{ data: InboxResponse }>({
      path: '/inboxes/{inboxId}',
      pathParams: { inboxId },
      options,
    }).map((r) => r.data);
  }

  /**
   * Update an inbox.
   *
   * PATCH /inboxes/{inboxId}
   * @param inboxId - string
   * @param body - UpdateInboxRequest
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  update(inboxId: string, body: UpdateInboxRequest, options?: RequestOptions): APIPromise<IdResponse> {
    return this._http.patch<{ data: IdResponse }>({
      path: '/inboxes/{inboxId}',
      pathParams: { inboxId },
      body,
      options,
    }).map((r) => r.data);
  }

}
