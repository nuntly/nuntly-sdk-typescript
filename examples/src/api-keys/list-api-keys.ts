import { nuntly } from '../lib/nuntly';

async function main() {
  const apiKeys = await nuntly.apiKeys.list();

  for await (const apiKey of apiKeys) {
    console.log(`- ${apiKey.name} (${apiKey.id}) ${apiKey.status}`);
  }

  if (apiKeys.data.length === 0) {
    console.log('No API keys found.');
  } else {
    const firstApiKey = apiKeys.data[0];
    if (firstApiKey && firstApiKey.id) {
      const apiKey = await nuntly.apiKeys.retrieve(firstApiKey.id);
      console.log(`Retrieved API key`, apiKey);
    }
  }
}

main().catch(console.error);
