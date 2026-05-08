export interface OrganizationResponse {
  /** The id of the organization */
  id: string;
  /** The name of the organization */
  name: string;
  /** The status of the organization */
  status: 'enabled' | 'disabled';
}

/** A single item from OrganizationsResponse. */
export interface OrganizationsResponseItem {
  /** The id of the organization */
  id: string;
  /** The name of the organization */
  name: string;
  /** The status of the organization */
  status: 'enabled' | 'disabled';
}
