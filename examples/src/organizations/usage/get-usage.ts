import * as readline from 'readline';
import { nuntly } from 'src/lib/nuntly';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  rl.question('Enter the organization ID to retrieve usage: ', async (organizationId) => {
    const usage = await nuntly.organizations.usage.retrieve(organizationId);
    console.log('Organization usage:', usage);
    rl.close();
  });
}

main().catch(console.error);
