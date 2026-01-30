# Changelog

## 0.12.0 (2026-01-30)

Full Changelog: [v0.11.1...v0.12.0](https://github.com/nuntly/nuntly-sdk-typescript/compare/v0.11.1...v0.12.0)

### Features

* **api:** manual updates ([fc361be](https://github.com/nuntly/nuntly-sdk-typescript/commit/fc361be1ceb4ca94cd84250ef4a3b6f2a17987d9))

## 0.11.1 (2026-01-30)

Full Changelog: [v0.11.0...v0.11.1](https://github.com/nuntly/nuntly-sdk-typescript/compare/v0.11.0...v0.11.1)

### Bug Fixes

* **release:** add OIDC configuration ([07f324a](https://github.com/nuntly/nuntly-sdk-typescript/commit/07f324aba80ae50457ea0c10991343c82c88ec6b))

## 0.11.0 (2026-01-29)

Full Changelog: [v0.10.2...v0.11.0](https://github.com/nuntly/nuntly-sdk-typescript/compare/v0.10.2...v0.11.0)

### Features

* **api:** prepare the next version of the API ([2505e7e](https://github.com/nuntly/nuntly-sdk-typescript/commit/2505e7e4662fa1165af1a5eaa7d424855d724c0f))
* **doc:** add more examples ([b99734f](https://github.com/nuntly/nuntly-sdk-typescript/commit/b99734f555a7582425afc5d93bad11a628009b2f))
* **safe:** safely use async/await without all the try catch blocks ([d138bc6](https://github.com/nuntly/nuntly-sdk-typescript/commit/d138bc63da390711bcdc6c2aecd62e43e4437e7e))
* **safe:** safely use async/await without all the try catch blocks ([b99734f](https://github.com/nuntly/nuntly-sdk-typescript/commit/b99734f555a7582425afc5d93bad11a628009b2f))


### Chores

* remove custom code ([4c1ca22](https://github.com/nuntly/nuntly-sdk-typescript/commit/4c1ca22aedef85ff7dc0227723d0de1ea529d19b))

## 0.10.2 (2026-01-29)

Full Changelog: [v0.10.1...v0.10.2](https://github.com/nuntly/nuntly-sdk-typescript/compare/v0.10.1...v0.10.2)

### Features

* **mcp:** add option for including docs tools ([6d5c15f](https://github.com/nuntly/nuntly-sdk-typescript/commit/6d5c15fb7f0111335852bb7240f54991ba16abef))
* **mcp:** enable optional code execution tool on http mcp servers ([4e1eddb](https://github.com/nuntly/nuntly-sdk-typescript/commit/4e1eddbe20840aa78b231404d6ee7be12e639176))


### Bug Fixes

* **mcpb:** pin @anthropic-ai/mcpb version ([aa7919d](https://github.com/nuntly/nuntly-sdk-typescript/commit/aa7919d81ee18aff9580c9ca24127dc145c89967))
* **mcp:** fix cli argument parsing logic ([61d8454](https://github.com/nuntly/nuntly-sdk-typescript/commit/61d8454d07a38351e3ad4f69da3bcb8b11f999ef))
* **mcp:** fix some response schemas used for jq filtering ([2f59b51](https://github.com/nuntly/nuntly-sdk-typescript/commit/2f59b5164bb6cdf55841e1f3e89aa5e7dd235c90))
* **mcp:** resolve a linting issue in server code ([2b7ffc2](https://github.com/nuntly/nuntly-sdk-typescript/commit/2b7ffc2c9e80362fdf3dea2048d305364b4c0742))
* **mcp:** return tool execution error on jq failure ([9ff9dee](https://github.com/nuntly/nuntly-sdk-typescript/commit/9ff9deec23de2a557fca5c9f82f0977ca773da04))


### Performance Improvements

* faster formatting ([c292ce8](https://github.com/nuntly/nuntly-sdk-typescript/commit/c292ce8a33aae78a460103c2098f808a11995c3a))


### Chores

* extract some types in mcp docs ([07407f3](https://github.com/nuntly/nuntly-sdk-typescript/commit/07407f33b775b3772b132889068f8fc3728dc9f8))
* **internal:** codegen related update ([11daf98](https://github.com/nuntly/nuntly-sdk-typescript/commit/11daf98b94933efb6881c9ad21a62ea1a0a8cf8f))
* **internal:** codegen related update ([a6ae25b](https://github.com/nuntly/nuntly-sdk-typescript/commit/a6ae25b8de8964578c67039149f486631aad29c6))
* **internal:** codegen related update ([d567574](https://github.com/nuntly/nuntly-sdk-typescript/commit/d567574a4fe7110b520d96f64600525e87adebfc))
* **internal:** codegen related update ([2334597](https://github.com/nuntly/nuntly-sdk-typescript/commit/23345977ab98c41ca55351ca0186e175d929f44c))
* **internal:** fix incremental formatting in some cases ([26cc488](https://github.com/nuntly/nuntly-sdk-typescript/commit/26cc4882f94983444ab24ab488889d4787daba2b))
* **internal:** grammar fix (it's -&gt; its) ([9632ca7](https://github.com/nuntly/nuntly-sdk-typescript/commit/9632ca7ab61aa76eb6cd28ad9302d01113ac23ce))
* **internal:** ignore .eslintcache ([56919b7](https://github.com/nuntly/nuntly-sdk-typescript/commit/56919b7a527c7b8e4a25a0d2bab56a3d5c59cd42))
* **internal:** remove .eslintcache ([3349485](https://github.com/nuntly/nuntly-sdk-typescript/commit/3349485caf2c0294807a72d9f89dd78dd486d7e6))
* **internal:** remove deprecated `compilerOptions.baseUrl` from tsconfig.json ([1526bc4](https://github.com/nuntly/nuntly-sdk-typescript/commit/1526bc40fd0bd1decf6bdfedc540e3caf46b7a37))
* **internal:** upgrade wrangler version ([ea3ff53](https://github.com/nuntly/nuntly-sdk-typescript/commit/ea3ff5389ea905388ad5d741bf98780f5124a6a5))
* **internal:** use npm pack for build uploads ([3c344cd](https://github.com/nuntly/nuntly-sdk-typescript/commit/3c344cd180869780aaffc00368119bf3663f7c62))
* **jsdoc:** fix [@link](https://github.com/link) annotations to refer only to parts of the package‘s public interface ([26e8e1b](https://github.com/nuntly/nuntly-sdk-typescript/commit/26e8e1b98b81bfd36fc6f8dd0706a8f0895f2405))
* mcp code tool explicit error message when missing a run function ([175a42a](https://github.com/nuntly/nuntly-sdk-typescript/commit/175a42a4c9d14af2a5e24053d7bd6d59b50701c0))
* **mcp:** add friendlier MCP code tool errors on incorrect method invocations ([2e4c224](https://github.com/nuntly/nuntly-sdk-typescript/commit/2e4c2240b9d3b4503c108664573cbd0ec2a661ff))
* **mcp:** add line numbers to code tool errors ([aa305dc](https://github.com/nuntly/nuntly-sdk-typescript/commit/aa305dc1306f4e8baffa5d9386d01116bff2e488))
* **mcp:** allow pointing `docs_search` tool at other URLs ([02409de](https://github.com/nuntly/nuntly-sdk-typescript/commit/02409de69c9b0314646bd8b1d975f1e06d081b8a))
* **mcp:** clarify http auth error ([fe59f9c](https://github.com/nuntly/nuntly-sdk-typescript/commit/fe59f9caafb872e4009cfdf138611b015ebdeaa7))
* **mcp:** upgrade jq-web ([8f1248e](https://github.com/nuntly/nuntly-sdk-typescript/commit/8f1248e96aeceeef14b3954fe11d4006665bf19e))
* update docstrings ([b119f6a](https://github.com/nuntly/nuntly-sdk-typescript/commit/b119f6abf78e2cde6a8c301e29c294e0a92a4a5b))
* update lockfile ([456bf05](https://github.com/nuntly/nuntly-sdk-typescript/commit/456bf0516d4c1e46a78efff666e596c16578a788))
* use structured error when code execution tool errors ([2d6ac69](https://github.com/nuntly/nuntly-sdk-typescript/commit/2d6ac69f3ac0627e1ce2b721b06e91debcbc3f60))


### Documentation

* **mcp:** add a README button for one-click add to Cursor ([396ec15](https://github.com/nuntly/nuntly-sdk-typescript/commit/396ec1535841de24a8a0354acebaffcc631fadcb))
* **mcp:** add a README link to add server to VS Code or Claude Code ([35397ce](https://github.com/nuntly/nuntly-sdk-typescript/commit/35397ce25cc225cc14c52b3539269b43dbc248e4))

## 0.10.1 (2025-09-23)

Full Changelog: [v0.10.0...v0.10.1](https://github.com/nuntly/nuntly-sdk-typescript/compare/v0.10.0...v0.10.1)

### Features

* **api:** rename retry to replay ([2e78ac7](https://github.com/nuntly/nuntly-sdk-typescript/commit/2e78ac7342f2562f4ca8e72beec7f7a8da66ec92))
* **mcp:** enable experimental docs search tool ([387eb6d](https://github.com/nuntly/nuntly-sdk-typescript/commit/387eb6d6e59c534618c403230f8c11d8967c17d9))

## 0.10.0 (2025-09-22)

Full Changelog: [v0.9.0...v0.10.0](https://github.com/nuntly/nuntly-sdk-typescript/compare/v0.9.0...v0.10.0)

### Features

* **api:** rotate webhook signing secret ([cf79edb](https://github.com/nuntly/nuntly-sdk-typescript/commit/cf79edb6e38bc85d783831d389e2aa70189cc28d))

## 0.9.0 (2025-09-20)

Full Changelog: [v0.8.0...v0.9.0](https://github.com/nuntly/nuntly-sdk-typescript/compare/v0.8.0...v0.9.0)

### Features

* **api:** webhook events, retry and deliveries ([970e9e9](https://github.com/nuntly/nuntly-sdk-typescript/commit/970e9e946a8f13884e96445cee3be1bf53ad97dd))


### Chores

* do not install brew dependencies in ./scripts/bootstrap by default ([e9ad6bc](https://github.com/nuntly/nuntly-sdk-typescript/commit/e9ad6bc79fd5370d6b3dcd593e1713dcea7c129c))

## 0.8.0 (2025-09-19)

Full Changelog: [v0.7.1...v0.8.0](https://github.com/nuntly/nuntly-sdk-typescript/compare/v0.7.1...v0.8.0)

### Features

* **custom:** custom back ([3d015c1](https://github.com/nuntly/nuntly-sdk-typescript/commit/3d015c153ddefb9606dc5a281094433ccdd31b3c))
* **mcp:** add docs search tool ([9466dce](https://github.com/nuntly/nuntly-sdk-typescript/commit/9466dce72eea19e10fc36a4047a8b06043986703))


### Bug Fixes

* **ci:** set permissions for DXT publish action ([f5801ff](https://github.com/nuntly/nuntly-sdk-typescript/commit/f5801ffb49ec3b78e30e75f137dcabb94aad6e2d))


### Chores

* **codegen:** internal codegen update ([ffa6435](https://github.com/nuntly/nuntly-sdk-typescript/commit/ffa6435626e94b0e20984b178955234a31066ee6))
* **internal:** gitignore .mcpb files ([2e9b603](https://github.com/nuntly/nuntly-sdk-typescript/commit/2e9b6035e70360ef02e0b7daee8e0e4a8267d0d4))
* **mcp:** rename dxt to mcpb ([049ca92](https://github.com/nuntly/nuntly-sdk-typescript/commit/049ca92b4b24d54107c69f23eb429edc42e9c186))
* remove custom code ([62f271d](https://github.com/nuntly/nuntly-sdk-typescript/commit/62f271d2a1177c0deabde0517819139901970516))

## 0.7.1 (2025-09-12)

Full Changelog: [v0.7.0...v0.7.1](https://github.com/nuntly/nuntly-sdk-typescript/compare/v0.7.0...v0.7.1)

### Bug Fixes

* **mcp:** fix uploading dxt release assets ([c1a0b26](https://github.com/nuntly/nuntly-sdk-typescript/commit/c1a0b269596af7507a6f920246bbee6e11e5e135))

## 0.7.0 (2025-09-10)

Full Changelog: [v0.6.0...v0.7.0](https://github.com/nuntly/nuntly-sdk-typescript/compare/v0.6.0...v0.7.0)

### Features

* **api:** Move EmailHeaders in shared ([d3e7cba](https://github.com/nuntly/nuntly-sdk-typescript/commit/d3e7cba19a7a91d2faeb9c46171d7aa2f07b5ed9))
* **mcp:** allow setting logging level ([9409483](https://github.com/nuntly/nuntly-sdk-typescript/commit/940948306e3679dd5a1e132c83fd2138f93930ab))
* **mcp:** expose client options in `streamableHTTPApp` ([b10eb73](https://github.com/nuntly/nuntly-sdk-typescript/commit/b10eb731c1ecb601a47f31a6a8e6f28666c9d77a))


### Bug Fixes

* coerce nullable values to undefined ([17eca48](https://github.com/nuntly/nuntly-sdk-typescript/commit/17eca4862740cc5b1f1b9b372e84abd892933524))
* **mcp:** fix query options parsing ([b2601d9](https://github.com/nuntly/nuntly-sdk-typescript/commit/b2601d919a0f17c7746e5b388bb26267898c9c35))


### Chores

* ci build action ([4de51d5](https://github.com/nuntly/nuntly-sdk-typescript/commit/4de51d5be3de0fcc1857d57b73c2151d905ed13d))
* **internal:** codegen related update ([87aa400](https://github.com/nuntly/nuntly-sdk-typescript/commit/87aa4001a0fb88df1659aec9ca898f4ad2476123))
* **internal:** codegen related update ([6f8a2dc](https://github.com/nuntly/nuntly-sdk-typescript/commit/6f8a2dc6203ebe04e102f1d5a46e5d0dc63fb6ae))
* **mcp:** upload dxt as release asset ([61c41e3](https://github.com/nuntly/nuntly-sdk-typescript/commit/61c41e3b3d12c8ce1cfa808ce4115b1b5ed3f9f6))

## 0.6.0 (2025-09-02)

Full Changelog: [v0.5.0...v0.6.0](https://github.com/nuntly/nuntly-sdk-typescript/compare/v0.5.0...v0.6.0)

### Features

* **api:** manual updates ([7a47a7b](https://github.com/nuntly/nuntly-sdk-typescript/commit/7a47a7b14c63993c9a91ba8606364f84208bae8f))

## 0.5.0 (2025-08-29)

Full Changelog: [v0.4.0...v0.5.0](https://github.com/nuntly/nuntly-sdk-typescript/compare/v0.4.0...v0.5.0)

### Features

* **examples:** add comprehensive TypeScript SDK examples ([a962c49](https://github.com/nuntly/nuntly-sdk-typescript/commit/a962c495ccff388b4c648c2bd8add038ea2a100d))
* **examples:** add comprehensive TypeScript SDK examples ([211871c](https://github.com/nuntly/nuntly-sdk-typescript/commit/211871ce6e6e8f3a26c12cae42c3fcfaf1816c0e))

## 0.4.0 (2025-08-29)

Full Changelog: [v0.3.0...v0.4.0](https://github.com/nuntly/nuntly-sdk-typescript/compare/v0.3.0...v0.4.0)

### Features

* **mcp:** add option to infer mcp client ([ab57ffc](https://github.com/nuntly/nuntly-sdk-typescript/commit/ab57ffc553b2e67f51856834f35667e075674d03))


### Chores

* add package to package.json ([fc723b2](https://github.com/nuntly/nuntly-sdk-typescript/commit/fc723b23113c4a77545febd6d22367e9cf37b01d))
* **client:** qualify global Blob ([38a5882](https://github.com/nuntly/nuntly-sdk-typescript/commit/38a588291258d8d9e9f89439a3ea18cefd9ca3ef))
* **internal:** codegen related update ([7ae3ef1](https://github.com/nuntly/nuntly-sdk-typescript/commit/7ae3ef173a2f5a522cfb9e87af7e00025740fc4f))
* **internal:** codegen related update ([7987357](https://github.com/nuntly/nuntly-sdk-typescript/commit/7987357fabb9c7e726e8ab1e10d28623829c95c2))
* **internal:** update global Error reference ([df23219](https://github.com/nuntly/nuntly-sdk-typescript/commit/df2321970994cf42e70acce41a5b703a7b82100f))
* **mcp:** update package.json ([4cfb884](https://github.com/nuntly/nuntly-sdk-typescript/commit/4cfb8847f7848a0d27afdb0ea7744e78e850a2b5))
* **mcp:** update types ([610ce1b](https://github.com/nuntly/nuntly-sdk-typescript/commit/610ce1bb591400633ed7f01fd3e89d73a41196b6))
* update CI script ([5bbc5f5](https://github.com/nuntly/nuntly-sdk-typescript/commit/5bbc5f560682fd4647cd5485c2f4839f0d405c01))

## 0.3.0 (2025-08-20)

Full Changelog: [v0.2.3...v0.3.0](https://github.com/nuntly/nuntly-sdk-typescript/compare/v0.2.3...v0.3.0)

### Features

* **mcp:** add code execution tool ([38e90b2](https://github.com/nuntly/nuntly-sdk-typescript/commit/38e90b2a53c0d1423ee16f265a8e7f6ed39401b5))


### Chores

* **internal:** make mcp-server publishing public by defaut ([8d63b09](https://github.com/nuntly/nuntly-sdk-typescript/commit/8d63b091494223721998099124d012fc20b3d1d5))
* **mcp:** add cors to oauth metadata route ([d7d9d54](https://github.com/nuntly/nuntly-sdk-typescript/commit/d7d9d541da46bf86781ed4d804c0f33df1e28e4a))

## 0.2.3 (2025-08-19)

Full Changelog: [v0.2.2...v0.2.3](https://github.com/nuntly/nuntly-sdk-typescript/compare/v0.2.2...v0.2.3)

### Chores

* configure new SDK language ([264c227](https://github.com/nuntly/nuntly-sdk-typescript/commit/264c227d43f582e02c3c7b52290154ff893fbe18))

## 0.2.2 (2025-08-16)

Full Changelog: [v0.2.1...v0.2.2](https://github.com/nuntly/nuntly-sdk-typescript/compare/v0.2.1...v0.2.2)

### Chores

* **deps:** update dependency @types/node to v20.17.58 ([567d3f1](https://github.com/nuntly/nuntly-sdk-typescript/commit/567d3f10b7a786624a28a7038a094b0aea83edf0))
* **internal:** formatting change ([7ba9bc7](https://github.com/nuntly/nuntly-sdk-typescript/commit/7ba9bc7aec3aeb4fac17868e32d523d95cf116dc))

## 0.2.1 (2025-08-09)

Full Changelog: [v0.2.0...v0.2.1](https://github.com/nuntly/nuntly-sdk-typescript/compare/v0.2.0...v0.2.1)

### Chores

* **internal:** move publish config ([05ab4d2](https://github.com/nuntly/nuntly-sdk-typescript/commit/05ab4d216f451bcc375cc5335866c42c894b8b21))
* **internal:** remove redundant imports config ([8e953bf](https://github.com/nuntly/nuntly-sdk-typescript/commit/8e953bf0745b6360579d9f89447dcf297099b3bd))
* **internal:** update comment in script ([40dcb42](https://github.com/nuntly/nuntly-sdk-typescript/commit/40dcb42fd30f1aa634a534a17ebdf7fd530e5b78))
* update @stainless-api/prism-cli to v5.15.0 ([b882fd6](https://github.com/nuntly/nuntly-sdk-typescript/commit/b882fd62eed107ee58ecee03ede61fa45e4113c7))

## 0.2.0 (2025-07-23)

Full Changelog: [v0.1.1...v0.2.0](https://github.com/nuntly/nuntly-sdk-typescript/compare/v0.1.1...v0.2.0)

### Features

* **api:** api update ([f6a2e4c](https://github.com/nuntly/nuntly-sdk-typescript/commit/f6a2e4cb1494d3d371aee79c493cf677841e03e5))
* **api:** api update ([05a6de5](https://github.com/nuntly/nuntly-sdk-typescript/commit/05a6de52f01bb2a024726d9de6f6e0e890827ae2))
* **api:** api update ([53d5ebb](https://github.com/nuntly/nuntly-sdk-typescript/commit/53d5ebbf66639ba151f232bbb817f2d1a7ceb466))
* **api:** api update ([e55aedc](https://github.com/nuntly/nuntly-sdk-typescript/commit/e55aedcc2f03995f24bc9b8f4f6ac89014d24d82))


### Chores

* sync repo ([52a229a](https://github.com/nuntly/nuntly-sdk-typescript/commit/52a229a3899fe47a5b3b6cd13dfb3e8cf1bcaff2))


### Documentation

* **changelog:** update and rewrite changelog content ([392b3da](https://github.com/nuntly/nuntly-sdk-typescript/commit/392b3daf2bb747eebfa2040f048fa61836317c29))

## 0.1.1 (2025-07-15)

Full Changelog: [v0.1.0...v0.1.1](https://github.com/nuntly/nuntly-sdk-typescript/compare/v0.1.0...v0.1.1)

### Bug Fixes

* **api:** fix(sdk): update base URL ([0d19008](https://github.com/nuntly/nuntly-sdk-typescript/commit/0d190085f8d06bc9affc901257b6379412630bf2))

## 0.1.0 (2025-07-15)

Initial release of our TypeScript SDK
Core features implemented and ready for use
