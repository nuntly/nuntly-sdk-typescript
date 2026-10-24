/** A single item from TopicMembershipsResponse. */
export interface TopicMembershipsResponseItem {
  /** The id of the contact. */
  contactId: string;
  /** The subscribe/unsubscribe state. */
  state: 'subscribed' | 'unsubscribed' | (string & {});
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt: string;
}
