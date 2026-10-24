import type { APIPromise, CursorPage, CursorPageParams, PagePromise, RequestOptions } from '../../core/index.js';
import { Resource } from '../../core/index.js';
import type {
  ContactPropertiesResponseItem,
  ContactPropertyResponse,
  CreateContactPropertyRequest,
  IdResponse,
  UpdateContactPropertyRequest,
} from '../types.js';

/**
 * ContactProperties resource.
 */
export class ContactProperties extends Resource {
  /**
   * Create a contact property.
   *
   * POST /contact-properties
   * @param body - CreateContactPropertyRequest
   * @param options - RequestOptions
   * @returns APIPromise<ContactPropertyResponse>
   */
  create(body: CreateContactPropertyRequest, options?: RequestOptions): APIPromise<ContactPropertyResponse> {
    return this._http
      .post<{ data: ContactPropertyResponse }>({
        path: '/contact-properties',
        body,
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Delete a contact property.
   *
   * DELETE /contact-properties/{contactPropertyId}
   * @param contactPropertyId - string
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  delete(contactPropertyId: string, options?: RequestOptions): APIPromise<IdResponse> {
    return this._http
      .delete<{ data: IdResponse }>({
        path: '/contact-properties/{contactPropertyId}',
        pathParams: { contactPropertyId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * List the organization contact properties.
   *
   * GET /contact-properties
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<ContactPropertiesResponseItem>, ContactPropertiesResponseItem>
   */
  list(
    query?: CursorPageParams,
    options?: RequestOptions,
  ): PagePromise<CursorPage<ContactPropertiesResponseItem>, ContactPropertiesResponseItem> {
    return this._http.list<ContactPropertiesResponseItem>({
      path: '/contact-properties',
      query: query as unknown as Record<string, unknown>,
      options,
    });
  }

  /**
   * Retrieve one contact property.
   *
   * GET /contact-properties/{contactPropertyId}
   * @param contactPropertyId - string
   * @param options - RequestOptions
   * @returns APIPromise<ContactPropertyResponse>
   */
  retrieve(contactPropertyId: string, options?: RequestOptions): APIPromise<ContactPropertyResponse> {
    return this._http
      .get<{ data: ContactPropertyResponse }>({
        path: '/contact-properties/{contactPropertyId}',
        pathParams: { contactPropertyId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Update a contact property.
   *
   * PATCH /contact-properties/{contactPropertyId}
   * @param contactPropertyId - string
   * @param body - UpdateContactPropertyRequest
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  update(
    contactPropertyId: string,
    body: UpdateContactPropertyRequest,
    options?: RequestOptions,
  ): APIPromise<IdResponse> {
    return this._http
      .patch<{ data: IdResponse }>({
        path: '/contact-properties/{contactPropertyId}',
        pathParams: { contactPropertyId },
        body,
        options,
      })
      .map((r) => r.data);
  }
}
