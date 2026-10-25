import type {
  APIPromise,
  CursorPage,
  CursorPageParams,
  NuntlyClient,
  PagePromise,
  RequestOptions,
} from '../../../core/index.js';
import { Resource } from '../../../core/index.js';
import type {
  CreateTemplateVersionRequest,
  TemplateVersionIdResponse,
  TemplateVersionResponse,
  TemplateVersionsResponseItem,
} from '../../types.js';

import { TemplatesVersionsContent } from './content/index.js';

/**
 * TemplatesVersions resource.
 */
export class TemplatesVersions extends Resource {
  content: TemplatesVersionsContent;

  constructor(client: NuntlyClient) {
    super(client);
    this.content = new TemplatesVersionsContent(client);
  }

  /**
   * Create a draft version of a template.
   *
   * POST /templates/{templateId}/versions
   * @param templateId - string
   * @param body - CreateTemplateVersionRequest
   * @param options - RequestOptions
   * @returns APIPromise<TemplateVersionResponse>
   */
  create(
    templateId: string,
    body: CreateTemplateVersionRequest,
    options?: RequestOptions,
  ): APIPromise<TemplateVersionResponse> {
    return this._http
      .post<{ data: TemplateVersionResponse }>({
        path: '/templates/{templateId}/versions',
        pathParams: { templateId },
        body,
        options,
      })
      .map((r) => r.data);
  }

  /**
   * List the versions of a template.
   *
   * GET /templates/{templateId}/versions
   * @param templateId - string
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<TemplateVersionsResponseItem>, TemplateVersionsResponseItem>
   */
  list(
    templateId: string,
    query?: CursorPageParams,
    options?: RequestOptions,
  ): PagePromise<CursorPage<TemplateVersionsResponseItem>, TemplateVersionsResponseItem> {
    return this._http.list<TemplateVersionsResponseItem>({
      path: '/templates/{templateId}/versions',
      pathParams: { templateId },
      query,
      options,
    });
  }

  /**
   * Publish a draft template version.
   *
   * PATCH /templates/{templateId}/versions/{versionId}/publish
   * @param templateId - string
   * @param versionId - string
   * @param options - RequestOptions
   * @returns APIPromise<TemplateVersionIdResponse>
   */
  publish(templateId: string, versionId: string, options?: RequestOptions): APIPromise<TemplateVersionIdResponse> {
    return this._http
      .patch<{ data: TemplateVersionIdResponse }>({
        path: '/templates/{templateId}/versions/{versionId}/publish',
        pathParams: { templateId, versionId },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Retrieve one content version.
   *
   * GET /templates/{templateId}/versions/{versionId}
   * @param templateId - string
   * @param versionId - string
   * @param options - RequestOptions
   * @returns APIPromise<TemplateVersionResponse>
   */
  retrieve(templateId: string, versionId: string, options?: RequestOptions): APIPromise<TemplateVersionResponse> {
    return this._http
      .get<{ data: TemplateVersionResponse }>({
        path: '/templates/{templateId}/versions/{versionId}',
        pathParams: { templateId, versionId },
        options,
      })
      .map((r) => r.data);
  }
}
