/**
 * @example
 *     await nuntly.templates.create({
 *       name: 'example.com',
 *     });
 */
export interface CreateTemplateRequest {
  /** A name for the template, shown only to your team. */
  name: string;
}

export interface TemplateResponse {
  /** The id of the template. */
  id: string;
  /** A name for the template, shown only to your team. */
  name: string;
  /** The lifecycle state of the template. */
  status: 'draft' | 'published' | (string & {});
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt: string;
}

/** A single item from TemplatesResponse. */
export interface TemplatesResponseItem {
  /** The id of the template. */
  id: string;
  /** A name for the template, shown only to your team. */
  name: string;
  /** The lifecycle state of the template. */
  status: 'draft' | 'published' | (string & {});
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt: string;
}

export interface UpdateTemplateRequest {
  /** A name for the template, shown only to your team. */
  name?: string;
}
