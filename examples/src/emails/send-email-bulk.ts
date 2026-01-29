#!/usr/bin/env -S npm run tsn -T

import { createSafeNuntly } from '@nuntly/sdk/lib/safe';
import { EMAIL_FROM, EMAIL_TO, NUNTLY_API_KEY } from '../env';

const nuntly = createSafeNuntly({ apiKey: NUNTLY_API_KEY });

(async () => {
  const { data, error } = await nuntly.emails.bulk.send({
    emails: [
      {
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: 'Hello 1 from Nuntly SDK',
        html: '<p>This is an email sent via the Nuntly SDK.</p>',
        text: 'This is an email sent via the Nuntly SDK.',
      },
      {
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: 'Hello 2 from Nuntly SDK',
        html: '<p>This is an email sent via the Nuntly SDK.</p>',
        text: 'This is an email sent via the Nuntly SDK.',
      },
    ],
  });
  if (error) {
    console.error('Error sending emails:', error);
    return;
  }

  console.log('Send emails successfully:', { id: data.id, emails: data.emails });
})();
