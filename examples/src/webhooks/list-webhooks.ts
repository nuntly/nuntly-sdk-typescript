#!/usr/bin/env -S npm run tsn -T

import { createSafeNuntly } from '@nuntly/sdk/lib/safe';
import { NUNTLY_API_KEY } from '../env';

const nuntly = createSafeNuntly({ apiKey: NUNTLY_API_KEY });

(async () => {
  const { data, error } = await nuntly.webhooks.list();

  if (error) {
    console.error('Error listing webhooks:', error);
    return;
  }

  console.log('Listed webhooks successfully:');
  console.log('- Data:', data.data);
  console.log('- Next cursor:', data.nextCursor);
})();
