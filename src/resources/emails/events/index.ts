import { Resource } from '../../../core/index.js';
import type { APIPromise, RequestOptions } from '../../../core/index.js';
import type { EmailEventsResponse } from '../../types.js';


/**
 * EmailsEvents resource.
 */
export class EmailsEvents extends Resource {

  /**
   * Returns the delivery event history for an email (sent, delivered, opened, bounced, etc.).
   *
   * GET /emails/{id}/events
   * @param id - string
   * @param options - RequestOptions
   * @returns APIPromise<EmailEventsResponse>
   */
  list(id: string, options?: RequestOptions): APIPromise<EmailEventsResponse> {
    return this._http.get<{ data: EmailEventsResponse }>({
      path: '/emails/{id}/events',
      pathParams: { id },
      options,
    }).map((r) => r.data);
  }

}
