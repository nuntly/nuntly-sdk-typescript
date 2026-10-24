import type { APIPromise, RequestOptions } from '../../../core/index.js';
import { Resource } from '../../../core/index.js';
import type {
  ContactSegmentMembershipIdResponse,
  ContactSegmentMembershipResponse,
  ContactSegmentsResponse,
} from '../../types.js';

/**
 * ContactsSegments resource.
 */
export class ContactsSegments extends Resource {
  /**
   * Add a contact to a segment. Idempotent.
   *
   * POST /contacts/{contactId}/segments/{segmentId}
   * @param contactId - string
   * @param segmentId - string
   * @param options - RequestOptions
   * @returns APIPromise<ContactSegmentMembershipResponse>
   */
  add(contactId: string, segmentId: string, options?: RequestOptions): APIPromise<ContactSegmentMembershipResponse> {
    return this._http
      .post<{ data: ContactSegmentMembershipResponse }>({
        path: '/contacts/{contactId}/segments/{segmentId}',
        pathParams: { contactId, segmentId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * List a contact's segments.
   *
   * GET /contacts/{contactId}/segments
   * @param contactId - string
   * @param options - RequestOptions
   * @returns APIPromise<ContactSegmentsResponse>
   */
  list(contactId: string, options?: RequestOptions): APIPromise<ContactSegmentsResponse> {
    return this._http
      .get<{ data: ContactSegmentsResponse }>({
        path: '/contacts/{contactId}/segments',
        pathParams: { contactId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Remove a contact from a segment.
   *
   * DELETE /contacts/{contactId}/segments/{segmentId}
   * @param contactId - string
   * @param segmentId - string
   * @param options - RequestOptions
   * @returns APIPromise<ContactSegmentMembershipIdResponse>
   */
  remove(
    contactId: string,
    segmentId: string,
    options?: RequestOptions,
  ): APIPromise<ContactSegmentMembershipIdResponse> {
    return this._http
      .delete<{ data: ContactSegmentMembershipIdResponse }>({
        path: '/contacts/{contactId}/segments/{segmentId}',
        pathParams: { contactId, segmentId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Check if a contact is in a segment.
   *
   * GET /contacts/{contactId}/segments/{segmentId}
   * @param contactId - string
   * @param segmentId - string
   * @param options - RequestOptions
   * @returns APIPromise<ContactSegmentMembershipResponse>
   */
  retrieve(
    contactId: string,
    segmentId: string,
    options?: RequestOptions,
  ): APIPromise<ContactSegmentMembershipResponse> {
    return this._http
      .get<{ data: ContactSegmentMembershipResponse }>({
        path: '/contacts/{contactId}/segments/{segmentId}',
        pathParams: { contactId, segmentId },
        options,
      })
      .map((r) => r.data);
  }
}
