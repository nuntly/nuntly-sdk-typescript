import type {
  APIPromise,
  CursorPage,
  CursorPageParams,
  NuntlyClient,
  PagePromise,
  RequestOptions,
} from '../../core/index.js';
import { Resource } from '../../core/index.js';
import type {
  ContactResponse,
  ContactsResponseItem,
  CreateContactRequest,
  IdResponse,
  UpdateContactRequest,
} from '../types.js';

import { ContactsSegments } from './segments/index.js';
import { ContactsTopics } from './topics/index.js';

/**
 * Contacts resource.
 */
export class Contacts extends Resource {
  segments: ContactsSegments;
  topics: ContactsTopics;

  constructor(client: NuntlyClient) {
    super(client);
    this.segments = new ContactsSegments(client);
    this.topics = new ContactsTopics(client);
  }

  /**
   * Create a contact.
   *
   * POST /contacts
   * @param body - CreateContactRequest
   * @param options - RequestOptions
   * @returns APIPromise<ContactResponse>
   */
  create(body: CreateContactRequest, options?: RequestOptions): APIPromise<ContactResponse> {
    return this._http
      .post<{ data: ContactResponse }>({
        path: '/contacts',
        body,
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Delete a contact.
   *
   * DELETE /contacts/{contactId}
   * @param contactId - string
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  delete(contactId: string, options?: RequestOptions): APIPromise<IdResponse> {
    return this._http
      .delete<{ data: IdResponse }>({
        path: '/contacts/{contactId}',
        pathParams: { contactId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * List the organization contacts.
   *
   * GET /contacts
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<ContactsResponseItem>, ContactsResponseItem>
   */
  list(
    query?: CursorPageParams,
    options?: RequestOptions,
  ): PagePromise<CursorPage<ContactsResponseItem>, ContactsResponseItem> {
    return this._http.list<ContactsResponseItem>({
      path: '/contacts',
      query,
      options,
    });
  }

  /**
   * Retrieve one contact.
   *
   * GET /contacts/{contactId}
   * @param contactId - string
   * @param options - RequestOptions
   * @returns APIPromise<ContactResponse>
   */
  retrieve(contactId: string, options?: RequestOptions): APIPromise<ContactResponse> {
    return this._http
      .get<{ data: ContactResponse }>({
        path: '/contacts/{contactId}',
        pathParams: { contactId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Update a contact's properties.
   *
   * PATCH /contacts/{contactId}
   * @param contactId - string
   * @param body - UpdateContactRequest
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  update(contactId: string, body: UpdateContactRequest, options?: RequestOptions): APIPromise<IdResponse> {
    return this._http
      .patch<{ data: IdResponse }>({
        path: '/contacts/{contactId}',
        pathParams: { contactId },
        body,
        options,
      })
      .map((r) => r.data);
  }
}
