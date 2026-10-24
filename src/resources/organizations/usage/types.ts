export interface OrganizationUsageResponse {
  email: {
    daily: {
      /** Emails counted against the limit in this window: the sum of breakdown. */
      used: number;
      /** Maximum emails for this window after any per-organization adjustment. null means the window is unlimited. 0 means every transactional send is refused. */
      limit: number | null;
      /** Emails counted in this window, per channel. used is the sum of all its values. */
      breakdown: {
        transactional: {
          /** Transactional emails sent */
          sent: number;
          /** Emails received */
          received: number;
        };
        broadcast: {
          /** Broadcast emails sent */
          sent: number;
        };
      };
      /** When the daily window resets (next midnight UTC). */
      resetsAt: string;
    };
    monthly: {
      /** Emails counted against the limit in this window: the sum of breakdown. */
      used: number;
      /** Maximum emails for this window after any per-organization adjustment. null means the window is unlimited. 0 means every transactional send is refused. */
      limit: number | null;
      /** Emails counted in this window, per channel. used is the sum of all its values. */
      breakdown: {
        transactional: {
          /** Transactional emails sent */
          sent: number;
          /** Emails received */
          received: number;
        };
        broadcast: {
          /** Broadcast emails sent */
          sent: number;
        };
      };
      /** When the monthly window resets (end of the billing period). null when the subscription records no period end. */
      resetsAt: string | null;
    };
  };
}
