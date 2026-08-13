# @blockchainlatam/infra

Project-owned wrapper around [`@lsts_tech/infra`](https://www.npmjs.com/package/@lsts_tech/infra).

The wrapper keeps deployment configuration and the app/domain contract inside this monorepo while re-exporting the upstream SST v3 constructs for future stack definitions. The intended production flow is:

```bash
pnpm infra:build
pnpm infra:deploy:dev
```

Stages and domains are centralized in `src/config.ts` so the deployment entrypoint can grow without coupling the app to SST internals.

The wrapper also exports `createBlockchainLatamPipeline()` with Node 22 and pnpm 9 defaults. Pass repository or stage overrides when the AWS connection is ready; no credentials are stored in this package.
