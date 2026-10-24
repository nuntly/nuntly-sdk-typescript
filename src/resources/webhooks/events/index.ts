import type {
  APIPromise,
  CursorPage,
  CursorPageParams,
  NuntlyClient,
  PagePromise,
  RequestOptions,
} from '../../../core/index.js';
import { Resource } from '../../../core/index.js';
import type { WebhookEventsResponseItem } from '../../types.js';

import { WebhooksEventsDeliveries } from './deliveries/index.js';

/**
 * WebhooksEvents resource.
 */
export class WebhooksEvents extends Resource {
  deliveries: WebhooksEventsDeliveries;

  constructor(client: NuntlyClient) {
    super(client);
    this.deliveries = new WebhooksEventsDeliveries(client);
  }

  /**
   * Lists the webhook events of the last 48 hours across all your endpoints, with their delivery status and payload. Results use cursor pagination.
   *
   * GET /webhooks/events
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<WebhookEventsResponseItem>, WebhookEventsResponseItem>
   */
  list(
    query?: CursorPageParams,
    options?: RequestOptions,
  ): PagePromise<CursorPage<WebhookEventsResponseItem>, WebhookEventsResponseItem> {
    return this._http.list<WebhookEventsResponseItem>({
      path: '/webhooks/events',
      query: query as unknown as Record<string, unknown>,
      options,
    });
  }

  /**
   * Queues a new delivery of a past webhook event to the endpoint. The request is accepted asynchronously and returns 202 before the delivery runs.
   *
   * POST /webhooks/{id}/events/{eventId}/replay
   * @param id - string
   * @param eventId - string
   * @param options - RequestOptions
   * @returns APIPromise<void>
   */
  replay(id: string, eventId: string, options?: RequestOptions): APIPromise<void> {
    return this._http
      .post<unknown>({
        path: '/webhooks/{id}/events/{eventId}/replay',
        pathParams: { id, eventId },
        options,
      })
      .map(() => undefined);
  }
}
