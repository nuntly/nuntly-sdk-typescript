// `Retry-After` is decimal seconds or an HTTP-date (RFC 9110). Returns the delay in
// milliseconds (0 for a past date), or undefined when the header is absent or malformed.
export function parseRetryAfter(value: string | null): number | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (/^\d+(\.\d+)?$/.test(trimmed)) return Math.round(Number(trimmed) * 1000);
  const date = Date.parse(trimmed);
  return Number.isNaN(date) ? undefined : Math.max(0, date - Date.now());
}
