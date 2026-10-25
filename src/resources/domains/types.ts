import type { DomainReceivingStatus, DomainSendingStatus, DomainStatus } from '../shared/types.js';

/**
 * @example
 *     await nuntly.domains.create({
 *       name: 'example.com',
 *     });
 */
export interface CreateDomainRequest {
  /** The name of the domain to send e-mails' */
  name: string;
  /** Enable sending */
  sending?: boolean;
  /** Enable receiving */
  receiving?: boolean;
}

export interface DeleteDomainResponse {
  /** The id of the domain */
  id: string;
}

export interface DomainRecordsResponse {
  /** The id of the domain */
  id: string;
  /** The name of the domain to send e-mails' */
  name: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** The status for the domain */
  status: DomainStatus | (string & {});
  /** The region of the domain data */
  region: 'eu-west-1';
  /** The date of the lastest verification of this record */
  statusAt: string;
  /** Whether sending is enabled for the domain */
  sending: boolean;
  /** Whether receiving is enabled for the domain */
  receiving: boolean;
  /** The sending status for the domain */
  sendingStatus: DomainSendingStatus | (string & {});
  /** The date of the latest sending status change */
  sendingStatusAt: string;
  /** The receiving status for the domain */
  receivingStatus: DomainReceivingStatus | (string & {});
  /** The date of the latest receiving status change */
  receivingStatusAt: string;
  /** Emit an event for each recipient opens an email their email client */
  openTracking: boolean;
  /** Emit an event for each time the recipient clicks a link in the email */
  clickTracking: boolean;
  /** The DNS records for your domain. */
  records: Array<{
    /** The name of the record. */
    name: string;
    /** The FQDN of the domain record */
    fullname: string;
    /** The type of the record: "TXT", "MX" or "CNAME" */
    recordType: 'TXT' | 'MX' | 'CNAME' | (string & {});
    /** TTL (Time To Live) for this DNS record specifies the duration (in seconds) */
    ttl: string;
    /** The group of group: "DKIM", "SPF", "MX" or "DMARC". It is useful to group the records */
    group: 'DKIM' | 'SPF' | 'MX' | 'DMARC' | 'MX_RECEIVING' | (string & {});
    /** A unique identifier in DKIM record to create CNAME records for verifying domain ownership and enabling email authentication */
    selector?: string;
    /** Priority in a DNS record, typically used in MX (Mail Exchange) records, specifies the order in which mail servers should be used, with lower values indicating higher priority for email delivery */
    priority?: string;
    /** The value of a DNS record is the data that the record points to */
    value: string;
    /** The status of the record */
    status: DomainStatus | (string & {});
    /** The date of the lastest verification of this record */
    statusAt: string;
  }>;
}

/** A single item from DomainsResponse. */
export interface DomainsResponseItem {
  /** The id of the domain */
  id: string;
  /** The name of the domain to send e-mails' */
  name: string;
  /** The status for the domain */
  status: DomainStatus | (string & {});
  /** The sending status for the domain */
  sendingStatus: DomainSendingStatus | (string & {});
  /** The receiving status for the domain */
  receivingStatus: DomainReceivingStatus | (string & {});
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** The region of the domain data */
  region: 'eu-west-1';
}

/**
 * @example
 *     await nuntly.domains.update('dns_01kabn43yqyxn2bx4ve84mczd3', {
 *       openTracking: true,
 *       clickTracking: true,
 *     });
 */
export interface UpdateDomainRequest {
  /** Emit an event for each recipient opens an email their email client */
  openTracking?: boolean;
  /** Emit an event for each time the recipient clicks a link in the email */
  clickTracking?: boolean;
  /** Enable or disable sending */
  sending?: boolean;
  /** Enable or disable receiving */
  receiving?: boolean;
}

export interface UpdateDomainResponse {
  /** The id of the domain */
  id: string;
  /** Emit an event for each recipient opens an email their email client */
  openTracking: boolean;
  /** Emit an event for each time the recipient clicks a link in the email */
  clickTracking: boolean;
}
