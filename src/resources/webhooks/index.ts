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
  CreateWebhookRequest,
  CreateWebhookResponse,
  DeleteWebhookResponse,
  UpdateWebhookRequest,
  UpdateWebhookResponse,
  WebhookResponse,
  WebhooksResponseItem,
} from '../types.js';

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
   * Registers an HTTPS endpoint to receive the event types you subscribe to. The response includes the signing secret used to verify webhook payloads.
   *
   * POST /webhooks
   * @param body - CreateWebhookRequest
   * @param options - RequestOptions
   * @returns APIPromise<CreateWebhookResponse>
   */
  create(body: CreateWebhookRequest, options?: RequestOptions): APIPromise<CreateWebhookResponse> {
    return this._http
      .post<{ data: CreateWebhookResponse }>({
        path: '/webhooks',
        body,
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Permanently deletes a webhook endpoint. Events are no longer delivered to its URL after deletion. This cannot be undone.
   *
   * DELETE /webhooks/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns APIPromise<DeleteWebhookResponse>
   */
  delete(id: string, options?: RequestOptions): APIPromise<DeleteWebhookResponse> {
    return this._http
      .delete<{ data: DeleteWebhookResponse }>({
        path: '/webhooks/{id}',
        pathParams: { id },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Lists the webhook endpoints of your organization, newest first, with cursor pagination. Each entry shows its URL, event types, and status.
   *
   * GET /webhooks
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<WebhooksResponseItem>, WebhooksResponseItem>
   */
  list(
    query?: CursorPageParams,
    options?: RequestOptions,
  ): PagePromise<CursorPage<WebhooksResponseItem>, WebhooksResponseItem> {
    return this._http.list<WebhooksResponseItem>({
      path: '/webhooks',
      query,
      options,
    });
  }

  /**
   * Retrieves a webhook endpoint with its URL, subscribed event types, status, and the reason and time it was disabled, if it is disabled.
   *
   * GET /webhooks/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns APIPromise<WebhookResponse>
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<WebhookResponse> {
    return this._http
      .get<{ data: WebhookResponse }>({
        path: '/webhooks/{id}',
        pathParams: { id },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Updates the name, URL, event types, or status of a webhook, or rotates its signing secret. The new secret is returned only when you rotate it.
   *
   * PATCH /webhooks/{id}
   * @param id - string
   * @param body - UpdateWebhookRequest
   * @param options - RequestOptions
   * @returns APIPromise<UpdateWebhookResponse>
   */
  update(id: string, body: UpdateWebhookRequest, options?: RequestOptions): APIPromise<UpdateWebhookResponse> {
    return this._http
      .patch<{ data: UpdateWebhookResponse }>({
        path: '/webhooks/{id}',
        pathParams: { id },
        body,
        options,
      })
      .map((r) => r.data);
  }
}
