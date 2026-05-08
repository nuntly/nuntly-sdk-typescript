export interface OrganizationUsageResponse {
  transactional: { limits: { daily: number; monthly: number }; usage: { daily: number; monthly: number }; sending: { daily: number; monthly: number }; receiving: { daily: number; monthly: number } };
}
