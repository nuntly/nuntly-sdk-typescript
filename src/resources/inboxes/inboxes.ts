// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ThreadsAPI from './threads';
import { ThreadListParams, Threads } from './threads';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Create email inboxes at a specific address on a verified receiving domain. Assign inboxes to namespaces or AI agents.
 */
export class Inboxes extends APIResource {
  threads: ThreadsAPI.Threads = new ThreadsAPI.Threads(this._client);

  /**
   * Create a new inbox on a verified domain.
   */
  create(body: InboxCreateParams, options?: RequestOptions): APIPromise<Inbox> {
    return (this._client.post('/inboxes', { body, ...options }) as APIPromise<{ data: Inbox }>)._thenUnwrap((obj) => obj.data);
  }

  /**
   * Retrieve an inbox with thread stats.
   */
  retrieve(inboxID: string, options?: RequestOptions): APIPromise<Inbox> {
    return (this._client.get(path`/inboxes/${inboxID}`, options) as APIPromise<{ data: Inbox }>)._thenUnwrap((obj) => obj.data);
  }

  /**
   * Update an inbox.
   */
  update(inboxID: string, body: InboxUpdateParams | null | undefined = {}, options?: RequestOptions): APIPromise<InboxUpdateResponse> {
    return (this._client.patch(path`/inboxes/${inboxID}`, { body, ...options }) as APIPromise<{ data: InboxUpdateResponse }>)._thenUnwrap((obj) => obj.data);
  }

  /**
   * List all inboxes.
   */
  list(query: InboxListParams | null | undefined = {}, options?: RequestOptions): PagePromise<InboxesCursorPage, Inbox> {
    return this._client.getAPIList('/inboxes', CursorPage<Inbox>, { query, ...options });
  }

  /**
   * Soft-delete an inbox.
   */
  delete(inboxID: string, options?: RequestOptions): APIPromise<InboxDeleteResponse> {
    return (this._client.delete(path`/inboxes/${inboxID}`, options) as APIPromise<{ data: InboxDeleteResponse }>)._thenUnwrap((obj) => obj.data);
  }

  /**
   * Send a new message from an inbox.
   */
  send(inboxID: string, body: InboxSendParams, options?: RequestOptions): APIPromise<InboxSendResponse> {
    return (this._client.post(path`/inboxes/${inboxID}/messages`, { body, ...options }) as APIPromise<{ data: InboxSendResponse }>)._thenUnwrap((obj) => obj.data);
  }
}

export type InboxesCursorPage = CursorPage<Inbox>

export interface Inbox {
  /**
   * The id of the inbox
   */
  id: string;

  /**
   * The local-part of the email address.
   */
  address: string;

  /**
   * The AI agent identifier.
   */
  agentId: string | null;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  createdAt: string;

  /**
   * The id of the domain.
   */
  domainId: string;

  /**
   * The domain name.
   */
  domainName: string;

  /**
   * The display name of the inbox.
   */
  name: string | null;

  /**
   * The id of the namespace.
   */
  namespaceId: string | null;

  /**
   * The display name of the namespace.
   */
  namespaceName: string | null;

  /**
   * Date at which the object was updated (ISO 8601 format)
   */
  updatedAt?: string;
}

export interface InboxUpdateResponse {
  /**
   * The id of the resource.
   */
  id: string;
}

export interface InboxDeleteResponse {
  /**
   * The id of the resource.
   */
  id: string;
}

export interface InboxSendResponse {
  /**
   * The id of the message
   */
  id: string;

  /**
   * The RFC 5322 Message-ID header.
   */
  messageId: string;

  /**
   * The subject of the message.
   */
  subject: string;

  /**
   * The id of the thread.
   */
  threadId: string;
}

export interface InboxCreateParams {
  /**
   * The local-part of the email address (before the @).
   */
  address: string;

  /**
   * The external AI agent identifier.
   */
  agentId?: string;

  /**
   * The id of the domain for this inbox. Defaults to your provided domain when
   * omitted.
   */
  domainId?: string;

  /**
   * The display name of the inbox.
   */
  name?: string;

  /**
   * The id of the namespace to assign the inbox to.
   */
  namespaceId?: string;
}

export interface InboxUpdateParams {
  /**
   * The display name of the inbox.
   */
  name?: string | null;
}

export interface InboxListParams extends CursorPageParams {
  /**
   * Filter by namespace.
   */
  namespaceId?: string;
}

export interface InboxSendParams {
  /**
   * The message subject.
   */
  subject: string;

  /**
   * The recipient addresses.
   */
  to: Array<string>;

  /**
   * The BCC addresses.
   */
  bcc?: Array<string>;

  /**
   * The CC addresses.
   */
  cc?: Array<string>;

  /**
   * The HTML body.
   */
  html?: string;

  /**
   * The plain text body.
   */
  text?: string;
}

Inboxes.Threads = Threads;

export declare namespace Inboxes {
  export {
    type Inbox as Inbox,
    type InboxUpdateResponse as InboxUpdateResponse,
    type InboxDeleteResponse as InboxDeleteResponse,
    type InboxSendResponse as InboxSendResponse,
    type InboxesCursorPage as InboxesCursorPage,
    type InboxCreateParams as InboxCreateParams,
    type InboxUpdateParams as InboxUpdateParams,
    type InboxListParams as InboxListParams,
    type InboxSendParams as InboxSendParams
  };

  export {
    Threads as Threads,
    type ThreadListParams as ThreadListParams
  };
}
