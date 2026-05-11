import { Resource } from '../../core/index.js';
import type { NuntlyClient } from '../../core/index.js';
import type { RequestOptions, CursorPage, CursorPageParams } from '../../core/index.js';
import type { CreateInboxRequest, IdResponse, InboxDetailResponse, InboxResponse, InboxesQuery, InboxesResponseItem, UpdateInboxRequest } from '../types.js';

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
   * @returns Promise<InboxResponse>
   */
  async create(body: CreateInboxRequest, options?: RequestOptions): Promise<InboxResponse> {
    const response = await this._http.post<{ data: InboxResponse }>('/inboxes', body, options);
    return response.data;
  }

  /**
   * Soft-delete an inbox.
   *
   * DELETE /inboxes/{inboxId}
   * @param inboxId - string
   * @param options - RequestOptions
   * @returns Promise<IdResponse>
   */
  async delete(inboxId: string, options?: RequestOptions): Promise<IdResponse> {
    const response = await this._http.delete<{ data: IdResponse }>(`/inboxes/${inboxId}`, options);
    return response.data;
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
    return this._http.list<InboxesResponseItem>('/inboxes', query as unknown as Record<string, unknown>, options);
  }

  /**
   * Retrieve an inbox with thread stats.
   *
   * GET /inboxes/{inboxId}
   * @param inboxId - string
   * @param options - RequestOptions
   * @returns Promise<InboxDetailResponse>
   */
  async retrieve(inboxId: string, options?: RequestOptions): Promise<InboxDetailResponse> {
    const response = await this._http.get<{ data: InboxDetailResponse }>(`/inboxes/${inboxId}`, undefined, options);
    return response.data;
  }

  /**
   * Update an inbox.
   *
   * PATCH /inboxes/{inboxId}
   * @param inboxId - string
   * @param body - UpdateInboxRequest
   * @param options - RequestOptions
   * @returns Promise<IdResponse>
   */
  async update(inboxId: string, body: UpdateInboxRequest, options?: RequestOptions): Promise<IdResponse> {
    const response = await this._http.patch<{ data: IdResponse }>(`/inboxes/${inboxId}`, body, options);
    return response.data;
  }

}
