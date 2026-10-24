import type { EmailStatus } from '../../shared/types.js';

/** A single item from BroadcastRecipientsResponse. */
export interface BroadcastRecipientsResponseItem {
  /** The id of the recipient record. */
  id: string;
  /** The source contact, absent once deleted. */
  contactId: string | null;
  /** The recipient address, kept until your retention window ends. */
  email: string;
  /** The current status of the recipient’s email. */
  outcome: EmailStatus | (string & {});
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
}
