/**
 * @example
 *     await nuntly.topics.create({
 *       name: 'example.com',
 *     });
 */
export interface CreateTopicRequest {
  /** A name for the topic, shown to your team. Stored lowercased and trimmed. */
  name: string;
}

export interface TopicResponse {
  /** The id of the topic. */
  id: string;
  /** A name for the topic, shown to your team. Stored lowercased and trimmed. */
  name: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt: string;
}

/** A single item from TopicsResponse. */
export interface TopicsResponseItem {
  /** The id of the topic. */
  id: string;
  /** A name for the topic, shown to your team. Stored lowercased and trimmed. */
  name: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt: string;
}

/**
 * @example
 *     await nuntly.topics.update({
 *       name: 'example.com',
 *     });
 */
export interface UpdateTopicRequest {
  /** A name for the topic, shown to your team. Stored lowercased and trimmed. */
  name: string;
}
