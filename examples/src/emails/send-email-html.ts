import { env } from '../lib/env';
import { nuntly } from '../lib/nuntly';

async function main() {
  const email = await nuntly.emails.send({
    to: env.EMAIL_TO,
    from: env.EMAIL_FROM,
    subject: 'Hello from Nuntly SDK',
    html: '<p>This is an email sent via the Nuntly SDK.</p>',
  });
  console.log('Email sent:', email);
}

main().catch(console.error);
