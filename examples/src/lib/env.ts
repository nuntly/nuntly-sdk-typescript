import dotenv from 'dotenv';
import { cleanEnv, str } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  NUNTLY_API_KEY: str(),
  EMAIL_FROM: str(),
  EMAIL_TO: str(),
  REGION: str({ default: 'eu-west-1' }),
});
