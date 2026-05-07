import { Resource } from '../../core/index.js';
import type { RequestOptions } from '../../core/index.js';
import type { EmailsStatsResponse } from '../../types/index.js';


/**
 * EmailsStats resource.
 */
export class EmailsStats extends Resource {

  /**
   * Returns aggregated daily sending statistics for the current period.
   *
   * GET /emails/stats
   * @param options - RequestOptions
   * @returns Promise<EmailsStatsResponse>
   */
  async retrieve(options?: RequestOptions): Promise<EmailsStatsResponse> {
    const response = await this._http.get<{ data: EmailsStatsResponse }>('/emails/stats', undefined, options);
    return response.data;
  }

}
