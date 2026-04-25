// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ResourcesThreadsAPI from '../threads/threads';
import { ThreadsCursorPage } from '../threads/threads';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Browse email conversations grouped by subject. Mark threads as read or spam, and assign them to an agent.
 */
export class Threads extends APIResource {
  /**
   * List threads in an inbox.
   */
  list(inboxID: string, query: ThreadListParams | null | undefined = {}, options?: RequestOptions): PagePromise<ThreadsCursorPage, ResourcesThreadsAPI.Thread> {
    return this._client.getAPIList(path`/inboxes/${inboxID}/threads`, CursorPage<ResourcesThreadsAPI.Thread>, { query, ...options });
  }
}

export interface ThreadListParams extends CursorPageParams {
  /**
   * Comma-separated labels to filter by (AND logic). Threads with spam/trash are
   * excluded by default unless explicitly requested via ?labels=spam or
   * ?labels=trash.
   */
  labels?: string;
}

export declare namespace Threads {
  export {
    type ThreadListParams as ThreadListParams
  };
}

export { type ThreadsCursorPage }
