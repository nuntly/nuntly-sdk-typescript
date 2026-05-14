import { Resource } from '../../core/index.js';
import type { NuntlyClient } from '../../core/index.js';
import type { APIPromise, RequestOptions, CursorPage, CursorPageParams } from '../../core/index.js';
import { generateIdempotencyKey } from '../../lib/idempotency.js';
import type { CreateEmailRequest, CreateEmailResponse, DeleteEmailResponse, EmailResponse, EmailsResponseItem } from '../types.js';

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
   * Cancel a scheduled email before delivery. Only emails with `scheduled` status can be cancelled.
   *
   * DELETE /emails/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns APIPromise<DeleteEmailResponse>
   */
  cancel(id: string, options?: RequestOptions): APIPromise<DeleteEmailResponse> {
    return this._http.delete<{ data: DeleteEmailResponse }>({
      path: '/emails/{id}',
      pathParams: { id },
      options,
    }).map((r) => r.data);
  }

  /**
   * Returns sent emails ordered by submission date, newest first.
   *
   * GET /emails
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns Promise<CursorPage<EmailsResponseItem>>
   */
  async list(query?: CursorPageParams, options?: RequestOptions): Promise<CursorPage<EmailsResponseItem>> {
    return this._http.list<EmailsResponseItem>({
      path: '/emails',
      query: query as unknown as Record<string, unknown>,
      options,
    });
  }

  /**
   * Returns an email with its current delivery status and metadata.
   *
   * GET /emails/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns APIPromise<EmailResponse>
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<EmailResponse> {
    return this._http.get<{ data: EmailResponse }>({
      path: '/emails/{id}',
      pathParams: { id },
      options,
    }).map((r) => r.data);
  }

  /**
   * Send transactional emails through Nuntly platform. It supports HTML and plain-text emails, attachments, labels, custom headers and scheduling.
   *
   * POST /emails
   * @param body - CreateEmailRequest
   * @param options - RequestOptions
   * @returns APIPromise<CreateEmailResponse>
   */
  send(body: CreateEmailRequest, options?: RequestOptions): APIPromise<CreateEmailResponse> {
    const idempotencyKey = options?.idempotencyKey ?? generateIdempotencyKey();
    options = { ...options, headers: { 'Idempotency-Key': idempotencyKey, ...options?.headers } };
    return this._http.post<{ data: CreateEmailResponse }>({
      path: '/emails',
      body,
      options,
    }).map((r) => r.data);
  }

}
