import type { APIPromise, CursorPage, CursorPageParams, PagePromise, RequestOptions } from '../../../core/index.js';
import { Resource } from '../../../core/index.js';
import type { BroadcastRecipientsResponseItem } from '../../types.js';

/**
 * BroadcastsRecipients resource.
 */
export class BroadcastsRecipients extends Resource {
  /**
   * List the recipients of a broadcast.
   *
   * GET /broadcasts/{broadcastId}/recipients
   * @param broadcastId - string
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<BroadcastRecipientsResponseItem>, BroadcastRecipientsResponseItem>
   */
  list(
    broadcastId: string,
    query?: CursorPageParams,
    options?: RequestOptions,
  ): PagePromise<CursorPage<BroadcastRecipientsResponseItem>, BroadcastRecipientsResponseItem> {
    return this._http.list<BroadcastRecipientsResponseItem>({
      path: '/broadcasts/{broadcastId}/recipients',
      pathParams: { broadcastId },
      query,
      options,
    });
  }
}
