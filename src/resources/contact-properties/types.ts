/** A single item from ContactPropertiesResponse. */
export interface ContactPropertiesResponseItem {
  /** The id of the contact property. */
  id: string;
  /** A name for the property, used as its key in a contact's properties. Stored trimmed, with the letter case it was typed with. */
  name: string;
  /** The declared type of the property. Immutable after creation. */
  type: 'string' | 'number' | (string & {});
  /** An optional description of the property. */
  description?: string | null;
  defaultValue?: string | number;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt: string;
}

export interface ContactPropertyResponse {
  /** The id of the contact property. */
  id: string;
  /** A name for the property, used as its key in a contact's properties. Stored trimmed, with the letter case it was typed with. */
  name: string;
  /** The declared type of the property. Immutable after creation. */
  type: 'string' | 'number' | (string & {});
  /** An optional description of the property. */
  description?: string | null;
  defaultValue?: string | number;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt: string;
}

/**
 * @example
 *     await nuntly.contactProperties.create({
 *       name: 'example.com',
 *       type: 'string',
 *     });
 */
export interface CreateContactPropertyRequest {
  /** A name for the property, used as its key in a contact's properties. Stored trimmed, with the letter case it was typed with. */
  name: string;
  /** The declared type of the property. Immutable after creation. */
  type: 'string' | 'number';
  /** An optional description of the property. */
  description?: string | null;
  /** Applied to new contacts that omit this property. */
  defaultValue?: string | number | null;
}

export interface UpdateContactPropertyRequest {
  /** An optional description of the property. */
  description?: string | null;
  defaultValue?: string | number | null;
}
