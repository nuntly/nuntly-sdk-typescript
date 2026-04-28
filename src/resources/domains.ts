// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Add and verify sending and receiving domains. Manage DKIM records, SPF configuration, and enable inbound email routing.
 */
export class Domains extends APIResource {
  /**
   * Add a domain to start configuring DNS records for sending or receiving emails.
   */
  create(body: DomainCreateParams, options?: RequestOptions): APIPromise<DomainCreateResponse> {
    return (
      this._client.post('/domains', { body, ...options }) as APIPromise<{ data: DomainCreateResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Returns a domain with its DNS record configuration and current verification
   * status for each record.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<DomainRetrieveResponse> {
    return (
      this._client.get(path`/domains/${id}`, options) as APIPromise<{ data: DomainRetrieveResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Toggle sending, receiving, open tracking, or click tracking capabilities for a
   * domain.
   */
  update(
    id: string,
    body: DomainUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DomainUpdateResponse> {
    return (
      this._client.patch(path`/domains/${id}`, { body, ...options }) as APIPromise<{
        data: DomainUpdateResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Returns all domains with their verification and capability status.
   */
  list(
    query: DomainListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DomainListResponsesCursorPage, DomainListResponse> {
    return this._client.getAPIList('/domains', CursorPage<DomainListResponse>, { query, ...options });
  }

  /**
   * Remove a domain from the organization. Cannot be deleted if it has active
   * sending or receiving.
   */
  delete(id: string, options?: RequestOptions): APIPromise<DomainDeleteResponse> {
    return (
      this._client.delete(path`/domains/${id}`, options) as APIPromise<{ data: DomainDeleteResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export type DomainListResponsesCursorPage = CursorPage<DomainListResponse>;

export interface DomainCreateResponse {
  /**
   * The id of the domain
   */
  id: string;

  /**
   * Emit an event for each time the recipient clicks a link in the email
   */
  clickTracking: boolean;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  createdAt: string;

  /**
   * The name of the domain to send e-mails'
   */
  name: string;

  /**
   * Emit an event for each recipient opens an email their email client
   */
  openTracking: boolean;

  /**
   * Whether receiving is enabled for the domain
   */
  receiving: boolean;

  /**
   * The receiving status for the domain
   */
  receivingStatus: 'disabled' | 'bootstrapping' | 'pending' | 'active' | 'failed';

  /**
   * The date of the latest receiving status change
   */
  receivingStatusAt: string;

  /**
   * The DNS records for your domain.
   */
  records: Array<DomainCreateResponse.Record>;

  /**
   * The region of the domain data
   */
  region: 'eu-west-1';

  /**
   * Whether sending is enabled for the domain
   */
  sending: boolean;

  /**
   * The sending status for the domain
   */
  sendingStatus: 'enabled' | 'disabled' | 'paused';

  /**
   * The date of the latest sending status change
   */
  sendingStatusAt: string;

  /**
   * The status for the domain
   */
  status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure';

  /**
   * The date of the lastest verification of this record
   */
  statusAt: string;
}

export namespace DomainCreateResponse {
  export interface Record {
    /**
     * The FQDN of the domain record
     */
    fullname: string;

    /**
     * The group of group: "DKIM", "SPF", "MX" or "DMARC". It is useful to group the
     * records
     */
    group: 'DKIM' | 'SPF' | 'MX' | 'DMARC' | 'MX_RECEIVING';

    /**
     * The name of the record.
     */
    name: string;

    /**
     * The type of the record: "TXT", "MX" or "CNAME"
     */
    recordType: 'TXT' | 'MX' | 'CNAME';

    /**
     * The status of the record
     */
    status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure';

    /**
     * The date of the lastest verification of this record
     */
    statusAt: string;

    /**
     * TTL (Time To Live) for this DNS record specifies the duration (in seconds)
     */
    ttl: string;

    /**
     * The value of a DNS record is the data that the record points to
     */
    value: string;

    /**
     * Priority in a DNS record, typically used in MX (Mail Exchange) records,
     * specifies the order in which mail servers should be used, with lower values
     * indicating higher priority for email delivery
     */
    priority?: string;

    /**
     * A unique identifier in DKIM record to create CNAME records for verifying domain
     * ownership and enabling email authentication
     */
    selector?: string;
  }
}

export interface DomainRetrieveResponse {
  /**
   * The id of the domain
   */
  id: string;

  /**
   * Emit an event for each time the recipient clicks a link in the email
   */
  clickTracking: boolean;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  createdAt: string;

  /**
   * The name of the domain to send e-mails'
   */
  name: string;

  /**
   * Emit an event for each recipient opens an email their email client
   */
  openTracking: boolean;

  /**
   * Whether receiving is enabled for the domain
   */
  receiving: boolean;

  /**
   * The receiving status for the domain
   */
  receivingStatus: 'disabled' | 'bootstrapping' | 'pending' | 'active' | 'failed';

  /**
   * The date of the latest receiving status change
   */
  receivingStatusAt: string;

  /**
   * The DNS records for your domain.
   */
  records: Array<DomainRetrieveResponse.Record>;

  /**
   * The region of the domain data
   */
  region: 'eu-west-1';

  /**
   * Whether sending is enabled for the domain
   */
  sending: boolean;

  /**
   * The sending status for the domain
   */
  sendingStatus: 'enabled' | 'disabled' | 'paused';

  /**
   * The date of the latest sending status change
   */
  sendingStatusAt: string;

  /**
   * The status for the domain
   */
  status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure';

  /**
   * The date of the lastest verification of this record
   */
  statusAt: string;
}

export namespace DomainRetrieveResponse {
  export interface Record {
    /**
     * The FQDN of the domain record
     */
    fullname: string;

    /**
     * The group of group: "DKIM", "SPF", "MX" or "DMARC". It is useful to group the
     * records
     */
    group: 'DKIM' | 'SPF' | 'MX' | 'DMARC' | 'MX_RECEIVING';

    /**
     * The name of the record.
     */
    name: string;

    /**
     * The type of the record: "TXT", "MX" or "CNAME"
     */
    recordType: 'TXT' | 'MX' | 'CNAME';

    /**
     * The status of the record
     */
    status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure';

    /**
     * The date of the lastest verification of this record
     */
    statusAt: string;

    /**
     * TTL (Time To Live) for this DNS record specifies the duration (in seconds)
     */
    ttl: string;

    /**
     * The value of a DNS record is the data that the record points to
     */
    value: string;

    /**
     * Priority in a DNS record, typically used in MX (Mail Exchange) records,
     * specifies the order in which mail servers should be used, with lower values
     * indicating higher priority for email delivery
     */
    priority?: string;

    /**
     * A unique identifier in DKIM record to create CNAME records for verifying domain
     * ownership and enabling email authentication
     */
    selector?: string;
  }
}

export interface DomainUpdateResponse {
  /**
   * The id of the domain
   */
  id: string;

  /**
   * Emit an event for each time the recipient clicks a link in the email
   */
  clickTracking: boolean;

  /**
   * Emit an event for each recipient opens an email their email client
   */
  openTracking: boolean;
}

export interface DomainListResponse {
  /**
   * The id of the domain
   */
  id: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  createdAt: string;

  /**
   * The name of the domain to send e-mails'
   */
  name: string;

  /**
   * The receiving status for the domain
   */
  receivingStatus: 'disabled' | 'bootstrapping' | 'pending' | 'active' | 'failed';

  /**
   * The region of the domain data
   */
  region: 'eu-west-1';

  /**
   * The sending status for the domain
   */
  sendingStatus: 'enabled' | 'disabled' | 'paused';

  /**
   * The status for the domain
   */
  status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure';
}

export interface DomainDeleteResponse {
  /**
   * The id of the domain
   */
  id: string;
}

export interface DomainCreateParams {
  /**
   * The name of the domain to send e-mails'
   */
  name: string;

  /**
   * Enable receiving
   */
  receiving?: boolean;

  /**
   * Enable sending
   */
  sending?: boolean;
}

export interface DomainUpdateParams {
  /**
   * Emit an event for each time the recipient clicks a link in the email
   */
  clickTracking?: boolean;

  /**
   * Emit an event for each recipient opens an email their email client
   */
  openTracking?: boolean;

  /**
   * Enable or disable receiving
   */
  receiving?: boolean;

  /**
   * Enable or disable sending
   */
  sending?: boolean;
}

export interface DomainListParams extends CursorPageParams {}

export declare namespace Domains {
  export {
    type DomainCreateResponse as DomainCreateResponse,
    type DomainRetrieveResponse as DomainRetrieveResponse,
    type DomainUpdateResponse as DomainUpdateResponse,
    type DomainListResponse as DomainListResponse,
    type DomainDeleteResponse as DomainDeleteResponse,
    type DomainListResponsesCursorPage as DomainListResponsesCursorPage,
    type DomainCreateParams as DomainCreateParams,
    type DomainUpdateParams as DomainUpdateParams,
    type DomainListParams as DomainListParams,
  };
}
