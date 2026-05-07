# Nuntly TypeScript SDK

[![npm version](https://img.shields.io/npm/v/@nuntly/sdk.svg)](https://www.npmjs.com/package/@nuntly/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

Official TypeScript SDK for [Nuntly](https://nuntly.com), the developer-first email platform.

This repository hosts two packages:

| Package | Published to npm | Description |
|---------|------------------|-------------|
| [`@nuntly/sdk`](./packages/sdk) | yes | Public SDK consumed by applications |
| `@nuntly/sdk-core` | no (private) | Internal HTTP infrastructure, bundled into `@nuntly/sdk` at build time |

For SDK usage, see [`packages/sdk/README.md`](./packages/sdk/README.md).

## Repository structure

```
packages/
├── sdk/         Public @nuntly/sdk package (auto-generated API surface)
└── sdk-core/    Internal HTTP infrastructure (hand-maintained)
```

## Development

```bash
bun install
bun run build
bun run typecheck
bun run test
```

The `@nuntly/sdk` build bundles `@nuntly/sdk-core` inline. The published npm package has no runtime dependency on `@nuntly/sdk-core`.

## Releases

Tagging `v*` on `main` triggers `.github/workflows/release.yml`, which:

1. Builds `@nuntly/sdk` (with `@nuntly/sdk-core` bundled)
2. Verifies the tag matches `packages/sdk/package.json` version
3. Publishes `@nuntly/sdk` to npm with OIDC provenance

`@nuntly/sdk-core` is never published.
