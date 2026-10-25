import type { BroadcastStatus } from '../shared/types.js';

export interface BroadcastResponse {
  /** The id of the broadcast. */
  id: string;
  /** An internal label, shown only to your team. */
  name?: string;
  /** The id of the template. */
  templateId?: string;
  /** The content version this broadcast sends. Frozen once queued. */
  templateVersionId?: string;
  /** The id of the sending domain. */
  domainId?: string;
  /** The topic this broadcast targets. */
  topicId?: string;
  /** The segment this broadcast targets. */
  segmentId?: string;
  from: string;
  /** The subject, falling back to the template version’s subject. */
  subject?: string;
  /** The email address where replies should be sent. If a recipient replies, the response will go to this address instead of the sender's email address */
  replyTo?: Array<string> | string;
  /** The lifecycle state of the broadcast. */
  status: BroadcastStatus | (string & {});
  /** Date at which the broadcast reached its current state. */
  statusAt: string;
  /** May provide more information about the status. */
  statusReason?: Record<string, unknown>;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt: string;
  /** The stored variable values. */
  variables?: Record<string, string | number | boolean>;
}

/** A single item from BroadcastsResponse. */
export interface BroadcastsResponseItem {
  /** The id of the broadcast. */
  id: string;
  /** An internal label, shown only to your team. */
  name?: string;
  /** The id of the template. */
  templateId?: string;
  /** The content version this broadcast sends. Frozen once queued. */
  templateVersionId?: string;
  /** The id of the sending domain. */
  domainId?: string;
  /** The topic this broadcast targets. */
  topicId?: string;
  /** The segment this broadcast targets. */
  segmentId?: string;
  from: string;
  /** The subject, falling back to the template version’s subject. */
  subject?: string;
  /** The email address where replies should be sent. If a recipient replies, the response will go to this address instead of the sender's email address */
  replyTo?: Array<string> | string;
  /** The lifecycle state of the broadcast. */
  status: BroadcastStatus | (string & {});
  /** Date at which the broadcast reached its current state. */
  statusAt: string;
  /** May provide more information about the status. */
  statusReason?: Record<string, unknown>;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt: string;
  /** The stored variable values. */
  variables?: Record<string, string | number | boolean>;
}

/**
 * @example
 *     await nuntly.broadcasts.create({
 *       from: 'Tomlinson AI <ray@info.tomlinson.ai>',
 *       name: 'October newsletter',
 *     });
 */
export interface CreateBroadcastRequest {
  /** The template to send. */
  templateId?: string;
  /** The sender address, on a verified domain. */
  from: string;
  /** An internal label, shown only to your team. */
  name?: string;
  /** The subject. Defaults to the template version’s subject. */
  subject?: string;
  /** The email address where replies should be sent. If a recipient replies, the response will go to this address instead of the sender's email address */
  replyTo?: Array<string> | string;
  /** The topic to send to. */
  topicId?: string;
  /** The segment to send to. */
  segmentId?: string;
  /** Variable values keyed by declared name. */
  variables?: Record<string, string | number | boolean>;
}

/**
 * @example
 *     await nuntly.broadcasts.send('bc_01kabn43yqyxn2bx4ve84mczd3', {
 *       scheduledAt: '2026-03-30T09:00:00.000Z',
 *     });
 */
export interface SendBroadcastRequest {
  /** When to send. Omit to send immediately. */
  scheduledAt?: string;
}

export interface SendBroadcastResponse {
  /** The id of the broadcast. */
  id: string;
  /** The lifecycle state of the broadcast. */
  status: BroadcastStatus | (string & {});
}

/**
 * @example
 *     await nuntly.broadcasts.update('bc_01kabn43yqyxn2bx4ve84mczd3', {
 *       name: 'October newsletter',
 *     });
 */
export interface UpdateBroadcastRequest {
  /** Set to null to detach the template. */
  templateId?: string | null;
  /** The sender address, on a verified domain. */
  from?: string;
  /** Set to null to remove the name. */
  name?: string | null;
  /** Set to null to fall back to the template version’s subject. */
  subject?: string | null;
  /** The email address where replies should be sent. If a recipient replies, the response will go to this address instead of the sender's email address */
  replyTo?: Array<string> | string | null;
  /** Set to null to remove the topic. */
  topicId?: string | null;
  /** Set to null to remove the segment. */
  segmentId?: string | null;
  /** Replaces the stored values. Send {} to clear them. */
  variables?: Record<string, string | number | boolean>;
  /** Only draft is accepted. */
  status?: BroadcastStatus;
}
