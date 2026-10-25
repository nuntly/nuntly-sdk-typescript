import { afterEach, beforeEach, describe, expect, it, setSystemTime } from 'bun:test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { inspect } from 'node:util';
import type { ClientOptions, RequestOptions } from '../src/index';
import {
  APIConnectionError,
  APIConnectionTimeoutError,
  APIError,
  AuthenticationError,
  BadRequestError,
  ConflictError,
  InternalServerError,
  NotFoundError,
  Nuntly,
  NuntlyClient,
  NuntlyError,
  PermissionDeniedError,
  RateLimitError,
  safe,
  UnprocessableEntityError,
  verifyWebhook,
  WebhookVerificationError,
} from '../src/index';

// The vectors are in conformance/ at the repository root, the nearest ancestor that has one.
function conformanceDir(): string {
  for (let dir = import.meta.dir; dir !== dirname(dir); dir = dirname(dir)) {
    if (existsSync(join(dir, 'conformance', 'retry.json'))) return join(dir, 'conformance');
  }
  throw new Error('conformance/ not found');
}

function vectors<T>(file: string): T {
  return JSON.parse(readFileSync(join(conformanceDir(), file), 'utf8')) as T;
}

type Range = [number, number];

interface ScriptedResponse {
  status?: number;
  headers?: Record<string, string>;
  body?: unknown;
  rawBody?: string;
  network?: true;
  timeout?: true;
  callerTimeout?: true;
  abortAfter?: true;
}

interface ExpectedError {
  kind: string;
  notKind?: string;
  messageIncludes?: string;
  status?: number;
  code?: string;
  title?: string;
  details?: unknown;
  requestId?: string;
  retryAfterMs?: number | Range;
}

interface Case {
  name: string;
  runtimes?: string[];
}

const runsHere = (c: Case) => !c.runtimes || c.runtimes.includes('typescript');

// Counts the cases each file ran, so the last test fails when a filter drops one.
const ran = new Map<string, number>();
function running(file: string, expected: object, asserted: readonly string[]) {
  ran.set(file, (ran.get(file) ?? 0) + 1);
  expectAsserted(expected, asserted);
}

// A vector field the runner does not assert would pass whatever the SDK does.
function expectAsserted(expected: object, asserted: readonly string[]) {
  expect(Object.keys(expected).filter((key) => !asserted.includes(key))).toEqual([]);
}

class HookFailure extends TypeError {}

const KINDS: Record<string, (e: unknown) => boolean> = {
  bad_request: (e) => e instanceof BadRequestError,
  authentication: (e) => e instanceof AuthenticationError,
  permission_denied: (e) => e instanceof PermissionDeniedError,
  not_found: (e) => e instanceof NotFoundError,
  conflict: (e) => e instanceof ConflictError,
  unprocessable_entity: (e) => e instanceof UnprocessableEntityError,
  rate_limit: (e) => e instanceof RateLimitError,
  internal_server: (e) => e instanceof InternalServerError,
  api: (e) => e instanceof APIError && e.constructor === APIError,
  connection: (e) => e instanceof APIConnectionError,
  timeout: (e) => e instanceof APIConnectionTimeoutError,
  hook: (e) => e instanceof HookFailure,
  no_more_pages: (e) => e instanceof Error && e.constructor === Error && e.message === 'No more pages',
  sdk: (e) => e instanceof NuntlyError && e.constructor === NuntlyError,
};

function expectWithin(actual: number | null | undefined, expected: number | Range) {
  const [min, max] = typeof expected === 'number' ? [expected, expected] : expected;
  expect(actual).not.toBeNull();
  expect(actual!).toBeGreaterThanOrEqual(min);
  expect(actual!).toBeLessThanOrEqual(max);
}

const ERROR_KEYS = [
  'kind',
  'notKind',
  'messageIncludes',
  'status',
  'code',
  'title',
  'details',
  'requestId',
  'retryAfterMs',
];

function expectError(error: unknown, expected: ExpectedError) {
  expectAsserted(expected, ERROR_KEYS);
  expect(KINDS[expected.kind]?.(error)).toBe(true);
  if (expected.notKind) expect(KINDS[expected.notKind]?.(error)).toBe(false);
  if (expected.messageIncludes) expect((error as Error).message).toContain(expected.messageIncludes);
  // Only an API error has the accessors below.
  if (!(error instanceof APIError)) return expectAsserted(expected, ['kind', 'notKind', 'messageIncludes']);
  if (expected.status !== undefined) expect(error.status).toBe(expected.status);
  if (expected.code !== undefined) expect(error.code).toBe(expected.code);
  if (expected.title !== undefined) expect(error.title).toBe(expected.title);
  if ('details' in expected || expected.code !== undefined) expect(error.details).toEqual(expected.details);
  if ('requestId' in expected || expected.code !== undefined) expect(error.requestId).toBe(expected.requestId ?? null);
  if (expected.retryAfterMs !== undefined) expectWithin((error as RateLimitError).retryAfter, expected.retryAfterMs);
}

function toResponse(r: ScriptedResponse): Response {
  const body = r.rawBody ?? JSON.stringify(r.body ?? {});
  const headers = r.rawBody === undefined ? { 'content-type': 'application/json', ...r.headers } : r.headers;
  return new Response(body === '' ? null : body, { status: r.status, headers });
}

// Serves the scripted responses in order and records what each call sent. `caller` is the
// signal the request passed, aborted on `abortAfter` and timed out on `callerTimeout`.
function scriptedFetch(
  responses: ScriptedResponse[],
  onCall: (headers: Headers, url: URL) => void,
  caller?: AbortController,
) {
  let next = 0;
  return (async (input: Request, init?: RequestInit) => {
    const r = responses[next++];
    if (!r) throw new Error('no scripted response left');
    onCall(new Headers(init?.headers ?? input.headers), new URL(input instanceof Request ? input.url : String(input)));
    if (r.network) throw new TypeError('fetch failed');
    if (r.timeout) throw new DOMException('The operation timed out.', 'TimeoutError');
    if (r.callerTimeout) {
      caller!.abort(new DOMException('The operation timed out.', 'TimeoutError'));
      throw caller!.signal.reason;
    }
    if (r.abortAfter) caller!.abort();
    return toResponse(r);
  }) as typeof fetch;
}

// Calls a dotted SDK operation such as `emails.retrieve` on the client.
function callOperation(client: object, operation: string, args: unknown[]): Promise<unknown> {
  const segments = operation.split('.');
  const method = segments.pop()!;
  const resource = segments.reduce(
    (target, name) => target[name] as Record<string, unknown>,
    client as Record<string, unknown>,
  );
  return (resource[method] as (...args: unknown[]) => Promise<unknown>).apply(resource, args);
}

// Records every wait the SDK schedules and runs it at once, so delays are asserted without sleeping.
const realSetTimeout = globalThis.setTimeout;
let delays: number[] = [];

describe('conformance: retry.json', () => {
  interface RetryCase extends Case {
    client?: { retry?: 'none'; maxRetries?: number };
    request: {
      method: 'GET' | 'POST';
      path: string;
      body?: unknown;
      idempotencyKey?: string;
      idempotent?: boolean;
      maxRetries?: number;
      onRequestThrows?: boolean;
      onResponseThrows?: boolean;
    };
    responses: ScriptedResponse[];
    expected: {
      calls: number;
      retries?: number;
      hookCalls?: number;
      hookSequence?: string[];
      delaysMs?: Range[];
      sameIdempotencyKey?: boolean;
      result?: { status: number };
      error?: ExpectedError;
    };
  }

  beforeEach(() => {
    delays = [];
    globalThis.setTimeout = ((fn: () => void, ms?: number) => {
      delays.push(ms ?? 0);
      return realSetTimeout(fn, 0);
    }) as typeof setTimeout;
  });
  afterEach(() => {
    globalThis.setTimeout = realSetTimeout;
  });

  for (const c of vectors<{ cases: RetryCase[] }>('retry.json').cases.filter(runsHere)) {
    it(c.name, async () => {
      running('retry.json', c.expected, [
        'calls',
        'retries',
        'hookCalls',
        'hookSequence',
        'delaysMs',
        'sameIdempotencyKey',
        'result',
        'error',
      ]);
      const keys: (string | null)[] = [];
      let retries = 0;
      let hookCalls = 0;
      const hookSequence: string[] = [];
      const caller = new AbortController();
      const client = new NuntlyClient({
        apiKey: 'test_key',
        baseUrl: 'https://api.test.com',
        ...(c.client?.retry ? { retry: c.client.retry } : {}),
        ...(c.client?.maxRetries !== undefined ? { maxRetries: c.client.maxRetries } : {}),
        fetch: scriptedFetch(c.responses, (h) => keys.push(h.get('idempotency-key')), caller),
        hooks: {
          onRetry: () => {
            hookSequence.push('onRetry');
            retries++;
          },
          onRequest: () => {
            hookSequence.push('onRequest');
            hookCalls++;
            if (c.request.onRequestThrows) throw new HookFailure('hook failed');
          },
          onResponse: () => {
            hookSequence.push('onResponse');
            if (c.request.onResponseThrows) throw new HookFailure('hook failed');
          },
          onSuccess: () => {
            hookSequence.push('onSuccess');
          },
          onError: () => {
            hookSequence.push('onError');
          },
        },
      } satisfies ClientOptions);
      const options: RequestOptions = {
        signal: caller.signal,
        ...(c.request.idempotencyKey ? { headers: { 'Idempotency-Key': c.request.idempotencyKey } } : {}),
        ...(c.request.maxRetries !== undefined ? { maxRetries: c.request.maxRetries } : {}),
      };
      const call =
        c.request.method === 'GET'
          ? client.get({ path: c.request.path, options })
          : client.post({ path: c.request.path, body: c.request.body, options, idempotent: c.request.idempotent });

      const error = await call.then(
        () => undefined,
        (e: unknown) => e,
      );

      expect(keys).toHaveLength(c.expected.calls);
      if (c.expected.retries !== undefined) expect(retries).toBe(c.expected.retries);
      if (c.expected.hookCalls !== undefined) expect(hookCalls).toBe(c.expected.hookCalls);
      if (c.expected.hookSequence) expect(hookSequence).toEqual(c.expected.hookSequence);
      if (c.expected.result) {
        expect(error).toBeUndefined();
        expect((await call.asResponse()).status).toBe(c.expected.result.status);
      }
      if (c.expected.error) expectError(error, c.expected.error);
      if (c.expected.sameIdempotencyKey !== undefined) expect(c.expected.sameIdempotencyKey).toBe(true);
      if (c.expected.sameIdempotencyKey) expect(new Set(keys)).toEqual(new Set([c.request.idempotencyKey!]));
      if (c.expected.delaysMs) {
        expect(delays).toHaveLength(c.expected.delaysMs.length);
        for (const [i, range] of c.expected.delaysMs.entries()) expectWithin(delays[i], range);
      }
    });
  }
});

describe('conformance: errors.json', () => {
  interface ErrorCase extends Case {
    response: ScriptedResponse;
    expected: ExpectedError;
  }

  for (const c of vectors<{ cases: ErrorCase[] }>('errors.json').cases.filter(runsHere)) {
    it(c.name, async () => {
      running('errors.json', c.expected, ERROR_KEYS);
      const client = new NuntlyClient({
        apiKey: 'test_key',
        baseUrl: 'https://api.test.com',
        retry: 'none',
        fetch: scriptedFetch([c.response], () => {}),
      });

      const error = await client.get({ path: '/emails/em_1' }).catch((e: unknown) => e);

      expectError(error, c.expected);
    });
  }
});

describe('conformance: webhook.json', () => {
  interface WebhookCase extends Case {
    input: { payload: string; header: string; secret: string; now: number; toleranceSeconds?: number };
    expected: { outcome: 'accept' | 'reject'; eventType?: string; eventId?: string };
  }

  afterEach(() => {
    setSystemTime();
  });

  for (const c of vectors<{ cases: WebhookCase[] }>('webhook.json').cases.filter(runsHere)) {
    it(c.name, async () => {
      running(
        'webhook.json',
        c.expected,
        c.expected.outcome === 'reject' ? ['outcome'] : ['outcome', 'eventType', 'eventId'],
      );
      setSystemTime(new Date(c.input.now * 1000));
      const options = c.input.toleranceSeconds === undefined ? {} : { tolerance: c.input.toleranceSeconds };

      const result = await verifyWebhook(c.input.payload, c.input.header, c.input.secret, options).then(
        (event) => ({ event }),
        (error: unknown) => ({ error }),
      );

      if (c.expected.outcome === 'reject') {
        expect('error' in result && result.error).toBeInstanceOf(WebhookVerificationError);
        return;
      }
      expect('event' in result && result.event).toMatchObject({ type: c.expected.eventType, id: c.expected.eventId });
    });
  }
});

describe('conformance: pagination.json', () => {
  interface PaginationCase extends Case {
    request: { path: string; query: Record<string, string> };
    action: 'nextPage' | 'iterate';
    responses: ScriptedResponse[];
    expected: {
      calls: number;
      ids?: string[];
      queries?: Record<string, string>[];
      nextCursor?: string | null;
      error?: ExpectedError;
    };
  }

  for (const c of vectors<{ cases: PaginationCase[] }>('pagination.json').cases.filter(runsHere)) {
    it(c.name, async () => {
      running('pagination.json', c.expected, ['calls', 'ids', 'queries', 'nextCursor', 'error']);
      const queries: Record<string, string>[] = [];
      const client = new NuntlyClient({
        apiKey: 'test_key',
        baseUrl: 'https://api.test.com',
        retry: 'none',
        fetch: scriptedFetch(c.responses, (_, url) => queries.push(Object.fromEntries(url.searchParams))),
      });
      const list = () => client.list<{ id: string }>({ path: c.request.path, query: c.request.query });

      const ids: string[] = [];
      let firstPage: { nextCursor: string | null } | undefined;
      const error = await (async () => {
        if (c.action === 'nextPage') {
          firstPage = await list();
          await firstPage.nextPage();
          return;
        }
        for await (const item of list()) ids.push(item.id);
      })().then(
        () => undefined,
        (e: unknown) => e,
      );

      expect(queries).toHaveLength(c.expected.calls);
      if (c.expected.queries) expect(queries).toEqual(c.expected.queries);
      if (c.expected.ids) expect(ids).toEqual(c.expected.ids);
      if ('nextCursor' in c.expected) expect(firstPage?.nextCursor).toBe(c.expected.nextCursor);
      if (c.expected.error) expectError(error, c.expected.error);
      else expect(error).toBeUndefined();
    });
  }
});

describe('conformance: transport.json', () => {
  beforeEach(() => {
    globalThis.setTimeout = ((fn: () => void) => realSetTimeout(fn, 0)) as typeof setTimeout;
  });
  afterEach(() => {
    globalThis.setTimeout = realSetTimeout;
  });

  interface TransportCase extends Case {
    client?: { baseUrl?: string; retry?: 'none'; apiKey?: string; debug?: true; timeoutMs?: number };
    request: { method: 'GET' | 'POST'; path: string; timeoutMs?: number };
    responses: ScriptedResponse[];
    expected: {
      calls: number;
      url?: string;
      sentAuthorization?: string;
      apiKeyHidden?: true;
      result?: { status: number };
      error?: ExpectedError;
    };
  }

  // Every string form a caller can get of a value: console.log, util.inspect, JSON and String.
  const stringForms = (value: unknown): string[] => {
    const forms = [inspect(value, { depth: null, showHidden: true }), Bun.inspect(value, { depth: 50 })];
    try {
      forms.push(String(value), JSON.stringify(value) ?? '');
    } catch {}
    return forms;
  };

  const cases = vectors<{ cases: TransportCase[] }>('transport.json').cases.filter((c) => 'request' in c);
  for (const c of cases.filter(runsHere)) {
    it(c.name, async () => {
      running('transport.json', c.expected, ['calls', 'url', 'sentAuthorization', 'apiKeyHidden', 'result', 'error']);
      const urls: string[] = [];
      const authorizations: (string | null)[] = [];
      const seen: unknown[] = [];
      const record = (...args: unknown[]) => {
        seen.push(...args);
      };
      const options: ClientOptions = {
        apiKey: c.client?.apiKey ?? 'test_key',
        baseUrl: c.client?.baseUrl ?? 'https://api.test.com',
        ...(c.client?.retry ? { retry: c.client.retry } : {}),
        ...(c.client?.timeoutMs !== undefined ? { timeout: c.client.timeoutMs } : {}),
        ...(c.client?.debug ? { logger: { debug: record, info: record, warn: record, error: record } } : {}),
        hooks: { onRequest: record, onRetry: record, onResponse: record, onSuccess: record, onError: record },
        fetch: scriptedFetch(c.responses, (headers, url) => {
          urls.push(url.href);
          authorizations.push(headers.get('authorization'));
        }),
      };
      const request = {
        path: c.request.path,
        options: c.request.timeoutMs !== undefined ? { timeout: c.request.timeoutMs } : {},
      };
      let client: NuntlyClient | undefined;
      let call: ReturnType<NuntlyClient['get']> | undefined;
      let error: unknown;
      try {
        client = new NuntlyClient(options);
        call = c.request.method === 'GET' ? client.get(request) : client.post(request);
        await call;
      } catch (e) {
        error = e;
      }

      expect(urls).toHaveLength(c.expected.calls);
      for (const url of urls) if (c.expected.url) expect(url).toBe(c.expected.url);
      if (c.expected.sentAuthorization) {
        expect(authorizations).toEqual(urls.map(() => c.expected.sentAuthorization!));
      }
      if (c.expected.apiKeyHidden) {
        const values = [client, new Nuntly(options), ...seen, error];
        const leaks = values.flatMap(stringForms).filter((form) => form.includes(options.apiKey!));
        expect(leaks).toEqual([]);
      }
      if (c.expected.result) {
        expect(error).toBeUndefined();
        expect((await call!.asResponse()).status).toBe(c.expected.result.status);
      }
      if (c.expected.error) expectError(error, c.expected.error);
    });
  }
});

describe('conformance: transport.json path ids', () => {
  interface TransportCase extends Case {
    call: { operation: string; args: (string | null)[]; query?: Record<string, unknown>; safe?: true };
    expected: { calls: number; method?: string; path?: string; query?: string; error?: ExpectedError };
  }

  const cases = vectors<{ cases: TransportCase[] }>('transport.json').cases.filter((c) => 'call' in c);
  for (const c of cases.filter(runsHere)) {
    it(c.name, async () => {
      running('transport.json', c.expected, ['calls', 'method', 'path', 'query', 'error']);
      const sent: { method: string; path: string; query: string }[] = [];
      const nuntly = new Nuntly({
        apiKey: 'test_key',
        baseUrl: 'https://api.test.com',
        retry: 'none',
        fetch: (async (input: Request, init?: RequestInit) => {
          const url = new URL(input.url);
          sent.push({ method: init?.method ?? input.method, path: url.pathname, query: url.search.slice(1) });
          return Response.json({ data: {} });
        }) as typeof fetch,
      });
      const args = c.call.query ? [...c.call.args, c.call.query] : c.call.args;
      const call = callOperation(c.call.safe ? safe(nuntly) : nuntly, c.call.operation, args);
      let error: unknown;
      if (c.call.safe) {
        // Safe mode never rejects: an awaited rejection fails the case.
        const result = (await call) as { data: unknown; error: unknown };
        if (c.expected.error) expect(result.data).toBeNull();
        error = result.error ?? undefined;
      } else {
        error = await call.then(
          () => undefined,
          (e: unknown) => e,
        );
      }

      expect(sent).toHaveLength(c.expected.calls);
      if (c.expected.method) expect(sent[0]?.method).toBe(c.expected.method);
      if (c.expected.path) expect(sent[0]?.path).toBe(c.expected.path);
      if (c.expected.query !== undefined) expect(sent[0]?.query).toBe(c.expected.query);
      if (c.expected.error) expectError(error, c.expected.error);
      else expect(error).toBeUndefined();
    });
  }
});

describe('conformance: forward-compat.json', () => {
  interface ForwardCompatCase extends Case {
    call: { operation: string; args: string[] };
    response: { body: unknown };
    expected: { field: string; value: string; known: boolean };
  }

  for (const c of vectors<{ cases: ForwardCompatCase[] }>('forward-compat.json').cases.filter(runsHere)) {
    it(c.name, async () => {
      // `known` needs no branch: a TS response enum is the wire string, known or not.
      running('forward-compat.json', c.expected, ['field', 'value', 'known']);
      const nuntly = new Nuntly({
        apiKey: 'test_key',
        baseUrl: 'https://api.test.com',
        retry: 'none',
        fetch: (async () => Response.json(c.response.body)) as typeof fetch,
      });

      const result = (await callOperation(nuntly, c.call.operation, c.call.args)) as Record<string, unknown>;

      expect(result[c.expected.field]).toBe(c.expected.value);
    });
  }
});

describe('conformance: serialization.json', () => {
  interface SerializationCase extends Case {
    call: { operation: string; args: string[] };
    response: { body: unknown };
    expected: { path: string[]; number: number; integer: boolean };
  }

  for (const c of vectors<{ cases: SerializationCase[] }>('serialization.json').cases.filter(runsHere)) {
    it(c.name, async () => {
      running('serialization.json', c.expected, ['path', 'number', 'integer']);
      const nuntly = new Nuntly({
        apiKey: 'test_key',
        baseUrl: 'https://api.test.com',
        retry: 'none',
        fetch: (async () => Response.json(c.response.body)) as typeof fetch,
      });

      const result = await callOperation(nuntly, c.call.operation, c.call.args);
      const value = c.expected.path.reduce<unknown>((target, key) => (target as Record<string, unknown>)[key], result);

      expect(value).toBe(c.expected.number);
      expect(Number.isInteger(value)).toBe(c.expected.integer);
    });
  }
});

// Last: every vector file ran every case this runtime keeps (requirements.json is the monorepo's capability list).
describe('conformance: every case ran', () => {
  it('runs each case of each vector file once', () => {
    const files = readdirSync(conformanceDir()).filter((f) => f.endsWith('.json') && f !== 'requirements.json');
    const kept = files.map((file) => [file, vectors<{ cases: Case[] }>(file).cases.filter(runsHere).length]);
    // A file with no case for this runtime ran zero cases; a label that names no file still shows up.
    expect(Object.fromEntries([...files.map((file) => [file, 0]), ...ran])).toEqual(Object.fromEntries(kept));
  });
});
