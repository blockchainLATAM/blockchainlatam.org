import { createPipeline, type PipelineConfig } from '@lsts_tech/infra'

const defaults: PipelineConfig = {
  name: 'blockchainlatam-web',
  repo: 'blockchainlatam/blockchainlatam.org',
  branch: 'main',
  stage: 'production',
  region: 'us-east-1',
  nodeVersion: '22',
  pnpmVersion: '9.15.5',
  infraPath: 'packages/infra',
  projectTag: 'blockchainlatam.org',
  permissionsMode: 'least-privilege',
}

/** Create the CI/CD pipeline using the upstream LSTS SST construct. */
export function createBlockchainLatamPipeline(overrides: Partial<PipelineConfig> = {}) {
  return createPipeline({ ...defaults, ...overrides })
}
