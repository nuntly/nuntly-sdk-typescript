import { nuntly } from '../lib';

async function main() {
  const webhook = await nuntly.webhooks.create({
    endpoint_url: 'https://your-webhook-url.com',
    events: ['email.sent'],
    status: 'enabled',
  });
  console.log('Webhook created:', webhook);
}

main().catch(console.error);
