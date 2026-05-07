import { Resource } from '@nuntly/sdk-core';
import type { RequestOptions, CursorPage, CursorPageParams } from '@nuntly/sdk-core';
import type { WebhookEventDeliveriesResponse, WebhookEventsResponseItem } from '../../types/index.js';


/**
 * WebhooksEvents resource.
 */
export class WebhooksEvents extends Resource {

  /**
   * Returns recent webhook events across all registered endpoints.
   *
   * GET /webhooks/events
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns Promise<CursorPage<WebhookEventsResponseItem>>
   */
  async list(query?: CursorPageParams, options?: RequestOptions): Promise<CursorPage<WebhookEventsResponseItem>> {
    return this._http.list<WebhookEventsResponseItem>('/webhooks/events', query as unknown as Record<string, unknown>, options);
  }

  /**
   * Re-deliver a webhook event to its endpoint. Useful for retrying failed deliveries.
   *
   * POST /webhooks/{id}/events/{eventId}/replay
   * @param id - string
   * @param eventId - string
   * @param options - RequestOptions
   * @returns Promise<void>
   */
  async replay(id: string, eventId: string, options?: RequestOptions): Promise<void> {
    await this._http.post(`/webhooks/${id}/events/${eventId}/replay`, undefined, options);
  }

  /**
   * Returns all delivery attempts for a webhook event, including HTTP status codes and response times.
   *
   * GET /webhooks/{id}/events/{eventId}/deliveries
   * @param id - string
   * @param eventId - string
   * @param options - RequestOptions
   * @returns Promise<WebhookEventDeliveriesResponse>
   */
  async deliveries(id: string, eventId: string, options?: RequestOptions): Promise<WebhookEventDeliveriesResponse> {
    const response = await this._http.get<{ data: WebhookEventDeliveriesResponse }>(`/webhooks/${id}/events/${eventId}/deliveries`, undefined, options);
    return response.data;
  }

}
