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
  CreateTemplateRequest,
  IdResponse,
  TemplateResponse,
  TemplatesResponseItem,
  UpdateTemplateRequest,
} from '../types.js';

import { TemplatesVersions } from './versions/index.js';

/**
 * Templates resource.
 */
export class Templates extends Resource {
  versions: TemplatesVersions;

  constructor(client: NuntlyClient) {
    super(client);
    this.versions = new TemplatesVersions(client);
  }

  /**
   * Create a template.
   *
   * POST /templates
   * @param body - CreateTemplateRequest
   * @param options - RequestOptions
   * @returns APIPromise<TemplateResponse>
   */
  create(body: CreateTemplateRequest, options?: RequestOptions): APIPromise<TemplateResponse> {
    return this._http
      .post<{ data: TemplateResponse }>({
        path: '/templates',
        body,
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Delete a template and its versions.
   *
   * DELETE /templates/{templateId}
   * @param templateId - string
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  delete(templateId: string, options?: RequestOptions): APIPromise<IdResponse> {
    return this._http
      .delete<{ data: IdResponse }>({
        path: '/templates/{templateId}',
        pathParams: { templateId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * List the organization templates.
   *
   * GET /templates
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<TemplatesResponseItem>, TemplatesResponseItem>
   */
  list(
    query?: CursorPageParams,
    options?: RequestOptions,
  ): PagePromise<CursorPage<TemplatesResponseItem>, TemplatesResponseItem> {
    return this._http.list<TemplatesResponseItem>({
      path: '/templates',
      query: query as unknown as Record<string, unknown>,
      options,
    });
  }

  /**
   * Retrieve one template.
   *
   * GET /templates/{templateId}
   * @param templateId - string
   * @param options - RequestOptions
   * @returns APIPromise<TemplateResponse>
   */
  retrieve(templateId: string, options?: RequestOptions): APIPromise<TemplateResponse> {
    return this._http
      .get<{ data: TemplateResponse }>({
        path: '/templates/{templateId}',
        pathParams: { templateId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Rename a template.
   *
   * PATCH /templates/{templateId}
   * @param templateId - string
   * @param body - UpdateTemplateRequest
   * @param options - RequestOptions
   * @returns APIPromise<IdResponse>
   */
  update(templateId: string, body: UpdateTemplateRequest, options?: RequestOptions): APIPromise<IdResponse> {
    return this._http
      .patch<{ data: IdResponse }>({
        path: '/templates/{templateId}',
        pathParams: { templateId },
        body,
        options,
      })
      .map((r) => r.data);
  }
}
