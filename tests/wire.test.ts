import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { NotFoundError, Nuntly } from "../src/index";

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
			const body =
				req.method !== "GET" && req.method !== "DELETE"
					? await req.json().catch(() => null)
					: null;

			lastRequest = {
				method: req.method,
				url: url.pathname + url.search,
				headers,
				body,
			};

			// Route: GET /emails/:id
			if (
				req.method === "GET" &&
				url.pathname.match(/^\/emails\/[^/]+$/) &&
				!url.pathname.includes("em_not_found")
			) {
				return Response.json({
					data: {
						id: "em_123",
						status: "delivered",
						from: "a@b.com",
						to: "c@d.com",
						subject: "Test",
						createdAt: "2026-01-01T00:00:00Z",
					},
				});
			}

			// Route: POST /emails
			if (req.method === "POST" && url.pathname === "/emails") {
				return Response.json(
					{ data: { id: "em_new", status: "queued" } },
					{ status: 201 },
				);
			}

			// Route: GET /emails (paginated)
			if (req.method === "GET" && url.pathname === "/emails") {
				const cursor = url.searchParams.get("cursor");
				if (!cursor) {
					return Response.json({
						data: [{ id: "em_1" }, { id: "em_2" }],
						nextCursor: "page2",
					});
				}
				return Response.json({ data: [{ id: "em_3" }], nextCursor: null });
			}

			// Route: POST /domains
			if (req.method === "POST" && url.pathname === "/domains") {
				return Response.json(
					{ data: { id: "dns_123", name: body?.name, status: "pending" } },
					{ status: 201 },
				);
			}

			// Route: 404
			if (url.pathname.includes("not-found")) {
				return Response.json(
					{ message: "Not found", code: "RESOURCE_NOT_FOUND" },
					{ status: 404 },
				);
			}

			return Response.json({ message: "Not found" }, { status: 404 });
		},
	});
	baseUrl = `http://localhost:${server.port}`;
});

afterAll(() => {
	server.stop();
});

function createClient() {
	return new Nuntly({ apiKey: "test_wire_key", baseUrl, retry: "none" });
}

describe("Wire: Headers", () => {
	it("sends Authorization bearer header", async () => {
		const nuntly = createClient();
		await nuntly.emails.retrieve("em_1");
		expect(lastRequest!.headers["authorization"]).toBe("Bearer test_wire_key");
	});

	it("sends Content-Type json on POST", async () => {
		const nuntly = createClient();
		await nuntly.emails.send({
			from: "a@b.com",
			to: "c@d.com",
			subject: "Test",
		});
		expect(lastRequest!.headers["content-type"]).toContain("application/json");
	});

	it("sends User-Agent with SDK version and runtime", async () => {
		const nuntly = createClient();
		await nuntly.emails.retrieve("em_1");
		expect(lastRequest!.headers["user-agent"]).toMatch(
			/^@nuntly\/sdk\/[\w.+-]+ /,
		);
	});

	it("appends appInfo to User-Agent without removing the SDK identifier", async () => {
		const nuntly = new Nuntly({
			apiKey: "test_key",
			baseUrl,
			appInfo: { name: "@nuntly/cli", version: "9.9.9" },
		});
		await nuntly.emails.retrieve("em_1");
		expect(lastRequest!.headers["user-agent"]).toMatch(
			/^@nuntly\/sdk\/[\w.+-]+ \(@nuntly\/cli\/9\.9\.9\) /,
		);
	});
});

describe("Wire: Request body serialization", () => {
	it("serializes POST body as JSON", async () => {
		const nuntly = createClient();
		await nuntly.domains.create({
			name: "wire-test.com",
			sending: true,
			receiving: false,
		});
		expect(lastRequest!.body).toEqual({
			name: "wire-test.com",
			sending: true,
			receiving: false,
		});
	});

	it("sends correct HTTP method", async () => {
		const nuntly = createClient();
		await nuntly.emails.retrieve("em_1");
		expect(lastRequest!.method).toBe("GET");

		await nuntly.emails.send({
			from: "a@b.com",
			to: "c@d.com",
			subject: "Test",
		});
		expect(lastRequest!.method).toBe("POST");
	});
});

describe("Wire: URL construction", () => {
	it("builds path params correctly", async () => {
		const nuntly = createClient();
		await nuntly.emails.retrieve("em_abc123");
		expect(lastRequest!.url).toBe("/emails/em_abc123");
	});

	it("passes query params on paginated endpoints", async () => {
		const nuntly = createClient();
		await nuntly.emails.list({ limit: 5 });
		expect(lastRequest!.url).toContain("limit=5");
	});
});

describe("Wire: Response handling", () => {
	it("unwraps { data: T } envelope", async () => {
		const nuntly = createClient();
		const email = await nuntly.emails.retrieve("em_1");
		expect(email.id).toBe("em_123");
		expect(email.status).toBe("delivered");
	});

	it("pagination fetches multiple pages", async () => {
		const nuntly = createClient();
		const page1 = await nuntly.emails.list();
		expect(page1.data.length).toBe(2);
		expect(page1.hasNextPage()).toBe(true);

		const page2 = await page1.nextPage();
		expect(page2.data.length).toBe(1);
		expect(page2.hasNextPage()).toBe(false);
	});
});

describe("Wire: withResponse()", () => {
	it("returns data and raw Response together", async () => {
		const nuntly = createClient();
		const { data, response } = await nuntly.emails.withResponse(
			nuntly.emails.retrieve("em_1"),
		);
		expect(data.id).toBe("em_123");
		expect(response).toBeInstanceOf(Response);
		expect(response.status).toBe(200);
		expect(response.headers.get("content-type")).toContain("application/json");
	});
});

describe("Wire: Error responses", () => {
	it("throws NotFoundError on 404", async () => {
		const nuntly = createClient();
		await expect(nuntly.emails.retrieve("em_not_found")).rejects.toThrow(
			NotFoundError,
		);
	});

	it("error contains structured body", async () => {
		const nuntly = createClient();
		try {
			await nuntly.emails.retrieve("em_not_found");
			expect.unreachable("should have thrown");
		} catch (e: any) {
			expect(e.status).toBe(404);
			expect(e.body.message).toBe("Not found");
		}
	});

	it("error exposes rawResponse", async () => {
		const nuntly = createClient();
		try {
			await nuntly.emails.retrieve("em_not_found");
			expect.unreachable("should have thrown");
		} catch (e: any) {
			expect(e.rawResponse).toBeInstanceOf(Response);
			expect(e.rawResponse.status).toBe(404);
		}
	});
});
