export interface OrganizationResponse {
  /** The id of the organization */
  id: string;
  /** The name of the organization */
  name: string;
  /** The status of the organization */
  status: 'enabled' | 'disabled';
}

export interface OrganizationUsageResponse {
  transactional: { limits: { daily: number; monthly: number }; usage: { daily: number; monthly: number }; sending: { daily: number; monthly: number }; receiving: { daily: number; monthly: number } };
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
