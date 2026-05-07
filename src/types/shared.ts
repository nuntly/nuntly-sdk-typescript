export type DomainStatus = 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure';

export type EmailStatus = 'queued' | 'scheduled' | 'processed' | 'failed' | 'sending' | 'sent' | 'delivered' | 'bounced' | 'complained' | 'canceled' | 'rejected';

export type EventType = 'email.queued' | 'email.scheduled' | 'email.processed' | 'email.sending' | 'email.sent' | 'email.delivered' | 'email.opened' | 'email.clicked' | 'email.bounced' | 'email.complained' | 'email.rejected' | 'email.deliveryDelayed' | 'email.failed' | 'email.renderingFailed' | 'email.subscribed' | 'email.unsubscribed' | 'message.received' | 'message.security.flagged' | 'message.agent.triggered' | 'message.sent' | 'message.rejected';

export interface IdResponse {
  /** The id of the resource. */
  id: string;
}
