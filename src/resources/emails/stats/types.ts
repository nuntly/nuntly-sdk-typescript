export interface EmailsStatsResponse {
  /** The start date of the stats range */
  start: string;
  /** The end date of the stats range */
  end: string;
  stats: Array<{ occurredOn: string; queued: number; scheduled: number; processed: number; sending: number; sent: number; delivered: number; deliveredDelayed: number; bounced: number; failed: number; rejected: number; canceled: number; complaintReceived: number; renderingFailed: number; opened: number; uniqueOpened: number; clicked: number; uniqueClicked: number }>;
}
