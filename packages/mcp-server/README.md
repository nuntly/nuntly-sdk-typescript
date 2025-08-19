# Nuntly TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Direct invocation

You can run the MCP Server directly via `npx`:

```sh
export NUNTLY_API_KEY="My API Key"
npx -y @nuntly/sdk-mcp@latest
```

### Via MCP Client

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "nuntly_sdk_api": {
      "command": "npx",
      "args": ["-y", "@nuntly/sdk-mcp", "--client=claude", "--tools=dynamic"],
      "env": {
        "NUNTLY_API_KEY": "My API Key"
      }
    }
  }
}
```

## Exposing endpoints to your MCP Client

There are two ways to expose endpoints as tools in the MCP server:

1. Exposing one tool per endpoint, and filtering as necessary
2. Exposing a set of tools to dynamically discover and invoke endpoints from the API

### Filtering endpoints and tools

You can run the package on the command line to discover and filter the set of tools that are exposed by the
MCP Server. This can be helpful for large APIs where including all endpoints at once is too much for your AI's
context window.

You can filter by multiple aspects:

- `--tool` includes a specific tool by name
- `--resource` includes all tools under a specific resource, and can have wildcards, e.g. `my.resource*`
- `--operation` includes just read (get/list) or just write operations

### Dynamic tools

If you specify `--tools=dynamic` to the MCP server, instead of exposing one tool per endpoint in the API, it will
expose the following tools:

1. `list_api_endpoints` - Discovers available endpoints, with optional filtering by search query
2. `get_api_endpoint_schema` - Gets detailed schema information for a specific endpoint
3. `invoke_api_endpoint` - Executes any endpoint with the appropriate parameters

This allows you to have the full set of API endpoints available to your MCP Client, while not requiring that all
of their schemas be loaded into context at once. Instead, the LLM will automatically use these tools together to
search for, look up, and invoke endpoints dynamically. However, due to the indirect nature of the schemas, it
can struggle to provide the correct properties a bit more than when tools are imported explicitly. Therefore,
you can opt-in to explicit tools, the dynamic tools, or both.

See more information with `--help`.

All of these command-line options can be repeated, combined together, and have corresponding exclusion versions (e.g. `--no-tool`).

Use `--list` to see the list of available tools, or see below.

### Specifying the MCP Client

Different clients have varying abilities to handle arbitrary tools and schemas.

You can specify the client you are using with the `--client` argument, and the MCP server will automatically
serve tools and schemas that are more compatible with that client.

- `--client=<type>`: Set all capabilities based on a known MCP client

  - Valid values: `openai-agents`, `claude`, `claude-code`, `cursor`
  - Example: `--client=cursor`

Additionally, if you have a client not on the above list, or the client has gotten better
over time, you can manually enable or disable certain capabilities:

- `--capability=<name>`: Specify individual client capabilities
  - Available capabilities:
    - `top-level-unions`: Enable support for top-level unions in tool schemas
    - `valid-json`: Enable JSON string parsing for arguments
    - `refs`: Enable support for $ref pointers in schemas
    - `unions`: Enable support for union types (anyOf) in schemas
    - `formats`: Enable support for format validations in schemas (e.g. date-time, email)
    - `tool-name-length=N`: Set maximum tool name length to N characters
  - Example: `--capability=top-level-unions --capability=tool-name-length=40`
  - Example: `--capability=top-level-unions,tool-name-length=40`

### Examples

1. Filter for read operations on cards:

```bash
--resource=cards --operation=read
```

2. Exclude specific tools while including others:

```bash
--resource=cards --no-tool=create_cards
```

3. Configure for Cursor client with custom max tool name length:

```bash
--client=cursor --capability=tool-name-length=40
```

4. Complex filtering with multiple criteria:

```bash
--resource=cards,accounts --operation=read --tag=kyc --no-tool=create_cards
```

## Running remotely

Launching the client with `--transport=http` launches the server as a remote server using Streamable HTTP transport. The `--port` setting can choose the port it will run on, and the `--socket` setting allows it to run on a Unix socket.

Authorization can be provided via the `Authorization` header using the Bearer scheme.

Additionally, authorization can be provided via the following headers:
| Header | Equivalent client option | Security scheme |
| ------------------ | ------------------------ | --------------- |
| `x-nuntly-api-key` | `apiKey` | bearerAuth |

A configuration JSON for this server might look like this, assuming the server is hosted at `http://localhost:3000`:

```json
{
  "mcpServers": {
    "nuntly_sdk_api": {
      "url": "http://localhost:3000",
      "headers": {
        "Authorization": "Bearer <auth value>"
      }
    }
  }
}
```

The command-line arguments for filtering tools and specifying clients can also be used as query parameters in the URL.
For example, to exclude specific tools while including others, use the URL:

```
http://localhost:3000?resource=cards&resource=accounts&no_tool=create_cards
```

Or, to configure for the Cursor client, with a custom max tool name length, use the URL:

```
http://localhost:3000?client=cursor&capability=tool-name-length%3D40
```

## Importing the tools and server individually

```js
// Import the server, generated endpoints, or the init function
import { server, endpoints, init } from "@nuntly/sdk-mcp/server";

// import a specific tool
import createAPIKeys from "@nuntly/sdk-mcp/tools/api-keys/create-api-keys";

// initialize the server and all endpoints
init({ server, endpoints });

// manually start server
const transport = new StdioServerTransport();
await server.connect(transport);

// or initialize your own server with specific tools
const myServer = new McpServer(...);

// define your own endpoint
const myCustomEndpoint = {
  tool: {
    name: 'my_custom_tool',
    description: 'My custom tool',
    inputSchema: zodToJsonSchema(z.object({ a_property: z.string() })),
  },
  handler: async (client: client, args: any) => {
    return { myResponse: 'Hello world!' };
  })
};

// initialize the server with your custom endpoints
init({ server: myServer, endpoints: [createAPIKeys, myCustomEndpoint] });
```

## Available Tools

The following tools are available in this MCP server.

### Resource `api_keys`:

- `create_api_keys` (`write`): Create a new api key
- `retrieve_api_keys` (`read`): Return the api-key with the given ID
- `update_api_keys` (`write`): Updates partial api key fields with the given id
- `list_api_keys` (`read`): Return a list of your api keys
- `delete_api_keys` (`write`): Delete the api key with the given ID

### Resource `domains`:

- `create_domains` (`write`): Return the domain with the given ID
- `retrieve_domains` (`read`): Return the domain with the given id
- `update_domains` (`write`): Updates domain tracking settings
- `list_domains` (`read`): Return a list of your domains
- `delete_domains` (`write`): Delete the domain with the given ID

### Resource `emails`:

- `retrieve_emails` (`read`): Return the email with the given id
- `list_emails` (`read`): Return a list of your last emails
- `cancel_emails` (`write`): Cancel a scheduled email
- `send_emails` (`write`): Send transactional emails through the Nuntly platform. It supports HTML and plain-text emails, attachments, labels, custom headers and scheduling.

### Resource `emails.bulk`:

- `retrieve_emails_bulk` (`read`): Return a list of emails
- `send_emails_bulk` (`write`): Send bulk emails

### Resource `emails.events`:

- `list_emails_events` (`read`): Return the events related to this email id

### Resource `emails.stats`:

- `list_emails_stats` (`read`): Return the emails stats

### Resource `webhooks`:

- `create_webhooks` (`write`): Create a webhook so the endpoint is notified from Nuntly platform events (Emails events)
- `retrieve_webhooks` (`read`): Return the webhook with the given ID
- `update_webhooks` (`write`): Updates a webhook with the given ID
- `list_webhooks` (`read`): Return a list of your webhooks
- `delete_webhooks` (`write`): Delete the webhook with the given ID

### Resource `organizations`:

- `retrieve_organizations` (`read`): Return the organization
- `update_organizations` (`write`): Patch the organization
- `list_organizations` (`read`): Return the organizations that the current user is a member

### Resource `organizations.memberships`:

- `list_organizations_memberships` (`read`): Return the organization memberships
- `revoke_organizations_memberships` (`write`): Revoke a user from an organization

### Resource `organizations.invitations`:

- `list_organizations_invitations` (`read`): Return the organization invitations
- `delete_organizations_invitations` (`write`): Delete an invitation
- `send_organizations_invitations` (`write`): Send an invitation to someone you wish to invite to join your organization

### Resource `organizations.subscriptions`:

- `list_organizations_subscriptions` (`read`): Return the organization subscriptions

### Resource `organizations.usage`:

- `retrieve_organizations_usage` (`read`): Return the organization usage

### Resource `account`:

- `retrieve_account` (`read`): Retrieve your account informations
- `update_account` (`write`): Update your account
