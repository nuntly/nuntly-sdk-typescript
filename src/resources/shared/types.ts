import type { EmailBouncedEvent, EmailClickedEvent, EmailComplainedEvent, EmailDeliveredEvent, EmailDeliveryDelayedEvent, EmailFailedEvent, EmailOpenedEvent, EmailProcessedEvent, EmailQueuedEvent, EmailRejectedEvent, EmailScheduledEvent, EmailSendingEvent, EmailSentEvent } from '../emails/types.js';
import type { MessageAgentTriggeredEvent, MessageReceivedEvent, MessageRejectedEvent, MessageSecurityFlaggedEvent, MessageSentEvent } from '../messages/types.js';

export interface BounceDetail {
  bounceType: 'Permanent' | 'Undetermined' | 'Transient';
  bounceSubType: 'Undetermined' | 'General' | 'NoEmail' | 'Suppressed' | 'OnAccountSuppressionList' | 'MailboxFull' | 'MessageTooLarge' | 'CustomTimeoutExceeded' | 'ContentRejected' | 'AttachmentRejected';
  bouncedRecipients: Array<{ email: string; action?: string; status?: string; diagnosticCode?: string }>;
  bouncedAt: string;
  feedbackId: string;
  reportingMta?: string;
}

export interface ClickDetail {
  clickedAt: string;
  userAgent: string;
  link: string;
}

export interface ComplaintDetail {
  complainedAt: string;
  complainedRecipients?: Array<{ email: string }>;
  complaintSubType?: 'OnAccountSuppressionList';
  complaintFeedbackType?: 'abuse' | 'auth-failure' | 'fraud' | 'not-spam' | 'other' | 'virus';
  feedbackId: string;
  userAgent?: string;
  receivedAt?: string;
}

export interface DeliveryDelayDetail {
  delayedAt: string;
  delayType: 'InternalFailure' | 'General' | 'MailboxFull' | 'SpamDetected' | 'RecipientServerError' | 'IPFailure' | 'TransientCommunicationFailure' | 'BYOIPHostNameLookupUnavailable' | 'Undetermined' | 'SendingDeferral';
  delayedRecipients: Array<{ email: string; status?: string; diagnosticCode?: string }>;
  deliveryStoppedAt: string;
  reportingMta: string;
}

export interface DeliveryDetail {
  deliveredAt: string;
  recipients: Array<string>;
  smtpResponse: string;
  remoteMtaIp: string;
  reportingMta: string;
  processingTime?: number;
}

export type EmailStatus = 'queued' | 'scheduled' | 'processed' | 'failed' | 'sending' | 'sent' | 'delivered' | 'bounced' | 'complained' | 'canceled' | 'rejected';

export type Event = EmailQueuedEvent | EmailScheduledEvent | EmailProcessedEvent | EmailSendingEvent | EmailSentEvent | EmailDeliveredEvent | EmailOpenedEvent | EmailClickedEvent | EmailBouncedEvent | EmailComplainedEvent | EmailRejectedEvent | EmailDeliveryDelayedEvent | EmailFailedEvent | MessageReceivedEvent | MessageSecurityFlaggedEvent | MessageAgentTriggeredEvent | MessageSentEvent | MessageRejectedEvent;

export type EventType = 'email.queued' | 'email.scheduled' | 'email.processed' | 'email.sending' | 'email.sent' | 'email.delivered' | 'email.opened' | 'email.clicked' | 'email.bounced' | 'email.complained' | 'email.rejected' | 'email.deliveryDelayed' | 'email.failed' | 'email.renderingFailed' | 'email.subscribed' | 'email.unsubscribed' | 'message.received' | 'message.security.flagged' | 'message.agent.triggered' | 'message.sent' | 'message.rejected';

export interface FailureDetail {
  error: Record<string, unknown>;
}

export interface IdResponse {
  /** The id of the resource. */
  id: string;
}

export interface InboundEventData {
  orgId: string;
  domainId: string;
  domainName: string;
  inboxId: string;
  threadId: string;
  messageId: string;
  from: string;
  subject: string;
  agentId?: string;
}

/** A single item from InboxesResponse. */
export interface InboxesResponseItem {
  /** The id of the inbox */
  id: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt?: string;
  /** The id of the domain. */
  domainId: string;
  /** The domain name. */
  domainName: string;
  /** The local-part of the email address. */
  address: string;
  /** The display name of the inbox. */
  name: string | null;
  /** The id of the namespace. */
  namespaceId: string | null;
  /** The display name of the namespace. */
  namespaceName: string | null;
  /** The AI agent identifier. */
  agentId: string | null;
}

export interface OpenDetail {
  openedAt: string;
  userAgent: string;
}

export interface RejectDetail {
  reason: string;
}

export interface SendMessageResponse {
  /** The id of the message */
  id: string;
  /** The id of the thread. */
  threadId: string;
  /** The RFC 5322 Message-ID header. */
  messageId: string;
  /** The subject of the message. */
  subject: string;
}

export interface Tag {
  /** The name of the tag */
  name: string;
  /** The tag to add to the email */
  value: string;
}
