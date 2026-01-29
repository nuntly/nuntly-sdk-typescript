#!/usr/bin/env -S npm run tsn -T

import { createSafeNuntly } from '@nuntly/sdk/lib/safe';
import { EMAIL_FROM, EMAIL_TO, NUNTLY_API_KEY } from '../env';

const nuntly = createSafeNuntly({ apiKey: NUNTLY_API_KEY });

(async () => {
  const { data, error } = await nuntly.emails.send({
    from: EMAIL_FROM,
    to: EMAIL_TO,
    subject: 'Hello from Nuntly SDK',
    text: 'This is a test email sent using the Nuntly Safe SDK.',
  });

  if (error) {
    console.error('Error sending email:', error);
    return;
  }

  console.log('Send email successfully:', { data });
})();
