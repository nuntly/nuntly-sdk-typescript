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
   * Retrieve a thread. Auto-marks as read.
   */
  retrieve(threadID: string, options?: RequestOptions): APIPromise<Thread> {
    return (
      this._client.get(path`/threads/${threadID}`, options) as APIPromise<{ data: Thread }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Update thread properties (read status, spam, agent).
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
   * Whether the thread has been read.
   */
  isRead: boolean;

  /**
   * Whether the thread is marked as spam.
   */
  isSpam: boolean;

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

export interface ThreadUpdateParams {
  /**
   * The AI agent identifier.
   */
  agentId?: string | null;

  /**
   * Mark the thread as read or unread.
   */
  isRead?: boolean;

  /**
   * Mark the thread as spam or not spam.
   */
  isSpam?: boolean;
}

Threads.Messages = Messages;

export declare namespace Threads {
  export {
    type Thread as Thread,
    type ThreadUpdateResponse as ThreadUpdateResponse,
    type ThreadUpdateParams as ThreadUpdateParams,
  };

  export {
    Messages as Messages,
    type MessageListResponse as MessageListResponse,
    type MessageListResponsesCursorPage as MessageListResponsesCursorPage,
    type MessageListParams as MessageListParams,
  };
}
