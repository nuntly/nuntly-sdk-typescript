/**
 * @example
 *     await nuntly.segments.create({
 *       name: 'example.com',
 *     });
 */
export interface CreateSegmentRequest {
  /** A name for the segment, shown to your team. Stored lowercased and trimmed. */
  name: string;
}

export interface SegmentResponse {
  /** The id of the segment. */
  id: string;
  /** A name for the segment, shown to your team. Stored lowercased and trimmed. */
  name: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt: string;
}

/** A single item from SegmentsResponse. */
export interface SegmentsResponseItem {
  /** The id of the segment. */
  id: string;
  /** A name for the segment, shown to your team. Stored lowercased and trimmed. */
  name: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt: string;
}

/**
 * @example
 *     await nuntly.segments.update({
 *       name: 'example.com',
 *     });
 */
export interface UpdateSegmentRequest {
  /** A name for the segment, shown to your team. Stored lowercased and trimmed. */
  name: string;
}
