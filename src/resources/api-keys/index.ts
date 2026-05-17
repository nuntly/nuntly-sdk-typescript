import { Resource } from '../../core/index.js';
import type { APIPromise, RequestOptions, CursorPage, CursorPageParams, PagePromise } from '../../core/index.js';
import type { ApiKeyResponse, ApiKeysResponseItem, CreateApiKeyRequest, CreateApiKeyResponse, DeleteApiKeyResponse, UpdateApiKeyRequest, UpdateApiKeyResponse } from '../types.js';


/**
 * ApiKeys resource.
 */
export class ApiKeys extends Resource {

  /**
   * Generate a new API key. The key value is only returned once. Store it securely.
   *
   * POST /api-keys
   * @param body - CreateApiKeyRequest
   * @param options - RequestOptions
   * @returns APIPromise<CreateApiKeyResponse>
   */
  create(body: CreateApiKeyRequest, options?: RequestOptions): APIPromise<CreateApiKeyResponse> {
    return this._http.post<{ data: CreateApiKeyResponse }>({
      path: '/api-keys',
      body,
      options,
    }).map((r) => r.data);
  }

  /**
   * Revoke an API key. Requests authenticating with this key will be rejected immediately.
   *
   * DELETE /api-keys/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns APIPromise<DeleteApiKeyResponse>
   */
  delete(id: string, options?: RequestOptions): APIPromise<DeleteApiKeyResponse> {
    return this._http.delete<{ data: DeleteApiKeyResponse }>({
      path: '/api-keys/{id}',
      pathParams: { id },
      options,
    }).map((r) => r.data);
  }

  /**
   * Returns all API keys for the organization. Key values are never included in list responses.
   *
   * GET /api-keys
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns PagePromise<CursorPage<ApiKeysResponseItem>, ApiKeysResponseItem>
   */
  list(query?: CursorPageParams, options?: RequestOptions): PagePromise<CursorPage<ApiKeysResponseItem>, ApiKeysResponseItem> {
    return this._http.list<ApiKeysResponseItem>({
      path: '/api-keys',
      query: query as unknown as Record<string, unknown>,
      options,
    });
  }

  /**
   * Returns API key metadata. The key value is never returned after creation.
   *
   * GET /api-keys/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns APIPromise<ApiKeyResponse>
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ApiKeyResponse> {
    return this._http.get<{ data: ApiKeyResponse }>({
      path: '/api-keys/{id}',
      pathParams: { id },
      options,
    }).map((r) => r.data);
  }

  /**
   * Update the key name, permissions, or restrict it to specific sending domains.
   *
   * PATCH /api-keys/{id}
   * @param id - string
   * @param body - UpdateApiKeyRequest
   * @param options - RequestOptions
   * @returns APIPromise<UpdateApiKeyResponse>
   */
  update(id: string, body: UpdateApiKeyRequest, options?: RequestOptions): APIPromise<UpdateApiKeyResponse> {
    return this._http.patch<{ data: UpdateApiKeyResponse }>({
      path: '/api-keys/{id}',
      pathParams: { id },
      body,
      options,
    }).map((r) => r.data);
  }

}
