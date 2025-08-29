import fs from 'fs';
import { env } from '../lib/env';
import { nuntly } from '../lib/nuntly';

async function main() {
  const attachmentPath = `${__dirname}/sample-10-page.pdf`;
  const attachmentContent = fs.readFileSync(attachmentPath).toString('base64');

  const email = await nuntly.emails.send({
    to: env.EMAIL_TO,
    from: env.EMAIL_FROM,
    subject: 'Hello from Nuntly SDK',
    text: 'This is an email sent via the Nuntly SDK.',
    attachments: [
      {
        // filename: 'sample.pdf',
        content: attachmentContent,
      },
    ],
  });

  console.log('Email sent:', email);
}

main().catch(console.error);
