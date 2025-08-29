import * as readline from 'readline';
import { nuntly } from '../lib';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  rl.question('Enter the webhook ID to delete: ', async (webhookId) => {
    const result = await nuntly.webhooks.delete(webhookId);
    console.log('Webhook deleted:', result);
    rl.close();
  });
}

main().catch(console.error);
