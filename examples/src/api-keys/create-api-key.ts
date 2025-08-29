import { nuntly } from '../lib/nuntly';

async function main() {
  const apiKey = await nuntly.apiKeys.create({
    name: 'My API Key',
  });
  console.log('API Key created:', apiKey);
}

main().catch(console.error);
