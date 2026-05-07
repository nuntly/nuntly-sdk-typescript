export interface ApiKeyResponse {
  /** The id of the api key */
  id: string;
  /** The name of the api key */
  name?: string;
  /** The last 6 characters of the api key token */
  shortToken: string;
  /** The status for the api key */
  status: 'enabled' | 'disabled' | 'revoked';
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
}

/** A single item from ApiKeysResponse. */
export interface ApiKeysResponseItem {
  /** The id of the api key */
  id: string;
  /** The name of the api key */
  name?: string;
  /** The last 6 characters of the api key token */
  shortToken: string;
  /** The status for the api key */
  status: 'enabled' | 'disabled' | 'revoked';
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
}

/**
 * @example
 *     await nuntly.apiKeys.create({
 *       permission: 'fullAccess',
 *     });
 */
export interface CreateApiKeyRequest {
  /** The name of the api key */
  name?: string;
  /** The status for the api key */
  status?: 'enabled' | 'disabled' | 'revoked';
  /** The permission type for the api key */
  permission: 'fullAccess' | 'sendingAccess';
  /** The domain ids to restrict the api key to (only for sendingAccess) */
  domainIds?: Array<string>;
}

export interface CreateApiKeyResponse {
  /** The id of the api key */
  id: string;
  /** The name of the api key */
  name?: string;
  /** The content of the api key */
  apiKey: string;
  /** The last 6 characters of the api key token */
  shortToken: string;
  /** The status for the api key */
  status: 'enabled' | 'disabled' | 'revoked';
}

export interface DeleteApiKeyResponse {
  /** The id of the api key */
  id: string;
}

/**
 * @example
 *     await nuntly.apiKeys.update({
 *       permission: 'fullAccess',
 *     });
 */
export interface UpdateApiKeyRequest {
  /** The name of the api key */
  name?: string;
  status?: 'enabled' | 'disabled';
  /** The permission type for the api key */
  permission: 'fullAccess' | 'sendingAccess';
  /** The domain ids to restrict the api key to (only for sendingAccess) */
  domainIds?: Array<string>;
}

export interface UpdateApiKeyResponse {
  /** The id of the api key */
  id: string;
}
