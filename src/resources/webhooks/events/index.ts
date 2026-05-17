import { Resource } from '../../../core/index.js';
import type { APIPromise, RequestOptions, CursorPage, CursorPageParams, PagePromise } from '../../../core/index.js';
import type { WebhookEventDeliveriesResponse, WebhookEventsResponseItem } from '../../types.js';


/**
 * WebhooksEvents resource.
 */
export class WebhooksEvents extends Resource {

  /**
   * Returns all delivery attempts for a webhook event, including HTTP status codes and response times.
   *
   * GET /webhooks/{id}/events/{eventId}/deliveries
   * @param id - string
   * @param eventId - string
   * @param options - RequestOptions
   * @returns APIPromise<WebhookEventDeliveriesResponse>
   */
  deliveries(id: string, eventId: string, options?: RequestOptions): APIPromise<WebhookEventDeliveriesResponse> {
    return this._http.get<{ data: WebhookEventDeliveriesResponse }>({
      path: '/webhooks/{id}/events/{eventId}/deliveries',
      pathParams: { id, eventId },
      options,
    }).map((r) => r.data);
  }

  /**
   * Returns recent webhook events across all registered endpoints.
   *
   * GET /webhooks/events
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<WebhookEventsResponseItem>, WebhookEventsResponseItem>
   */
  list(query?: CursorPageParams, options?: RequestOptions): PagePromise<CursorPage<WebhookEventsResponseItem>, WebhookEventsResponseItem> {
    return this._http.list<WebhookEventsResponseItem>({
      path: '/webhooks/events',
      query: query as unknown as Record<string, unknown>,
      options,
    });
  }

  /**
   * Re-deliver a webhook event to its endpoint. Useful for retrying failed deliveries.
   *
   * POST /webhooks/{id}/events/{eventId}/replay
   * @param id - string
   * @param eventId - string
   * @param options - RequestOptions
   * @returns APIPromise<void>
   */
  replay(id: string, eventId: string, options?: RequestOptions): APIPromise<void> {
    return this._http.post<unknown>({
      path: '/webhooks/{id}/events/{eventId}/replay',
      pathParams: { id, eventId },
      options,
    }).map(() => undefined);
  }

}
