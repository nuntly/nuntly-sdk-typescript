import type { APIPromise, RequestOptions } from '../../../../core/index.js';
import { Resource } from '../../../../core/index.js';
import type { WebhookEventDeliveriesResponse } from '../../../types.js';

/**
 * WebhooksEventsDeliveries resource.
 */
export class WebhooksEventsDeliveries extends Resource {
  /**
   * Lists the delivery attempts of a webhook event to an endpoint, with the status, HTTP response code, response data, and delivery time of each attempt.
   *
   * GET /webhooks/{id}/events/{eventId}/deliveries
   * @param id - string
   * @param eventId - string
   * @param options - RequestOptions
   * @returns APIPromise<WebhookEventDeliveriesResponse>
   */
  list(id: string, eventId: string, options?: RequestOptions): APIPromise<WebhookEventDeliveriesResponse> {
    return this._http
      .get<{ data: WebhookEventDeliveriesResponse }>({
        path: '/webhooks/{id}/events/{eventId}/deliveries',
        pathParams: { id, eventId },
        options,
      })
      .map((r) => r.data);
  }
}
