export interface EmailsStatsResponse {
  /** The start date of the stats range */
  start: string;
  /** The end date of the stats range */
  end: string;
  stats: Array<{
    /** The date of the stats */
    occurredOn: string;
    /** Number of emails queued */
    queued: number;
    /** Number of emails scheduled */
    scheduled: number;
    /** Number of emails processed */
    processed: number;
    /** Number of emails sending */
    sending: number;
    /** Number of emails sent */
    sent: number;
    /** Number of emails delivered */
    delivered: number;
    /** Number of emails whose delivery was delayed */
    deliveryDelayed: number;
    /** Number of emails bounced */
    bounced: number;
    /** Number of emails failed */
    failed: number;
    /** Number of emails rejected */
    rejected: number;
    /** Number of emails canceled */
    canceled: number;
    /** Number of complaint received */
    complaintReceived: number;
    /** Number of emails with rendering failed */
    renderingFailed: number;
    /** Number of emails opened */
    opened: number;
    /** Number of unique emails opened */
    uniqueOpened: number;
    /** Number of emails clicked */
    clicked: number;
    /** Number of unique emails clicked */
    uniqueClicked: number;
  }>;
}
