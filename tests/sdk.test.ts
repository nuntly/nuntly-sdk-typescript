import { afterEach, describe, expect, it } from 'bun:test';
import { getEventListeners } from 'node:events';
import { type AddressInfo, createServer, type Server } from 'node:net';
import { rejectWithCallError } from '../src/core/client';
import type { CreateDomainRequest, CreateEmailRequest, ErrorContext, ReplyMessageRequest } from '../src/index';
import {
  APIConnectionError,
  APIConnectionTimeoutError,
  APIError,
  BadRequestError,
  ConflictError,
  createSafeNuntly,
  InternalServerError,
  NotFoundError,
  Nuntly,
  NuntlyError,
  RateLimitError,
  verifyWebhook,
  WebhookVerificationError,
} from '../src/index';

function mockFetch(handler: (req: Request) => Response | Promise<Response>) {
  return (input: string | Request | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    const method = init?.method ?? 'GET';
    const req = new Request(url, {
      method,
      body: init?.body,
      headers: init?.headers,
    });
    return Promise.resolve(handler(req));
  };
}

function jsonResponse(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  });
}

function createClient(handler: (req: Request) => Response | Promise<Response>) {
  return new Nuntly({
    apiKey: 'test_key',
    baseUrl: 'https://api.test.com',
    fetch: mockFetch(handler) as typeof fetch,
  });
}

// A fetch that resolves only after `delayMs`, but rejects immediately when the
// request signal aborts. Lets us assert what timeout actually fires without
// waiting on the real default.
function delayedFetch(delayMs: number, makeResponse: () => Response) {
  return ((_input: unknown, init?: RequestInit) =>
    new Promise<Response>((resolve, reject) => {
      const signal = init?.signal;
      const timer = setTimeout(() => resolve(makeResponse()), delayMs);
      const onAbort = () => {
        clearTimeout(timer);
        reject(new DOMException('This operation was aborted', 'AbortError'));
      };
      if (signal) {
        if (signal.aborted) return onAbort();
        signal.addEventListener('abort', onAbort, { once: true });
      }
    })) as typeof fetch;
}

const emailPayload: CreateEmailRequest = {
  from: 'hello@example.com',
  to: 'user@example.com',
  subject: 'Welcome to Nuntly',
  html: '<h1>Welcome!</h1>',
};

const domainPayload: CreateDomainRequest = {
  name: 'example.com',
};

const replyPayload: ReplyMessageRequest = {
  replyAll: false,
};

describe('Idempotency-Key on broadcast sends', () => {
  it('generates a key when none is passed, and the body can be omitted', async () => {
    let captured: Request | null = null;
    const nuntly = createClient((req) => {
      captured = req;
      return jsonResponse({ data: { id: 'bc_1', status: 'queued' } });
    });

    await nuntly.broadcasts.send('bc_1');
    expect(captured!.url).toContain('/broadcasts/bc_1/send');
    expect(captured!.headers.get('idempotency-key')).toMatch(/^[0-9a-f-]{36}$/);
  });

  it('sends the key passed in the options', async () => {
    let captured: Request | null = null;
    const nuntly = createClient((req) => {
      captured = req;
      return jsonResponse({ data: { id: 'bc_1', status: 'draft' } });
    });

    await nuntly.broadcasts.create(
      { from: 'updates@acme.com', templateId: 'tpl_1' },
      { idempotencyKey: 'campaign-2026-11' },
    );
    expect(captured!.headers.get('idempotency-key')).toBe('campaign-2026-11');
  });
});

describe('Idempotency-Key from a caller header', () => {
  it('sends only the caller key when its header is in another case', async () => {
    let captured: Headers | undefined;
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      fetch: ((_input: Request, init?: RequestInit) => {
        captured = new Headers(init?.headers);
        return Promise.resolve(jsonResponse({ data: { id: 'em_1', status: 'queued' } }, 202));
      }) as typeof fetch,
    });

    await nuntly.emails.send(emailPayload, { headers: { 'idempotency-key': 'caller-key' } });
    expect(captured?.get('idempotency-key')).toBe('caller-key');
  });
});

describe('HTTP methods and paths', () => {
  it('emails.retrieve calls GET /emails/{id}', async () => {
    let captured: Request | null = null;
    const nuntly = createClient((req) => {
      captured = req;
      return jsonResponse({ data: { id: 'em_123', status: 'delivered' } });
    });

    await nuntly.emails.retrieve('em_123');
    expect(captured!.method).toBe('GET');
    expect(captured!.url).toContain('/emails/em_123');
  });

  it('emails.send calls POST /emails with typed body', async () => {
    let captured: Request | null = null;
    const nuntly = createClient((req) => {
      captured = req;
      return jsonResponse({ data: { id: 'em_456', status: 'queued' } });
    });

    await nuntly.emails.send(emailPayload);
    expect(captured!.method).toBe('POST');
    expect(captured!.url).toContain('/emails');
  });

  it('domains.create calls POST /domains with typed body', async () => {
    let captured: Request | null = null;
    const nuntly = createClient((req) => {
      captured = req;
      return jsonResponse({ data: { id: 'dom_123', name: 'example.com' } });
    });

    await nuntly.domains.create(domainPayload);
    expect(captured!.method).toBe('POST');
    expect(captured!.url).toContain('/domains');
  });

  it('domains.delete calls DELETE /domains/{id}', async () => {
    let captured: Request | null = null;
    const nuntly = createClient((req) => {
      captured = req;
      return jsonResponse({ data: { id: 'dom_123' } });
    });

    await nuntly.domains.delete('dom_123');
    expect(captured!.method).toBe('DELETE');
    expect(captured!.url).toContain('/domains/dom_123');
  });

  it('messages.reply calls POST /messages/{id}/reply', async () => {
    let captured: Request | null = null;
    const nuntly = createClient((req) => {
      captured = req;
      return jsonResponse({
        data: {
          id: 'msg_1',
          threadId: 't_1',
          messageId: 'm_1',
          subject: 'Re: Hi',
        },
      });
    });

    await nuntly.messages.reply('msg_123', replyPayload);
    expect(captured!.method).toBe('POST');
    expect(captured!.url).toContain('/messages/msg_123/reply');
  });

  it('webhooks.events.replay calls POST /webhooks/{id}/events/{eventId}/replay', async () => {
    let captured: Request | null = null;
    const nuntly = createClient((req) => {
      captured = req;
      return new Response(null, { status: 204 });
    });

    await nuntly.webhooks.events.replay('wh_1', 'evt_1');
    expect(captured!.method).toBe('POST');
    expect(captured!.url).toContain('/webhooks/wh_1/events/evt_1/replay');
  });
});

describe('Response unwrapping', () => {
  it('unwraps { data: T } envelope from GET response', async () => {
    const nuntly = createClient(() =>
      jsonResponse({
        data: {
          id: 'em_1',
          orgId: 'org_1',
          status: 'delivered',
          from: 'a@b.com',
        },
      }),
    );

    const email = await nuntly.emails.retrieve('em_1');
    expect(email.id).toBe('em_1');
    expect(email.status).toBe('delivered');
  });

  it('unwraps { data: T } envelope from POST response', async () => {
    const nuntly = createClient(() => jsonResponse({ data: { id: 'em_2', status: 'queued' } }));

    const result = await nuntly.emails.send(emailPayload);
    expect(result.id).toBe('em_2');
    expect(result.status).toBe('queued');
  });
});

describe('Error hierarchy', () => {
  it('throws NotFoundError on 404', async () => {
    const nuntly = createClient(() => jsonResponse({ message: 'Email not found' }, 404));

    await expect(nuntly.emails.retrieve('nope')).rejects.toThrow(NotFoundError);
  });

  it('throws BadRequestError on 400 with structured body', async () => {
    const nuntly = createClient(() =>
      jsonResponse(
        {
          error: {
            status: 400,
            code: 'invalid_body',
            title: 'The body is invalid',
            details: "The field 'to' is invalid or missing.",
          },
        },
        400,
      ),
    );

    try {
      await nuntly.emails.send(emailPayload);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestError);
      const err = e as BadRequestError;
      expect(err.status).toBe(400);
      expect(err.title).toBe('The body is invalid');
      expect(err.code).toBe('invalid_body');
      expect(err.details).toBe("The field 'to' is invalid or missing.");
    }
  });

  it('throws RateLimitError on 429 with retryAfter', async () => {
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      maxRetries: 0,
      fetch: mockFetch(() =>
        jsonResponse({ error: { status: 429, code: 'rate_limit', title: 'Too many requests' } }, 429, {
          'retry-after': '30',
        }),
      ) as typeof fetch,
    });

    try {
      await nuntly.emails.list();
    } catch (e) {
      expect(e).toBeInstanceOf(RateLimitError);
      expect((e as RateLimitError).retryAfter).toBe(30000);
    }
  });

  it('includes requestId from x-request-id header', async () => {
    const nuntly = createClient(() =>
      jsonResponse({ message: 'Not found' }, 404, {
        'x-request-id': 'req_abc123',
      }),
    );

    try {
      await nuntly.emails.retrieve('nope');
    } catch (e) {
      expect((e as NotFoundError).requestId).toBe('req_abc123');
    }
  });
});

describe('Safe mode', () => {
  it('returns { data, error: null } on success', async () => {
    const nuntly = createSafeNuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      fetch: mockFetch(() => jsonResponse({ data: { id: 'em_1', status: 'delivered' } })) as typeof fetch,
    });

    const result = await nuntly.emails.retrieve('em_1');
    expect(result.data).toBeDefined();
    expect(result.error).toBeNull();
    expect(result.data!.id).toBe('em_1');
  });

  it('returns { data: null, error } on failure', async () => {
    const nuntly = createSafeNuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      fetch: mockFetch(() =>
        jsonResponse({ error: { status: 404, code: 'not_found', title: 'Not found' } }, 404),
      ) as typeof fetch,
    });

    const result = await nuntly.emails.retrieve('nope');
    expect(result.data).toBeNull();
    expect(result.error).toBeDefined();
    expect(result.error!.status).toBe(404);
  });
});

describe('Safe mode with a failing hook', () => {
  const hookClient = (thrown: unknown, safeMode: boolean) => {
    const options = {
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      fetch: mockFetch(() => jsonResponse({ data: { id: 'em_1' } })) as typeof fetch,
      hooks: {
        onRequest: () => {
          throw thrown;
        },
      },
    };
    return safeMode ? createSafeNuntly(options) : new Nuntly(options);
  };

  it('wraps a plain Error thrown by a hook in a NuntlyError whose cause is that Error', async () => {
    const thrown = new Error('quota exceeded');
    const result = await (hookClient(thrown, true) as ReturnType<typeof createSafeNuntly>).emails.retrieve('em_1');
    expect(result.data).toBeNull();
    expect(result.error).toBeInstanceOf(NuntlyError);
    expect((result.error as NuntlyError).message).toBe('quota exceeded');
    expect((result.error as NuntlyError).cause).toBe(thrown);
  });

  it('wraps any other thrown value with String(value) as the message', async () => {
    for (const thrown of ['quota exceeded', 42]) {
      const result = await (hookClient(thrown, true) as ReturnType<typeof createSafeNuntly>).emails.retrieve('em_1');
      expect((result.error as NuntlyError).message).toBe(String(thrown));
      expect((result.error as NuntlyError).cause).toBe(thrown);
    }
  });

  it('wraps a value whose String() throws, such as a null-prototype object', async () => {
    const thrown = Object.create(null);
    const result = await (hookClient(thrown, true) as ReturnType<typeof createSafeNuntly>).emails.retrieve('em_1');
    expect(result.data).toBeNull();
    expect(result.error).toBeInstanceOf(NuntlyError);
    expect((result.error as NuntlyError).cause).toBe(thrown);
  });

  it('passes a NuntlyError subclass thrown by a hook unchanged', async () => {
    const thrown = new APIConnectionError('proxy refused');
    const result = await (hookClient(thrown, true) as ReturnType<typeof createSafeNuntly>).emails.retrieve('em_1');
    expect(result.error).toBe(thrown);
  });

  it('forwards the hook value unchanged outside safe mode', async () => {
    const thrown = { reason: 'quota' };
    const error = await (hookClient(thrown, false) as Nuntly).emails.retrieve('em_1').catch((e: unknown) => e);
    expect(error).toBe(thrown);
  });
});

describe('Pagination', () => {
  it('list returns CursorPage with data and nextCursor', async () => {
    const nuntly = createClient(() =>
      jsonResponse({
        data: [{ id: 'em_1' }, { id: 'em_2' }],
        nextCursor: 'cursor_abc',
      }),
    );

    const page = await nuntly.emails.list();
    expect(page.data).toHaveLength(2);
    expect(page.nextCursor).toBe('cursor_abc');
    expect(page.hasNextPage()).toBe(true);
  });

  it('list with no more pages returns hasNextPage false', async () => {
    const nuntly = createClient(() => jsonResponse({ data: [{ id: 'em_1' }], nextCursor: null }));

    const page = await nuntly.emails.list();
    expect(page.hasNextPage()).toBe(false);
  });

  it('auto-pagination iterates all items across pages', async () => {
    let callCount = 0;
    const nuntly = createClient((req) => {
      callCount++;
      const url = new URL(req.url);
      const cursor = url.searchParams.get('cursor');
      if (!cursor) {
        return jsonResponse({ data: [{ id: 'em_1' }], nextCursor: 'page2' });
      }
      return jsonResponse({ data: [{ id: 'em_2' }], nextCursor: null });
    });

    const page = await nuntly.emails.list();
    const items: unknown[] = [];
    for await (const item of page) {
      items.push(item);
    }
    expect(items).toHaveLength(2);
    expect(callCount).toBe(2);
  });

  it('for await directly on list() result auto-paginates', async () => {
    // Regression: previously `client.emails.list()` was `async` and returned
    // a bare `Promise<CursorPage>`, which made `for await (const x of list())`
    // silently yield nothing. `PagePromise` makes the call site work without
    // an extra `await`.
    let callCount = 0;
    const nuntly = createClient((req) => {
      callCount++;
      const url = new URL(req.url);
      const cursor = url.searchParams.get('cursor');
      if (!cursor) {
        return jsonResponse({ data: [{ id: 'em_1' }], nextCursor: 'page2' });
      }
      return jsonResponse({ data: [{ id: 'em_2' }], nextCursor: null });
    });

    const items: unknown[] = [];
    for await (const item of nuntly.emails.list({ limit: 1 })) {
      items.push(item);
    }
    expect(items).toHaveLength(2);
    expect(callCount).toBe(2);
  });

  it('list() result supports .withResponse() like APIPromise', async () => {
    const nuntly = createClient(() => jsonResponse({ data: [{ id: 'em_1' }], nextCursor: null }));

    const { data: page, response } = await nuntly.emails.list().withResponse();
    expect(page.data).toHaveLength(1);
    expect(response.status).toBe(200);
  });
});

describe('Auth and headers', () => {
  it('sends Authorization Bearer header', async () => {
    let captured: Request | null = null;
    const nuntly = createClient((req) => {
      captured = req;
      return jsonResponse({ data: {} });
    });

    await nuntly.emails.retrieve('em_1');
    expect(captured!.headers.get('authorization')).toBe('Bearer test_key');
  });

  it('sends User-Agent header', async () => {
    let captured: Request | null = null;
    const nuntly = createClient((req) => {
      captured = req;
      return jsonResponse({ data: {} });
    });

    await nuntly.emails.retrieve('em_1');
    expect(captured!.headers.get('user-agent')).toMatch(/^@nuntly\/sdk\/[\w.+-]+ /);
  });

  describe('without constructor options', () => {
    const env = { ...process.env };
    const originalFetch = globalThis.fetch;

    afterEach(() => {
      process.env = { ...env };
      globalThis.fetch = originalFetch;
    });

    it('reads the API key from NUNTLY_API_KEY', async () => {
      process.env.NUNTLY_API_KEY = 'env_key';
      process.env.NUNTLY_BASE_URL = 'https://api.test.com';
      let captured: Request | null = null;
      globalThis.fetch = mockFetch((req) => {
        captured = req;
        return jsonResponse({ data: {} });
      }) as typeof fetch;

      await new Nuntly().emails.retrieve('em_1');
      expect(captured!.headers.get('authorization')).toBe('Bearer env_key');
    });

    it('createSafeNuntly() reads the API key from NUNTLY_API_KEY', async () => {
      process.env.NUNTLY_API_KEY = 'env_key';
      process.env.NUNTLY_BASE_URL = 'https://api.test.com';
      let captured: Request | null = null;
      globalThis.fetch = mockFetch((req) => {
        captured = req;
        return jsonResponse({ data: { id: 'em_1' } });
      }) as typeof fetch;

      // The tests are not type-checked: a parameter with a default does not count in length.
      expect(createSafeNuntly.length).toBe(0);
      const { data } = await createSafeNuntly().emails.retrieve('em_1');
      expect(data?.id).toBe('em_1');
      expect(captured!.headers.get('authorization')).toBe('Bearer env_key');
    });

    it('throws the missing key error when NUNTLY_API_KEY is unset', () => {
      delete process.env.NUNTLY_API_KEY;
      expect(() => new Nuntly()).toThrow('API key is required');
    });
  });
});

describe('Webhook verification', () => {
  // The signing secret may include or omit the `whsec_` prefix. Strip it
  // before HMAC, which is what the production webhook delivery service does.
  async function signWithRawKey(payload: string, timestamp: string, rawKey: string): Promise<string> {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey('raw', encoder.encode(rawKey), { name: 'HMAC', hash: 'SHA-256' }, false, [
      'sign',
    ]);
    const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(`${timestamp}.${payload}`));
    return Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  async function buildHeader(payload: string, secret: string, ts?: number): Promise<string> {
    const timestamp = String(ts ?? Math.floor(Date.now() / 1000));
    const rawKey = secret.replace(/^whsec_/, '');
    const sig = await signWithRawKey(payload, timestamp, rawKey);
    return `t=${timestamp},v0=${sig}`;
  }

  const secret = 'whsec_test_secret';
  const eventPayload = JSON.stringify({
    id: 'evt_1',
    createdAt: '2026-03-29T00:00:00Z',
    type: 'email.delivered',
    data: {
      id: 'em_1',
      orgId: 'org_1',
      messageId: 'msg_1',
      sentAt: '2026-03-29T00:00:00Z',
      enqueuedAt: '2026-03-29T00:00:00Z',
      domainName: 'example.com',
      domainId: 'dom_1',
      from: 'hello@example.com',
      to: 'user@example.com',
      subject: 'Hello',
      delivery: {
        deliveredAt: '2026-03-29T00:00:01Z',
        recipients: ['user@example.com'],
        smtpResponse: '250 OK',
        remoteMtaIp: '1.2.3.4',
        reportingMta: 'mx.example.com',
      },
    },
  });

  it('verifies a valid signature and returns the typed event', async () => {
    const header = await buildHeader(eventPayload, secret);
    const event = await verifyWebhook(eventPayload, header, secret);
    expect(event.type).toBe('email.delivered');
    expect(event.id).toBe('evt_1');
    if (event.type === 'email.delivered') {
      expect(event.data.delivery.recipients).toContain('user@example.com');
    }
  });

  it('returns a payload of a type no webhook subscribes to as parsed', async () => {
    const internalPayload = JSON.stringify({
      id: 'evt_2',
      createdAt: '2026-03-29T00:00:00Z',
      type: 'email.queued',
      data: { queue: {} },
    });
    const header = await buildHeader(internalPayload, secret);
    const event = await verifyWebhook(internalPayload, header, secret);
    expect(event).toEqual(JSON.parse(internalPayload));
  });

  it('accepts the secret without the whsec_ prefix', async () => {
    const header = await buildHeader(eventPayload, secret);
    const event = await verifyWebhook(eventPayload, header, 'test_secret');
    expect(event.type).toBe('email.delivered');
  });

  describe('secret rotation (header t=<ts>,v0=<sigNew>,<sigOld>)', () => {
    const newSecret = 'whsec_new_secret';
    const oldSecret = 'whsec_old_secret';

    async function rotationHeader(ts: number): Promise<string> {
      const t = String(ts);
      const sigNew = await signWithRawKey(eventPayload, t, 'new_secret');
      const sigOld = await signWithRawKey(eventPayload, t, 'old_secret');
      return `t=${t},v0=${sigNew},${sigOld}`;
    }

    it('verifies with the old secret', async () => {
      const header = await rotationHeader(Math.floor(Date.now() / 1000));
      const event = await verifyWebhook(eventPayload, header, oldSecret);
      expect(event.type).toBe('email.delivered');
    });

    it('verifies with the new secret', async () => {
      const header = await rotationHeader(Math.floor(Date.now() / 1000));
      const event = await verifyWebhook(eventPayload, header, newSecret);
      expect(event.type).toBe('email.delivered');
    });

    it('accepts a v0= prefix on every signature', async () => {
      const ts = String(Math.floor(Date.now() / 1000));
      const sigNew = await signWithRawKey(eventPayload, ts, 'new_secret');
      const sigOld = await signWithRawKey(eventPayload, ts, 'old_secret');
      const header = `t=${ts},v0=${sigNew},v0=${sigOld}`;
      const event = await verifyWebhook(eventPayload, header, oldSecret);
      expect(event.type).toBe('email.delivered');
    });

    it('rejects when no signature matches', async () => {
      const header = await rotationHeader(Math.floor(Date.now() / 1000));
      await expect(verifyWebhook(eventPayload, header, 'whsec_other_secret')).rejects.toThrow(
        'Webhook signature verification failed',
      );
    });
  });

  it('rejects an invalid signature', async () => {
    const ts = String(Math.floor(Date.now() / 1000));
    const header = `t=${ts},v0=deadbeef`;
    await expect(verifyWebhook(eventPayload, header, secret)).rejects.toThrow(WebhookVerificationError);
  });

  it('rejects an expired timestamp (default 5 min tolerance)', async () => {
    const old = Math.floor(Date.now() / 1000) - 10 * 60;
    const header = await buildHeader(eventPayload, secret, old);
    await expect(verifyWebhook(eventPayload, header, secret)).rejects.toThrow('outside tolerance window');
  });

  it('rejects a future timestamp (replay attack guard)', async () => {
    const future = Math.floor(Date.now() / 1000) + 10 * 60;
    const header = await buildHeader(eventPayload, secret, future);
    await expect(verifyWebhook(eventPayload, header, secret)).rejects.toThrow('outside tolerance window');
  });

  it('rejects a malformed signature header (no t= part)', async () => {
    await expect(verifyWebhook(eventPayload, 'v0=deadbeef,v0=cafebabe', secret)).rejects.toThrow(
      WebhookVerificationError,
    );
  });

  it('rejects a header with no v0 signature', async () => {
    const ts = String(Math.floor(Date.now() / 1000));
    await expect(verifyWebhook(eventPayload, `t=${ts},v1=deadbeef`, secret)).rejects.toThrow('No v0 signature');
  });

  it('respects a custom tolerance', async () => {
    const old = Math.floor(Date.now() / 1000) - 60;
    const header = await buildHeader(eventPayload, secret, old);
    // 30s tolerance: 60s old should fail
    await expect(verifyWebhook(eventPayload, header, secret, { tolerance: 30 })).rejects.toThrow(
      'outside tolerance window',
    );
    // 120s tolerance: 60s old should pass
    const event = await verifyWebhook(eventPayload, header, secret, { tolerance: 120 });
    expect(event.type).toBe('email.delivered');
  });
});

describe('Safe mode on nested resources', () => {
  it('safe mode works on nested sub-resources', async () => {
    const nuntly = createSafeNuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      fetch: mockFetch(() => jsonResponse({ data: [{ id: 'evt_1' }], nextCursor: null })) as typeof fetch,
    });

    const result = await nuntly.webhooks.events.list();
    expect(result.data).toBeDefined();
    expect(result.error).toBeNull();
  });
});

describe('Abort signal', () => {
  it('passes abort signal to fetch', async () => {
    let capturedSignal: AbortSignal | undefined;
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      fetch: ((input: Request, init?: RequestInit) => {
        capturedSignal = init?.signal ?? (input as Request).signal;
        return Promise.resolve(jsonResponse({ data: {} }));
      }) as typeof fetch,
    });

    const controller = new AbortController();
    await nuntly.emails.retrieve('em_1', { signal: controller.signal });
    expect(capturedSignal?.aborted).toBe(false);

    controller.abort();
    expect(capturedSignal?.aborted).toBe(true);
  });

  it('forwards the caller signal on a runtime without AbortSignal.any (Node.js before 20.3)', async () => {
    const any = AbortSignal.any;
    // @ts-expect-error simulating an older runtime
    delete AbortSignal.any;
    try {
      let capturedSignal: AbortSignal | undefined;
      const nuntly = new Nuntly({
        apiKey: 'test_key',
        baseUrl: 'https://api.test.com',
        fetch: ((_input: Request, init?: RequestInit) => {
          capturedSignal = init?.signal ?? undefined;
          return Promise.resolve(jsonResponse({ data: {} }));
        }) as typeof fetch,
      });

      const controller = new AbortController();
      await nuntly.emails.retrieve('em_1', { signal: controller.signal });
      expect(capturedSignal?.aborted).toBe(false);

      controller.abort();
      expect(capturedSignal?.aborted).toBe(true);
    } finally {
      AbortSignal.any = any;
    }
  });

  it('drops its listeners from the caller signal once the timeout fires (Node.js before 20.3)', async () => {
    const any = AbortSignal.any;
    // @ts-expect-error simulating an older runtime
    delete AbortSignal.any;
    try {
      let attemptSignal: AbortSignal | undefined;
      const nuntly = new Nuntly({
        apiKey: 'test_key',
        baseUrl: 'https://api.test.com',
        timeout: 20,
        fetch: ((_input: Request, init?: RequestInit) => {
          attemptSignal = init?.signal ?? undefined;
          return Promise.resolve(jsonResponse({ data: {} }));
        }) as typeof fetch,
      });

      const controller = new AbortController();
      await nuntly.emails.retrieve('em_1', { signal: controller.signal });
      expect(getEventListeners(controller.signal, 'abort').length).toBe(1);

      const signal = attemptSignal;
      if (!signal) throw new Error('fetch received no signal');
      if (!signal.aborted) await new Promise((resolve) => signal.addEventListener('abort', resolve, { once: true }));
      expect(getEventListeners(controller.signal, 'abort').length).toBe(0);
    } finally {
      AbortSignal.any = any;
    }
  });
});

// Guards the defaults a customer hit on an older release: a hardcoded 150ms
// per-request timeout on send() and a non-overridable maxRetries of 0.
describe('Default timeout and retries', () => {
  it('send() does not impose a short per-request timeout', async () => {
    // No client-level timeout -> default (60s). A ~200ms response must not
    // abort, which it would under the old 150ms send() default.
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      fetch: delayedFetch(200, () => jsonResponse({ data: { id: 'em_1', status: 'queued' } })),
    });

    const email = await nuntly.emails.send(emailPayload);
    expect(email.id).toBe('em_1');
  });

  it('honors a client-level timeout and exposes the abort cause', async () => {
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      timeout: 25,
      retry: 'none',
      fetch: delayedFetch(200, () => jsonResponse({ data: {} })),
    });

    try {
      await nuntly.emails.send(emailPayload);
      throw new Error('expected a timeout');
    } catch (e) {
      expect(e).toBeInstanceOf(APIConnectionTimeoutError);
      expect((e as APIConnectionTimeoutError).cause).toBeDefined();
    }
  });

  for (const timeout of [0, Number.POSITIVE_INFINITY]) {
    it(`attaches no timeout when timeout is ${timeout}`, async () => {
      const fetch = delayedFetch(30, () => jsonResponse({ data: { id: 'em_1' } }));
      const nuntly = new Nuntly({ apiKey: 'test_key', baseUrl: 'https://api.test.com', timeout, retry: 'none', fetch });

      expect((await nuntly.emails.retrieve('em_1')).id).toBe('em_1');
      expect((await nuntly.withOptions({ timeout: 25 }).emails.retrieve('em_1', { timeout })).id).toBe('em_1');
    });
  }

  for (const timeout of [-1, Number.NaN, Number.NEGATIVE_INFINITY]) {
    it(`refuses a timeout of ${timeout}`, async () => {
      let calls = 0;
      const fetch = (() => {
        calls++;
        return Promise.resolve(jsonResponse({ data: { id: 'em_1' } }));
      }) as typeof globalThis.fetch;
      expect(() => new Nuntly({ apiKey: 'test_key', timeout, fetch })).toThrow(NuntlyError);

      const nuntly = new Nuntly({ apiKey: 'test_key', baseUrl: 'https://api.test.com', fetch });
      await expect(nuntly.emails.retrieve('em_1', { timeout })).rejects.toThrow(NuntlyError);
      expect(calls).toBe(0);
    });
  }

  it('treats a timeout above 2147483647 as no timeout, like Infinity', async () => {
    const timeoutOf = AbortSignal.timeout;
    let timers = 0;
    AbortSignal.timeout = (ms: number) => {
      timers++;
      return timeoutOf.call(AbortSignal, ms);
    };
    try {
      const fetch = delayedFetch(30, () => jsonResponse({ data: { id: 'em_1' } }));
      const nuntly = new Nuntly({
        apiKey: 'test_key',
        baseUrl: 'https://api.test.com',
        timeout: 2 ** 31,
        retry: 'none',
        fetch,
      });
      expect((await nuntly.emails.retrieve('em_1')).id).toBe('em_1');
      expect((await nuntly.emails.retrieve('em_1', { timeout: 1e12 })).id).toBe('em_1');
      expect(timers).toBe(0);
    } finally {
      AbortSignal.timeout = timeoutOf;
    }
  });

  it('rounds a fractional timeout up to whole milliseconds and accepts the largest one', async () => {
    const timeoutOf = AbortSignal.timeout;
    const received: number[] = [];
    AbortSignal.timeout = (ms: number) => {
      received.push(ms);
      return timeoutOf.call(AbortSignal, Math.ceil(ms));
    };
    try {
      const fetch = delayedFetch(1, () => jsonResponse({ data: { id: 'em_1' } }));
      const nuntly = new Nuntly({ apiKey: 'test_key', baseUrl: 'https://api.test.com', retry: 'none', fetch });
      await nuntly.emails.retrieve('em_1', { timeout: 300.00000000000006 });
      await nuntly.emails.retrieve('em_1', { timeout: 2 ** 31 - 1 });
      expect(received).toEqual([301, 2 ** 31 - 1]);
    } finally {
      AbortSignal.timeout = timeoutOf;
    }
  });

  it('retries send() at the client-configured maxRetries', async () => {
    let attempt = 0;
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      maxRetries: 2,
      retry: {
        strategy: 'backoff',
        backoff: { initialInterval: 1, maxInterval: 1, exponent: 1 },
      },
      fetch: mockFetch(() => {
        attempt++;
        if (attempt < 3) return jsonResponse({ message: 'Internal error' }, 500);
        return jsonResponse({ data: { id: 'em_1', status: 'queued' } });
      }) as typeof fetch,
    });

    const email = await nuntly.emails.send(emailPayload);
    expect(email.id).toBe('em_1');
    expect(attempt).toBe(3);
  });

  it('surfaces a connection failure without masking its cause', async () => {
    // A failed request (no response) must not be swallowed by an internal
    // TypeError in the response handler; the original cause must survive.
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      retry: 'none',
      fetch: (() => Promise.reject(new TypeError('network down'))) as typeof fetch,
    });

    try {
      await nuntly.emails.send(emailPayload);
      throw new Error('expected a connection error');
    } catch (e) {
      expect(e).toBeInstanceOf(APIConnectionError);
      expect((e as Error).message).not.toContain('response.headers');
      expect((e as APIConnectionError).cause).toBeDefined();
    }
  });

  it('does not retry send() when maxRetries is 0', async () => {
    let attempt = 0;
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      maxRetries: 0,
      fetch: mockFetch(() => {
        attempt++;
        return jsonResponse({ message: 'Internal error' }, 500);
      }) as typeof fetch,
    });

    await expect(nuntly.emails.send(emailPayload)).rejects.toThrow();
    expect(attempt).toBe(1);
  });
});

describe('Retry behavior', () => {
  it('retries on 500 and succeeds on second attempt', async () => {
    let attempt = 0;
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      maxRetries: 1,
      fetch: mockFetch(() => {
        attempt++;
        if (attempt === 1) return jsonResponse({ message: 'Internal error' }, 500);
        return jsonResponse({ data: { id: 'em_1' } });
      }) as typeof fetch,
    });

    const email = await nuntly.emails.retrieve('em_1');
    expect(email.id).toBe('em_1');
    expect(attempt).toBe(2);
  });

  it('retryStrategy "none" disables retries', async () => {
    let attempt = 0;
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      retry: 'none',
      fetch: mockFetch(() => {
        attempt++;
        return jsonResponse({ message: 'Internal error' }, 500);
      }) as typeof fetch,
    });

    await expect(nuntly.emails.retrieve('em_1')).rejects.toThrow();
    expect(attempt).toBe(1);
  });

  it('accepts custom backoff config', async () => {
    let attempt = 0;
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      maxRetries: 1,
      retry: {
        strategy: 'backoff',
        backoff: { initialInterval: 1, maxInterval: 10, exponent: 1 },
      },
      fetch: mockFetch(() => {
        attempt++;
        if (attempt === 1) return jsonResponse({ message: 'error' }, 500);
        return jsonResponse({ data: { id: 'em_1' } });
      }) as typeof fetch,
    });

    const email = await nuntly.emails.retrieve('em_1');
    expect(email.id).toBe('em_1');
    expect(attempt).toBe(2);
  });
});

describe('Hooks', () => {
  it('onRequest receives a structured RequestContext', async () => {
    const calls: Array<{ method: string; path: string }> = [];
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      fetch: mockFetch(() => jsonResponse({ data: { id: 'em_1' } })) as typeof fetch,
      hooks: {
        onRequest: (ctx) => {
          calls.push({ method: ctx.method, path: ctx.path });
        },
      },
    });

    await nuntly.emails.retrieve('em_1');
    expect(calls).toEqual([{ method: 'GET', path: '/emails/em_1' }]);
  });

  it('path params are URL-encoded at runtime', async () => {
    let capturedUrl: string | undefined;
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      fetch: mockFetch((req) => {
        capturedUrl = req.url;
        return jsonResponse({ data: { id: 'em_1' } });
      }) as typeof fetch,
    });

    await nuntly.emails.retrieve('em with space');
    expect(capturedUrl).toContain('/emails/em%20with%20space');
  });

  it('onResponse fires on success with both request and response', async () => {
    let capturedReqPath: string | undefined;
    let capturedStatus: number | undefined;
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      fetch: mockFetch(() => jsonResponse({ data: {} }, 200)) as typeof fetch,
      hooks: {
        onResponse: (ctx) => {
          capturedReqPath = ctx.request.path;
          capturedStatus = ctx.response.status;
        },
      },
    });

    await nuntly.emails.retrieve('em_1');
    expect(capturedReqPath).toBe('/emails/em_1');
    expect(capturedStatus).toBe(200);
  });

  it('resolves the call when onResponse reads the body', async () => {
    let hookBody: unknown;
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      fetch: mockFetch(() => jsonResponse({ data: { id: 'em_1' } })) as typeof fetch,
      hooks: {
        onResponse: async (ctx) => {
          hookBody = await ctx.response.json();
        },
      },
    });

    const { data, response } = await nuntly.emails.retrieve('em_1').withResponse();
    expect(data.id).toBe('em_1');
    expect(hookBody).toEqual({ data: { id: 'em_1' } });
    expect(await response.json()).toEqual({ data: { id: 'em_1' } });
  });

  describe('response cloning', () => {
    const clone = Response.prototype.clone;
    let clones = 0;
    afterEach(() => {
      Response.prototype.clone = clone;
    });
    function countClones() {
      clones = 0;
      Response.prototype.clone = function (this: Response) {
        clones++;
        return clone.call(this);
      };
    }

    it('clones no response when no second reader needs the body', async () => {
      const nuntly = createClient(() => jsonResponse({ data: { id: 'em_1' } }));
      countClones();

      expect((await nuntly.emails.retrieve('em_1')).id).toBe('em_1');
      expect((await nuntly.emails.list({ limit: 1 })).data).toBeDefined();
      expect(clones).toBe(0);
    });

    it('clones a response once for withResponse()', async () => {
      const nuntly = createClient(() => jsonResponse({ data: { id: 'em_1' } }));
      countClones();

      const { response } = await nuntly.emails.retrieve('em_1').withResponse();
      expect(await response.json()).toEqual({ data: { id: 'em_1' } });
      expect(clones).toBe(1);
    });

    it('still gives a readable response to a late asResponse()', async () => {
      const nuntly = createClient(() => jsonResponse({ message: 'missing' }, 404));
      countClones();

      const call = nuntly.emails.retrieve('em_1');
      await expect(call).rejects.toThrow(NotFoundError);
      const response = await call.asResponse();
      expect(response.status).toBe(404);
      expect(await response.json()).toEqual({ message: 'missing' });
      expect(clones).toBe(0);
    });
  });

  it('rejects a late asResponse() with the error of a body read that failed', async () => {
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      retry: 'none',
      fetch: (() => {
        const body = new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(new TextEncoder().encode('{"data":'));
            controller.error(new TypeError('terminated'));
          },
        });
        return Promise.resolve(new Response(body, { status: 200 }));
      }) as typeof fetch,
    });

    const call = nuntly.emails.retrieve('em_1');
    const error = await call.catch((e: unknown) => e);
    expect(error).toBeInstanceOf(APIConnectionError);
    await expect(call.asResponse()).rejects.toBe(error);
    await expect(call.withResponse()).rejects.toBe(error);
  });

  it('drops the encoding and length headers from a copy built from the decoded body', async () => {
    const nuntly = createClient(() =>
      jsonResponse({ data: { id: 'em_1' } }, 200, {
        'content-encoding': 'gzip',
        'content-length': '999',
        'x-request-id': 'req_1',
      }),
    );

    const call = nuntly.emails.retrieve('em_1');
    await call;
    const response = await call.asResponse();
    expect(response.headers.get('content-encoding')).toBeNull();
    expect(response.headers.get('content-length')).toBeNull();
    expect(response.headers.get('x-request-id')).toBe('req_1');
    expect(await response.json()).toEqual({ data: { id: 'em_1' } });
  });

  describe('rejectWithCallError', () => {
    it('rejects with the call error when the call fails', async () => {
      const callError = new APIConnectionError('reset');
      const reason = await new Promise((reject) =>
        rejectWithCallError(Promise.reject(callError), new Error('read'), reject),
      );
      expect(reason).toBe(callError);
    });

    it('still rejects, with the read error, when the call succeeds', async () => {
      const readError = new Error('read');
      const reason = await new Promise((reject) => rejectWithCallError(Promise.resolve({}), readError, reject));
      expect(reason).toBe(readError);
    });
  });

  it('gives an API error a raw response whose body is readable', async () => {
    const nuntly = createClient(() => jsonResponse({ error: { code: 'not_found', title: 'Not found' } }, 404));

    const error = await nuntly.emails.retrieve('em_1').catch((e: unknown) => e);
    expect(error).toBeInstanceOf(NotFoundError);
    expect(await (error as NotFoundError).rawResponse?.json()).toEqual({
      error: { code: 'not_found', title: 'Not found' },
    });
  });

  it('gives onSuccess a response whose body is readable', async () => {
    let hookBody: unknown;
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      fetch: mockFetch(() => jsonResponse({ data: { id: 'em_1' } })) as typeof fetch,
      hooks: {
        onSuccess: async (ctx) => {
          hookBody = await ctx.response.json();
        },
      },
    });

    expect((await nuntly.emails.retrieve('em_1')).id).toBe('em_1');
    expect(hookBody).toEqual({ data: { id: 'em_1' } });
  });

  describe('a response requested after the headers, before the call settles', () => {
    for (const hook of ['onResponse', 'onSuccess'] as const) {
      it(`is readable when requested from ${hook}`, async () => {
        let pending: Promise<Response> | undefined;
        let call: ReturnType<Nuntly['emails']['retrieve']> | undefined;
        const nuntly = new Nuntly({
          apiKey: 'test_key',
          baseUrl: 'https://api.test.com',
          fetch: mockFetch(() => jsonResponse({ data: { id: 'em_1' } })) as typeof fetch,
          hooks: {
            [hook]: () => {
              pending = call?.asResponse();
            },
          },
        });

        call = nuntly.emails.retrieve('em_1');
        expect((await call).id).toBe('em_1');
        const response = await pending;
        expect(response?.status).toBe(200);
        expect(await response?.json()).toEqual({ data: { id: 'em_1' } });
      });
    }
  });

  it('onResponse also fires on 4xx (alongside onError)', async () => {
    let responseFired = false;
    let errorFired = false;
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      retry: 'none',
      fetch: mockFetch(() =>
        jsonResponse({ error: { status: 404, code: 'not_found', title: 'Not found' } }, 404),
      ) as typeof fetch,
      hooks: {
        onResponse: () => {
          responseFired = true;
        },
        onError: () => {
          errorFired = true;
        },
      },
    });

    await expect(nuntly.emails.retrieve('em_1')).rejects.toThrow();
    expect(responseFired).toBe(true);
    expect(errorFired).toBe(true);
  });

  it('onSuccess fires only on 2xx and receives parsed data', async () => {
    let successCalls = 0;
    let capturedData: unknown;
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      retry: 'none',
      fetch: mockFetch(() => jsonResponse({ data: { id: 'em_1', status: 'delivered' } })) as typeof fetch,
      hooks: {
        onSuccess: (ctx) => {
          successCalls++;
          capturedData = ctx.data;
        },
      },
    });

    await nuntly.emails.retrieve('em_1');
    expect(successCalls).toBe(1);
    expect(capturedData).toEqual({ data: { id: 'em_1', status: 'delivered' } });
  });

  it('onSuccess does NOT fire on 4xx', async () => {
    let successCalls = 0;
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      retry: 'none',
      fetch: mockFetch(() =>
        jsonResponse({ error: { status: 404, code: 'not_found', title: 'Not found' } }, 404),
      ) as typeof fetch,
      hooks: {
        onSuccess: () => {
          successCalls++;
        },
      },
    });

    await expect(nuntly.emails.retrieve('em_1')).rejects.toThrow();
    expect(successCalls).toBe(0);
  });

  it('onError receives APIError for HTTP errors with response set', async () => {
    let capturedCtx: { request?: unknown; response?: Response; error?: unknown } = {};
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      retry: 'none',
      fetch: mockFetch(() =>
        jsonResponse({ error: { status: 404, code: 'not_found', title: 'Not found' } }, 404),
      ) as typeof fetch,
      hooks: {
        onError: (ctx) => {
          capturedCtx = ctx;
        },
      },
    });

    await expect(nuntly.emails.retrieve('em_1')).rejects.toThrow(NotFoundError);
    expect(capturedCtx.error).toBeInstanceOf(NotFoundError);
    expect(capturedCtx.response).toBeInstanceOf(Response);
    expect((capturedCtx.error as NotFoundError).status).toBe(404);
  });

  it('rejects with the original error when onError throws', async () => {
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      retry: 'none',
      fetch: mockFetch(() =>
        jsonResponse({ error: { status: 404, code: 'not_found', title: 'Not found' } }, 404),
      ) as typeof fetch,
      hooks: {
        onError: () => {
          throw new Error('telemetry down');
        },
      },
    });

    await expect(nuntly.emails.retrieve('em_1')).rejects.toThrow(NotFoundError);
  });

  it('passes onError the same connection error the caller gets', async () => {
    let hookError: unknown;
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      retry: 'none',
      fetch: (() => Promise.reject(new TypeError('fetch failed'))) as typeof fetch,
      hooks: {
        onError: (ctx) => {
          hookError = ctx.error;
        },
      },
    });

    const error = await nuntly.emails.retrieve('em_1').catch((e: unknown) => e);
    expect(error).toBeInstanceOf(APIConnectionError);
    expect(hookError).toBe(error);
  });

  it('calls onError when the path cannot be resolved', async () => {
    let captured: ErrorContext | undefined;
    let calls = 0;
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      fetch: (() => {
        calls++;
        return Promise.resolve(jsonResponse({ data: {} }));
      }) as typeof fetch,
      hooks: {
        onError: (ctx) => {
          captured = ctx;
        },
      },
    });

    const error = await nuntly.emails.retrieve('..').catch((e: unknown) => e);
    expect(error).toBeInstanceOf(NuntlyError);
    expect(captured?.error).toBe(error as NuntlyError);
    expect(captured?.request).toMatchObject({ method: 'GET', path: '/emails/{id}' });
    expect(calls).toBe(0);
  });

  it('onRetry receives a RetryContext with attempt number', async () => {
    const retries: number[] = [];
    let attempt = 0;
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      maxRetries: 1,
      fetch: mockFetch(() => {
        attempt++;
        if (attempt === 1) return jsonResponse({ message: 'error' }, 500);
        return jsonResponse({ data: { id: 'em_1' } });
      }) as typeof fetch,
      hooks: {
        onRetry: (ctx) => {
          retries.push(ctx.attempt);
          expect(ctx.request.path).toBe('/emails/em_1');
        },
      },
    });

    await nuntly.emails.retrieve('em_1');
    expect(retries).toEqual([1]);
  });
});

describe('defaultHeaders and withOptions', () => {
  it('sends defaultHeaders on every request', async () => {
    const captured: Headers[] = [];
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      defaultHeaders: { 'X-Tenant-Id': 'tenant_42', 'X-Trace-Id': 'trace_1' },
      fetch: mockFetch((req) => {
        captured.push(req.headers);
        return jsonResponse({ data: { id: 'em_1' } });
      }) as typeof fetch,
    });

    await nuntly.emails.retrieve('em_1');
    await nuntly.emails.send(emailPayload);

    expect(captured.length).toBe(2);
    expect(captured[0]!.get('x-tenant-id')).toBe('tenant_42');
    expect(captured[0]!.get('x-trace-id')).toBe('trace_1');
    expect(captured[1]!.get('x-tenant-id')).toBe('tenant_42');
    expect(captured[1]!.get('x-trace-id')).toBe('trace_1');
  });

  it('per-request headers override defaultHeaders', async () => {
    let captured: Headers | null = null;
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      defaultHeaders: { 'X-Tenant-Id': 'tenant_default' },
      fetch: mockFetch((req) => {
        captured = req.headers;
        return jsonResponse({ data: { id: 'em_1' } });
      }) as typeof fetch,
    });

    await nuntly.emails.retrieve('em_1', {
      headers: { 'X-Tenant-Id': 'tenant_override' },
    });
    expect(captured!.get('x-tenant-id')).toBe('tenant_override');
  });

  it('withOptions returns a new Nuntly with merged options', async () => {
    let capturedKey: string | null = null;
    const fetchImpl = mockFetch((req) => {
      capturedKey = req.headers.get('authorization');
      return jsonResponse({ data: { id: 'em_1' } });
    }) as typeof fetch;

    const root = new Nuntly({
      apiKey: 'root_key',
      baseUrl: 'https://api.test.com',
      fetch: fetchImpl,
    });
    const tenant = root.withOptions({ apiKey: 'tenant_key' });

    // The original is not mutated.
    expect(root).not.toBe(tenant);

    await tenant.emails.retrieve('em_1');
    expect(capturedKey).toBe('Bearer tenant_key');

    await root.emails.retrieve('em_1');
    expect(capturedKey).toBe('Bearer root_key');
  });

  it('withOptions deep-merges defaultHeaders', async () => {
    let captured: Headers | null = null;
    const fetchImpl = mockFetch((req) => {
      captured = req.headers;
      return jsonResponse({ data: { id: 'em_1' } });
    }) as typeof fetch;

    const root = new Nuntly({
      apiKey: 'root_key',
      baseUrl: 'https://api.test.com',
      defaultHeaders: { 'X-Service': 'billing', 'X-Region': 'eu1' },
      fetch: fetchImpl,
    });
    const tenant = root.withOptions({
      defaultHeaders: { 'X-Tenant-Id': 'tenant_42', 'X-Region': 'us1' },
    });

    await tenant.emails.retrieve('em_1');
    expect(captured!.get('x-service')).toBe('billing'); // inherited
    expect(captured!.get('x-tenant-id')).toBe('tenant_42'); // added
    expect(captured!.get('x-region')).toBe('us1'); // overridden
  });
});

describe('Non-JSON error bodies', () => {
  it('surfaces a 502 HTML page as an API error with its status', async () => {
    const html = '<html><body>Bad Gateway</body></html>';
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      retry: 'none',
      fetch: mockFetch(
        () =>
          new Response(html, {
            status: 502,
            headers: { 'content-type': 'text/html' },
          }),
      ) as typeof fetch,
    });

    const error = await nuntly.emails.retrieve('em_1').catch((e) => e);
    expect(error).toBeInstanceOf(InternalServerError);
    expect((error as InternalServerError).status).toBe(502);
    expect((error as InternalServerError).title).toBe(html);
  });

  it('surfaces a 413 plain-text body as an API error with its status', async () => {
    const nuntly = createClient(
      () =>
        new Response('Request Entity Too Large', {
          status: 413,
          headers: { 'content-type': 'text/plain' },
        }),
    );

    const error = await nuntly.emails.send(emailPayload).catch((e) => e);
    expect(error).toBeInstanceOf(APIError);
    expect((error as APIError).status).toBe(413);
    expect((error as APIError).title).toBe('Request Entity Too Large');
  });
});

describe('Retry policy', () => {
  const servers: Server[] = [];
  afterEach(() => {
    for (const server of servers.splice(0)) server.close();
  });
  const fastRetry = {
    strategy: 'backoff' as const,
    backoff: { initialInterval: 1, maxInterval: 1, exponent: 1 },
  };

  function countingClient(handler: (req: Request, attempt: number) => Response | Promise<Response>) {
    const calls: Request[] = [];
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      retry: fastRetry,
      fetch: mockFetch((req) => {
        calls.push(req);
        return handler(req, calls.length);
      }) as typeof fetch,
    });
    return { nuntly, calls };
  }

  it('never retries a 409', async () => {
    const { nuntly, calls } = countingClient(() =>
      jsonResponse({ error: { status: 409, code: 'contact_already_exists', title: 'Conflict' } }, 409),
    );

    await expect(nuntly.emails.retrieve('em_1')).rejects.toThrow(ConflictError);
    expect(calls).toHaveLength(1);
  });

  it('does not retry a POST without Idempotency-Key on 503', async () => {
    const { nuntly, calls } = countingClient(() => jsonResponse({ message: 'unavailable' }, 503));

    await expect(nuntly.domains.create(domainPayload)).rejects.toThrow(InternalServerError);
    expect(calls).toHaveLength(1);
  });

  it('does not retry a PATCH without Idempotency-Key on 503', async () => {
    const { nuntly, calls } = countingClient(() => jsonResponse({ message: 'unavailable' }, 503));

    await expect(nuntly.domains.update('dom_1', { openTracking: true })).rejects.toThrow(InternalServerError);
    expect(calls).toHaveLength(1);
  });

  it('retries a PATCH with an Idempotency-Key on 503', async () => {
    const { nuntly, calls } = countingClient((_req, attempt) =>
      attempt === 1 ? jsonResponse({ message: 'unavailable' }, 503) : jsonResponse({ data: { id: 'dom_1' } }),
    );

    await nuntly.domains.update('dom_1', { openTracking: true }, { headers: { 'Idempotency-Key': 'key_1' } });
    expect(calls).toHaveLength(2);
  });

  // Like the real fetch, rejects with the signal's reason (a TimeoutError on timeout).
  function hangingClient(timeout = 20) {
    let calls = 0;
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      timeout,
      retry: fastRetry,
      fetch: ((_input: unknown, init?: RequestInit) => {
        calls++;
        return new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () => reject(init.signal!.reason), { once: true });
        });
      }) as typeof fetch,
    });
    return { nuntly, calls: () => calls };
  }

  it('retries a GET on timeout', async () => {
    const { nuntly, calls } = hangingClient();

    await expect(nuntly.emails.retrieve('em_1')).rejects.toThrow(APIConnectionTimeoutError);
    expect(calls()).toBe(3);
  });

  it('waits a Retry-After longer than the request timeout, then retries', async () => {
    const { nuntly, calls } = countingClient((_req, attempt) =>
      attempt === 1
        ? jsonResponse({ message: 'slow down' }, 429, { 'retry-after': '0.1' })
        : jsonResponse({ data: { id: 'em_1' } }),
    );
    const email = await nuntly.emails.retrieve('em_1', { timeout: 50 });

    expect(email.id).toBe('em_1');
    expect(calls).toHaveLength(2);
  });

  it("does not retry a GET aborted by the caller's AbortSignal.timeout", async () => {
    const { nuntly, calls } = hangingClient(60_000);

    await expect(nuntly.emails.retrieve('em_1', { signal: AbortSignal.timeout(20) })).rejects.toThrow(
      APIConnectionTimeoutError,
    );
    expect(calls()).toBe(1);
  });

  it('does not retry a POST without Idempotency-Key on timeout', async () => {
    const { nuntly, calls } = hangingClient();

    await expect(nuntly.domains.create(domainPayload)).rejects.toThrow(APIConnectionTimeoutError);
    expect(calls()).toBe(1);
  });

  it('retries a POST without Idempotency-Key on 429', async () => {
    const { nuntly, calls } = countingClient((_req, attempt) =>
      attempt === 1 ? jsonResponse({ message: 'slow down' }, 429) : jsonResponse({ data: { id: 'dom_1' } }, 201),
    );

    await nuntly.domains.create(domainPayload);
    expect(calls).toHaveLength(2);
  });

  it('retries emails.send on 503 with the same Idempotency-Key', async () => {
    const { nuntly, calls } = countingClient((_req, attempt) =>
      attempt === 1
        ? jsonResponse({ message: 'unavailable' }, 503)
        : jsonResponse({ data: { id: 'em_1', status: 'queued' } }, 202),
    );

    await nuntly.emails.send(emailPayload);
    expect(calls).toHaveLength(2);
    const key = calls[0]!.headers.get('idempotency-key');
    expect(key).toBeTruthy();
    expect(calls[1]!.headers.get('idempotency-key')).toBe(key);
  });

  it('retries a network TypeError on a retryable request', async () => {
    let calls = 0;
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      retry: fastRetry,
      fetch: (() => {
        calls++;
        return calls === 1
          ? Promise.reject(new TypeError('fetch failed'))
          : Promise.resolve(jsonResponse({ data: { id: 'em_1' } }));
      }) as typeof fetch,
    });

    const email = await nuntly.emails.retrieve('em_1');
    expect(email.id).toBe('em_1');
    expect(calls).toBe(2);
  });

  // As Bun 1.4.4 rejects them: a closed port, an unresolvable host, a reset connection.
  const bunError = (code: string, message: string) => Object.assign(new TypeError(message), { code });
  for (const error of [
    bunError('ECONNREFUSED', 'ECONNREFUSED: Unable to connect. Is the computer able to access the url?'),
    bunError('ENOTFOUND', 'getaddrinfo ENOTFOUND nonexistent.invalid'),
    bunError(
      'ECONNRESET',
      'ECONNRESET: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()',
    ),
    new TypeError('Failed to fetch'),
  ]) {
    it(`retries a network TypeError: ${error.message}`, async () => {
      let calls = 0;
      const nuntly = new Nuntly({
        apiKey: 'test_key',
        baseUrl: 'https://api.test.com',
        retry: fastRetry,
        fetch: (() => {
          calls++;
          return calls === 1 ? Promise.reject(error) : Promise.resolve(jsonResponse({ data: { id: 'em_1' } }));
        }) as typeof fetch,
      });

      await nuntly.emails.retrieve('em_1');
      expect(calls).toBe(2);
    });
  }

  for (const error of [
    Object.assign(new TypeError('fetch() URL is invalid'), { code: 'ERR_INVALID_URL' }),
    new TypeError("Cannot read properties of undefined (reading 'headers')"),
  ]) {
    it(`does not retry a TypeError that is not a network failure: ${error.message}`, async () => {
      let calls = 0;
      const nuntly = new Nuntly({
        apiKey: 'test_key',
        baseUrl: 'https://api.test.com',
        retry: fastRetry,
        fetch: (() => {
          calls++;
          return Promise.reject(error);
        }) as typeof fetch,
      });

      await expect(nuntly.emails.retrieve('em_1')).rejects.toThrow(APIConnectionError);
      expect(calls).toBe(1);
    });
  }

  for (const [name, listen] of [
    ['a closed port', async () => 1],
    [
      'a reset connection',
      async () => {
        const server = createServer((socket) => socket.resetAndDestroy());
        await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
        servers.push(server);
        return (server.address() as AddressInfo).port;
      },
    ],
  ] as const) {
    it(`retries the runtime's own network error on ${name}`, async () => {
      const port = await listen();
      let calls = 0;
      const nuntly = new Nuntly({
        apiKey: 'test_key',
        baseUrl: `http://127.0.0.1:${port}`,
        maxRetries: 1,
        retry: fastRetry,
        fetch: ((input: Request, init?: RequestInit) => {
          calls++;
          return globalThis.fetch(input, init);
        }) as typeof fetch,
      });

      await expect(nuntly.emails.retrieve('em_1')).rejects.toThrow(APIConnectionError);
      expect(calls).toBe(2);
    });
  }

  it('does not retry a failure while reading the response body', async () => {
    let calls = 0;
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      retry: fastRetry,
      fetch: (() => {
        calls++;
        const body = new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(new TextEncoder().encode('{"data":'));
            controller.error(new TypeError('terminated'));
          },
        });
        return Promise.resolve(new Response(body, { status: 200 }));
      }) as typeof fetch,
    });

    await expect(nuntly.emails.retrieve('em_1')).rejects.toThrow(APIConnectionError);
    expect(calls).toBe(1);
  });

  it('exposes no earlier response when the last attempt throws', async () => {
    const seen: number[] = [];
    const retryResponses: (Response | undefined)[] = [];
    let calls = 0;
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      maxRetries: 2,
      retry: fastRetry,
      fetch: (() => {
        calls++;
        return calls === 1
          ? Promise.resolve(jsonResponse({ message: 'unavailable' }, 503))
          : Promise.reject(new TypeError('fetch failed'));
      }) as typeof fetch,
      hooks: {
        onResponse: (ctx) => {
          seen.push(ctx.response.status);
        },
        onRetry: (ctx) => {
          retryResponses.push(ctx.response);
        },
      },
    });

    const call = nuntly.emails.retrieve('em_1');
    const error = await call.catch((e: unknown) => e);
    expect(error).toBeInstanceOf(APIConnectionError);
    await expect(call.asResponse()).rejects.toBe(error);
    expect(calls).toBe(3);
    expect(seen).toEqual([]);
    expect(retryResponses[0]?.status).toBe(503);
    expect(retryResponses[1]).toBeUndefined();
  });

  describe('a retry that never starts exposes no response', () => {
    function retryingClient(hooks: { onRetry?: () => void } = {}) {
      const seen: number[] = [];
      const nuntly = new Nuntly({
        apiKey: 'test_key',
        baseUrl: 'https://api.test.com',
        retry: fastRetry,
        fetch: mockFetch(() => jsonResponse({ message: 'unavailable' }, 503, { 'retry-after': '0.2' })) as typeof fetch,
        hooks: {
          ...hooks,
          onResponse: (ctx) => {
            seen.push(ctx.response.status);
          },
        },
      });
      return { nuntly, seen };
    }

    it('when onRetry throws', async () => {
      const failure = new Error('retry hook down');
      const { nuntly, seen } = retryingClient({
        onRetry: () => {
          throw failure;
        },
      });

      const call = nuntly.emails.retrieve('em_1');
      await expect(call).rejects.toBe(failure);
      await expect(call.asResponse()).rejects.toBe(failure);
      expect(seen).toEqual([]);
    });

    it('when the caller aborts during the retry delay', async () => {
      const { nuntly, seen } = retryingClient();
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 20);

      const call = nuntly.emails.retrieve('em_1', { signal: controller.signal });
      const error = await call.catch((e: unknown) => e);
      expect(error).toBeInstanceOf(APIConnectionError);
      expect(error).not.toBeInstanceOf(APIConnectionTimeoutError);
      await expect(call.asResponse()).rejects.toBe(error);
      expect(seen).toEqual([]);
    });
  });

  it('does not retry when the caller aborts', async () => {
    let calls = 0;
    const slow = delayedFetch(200, () => jsonResponse({ data: {} }));
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl: 'https://api.test.com',
      retry: fastRetry,
      fetch: ((input: Request, init?: RequestInit) => {
        calls++;
        return slow(input, init);
      }) as typeof fetch,
    });
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 10);

    const error = await nuntly.emails.retrieve('em_1', { signal: controller.signal }).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(APIConnectionError);
    expect(error).not.toBeInstanceOf(APIConnectionTimeoutError);
    expect(calls).toBe(1);
  });
});
