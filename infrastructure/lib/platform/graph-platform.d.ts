import * as cdk from "@aws-cdk/core";
import * as eks from "@aws-cdk/aws-eks";
export declare class GraphPlatForm extends cdk.Construct {
    private static readonly DEFAULT_VPC;
    private readonly _eksCluster;
    constructor(scope: cdk.Construct, id: string);
    get eksCluster(): eks.Cluster;
}
