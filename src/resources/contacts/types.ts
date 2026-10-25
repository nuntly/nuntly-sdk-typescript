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
 *       email: 'jane@example.com',
 *     });
 */
export interface CreateContactRequest {
  /** The contact email address. Stored lowercased and trimmed. */
  email: string;
  /** Contact properties keyed by name. A null value means not supplied. */
  properties?: Record<string, string | number | null>;
}

/**
 * @example
 *     await nuntly.contacts.update('ct_01kabn43yqyxn2bx4ve84mczd3', {
 *       properties: { plan: 'pro' },
 *     });
 */
export interface UpdateContactRequest {
  /** The contact's current address, in any letter case. The address cannot be changed: a different address is refused with the error code contact_email_immutable. */
  email?: string;
  /** Contact properties keyed by name, matched exactly. A null value removes the property. */
  properties?: Record<string, string | number | null>;
}
