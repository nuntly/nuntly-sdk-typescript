#!/usr/bin/env -S npm run tsn -T

import { createSafeNuntly } from '@nuntly/sdk/lib/safe';
import { EMAIL_FROM, EMAIL_TO, NUNTLY_API_KEY } from '../env';

const nuntly = createSafeNuntly({ apiKey: NUNTLY_API_KEY });

(async () => {
  const { data, error } = await nuntly.emails.send({
    from: EMAIL_FROM,
    to: EMAIL_TO,
    subject: 'Hello from Nuntly SDK',
    html: '<p>This is an email sent via the Nuntly SDK.</p>',
    text: 'This is an email sent via the Nuntly SDK.',
  });
  if (error) {
    console.error('Error sending email:', error);
    return;
  }

  console.log('Send email successfully:', { data });
})();
