import type { APIPromise, RequestOptions } from '../../../core/index.js';
import { Resource } from '../../../core/index.js';
import type {
  ContactTopicMembershipsResponse,
  SetContactTopicMembershipRequest,
  SetContactTopicMembershipResponse,
} from '../../types.js';

/**
 * ContactsTopics resource.
 */
export class ContactsTopics extends Resource {
  /**
   * List a contact's subscription state per topic.
   *
   * GET /contacts/{contactId}/topics
   * @param contactId - string
   * @param options - RequestOptions
   * @returns APIPromise<ContactTopicMembershipsResponse>
   */
  list(contactId: string, options?: RequestOptions): APIPromise<ContactTopicMembershipsResponse> {
    return this._http
      .get<{ data: ContactTopicMembershipsResponse }>({
        path: '/contacts/{contactId}/topics',
        pathParams: { contactId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Subscribe or unsubscribe a contact from a topic.
   *
   * PUT /contacts/{contactId}/topics/{topicId}
   * @param contactId - string
   * @param topicId - string
   * @param body - SetContactTopicMembershipRequest
   * @param options - RequestOptions
   * @returns APIPromise<SetContactTopicMembershipResponse>
   */
  update(
    contactId: string,
    topicId: string,
    body: SetContactTopicMembershipRequest,
    options?: RequestOptions,
  ): APIPromise<SetContactTopicMembershipResponse> {
    return this._http
      .put<{ data: SetContactTopicMembershipResponse }>({
        path: '/contacts/{contactId}/topics/{topicId}',
        pathParams: { contactId, topicId },
        body,
        options,
      })
      .map((r) => r.data);
  }
}
