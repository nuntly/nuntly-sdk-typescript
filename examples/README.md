# Nuntly TypeScript SDK Examples

This directory contains examples demonstrating how to use the Nuntly TypeScript SDK for various operations.

## Setup

1. **Install dependencies:**

   ```bash
   yarn install
   ```

2. **Configure environment variables:**

   ```bash
   cp .env.template .env
   ```

   Then edit `.env` and add your Nuntly API key and other required values.

3. **Run any example:**
   ```bash
   yarn <script-name>
   ```

## Available Examples

### Account

- `yarn account:get` - Retrieve account information

### API Keys

- `yarn api-keys:create` - Create a new API key
- `yarn api-keys:list` - List all API keys
- `yarn api-keys:get` - Retrieve a specific API key
- `yarn api-keys:delete` - Delete an API key

### Domains

- `yarn domains:create` - Create a new domain

### Emails

- `yarn emails:send` - Send a basic email
- `yarn emails:send-bulk` - Send bulk emails
- `yarn emails:send-bulk-with-fallback` - Send bulk emails with fallback
- `yarn emails:send-with-attachment` - Send email with attachment
- `yarn emails:send-with-tag` - Send email with tags
- `yarn emails:send-html` - Send HTML email
- `yarn emails:send-html-txt` - Send email with both HTML and text
- `yarn emails:send-template` - Send email using a template

### Webhooks

- `yarn webhooks:create` - Create a new webhook
- `yarn webhooks:list` - List all webhooks
- `yarn webhooks:get` - Retrieve a specific webhook
- `yarn webhooks:update` - Update a webhook
- `yarn webhooks:delete` - Delete a webhook

### Organizations

- `yarn organizations:get` - Get organization details
- `yarn organizations:list-memberships` - List organization memberships
- `yarn organizations:send-invitation` - Send organization invitation
- `yarn organizations:get-usage` - Get organization usage statistics

## Project Structure

```
examples/
├── src/
│   ├── account/           # Account-related examples
│   ├── api-keys/          # API key management examples
│   ├── domains/           # Domain management examples
│   ├── emails/            # Email sending examples
│   ├── organizations/     # Organization management examples
│   ├── webhooks/          # Webhook management examples
│   ├── env.ts            # Environment variable configuration
│   └── nuntly.ts         # Shared Nuntly client instance
├── .env                  # Your environment variables (not in git)
├── .env.template         # Template for environment variables
└── package.json          # Project configuration and scripts
```

## Environment Variables

The examples use the following environment variables (configured in `.env`):

- `NUNTLY_API_KEY` - Your Nuntly API key (required)
- `EMAIL_FROM` - Default sender email address
- `EMAIL_TO` - Default recipient email address

## Usage Tips

1. **Start with basic examples** like `account:get` to verify your API key is working
2. **Check the source code** of each example to understand the parameters and options
3. **Modify the examples** to fit your specific use case
4. **Use real IDs** when testing examples that require specific resource IDs (webhooks, organizations, etc.)

## Need Help?

- Check the [Nuntly API Documentation](https://developers.nuntly.com/api-reference/getting-started)
- Review the SDK source code in `../src/`
- Look at the TypeScript types for parameter definitions
