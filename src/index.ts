import { NuntlyClient } from './core/index.js';
import type { ClientOptions } from './core/index.js';
import { safe } from './core/index.js';
import type { SafeResult } from './core/index.js';
import { Emails } from './resources/emails.js';
import { Domains } from './resources/domains.js';
import { Webhooks } from './resources/webhooks.js';
import { Organizations } from './resources/organizations.js';
import { Inboxes } from './resources/inboxes.js';
import { Agents } from './resources/agents.js';
import { Threads } from './resources/threads.js';
import { Messages } from './resources/messages.js';
import { Namespaces } from './resources/namespaces.js';
import { ApiKeys } from './resources/api-keys.js';

export class Nuntly {
  private readonly client: NuntlyClient;

  readonly emails: Emails;
  readonly domains: Domains;
  readonly webhooks: Webhooks;
  readonly organizations: Organizations;
  readonly inboxes: Inboxes;
  readonly agents: Agents;
  readonly threads: Threads;
  readonly messages: Messages;
  readonly namespaces: Namespaces;
  readonly apiKeys: ApiKeys;

  constructor(options: ClientOptions) {
    this.client = new NuntlyClient(options);
    this.emails = new Emails(this.client);
    this.domains = new Domains(this.client);
    this.webhooks = new Webhooks(this.client);
    this.organizations = new Organizations(this.client);
    this.inboxes = new Inboxes(this.client);
    this.agents = new Agents(this.client);
    this.threads = new Threads(this.client);
    this.messages = new Messages(this.client);
    this.namespaces = new Namespaces(this.client);
    this.apiKeys = new ApiKeys(this.client);
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
export type { VerifyWebhookOptions } from './lib/webhook.js';
export type {
  WebhookEvent,
  EmailQueuedEvent, EmailScheduledEvent, EmailProcessedEvent, EmailSendingEvent,
  EmailSentEvent, EmailDeliveredEvent, EmailOpenedEvent, EmailClickedEvent,
  EmailBouncedEvent, EmailComplainedEvent, EmailRejectedEvent, EmailDeliveryDelayedEvent, EmailFailedEvent,
  MessageReceivedEvent, MessageSecurityFlaggedEvent, MessageAgentTriggeredEvent, MessageSentEvent, MessageRejectedEvent,
} from './lib/webhook.js';
export * from './types/index.js';
export default Nuntly;
