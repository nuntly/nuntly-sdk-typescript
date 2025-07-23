// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Domains extends APIResource {
  /**
   * Return the domain with the given ID
   *
   * @example
   * ```ts
   * const domain = await client.domains.create({
   *   name: 'acme.com',
   *   region: 'eu-west-1',
   * });
   * ```
   */
  create(body: DomainCreateParams, options?: RequestOptions): APIPromise<DomainCreateResponse> {
    return (
      this._client.post('/domains', { body, ...options }) as APIPromise<{ data: DomainCreateResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Return the domain with the given id
   *
   * @example
   * ```ts
   * const domain = await client.domains.retrieve(
   *   'dns_FdfQe2eZAzRrHCXKSr7VsxUz',
   * );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<DomainRetrieveResponse> {
    return (
      this._client.get(path`/domains/${id}`, options) as APIPromise<{ data: DomainRetrieveResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Updates domain tracking settings
   *
   * @example
   * ```ts
   * const domain = await client.domains.update(
   *   'dns_FdfQe2eZAzRrHCXKSr7VsxUz',
   * );
   * ```
   */
  update(id: string, body: DomainUpdateParams, options?: RequestOptions): APIPromise<DomainUpdateResponse> {
    return (
      this._client.patch(path`/domains/${id}`, { body, ...options }) as APIPromise<{
        data: DomainUpdateResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Return a list of your domains
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const domainListResponse of client.domains.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: DomainListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DomainListResponsesCursorPage, DomainListResponse> {
    return this._client.getAPIList('/domains', CursorPage<DomainListResponse>, { query, ...options });
  }

  /**
   * Delete the domain with the given ID
   *
   * @example
   * ```ts
   * const domain = await client.domains.delete(
   *   'dns_FdfQe2eZAzRrHCXKSr7VsxUz',
   * );
   * ```
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

  click_tracking: boolean;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

  /**
   * The kind of object returned
   */
  kind: 'domain';

  /**
   * The name of the domain. For example: 'email.mycompany.com'
   */
  name: string;

  open_tracking: boolean;

  /**
   * The id of the organization
   */
  org_id: string;

  /**
   * The region of the related data
   */
  region: 'eu-west-1';

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
   * Date at which the object was modified (ISO 8601 format)
   */
  modified_at?: string;
}

export namespace DomainCreateResponse {
  export interface SendingRecord {
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
     * The kind of object returned
     */
    kind: 'record';

    /**
     * The name of the record.
     */
    name: string;

    /**
     * The region of the related data
     */
    region: 'eu-west-1';

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

  click_tracking: boolean;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

  /**
   * The kind of object returned
   */
  kind: 'domain';

  /**
   * The name of the domain. For example: 'email.mycompany.com'
   */
  name: string;

  open_tracking: boolean;

  /**
   * The id of the organization
   */
  org_id: string;

  /**
   * The region of the related data
   */
  region: 'eu-west-1';

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
   * Date at which the object was modified (ISO 8601 format)
   */
  modified_at?: string;
}

export namespace DomainRetrieveResponse {
  export interface SendingRecord {
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
     * The kind of object returned
     */
    kind: 'record';

    /**
     * The name of the record.
     */
    name: string;

    /**
     * The region of the related data
     */
    region: 'eu-west-1';

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
   * The kind of object returned
   */
  kind: 'domain';

  /**
   * The id of the organization
   */
  org_id: string;

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
   * The id of the domain
   */
  id: string;

  /**
   * Date at which the object was created (ISO 8601 format)
   */
  created_at: string;

  /**
   * The kind of object returned
   */
  kind: 'domain';

  /**
   * The name of the domain. For example: 'email.mycompany.com'
   */
  name: string;

  /**
   * The id of the organization
   */
  org_id: string;

  /**
   * The region of the related data
   */
  region: 'eu-west-1';

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
   * Date at which the object was modified (ISO 8601 format)
   */
  modified_at?: string;
}

export interface DomainDeleteResponse {
  /**
   * The id of the domain
   */
  id: string;

  /**
   * The kind of object returned
   */
  kind: 'domain';

  /**
   * The id of the organization
   */
  org_id: string;
}

export interface DomainCreateParams {
  /**
   * The name of the domain. For example: 'email.mycompany.com'
   */
  name: string;

  /**
   * The region of the related data
   */
  region: 'eu-west-1';
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
