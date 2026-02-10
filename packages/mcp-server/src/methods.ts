import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.apiKeys.create',
    fullyQualifiedName: 'apiKeys.create',
    httpMethod: 'post',
    httpPath: '/api-keys',
  },
  {
    clientCallName: 'client.apiKeys.retrieve',
    fullyQualifiedName: 'apiKeys.retrieve',
    httpMethod: 'get',
    httpPath: '/api-keys/{id}',
  },
  {
    clientCallName: 'client.apiKeys.update',
    fullyQualifiedName: 'apiKeys.update',
    httpMethod: 'put',
    httpPath: '/api-keys/{id}',
  },
  {
    clientCallName: 'client.apiKeys.list',
    fullyQualifiedName: 'apiKeys.list',
    httpMethod: 'get',
    httpPath: '/api-keys',
  },
  {
    clientCallName: 'client.apiKeys.delete',
    fullyQualifiedName: 'apiKeys.delete',
    httpMethod: 'delete',
    httpPath: '/api-keys/{id}',
  },
  {
    clientCallName: 'client.domains.create',
    fullyQualifiedName: 'domains.create',
    httpMethod: 'post',
    httpPath: '/domains',
  },
  {
    clientCallName: 'client.domains.retrieve',
    fullyQualifiedName: 'domains.retrieve',
    httpMethod: 'get',
    httpPath: '/domains/{id}',
  },
  {
    clientCallName: 'client.domains.update',
    fullyQualifiedName: 'domains.update',
    httpMethod: 'patch',
    httpPath: '/domains/{id}',
  },
  {
    clientCallName: 'client.domains.list',
    fullyQualifiedName: 'domains.list',
    httpMethod: 'get',
    httpPath: '/domains',
  },
  {
    clientCallName: 'client.domains.delete',
    fullyQualifiedName: 'domains.delete',
    httpMethod: 'delete',
    httpPath: '/domains/{id}',
  },
  {
    clientCallName: 'client.emails.retrieve',
    fullyQualifiedName: 'emails.retrieve',
    httpMethod: 'get',
    httpPath: '/emails/{id}',
  },
  {
    clientCallName: 'client.emails.list',
    fullyQualifiedName: 'emails.list',
    httpMethod: 'get',
    httpPath: '/emails',
  },
  {
    clientCallName: 'client.emails.cancel',
    fullyQualifiedName: 'emails.cancel',
    httpMethod: 'delete',
    httpPath: '/emails/{id}',
  },
  {
    clientCallName: 'client.emails.send',
    fullyQualifiedName: 'emails.send',
    httpMethod: 'post',
    httpPath: '/emails',
  },
  {
    clientCallName: 'client.emails.bulk.retrieve',
    fullyQualifiedName: 'emails.bulk.retrieve',
    httpMethod: 'get',
    httpPath: '/emails/bulk/{bulkId}',
  },
  {
    clientCallName: 'client.emails.bulk.send',
    fullyQualifiedName: 'emails.bulk.send',
    httpMethod: 'post',
    httpPath: '/emails/bulk',
  },
  {
    clientCallName: 'client.emails.events.list',
    fullyQualifiedName: 'emails.events.list',
    httpMethod: 'get',
    httpPath: '/emails/{id}/events',
  },
  {
    clientCallName: 'client.emails.content.retrieve',
    fullyQualifiedName: 'emails.content.retrieve',
    httpMethod: 'get',
    httpPath: '/emails/{id}/content',
  },
  {
    clientCallName: 'client.emails.stats.list',
    fullyQualifiedName: 'emails.stats.list',
    httpMethod: 'get',
    httpPath: '/emails/stats',
  },
  {
    clientCallName: 'client.webhooks.create',
    fullyQualifiedName: 'webhooks.create',
    httpMethod: 'post',
    httpPath: '/webhooks',
  },
  {
    clientCallName: 'client.webhooks.retrieve',
    fullyQualifiedName: 'webhooks.retrieve',
    httpMethod: 'get',
    httpPath: '/webhooks/{id}',
  },
  {
    clientCallName: 'client.webhooks.update',
    fullyQualifiedName: 'webhooks.update',
    httpMethod: 'put',
    httpPath: '/webhooks/{id}',
  },
  {
    clientCallName: 'client.webhooks.list',
    fullyQualifiedName: 'webhooks.list',
    httpMethod: 'get',
    httpPath: '/webhooks',
  },
  {
    clientCallName: 'client.webhooks.delete',
    fullyQualifiedName: 'webhooks.delete',
    httpMethod: 'delete',
    httpPath: '/webhooks/{id}',
  },
  { clientCallName: 'client.webhooks.unwrap', fullyQualifiedName: 'webhooks.unwrap' },
  {
    clientCallName: 'client.webhooks.events.list',
    fullyQualifiedName: 'webhooks.events.list',
    httpMethod: 'get',
    httpPath: '/webhooks/events',
  },
  {
    clientCallName: 'client.webhooks.events.deliveries',
    fullyQualifiedName: 'webhooks.events.deliveries',
    httpMethod: 'get',
    httpPath: '/webhooks/{id}/events/{eventId}/deliveries',
  },
  {
    clientCallName: 'client.webhooks.events.replay',
    fullyQualifiedName: 'webhooks.events.replay',
    httpMethod: 'post',
    httpPath: '/webhooks/{id}/events/{eventId}/replay',
  },
  {
    clientCallName: 'client.organizations.retrieve',
    fullyQualifiedName: 'organizations.retrieve',
    httpMethod: 'get',
    httpPath: '/organizations/{id}',
  },
  {
    clientCallName: 'client.organizations.list',
    fullyQualifiedName: 'organizations.list',
    httpMethod: 'get',
    httpPath: '/organizations',
  },
  {
    clientCallName: 'client.organizations.usage.retrieve',
    fullyQualifiedName: 'organizations.usage.retrieve',
    httpMethod: 'get',
    httpPath: '/organizations/{id}/usage',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
