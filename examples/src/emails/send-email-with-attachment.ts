#!/usr/bin/env -S npm run tsn -T

import { createSafeNuntly } from '@nuntly/sdk/lib/safe';
import { EMAIL_FROM, EMAIL_TO, NUNTLY_API_KEY } from '../env';
import { downloadSamplePdf } from '../lib';

const nuntly = createSafeNuntly({ apiKey: NUNTLY_API_KEY });

(async () => {
  const { data, error } = await nuntly.emails.send({
    from: EMAIL_FROM,
    to: EMAIL_TO,
    subject: 'Hello Attachments from Nuntly SDK',
    text: 'This is a test email sent using the Nuntly SDK.',
    attachments: [
      {
        filename: 'sample.pdf',
        content: await downloadSamplePdf(),
      },
    ],
  });

  if (error) {
    console.error('Error sending email:', error);
    return;
  }

  console.log('Send email successfully:', { data });
})();
