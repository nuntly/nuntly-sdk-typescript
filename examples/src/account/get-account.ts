import { nuntly } from '../lib/nuntly';

async function main() {
  const account = await nuntly.account.retrieve();
  console.log('Account info:', account);
}

main().catch(console.error);
