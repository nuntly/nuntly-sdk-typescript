import { env } from '../lib/env';
import { nuntly } from '../lib/nuntly';

async function main() {
  const bulk = await nuntly.emails.bulk.send({
    emails: [
      {
        to: env.EMAIL_TO,
        subject: 'Hello 1 from Nuntly SDK',
        text: 'This is an 1 email sent via the Nuntly SDK.',
      },
      {
        to: env.EMAIL_TO,
        text: 'This is an 2 email sent via the Nuntly SDK.',
      },
    ],
    fallback: {
      from: env.EMAIL_FROM,
      subject: 'Fallback: subject',
      html: '<p>This is a fallback email sent via the Nuntly SDK.</p>',
    },
  });
  console.log('Email sent by bulk:', bulk);
  console.log('Waiting 10 seconds before retrieving the bulk status...');
  await sleep(10000);
  const response = await nuntly.emails.bulk.retrieve(bulk.id);
  console.log('Bulk response:', response);
}

main().catch(console.error);

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
