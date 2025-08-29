import { env, nuntly, sleep } from '../lib';

async function main() {
  const bulk = await nuntly.emails.bulk.send({
    emails: [
      {
        to: env.EMAIL_TO,
        from: env.EMAIL_FROM,
        subject: 'Hello 1 from Nuntly SDK',
        text: 'This is an 1 email sent via the Nuntly SDK.',
      },
      {
        to: env.EMAIL_TO,
        from: env.EMAIL_FROM,
        subject: 'Hello 2 from Nuntly SDK',
        text: 'This is an 2 email sent via the Nuntly SDK.',
      },
    ],
  });
  console.log('Email sent by bulk:', bulk);
  console.log('Waiting 10 seconds before retrieving the bulk status...');
  await sleep(10000);
  const response = await nuntly.emails.bulk.retrieve(bulk.id);
  console.log('Bulk response:', response);
}

main().catch(console.error);
