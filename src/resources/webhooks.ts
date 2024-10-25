// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as WebhooksAPI from './webhooks';

export class Webhooks extends APIResource {
  /**
   * Create a webhook so the endpoint is notified from Nuntly platform events (Emails
   * events)
   */
  create(body: WebhookCreateParams, options?: Core.RequestOptions): Core.APIPromise<WebhookCreateResponse> {
    return (
      this._client.post('/webhooks', { body, ...options }) as Core.APIPromise<{ data: WebhookCreateResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Return the webhook with the given ID
   */
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<WebhookRetrieveResponse> {
    return (
      this._client.get(`/webhooks/${id}`, options) as Core.APIPromise<{ data: WebhookRetrieveResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Updates a webhook with the given ID
   */
  update(
    id: string,
    body: WebhookUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<WebhookUpdateResponse> {
    return (
      this._client.put(`/webhooks/${id}`, { body, ...options }) as Core.APIPromise<{
        data: WebhookUpdateResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Return a list of your webhooks
   */
  list(options?: Core.RequestOptions): Core.APIPromise<WebhookListResponse> {
    return (
      this._client.get('/webhooks', options) as Core.APIPromise<{ data: WebhookListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Delete the webhook with the given ID
   */
  delete(id: string, options?: Core.RequestOptions): Core.APIPromise<WebhookDeleteResponse> {
    return (
      this._client.delete(`/webhooks/${id}`, options) as Core.APIPromise<{ data: WebhookDeleteResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export interface WebhookCreateResponse {
  /**
   * The id of the webhook
   */
  id: string;
}

export interface WebhookRetrieveResponse {
  /**
   * The id of the webhook
   */
  id: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

  /**
   * The user who created the object
   */
  created_by: string;

  /**
   * The endpoint URL of the webhook
   */
  endpoint_url: string;

  /**
   * The list of events to enable for this webhook
   */
  events: Array<'Bounce' | 'Complaint' | 'Delivery' | 'Send' | 'Reject' | 'Open' | 'Click' | 'DeliveryDelay'>;

  /**
   * Date at which the object was modified (ISO 8601 format)
   */
  modified_at: string;

  /**
   * The last user who modified the object
   */
  modified_by: string;

  /**
   * The status of the webhook.
   */
  status: 'enabled' | 'disabled' | 'revoked';

  /**
   * The name of the webhook
   */
  name?: string;
}

export interface WebhookUpdateResponse {
  /**
   * The id of the webhook
   */
  id: string;

  /**
   * The list of events to enable for this webhook
   */
  events: Array<'Bounce' | 'Complaint' | 'Delivery' | 'Send' | 'Reject' | 'Open' | 'Click' | 'DeliveryDelay'>;

  /**
   * The status of the webhook.
   */
  status: 'enabled' | 'disabled' | 'revoked';

  /**
   * The endpoint URL of the webhook
   */
  endpoint_url?: string;

  /**
   * The name of the webhook
   */
  name?: string;
}

export interface WebhookListResponse {
  /**
   * The webhooks registered in your organization
   */
  data: Array<WebhookListResponse.Data>;
}

export namespace WebhookListResponse {
  export interface Data {
    /**
     * The id of the webhook
     */
    id: string;

    /**
     * Date at which the object was created (ISO 8601 format)
     */
    created_at: string;

    /**
     * The user who created the object
     */
    created_by: string;

    /**
     * The endpoint URL of the webhook
     */
    endpoint_url: string;

    /**
     * The list of events to enable for this webhook
     */
    events: Array<
      'Bounce' | 'Complaint' | 'Delivery' | 'Send' | 'Reject' | 'Open' | 'Click' | 'DeliveryDelay'
    >;

    /**
     * Date at which the object was modified (ISO 8601 format)
     */
    modified_at: string;

    /**
     * The last user who modified the object
     */
    modified_by: string;

    /**
     * The status of the webhook.
     */
    status: 'enabled' | 'disabled' | 'revoked';

    /**
     * The name of the webhook
     */
    name?: string;
  }
}

export interface WebhookDeleteResponse {
  /**
   * The id of the webhook
   */
  id: string;
}

export interface WebhookCreateParams {
  /**
   * The endpoint URL of the webhook
   */
  endpoint_url: string;

  /**
   * The list of events to enable for this webhook
   */
  events: Array<'Bounce' | 'Complaint' | 'Delivery' | 'Send' | 'Reject' | 'Open' | 'Click' | 'DeliveryDelay'>;

  /**
   * The status of the webhook.
   */
  status: 'enabled' | 'disabled' | 'revoked';

  /**
   * The name of the webhook
   */
  name?: string;
}

export interface WebhookUpdateParams {
  /**
   * The list of events to enable for this webhook
   */
  events: Array<'Bounce' | 'Complaint' | 'Delivery' | 'Send' | 'Reject' | 'Open' | 'Click' | 'DeliveryDelay'>;

  /**
   * The status of the webhook.
   */
  status: 'enabled' | 'disabled';

  /**
   * The endpoint URL of the webhook
   */
  endpoint_url?: string;

  /**
   * The name of the webhook
   */
  name?: string;
}

export namespace Webhooks {
  export import WebhookCreateResponse = WebhooksAPI.WebhookCreateResponse;
  export import WebhookRetrieveResponse = WebhooksAPI.WebhookRetrieveResponse;
  export import WebhookUpdateResponse = WebhooksAPI.WebhookUpdateResponse;
  export import WebhookListResponse = WebhooksAPI.WebhookListResponse;
  export import WebhookDeleteResponse = WebhooksAPI.WebhookDeleteResponse;
  export import WebhookCreateParams = WebhooksAPI.WebhookCreateParams;
  export import WebhookUpdateParams = WebhooksAPI.WebhookUpdateParams;
}
