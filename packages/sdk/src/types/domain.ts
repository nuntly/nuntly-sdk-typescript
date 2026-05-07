import type { DomainStatus } from './shared.js';

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

export interface CreateDomainResponse {
  /** The id of the domain */
  id: string;
  /** The name of the domain to send e-mails' */
  name: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** The status for the domain */
  status: DomainStatus;
  /** The region of the domain data */
  region: 'eu-west-1';
  /** The date of the lastest verification of this record */
  statusAt: string;
  /** Whether sending is enabled for the domain */
  sending: boolean;
  /** Whether receiving is enabled for the domain */
  receiving: boolean;
  /** The sending status for the domain */
  sendingStatus: 'enabled' | 'disabled' | 'paused';
  /** The date of the latest sending status change */
  sendingStatusAt: string;
  /** The receiving status for the domain */
  receivingStatus: DomainStatus;
  /** The date of the latest receiving status change */
  receivingStatusAt: string;
  /** Emit an event for each recipient opens an email their email client */
  openTracking: boolean;
  /** Emit an event for each time the recipient clicks a link in the email */
  clickTracking: boolean;
  /** The DNS records for your domain. */
  records: Array<{ name: string; fullname: string; recordType: 'TXT' | 'MX' | 'CNAME'; ttl: string; group: 'DKIM' | 'SPF' | 'MX' | 'DMARC' | 'MX_RECEIVING'; selector?: string; priority?: string; value: string; status: DomainStatus; statusAt: string }>;
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
  status: DomainStatus;
  /** The region of the domain data */
  region: 'eu-west-1';
  /** The date of the lastest verification of this record */
  statusAt: string;
  /** Whether sending is enabled for the domain */
  sending: boolean;
  /** Whether receiving is enabled for the domain */
  receiving: boolean;
  /** The sending status for the domain */
  sendingStatus: 'enabled' | 'disabled' | 'paused';
  /** The date of the latest sending status change */
  sendingStatusAt: string;
  /** The receiving status for the domain */
  receivingStatus: DomainStatus;
  /** The date of the latest receiving status change */
  receivingStatusAt: string;
  /** Emit an event for each recipient opens an email their email client */
  openTracking: boolean;
  /** Emit an event for each time the recipient clicks a link in the email */
  clickTracking: boolean;
  /** The DNS records for your domain. */
  records: Array<{ name: string; fullname: string; recordType: 'TXT' | 'MX' | 'CNAME'; ttl: string; group: 'DKIM' | 'SPF' | 'MX' | 'DMARC' | 'MX_RECEIVING'; selector?: string; priority?: string; value: string; status: DomainStatus; statusAt: string }>;
}

/** A single item from DomainsResponse. */
export interface DomainsResponseItem {
  /** The id of the domain */
  id: string;
  /** The name of the domain to send e-mails' */
  name: string;
  /** The status for the domain */
  status: DomainStatus;
  /** The sending status for the domain */
  sendingStatus: 'enabled' | 'disabled' | 'paused';
  /** The receiving status for the domain */
  receivingStatus: DomainStatus;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** The region of the domain data */
  region: 'eu-west-1';
}

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
