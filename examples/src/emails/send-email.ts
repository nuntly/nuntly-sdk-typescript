#!/usr/bin/env -S npm run tsn -T

import { Nuntly } from '@nuntly/sdk/client';
import { EMAIL_FROM, EMAIL_TO, NUNTLY_API_KEY } from '../env';

const nuntly = new Nuntly({
  apiKey: NUNTLY_API_KEY,
});

(async () => {
  const email = await nuntly.emails.send({
    from: EMAIL_FROM,
    to: EMAIL_TO,
    subject: 'Hello from Nuntly SDK',
    text: 'This is an email sent via the Nuntly SDK.',
  });
  console.log('Email sent:', email);
})();
