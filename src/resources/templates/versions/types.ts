import type { VariableDeclaration } from '../../shared/types.js';

/**
 * @example
 *     await nuntly.templates.versions.create({
 *       subject: 'Welcome to Nuntly',
 *       html: '<h1>Welcome!</h1>',
 *     });
 */
export interface CreateTemplateVersionRequest {
  subject: string;
  html: string;
  /** The plain-text body. */
  text?: string;
  /** Variables the content may reference, at most 20. Immutable once created. */
  variables?: Array<VariableDeclaration>;
}

export interface TemplateVersionIdResponse {
  /** The id of the template. */
  id: string;
  /** The id of the version that was published. */
  templateVersionId: string;
}

export interface TemplateVersionResponse {
  /** The id of the content version. */
  id: string;
  /** The id of the template. */
  templateId: string;
  /** The lifecycle state of the content version. */
  status: 'draft' | 'active' | (string & {});
  subject: string;
  /** Date at which this version was published. */
  publishedAt?: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt: string;
  /** The declared variables. */
  variables?: Array<VariableDeclaration>;
}

/** A single item from TemplateVersionsResponse. */
export interface TemplateVersionsResponseItem {
  /** The id of the content version. */
  id: string;
  /** The id of the template. */
  templateId: string;
  /** The lifecycle state of the content version. */
  status: 'draft' | 'active' | (string & {});
  subject: string;
  /** Date at which this version was published. */
  publishedAt?: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt: string;
  /** The declared variables. */
  variables?: Array<VariableDeclaration>;
}
