import type { APIPromise, RequestOptions } from '../../../../core/index.js';
import { Resource } from '../../../../core/index.js';
import type { TemplateVersionContentResponse } from '../../../types.js';

/**
 * TemplatesVersionsContent resource.
 */
export class TemplatesVersionsContent extends Resource {
  /**
   * Get download links for a version's HTML and text.
   *
   * GET /templates/{templateId}/versions/{versionId}/content
   * @param templateId - string
   * @param versionId - string
   * @param options - RequestOptions
   * @returns APIPromise<TemplateVersionContentResponse>
   */
  retrieve(
    templateId: string,
    versionId: string,
    options?: RequestOptions,
  ): APIPromise<TemplateVersionContentResponse> {
    return this._http
      .get<{ data: TemplateVersionContentResponse }>({
        path: '/templates/{templateId}/versions/{versionId}/content',
        pathParams: { templateId, versionId },
        options,
      })
      .map((r) => r.data);
  }
}
