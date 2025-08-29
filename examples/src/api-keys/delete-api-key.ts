import * as readline from 'readline';
import { nuntly } from '../lib';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  rl.question('Enter the API Key ID to delete: ', async (apiKeyId) => {
    const result = await nuntly.apiKeys.delete(apiKeyId);
    console.log('API Key deleted:', result);
  });
}

main().catch(console.error);
