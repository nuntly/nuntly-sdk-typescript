import { Resource } from '../../core/index.js';
import type { NuntlyClient } from '../../core/index.js';
import type { APIPromise, RequestOptions, CursorPage, CursorPageParams, PagePromise } from '../../core/index.js';
import type { CreateWebhookRequest, CreateWebhookResponse, DeleteWebhookResponse, UpdateWebhookRequest, UpdateWebhookResponse, WebhookResponse, WebhooksResponseItem } from '../types.js';

import { WebhooksEvents } from './events/index.js';

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
   * Register an endpoint to start receiving webhook events for your organization.
   *
   * POST /webhooks
   * @param body - CreateWebhookRequest
   * @param options - RequestOptions
   * @returns APIPromise<CreateWebhookResponse>
   */
  create(body: CreateWebhookRequest, options?: RequestOptions): APIPromise<CreateWebhookResponse> {
    return this._http.post<{ data: CreateWebhookResponse }>({
      path: '/webhooks',
      body,
      options,
    }).map((r) => r.data);
  }

  /**
   * Remove a webhook endpoint. No further events will be delivered to this URL.
   *
   * DELETE /webhooks/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns APIPromise<DeleteWebhookResponse>
   */
  delete(id: string, options?: RequestOptions): APIPromise<DeleteWebhookResponse> {
    return this._http.delete<{ data: DeleteWebhookResponse }>({
      path: '/webhooks/{id}',
      pathParams: { id },
      options,
    }).map((r) => r.data);
  }

  /**
   * Returns all registered webhook endpoints for the organization.
   *
   * GET /webhooks
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<WebhooksResponseItem>, WebhooksResponseItem>
   */
  list(query?: CursorPageParams, options?: RequestOptions): PagePromise<CursorPage<WebhooksResponseItem>, WebhooksResponseItem> {
    return this._http.list<WebhooksResponseItem>({
      path: '/webhooks',
      query: query as unknown as Record<string, unknown>,
      options,
    });
  }

  /**
   * Returns a webhook endpoint with its URL, subscribed events, and configuration.
   *
   * GET /webhooks/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns APIPromise<WebhookResponse>
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<WebhookResponse> {
    return this._http.get<{ data: WebhookResponse }>({
      path: '/webhooks/{id}',
      pathParams: { id },
      options,
    }).map((r) => r.data);
  }

  /**
   * Update the endpoint URL, subscribed event types, or rotate the signing secret.
   *
   * PATCH /webhooks/{id}
   * @param id - string
   * @param body - UpdateWebhookRequest
   * @param options - RequestOptions
   * @returns APIPromise<UpdateWebhookResponse>
   */
  update(id: string, body: UpdateWebhookRequest, options?: RequestOptions): APIPromise<UpdateWebhookResponse> {
    return this._http.patch<{ data: UpdateWebhookResponse }>({
      path: '/webhooks/{id}',
      pathParams: { id },
      body,
      options,
    }).map((r) => r.data);
  }

}
