import type { ContactSegmentsResponseItem } from '../../shared/types.js';

export interface ContactSegmentMembershipIdResponse {
  /** The id of the contact removed from the segment. */
  id: string;
  /** The id of the segment the contact was removed from. The segment itself is not deleted. */
  segmentId: string;
}

export interface ContactSegmentMembershipResponse {
  /** The id of the contact. */
  contactId: string;
  /** The id of the segment. */
  segmentId: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
}

export type ContactSegmentsResponse = Array<ContactSegmentsResponseItem>;
