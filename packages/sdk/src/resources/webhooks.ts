import { Resource } from '@nuntly/sdk-core';
import type { NuntlyClient } from '@nuntly/sdk-core';
import type { RequestOptions, CursorPage, CursorPageParams } from '@nuntly/sdk-core';
import type { CreateWebhookRequest, CreateWebhookResponse, DeleteWebhookResponse, UpdateWebhookRequest, UpdateWebhookResponse, WebhookResponse, WebhooksResponseItem } from '../types/index.js';

import { WebhooksEvents } from './webhooks/events.js';

/**
 * Webhooks resource.
 */
export class Webhooks extends Resource {
  events: WebhooksEvents;

  constructor(client: NuntlyClient) {
    super(client);
    this.events = new WebhooksEvents(client);
  }

  /**
   * Returns a webhook endpoint with its URL, subscribed events, and configuration.
   *
   * GET /webhooks/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns Promise<WebhookResponse>
   */
  async retrieve(id: string, options?: RequestOptions): Promise<WebhookResponse> {
    const response = await this._http.get<{ data: WebhookResponse }>(`/webhooks/${id}`, undefined, options);
    return response.data;
  }

  /**
   * Update the endpoint URL, subscribed event types, or rotate the signing secret.
   *
   * PUT /webhooks/{id}
   * @param id - string
   * @param body - UpdateWebhookRequest
   * @param options - RequestOptions
   * @returns Promise<UpdateWebhookResponse>
   */
  async update(id: string, body: UpdateWebhookRequest, options?: RequestOptions): Promise<UpdateWebhookResponse> {
    const response = await this._http.put<{ data: UpdateWebhookResponse }>(`/webhooks/${id}`, body, options);
    return response.data;
  }

  /**
   * Remove a webhook endpoint. No further events will be delivered to this URL.
   *
   * DELETE /webhooks/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns Promise<DeleteWebhookResponse>
   */
  async delete(id: string, options?: RequestOptions): Promise<DeleteWebhookResponse> {
    const response = await this._http.delete<{ data: DeleteWebhookResponse }>(`/webhooks/${id}`, options);
    return response.data;
  }

  /**
   * Register an endpoint to start receiving webhook events for your organization.
   *
   * POST /webhooks
   * @param body - CreateWebhookRequest
   * @param options - RequestOptions
   * @returns Promise<CreateWebhookResponse>
   */
  async create(body: CreateWebhookRequest, options?: RequestOptions): Promise<CreateWebhookResponse> {
    const response = await this._http.post<{ data: CreateWebhookResponse }>('/webhooks', body, options);
    return response.data;
  }

  /**
   * Returns all registered webhook endpoints for the organization.
   *
   * GET /webhooks
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns Promise<CursorPage<WebhooksResponseItem>>
   */
  async list(query?: CursorPageParams, options?: RequestOptions): Promise<CursorPage<WebhooksResponseItem>> {
    return this._http.list<WebhooksResponseItem>('/webhooks', query as unknown as Record<string, unknown>, options);
  }

}
