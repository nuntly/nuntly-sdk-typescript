import type { APIPromise, RequestOptions } from '../../../core/index.js';
import { Resource } from '../../../core/index.js';
import type { EmailsStatsResponse } from '../../types.js';

/**
 * EmailsStats resource.
 */
export class EmailsStats extends Resource {
  /**
   * Returns daily email counts for the last 30 days and today, per status and engagement type (sent, delivered, bounced, opened, clicked and more).
   *
   * GET /emails/stats
   * @param options - RequestOptions
   * @returns APIPromise<EmailsStatsResponse>
   */
  retrieve(options?: RequestOptions): APIPromise<EmailsStatsResponse> {
    return this._http
      .get<{ data: EmailsStatsResponse }>({
        path: '/emails/stats',
        options,
      })
      .map((r) => r.data);
  }
}
