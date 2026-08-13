export const blockchainLatamInfra = {
  service: 'blockchainlatam.org',
  appPath: 'apps/web-app',
  domain: 'blockchainlatam.org',
  aliases: ['www.blockchainlatam.org'],
  stageDefaults: {
    dev: {
      domain: 'dev.blockchainlatam.org',
    },
    production: {
      domain: 'blockchainlatam.org',
    },
  },
} as const

export type BlockchainLatamStage = keyof typeof blockchainLatamInfra.stageDefaults

export function getStageConfig(stage: BlockchainLatamStage = 'dev') {
  return {
    ...blockchainLatamInfra,
    stage,
    domain: blockchainLatamInfra.stageDefaults[stage].domain,
  }
}
