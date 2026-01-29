function requireEnv(name: keyof NodeJS.ProcessEnv): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}
export const NUNTLY_API_KEY = requireEnv('NUNTLY_API_KEY');
export const EMAIL_FROM = requireEnv('EMAIL_FROM');
export const EMAIL_TO = requireEnv('EMAIL_TO');
export const ORG_ID = requireEnv('ORG_ID');
