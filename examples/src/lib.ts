import { Nuntly } from '@nuntly/sdk';
import dotenv from 'dotenv';
import { cleanEnv, str } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  NUNTLY_API_KEY: str(),
  EMAIL_FROM: str(),
  EMAIL_TO: str(),
});

export const nuntly = new Nuntly({
  apiKey: env.NUNTLY_API_KEY,
});

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
