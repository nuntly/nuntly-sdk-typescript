// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as DomainsAPI from './domains';

export class Domains extends APIResource {
  /**
   * Return the domain with the given ID
   */
  create(body: DomainCreateParams, options?: Core.RequestOptions): Core.APIPromise<DomainCreateResponse> {
    return (
      this._client.post('/domains', { body, ...options }) as Core.APIPromise<{ data: DomainCreateResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Return the domain with the given ID
   */
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<DomainRetrieveResponse> {
    return (
      this._client.get(`/domains/${id}`, options) as Core.APIPromise<{ data: DomainRetrieveResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Updates some domain fields with the given ID
   */
  update(
    id: string,
    body: DomainUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<DomainUpdateResponse> {
    return (
      this._client.patch(`/domains/${id}`, { body, ...options }) as Core.APIPromise<{
        data: DomainUpdateResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Return a list of your domains
   */
  list(options?: Core.RequestOptions): Core.APIPromise<DomainListResponse> {
    return (
      this._client.get('/domains', options) as Core.APIPromise<{ data: DomainListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Delete the domain with the given ID
   */
  delete(id: string, options?: Core.RequestOptions): Core.APIPromise<DomainDeleteResponse> {
    return (
      this._client.delete(`/domains/${id}`, options) as Core.APIPromise<{ data: DomainDeleteResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export interface DomainCreateResponse {
  /**
   * The id of the domain
   */
  id: string;

  click_tracking: boolean;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

  /**
   * The user who created the object
   */
  created_by: string;

  /**
   * Date at which the object was modified (ISO 8601 format)
   */
  modified_at: string;

  /**
   * The last user who modified the object
   */
  modified_by: string;

  /**
   * The name of the domain. For example: 'email.mycompany.com'
   */
  name: string;

  open_tracking: boolean;

  /**
   * The records for your domain
   */
  sending_records: Array<DomainCreateResponse.SendingRecord>;

  /**
   * The sending status for the domain
   */
  sending_status: 'enabled' | 'disabled';

  /**
   * The status for the domain
   */
  status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure';

  /**
   * The date of the lastest verification of the status
   */
  status_at: string;

  /**
   * The region of the domain
   */
  region?: 'eu-west-1';
}

export namespace DomainCreateResponse {
  export interface SendingRecord {
    /**
     * Same value as "value" except for MX due of the priority
     */
    expected: string;

    /**
     * The FQDN of the domain record
     */
    fullname: string;

    /**
     * The group of group: "DKIM", "SPF", "MX" or "DMARC". It is useful to group the
     * records
     */
    group: 'DKIM' | 'SPF' | 'MX' | 'DMARC';

    /**
     * The name of the record.
     */
    name: string;

    /**
     * The status of the record
     */
    status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure';

    /**
     * The date of the lastest verification of this record
     */
    status_at: string;

    /**
     * TTL (Time To Live) for this DNS record specifies the duration (in seconds)
     */
    ttl: string;

    /**
     * The type of the record: "TXT", "MX" or "CNAME"
     */
    type: 'TXT' | 'MX' | 'CNAME';

    /**
     * The value of a DNS record is the data that the record points to
     */
    value: string;

    /**
     * Same value as "value" except for DKIM due of length of the value
     */
    display?: string;

    /**
     * Priority in a DNS record, typically used in MX (Mail Exchange) records,
     * specifies the order in which mail servers should be used, with lower values
     * indicating higher priority for email delivery
     */
    priority?: string;

    /**
     * The region of the record
     */
    region?: 'eu-west-1';

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

  click_tracking: boolean;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

  /**
   * The user who created the object
   */
  created_by: string;

  /**
   * Date at which the object was modified (ISO 8601 format)
   */
  modified_at: string;

  /**
   * The last user who modified the object
   */
  modified_by: string;

  /**
   * The name of the domain. For example: 'email.mycompany.com'
   */
  name: string;

  open_tracking: boolean;

  /**
   * The records for your domain
   */
  sending_records: Array<DomainRetrieveResponse.SendingRecord>;

  /**
   * The sending status for the domain
   */
  sending_status: 'enabled' | 'disabled';

  /**
   * The status for the domain
   */
  status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure';

  /**
   * The date of the lastest verification of the status
   */
  status_at: string;

  /**
   * The region of the domain
   */
  region?: 'eu-west-1';
}

export namespace DomainRetrieveResponse {
  export interface SendingRecord {
    /**
     * Same value as "value" except for MX due of the priority
     */
    expected: string;

    /**
     * The FQDN of the domain record
     */
    fullname: string;

    /**
     * The group of group: "DKIM", "SPF", "MX" or "DMARC". It is useful to group the
     * records
     */
    group: 'DKIM' | 'SPF' | 'MX' | 'DMARC';

    /**
     * The name of the record.
     */
    name: string;

    /**
     * The status of the record
     */
    status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure';

    /**
     * The date of the lastest verification of this record
     */
    status_at: string;

    /**
     * TTL (Time To Live) for this DNS record specifies the duration (in seconds)
     */
    ttl: string;

    /**
     * The type of the record: "TXT", "MX" or "CNAME"
     */
    type: 'TXT' | 'MX' | 'CNAME';

    /**
     * The value of a DNS record is the data that the record points to
     */
    value: string;

    /**
     * Same value as "value" except for DKIM due of length of the value
     */
    display?: string;

    /**
     * Priority in a DNS record, typically used in MX (Mail Exchange) records,
     * specifies the order in which mail servers should be used, with lower values
     * indicating higher priority for email delivery
     */
    priority?: string;

    /**
     * The region of the record
     */
    region?: 'eu-west-1';

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
  click_tracking?: boolean;

  /**
   * Emit an event for each recipient opens an email their email client
   */
  open_tracking?: boolean;
}

export interface DomainListResponse {
  /**
   * The domains registered in your account
   */
  data: Array<DomainListResponse.Data>;
}

export namespace DomainListResponse {
  export interface Data {
    /**
     * The id of the domain
     */
    id: string;

    /**
     * Date at which the object was created (ISO 8601 format)
     */
    created_at: string;

    /**
     * The user who created the object
     */
    created_by: string;

    /**
     * Date at which the object was modified (ISO 8601 format)
     */
    modified_at: string;

    /**
     * The last user who modified the object
     */
    modified_by: string;

    /**
     * The name of the domain. For example: 'email.mycompany.com'
     */
    name: string;

    /**
     * The sending status for the domain
     */
    sending_status: 'enabled' | 'disabled';

    /**
     * The status for the domain
     */
    status: 'bootstrapping' | 'pending' | 'success' | 'failed' | 'temporary_failure';

    /**
     * The date of the lastest verification of the status
     */
    status_at: string;

    /**
     * The region of the domain
     */
    region?: 'eu-west-1';
  }
}

export interface DomainDeleteResponse {
  /**
   * The id of the domain
   */
  id: string;
}

export interface DomainCreateParams {
  /**
   * The name of the domain. For example: 'email.mycompany.com'
   */
  name: string;

  /**
   * The region of the domain
   */
  region?: 'eu-west-1';
}

export interface DomainUpdateParams {
  /**
   * Emit an event for each time the recipient clicks a link in the email
   */
  click_tracking?: boolean;

  /**
   * Emit an event for each recipient opens an email their email client
   */
  open_tracking?: boolean;
}

export namespace Domains {
  export import DomainCreateResponse = DomainsAPI.DomainCreateResponse;
  export import DomainRetrieveResponse = DomainsAPI.DomainRetrieveResponse;
  export import DomainUpdateResponse = DomainsAPI.DomainUpdateResponse;
  export import DomainListResponse = DomainsAPI.DomainListResponse;
  export import DomainDeleteResponse = DomainsAPI.DomainDeleteResponse;
  export import DomainCreateParams = DomainsAPI.DomainCreateParams;
  export import DomainUpdateParams = DomainsAPI.DomainUpdateParams;
}
