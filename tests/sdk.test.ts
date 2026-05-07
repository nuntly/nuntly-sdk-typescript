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
					message: "Validation failed",
					errors: [{ field: "to", message: "required" }],
				},
				400,
			),
		);

		try {
			await nuntly.emails.send(emailPayload);
		} catch (e) {
			expect(e).toBeInstanceOf(BadRequestError);
			const err = e as BadRequestError;
			expect(err.body.message).toBe("Validation failed");
			expect(err.body.errors).toHaveLength(1);
			expect(err.body.errors![0].field).toBe("to");
		}
	});

	it("throws RateLimitError on 429 with retryAfter", async () => {
		const nuntly = new Nuntly({
			apiKey: "test_key",
			baseUrl: "https://api.test.com",
			maxRetries: 0,
			fetch: mockFetch(() =>
				jsonResponse({ message: "Too many requests" }, 429, {
					"retry-after": "30",
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
				jsonResponse({ message: "Not found" }, 404),
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
			"too old",
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
		).rejects.toThrow("too old");
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
	it("onRequest hook is called before each request", async () => {
		const requests: string[] = [];
		const nuntly = new Nuntly({
			apiKey: "test_key",
			baseUrl: "https://api.test.com",
			fetch: mockFetch(() =>
				jsonResponse({ data: { id: "em_1" } }),
			) as typeof fetch,
			hooks: {
				onRequest: (req) => {
					requests.push(`${req.method} ${new URL(req.url).pathname}`);
				},
			},
		});

		await nuntly.emails.retrieve("em_1");
		expect(requests).toEqual(["GET /emails/em_1"]);
	});

	it("onResponse hook receives response and request", async () => {
		let capturedStatus: number | undefined;
		const nuntly = new Nuntly({
			apiKey: "test_key",
			baseUrl: "https://api.test.com",
			fetch: mockFetch(() => jsonResponse({ data: {} }, 200)) as typeof fetch,
			hooks: {
				onResponse: (res) => {
					capturedStatus = res.status;
				},
			},
		});

		await nuntly.emails.retrieve("em_1");
		expect(capturedStatus).toBe(200);
	});

	it("onError hook is called on API errors", async () => {
		let capturedError: unknown;
		const nuntly = new Nuntly({
			apiKey: "test_key",
			baseUrl: "https://api.test.com",
			retry: "none",
			fetch: mockFetch(() =>
				jsonResponse({ message: "Not found" }, 404),
			) as typeof fetch,
			hooks: {
				onError: (err) => {
					capturedError = err;
				},
			},
		});

		await expect(nuntly.emails.retrieve("em_1")).rejects.toThrow();
		expect(capturedError).toBeDefined();
	});

	it("onRetry hook is called on each retry", async () => {
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
				},
			},
		});

		await nuntly.emails.retrieve("em_1");
		expect(retries).toEqual([1]);
	});

	it("onSuccess hook receives parsed data", async () => {
		let capturedData: unknown;
		const nuntly = new Nuntly({
			apiKey: "test_key",
			baseUrl: "https://api.test.com",
			fetch: mockFetch(() =>
				jsonResponse({ data: { id: "em_1", status: "delivered" } }),
			) as typeof fetch,
			hooks: {
				onSuccess: (data) => {
					capturedData = data;
				},
			},
		});

		await nuntly.emails.retrieve("em_1");
		expect(capturedData).toEqual({ data: { id: "em_1", status: "delivered" } });
	});
});
