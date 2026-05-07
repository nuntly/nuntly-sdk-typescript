import { Resource } from '../core/index.js';
import type { NuntlyClient } from '../core/index.js';
import type { RequestOptions, CursorPage, CursorPageParams } from '../core/index.js';
import type { CreateEmailRequest, CreateEmailResponse, DeleteEmailResponse, EmailResponse, EmailsResponseItem } from '../types/index.js';

import { EmailsStats } from './emails/stats.js';
import { EmailsEvents } from './emails/events.js';
import { EmailsContent } from './emails/content.js';
import { EmailsBulk } from './emails/bulk.js';

/**
 * Emails resource.
 */
export class Emails extends Resource {
  stats: EmailsStats;
  events: EmailsEvents;
  content: EmailsContent;
  bulk: EmailsBulk;

  constructor(client: NuntlyClient) {
    super(client);
    this.stats = new EmailsStats(client);
    this.events = new EmailsEvents(client);
    this.content = new EmailsContent(client);
    this.bulk = new EmailsBulk(client);
  }

  /**
   * Returns an email with its current delivery status and metadata.
   *
   * GET /emails/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns Promise<EmailResponse>
   */
  async retrieve(id: string, options?: RequestOptions): Promise<EmailResponse> {
    const response = await this._http.get<{ data: EmailResponse }>(`/emails/${id}`, undefined, options);
    return response.data;
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
    return this._http.list<EmailsResponseItem>('/emails', query as unknown as Record<string, unknown>, options);
  }

  /**
   * Send transactional emails through Nuntly platform. It supports HTML and plain-text emails, attachments, labels, custom headers and scheduling.
   *
   * POST /emails
   * @param body - CreateEmailRequest
   * @param options - RequestOptions
   * @returns Promise<CreateEmailResponse>
   */
  async send(body: CreateEmailRequest, options?: RequestOptions): Promise<CreateEmailResponse> {
    const response = await this._http.post<{ data: CreateEmailResponse }>('/emails', body, options);
    return response.data;
  }

  /**
   * Cancel a scheduled email before delivery. Only emails with `scheduled` status can be cancelled.
   *
   * DELETE /emails/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns Promise<DeleteEmailResponse>
   */
  async cancel(id: string, options?: RequestOptions): Promise<DeleteEmailResponse> {
    const response = await this._http.delete<{ data: DeleteEmailResponse }>(`/emails/${id}`, options);
    return response.data;
  }

}
