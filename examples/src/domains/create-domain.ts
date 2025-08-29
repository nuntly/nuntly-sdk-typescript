import * as readline from 'readline';
import { nuntly } from '../lib';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  rl.question('Enter the domain name: ', async (name) => {
    const domain = await nuntly.domains.create({
      name,
      region: 'eu-west-1',
    });
    console.log('Domain created:', domain);
  });
}

main().catch(console.error);
