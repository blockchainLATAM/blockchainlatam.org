import { readFile } from 'node:fs/promises'

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'))
const source = await readJson('version.production.json')
const root = await readJson('package.json')
const app = await readJson('apps/web-app/package.json')
const infra = await readJson('packages/infra/package.json')
const changelog = await readFile('CHANGELOG.md', 'utf8')
const readme = await readFile('README.md', 'utf8')
const appSource = await readFile('apps/web-app/src/App.tsx', 'utf8')

if (!source.version || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(source.version)) {
  throw new Error('version.production.json must contain a valid semver version')
}

for (const [label, pkg] of [['root', root], ['web-app', app], ['infra', infra]]) {
  if (pkg.version !== source.version) {
    throw new Error(`${label} package version ${pkg.version} does not match version.production.json ${source.version}`)
  }
}

if (!changelog.match(new RegExp(`^## \\[v?${source.version.replaceAll('.', '\\\.')}\\]`, 'm'))) {
  throw new Error(`CHANGELOG.md is missing a release entry for v${source.version}`)
}

if (!readme.includes('## 📋 Latest Changes') || !readme.includes('CHANGELOG.md')) {
  throw new Error('README.md must contain the versioning-managed Latest Changes section and changelog link')
}

if (!appSource.includes("version.production.json")) {
  throw new Error('The web footer must read its version from version.production.json')
}

console.log(`✅ Release metadata is consistent at v${source.version}`)
