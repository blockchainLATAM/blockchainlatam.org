import { execFileSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'

const run = (command, args) => {
  console.log(`\n$ ${command} ${args.join(' ')}`)
  execFileSync(command, args, { stdio: 'inherit' })
}

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'))
const action = process.argv[2] ?? 'patch'

if (action === 'push') {
  run('git', ['push', '--follow-tags', '-u', 'origin', 'HEAD'])
  process.exit(0)
}

if (action !== 'patch') {
  throw new Error(`Unknown release action: ${action}. Use patch or push.`)
}

const status = execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' })
const unexpectedChanges = status
  .split('\n')
  .filter(Boolean)
  .filter((line) => !line.slice(3).startsWith('.codebase-memory/'))
if (unexpectedChanges.length > 0) {
  throw new Error('Release requires a clean working tree. Commit the release changes before running pnpm release:patch.')
}

run('pnpm', ['exec', 'versioning', 'validate'])
run('pnpm', ['exec', 'node', 'scripts/check-release-metadata.mjs'])
run('pnpm', ['exec', 'versioning', 'patch', '--branch-aware', '--no-commit', '--no-tag'])
run('pnpm', ['exec', 'versioning', 'update-readme'])
run('pnpm', ['exec', 'node', 'scripts/check-release-metadata.mjs'])
run('pnpm', ['exec', 'versioning', 'validate'])
run('pnpm', ['exec', 'versioning', 'check-changelog', '--version', (await readJson('version.production.json')).version])
run('pnpm', ['lint'])
run('pnpm', ['typecheck'])
run('pnpm', ['build'])

const version = (await readJson('version.production.json')).version
run('git', ['add', '-A'])
run('git', ['commit', '-m', `chore: release v${version}`])
run('git', ['tag', '-a', `v${version}`, '-m', `Release v${version}`])
console.log(`\n✅ Prepared release v${version}. Run pnpm release:push after confirming the GitHub identity.`)
