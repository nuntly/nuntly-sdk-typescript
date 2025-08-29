import { env, nuntly, sleep } from '../lib';

async function main() {
  const bulk = await nuntly.emails.bulk.send({
    emails: [
      {
        to: env.EMAIL_TO,
        subject: 'Hello from Nuntly SDK',
        text: 'This is the first email of the bulk send.',
      },
      {
        to: env.EMAIL_TO,
        text: 'This is the second email of the bulk send.',
      },
    ],
    fallback: {
      from: env.EMAIL_FROM,
      subject: 'Fallback subject of the bulk email',
      html: '<p>This is a fallback html of the bulk email.',
    },
  });
  console.log('Email sent by bulk:', bulk);
  console.log('Waiting 10 seconds before retrieving the bulk status...');
  await sleep(10000);
  const response = await nuntly.emails.bulk.retrieve(bulk.id);
  console.log('Bulk response:', response);
}

main().catch(console.error);
