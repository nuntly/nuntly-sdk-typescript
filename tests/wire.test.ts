import { afterAll, beforeAll, describe, expect, it } from 'bun:test';
import { NotFoundError, Nuntly, NuntlyError } from '../src/index';

let server: ReturnType<typeof Bun.serve>;
let baseUrl: string;
let lastRequest: {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: unknown;
} | null = null;

beforeAll(() => {
  server = Bun.serve({
    port: 0,
    async fetch(req) {
      const url = new URL(req.url);
      const headers: Record<string, string> = {};
      req.headers.forEach((v, k) => {
        headers[k] = v;
      });
      // An empty body reads as null; a non-JSON body stays raw so it fails a null check.
      const text = await req.text();
      let body: unknown = null;
      if (text) {
        try {
          body = JSON.parse(text);
        } catch {
          body = text;
        }
      }

      lastRequest = {
        method: req.method,
        url: url.pathname + url.search,
        headers,
        body,
      };

      // Route: GET /emails/:id
      if (req.method === 'GET' && url.pathname.match(/^\/emails\/[^/]+$/) && !url.pathname.includes('em_not_found')) {
        const id = url.pathname.split('/').pop() ?? 'unknown';
        // Vary the delay to interleave concurrent retrieves and exercise
        // the per-call Response capture in `withResponse()`.
        const delay = id === 'em_slow' ? 50 : 5;
        await new Promise((resolve) => setTimeout(resolve, delay));
        return Response.json(
          {
            data: {
              id,
              status: 'delivered',
              from: 'a@b.com',
              to: 'c@d.com',
              subject: 'Test',
              createdAt: '2026-01-01T00:00:00Z',
            },
          },
          { headers: { 'x-mock-id': id } },
        );
      }

      // Route: GET /webhooks/:id, stored with an internal event type
      if (req.method === 'GET' && url.pathname === '/webhooks/wh_internal') {
        return Response.json({
          data: {
            id: 'wh_internal',
            endpointUrl: 'https://example.com/webhooks',
            events: ['email.sent', 'email.unsubscribed'],
            status: 'enabled',
            createdAt: '2026-01-01T00:00:00Z',
          },
        });
      }

      // Route: POST /emails
      if (req.method === 'POST' && url.pathname === '/emails') {
        return Response.json({ data: { id: 'em_new', status: 'queued' } }, { status: 201 });
      }

      // Route: GET /emails (paginated)
      if (req.method === 'GET' && url.pathname === '/emails') {
        const cursor = url.searchParams.get('cursor');
        if (!cursor) {
          return Response.json({
            data: [{ id: 'em_1' }, { id: 'em_2' }],
            nextCursor: 'page2',
          });
        }
        return Response.json({ data: [{ id: 'em_3' }], nextCursor: null });
      }

      // Route: POST /domains
      if (req.method === 'POST' && url.pathname === '/domains') {
        return Response.json(
          { data: { id: 'dns_123', name: (body as { name?: string } | null)?.name, status: 'pending' } },
          { status: 201 },
        );
      }

      // Route: 404 - canonical Nuntly error shape (see @repo/application-error)
      if (url.pathname.includes('not-found')) {
        return Response.json({ error: { status: 404, code: 'not_found', title: 'Not found' } }, { status: 404 });
      }

      // Routes: broadcast and agent memory resources. Their wire cases
      // assert only the request, so any 200 envelope will do.
      if (/^\/(templates|contacts|segments|topics|contact-properties|agents)(\/|$)/.test(url.pathname)) {
        return Response.json({ data: [] });
      }

      return Response.json({ error: { status: 404, code: 'not_found', title: 'Not found' } }, { status: 404 });
    },
  });
  baseUrl = `http://localhost:${server.port}`;
});

afterAll(() => {
  server.stop();
});

function createClient() {
  return new Nuntly({ apiKey: 'test_wire_key', baseUrl, retry: 'none' });
}

describe('Wire: Headers', () => {
  it('sends Authorization bearer header', async () => {
    const nuntly = createClient();
    await nuntly.emails.retrieve('em_1');
    expect(lastRequest!.headers['authorization']).toBe('Bearer test_wire_key');
  });

  it('sends Content-Type json on POST', async () => {
    const nuntly = createClient();
    await nuntly.emails.send({
      from: 'a@b.com',
      to: 'c@d.com',
      subject: 'Test',
    });
    expect(lastRequest!.headers['content-type']).toContain('application/json');
  });

  it('sends User-Agent with SDK version and runtime', async () => {
    const nuntly = createClient();
    await nuntly.emails.retrieve('em_1');
    expect(lastRequest!.headers['user-agent']).toMatch(/^@nuntly\/sdk\/[\w.+-]+ /);
  });

  it('appends appInfo to User-Agent without removing the SDK identifier', async () => {
    const nuntly = new Nuntly({
      apiKey: 'test_key',
      baseUrl,
      appInfo: { name: '@nuntly/cli', version: '9.9.9' },
    });
    await nuntly.emails.retrieve('em_1');
    expect(lastRequest!.headers['user-agent']).toMatch(/^@nuntly\/sdk\/[\w.+-]+ \(@nuntly\/cli\/9\.9\.9\) /);
  });
});

describe('Wire: Request body serialization', () => {
  it('serializes POST body as JSON', async () => {
    const nuntly = createClient();
    await nuntly.domains.create({
      name: 'wire-test.com',
      sending: true,
      receiving: false,
    });
    expect(lastRequest!.body).toEqual({
      name: 'wire-test.com',
      sending: true,
      receiving: false,
    });
  });

  it('sends correct HTTP method', async () => {
    const nuntly = createClient();
    await nuntly.emails.retrieve('em_1');
    expect(lastRequest!.method).toBe('GET');

    await nuntly.emails.send({
      from: 'a@b.com',
      to: 'c@d.com',
      subject: 'Test',
    });
    expect(lastRequest!.method).toBe('POST');
  });
});

describe('Wire: URL construction', () => {
  it('builds path params correctly', async () => {
    const nuntly = createClient();
    await nuntly.emails.retrieve('em_abc123');
    expect(lastRequest!.url).toBe('/emails/em_abc123');
  });

  it('passes query params on paginated endpoints', async () => {
    const nuntly = createClient();
    await nuntly.emails.list({ limit: 5 });
    expect(lastRequest!.url).toContain('limit=5');
  });

  it('repeats the key for array query params, including a single value', async () => {
    const nuntly = createClient();
    await nuntly.messages.content.retrieve('msg_abc123', { format: ['html'] }).catch(() => undefined);
    expect(lastRequest!.url).toBe('/messages/msg_abc123/content?format=html');

    await nuntly.messages.content.retrieve('msg_abc123', { format: ['html', 'text'] }).catch(() => undefined);
    expect(lastRequest!.url).toBe('/messages/msg_abc123/content?format=html&format=text');
  });

  it('omits undefined query params', async () => {
    const nuntly = createClient();
    await nuntly.threads.retrieve('thr_abc123', { markRead: undefined }).catch(() => undefined);
    expect(lastRequest!.url).toBe('/threads/thr_abc123');
  });
});

describe('Wire: Response handling', () => {
  it('unwraps { data: T } envelope', async () => {
    const nuntly = createClient();
    const email = await nuntly.emails.retrieve('em_1');
    expect(email.id).toBe('em_1');
    expect(email.status).toBe('delivered');
  });

  it('reads back a webhook that holds an internal event type', async () => {
    const nuntly = createClient();
    const webhook = await nuntly.webhooks.retrieve('wh_internal');
    expect(webhook.events).toEqual(['email.sent', 'email.unsubscribed']);
  });

  it('pagination fetches multiple pages', async () => {
    const nuntly = createClient();
    const page1 = await nuntly.emails.list();
    expect(page1.data.length).toBe(2);
    expect(page1.hasNextPage()).toBe(true);

    const page2 = await page1.nextPage();
    expect(page2.data.length).toBe(1);
    expect(page2.hasNextPage()).toBe(false);
  });
});

describe('Wire: APIPromise', () => {
  it('withResponse() returns data and raw Response together', async () => {
    const nuntly = createClient();
    const { data, response } = await nuntly.emails.retrieve('em_1').withResponse();
    expect(data.id).toBe('em_1');
    expect(response).toBeInstanceOf(Response);
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('application/json');
  });

  it('asResponse() returns the raw Response', async () => {
    const nuntly = createClient();
    const response = await nuntly.emails.retrieve('em_1').asResponse();
    expect(response).toBeInstanceOf(Response);
    expect(response.status).toBe(200);
    expect(response.headers.get('x-mock-id')).toBe('em_1');
  });

  it('asResponse() on a 404 leaves no unhandled rejection', async () => {
    const unhandled: unknown[] = [];
    const onUnhandled = (reason: unknown) => unhandled.push(reason);
    process.on('unhandledRejection', onUnhandled);
    try {
      const nuntly = createClient();
      const response = await nuntly.emails.retrieve('em_not_found').asResponse();
      await new Promise((resolve) => setTimeout(resolve, 20));
      expect(response.status).toBe(404);
      expect(unhandled).toEqual([]);
    } finally {
      process.off('unhandledRejection', onUnhandled);
    }
  });

  it('asResponse() on a 404 returns an unread body', async () => {
    const nuntly = createClient();
    const response = await nuntly.emails.retrieve('em_not_found').asResponse();
    expect(await response.json()).toEqual({
      error: { status: 404, code: 'not_found', title: 'Not found' },
    });
  });

  it('reading the asResponse() body keeps the typed error on the same promise', async () => {
    const nuntly = createClient();
    const call = nuntly.emails.retrieve('em_not_found');
    await (await call.asResponse()).text();
    await expect(call).rejects.toThrow(NotFoundError);
  });

  it('a rejected path id reaches .catch() instead of throwing at the call', async () => {
    const nuntly = createClient();
    const error = await nuntly.emails.retrieve('..').catch((e: unknown) => e);
    expect(error).toBeInstanceOf(NuntlyError);
  });

  it('withResponse() on a 404 still throws NotFoundError', async () => {
    const nuntly = createClient();
    await expect(nuntly.emails.retrieve('em_not_found').withResponse()).rejects.toThrow(NotFoundError);
  });

  it('is a thenable Promise<T>', async () => {
    const nuntly = createClient();
    const email = await nuntly.emails.retrieve('em_1');
    expect(email.id).toBe('em_1');
  });

  it('withResponse() captures the correct Response under concurrent requests', async () => {
    const nuntly = createClient();
    // `em_slow` resolves last but is started first; a shared per-client
    // last-response slot would hand both calls the faster response.
    const slowP = nuntly.emails.retrieve('em_slow');
    const fastP = nuntly.emails.retrieve('em_fast');

    const [slow, fast] = await Promise.all([slowP.withResponse(), fastP.withResponse()]);

    expect(slow.data.id).toBe('em_slow');
    expect(slow.response.headers.get('x-mock-id')).toBe('em_slow');
    expect(fast.data.id).toBe('em_fast');
    expect(fast.response.headers.get('x-mock-id')).toBe('em_fast');
  });
});

describe('Wire: Error responses', () => {
  it('throws NotFoundError on 404', async () => {
    const nuntly = createClient();
    await expect(nuntly.emails.retrieve('em_not_found')).rejects.toThrow(NotFoundError);
  });

  it('error contains structured body', async () => {
    const nuntly = createClient();
    try {
      await nuntly.emails.retrieve('em_not_found');
      expect.unreachable('should have thrown');
    } catch (e: any) {
      expect(e.status).toBe(404);
      expect(e.title).toBe('Not found');
      expect(e.code).toBe('not_found');
    }
  });

  it('error exposes rawResponse', async () => {
    const nuntly = createClient();
    try {
      await nuntly.emails.retrieve('em_not_found');
      expect.unreachable('should have thrown');
    } catch (e: any) {
      expect(e.rawResponse).toBeInstanceOf(Response);
      expect(e.rawResponse.status).toBe(404);
    }
  });
});

type WireCase = {
  name: string;
  call: (nuntly: Nuntly) => PromiseLike<unknown>;
  method: string;
  url: string;
  body?: unknown;
};

const resourceCases: WireCase[] = [
  {
    name: 'templates.create',
    call: (n) => n.templates.create({ name: 'Welcome' }),
    method: 'POST',
    url: '/templates',
    body: { name: 'Welcome' },
  },
  {
    name: 'templates.list',
    call: (n) => n.templates.list({ limit: 10, cursor: 'cur_1' }),
    method: 'GET',
    url: '/templates?limit=10&cursor=cur_1',
  },
  {
    name: 'templates.retrieve',
    call: (n) => n.templates.retrieve('tpl_1'),
    method: 'GET',
    url: '/templates/tpl_1',
  },
  {
    name: 'templates.update',
    call: (n) => n.templates.update('tpl_1', { name: 'Onboarding' }),
    method: 'PATCH',
    url: '/templates/tpl_1',
    body: { name: 'Onboarding' },
  },
  {
    name: 'templates.delete',
    call: (n) => n.templates.delete('tpl_1'),
    method: 'DELETE',
    url: '/templates/tpl_1',
  },
  {
    name: 'templates.versions.create',
    call: (n) =>
      n.templates.versions.create('tpl_1', {
        subject: 'Welcome to Nuntly',
        html: '<h1>Welcome!</h1>',
        variables: [{ name: 'firstName', type: 'string' }],
      }),
    method: 'POST',
    url: '/templates/tpl_1/versions',
    body: {
      subject: 'Welcome to Nuntly',
      html: '<h1>Welcome!</h1>',
      variables: [{ name: 'firstName', type: 'string' }],
    },
  },
  {
    name: 'templates.versions.list',
    call: (n) => n.templates.versions.list('tpl_1', { limit: 5 }),
    method: 'GET',
    url: '/templates/tpl_1/versions?limit=5',
  },
  {
    name: 'templates.versions.retrieve',
    call: (n) => n.templates.versions.retrieve('tpl_1', 'tv_1'),
    method: 'GET',
    url: '/templates/tpl_1/versions/tv_1',
  },
  {
    name: 'templates.versions.publish with no body',
    call: (n) => n.templates.versions.publish('tpl_1', 'tv_1'),
    method: 'PATCH',
    url: '/templates/tpl_1/versions/tv_1/publish',
  },
  {
    name: 'templates.versions.content.retrieve',
    call: (n) => n.templates.versions.content.retrieve('tpl_1', 'tv_1'),
    method: 'GET',
    url: '/templates/tpl_1/versions/tv_1/content',
  },
  {
    name: 'contacts.create',
    call: (n) =>
      n.contacts.create({
        email: 'ada@acme.com',
        properties: { plan: 'pro', seats: 3 },
      }),
    method: 'POST',
    url: '/contacts',
    body: { email: 'ada@acme.com', properties: { plan: 'pro', seats: 3 } },
  },
  {
    name: 'contacts.list',
    call: (n) => n.contacts.list({ limit: 20 }),
    method: 'GET',
    url: '/contacts?limit=20',
  },
  {
    name: 'contacts.retrieve',
    call: (n) => n.contacts.retrieve('ct_1'),
    method: 'GET',
    url: '/contacts/ct_1',
  },
  {
    name: 'contacts.update keeps a null property',
    call: (n) => n.contacts.update('ct_1', { properties: { plan: null } }),
    method: 'PATCH',
    url: '/contacts/ct_1',
    body: { properties: { plan: null } },
  },
  {
    name: 'contacts.delete',
    call: (n) => n.contacts.delete('ct_1'),
    method: 'DELETE',
    url: '/contacts/ct_1',
  },
  {
    name: 'contacts.topics.list',
    call: (n) => n.contacts.topics.list('ct_1'),
    method: 'GET',
    url: '/contacts/ct_1/topics',
  },
  {
    name: 'contacts.topics.update',
    call: (n) => n.contacts.topics.update('ct_1', 'top_1', { state: 'unsubscribed' }),
    method: 'PUT',
    url: '/contacts/ct_1/topics/top_1',
    body: { state: 'unsubscribed' },
  },
  {
    name: 'contacts.segments.add with no body',
    call: (n) => n.contacts.segments.add('ct_1', 'seg_1'),
    method: 'POST',
    url: '/contacts/ct_1/segments/seg_1',
  },
  {
    name: 'contacts.segments.list',
    call: (n) => n.contacts.segments.list('ct_1'),
    method: 'GET',
    url: '/contacts/ct_1/segments',
  },
  {
    name: 'contacts.segments.retrieve',
    call: (n) => n.contacts.segments.retrieve('ct_1', 'seg_1'),
    method: 'GET',
    url: '/contacts/ct_1/segments/seg_1',
  },
  {
    name: 'contacts.segments.remove',
    call: (n) => n.contacts.segments.remove('ct_1', 'seg_1'),
    method: 'DELETE',
    url: '/contacts/ct_1/segments/seg_1',
  },
  {
    name: 'segments.create',
    call: (n) => n.segments.create({ name: 'beta testers' }),
    method: 'POST',
    url: '/segments',
    body: { name: 'beta testers' },
  },
  {
    name: 'segments.list',
    call: (n) => n.segments.list({ limit: 10 }),
    method: 'GET',
    url: '/segments?limit=10',
  },
  {
    name: 'segments.retrieve',
    call: (n) => n.segments.retrieve('seg_1'),
    method: 'GET',
    url: '/segments/seg_1',
  },
  {
    name: 'segments.update',
    call: (n) => n.segments.update('seg_1', { name: 'early adopters' }),
    method: 'PATCH',
    url: '/segments/seg_1',
    body: { name: 'early adopters' },
  },
  {
    name: 'segments.delete',
    call: (n) => n.segments.delete('seg_1'),
    method: 'DELETE',
    url: '/segments/seg_1',
  },
  {
    name: 'segments.members.list',
    call: (n) => n.segments.members.list('seg_1', { limit: 20 }),
    method: 'GET',
    url: '/segments/seg_1/members?limit=20',
  },
  {
    name: 'topics.create',
    call: (n) => n.topics.create({ name: 'product updates' }),
    method: 'POST',
    url: '/topics',
    body: { name: 'product updates' },
  },
  {
    name: 'topics.list',
    call: (n) => n.topics.list({ limit: 10 }),
    method: 'GET',
    url: '/topics?limit=10',
  },
  {
    name: 'topics.retrieve',
    call: (n) => n.topics.retrieve('top_1'),
    method: 'GET',
    url: '/topics/top_1',
  },
  {
    name: 'topics.update',
    call: (n) => n.topics.update('top_1', { name: 'release notes' }),
    method: 'PATCH',
    url: '/topics/top_1',
    body: { name: 'release notes' },
  },
  {
    name: 'topics.delete',
    call: (n) => n.topics.delete('top_1'),
    method: 'DELETE',
    url: '/topics/top_1',
  },
  {
    name: 'topics.memberships.list',
    call: (n) => n.topics.memberships.list('top_1', { limit: 20 }),
    method: 'GET',
    url: '/topics/top_1/memberships?limit=20',
  },
  {
    name: 'contactProperties.create',
    call: (n) =>
      n.contactProperties.create({
        name: 'plan',
        type: 'string',
        description: 'Billing plan',
        defaultValue: 'free',
      }),
    method: 'POST',
    url: '/contact-properties',
    body: {
      name: 'plan',
      type: 'string',
      description: 'Billing plan',
      defaultValue: 'free',
    },
  },
  {
    name: 'contactProperties.list',
    call: (n) => n.contactProperties.list({ limit: 10 }),
    method: 'GET',
    url: '/contact-properties?limit=10',
  },
  {
    name: 'contactProperties.retrieve',
    call: (n) => n.contactProperties.retrieve('cpd_1'),
    method: 'GET',
    url: '/contact-properties/cpd_1',
  },
  {
    name: 'contactProperties.update keeps a null default',
    call: (n) =>
      n.contactProperties.update('cpd_1', {
        description: 'Seat count',
        defaultValue: null,
      }),
    method: 'PATCH',
    url: '/contact-properties/cpd_1',
    body: { description: 'Seat count', defaultValue: null },
  },
  {
    name: 'contactProperties.delete',
    call: (n) => n.contactProperties.delete('cpd_1'),
    method: 'DELETE',
    url: '/contact-properties/cpd_1',
  },
  {
    name: 'agents.memory.retrieve scoped to an inbox',
    call: (n) => n.agents.memory.retrieve('support-bot', { inboxId: 'inb_1' }),
    method: 'GET',
    url: '/agents/support-bot/memory?inboxId=inb_1',
  },
  {
    name: 'agents.memory.retrieve scoped to a thread',
    call: (n) => n.agents.memory.retrieve('support-bot', { threadId: 'thr_1' }),
    method: 'GET',
    url: '/agents/support-bot/memory?threadId=thr_1',
  },
  {
    name: 'agents.memory.retrieve at organization level',
    call: (n) => n.agents.memory.retrieve('support-bot'),
    method: 'GET',
    url: '/agents/support-bot/memory',
  },
  {
    name: 'agents.memory.upsert',
    call: (n) =>
      n.agents.memory.upsert('support-bot', {
        threadId: 'thr_1',
        memory: { tier: 'gold', tags: ['vip', 2] },
        summary: null,
      }),
    method: 'PUT',
    url: '/agents/support-bot/memory',
    body: {
      threadId: 'thr_1',
      memory: { tier: 'gold', tags: ['vip', 2] },
      summary: null,
    },
  },
];

describe('Wire: broadcast and agent memory resources', () => {
  for (const c of resourceCases) {
    it(`${c.name}: ${c.method} ${c.url}`, async () => {
      lastRequest = null;
      await c.call(createClient());
      expect(lastRequest!.method).toBe(c.method);
      expect(lastRequest!.url).toBe(c.url);
      expect(lastRequest!.body).toEqual(c.body ?? null);
    });
  }
});
