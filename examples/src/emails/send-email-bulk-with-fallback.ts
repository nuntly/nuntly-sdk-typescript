#!/usr/bin/env -S npm run tsn -T

import { createSafeNuntly } from '@nuntly/sdk/lib/safe';
import { EMAIL_FROM, EMAIL_TO, NUNTLY_API_KEY } from '../env';

const nuntly = createSafeNuntly({ apiKey: NUNTLY_API_KEY });

(async () => {
  const { data, error } = await nuntly.emails.bulk.send({
    fallback: {
      from: EMAIL_FROM,
      subject: 'Fallback Email from Nuntly SDK',
    },
    emails: [
      {
        to: EMAIL_TO,
        html: '<p>This is an email 1 sent via the Nuntly SDK.</p>',
        text: 'This is an email 1 sent via the Nuntly SDK.',
      },
      {
        to: EMAIL_TO,
        html: '<p>This is an email 2 sent via the Nuntly SDK.</p>',
        text: 'This is an email 2 sent via the Nuntly SDK.',
      },
    ],
  });
  if (error) {
    console.error('Error sending emails:', error);
    return;
  }

  console.log('Send emails successfully:', { id: data.id, emails: data.emails });
})();
