declare const __SDK_VERSION__: string;

// `__SDK_VERSION__` is replaced at build time by the bundler with the value of
// `version` in `packages/sdk/package.json`. The fallback is only used in
// uncompiled dev contexts.
export const SDK_VERSION: string =
  typeof __SDK_VERSION__ !== 'undefined' ? __SDK_VERSION__ : '0.0.0-dev';
