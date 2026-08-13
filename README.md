# blockchainlatam.org

Blockchain LATAM is a pnpm + Turbo monorepo for the blockchainlatam.org editorial landing page.

## Workspaces

- `apps/web-app` — responsive React/Vite landing page based on the archived UI v1 design.
- `packages/infra` — project-owned wrapper around `@lsts_tech/infra` for SST deployments.

## Local development

```bash
pnpm install
pnpm dev
```

The repo defaults to Node `22.22.2` via `.nvmrc`, `.node-version`, and the root `engines` field.

## 📋 Latest Changes (v0.1.1)

### Bug Fixes

* ignore generated index churn in release check ([c1e4243](https://github.com/blockchainLATAM/blockchainlatam.org/commit/c1e42434bc01767f4f10b3a40940ec76e392da4f))


### Features

* document release workflow ([a8aa8ed](https://github.com/blockchainLATAM/blockchainlatam.org/commit/a8aa8ed4f9c98abab17ceb4297b91665396d532b))





# Changelog

All notable changes to blockchainlatam.org are documented here.

For full version history, see [CHANGELOG.md](./CHANGELOG.md) and [GitHub releases](https://github.com/blockchainLATAM/blockchainlatam.org)

## Useful commands

```bash
pnpm build
pnpm lint
pnpm typecheck
pnpm version:sync
pnpm infra:build
```

## Release workflow

The release source of truth is `version.production.json`, maintained by `@edcalderon/versioning`. The footer and all workspace package versions read from or synchronize to that value.

```bash
pnpm release:patch
pnpm release:push
```

The patch workflow validates secrets, package synchronization, README tracking, changelog entries, lint, typecheck, and build before committing and tagging the release.
