import { nuntly } from '../lib';

async function main() {
  const webhooks = await nuntly.webhooks.list();

  for await (const webhook of webhooks) {
    console.log(`- ${webhook.endpoint_url} (${webhook.id}) - Status: ${webhook.status}`);
  }
}

main().catch(console.error);
