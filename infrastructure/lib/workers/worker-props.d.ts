import { Queue } from "@aws-cdk/aws-sqs";
import { ILayerVersion } from "@aws-cdk/aws-lambda";
import { Cluster } from "@aws-cdk/aws-eks";
import { Duration } from "@aws-cdk/core";
import { Table } from "@aws-cdk/aws-dynamodb";
export interface WorkerProps {
    queue: Queue;
    kubectlLayer: ILayerVersion;
    cluster: Cluster;
    graphTable: Table;
    handler: string;
    timeout: Duration;
    batchSize: number;
}
