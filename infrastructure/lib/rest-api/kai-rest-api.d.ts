import * as cdk from "@aws-cdk/core";
import * as sqs from "@aws-cdk/aws-sqs";
import { KaiRestApiProps } from "./kai-rest-api-props";
export declare class KaiRestApi extends cdk.Construct {
    readonly id: string;
    private readonly _addGraphQueue;
    private readonly _deleteGraphQueue;
    constructor(scope: cdk.Construct, id: string, props: KaiRestApiProps);
    get addGraphQueue(): sqs.Queue;
    get deleteGraphQueue(): sqs.Queue;
}
