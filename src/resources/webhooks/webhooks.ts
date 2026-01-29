// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SharedAPI from '../shared';
import * as EventsAPI from './events';
import {
  EventDeliveriesParams,
  EventDeliveriesResponse,
  EventListParams,
  EventListResponse,
  EventListResponsesCursorPage,
  EventReplayParams,
  EventReplayResponse,
  Events,
} from './events';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Webhooks extends APIResource {
  events: EventsAPI.Events = new EventsAPI.Events(this._client);

  /**
   * Create a webhook
   */
  create(body: WebhookCreateParams, options?: RequestOptions): APIPromise<WebhookCreateResponse> {
    return (
      this._client.post('/webhooks', { body, ...options }) as APIPromise<{ data: WebhookCreateResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Retrieve a webhook
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<WebhookRetrieveResponse> {
    return (
      this._client.get(path`/webhooks/${id}`, options) as APIPromise<{ data: WebhookRetrieveResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Update a webhook
   */
  update(
    id: string,
    body: WebhookUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebhookUpdateResponse> {
    return (
      this._client.put(path`/webhooks/${id}`, { body, ...options }) as APIPromise<{
        data: WebhookUpdateResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * List webhooks
   */
  list(
    query: WebhookListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WebhookListResponsesCursorPage, WebhookListResponse> {
    return this._client.getAPIList('/webhooks', CursorPage<WebhookListResponse>, { query, ...options });
  }

  /**
   * Delete a webhook
   */
  delete(id: string, options?: RequestOptions): APIPromise<WebhookDeleteResponse> {
    return (
      this._client.delete(path`/webhooks/${id}`, options) as APIPromise<{ data: WebhookDeleteResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  unwrap(body: string): UnwrapWebhookEvent {
    return JSON.parse(body) as UnwrapWebhookEvent;
  }
}

export type WebhookListResponsesCursorPage = CursorPage<WebhookListResponse>;

/**
 * Event triggered when an email bounces.
 */
export interface EmailBouncedEvent {
  id: string;

  createdAt: string;

  data: EmailBouncedEvent.Data;

  type: 'email.bounced';
}

export namespace EmailBouncedEvent {
  export interface Data {
    id: string;

    bounce: Data.Bounce;

    domainId: string;

    domainName: string;

    enqueuedAt: string;

    from: string;

    messageId: string;

    orgId: string;

    sentAt: string;

    subject: string;

    to: string | Array<string>;

    bcc?: string | Array<string>;

    bulkId?: string;

    cc?: string | Array<string>;

    headers?: Array<Data.Header>;

    replyTo?: string | Array<string>;

    tags?: { [key: string]: Array<string> };
  }

  export namespace Data {
    export interface Bounce {
      bouncedAt: string;

      bouncedRecipients: Array<Bounce.BouncedRecipient>;

      bounceSubType:
        | 'Undetermined'
        | 'General'
        | 'NoEmail'
        | 'Suppressed'
        | 'OnAccountSuppressionList'
        | 'MailboxFull'
        | 'MessageTooLarge'
        | 'CustomTimeoutExceeded'
        | 'ContentRejected'
        | 'AttachmentRejected';

      bounceType: 'Permanent' | 'Undetermined' | 'Transient';

      feedbackId: string;

      reportingMta?: string;
    }

    export namespace Bounce {
      export interface BouncedRecipient {
        email: string;

        action?: string;

        diagnosticCode?: string;

        status?: string;
      }
    }

    export interface Header {
      name: string;

      value: string;
    }
  }
}

/**
 * Event triggered when a link within an email is clicked by the recipient.
 */
export interface EmailClickedEvent {
  id: string;

  createdAt: string;

  data: EmailClickedEvent.Data;

  type: 'email.clicked';
}

export namespace EmailClickedEvent {
  export interface Data {
    id: string;

    click: Data.Click;

    domainId: string;

    domainName: string;

    enqueuedAt: string;

    from: string;

    messageId: string;

    orgId: string;

    sentAt: string;

    subject: string;

    to: string | Array<string>;

    bcc?: string | Array<string>;

    bulkId?: string;

    cc?: string | Array<string>;

    headers?: Array<Data.Header>;

    replyTo?: string | Array<string>;

    tags?: { [key: string]: Array<string> };
  }

  export namespace Data {
    export interface Click {
      clickedAt: string;

      link: string;

      userAgent: string;
    }

    export interface Header {
      name: string;

      value: string;
    }
  }
}

/**
 * Event triggered when an email is marked as complained by the recipient.
 */
export interface EmailComplainedEvent {
  id: string;

  createdAt: string;

  data: EmailComplainedEvent.Data;

  type: 'email.complained';
}

export namespace EmailComplainedEvent {
  export interface Data {
    id: string;

    complaint: Data.Complaint;

    domainId: string;

    domainName: string;

    enqueuedAt: string;

    from: string;

    messageId: string;

    orgId: string;

    sentAt: string;

    subject: string;

    to: string | Array<string>;

    bcc?: string | Array<string>;

    bulkId?: string;

    cc?: string | Array<string>;

    headers?: Array<Data.Header>;

    replyTo?: string | Array<string>;

    tags?: { [key: string]: Array<string> };
  }

  export namespace Data {
    export interface Complaint {
      complainedAt: string;

      feedbackId: string;

      complainedRecipients?: Array<Complaint.ComplainedRecipient>;

      complaintFeedbackType?: 'abuse' | 'auth-failure' | 'fraud' | 'not-spam' | 'other' | 'virus';

      complaintSubType?: 'OnAccountSuppressionList';

      receivedAt?: string;

      userAgent?: string;
    }

    export namespace Complaint {
      export interface ComplainedRecipient {
        email: string;
      }
    }

    export interface Header {
      name: string;

      value: string;
    }
  }
}

/**
 * Event triggered when an email is delivered successfully.
 */
export interface EmailDeliveredEvent {
  id: string;

  createdAt: string;

  data: EmailDeliveredEvent.Data;

  type: 'email.delivered';
}

export namespace EmailDeliveredEvent {
  export interface Data {
    id: string;

    delivery: Data.Delivery;

    domainId: string;

    domainName: string;

    enqueuedAt: string;

    from: string;

    messageId: string;

    orgId: string;

    sentAt: string;

    subject: string;

    to: string | Array<string>;

    bcc?: string | Array<string>;

    bulkId?: string;

    cc?: string | Array<string>;

    headers?: Array<Data.Header>;

    replyTo?: string | Array<string>;

    tags?: { [key: string]: Array<string> };
  }

  export namespace Data {
    export interface Delivery {
      deliveredAt: string;

      recipients: Array<string>;

      remoteMtaIp: string;

      reportingMta: string;

      smtpResponse: string;

      processingTime?: number;
    }

    export interface Header {
      name: string;

      value: string;
    }
  }
}

/**
 * Event triggered when an email delivery is delayed.
 */
export interface EmailDeliveryDelayedEvent {
  id: string;

  createdAt: string;

  data: EmailDeliveryDelayedEvent.Data;

  type: 'email.deliveryDelayed';
}

export namespace EmailDeliveryDelayedEvent {
  export interface Data {
    id: string;

    deliveryDelay: Data.DeliveryDelay;

    domainId: string;

    domainName: string;

    enqueuedAt: string;

    from: string;

    messageId: string;

    orgId: string;

    sentAt: string;

    subject: string;

    to: string | Array<string>;

    bcc?: string | Array<string>;

    bulkId?: string;

    cc?: string | Array<string>;

    headers?: Array<Data.Header>;

    replyTo?: string | Array<string>;

    tags?: { [key: string]: Array<string> };
  }

  export namespace Data {
    export interface DeliveryDelay {
      delayedAt: string;

      delayedRecipients: Array<DeliveryDelay.DelayedRecipient>;

      delayType:
        | 'InternalFailure'
        | 'General'
        | 'MailboxFull'
        | 'SpamDetected'
        | 'RecipientServerError'
        | 'IPFailure'
        | 'TransientCommunicationFailure'
        | 'BYOIPHostNameLookupUnavailable'
        | 'Undetermined'
        | 'SendingDeferral';

      deliveryStoppedAt: string;

      reportingMta: string;
    }

    export namespace DeliveryDelay {
      export interface DelayedRecipient {
        email: string;

        diagnosticCode?: string;

        status?: string;
      }
    }

    export interface Header {
      name: string;

      value: string;
    }
  }
}

/**
 * Event triggered when an email fails to be sent.
 */
export interface EmailFailedEvent {
  id: string;

  createdAt: string;

  data: EmailFailedEvent.Data;

  type: 'email.failed';
}

export namespace EmailFailedEvent {
  export interface Data {
    id: string;

    domainId: string;

    domainName: string;

    enqueuedAt: string;

    failure: Data.Failure;

    from: string;

    messageId: string;

    orgId: string;

    sentAt: string;

    subject: string;

    to: string | Array<string>;

    bcc?: string | Array<string>;

    bulkId?: string;

    cc?: string | Array<string>;

    headers?: Array<Data.Header>;

    replyTo?: string | Array<string>;

    tags?: { [key: string]: Array<string> };
  }

  export namespace Data {
    export interface Failure {
      error: unknown;
    }

    export interface Header {
      name: string;

      value: string;
    }
  }
}

/**
 * Event triggered when an email is opened by the recipient.
 */
export interface EmailOpenedEvent {
  id: string;

  createdAt: string;

  data: EmailOpenedEvent.Data;

  type: 'email.opened';
}

export namespace EmailOpenedEvent {
  export interface Data {
    id: string;

    domainId: string;

    domainName: string;

    enqueuedAt: string;

    from: string;

    messageId: string;

    open: Data.Open;

    orgId: string;

    sentAt: string;

    subject: string;

    to: string | Array<string>;

    bcc?: string | Array<string>;

    bulkId?: string;

    cc?: string | Array<string>;

    headers?: Array<Data.Header>;

    replyTo?: string | Array<string>;

    tags?: { [key: string]: Array<string> };
  }

  export namespace Data {
    export interface Open {
      openedAt: string;

      userAgent: string;
    }

    export interface Header {
      name: string;

      value: string;
    }
  }
}

/**
 * Event triggered when an email is processed.
 */
export interface EmailProcessedEvent {
  id: string;

  createdAt: string;

  data: EmailProcessedEvent.Data;

  type: 'email.processed';
}

export namespace EmailProcessedEvent {
  export interface Data {
    processed: unknown;
  }
}

/**
 * Event triggered when an email is queued for sending.
 */
export interface EmailQueuedEvent {
  id: string;

  createdAt: string;

  data: EmailQueuedEvent.Data;

  type: 'email.queued';
}

export namespace EmailQueuedEvent {
  export interface Data {
    queue: unknown;
  }
}

/**
 * Event triggered when an email is rejected.
 */
export interface EmailRejectedEvent {
  id: string;

  createdAt: string;

  data: EmailRejectedEvent.Data;

  type: 'email.rejected';
}

export namespace EmailRejectedEvent {
  export interface Data {
    reject: Data.Reject;

    id?: string;

    bcc?: string | Array<string>;

    bulkId?: string;

    cc?: string | Array<string>;

    domainId?: string;

    domainName?: string;

    enqueuedAt?: string;

    from?: string;

    headers?: Array<Data.Header>;

    messageId?: string;

    orgId?: string;

    replyTo?: string | Array<string>;

    sentAt?: string;

    subject?: string;

    tags?: { [key: string]: Array<string> };

    to?: string | Array<string>;
  }

  export namespace Data {
    export interface Reject {
      reason: string;
    }

    export interface Header {
      name: string;

      value: string;
    }
  }
}

/**
 * Event triggered when an email is scheduled for sending.
 */
export interface EmailScheduledEvent {
  id: string;

  createdAt: string;

  data: EmailScheduledEvent.Data;

  type: 'email.scheduled';
}

export namespace EmailScheduledEvent {
  export interface Data {
    schedule: Data.Schedule;
  }

  export namespace Data {
    export interface Schedule {
      scheduledAt: string;
    }
  }
}

/**
 * Event triggered when an email is being sent.
 */
export interface EmailSendingEvent {
  id: string;

  createdAt: string;

  data: EmailSendingEvent.Data;

  type: 'email.sending';
}

export namespace EmailSendingEvent {
  export interface Data {
    id: string;

    domainId: string;

    domainName: string;

    enqueuedAt: string;

    from: string;

    messageId: string;

    orgId: string;

    sending: unknown;

    sentAt: string;

    subject: string;

    to: string | Array<string>;

    bcc?: string | Array<string>;

    bulkId?: string;

    cc?: string | Array<string>;

    headers?: Array<Data.Header>;

    replyTo?: string | Array<string>;

    tags?: { [key: string]: Array<string> };
  }

  export namespace Data {
    export interface Header {
      name: string;

      value: string;
    }
  }
}

/**
 * Event triggered when an email is sent successfully.
 */
export interface EmailSentEvent {
  id: string;

  createdAt: string;

  data: EmailSentEvent.Data;

  type: 'email.sent';
}

export namespace EmailSentEvent {
  export interface Data {
    id: string;

    domainId: string;

    domainName: string;

    enqueuedAt: string;

    from: string;

    messageId: string;

    orgId: string;

    send: unknown;

    sentAt: string;

    subject: string;

    to: string | Array<string>;

    bcc?: string | Array<string>;

    bulkId?: string;

    cc?: string | Array<string>;

    headers?: Array<Data.Header>;

    replyTo?: string | Array<string>;

    tags?: { [key: string]: Array<string> };
  }

  export namespace Data {
    export interface Header {
      name: string;

      value: string;
    }
  }
}

/**
 * Payload for webhook events representing email events, eg. sent, bounced, opened,
 * clicked, complained, etc.
 */
export type Event =
  | EmailQueuedEvent
  | EmailScheduledEvent
  | EmailProcessedEvent
  | EmailSendingEvent
  | EmailSentEvent
  | EmailDeliveredEvent
  | EmailOpenedEvent
  | EmailClickedEvent
  | EmailBouncedEvent
  | EmailComplainedEvent
  | EmailRejectedEvent
  | EmailDeliveryDelayedEvent
  | EmailFailedEvent;

/**
 * Response after creating a webhook
 */
export interface WebhookCreateResponse {
  /**
   * The id of the webhook
   */
  id: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  createdAt: string;

  /**
   * The endpoint URL of the webhook
   */
  endpointUrl: string;

  events: Array<SharedAPI.EventType>;

  /**
   * The signing secret of the webhook.
   */
  signingSecret: string;

  /**
   * The status of the webhook.
   */
  status: 'enabled' | 'disabled' | 'revoked';

  /**
   * The name of the webhook
   */
  name?: string;
}

/**
 * Webhook details
 */
export interface WebhookRetrieveResponse {
  /**
   * The id of the webhook
   */
  id: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  createdAt: string;

  /**
   * The endpoint URL of the webhook
   */
  endpointUrl: string;

  events: Array<SharedAPI.EventType>;

  /**
   * The status of the webhook.
   */
  status: 'enabled' | 'disabled' | 'revoked';

  /**
   * The name of the webhook
   */
  name?: string;
}

/**
 * Response after updating a webhook
 */
export interface WebhookUpdateResponse {
  /**
   * The id of the webhook
   */
  id: string;

  /**
   * The signing secret of the webhook.
   */
  signingSecret?: string;
}

export interface WebhookListResponse {
  /**
   * The id of the webhook
   */
  id: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  createdAt: string;

  /**
   * The endpoint URL of the webhook
   */
  endpointUrl: string;

  events: Array<SharedAPI.EventType>;

  /**
   * The status of the webhook.
   */
  status: 'enabled' | 'disabled' | 'revoked';

  /**
   * The name of the webhook
   */
  name?: string;
}

/**
 * Response after deleting a webhook
 */
export interface WebhookDeleteResponse {
  /**
   * The id of the webhook
   */
  id: string;
}

/**
 * Payload for webhook events representing email events, eg. sent, bounced, opened,
 * clicked, complained, etc.
 */
export type UnwrapWebhookEvent =
  | EmailQueuedEvent
  | EmailScheduledEvent
  | EmailProcessedEvent
  | EmailSendingEvent
  | EmailSentEvent
  | EmailDeliveredEvent
  | EmailOpenedEvent
  | EmailClickedEvent
  | EmailBouncedEvent
  | EmailComplainedEvent
  | EmailRejectedEvent
  | EmailDeliveryDelayedEvent
  | EmailFailedEvent;

export interface WebhookCreateParams {
  /**
   * The endpoint URL of the webhook
   */
  endpointUrl: string;

  events: Array<SharedAPI.EventType>;

  /**
   * The name of the webhook
   */
  name?: string;

  /**
   * The status of the webhook.
   */
  status?: 'enabled' | 'disabled' | 'revoked';
}

export interface WebhookUpdateParams {
  /**
   * The endpoint URL of the webhook
   */
  endpointUrl?: string;

  events?: Array<SharedAPI.EventType>;

  /**
   * The name of the webhook
   */
  name?: string;

  /**
   * If true, a new signing secret will be generated
   */
  rotateSecret?: boolean;

  /**
   * The status of the webhook.
   */
  status?: 'enabled' | 'disabled' | 'revoked';
}

export interface WebhookListParams extends CursorPageParams {}

Webhooks.Events = Events;

export declare namespace Webhooks {
  export {
    type EmailBouncedEvent as EmailBouncedEvent,
    type EmailClickedEvent as EmailClickedEvent,
    type EmailComplainedEvent as EmailComplainedEvent,
    type EmailDeliveredEvent as EmailDeliveredEvent,
    type EmailDeliveryDelayedEvent as EmailDeliveryDelayedEvent,
    type EmailFailedEvent as EmailFailedEvent,
    type EmailOpenedEvent as EmailOpenedEvent,
    type EmailProcessedEvent as EmailProcessedEvent,
    type EmailQueuedEvent as EmailQueuedEvent,
    type EmailRejectedEvent as EmailRejectedEvent,
    type EmailScheduledEvent as EmailScheduledEvent,
    type EmailSendingEvent as EmailSendingEvent,
    type EmailSentEvent as EmailSentEvent,
    type Event as Event,
    type WebhookCreateResponse as WebhookCreateResponse,
    type WebhookRetrieveResponse as WebhookRetrieveResponse,
    type WebhookUpdateResponse as WebhookUpdateResponse,
    type WebhookListResponse as WebhookListResponse,
    type WebhookDeleteResponse as WebhookDeleteResponse,
    type UnwrapWebhookEvent as UnwrapWebhookEvent,
    type WebhookListResponsesCursorPage as WebhookListResponsesCursorPage,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookUpdateParams as WebhookUpdateParams,
    type WebhookListParams as WebhookListParams,
  };

  export {
    Events as Events,
    type EventListResponse as EventListResponse,
    type EventDeliveriesResponse as EventDeliveriesResponse,
    type EventReplayResponse as EventReplayResponse,
    type EventListResponsesCursorPage as EventListResponsesCursorPage,
    type EventListParams as EventListParams,
    type EventDeliveriesParams as EventDeliveriesParams,
    type EventReplayParams as EventReplayParams,
  };
}
