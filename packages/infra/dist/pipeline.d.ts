import { type PipelineConfig } from '@lsts_tech/infra';
/** Create the CI/CD pipeline using the upstream LSTS SST construct. */
export declare function createBlockchainLatamPipeline(overrides?: Partial<PipelineConfig>): {
    pipeline: any;
    codebuildProject: any;
    connection: {
        arn: any;
    };
    artifactBucket: any;
    pipelineName: any;
    pipelineArn: any;
};
