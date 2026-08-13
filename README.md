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

## 📋 Latest Changes (v0.1.0)

### Added

- Initial Blockchain LATAM editorial landing page prototype.
- pnpm/Turbo monorepo with the web app and deployment wrapper.
- Release metadata and version synchronization workflow.

For full version history, see [CHANGELOG.md](./CHANGELOG.md) and [GitHub releases](https://github.com/blockchainLATAM/blockchainlatam.org)

## Useful commands

```bash
pnpm build
pnpm lint
pnpm typecheck
pnpm version:sync
pnpm infra:build
```
