import { NuntlyClient } from './core/index.js';
import type { ClientOptions } from './core/index.js';
import { safe } from './core/index.js';
import type { SafeResult } from './core/index.js';
import { Agents } from './resources/agents/index.js';
import { ApiKeys } from './resources/api-keys/index.js';
import { Domains } from './resources/domains/index.js';
import { Emails } from './resources/emails/index.js';
import { Inboxes } from './resources/inboxes/index.js';
import { Messages } from './resources/messages/index.js';
import { Namespaces } from './resources/namespaces/index.js';
import { Organizations } from './resources/organizations/index.js';
import { Threads } from './resources/threads/index.js';
import { Webhooks } from './resources/webhooks/index.js';

export class Nuntly {
  private readonly client: NuntlyClient;

  readonly agents: Agents;
  readonly apiKeys: ApiKeys;
  readonly domains: Domains;
  readonly emails: Emails;
  readonly inboxes: Inboxes;
  readonly messages: Messages;
  readonly namespaces: Namespaces;
  readonly organizations: Organizations;
  readonly threads: Threads;
  readonly webhooks: Webhooks;

  constructor(options: ClientOptions) {
    this.client = new NuntlyClient(options);
    this.agents = new Agents(this.client);
    this.apiKeys = new ApiKeys(this.client);
    this.domains = new Domains(this.client);
    this.emails = new Emails(this.client);
    this.inboxes = new Inboxes(this.client);
    this.messages = new Messages(this.client);
    this.namespaces = new Namespaces(this.client);
    this.organizations = new Organizations(this.client);
    this.threads = new Threads(this.client);
    this.webhooks = new Webhooks(this.client);
  }
}

export function createSafeNuntly(options: ClientOptions) {
  return safe(new Nuntly(options));
}

export { NuntlyClient, safe } from './core/index.js';
export type { SafeResult } from './core/index.js';
export type { APIErrorBody, AppInfo, Logger, Hooks, RetryContext, BackoffStrategy, RetryStrategy, ClientOptions, RequestOptions, ResponseWithData, CursorPageResponse, CursorPageParams } from './core/index.js';
export {
  NuntlyError,
  APIError,
  BadRequestError,
  AuthenticationError,
  PermissionDeniedError,
  NotFoundError,
  ConflictError,
  UnprocessableEntityError,
  RateLimitError,
  InternalServerError,
  APIConnectionError,
  APIConnectionTimeoutError,
} from './core/index.js';
export { CursorPage } from './core/index.js';
export { verifyWebhook, WebhookVerificationError } from './lib/webhook.js';
export type { VerifyWebhookOptions, WebhookEvent } from './lib/webhook.js';
// Per-event types (EmailBouncedEvent, MessageReceivedEvent, ...) and the
// `Event` union flow through the resources barrel - no explicit re-export
// here, otherwise the named exports would shadow the canonical generated
// shapes with stale hand-written ones.
export * from './resources/types.js';
export default Nuntly;
