// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as MessagesAPI from './messages';
import { MessageListParams, MessageListResponse, MessageListResponsesCursorPage, Messages } from './messages';
import { APIPromise } from '../../core/api-promise';
import { CursorPage } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Browse email conversations grouped by subject. Mark threads as read or spam, and assign them to an agent.
 */
export class Threads extends APIResource {
  messages: MessagesAPI.Messages = new MessagesAPI.Messages(this._client);

  /**
   * Retrieve a thread. Pass ?markRead=true to automatically remove the unread label
   * from all messages.
   */
  retrieve(
    threadID: string,
    query: ThreadRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Thread> {
    return (
      this._client.get(path`/threads/${threadID}`, { query, ...options }) as APIPromise<{ data: Thread }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Update thread labels and agent assignment. Label operations apply to all
   * messages in the thread.
   */
  update(
    threadID: string,
    body: ThreadUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ThreadUpdateResponse> {
    return (
      this._client.patch(path`/threads/${threadID}`, { body, ...options }) as APIPromise<{
        data: ThreadUpdateResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export type ThreadsCursorPage = CursorPage<Thread>;

export interface Thread {
  /**
   * The id of the thread
   */
  id: string;

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
  domainId: string | null;

  /**
   * The domain name.
   */
  domainName: string;

  /**
   * The id of the inbox.
   */
  inboxId: string;

  /**
   * Aggregated labels from all messages in the thread.
   */
  labels: Array<string>;

  /**
   * The timestamp of the most recent message.
   */
  lastMessageAt: string;

  /**
   * The number of messages in the thread.
   */
  messageCount: number;

  /**
   * The original subject line.
   */
  subject: string;

  /**
   * Date at which the object was updated (ISO 8601 format)
   */
  updatedAt?: string;
}

export interface ThreadUpdateResponse {
  /**
   * The id of the resource.
   */
  id: string;
}

export interface ThreadRetrieveParams {
  /**
   * Set to "true" to automatically remove the unread label from all messages in the
   * thread.
   */
  markRead?: string;
}

export interface ThreadUpdateParams {
  /**
   * Labels to add to all messages in the thread.
   */
  addLabels?: Array<string>;

  /**
   * The AI agent identifier.
   */
  agentId?: string | null;

  /**
   * Labels to remove from all messages in the thread.
   */
  removeLabels?: Array<string>;
}

Threads.Messages = Messages;

export declare namespace Threads {
  export {
    type Thread as Thread,
    type ThreadUpdateResponse as ThreadUpdateResponse,
    type ThreadRetrieveParams as ThreadRetrieveParams,
    type ThreadUpdateParams as ThreadUpdateParams,
  };

  export {
    Messages as Messages,
    type MessageListResponse as MessageListResponse,
    type MessageListResponsesCursorPage as MessageListResponsesCursorPage,
    type MessageListParams as MessageListParams,
  };
}
