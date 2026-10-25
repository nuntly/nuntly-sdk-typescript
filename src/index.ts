import type { ClientOptions, SafeResult } from './core/index.js';
import { NuntlyClient, safe } from './core/index.js';
import { Agents } from './resources/agents/index.js';
import { ApiKeys } from './resources/api-keys/index.js';
import { Broadcasts } from './resources/broadcasts/index.js';
import { ContactProperties } from './resources/contact-properties/index.js';
import { Contacts } from './resources/contacts/index.js';
import { Domains } from './resources/domains/index.js';
import { Emails } from './resources/emails/index.js';
import { Inboxes } from './resources/inboxes/index.js';
import { Messages } from './resources/messages/index.js';
import { Namespaces } from './resources/namespaces/index.js';
import { Organizations } from './resources/organizations/index.js';
import { Segments } from './resources/segments/index.js';
import { Templates } from './resources/templates/index.js';
import { Threads } from './resources/threads/index.js';
import { Topics } from './resources/topics/index.js';
import { Webhooks } from './resources/webhooks/index.js';

export class Nuntly {
  private readonly client: NuntlyClient;
  private readonly options: ClientOptions;

  readonly agents: Agents;
  readonly apiKeys: ApiKeys;
  readonly broadcasts: Broadcasts;
  readonly contactProperties: ContactProperties;
  readonly contacts: Contacts;
  readonly domains: Domains;
  readonly emails: Emails;
  readonly inboxes: Inboxes;
  readonly messages: Messages;
  readonly namespaces: Namespaces;
  readonly organizations: Organizations;
  readonly segments: Segments;
  readonly templates: Templates;
  readonly threads: Threads;
  readonly topics: Topics;
  readonly webhooks: Webhooks;

  constructor(options: ClientOptions = {}) {
    this.options = options;
    this.client = new NuntlyClient(options);
    this.agents = new Agents(this.client);
    this.apiKeys = new ApiKeys(this.client);
    this.broadcasts = new Broadcasts(this.client);
    this.contactProperties = new ContactProperties(this.client);
    this.contacts = new Contacts(this.client);
    this.domains = new Domains(this.client);
    this.emails = new Emails(this.client);
    this.inboxes = new Inboxes(this.client);
    this.messages = new Messages(this.client);
    this.namespaces = new Namespaces(this.client);
    this.organizations = new Organizations(this.client);
    this.segments = new Segments(this.client);
    this.templates = new Templates(this.client);
    this.threads = new Threads(this.client);
    this.topics = new Topics(this.client);
    this.webhooks = new Webhooks(this.client);
  }

  /**
   * Returns a new Nuntly client with the supplied options merged on top of the
   * original. `defaultHeaders` is merged deeply (later headers win on conflict).
   *
   * @example
   * const tenantClient = nuntly.withOptions({ apiKey: tenantApiKey });
   * await tenantClient.emails.send({ ... });
   */
  withOptions(partial: Partial<ClientOptions>): Nuntly {
    return new Nuntly({
      ...this.options,
      ...partial,
      defaultHeaders: { ...this.options.defaultHeaders, ...partial.defaultHeaders },
    });
  }
}

export function createSafeNuntly(options: ClientOptions = {}) {
  return safe(new Nuntly(options));
}

export type {
  AppInfo,
  BackoffStrategy,
  ClientOptions,
  CursorPageParams,
  CursorPageResponse,
  ErrorContext,
  Hooks,
  IdempotentRequestOptions,
  Logger,
  RequestContext,
  RequestOptions,
  ResponseContext,
  ResponseWithData,
  RetryContext,
  RetryStrategy,
  SafeResult,
  SuccessContext,
} from './core/index.js';
export {
  APIConnectionError,
  APIConnectionTimeoutError,
  APIError,
  APIPromise,
  AuthenticationError,
  BadRequestError,
  ConflictError,
  CursorPage,
  InternalServerError,
  NotFoundError,
  NuntlyClient,
  NuntlyError,
  PagePromise,
  PermissionDeniedError,
  RateLimitError,
  safe,
  UnprocessableEntityError,
} from './core/index.js';
export type { VerifyWebhookOptions } from './lib/webhook.js';
export { verifyWebhook, WebhookVerificationError } from './lib/webhook.js';
// Per-event types (EmailBouncedEvent, MessageReceivedEvent, ...) and the
// `Event` and `WebhookEvent` unions flow through the resources barrel - no
// explicit re-export here, otherwise the named exports would shadow the
// canonical generated shapes with stale hand-written ones.
export * from './resources/types.js';
export default Nuntly;
