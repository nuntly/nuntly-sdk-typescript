export type WebhookEventDeliveriesResponse = Array<WebhookEventDeliveriesResponseItem>;

export interface WebhookEventDeliveriesResponseItem {
  id: string;
  deliveredAt: string;
  code: string;
  status: 'pending' | 'success' | 'failed' | (string & {});
  response: Record<string, unknown>;
}
