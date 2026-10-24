import type {
  APIPromise,
  CursorPage,
  CursorPageParams,
  IdempotentRequestOptions,
  NuntlyClient,
  PagePromise,
  RequestOptions,
} from '../../core/index.js';
import { Resource } from '../../core/index.js';
import { generateIdempotencyKey } from '../../lib/idempotency.js';
import type {
  CreateEmailRequest,
  CreateEmailResponse,
  DeleteEmailResponse,
  EmailResponse,
  EmailsResponseItem,
} from '../types.js';

import { EmailsBulk } from './bulk/index.js';
import { EmailsContent } from './content/index.js';
import { EmailsEvents } from './events/index.js';
import { EmailsStats } from './stats/index.js';

/**
 * Emails resource.
 */
export class Emails extends Resource {
  bulk: EmailsBulk;
  content: EmailsContent;
  events: EmailsEvents;
  stats: EmailsStats;

  constructor(client: NuntlyClient) {
    super(client);
    this.bulk = new EmailsBulk(client);
    this.content = new EmailsContent(client);
    this.events = new EmailsEvents(client);
    this.stats = new EmailsStats(client);
  }

  /**
   * Cancels a scheduled email before it is sent and returns its id with status canceled. Only scheduled emails sent outside a bulk request qualify.
   *
   * DELETE /emails/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns APIPromise<DeleteEmailResponse>
   */
  cancel(id: string, options?: RequestOptions): APIPromise<DeleteEmailResponse> {
    return this._http
      .delete<{ data: DeleteEmailResponse }>({
        path: '/emails/{id}',
        pathParams: { id },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Lists your emails newest first with cursor pagination, up to 30 per page. Each item has its sender, recipients, subject, status and submission date.
   *
   * GET /emails
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<EmailsResponseItem>, EmailsResponseItem>
   */
  list(
    query?: CursorPageParams,
    options?: RequestOptions,
  ): PagePromise<CursorPage<EmailsResponseItem>, EmailsResponseItem> {
    return this._http.list<EmailsResponseItem>({
      path: '/emails',
      query: query as unknown as Record<string, unknown>,
      options,
    });
  }

  /**
   * Returns a single email by id with its delivery status, status reason, recipients, subject, headers, tags, attachment metadata and schedule.
   *
   * GET /emails/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns APIPromise<EmailResponse>
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<EmailResponse> {
    return this._http
      .get<{ data: EmailResponse }>({
        path: '/emails/{id}',
        pathParams: { id },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Send transactional emails through Nuntly platform. It supports HTML and plain-text emails, attachments, labels, custom headers and scheduling.
   *
   * POST /emails
   * @param body - CreateEmailRequest
   * @param options - IdempotentRequestOptions
   * @returns APIPromise<CreateEmailResponse>
   */
  send(body: CreateEmailRequest, options?: IdempotentRequestOptions): APIPromise<CreateEmailResponse> {
    const idempotencyKey = options?.idempotencyKey ?? generateIdempotencyKey();
    options = { ...options, headers: { 'Idempotency-Key': idempotencyKey, ...options?.headers } };
    return this._http
      .post<{ data: CreateEmailResponse }>({
        path: '/emails',
        body,
        options,
      })
      .map((r) => r.data);
  }
}
