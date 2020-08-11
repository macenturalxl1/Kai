import { Construct } from "@aws-cdk/core";
import { WorkerProps } from "./worker-props";
export declare class Worker extends Construct {
    constructor(scope: Construct, id: string, props: WorkerProps);
    private createConstructs;
}
