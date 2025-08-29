import * as readline from 'readline';
import { nuntly } from '../lib/nuntly';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  rl.question('Enter the webhook ID to retrieve: ', async (webhookId) => {
    const webhook = await nuntly.webhooks.retrieve(webhookId);
    console.log('Webhook details:', webhook);
    rl.close();
  });
}

main().catch(console.error);
