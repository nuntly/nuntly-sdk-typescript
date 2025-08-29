import { Nuntly } from '../../../src';
import { env } from './env';

export const nuntly = new Nuntly({
  apiKey: env.NUNTLY_API_KEY,
});
