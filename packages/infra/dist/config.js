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
};
export function getStageConfig(stage = 'dev') {
    return {
        ...blockchainLatamInfra,
        stage,
        domain: blockchainLatamInfra.stageDefaults[stage].domain,
    };
}
