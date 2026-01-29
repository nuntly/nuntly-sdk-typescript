#!/usr/bin/env -S npm run tsn -T

import { createSafeNuntly } from '@nuntly/sdk/lib/safe';
import { NUNTLY_API_KEY } from '../env';

const nuntly = createSafeNuntly({ apiKey: NUNTLY_API_KEY });

(async () => {
  const { data, error } = await nuntly.domains.list();

  if (error) {
    console.error('Error listing domains:', error);
    return;
  }

  console.log('Listed domains successfully:');
  console.log('- Data:', data.data);
  console.log('- Next cursor:', data.nextCursor);
})();
