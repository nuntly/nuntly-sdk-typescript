// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as InboxesAPI from '../inboxes/inboxes';
import { InboxesCursorPage } from '../inboxes/inboxes';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Isolate inboxes by tenant, client, or agent using namespaces. Use an external ID to map namespaces to your own data model.
 */
export class Inboxes extends APIResource {
  /**
   * List inboxes in a namespace.
   */
  list(namespaceID: string, query: InboxListParams | null | undefined = {}, options?: RequestOptions): PagePromise<InboxesCursorPage, InboxesAPI.Inbox> {
    return this._client.getAPIList(path`/namespaces/${namespaceID}/inboxes`, CursorPage<InboxesAPI.Inbox>, { query, ...options });
  }
}

export interface InboxListParams extends CursorPageParams {
}

export declare namespace Inboxes {
  export {
    type InboxListParams as InboxListParams
  };
}

export { type InboxesCursorPage }
