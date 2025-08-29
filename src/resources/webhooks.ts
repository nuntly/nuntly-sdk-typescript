// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as SharedAPI from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Webhooks extends APIResource {
  /**
   * Create a webhook so the endpoint is notified from Nuntly platform events (Emails
   * events)
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.create({
   *   endpoint_url:
   *     'https://webhook.site/12345678-1234-5678-1234-123456789012',
   *   events: ['email.delivered', 'email.sent'],
   *   status: 'enabled',
   * });
   * ```
   */
  create(body: WebhookCreateParams, options?: RequestOptions): APIPromise<WebhookCreateResponse> {
    return (
      this._client.post('/webhooks', { body, ...options }) as APIPromise<{ data: WebhookCreateResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Return the webhook with the given ID
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.retrieve(
   *   'wh_YNtYn86oYZmP1ZHbnUBvXXFt',
   * );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<WebhookRetrieveResponse> {
    return (
      this._client.get(path`/webhooks/${id}`, options) as APIPromise<{ data: WebhookRetrieveResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Updates a webhook with the given ID
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.update(
   *   'wh_YNtYn86oYZmP1ZHbnUBvXXFt',
   * );
   * ```
   */
  update(id: string, body: WebhookUpdateParams, options?: RequestOptions): APIPromise<WebhookUpdateResponse> {
    return (
      this._client.put(path`/webhooks/${id}`, { body, ...options }) as APIPromise<{
        data: WebhookUpdateResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Return a list of your webhooks
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const webhookListResponse of client.webhooks.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: WebhookListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WebhookListResponsesCursorPage, WebhookListResponse> {
    return this._client.getAPIList('/webhooks', CursorPage<WebhookListResponse>, { query, ...options });
  }

  /**
   * Delete the webhook with the given ID
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.delete(
   *   'wh_YNtYn86oYZmP1ZHbnUBvXXFt',
   * );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<WebhookDeleteResponse> {
    return (
      this._client.delete(path`/webhooks/${id}`, options) as APIPromise<{ data: WebhookDeleteResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export type WebhookListResponsesCursorPage = CursorPage<WebhookListResponse>;

export interface WebhookCreateResponse {
  /**
   * The id of the webhook
   */
  id: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

  /**
   * The endpoint URL of the webhook
   */
  endpoint_url: string;

  events: Array<SharedAPI.WebhookEventType>;

  /**
   * The kind of object returned
   */
  kind: 'webhook';

  /**
   * The id of the organization
   */
  org_id: string;

  /**
   * The region of the related data
   */
  region: 'eu-west-1';

  /**
   * The signing secret of the webhook.
   */
  signing_secret: string;

  /**
   * The status of the webhook.
   */
  status: 'enabled' | 'disabled' | 'revoked';

  /**
   * Date at which the object was modified (ISO 8601 format)
   */
  modified_at?: string;

  /**
   * The name of the webhook
   */
  name?: string;
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
   * The endpoint URL of the webhook
   */
  endpoint_url: string;

  events: Array<SharedAPI.WebhookEventType>;

  /**
   * The kind of object returned
   */
  kind: 'webhook';

  /**
   * The id of the organization
   */
  org_id: string;

  /**
   * The region of the related data
   */
  region: 'eu-west-1';

  /**
   * The status of the webhook.
   */
  status: 'enabled' | 'disabled' | 'revoked';

  /**
   * Date at which the object was modified (ISO 8601 format)
   */
  modified_at?: string;

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
   * The kind of object returned
   */
  kind: 'webhook';

  /**
   * The id of the organization
   */
  org_id: string;
}

export interface WebhookListResponse {
  /**
   * The id of the webhook
   */
  id: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

  /**
   * The endpoint URL of the webhook
   */
  endpoint_url: string;

  events: Array<SharedAPI.WebhookEventType>;

  /**
   * The kind of object returned
   */
  kind: 'webhook';

  /**
   * The id of the organization
   */
  org_id: string;

  /**
   * The region of the related data
   */
  region: 'eu-west-1';

  /**
   * The status of the webhook.
   */
  status: 'enabled' | 'disabled' | 'revoked';

  /**
   * Date at which the object was modified (ISO 8601 format)
   */
  modified_at?: string;

  /**
   * The name of the webhook
   */
  name?: string;
}

export interface WebhookDeleteResponse {
  /**
   * The id of the webhook
   */
  id: string;

  /**
   * The kind of object returned
   */
  kind: 'webhook';

  /**
   * The id of the organization
   */
  org_id: string;
}

export interface WebhookCreateParams {
  /**
   * The endpoint URL of the webhook
   */
  endpoint_url: string;

  events: Array<SharedAPI.WebhookEventType>;

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
   * The endpoint URL of the webhook
   */
  endpoint_url?: string;

  events?: Array<SharedAPI.WebhookEventType>;

  /**
   * The name of the webhook
   */
  name?: string;

  /**
   * The status of the webhook.
   */
  status?: 'enabled' | 'disabled';
}

export interface WebhookListParams extends CursorPageParams {}

export declare namespace Webhooks {
  export {
    type WebhookCreateResponse as WebhookCreateResponse,
    type WebhookRetrieveResponse as WebhookRetrieveResponse,
    type WebhookUpdateResponse as WebhookUpdateResponse,
    type WebhookListResponse as WebhookListResponse,
    type WebhookDeleteResponse as WebhookDeleteResponse,
    type WebhookListResponsesCursorPage as WebhookListResponsesCursorPage,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookUpdateParams as WebhookUpdateParams,
    type WebhookListParams as WebhookListParams,
  };
}
