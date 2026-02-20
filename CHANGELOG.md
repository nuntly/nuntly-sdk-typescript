# Changelog

## 0.14.0 (2026-02-20)

Full Changelog: [v0.13.0...v0.14.0](https://github.com/nuntly/nuntly-sdk-typescript/compare/v0.13.0...v0.14.0)

### Features

* **api:** api update ([1148538](https://github.com/nuntly/nuntly-sdk-typescript/commit/11485386f9a815502e9f21b355f3ffaabaefdcf7))
* **api:** api update ([933b702](https://github.com/nuntly/nuntly-sdk-typescript/commit/933b7025680ef8f9a872492abe160fc3202e9932))
* **api:** api update ([a197b24](https://github.com/nuntly/nuntly-sdk-typescript/commit/a197b24a64858e7c1b1fa7f9858064bc3988ffda))
* **api:** api update ([450b1a9](https://github.com/nuntly/nuntly-sdk-typescript/commit/450b1a92b098fc89cbfd406f24584f0351880742))
* **api:** manual updates ([51d9cfc](https://github.com/nuntly/nuntly-sdk-typescript/commit/51d9cfc5701ebeae6847ab01a0a3464c3c02d495))
* **api:** manual updates ([7dcc626](https://github.com/nuntly/nuntly-sdk-typescript/commit/7dcc626062cf228a0d74b5f0fa1f7f6fa384677c))
* **api:** manual updates ([0236a10](https://github.com/nuntly/nuntly-sdk-typescript/commit/0236a10b9a509862413655a8ff8457894d505bad))
* **api:** Move EmailHeaders in shared ([93b2287](https://github.com/nuntly/nuntly-sdk-typescript/commit/93b2287fc3667477c5237fb3a03159b91e228c87))
* **api:** prepare the next version of the API ([9b9a874](https://github.com/nuntly/nuntly-sdk-typescript/commit/9b9a8747e95e773a23880d35101e20818d5200bf))
* **api:** rename retry to replay ([bf601fa](https://github.com/nuntly/nuntly-sdk-typescript/commit/bf601fad390316fb1d4002cc54688c178cc9790b))
* **api:** rotate webhook signing secret ([bee02b5](https://github.com/nuntly/nuntly-sdk-typescript/commit/bee02b5c7d355de74fed7f940a35a72996a492ab))
* **api:** webhook events, retry and deliveries ([a5b53f8](https://github.com/nuntly/nuntly-sdk-typescript/commit/a5b53f8b1b80dce25a49d9f9a306ad1f33ea1f0a))
* **custom:** custom back ([0806495](https://github.com/nuntly/nuntly-sdk-typescript/commit/0806495438abe144940af3019453852afe38e4a7))
* **doc:** add more examples ([99655e2](https://github.com/nuntly/nuntly-sdk-typescript/commit/99655e2c493f10521d97b8eee43c380adc81b78f))
* **examples:** add comprehensive TypeScript SDK examples ([760a3de](https://github.com/nuntly/nuntly-sdk-typescript/commit/760a3dec0f5d79f136cc078e5117d844513288d0))
* **examples:** add comprehensive TypeScript SDK examples ([2547079](https://github.com/nuntly/nuntly-sdk-typescript/commit/25470794d2759eeeee87be08cde1e6e8b59fe8bc))
* **mcp:** add code execution tool ([82fbaf5](https://github.com/nuntly/nuntly-sdk-typescript/commit/82fbaf59c0cbfc0a6ffca7b2fcfa30b8a66ee35d))
* **mcp:** add docs search tool ([9d77bff](https://github.com/nuntly/nuntly-sdk-typescript/commit/9d77bff356442f118f99c485aa29affde925fddc))
* **mcp:** add initial server instructions ([5f7a070](https://github.com/nuntly/nuntly-sdk-typescript/commit/5f7a070a156e3958f499d47c412e3793808fcbf0))
* **mcp:** add option for including docs tools ([2e2fe37](https://github.com/nuntly/nuntly-sdk-typescript/commit/2e2fe3770be186dff1c6a5fdb18cca91f72f650e))
* **mcp:** add option to infer mcp client ([d1189b2](https://github.com/nuntly/nuntly-sdk-typescript/commit/d1189b289061f03a80f2b0fa4fc2347ef615cbf8))
* **mcp:** allow setting logging level ([7dc040e](https://github.com/nuntly/nuntly-sdk-typescript/commit/7dc040e14098bd2ac1dce85fe20ae0029c32bee2))
* **mcp:** enable experimental docs search tool ([4033d93](https://github.com/nuntly/nuntly-sdk-typescript/commit/4033d93db35e21eaf35c8ed39519d4d808429a48))
* **mcp:** enable optional code execution tool on http mcp servers ([8b007f7](https://github.com/nuntly/nuntly-sdk-typescript/commit/8b007f7592adc4d1bf921366fbb2fabb62f0c354))
* **mcp:** expose client options in `streamableHTTPApp` ([025d2bb](https://github.com/nuntly/nuntly-sdk-typescript/commit/025d2bb78035c8833b9daa2a6137958d96128790))
* **safe:** safely use async/await without all the try catch blocks ([a5a8466](https://github.com/nuntly/nuntly-sdk-typescript/commit/a5a84660841d26d25033eceb007f225467f1f0a9))
* **safe:** safely use async/await without all the try catch blocks ([99655e2](https://github.com/nuntly/nuntly-sdk-typescript/commit/99655e2c493f10521d97b8eee43c380adc81b78f))


### Bug Fixes

* **ci:** set permissions for DXT publish action ([02d96fa](https://github.com/nuntly/nuntly-sdk-typescript/commit/02d96fa2a9bd27b06c5a375aafbffd17d9409f25))
* **client:** avoid memory leak with abort signals ([54c8fb2](https://github.com/nuntly/nuntly-sdk-typescript/commit/54c8fb22c5c18c49aa1944373221e43b8db2f601))
* **client:** avoid removing abort listener too early ([45acb36](https://github.com/nuntly/nuntly-sdk-typescript/commit/45acb36ae29b4524e81cec795e14aefad47776ff))
* coerce nullable values to undefined ([4a35944](https://github.com/nuntly/nuntly-sdk-typescript/commit/4a35944b851e346d357589aa1f48723e39be4281))
* **mcpb:** pin @anthropic-ai/mcpb version ([84aac3e](https://github.com/nuntly/nuntly-sdk-typescript/commit/84aac3e99b3c68a1c2ce0336824b19d3b89673b0))
* **mcp:** fix cli argument parsing logic ([cf81878](https://github.com/nuntly/nuntly-sdk-typescript/commit/cf818782d3832734a91c5c6bf9bf2204eec7f82e))
* **mcp:** fix query options parsing ([7123fe2](https://github.com/nuntly/nuntly-sdk-typescript/commit/7123fe21dabcca582bc7422c86e12c218fe87343))
* **mcp:** fix some response schemas used for jq filtering ([31aca06](https://github.com/nuntly/nuntly-sdk-typescript/commit/31aca061bd9e785ac780c09e138bc335c0143f46))
* **mcp:** fix uploading dxt release assets ([fb53b74](https://github.com/nuntly/nuntly-sdk-typescript/commit/fb53b74f3473abc2a74ac47a4c02ac9cf770220c))
* **mcp:** initialize SDK lazily to avoid failing the connection on init errors ([048dbd8](https://github.com/nuntly/nuntly-sdk-typescript/commit/048dbd8dfa437e756039457f7554a26ac447ab13))
* **mcp:** resolve a linting issue in server code ([ce2eeb4](https://github.com/nuntly/nuntly-sdk-typescript/commit/ce2eeb4db42871fbb67838aff469609c2e7639c0))
* **mcp:** return tool execution error on jq failure ([a10cd3b](https://github.com/nuntly/nuntly-sdk-typescript/commit/a10cd3b10229b141c3487f05720ae18d3e718feb))
* **release:** add OIDC configuration ([457022d](https://github.com/nuntly/nuntly-sdk-typescript/commit/457022deeceb2245bd705b0b9781fe8b3b0588ee))


### Performance Improvements

* faster formatting ([1748e8e](https://github.com/nuntly/nuntly-sdk-typescript/commit/1748e8e059b15e58f3064ae6efbc173ec7b902bb))


### Chores

* add package to package.json ([b362309](https://github.com/nuntly/nuntly-sdk-typescript/commit/b362309ef664ea5d5b89819cd5780f4fdba3e7f7))
* ci build action ([b7aebad](https://github.com/nuntly/nuntly-sdk-typescript/commit/b7aebadf2f46edcdc90de1a17a96dac2dfd8845e))
* **client:** do not parse responses with empty content-length ([6a46972](https://github.com/nuntly/nuntly-sdk-typescript/commit/6a46972ceae4f352bb524773bb8bdd3a2de74925))
* **client:** qualify global Blob ([3994a60](https://github.com/nuntly/nuntly-sdk-typescript/commit/3994a60e357265d7845e1aa8b2cea79964f2cc9c))
* **client:** restructure abort controller binding ([de36f37](https://github.com/nuntly/nuntly-sdk-typescript/commit/de36f37fe1a32636d7320f9246026b82dfd56c8e))
* **codegen:** internal codegen update ([51466c2](https://github.com/nuntly/nuntly-sdk-typescript/commit/51466c2ec1266aeadb73da4fd3778ac360641c81))
* configure new SDK language ([b99d2f3](https://github.com/nuntly/nuntly-sdk-typescript/commit/b99d2f37bc0154c25241c87acc2419c17cbcbcb3))
* **deps:** update dependency @types/node to v20.17.58 ([ef30819](https://github.com/nuntly/nuntly-sdk-typescript/commit/ef3081905cc0cb4632a24ce4771d1b1344b71866))
* do not install brew dependencies in ./scripts/bootstrap by default ([053aee3](https://github.com/nuntly/nuntly-sdk-typescript/commit/053aee36d76d735bbc496d86227745989f387e09))
* extract some types in mcp docs ([721c4c9](https://github.com/nuntly/nuntly-sdk-typescript/commit/721c4c998028b4f3310e5f219a8c392833bf1867))
* **internal/client:** fix form-urlencoded requests ([7aefd7c](https://github.com/nuntly/nuntly-sdk-typescript/commit/7aefd7cf7349f47ded2c520c2f327ccda7270ffd))
* **internal:** add health check to MCP server when running in HTTP mode ([b406537](https://github.com/nuntly/nuntly-sdk-typescript/commit/b4065377e46d87b78be8f3e11a0bd26a13a3a2b5))
* **internal:** allow basic filtering of methods allowed for MCP code mode ([02fb27f](https://github.com/nuntly/nuntly-sdk-typescript/commit/02fb27fb8ae85a78d6149d4441c38d13bfaa3e9a))
* **internal:** allow setting x-stainless-api-key header on mcp server requests ([c04f4e4](https://github.com/nuntly/nuntly-sdk-typescript/commit/c04f4e44e0ae5f354aa021265a4b010163517a82))
* **internal:** always generate MCP server dockerfiles and upgrade associated dependencies ([04f1ec8](https://github.com/nuntly/nuntly-sdk-typescript/commit/04f1ec85e76e6b1d574fb80e4a02092bc4349a1e))
* **internal:** avoid type checking errors with ts-reset ([3da631a](https://github.com/nuntly/nuntly-sdk-typescript/commit/3da631adb848ce6cc9ed89f5eeef582909e5d440))
* **internal:** cache fetch instruction calls in MCP server ([00a3897](https://github.com/nuntly/nuntly-sdk-typescript/commit/00a3897955a5c2231ae22cad7b7a004668ea4aa9))
* **internal:** codegen related update ([9c54148](https://github.com/nuntly/nuntly-sdk-typescript/commit/9c54148b9e18c249773cd0c6f762710564ca05b7))
* **internal:** codegen related update ([df9db30](https://github.com/nuntly/nuntly-sdk-typescript/commit/df9db30f42915cde16cb8de872d765a1d917b826))
* **internal:** codegen related update ([a045f64](https://github.com/nuntly/nuntly-sdk-typescript/commit/a045f64cdc4223701db2463d6d875070f846be3b))
* **internal:** codegen related update ([333ecd2](https://github.com/nuntly/nuntly-sdk-typescript/commit/333ecd2b389d6a6770488b7c65d258082cffd243))
* **internal:** codegen related update ([f9f72cf](https://github.com/nuntly/nuntly-sdk-typescript/commit/f9f72cf40e5151dfe5d079c0eb94add53d5a0a65))
* **internal:** codegen related update ([c6a2ce6](https://github.com/nuntly/nuntly-sdk-typescript/commit/c6a2ce654c25949fc29428d1e29a2612358fca07))
* **internal:** codegen related update ([7f11020](https://github.com/nuntly/nuntly-sdk-typescript/commit/7f11020762f0082520d71cef9d6ecbe0835ad096))
* **internal:** codegen related update ([7517afc](https://github.com/nuntly/nuntly-sdk-typescript/commit/7517afc36030351537a70dc869679ea3b10fda97))
* **internal:** fix incremental formatting in some cases ([c1bd49c](https://github.com/nuntly/nuntly-sdk-typescript/commit/c1bd49c80ba7994d14626d1c27e5e03ddeb99786))
* **internal:** fix pagination internals not accepting option promises ([9f4c2ca](https://github.com/nuntly/nuntly-sdk-typescript/commit/9f4c2cadf2eae90511174c98668631cb5d8e1e18))
* **internal:** formatting change ([ed5fdda](https://github.com/nuntly/nuntly-sdk-typescript/commit/ed5fddaf1f90e0fa7c94dd1c490f15ea1990de8b))
* **internal:** gitignore .mcpb files ([0908f00](https://github.com/nuntly/nuntly-sdk-typescript/commit/0908f00de887a2c992ce3e7a667fb399b4d4fa2b))
* **internal:** grammar fix (it's -&gt; its) ([fd124a0](https://github.com/nuntly/nuntly-sdk-typescript/commit/fd124a0355eae8982a6bf2fe4737fdcaff427eda))
* **internal:** ignore .eslintcache ([1ffd309](https://github.com/nuntly/nuntly-sdk-typescript/commit/1ffd30996203f33d57643f4a07d4da5d17eba812))
* **internal:** improve layout of generated MCP server files ([733589b](https://github.com/nuntly/nuntly-sdk-typescript/commit/733589bc0ffcc48162e931db7ebc1cda8d7fc4c8))
* **internal:** make mcp-server publishing public by defaut ([8eea879](https://github.com/nuntly/nuntly-sdk-typescript/commit/8eea87975a3a653ddc394f08f04a46bdea6a1737))
* **internal:** move publish config ([d7ec94d](https://github.com/nuntly/nuntly-sdk-typescript/commit/d7ec94d8d59bcf88f08b33ffbe7b10941699e2e2))
* **internal:** refactor flag parsing for MCP servers and add debug flag ([b1c3b6d](https://github.com/nuntly/nuntly-sdk-typescript/commit/b1c3b6d8a6eb5d218a4004c5c8553e661cfae73b))
* **internal:** remove .eslintcache ([b9b2d25](https://github.com/nuntly/nuntly-sdk-typescript/commit/b9b2d254df198bf91f94d49582aa948b45dbd0c1))
* **internal:** remove deprecated `compilerOptions.baseUrl` from tsconfig.json ([ac0ad25](https://github.com/nuntly/nuntly-sdk-typescript/commit/ac0ad2547673d70b0eeb8244adf657036f1e2f0f))
* **internal:** remove redundant imports config ([7c88da3](https://github.com/nuntly/nuntly-sdk-typescript/commit/7c88da3da72e46362083f4ef17468117b9a13090))
* **internal:** support oauth authorization code flow for MCP servers ([160b337](https://github.com/nuntly/nuntly-sdk-typescript/commit/160b337b3a3418ec79d5e5818e41c8c1d366e20d))
* **internal:** update comment in script ([8ad9cc7](https://github.com/nuntly/nuntly-sdk-typescript/commit/8ad9cc7d7b60b20ff5023a2ab96322d2f02e76f6))
* **internal:** update global Error reference ([f56ffd7](https://github.com/nuntly/nuntly-sdk-typescript/commit/f56ffd763edcffee206ff40a5ba5615cebf237f6))
* **internal:** upgrade wrangler version ([2138512](https://github.com/nuntly/nuntly-sdk-typescript/commit/2138512f0fed6d6d29881e406218c366ba706cf3))
* **internal:** use npm pack for build uploads ([776c0da](https://github.com/nuntly/nuntly-sdk-typescript/commit/776c0da3f09c0f3eef1ef4f77e65fb26a7153c67))
* **jsdoc:** fix [@link](https://github.com/link) annotations to refer only to parts of the package‘s public interface ([4d805d5](https://github.com/nuntly/nuntly-sdk-typescript/commit/4d805d53025a43cb2195ebeb09dfdd53068d15a1))
* mcp code tool explicit error message when missing a run function ([27d8bed](https://github.com/nuntly/nuntly-sdk-typescript/commit/27d8bed81af4825334a5e8428d30c4c3582c7a46))
* **mcp:** add cors to oauth metadata route ([c404961](https://github.com/nuntly/nuntly-sdk-typescript/commit/c404961f7b46384ceb670fc15c6174a78e423476))
* **mcp:** add friendlier MCP code tool errors on incorrect method invocations ([d310a40](https://github.com/nuntly/nuntly-sdk-typescript/commit/d310a40d85cdef457d6a4f7c66b2549b276a5e64))
* **mcp:** add line numbers to code tool errors ([a8ab0cd](https://github.com/nuntly/nuntly-sdk-typescript/commit/a8ab0cde0f28342d96dd13fac7f860ac7fd08d21))
* **mcp:** allow pointing `docs_search` tool at other URLs ([5b1eb9f](https://github.com/nuntly/nuntly-sdk-typescript/commit/5b1eb9f69039281580cd76543f4e8a4f4f0dc817))
* **mcp:** clarify http auth error ([b985158](https://github.com/nuntly/nuntly-sdk-typescript/commit/b9851580e08ae9025eac41bf3d4dda7bd5171556))
* **mcp:** correctly update version in sync with sdk ([59967b3](https://github.com/nuntly/nuntly-sdk-typescript/commit/59967b39cdb8815e511294697e665123e9977bac))
* **mcp:** forward STAINLESS_API_KEY to docs search endpoint ([0aab06c](https://github.com/nuntly/nuntly-sdk-typescript/commit/0aab06c18a5189a7364402e19047755850357243))
* **mcp:** rename dxt to mcpb ([5532506](https://github.com/nuntly/nuntly-sdk-typescript/commit/5532506a9bac10532b6c7dc7c3c0389be70dccc0))
* **mcp:** update package.json ([36fe794](https://github.com/nuntly/nuntly-sdk-typescript/commit/36fe794da31cedee46c1ab6188ce2b22d0a5fc9f))
* **mcp:** update types ([9fd5305](https://github.com/nuntly/nuntly-sdk-typescript/commit/9fd530514b48d76987f4cfffac8113ad73eecfe7))
* **mcp:** upgrade jq-web ([0b2cf32](https://github.com/nuntly/nuntly-sdk-typescript/commit/0b2cf3297c838e1718253138e3d172f75c018aba))
* **mcp:** upload dxt as release asset ([fe862eb](https://github.com/nuntly/nuntly-sdk-typescript/commit/fe862eb1006833cdc4b38725c2c404a28b447663))
* remove custom code ([585a03f](https://github.com/nuntly/nuntly-sdk-typescript/commit/585a03f149299f8779f365bbf5f3d837a5fd67f3))
* remove custom code ([330686f](https://github.com/nuntly/nuntly-sdk-typescript/commit/330686fe65b12758e44abd25e0e031509626064f))
* sync repo ([39978df](https://github.com/nuntly/nuntly-sdk-typescript/commit/39978df59d20618561e552b30cc7354691056280))
* update @stainless-api/prism-cli to v5.15.0 ([7c1f8c4](https://github.com/nuntly/nuntly-sdk-typescript/commit/7c1f8c4a4f01efb8ba13113d0b8951e19775cb2f))
* update CI script ([2fc93c1](https://github.com/nuntly/nuntly-sdk-typescript/commit/2fc93c187b9bb5914d1f0c03d09678c80a8daa38))
* update docstrings ([8c30e09](https://github.com/nuntly/nuntly-sdk-typescript/commit/8c30e098a01dcb006c96b4ba97cefa9e53270fd6))
* update lockfile ([d270568](https://github.com/nuntly/nuntly-sdk-typescript/commit/d2705681737029852e9d26d4034a8a366388d8f3))
* update mock server docs ([2b3c776](https://github.com/nuntly/nuntly-sdk-typescript/commit/2b3c7764224985c7889d076991a76a118329c989))
* use structured error when code execution tool errors ([09bf0c1](https://github.com/nuntly/nuntly-sdk-typescript/commit/09bf0c1677af2cfd86768d2de44314c6a313ce9c))


### Documentation

* **changelog:** update and rewrite changelog content ([64d5ab5](https://github.com/nuntly/nuntly-sdk-typescript/commit/64d5ab5f1f8d593c44d13e626f23146e5e7c3ef0))
* **mcp:** add a README button for one-click add to Cursor ([63c920e](https://github.com/nuntly/nuntly-sdk-typescript/commit/63c920e0ff1e8fbb5b26359b781bf61af1affdc0))
* **mcp:** add a README link to add server to VS Code or Claude Code ([4f05153](https://github.com/nuntly/nuntly-sdk-typescript/commit/4f05153d496822684ea8766c3c67cfd4fcd7cf7d))

## 0.13.0 (2026-01-30)

Full Changelog: [v0.12.0...v0.13.0](https://github.com/nuntly/nuntly-sdk-typescript/compare/v0.12.0...v0.13.0)

### Features

* **api:** manual updates ([0699187](https://github.com/nuntly/nuntly-sdk-typescript/commit/06991879d54b7c974be7a78c9d9205c4caba79f3))

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
