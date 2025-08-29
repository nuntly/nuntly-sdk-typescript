import * as readline from 'readline';
import { nuntly } from '../lib';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  rl.question('Enter the API Key ID to retrieve: ', async (apiKeyId) => {
    const apiKey = await nuntly.apiKeys.retrieve(apiKeyId);
    console.log('API Key details:', apiKey);
  });
}

main().catch(console.error);
