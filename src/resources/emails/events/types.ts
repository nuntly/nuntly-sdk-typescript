import type { EventType } from '../../shared/types.js';

export type EmailEventsResponse = Array<EmailEventsResponseItem>;

export interface EmailEventsResponseItem {
  id: string;
  /** The id of the organization */
  orgId: string;
  /** The id of the email */
  emailId: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** The date at which the event occurred */
  occurredAt?: string;
  /** An event */
  eventType: EventType;
  payload: Record<string, unknown>;
}
