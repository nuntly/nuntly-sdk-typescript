import { Resource } from '../../../core/index.js';
import type { APIPromise, RequestOptions } from '../../../core/index.js';
import type { EmailsStatsResponse } from '../../types.js';


/**
 * EmailsStats resource.
 */
export class EmailsStats extends Resource {

  /**
   * Returns aggregated daily sending statistics for the current period.
   *
   * GET /emails/stats
   * @param options - RequestOptions
   * @returns APIPromise<EmailsStatsResponse>
   */
  retrieve(options?: RequestOptions): APIPromise<EmailsStatsResponse> {
    return this._http.get<{ data: EmailsStatsResponse }>({
      path: '/emails/stats',
      options,
    }).map((r) => r.data);
  }

}
