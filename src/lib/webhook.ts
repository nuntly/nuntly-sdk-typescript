interface BaseEvent {
  id: string;
  createdAt: string;
}

interface EmailEventData {
  id: string;
  orgId: string;
  bulkId?: string;
  messageId: string;
  sentAt: string;
  enqueuedAt: string;
  domainName: string;
  domainId: string;
  from: string;
  to: string | string[];
  cc?: string[];
  bcc?: string[];
  replyTo?: string[];
  subject: string;
  headers?: Record<string, string>;
  tags?: Array<{ name: string; value: string }>;
}

export interface EmailQueuedEvent extends BaseEvent {
  type: 'email.queued';
  data: { queue: Record<string, unknown> };
}

export interface EmailScheduledEvent extends BaseEvent {
  type: 'email.scheduled';
  data: { schedule: { scheduledAt: string } };
}

export interface EmailProcessedEvent extends BaseEvent {
  type: 'email.processed';
  data: { processed: Record<string, unknown> };
}

export interface EmailSendingEvent extends BaseEvent {
  type: 'email.sending';
  data: EmailEventData & { sending: Record<string, unknown> };
}

export interface EmailSentEvent extends BaseEvent {
  type: 'email.sent';
  data: EmailEventData & { send: Record<string, unknown> };
}

export interface EmailDeliveredEvent extends BaseEvent {
  type: 'email.delivered';
  data: EmailEventData & {
    delivery: {
      deliveredAt: string;
      recipients: string[];
      smtpResponse: string;
      remoteMtaIp: string;
      reportingMta: string;
      processingTime?: number;
    };
  };
}

export interface EmailOpenedEvent extends BaseEvent {
  type: 'email.opened';
  data: EmailEventData & {
    open: { openedAt: string; userAgent: string };
  };
}

export interface EmailClickedEvent extends BaseEvent {
  type: 'email.clicked';
  data: EmailEventData & {
    click: { clickedAt: string; userAgent: string; link: string };
  };
}

export interface EmailBouncedEvent extends BaseEvent {
  type: 'email.bounced';
  data: EmailEventData & {
    bounce: {
      bounceType: string;
      bounceSubType: string;
      bouncedRecipients: string[];
      bouncedAt: string;
      feedbackId: string;
      reportingMta?: string;
    };
  };
}

export interface EmailComplainedEvent extends BaseEvent {
  type: 'email.complained';
  data: EmailEventData & {
    complaint: {
      complainedAt: string;
      complainedRecipients?: string[];
      complaintSubType?: string;
      complaintFeedbackType?: string;
      feedbackId: string;
    };
  };
}

export interface EmailRejectedEvent extends BaseEvent {
  type: 'email.rejected';
  data: { reject: { reason: string } };
}

export interface EmailDeliveryDelayedEvent extends BaseEvent {
  type: 'email.deliveryDelayed';
  data: EmailEventData & {
    deliveryDelay: {
      delayedAt: string;
      delayType: string;
      delayedRecipients: string[];
    };
  };
}

export interface EmailFailedEvent extends BaseEvent {
  type: 'email.failed';
  data: EmailEventData & { failure: { error: unknown } };
}

export interface MessageReceivedEvent extends BaseEvent {
  type: 'message.received';
  data: {
    orgId: string;
    domainId: string;
    domainName: string;
    inboxId: string;
    threadId: string;
    messageId: string;
    from: string;
    subject: string;
    agentId?: string;
  };
}

export interface MessageSecurityFlaggedEvent extends BaseEvent {
  type: 'message.security.flagged';
  data: MessageReceivedEvent['data'];
}

export interface MessageAgentTriggeredEvent extends BaseEvent {
  type: 'message.agent.triggered';
  data: MessageReceivedEvent['data'];
}

export interface MessageSentEvent extends BaseEvent {
  type: 'message.sent';
  data: MessageReceivedEvent['data'];
}

export interface MessageRejectedEvent extends BaseEvent {
  type: 'message.rejected';
  data: {
    orgId: string;
    domainId: string;
    domainName: string;
    inboxId: string;
    from: string;
    subject: string;
    reason: string;
  };
}

export type WebhookEvent =
  | EmailQueuedEvent
  | EmailScheduledEvent
  | EmailProcessedEvent
  | EmailSendingEvent
  | EmailSentEvent
  | EmailDeliveredEvent
  | EmailOpenedEvent
  | EmailClickedEvent
  | EmailBouncedEvent
  | EmailComplainedEvent
  | EmailRejectedEvent
  | EmailDeliveryDelayedEvent
  | EmailFailedEvent
  | MessageReceivedEvent
  | MessageSecurityFlaggedEvent
  | MessageAgentTriggeredEvent
  | MessageSentEvent
  | MessageRejectedEvent;

export class WebhookVerificationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WebhookVerificationError';
  }
}

export interface VerifyWebhookOptions {
  /** Maximum age of the webhook signature in seconds. Defaults to 5 minutes. */
  tolerance?: number;
}

const DEFAULT_TOLERANCE_SECONDS = 5 * 60;
const SECRET_PREFIX = /^whsec_/;

/**
 * Verify the signature of an incoming Nuntly webhook and return the typed event.
 *
 * The signature header has the form:
 *   `t=<unix-seconds>,v0=<hex-signature>[,v0=<additional-hex-signatures>]`
 *
 * The signing secret may be passed with or without the `whsec_` prefix.
 *
 * @throws {WebhookVerificationError} if the signature is missing, malformed,
 *   too old (older than `tolerance`), or does not match.
 */
export async function verifyWebhook(
  payload: string | Uint8Array,
  signatureHeader: string,
  secret: string,
  options: VerifyWebhookOptions = {},
): Promise<WebhookEvent> {
  if (!signatureHeader) {
    throw new WebhookVerificationError('Missing webhook signature header');
  }
  if (!secret) {
    throw new WebhookVerificationError('Missing webhook signing secret');
  }

  const tolerance = options.tolerance ?? DEFAULT_TOLERANCE_SECONDS;
  const rawKey = secret.replace(SECRET_PREFIX, '');

  const parts = signatureHeader.split(',');
  if (parts.length < 2) {
    throw new WebhookVerificationError('Invalid signature header format');
  }
  const tsPart = parts[0];
  if (!tsPart || !tsPart.startsWith('t=')) {
    throw new WebhookVerificationError('Invalid signature header: missing timestamp');
  }
  const timestamp = tsPart.slice(2);
  const ts = Number(timestamp);
  if (!Number.isFinite(ts)) {
    throw new WebhookVerificationError('Invalid timestamp');
  }
  const age = Math.floor(Date.now() / 1000) - ts;
  if (age > tolerance) {
    throw new WebhookVerificationError('Webhook timestamp is too old');
  }

  const candidates = parts
    .slice(1)
    .filter((s) => s.startsWith('v0='))
    .map((s) => s.slice(3));
  if (candidates.length === 0) {
    throw new WebhookVerificationError('No v0 signature found in header');
  }

  const payloadStr = typeof payload === 'string' ? payload : new TextDecoder().decode(payload);
  const signedContent = `${timestamp}.${payloadStr}`;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(rawKey),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(signedContent));
  const expected = bytesToHex(new Uint8Array(signature));

  const matches = candidates.some((sig) => timingSafeEqual(sig, expected));
  if (!matches) {
    throw new WebhookVerificationError('Webhook signature verification failed');
  }

  return JSON.parse(payloadStr) as WebhookEvent;
}

function bytesToHex(bytes: Uint8Array): string {
  let out = '';
  for (let i = 0; i < bytes.length; i++) {
    out += bytes[i].toString(16).padStart(2, '0');
  }
  return out;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
