import { Resource } from '../core/index.js';
import type { RequestOptions, CursorPage, CursorPageParams } from '../core/index.js';
import type { ApiKeyResponse, ApiKeysResponseItem, CreateApiKeyRequest, CreateApiKeyResponse, DeleteApiKeyResponse, UpdateApiKeyRequest, UpdateApiKeyResponse } from '../types/index.js';


/**
 * ApiKeys resource.
 */
export class ApiKeys extends Resource {

  /**
   * Returns API key metadata. The key value is never returned after creation.
   *
   * GET /api-keys/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns Promise<ApiKeyResponse>
   */
  async retrieve(id: string, options?: RequestOptions): Promise<ApiKeyResponse> {
    const response = await this._http.get<{ data: ApiKeyResponse }>(`/api-keys/${id}`, undefined, options);
    return response.data;
  }

  /**
   * Update the key name, permissions, or restrict it to specific sending domains.
   *
   * PUT /api-keys/{id}
   * @param id - string
   * @param body - UpdateApiKeyRequest
   * @param options - RequestOptions
   * @returns Promise<UpdateApiKeyResponse>
   */
  async update(id: string, body: UpdateApiKeyRequest, options?: RequestOptions): Promise<UpdateApiKeyResponse> {
    const response = await this._http.put<{ data: UpdateApiKeyResponse }>(`/api-keys/${id}`, body, options);
    return response.data;
  }

  /**
   * Revoke an API key. Requests authenticating with this key will be rejected immediately.
   *
   * DELETE /api-keys/{id}
   * @param id - string
   * @param options - RequestOptions
   * @returns Promise<DeleteApiKeyResponse>
   */
  async delete(id: string, options?: RequestOptions): Promise<DeleteApiKeyResponse> {
    const response = await this._http.delete<{ data: DeleteApiKeyResponse }>(`/api-keys/${id}`, options);
    return response.data;
  }

  /**
   * Generate a new API key. The key value is only returned once — store it securely.
   *
   * POST /api-keys
   * @param body - CreateApiKeyRequest
   * @param options - RequestOptions
   * @returns Promise<CreateApiKeyResponse>
   */
  async create(body: CreateApiKeyRequest, options?: RequestOptions): Promise<CreateApiKeyResponse> {
    const response = await this._http.post<{ data: CreateApiKeyResponse }>('/api-keys', body, options);
    return response.data;
  }

  /**
   * Returns all API keys for the organization. Key values are never included in list responses.
   *
   * GET /api-keys
   * @param query - CursorPageParams
   * @param options - RequestOptions
   * @returns Promise<CursorPage<ApiKeysResponseItem>>
   */
  async list(query?: CursorPageParams, options?: RequestOptions): Promise<CursorPage<ApiKeysResponseItem>> {
    return this._http.list<ApiKeysResponseItem>('/api-keys', query as unknown as Record<string, unknown>, options);
  }

}
