import * as readline from 'readline';
import { nuntly } from '../lib/nuntly';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  rl.question('Enter the webhook ID to update: ', async (webhookId) => {
    const webhook = await nuntly.webhooks.update(webhookId, {
      status: 'disabled',
    });
    console.log('Webhook updated:', webhook);
    rl.close();
  });
}

main().catch(console.error);
