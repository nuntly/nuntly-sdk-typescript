export interface ContactResponse {
  /** The id of the contact. */
  id: string;
  /** The contact email address. Stored lowercased and trimmed. */
  email: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt: string;
  /** The contact's properties, keyed by property name. */
  properties?: Record<string, string | number | null>;
}

/** A single item from ContactsResponse. */
export interface ContactsResponseItem {
  /** The id of the contact. */
  id: string;
  /** The contact email address. Stored lowercased and trimmed. */
  email: string;
  /** Date at which the object was created (ISO 8601 format) */
  createdAt: string;
  /** Date at which the object was updated (ISO 8601 format) */
  updatedAt: string;
}

/**
 * @example
 *     await nuntly.contacts.create({
 *       email: 'email_value',
 *     });
 */
export interface CreateContactRequest {
  /** The contact email address. Stored lowercased and trimmed. */
  email: string;
  /** Contact properties keyed by name. A null value means not supplied. */
  properties?: Record<string, string | number | null>;
}

export interface UpdateContactRequest {
  /** The address cannot be changed. */
  email?: string;
  /** Contact properties keyed by name, matched exactly. A null value removes the property. */
  properties?: Record<string, string | number | null>;
}
