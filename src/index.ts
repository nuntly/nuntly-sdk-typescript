// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Errors from './error';
import * as Uploads from './uploads';
import { type Agent } from './_shims/index';
import * as Core from './core';
import * as API from './resources/index';

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
  timeout?: number;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent;

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
  maxRetries?: number;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery;
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

export const {
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
} = Errors;

export import toFile = Uploads.toFile;
export import fileFromPath = Uploads.fileFromPath;

export namespace Nuntly {
  export import RequestOptions = Core.RequestOptions;

  export import Shared = API.Shared;
  export import Error = API.Error;
  export import ErrorResponse = API.ErrorResponse;

  export import APIKeys = API.APIKeys;
  export import APIKeyCreateResponse = API.APIKeyCreateResponse;
  export import APIKeyRetrieveResponse = API.APIKeyRetrieveResponse;
  export import APIKeyUpdateResponse = API.APIKeyUpdateResponse;
  export import APIKeyListResponse = API.APIKeyListResponse;
  export import APIKeyDeleteResponse = API.APIKeyDeleteResponse;
  export import APIKeyCreateParams = API.APIKeyCreateParams;
  export import APIKeyUpdateParams = API.APIKeyUpdateParams;

  export import Domains = API.Domains;
  export import DomainCreateResponse = API.DomainCreateResponse;
  export import DomainRetrieveResponse = API.DomainRetrieveResponse;
  export import DomainUpdateResponse = API.DomainUpdateResponse;
  export import DomainListResponse = API.DomainListResponse;
  export import DomainDeleteResponse = API.DomainDeleteResponse;
  export import DomainCreateParams = API.DomainCreateParams;
  export import DomainUpdateParams = API.DomainUpdateParams;

  export import Emails = API.Emails;
  export import EmailRetrieveResponse = API.EmailRetrieveResponse;
  export import EmailListResponse = API.EmailListResponse;
  export import EmailBulkResponse = API.EmailBulkResponse;
  export import EmailCancelResponse = API.EmailCancelResponse;
  export import EmailSendResponse = API.EmailSendResponse;
  export import EmailBulkParams = API.EmailBulkParams;
  export import EmailSendParams = API.EmailSendParams;

  export import Webhooks = API.Webhooks;
  export import WebhookCreateResponse = API.WebhookCreateResponse;
  export import WebhookRetrieveResponse = API.WebhookRetrieveResponse;
  export import WebhookUpdateResponse = API.WebhookUpdateResponse;
  export import WebhookListResponse = API.WebhookListResponse;
  export import WebhookDeleteResponse = API.WebhookDeleteResponse;
  export import WebhookCreateParams = API.WebhookCreateParams;
  export import WebhookUpdateParams = API.WebhookUpdateParams;

  export import Organizations = API.Organizations;
  export import OrganizationRetrieveResponse = API.OrganizationRetrieveResponse;
  export import OrganizationListResponse = API.OrganizationListResponse;

  export import Account = API.Account;
  export import AccountRetrieveResponse = API.AccountRetrieveResponse;
  export import AccountUpdateResponse = API.AccountUpdateResponse;
  export import AccountUpdateParams = API.AccountUpdateParams;
}

export default Nuntly;
