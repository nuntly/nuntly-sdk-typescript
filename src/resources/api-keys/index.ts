import type { APIPromise, CursorPage, CursorPageParams, PagePromise, RequestOptions } from '../../core/index.js';
import { Resource } from '../../core/index.js';
import type {
  ApiKeyResponse,
  ApiKeysResponseItem,
  CreateApiKeyRequest,
  CreateApiKeyResponse,
  DeleteApiKeyResponse,
  UpdateApiKeyRequest,
  UpdateApiKeyResponse,
} from '../types.js';

/**
 * ApiKeys resource.
 */
export class ApiKeys extends Resource {
  /**
   * Creates an API key with full access or send-only access, optionally limited to chosen domains. The secret key value is returned only in this response.
   *
   * POST /api-keys
   * @param body - CreateApiKeyRequest
   * @param options - RequestOptions
   * @returns APIPromise<CreateApiKeyResponse>
   */
  create(body: CreateApiKeyRequest, options?: RequestOptions): APIPromise<CreateApiKeyResponse> {
    return this._http
      .post<{ data: CreateApiKeyResponse }>({
        path: '/api-keys',
        body,
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Permanently deletes an API key. Any request that authenticates with this key is rejected from then on. This cannot be undone.
   *
   * DELETE /api-keys/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns APIPromise<DeleteApiKeyResponse>
   */
  delete(id: string, options?: RequestOptions): APIPromise<DeleteApiKeyResponse> {
    return this._http
      .delete<{ data: DeleteApiKeyResponse }>({
        path: '/api-keys/{id}',
        pathParams: { id },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Lists the API keys of your organization, newest first, with cursor pagination. Each key shows its name, status, creation date, and a short token hint.
   *
   * GET /api-keys
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<ApiKeysResponseItem>, ApiKeysResponseItem>
   */
  list(
    query?: CursorPageParams,
    options?: RequestOptions,
  ): PagePromise<CursorPage<ApiKeysResponseItem>, ApiKeysResponseItem> {
    return this._http.list<ApiKeysResponseItem>({
      path: '/api-keys',
      query: query as unknown as Record<string, unknown>,
      options,
    });
  }

  /**
   * Retrieves an API key by id with its name, status, creation date, and a short token hint. The full secret key value is never returned after creation.
   *
   * GET /api-keys/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns APIPromise<ApiKeyResponse>
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ApiKeyResponse> {
    return this._http
      .get<{ data: ApiKeyResponse }>({
        path: '/api-keys/{id}',
        pathParams: { id },
        options,
      })
      .map((r) => r.data);
  }

  /**
   * Updates the name of an API key, enables or disables it, or changes its access level and domain restrictions. Returns the id of the updated key.
   *
   * PATCH /api-keys/{id}
   * @param id - string
   * @param body - UpdateApiKeyRequest
   * @param options - RequestOptions
   * @returns APIPromise<UpdateApiKeyResponse>
   */
  update(id: string, body: UpdateApiKeyRequest, options?: RequestOptions): APIPromise<UpdateApiKeyResponse> {
    return this._http
      .patch<{ data: UpdateApiKeyResponse }>({
        path: '/api-keys/{id}',
        pathParams: { id },
        body,
        options,
      })
      .map((r) => r.data);
  }
}
