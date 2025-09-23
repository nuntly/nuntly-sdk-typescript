// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import create_api_keys from './api-keys/create-api-keys';
import retrieve_api_keys from './api-keys/retrieve-api-keys';
import update_api_keys from './api-keys/update-api-keys';
import list_api_keys from './api-keys/list-api-keys';
import delete_api_keys from './api-keys/delete-api-keys';
import create_domains from './domains/create-domains';
import retrieve_domains from './domains/retrieve-domains';
import update_domains from './domains/update-domains';
import list_domains from './domains/list-domains';
import delete_domains from './domains/delete-domains';
import retrieve_emails from './emails/retrieve-emails';
import list_emails from './emails/list-emails';
import cancel_emails from './emails/cancel-emails';
import send_emails from './emails/send-emails';
import retrieve_emails_bulk from './emails/bulk/retrieve-emails-bulk';
import send_emails_bulk from './emails/bulk/send-emails-bulk';
import list_emails_events from './emails/events/list-emails-events';
import list_emails_stats from './emails/stats/list-emails-stats';
import create_webhooks from './webhooks/create-webhooks';
import retrieve_webhooks from './webhooks/retrieve-webhooks';
import update_webhooks from './webhooks/update-webhooks';
import list_webhooks from './webhooks/list-webhooks';
import delete_webhooks from './webhooks/delete-webhooks';
import list_webhooks_events from './webhooks/events/list-webhooks-events';
import deliveries_webhooks_events from './webhooks/events/deliveries-webhooks-events';
import replay_webhooks_events from './webhooks/events/replay-webhooks-events';
import retrieve_organizations from './organizations/retrieve-organizations';
import update_organizations from './organizations/update-organizations';
import list_organizations from './organizations/list-organizations';
import list_organizations_memberships from './organizations/memberships/list-organizations-memberships';
import revoke_organizations_memberships from './organizations/memberships/revoke-organizations-memberships';
import list_organizations_invitations from './organizations/invitations/list-organizations-invitations';
import delete_organizations_invitations from './organizations/invitations/delete-organizations-invitations';
import send_organizations_invitations from './organizations/invitations/send-organizations-invitations';
import list_organizations_subscriptions from './organizations/subscriptions/list-organizations-subscriptions';
import retrieve_organizations_usage from './organizations/usage/retrieve-organizations-usage';
import retrieve_account from './account/retrieve-account';
import update_account from './account/update-account';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(create_api_keys);
addEndpoint(retrieve_api_keys);
addEndpoint(update_api_keys);
addEndpoint(list_api_keys);
addEndpoint(delete_api_keys);
addEndpoint(create_domains);
addEndpoint(retrieve_domains);
addEndpoint(update_domains);
addEndpoint(list_domains);
addEndpoint(delete_domains);
addEndpoint(retrieve_emails);
addEndpoint(list_emails);
addEndpoint(cancel_emails);
addEndpoint(send_emails);
addEndpoint(retrieve_emails_bulk);
addEndpoint(send_emails_bulk);
addEndpoint(list_emails_events);
addEndpoint(list_emails_stats);
addEndpoint(create_webhooks);
addEndpoint(retrieve_webhooks);
addEndpoint(update_webhooks);
addEndpoint(list_webhooks);
addEndpoint(delete_webhooks);
addEndpoint(list_webhooks_events);
addEndpoint(deliveries_webhooks_events);
addEndpoint(replay_webhooks_events);
addEndpoint(retrieve_organizations);
addEndpoint(update_organizations);
addEndpoint(list_organizations);
addEndpoint(list_organizations_memberships);
addEndpoint(revoke_organizations_memberships);
addEndpoint(list_organizations_invitations);
addEndpoint(delete_organizations_invitations);
addEndpoint(send_organizations_invitations);
addEndpoint(list_organizations_subscriptions);
addEndpoint(retrieve_organizations_usage);
addEndpoint(retrieve_account);
addEndpoint(update_account);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  const allExcludes = filters.length > 0 && filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  const unmatched = Array.from(unmatchedFilters).filter((f) => f.type === 'tool' || f.type === 'resource');
  if (unmatched.length > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${unmatched
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}
