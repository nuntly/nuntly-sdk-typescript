#!/usr/bin/env -S npm run tsn -T

import { createSafeNuntly } from '@nuntly/sdk/lib/safe';
import { NUNTLY_API_KEY, ORG_ID } from '../env';

const nuntly = createSafeNuntly({ apiKey: NUNTLY_API_KEY });

(async () => {
  const { data, error } = await nuntly.organizations.usage.retrieve(ORG_ID);

  if (error) {
    console.error('Error retrieving organization usage:', error);
    return;
  }

  console.log('Retrieved organization usage successfully:', data);
})();
