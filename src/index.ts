// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import * as Core from './core';
import * as Errors from './error';
import * as Pagination from './pagination';
import { type CursorPageParams, CursorPageResponse } from './pagination';
import * as Uploads from './uploads';
import * as API from './resources/index';
import {
  Account,
  AccountRetrieveResponse,
  AccountUpdateParams,
  AccountUpdateResponse,
} from './resources/account';
import {
  APIKeyCreateParams,
  APIKeyCreateResponse,
  APIKeyDeleteResponse,
  APIKeyListResponse,
  APIKeyRetrieveResponse,
  APIKeyUpdateParams,
  APIKeyUpdateResponse,
  APIKeys,
} from './resources/api-keys';
import {
  BulkEmailsStatus,
  EmailStatus,
  Error,
  ErrorResponse,
  Shared,
  WebhookEventType,
} from './resources/shared';
import {
  WebhookCreateParams,
  WebhookCreateResponse,
  WebhookDeleteResponse,
  WebhookListResponse,
  WebhookRetrieveResponse,
  WebhookUpdateParams,
  WebhookUpdateResponse,
  Webhooks,
} from './resources/webhooks';
import { Domains } from './resources/domains/domains';
import {
  EmailCancelResponse,
  EmailListParams,
  EmailListResponse,
  EmailListResponsesCursorPage,
  EmailRetrieveResponse,
  EmailSendParams,
  EmailSendResponse,
  Emails,
} from './resources/emails/emails';
import {
  OrganizationListResponse,
  OrganizationRetrieveResponse,
  Organizations,
} from './resources/organizations/organizations';

export interface ClientOptions {
  /**
   * API Key for authentication
   */
  apiKey?: string | null | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['NUNTLY_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   */
  timeout?: number | undefined;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery | undefined;
}

/**
 * API Client for interfacing with the Nuntly API.
 */
export class Nuntly extends Core.APIClient {
  apiKey: string | null;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Nuntly API.
   *
   * @param {string | null | undefined} [opts.apiKey=process.env['NUNTLY_API_KEY'] ?? null]
   * @param {string} [opts.baseURL=process.env['NUNTLY_BASE_URL'] ?? https://api.nuntly.com] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = Core.readEnv('NUNTLY_BASE_URL'),
    apiKey = Core.readEnv('NUNTLY_API_KEY') ?? null,
    ...opts
  }: ClientOptions = {}) {
    const options: ClientOptions = {
      apiKey,
      ...opts,
      baseURL: baseURL || `https://api.nuntly.com`,
    };

    super({
      baseURL: options.baseURL!,
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });

    this._options = options;

    this.apiKey = apiKey;
  }

  shared: API.Shared = new API.Shared(this);
  apiKeys: API.APIKeys = new API.APIKeys(this);
  domains: API.Domains = new API.Domains(this);
  emails: API.Emails = new API.Emails(this);
  webhooks: API.Webhooks = new API.Webhooks(this);
  organizations: API.Organizations = new API.Organizations(this);
  account: API.Account = new API.Account(this);

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      ...this._options.defaultHeaders,
    };
  }

  protected override validateHeaders(headers: Core.Headers, customHeaders: Core.Headers) {
    if (this.apiKey && headers['authorization']) {
      return;
    }
    if (customHeaders['authorization'] === null) {
      return;
    }

    throw new Error(
      'Could not resolve authentication method. Expected the apiKey to be set. Or for the "Authorization" headers to be explicitly omitted',
    );
  }

  protected override authHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    if (this.apiKey == null) {
      return {};
    }
    return { Authorization: `Bearer ${this.apiKey}` };
  }

  static Nuntly = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static NuntlyError = Errors.NuntlyError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;
  static fileFromPath = Uploads.fileFromPath;
}

Nuntly.Shared = Shared;
Nuntly.APIKeys = APIKeys;
Nuntly.Domains = Domains;
Nuntly.Emails = Emails;
Nuntly.EmailListResponsesCursorPage = EmailListResponsesCursorPage;
Nuntly.Webhooks = Webhooks;
Nuntly.Organizations = Organizations;
Nuntly.Account = Account;
export declare namespace Nuntly {
  export type RequestOptions = Core.RequestOptions;

  export import CursorPage = Pagination.CursorPage;
  export { type CursorPageParams as CursorPageParams, type CursorPageResponse as CursorPageResponse };

  export {
    Shared as Shared,
    type BulkEmailsStatus as BulkEmailsStatus,
    type EmailStatus as EmailStatus,
    type Error as Error,
    type ErrorResponse as ErrorResponse,
    type WebhookEventType as WebhookEventType,
  };

  export {
    APIKeys as APIKeys,
    type APIKeyCreateResponse as APIKeyCreateResponse,
    type APIKeyRetrieveResponse as APIKeyRetrieveResponse,
    type APIKeyUpdateResponse as APIKeyUpdateResponse,
    type APIKeyListResponse as APIKeyListResponse,
    type APIKeyDeleteResponse as APIKeyDeleteResponse,
    type APIKeyCreateParams as APIKeyCreateParams,
    type APIKeyUpdateParams as APIKeyUpdateParams,
  };

  export { Domains as Domains };

  export {
    Emails as Emails,
    type EmailRetrieveResponse as EmailRetrieveResponse,
    type EmailListResponse as EmailListResponse,
    type EmailCancelResponse as EmailCancelResponse,
    type EmailSendResponse as EmailSendResponse,
    EmailListResponsesCursorPage as EmailListResponsesCursorPage,
    type EmailListParams as EmailListParams,
    type EmailSendParams as EmailSendParams,
  };

  export {
    Webhooks as Webhooks,
    type WebhookCreateResponse as WebhookCreateResponse,
    type WebhookRetrieveResponse as WebhookRetrieveResponse,
    type WebhookUpdateResponse as WebhookUpdateResponse,
    type WebhookListResponse as WebhookListResponse,
    type WebhookDeleteResponse as WebhookDeleteResponse,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookUpdateParams as WebhookUpdateParams,
  };

  export {
    Organizations as Organizations,
    type OrganizationRetrieveResponse as OrganizationRetrieveResponse,
    type OrganizationListResponse as OrganizationListResponse,
  };

  export {
    Account as Account,
    type AccountRetrieveResponse as AccountRetrieveResponse,
    type AccountUpdateResponse as AccountUpdateResponse,
    type AccountUpdateParams as AccountUpdateParams,
  };
}

export { toFile, fileFromPath } from './uploads';
export {
  NuntlyError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} from './error';

export default Nuntly;
