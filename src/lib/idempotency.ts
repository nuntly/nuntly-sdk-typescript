// UUID v4 for the Idempotency-Key header. Tries crypto.randomUUID, falls
// back to crypto.getRandomValues (works on browser HTTP, where randomUUID
// throws because it requires a secure context), then Math.random as last
// resort. Keys do not need to be crypto-strong, only collision-free in
// the 24h server-side cache window.

export function generateIdempotencyKey(): string {
  interface MinimalCrypto {
    randomUUID?: () => string;
    getRandomValues?: <T extends ArrayBufferView | null>(array: T) => T;
  }
  const cryptoApi = (globalThis as { crypto?: MinimalCrypto }).crypto;

  if (cryptoApi?.randomUUID) {
    try {
      return cryptoApi.randomUUID();
    } catch {
      // randomUUID throws on browser HTTP. Fall through.
    }
  }

  if (cryptoApi?.getRandomValues) {
    const bytes = new Uint8Array(16);
    cryptoApi.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
