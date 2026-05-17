import { describe, expect, it } from "bun:test";
import type {
	CreateDomainRequest,
	CreateEmailRequest,
	ReplyMessageRequest,
} from "../src/index";
import {
	BadRequestError,
	createSafeNuntly,
	NotFoundError,
	Nuntly,
	RateLimitError,
	verifyWebhook,
	WebhookVerificationError,
} from "../src/index";

function mockFetch(handler: (req: Request) => Response | Promise<Response>) {
	return (input: string | Request | URL, init?: RequestInit) => {
		const url =
			typeof input === "string"
				? input
				: input instanceof URL
					? input.toString()
					: input.url;
		const method = init?.method ?? "GET";
		const req = new Request(url, {
			method,
			body: init?.body,
			headers: init?.headers,
		});
		return Promise.resolve(handler(req));
	};
}

function jsonResponse(
	body: unknown,
	status = 200,
	headers: Record<string, string> = {},
) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json", ...headers },
	});
}

function createClient(handler: (req: Request) => Response | Promise<Response>) {
	return new Nuntly({
		apiKey: "test_key",
		baseUrl: "https://api.test.com",
		fetch: mockFetch(handler) as typeof fetch,
	});
}

const emailPayload: CreateEmailRequest = {
	from: "hello@example.com",
	to: "user@example.com",
	subject: "Welcome to Nuntly",
	html: "<h1>Welcome!</h1>",
};

const domainPayload: CreateDomainRequest = {
	name: "example.com",
};

const replyPayload: ReplyMessageRequest = {
	replyAll: false,
};

describe("HTTP methods and paths", () => {
	it("emails.retrieve calls GET /emails/{id}", async () => {
		let captured: Request | null = null;
		const nuntly = createClient((req) => {
			captured = req;
			return jsonResponse({ data: { id: "em_123", status: "delivered" } });
		});

		await nuntly.emails.retrieve("em_123");
		expect(captured!.method).toBe("GET");
		expect(captured!.url).toContain("/emails/em_123");
	});

	it("emails.send calls POST /emails with typed body", async () => {
		let captured: Request | null = null;
		const nuntly = createClient((req) => {
			captured = req;
			return jsonResponse({ data: { id: "em_456", status: "queued" } });
		});

		await nuntly.emails.send(emailPayload);
		expect(captured!.method).toBe("POST");
		expect(captured!.url).toContain("/emails");
	});

	it("domains.create calls POST /domains with typed body", async () => {
		let captured: Request | null = null;
		const nuntly = createClient((req) => {
			captured = req;
			return jsonResponse({ data: { id: "dom_123", name: "example.com" } });
		});

		await nuntly.domains.create(domainPayload);
		expect(captured!.method).toBe("POST");
		expect(captured!.url).toContain("/domains");
	});

	it("domains.delete calls DELETE /domains/{id}", async () => {
		let captured: Request | null = null;
		const nuntly = createClient((req) => {
			captured = req;
			return jsonResponse({ data: { id: "dom_123" } });
		});

		await nuntly.domains.delete("dom_123");
		expect(captured!.method).toBe("DELETE");
		expect(captured!.url).toContain("/domains/dom_123");
	});

	it("messages.reply calls POST /messages/{id}/reply", async () => {
		let captured: Request | null = null;
		const nuntly = createClient((req) => {
			captured = req;
			return jsonResponse({
				data: {
					id: "msg_1",
					threadId: "t_1",
					messageId: "m_1",
					subject: "Re: Hi",
				},
			});
		});

		await nuntly.messages.reply("msg_123", replyPayload);
		expect(captured!.method).toBe("POST");
		expect(captured!.url).toContain("/messages/msg_123/reply");
	});

	it("webhooks.events.replay calls POST /webhooks/{id}/events/{eventId}/replay", async () => {
		let captured: Request | null = null;
		const nuntly = createClient((req) => {
			captured = req;
			return new Response(null, { status: 204 });
		});

		await nuntly.webhooks.events.replay("wh_1", "evt_1");
		expect(captured!.method).toBe("POST");
		expect(captured!.url).toContain("/webhooks/wh_1/events/evt_1/replay");
	});
});

describe("Response unwrapping", () => {
	it("unwraps { data: T } envelope from GET response", async () => {
		const nuntly = createClient(() =>
			jsonResponse({
				data: {
					id: "em_1",
					orgId: "org_1",
					status: "delivered",
					from: "a@b.com",
				},
			}),
		);

		const email = await nuntly.emails.retrieve("em_1");
		expect(email.id).toBe("em_1");
		expect(email.status).toBe("delivered");
	});

	it("unwraps { data: T } envelope from POST response", async () => {
		const nuntly = createClient(() =>
			jsonResponse({ data: { id: "em_2", status: "queued" } }),
		);

		const result = await nuntly.emails.send(emailPayload);
		expect(result.id).toBe("em_2");
		expect(result.status).toBe("queued");
	});
});

describe("Error hierarchy", () => {
	it("throws NotFoundError on 404", async () => {
		const nuntly = createClient(() =>
			jsonResponse({ message: "Email not found" }, 404),
		);

		await expect(nuntly.emails.retrieve("nope")).rejects.toThrow(NotFoundError);
	});

	it("throws BadRequestError on 400 with structured body", async () => {
		const nuntly = createClient(() =>
			jsonResponse(
				{
					error: {
						status: 400,
						code: "invalid_body",
						title: "The body is invalid",
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
			expect(err.title).toBe("The body is invalid");
			expect(err.code).toBe("invalid_body");
			expect(err.details).toBe("The field 'to' is invalid or missing.");
		}
	});

	it("throws RateLimitError on 429 with retryAfter", async () => {
		const nuntly = new Nuntly({
			apiKey: "test_key",
			baseUrl: "https://api.test.com",
			maxRetries: 0,
			fetch: mockFetch(() =>
				jsonResponse(
					{ error: { status: 429, code: "rate_limit", title: "Too many requests" } },
					429,
					{ "retry-after": "30" },
				),
			) as typeof fetch,
		});

		try {
			await nuntly.emails.list();
		} catch (e) {
			expect(e).toBeInstanceOf(RateLimitError);
			expect((e as RateLimitError).retryAfter).toBe(30000);
		}
	});

	it("includes requestId from x-request-id header", async () => {
		const nuntly = createClient(() =>
			jsonResponse({ message: "Not found" }, 404, {
				"x-request-id": "req_abc123",
			}),
		);

		try {
			await nuntly.emails.retrieve("nope");
		} catch (e) {
			expect((e as NotFoundError).requestId).toBe("req_abc123");
		}
	});
});

describe("Safe mode", () => {
	it("returns { data, error: null } on success", async () => {
		const nuntly = createSafeNuntly({
			apiKey: "test_key",
			baseUrl: "https://api.test.com",
			fetch: mockFetch(() =>
				jsonResponse({ data: { id: "em_1", status: "delivered" } }),
			) as typeof fetch,
		});

		const result = await nuntly.emails.retrieve("em_1");
		expect(result.data).toBeDefined();
		expect(result.error).toBeNull();
		expect(result.data!.id).toBe("em_1");
	});

	it("returns { data: null, error } on failure", async () => {
		const nuntly = createSafeNuntly({
			apiKey: "test_key",
			baseUrl: "https://api.test.com",
			fetch: mockFetch(() =>
				jsonResponse({ error: { status: 404, code: "not_found", title: "Not found" } }, 404),
			) as typeof fetch,
		});

		const result = await nuntly.emails.retrieve("nope");
		expect(result.data).toBeNull();
		expect(result.error).toBeDefined();
		expect(result.error!.status).toBe(404);
	});
});

describe("Pagination", () => {
	it("list returns CursorPage with data and nextCursor", async () => {
		const nuntly = createClient(() =>
			jsonResponse({
				data: [{ id: "em_1" }, { id: "em_2" }],
				nextCursor: "cursor_abc",
			}),
		);

		const page = await nuntly.emails.list();
		expect(page.data).toHaveLength(2);
		expect(page.nextCursor).toBe("cursor_abc");
		expect(page.hasNextPage()).toBe(true);
	});

	it("list with no more pages returns hasNextPage false", async () => {
		const nuntly = createClient(() =>
			jsonResponse({ data: [{ id: "em_1" }], nextCursor: null }),
		);

		const page = await nuntly.emails.list();
		expect(page.hasNextPage()).toBe(false);
	});

	it("auto-pagination iterates all items across pages", async () => {
		let callCount = 0;
		const nuntly = createClient((req) => {
			callCount++;
			const url = new URL(req.url);
			const cursor = url.searchParams.get("cursor");
			if (!cursor) {
				return jsonResponse({ data: [{ id: "em_1" }], nextCursor: "page2" });
			}
			return jsonResponse({ data: [{ id: "em_2" }], nextCursor: null });
		});

		const page = await nuntly.emails.list();
		const items: unknown[] = [];
		for await (const item of page) {
			items.push(item);
		}
		expect(items).toHaveLength(2);
		expect(callCount).toBe(2);
	});

	it("for await directly on list() result auto-paginates", async () => {
		// Regression: previously `client.emails.list()` was `async` and returned
		// a bare `Promise<CursorPage>`, which made `for await (const x of list())`
		// silently yield nothing. `PagePromise` makes the call site work without
		// an extra `await`.
		let callCount = 0;
		const nuntly = createClient((req) => {
			callCount++;
			const url = new URL(req.url);
			const cursor = url.searchParams.get("cursor");
			if (!cursor) {
				return jsonResponse({ data: [{ id: "em_1" }], nextCursor: "page2" });
			}
			return jsonResponse({ data: [{ id: "em_2" }], nextCursor: null });
		});

		const items: unknown[] = [];
		for await (const item of nuntly.emails.list({ limit: 1 })) {
			items.push(item);
		}
		expect(items).toHaveLength(2);
		expect(callCount).toBe(2);
	});

	it("list() result supports .withResponse() like APIPromise", async () => {
		const nuntly = createClient(() =>
			jsonResponse({ data: [{ id: "em_1" }], nextCursor: null }),
		);

		const { data: page, response } = await nuntly.emails
			.list()
			.withResponse();
		expect(page.data).toHaveLength(1);
		expect(response.status).toBe(200);
	});
});

describe("Auth and headers", () => {
	it("sends Authorization Bearer header", async () => {
		let captured: Request | null = null;
		const nuntly = createClient((req) => {
			captured = req;
			return jsonResponse({ data: {} });
		});

		await nuntly.emails.retrieve("em_1");
		expect(captured!.headers.get("authorization")).toBe("Bearer test_key");
	});

	it("sends User-Agent header", async () => {
		let captured: Request | null = null;
		const nuntly = createClient((req) => {
			captured = req;
			return jsonResponse({ data: {} });
		});

		await nuntly.emails.retrieve("em_1");
		expect(captured!.headers.get("user-agent")).toMatch(
			/^@nuntly\/sdk\/[\w.+-]+ /,
		);
	});
});

describe("Webhook verification", () => {
	// The signing secret may include or omit the `whsec_` prefix. Strip it
	// before HMAC, which is what the production webhook delivery service does.
	async function signWithRawKey(
		payload: string,
		timestamp: string,
		rawKey: string,
	): Promise<string> {
		const encoder = new TextEncoder();
		const key = await crypto.subtle.importKey(
			"raw",
			encoder.encode(rawKey),
			{ name: "HMAC", hash: "SHA-256" },
			false,
			["sign"],
		);
		const signature = await crypto.subtle.sign(
			"HMAC",
			key,
			encoder.encode(`${timestamp}.${payload}`),
		);
		return Array.from(new Uint8Array(signature))
			.map((b) => b.toString(16).padStart(2, "0"))
			.join("");
	}

	async function buildHeader(payload: string, secret: string, ts?: number): Promise<string> {
		const timestamp = String(ts ?? Math.floor(Date.now() / 1000));
		const rawKey = secret.replace(/^whsec_/, "");
		const sig = await signWithRawKey(payload, timestamp, rawKey);
		return `t=${timestamp},v0=${sig}`;
	}

	const secret = "whsec_test_secret";
	const eventPayload = JSON.stringify({
		id: "evt_1",
		createdAt: "2026-03-29T00:00:00Z",
		type: "email.delivered",
		data: {
			id: "em_1",
			orgId: "org_1",
			messageId: "msg_1",
			sentAt: "2026-03-29T00:00:00Z",
			enqueuedAt: "2026-03-29T00:00:00Z",
			domainName: "example.com",
			domainId: "dom_1",
			from: "hello@example.com",
			to: "user@example.com",
			subject: "Hello",
			delivery: {
				deliveredAt: "2026-03-29T00:00:01Z",
				recipients: ["user@example.com"],
				smtpResponse: "250 OK",
				remoteMtaIp: "1.2.3.4",
				reportingMta: "mx.example.com",
			},
		},
	});

	it("verifies a valid signature and returns the typed event", async () => {
		const header = await buildHeader(eventPayload, secret);
		const event = await verifyWebhook(eventPayload, header, secret);
		expect(event.type).toBe("email.delivered");
		expect(event.id).toBe("evt_1");
		if (event.type === "email.delivered") {
			expect(event.data.delivery.recipients).toContain("user@example.com");
		}
	});

	it("accepts the secret without the whsec_ prefix", async () => {
		const header = await buildHeader(eventPayload, secret);
		const event = await verifyWebhook(eventPayload, header, "test_secret");
		expect(event.type).toBe("email.delivered");
	});

	it("accepts the second signature when multiple are provided (key rotation)", async () => {
		const ts = Math.floor(Date.now() / 1000);
		const validSig = (await buildHeader(eventPayload, secret, ts)).split(",")[1];
		const header = `t=${ts},v0=00deadbeef,${validSig}`;
		const event = await verifyWebhook(eventPayload, header, secret);
		expect(event.type).toBe("email.delivered");
	});

	it("rejects an invalid signature", async () => {
		const ts = String(Math.floor(Date.now() / 1000));
		const header = `t=${ts},v0=deadbeef`;
		await expect(verifyWebhook(eventPayload, header, secret)).rejects.toThrow(
			WebhookVerificationError,
		);
	});

	it("rejects an expired timestamp (default 5 min tolerance)", async () => {
		const old = Math.floor(Date.now() / 1000) - 10 * 60;
		const header = await buildHeader(eventPayload, secret, old);
		await expect(verifyWebhook(eventPayload, header, secret)).rejects.toThrow(
			"outside tolerance window",
		);
	});

	it("rejects a future timestamp (replay attack guard)", async () => {
		const future = Math.floor(Date.now() / 1000) + 10 * 60;
		const header = await buildHeader(eventPayload, secret, future);
		await expect(verifyWebhook(eventPayload, header, secret)).rejects.toThrow(
			"outside tolerance window",
		);
	});

	it("rejects a malformed signature header (no t= part)", async () => {
		await expect(
			verifyWebhook(eventPayload, "v0=deadbeef,v0=cafebabe", secret),
		).rejects.toThrow(WebhookVerificationError);
	});

	it("rejects a header with no v0 signature", async () => {
		const ts = String(Math.floor(Date.now() / 1000));
		await expect(
			verifyWebhook(eventPayload, `t=${ts},v1=deadbeef`, secret),
		).rejects.toThrow("No v0 signature");
	});

	it("respects a custom tolerance", async () => {
		const old = Math.floor(Date.now() / 1000) - 60;
		const header = await buildHeader(eventPayload, secret, old);
		// 30s tolerance: 60s old should fail
		await expect(
			verifyWebhook(eventPayload, header, secret, { tolerance: 30 }),
		).rejects.toThrow("outside tolerance window");
		// 120s tolerance: 60s old should pass
		const event = await verifyWebhook(eventPayload, header, secret, { tolerance: 120 });
		expect(event.type).toBe("email.delivered");
	});
});

describe("Safe mode on nested resources", () => {
	it("safe mode works on nested sub-resources", async () => {
		const nuntly = createSafeNuntly({
			apiKey: "test_key",
			baseUrl: "https://api.test.com",
			fetch: mockFetch(() =>
				jsonResponse({ data: [{ id: "evt_1" }], nextCursor: null }),
			) as typeof fetch,
		});

		const result = await nuntly.webhooks.events.list();
		expect(result.data).toBeDefined();
		expect(result.error).toBeNull();
	});
});

describe("Abort signal", () => {
	it("passes abort signal to fetch", async () => {
		let capturedSignal: AbortSignal | undefined;
		const nuntly = new Nuntly({
			apiKey: "test_key",
			baseUrl: "https://api.test.com",
			fetch: ((input: Request, init?: RequestInit) => {
				capturedSignal = init?.signal ?? (input as Request).signal;
				return Promise.resolve(jsonResponse({ data: {} }));
			}) as typeof fetch,
		});

		const controller = new AbortController();
		await nuntly.emails.retrieve("em_1", { signal: controller.signal });
		expect(capturedSignal?.aborted).toBe(false);

		controller.abort();
		expect(capturedSignal?.aborted).toBe(true);
	});
});

describe("Retry behavior", () => {
	it("retries on 500 and succeeds on second attempt", async () => {
		let attempt = 0;
		const nuntly = new Nuntly({
			apiKey: "test_key",
			baseUrl: "https://api.test.com",
			maxRetries: 1,
			fetch: mockFetch(() => {
				attempt++;
				if (attempt === 1)
					return jsonResponse({ message: "Internal error" }, 500);
				return jsonResponse({ data: { id: "em_1" } });
			}) as typeof fetch,
		});

		const email = await nuntly.emails.retrieve("em_1");
		expect(email.id).toBe("em_1");
		expect(attempt).toBe(2);
	});

	it('retryStrategy "none" disables retries', async () => {
		let attempt = 0;
		const nuntly = new Nuntly({
			apiKey: "test_key",
			baseUrl: "https://api.test.com",
			retry: "none",
			fetch: mockFetch(() => {
				attempt++;
				return jsonResponse({ message: "Internal error" }, 500);
			}) as typeof fetch,
		});

		await expect(nuntly.emails.retrieve("em_1")).rejects.toThrow();
		expect(attempt).toBe(1);
	});

	it("accepts custom backoff config", async () => {
		let attempt = 0;
		const nuntly = new Nuntly({
			apiKey: "test_key",
			baseUrl: "https://api.test.com",
			maxRetries: 1,
			retry: {
				strategy: "backoff",
				backoff: { initialInterval: 1, maxInterval: 10, exponent: 1 },
			},
			fetch: mockFetch(() => {
				attempt++;
				if (attempt === 1) return jsonResponse({ message: "error" }, 500);
				return jsonResponse({ data: { id: "em_1" } });
			}) as typeof fetch,
		});

		const email = await nuntly.emails.retrieve("em_1");
		expect(email.id).toBe("em_1");
		expect(attempt).toBe(2);
	});
});

describe("Hooks", () => {
	it("onRequest receives a structured RequestContext", async () => {
		const calls: Array<{ method: string; path: string }> = [];
		const nuntly = new Nuntly({
			apiKey: "test_key",
			baseUrl: "https://api.test.com",
			fetch: mockFetch(() => jsonResponse({ data: { id: "em_1" } })) as typeof fetch,
			hooks: {
				onRequest: (ctx) => {
					calls.push({ method: ctx.method, path: ctx.path });
				},
			},
		});

		await nuntly.emails.retrieve("em_1");
		expect(calls).toEqual([{ method: "GET", path: "/emails/em_1" }]);
	});

	it("path params are URL-encoded at runtime", async () => {
		let capturedUrl: string | undefined;
		const nuntly = new Nuntly({
			apiKey: "test_key",
			baseUrl: "https://api.test.com",
			fetch: mockFetch((req) => {
				capturedUrl = req.url;
				return jsonResponse({ data: { id: "em_1" } });
			}) as typeof fetch,
		});

		await nuntly.emails.retrieve("em with space");
		expect(capturedUrl).toContain("/emails/em%20with%20space");
	});

	it("onResponse fires on success with both request and response", async () => {
		let capturedReqPath: string | undefined;
		let capturedStatus: number | undefined;
		const nuntly = new Nuntly({
			apiKey: "test_key",
			baseUrl: "https://api.test.com",
			fetch: mockFetch(() => jsonResponse({ data: {} }, 200)) as typeof fetch,
			hooks: {
				onResponse: (ctx) => {
					capturedReqPath = ctx.request.path;
					capturedStatus = ctx.response.status;
				},
			},
		});

		await nuntly.emails.retrieve("em_1");
		expect(capturedReqPath).toBe("/emails/em_1");
		expect(capturedStatus).toBe(200);
	});

	it("onResponse also fires on 4xx (alongside onError)", async () => {
		let responseFired = false;
		let errorFired = false;
		const nuntly = new Nuntly({
			apiKey: "test_key",
			baseUrl: "https://api.test.com",
			retry: "none",
			fetch: mockFetch(() =>
				jsonResponse({ error: { status: 404, code: "not_found", title: "Not found" } }, 404),
			) as typeof fetch,
			hooks: {
				onResponse: () => { responseFired = true; },
				onError: () => { errorFired = true; },
			},
		});

		await expect(nuntly.emails.retrieve("em_1")).rejects.toThrow();
		expect(responseFired).toBe(true);
		expect(errorFired).toBe(true);
	});

	it("onSuccess fires only on 2xx and receives parsed data", async () => {
		let successCalls = 0;
		let capturedData: unknown;
		const nuntly = new Nuntly({
			apiKey: "test_key",
			baseUrl: "https://api.test.com",
			retry: "none",
			fetch: mockFetch(() =>
				jsonResponse({ data: { id: "em_1", status: "delivered" } }),
			) as typeof fetch,
			hooks: {
				onSuccess: (ctx) => {
					successCalls++;
					capturedData = ctx.data;
				},
			},
		});

		await nuntly.emails.retrieve("em_1");
		expect(successCalls).toBe(1);
		expect(capturedData).toEqual({ data: { id: "em_1", status: "delivered" } });
	});

	it("onSuccess does NOT fire on 4xx", async () => {
		let successCalls = 0;
		const nuntly = new Nuntly({
			apiKey: "test_key",
			baseUrl: "https://api.test.com",
			retry: "none",
			fetch: mockFetch(() =>
				jsonResponse({ error: { status: 404, code: "not_found", title: "Not found" } }, 404),
			) as typeof fetch,
			hooks: {
				onSuccess: () => { successCalls++; },
			},
		});

		await expect(nuntly.emails.retrieve("em_1")).rejects.toThrow();
		expect(successCalls).toBe(0);
	});

	it("onError receives APIError for HTTP errors with response set", async () => {
		let capturedCtx: { request?: unknown; response?: Response; error?: unknown } = {};
		const nuntly = new Nuntly({
			apiKey: "test_key",
			baseUrl: "https://api.test.com",
			retry: "none",
			fetch: mockFetch(() =>
				jsonResponse({ error: { status: 404, code: "not_found", title: "Not found" } }, 404),
			) as typeof fetch,
			hooks: {
				onError: (ctx) => {
					capturedCtx = ctx;
				},
			},
		});

		await expect(nuntly.emails.retrieve("em_1")).rejects.toThrow(NotFoundError);
		expect(capturedCtx.error).toBeInstanceOf(NotFoundError);
		expect(capturedCtx.response).toBeInstanceOf(Response);
		expect((capturedCtx.error as NotFoundError).status).toBe(404);
	});

	it("onRetry receives a RetryContext with attempt number", async () => {
		const retries: number[] = [];
		let attempt = 0;
		const nuntly = new Nuntly({
			apiKey: "test_key",
			baseUrl: "https://api.test.com",
			maxRetries: 1,
			fetch: mockFetch(() => {
				attempt++;
				if (attempt === 1) return jsonResponse({ message: "error" }, 500);
				return jsonResponse({ data: { id: "em_1" } });
			}) as typeof fetch,
			hooks: {
				onRetry: (ctx) => {
					retries.push(ctx.attempt);
					expect(ctx.request.path).toBe("/emails/em_1");
				},
			},
		});

		await nuntly.emails.retrieve("em_1");
		expect(retries).toEqual([1]);
	});
});

describe("defaultHeaders and withOptions", () => {
	it("sends defaultHeaders on every request", async () => {
		const captured: Headers[] = [];
		const nuntly = new Nuntly({
			apiKey: "test_key",
			baseUrl: "https://api.test.com",
			defaultHeaders: { "X-Tenant-Id": "tenant_42", "X-Trace-Id": "trace_1" },
			fetch: mockFetch((req) => {
				captured.push(req.headers);
				return jsonResponse({ data: { id: "em_1" } });
			}) as typeof fetch,
		});

		await nuntly.emails.retrieve("em_1");
		await nuntly.emails.send(emailPayload);

		expect(captured.length).toBe(2);
		expect(captured[0]!.get("x-tenant-id")).toBe("tenant_42");
		expect(captured[0]!.get("x-trace-id")).toBe("trace_1");
		expect(captured[1]!.get("x-tenant-id")).toBe("tenant_42");
		expect(captured[1]!.get("x-trace-id")).toBe("trace_1");
	});

	it("per-request headers override defaultHeaders", async () => {
		let captured: Headers | null = null;
		const nuntly = new Nuntly({
			apiKey: "test_key",
			baseUrl: "https://api.test.com",
			defaultHeaders: { "X-Tenant-Id": "tenant_default" },
			fetch: mockFetch((req) => {
				captured = req.headers;
				return jsonResponse({ data: { id: "em_1" } });
			}) as typeof fetch,
		});

		await nuntly.emails.retrieve("em_1", {
			headers: { "X-Tenant-Id": "tenant_override" },
		});
		expect(captured!.get("x-tenant-id")).toBe("tenant_override");
	});

	it("withOptions returns a new Nuntly with merged options", async () => {
		let capturedKey: string | null = null;
		const fetchImpl = mockFetch((req) => {
			capturedKey = req.headers.get("authorization");
			return jsonResponse({ data: { id: "em_1" } });
		}) as typeof fetch;

		const root = new Nuntly({
			apiKey: "root_key",
			baseUrl: "https://api.test.com",
			fetch: fetchImpl,
		});
		const tenant = root.withOptions({ apiKey: "tenant_key" });

		// The original is not mutated.
		expect(root).not.toBe(tenant);

		await tenant.emails.retrieve("em_1");
		expect(capturedKey).toBe("Bearer tenant_key");

		await root.emails.retrieve("em_1");
		expect(capturedKey).toBe("Bearer root_key");
	});

	it("withOptions deep-merges defaultHeaders", async () => {
		let captured: Headers | null = null;
		const fetchImpl = mockFetch((req) => {
			captured = req.headers;
			return jsonResponse({ data: { id: "em_1" } });
		}) as typeof fetch;

		const root = new Nuntly({
			apiKey: "root_key",
			baseUrl: "https://api.test.com",
			defaultHeaders: { "X-Service": "billing", "X-Region": "eu1" },
			fetch: fetchImpl,
		});
		const tenant = root.withOptions({
			defaultHeaders: { "X-Tenant-Id": "tenant_42", "X-Region": "us1" },
		});

		await tenant.emails.retrieve("em_1");
		expect(captured!.get("x-service")).toBe("billing"); // inherited
		expect(captured!.get("x-tenant-id")).toBe("tenant_42"); // added
		expect(captured!.get("x-region")).toBe("us1"); // overridden
	});
});
