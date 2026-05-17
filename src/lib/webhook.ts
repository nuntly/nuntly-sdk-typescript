import type { Event } from '../resources/shared/types.js';

/**
 * Canonical webhook payload union. Identical to `Event` in
 * `resources/shared/types`; kept as an alias for backward compatibility
 * with consumers that import `WebhookEvent` directly. New code can use
 * `Event` (or any of the per-variant types) from `@nuntly/sdk`.
 */
export type WebhookEvent = Event;


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
): Promise<Event> {
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
  if (Math.abs(age) > tolerance) {
    throw new WebhookVerificationError('Webhook timestamp outside tolerance window');
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

  return JSON.parse(payloadStr) as Event;
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
