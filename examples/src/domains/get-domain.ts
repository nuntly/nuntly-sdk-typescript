import * as readline from 'readline';
import { nuntly } from '../lib';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
async function main() {
  rl.question('Enter the domain id to retrieve: ', async (domainId) => {
    const domain = await nuntly.domains.retrieve(domainId);
    console.log('Domain retrieved:', domain);
  });
}

main().catch(console.error);
