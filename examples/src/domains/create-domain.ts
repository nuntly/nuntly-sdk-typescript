import { nuntly } from '../lib/nuntly';

async function main() {
  const domain = await nuntly.domains.create({
    name: 'example.com',
    region: 'eu-west-1',
  });
  console.log('Domain created:', domain);
}

main().catch(console.error);
