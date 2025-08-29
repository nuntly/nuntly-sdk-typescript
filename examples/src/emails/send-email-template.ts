import fs from 'fs';
import { env, nuntly } from '../lib';

async function main() {
  const attachmentPath = `${__dirname}/sample-10-page.pdf`;
  const attachmentContent = fs.readFileSync(attachmentPath).toString('base64');

  const email = await nuntly.emails.send({
    to: env.EMAIL_TO,
    from: env.EMAIL_FROM,
    subject: 'Hello {{user.name}} from Nuntly SDK',
    text: 'This is an email sent via the Nuntly SDK: {{user.email}}',
    context: {
      user: {
        name: 'John Doe',
        email: 'user@example.com',
      },
    },
  });

  console.log('Email sent:', email);
}

main().catch(console.error);
