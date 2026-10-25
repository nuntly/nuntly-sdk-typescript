import type { ContactTopicMembershipsResponseItem } from '../../shared/types.js';

export type ContactTopicMembershipsResponse = Array<ContactTopicMembershipsResponseItem>;

/**
 * @example
 *     await nuntly.contacts.topics.update('ct_01kabn43yqyxn2bx4ve84mczd3', 'tpc_01kabn43yqyxn2bx4ve84mczd3', {
 *       state: 'subscribed',
 *     });
 */
export interface SetContactTopicMembershipRequest {
  /** The subscribe/unsubscribe state. */
  state: 'subscribed' | 'unsubscribed';
}

export interface SetContactTopicMembershipResponse {
  /** The id of the contact. */
  contactId: string;
  /** The id of the topic. */
  topicId: string;
  /** The subscribe/unsubscribe state. */
  state: 'subscribed' | 'unsubscribed' | (string & {});
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt: string;
}
