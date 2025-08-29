import { nuntly } from '../lib/nuntly';

// This example demonstrates how to list webhooks using the Nuntly SDK

async function main() {
  const webhooks = await nuntly.webhooks.list();

  for await (const webhook of webhooks) {
    console.log(`- ${webhook.endpoint_url} (${webhook.id}) - Status: ${webhook.status}`);
  }
}

main().catch(console.error);
