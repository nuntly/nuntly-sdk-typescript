import * as readline from 'readline';
import { nuntly } from '../lib/nuntly';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  rl.question('Enter the organization ID to retrieve: ', async (organizationId) => {
    const organization = await nuntly.organizations.retrieve(organizationId);
    console.log('Organization details:', organization);
    rl.close();
  });
}

main().catch(console.error);
