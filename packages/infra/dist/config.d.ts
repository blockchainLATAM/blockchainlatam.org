export declare const blockchainLatamInfra: {
    readonly service: "blockchainlatam.org";
    readonly appPath: "apps/web-app";
    readonly domain: "blockchainlatam.org";
    readonly aliases: readonly ["www.blockchainlatam.org"];
    readonly stageDefaults: {
        readonly dev: {
            readonly domain: "dev.blockchainlatam.org";
        };
        readonly production: {
            readonly domain: "blockchainlatam.org";
        };
    };
};
export type BlockchainLatamStage = keyof typeof blockchainLatamInfra.stageDefaults;
export declare function getStageConfig(stage?: BlockchainLatamStage): {
    stage: "dev" | "production";
    domain: "blockchainlatam.org" | "dev.blockchainlatam.org";
    service: "blockchainlatam.org";
    appPath: "apps/web-app";
    aliases: readonly ["www.blockchainlatam.org"];
    stageDefaults: {
        readonly dev: {
            readonly domain: "dev.blockchainlatam.org";
        };
        readonly production: {
            readonly domain: "blockchainlatam.org";
        };
    };
};
