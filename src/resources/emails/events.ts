import { Resource } from '../../core/index.js';
import type { RequestOptions } from '../../core/index.js';
import type { EmailEventsResponse } from '../../types/index.js';


/**
 * EmailsEvents resource.
 */
export class EmailsEvents extends Resource {

  /**
   * Returns the full delivery event history for an email (sent, delivered, opened, bounced, etc.).
   *
   * GET /emails/{id}/events
   * @param id - string
   * @param options - RequestOptions
   * @returns Promise<EmailEventsResponse>
   */
  async list(id: string, options?: RequestOptions): Promise<EmailEventsResponse> {
    const response = await this._http.get<{ data: EmailEventsResponse }>(`/emails/${id}/events`, undefined, options);
    return response.data;
  }

}
