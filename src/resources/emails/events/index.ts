import type { APIPromise, RequestOptions } from '../../../core/index.js';
import { Resource } from '../../../core/index.js';
import type { EmailEventsResponse } from '../../types.js';

/**
 * EmailsEvents resource.
 */
export class EmailsEvents extends Resource {
  /**
   * Returns the full event history of an email, newest first, such as queued, sent, delivered, opened, clicked or bounced. The list is not paginated.
   *
   * GET /emails/{id}/events
   * @param id - string
   * @param options - RequestOptions
   * @returns APIPromise<EmailEventsResponse>
   */
  list(id: string, options?: RequestOptions): APIPromise<EmailEventsResponse> {
    return this._http
      .get<{ data: EmailEventsResponse }>({
        path: '/emails/{id}/events',
        pathParams: { id },
        options,
      })
      .map((r) => r.data);
  }
}
