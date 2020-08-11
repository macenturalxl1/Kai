/*
 * Copyright 2020 Crown Copyright
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as cdk from '@aws-cdk/core';
import * as sam from "@aws-cdk/aws-sam";
import * as s3 from '@aws-cdk/aws-s3';
import * as iam from '@aws-cdk/aws-iam';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import { GraphPlatForm } from "./platform/graph-platform";
import { KaiRestApi } from "./rest-api/kai-rest-api";
import { LAMBDA_LAYER_ARN, LAMBDA_LAYER_VERSION, ADD_GRAPH_TIMEOUT, DELETE_GRAPH_TIMEOUT, DELETE_GRAPH_WORKER_BATCH_SIZE, ADD_GRAPH_WORKER_BATCH_SIZE } from "./constants";
import { LayerVersion } from "@aws-cdk/aws-lambda";
import { GraphDatabase } from "./database/graph-database";
import { Worker } from "./workers/worker";
import { KaiUserPool } from "./authentication/user-pool";
import { GraphDatabaseProps } from "./database/graph-database-props";

// The main stack for Kai
export class AppStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // S3 Hosting
        // const bucket = new s3.Bucket(this, 'MyKaiBucket', {
        //     bucketName: 'kai-ui',
        //     websiteIndexDocument: 'index.html', // 1
        //     blockPublicAccess: new s3.BlockPublicAccess({ restrictPublicBuckets: false }) // 2
        // });

        // const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, 'OAI');

        // const distribution = new cloudfront.CloudFrontWebDistribution(this, 'MyDistribution', {
        //     originConfigs: [
        //       {
        //         s3OriginSource: {
        //           s3BucketSource: bucket,
        //           originAccessIdentity: cloudFrontOAI,
        //         },
        //         behaviors: [{ isDefaultBehavior: true }]
        //       }
        //     ]
        //   })

        // bucket.grantRead(cloudFrontOAI.grantPrincipal);

        // const bucketPolicy = new iam.PolicyStatement({
        //     actions: ['s3:GetObject'],
        //     resources: [
        //       `${bucket.bucketArn}/*`
        //     ],
        //     principals: [new iam.Anyone()],
        // });
        // bucket.addToResourcePolicy(bucketPolicy); // 4

        // User Pool
        new KaiUserPool(this, "KaiUserPool");

        // Graph Platform
        const platform = new GraphPlatForm(this, "GraphPlatform");

        // Graph Table
        const graphDBProps: GraphDatabaseProps = this.node.tryGetContext("graphDatabaseProps");
        const database = new GraphDatabase(this, "GraphDatabase", graphDBProps);

        // REST API
        const kaiRest = new KaiRestApi(this, "KaiRestApi", {
            graphTable: database.table
        });

        // Kubectl Lambda layer
        const samApp = new sam.CfnApplication(this, "SamLayer", {
            location: {
                applicationId: LAMBDA_LAYER_ARN,
                semanticVersion: LAMBDA_LAYER_VERSION
            },
            parameters: {
                LayerName: `${this.node.uniqueId}-kubectl-layer`
            }
        });

        const layerVersionArn = samApp.getAtt("Outputs.LayerVersionArn").toString();
        const kubectlLambdaLayer = LayerVersion.fromLayerVersionArn(this, "KubectlLambdaLayer", layerVersionArn);

        // Workers
        new Worker(this, "AddGraphWorker", {
            cluster: platform.eksCluster,
            queue: kaiRest.addGraphQueue,
            kubectlLayer: kubectlLambdaLayer,
            graphTable: database.table,
            handler: "add_graph.handler",
            timeout: ADD_GRAPH_TIMEOUT,
            batchSize: ADD_GRAPH_WORKER_BATCH_SIZE
        });

        new Worker(this, "DeleteGraphWorker", {
            cluster: platform.eksCluster,
            queue: kaiRest.deleteGraphQueue,
            kubectlLayer: kubectlLambdaLayer,
            graphTable: database.table,
            handler: "delete_graph.handler",
            timeout: DELETE_GRAPH_TIMEOUT,
            batchSize: DELETE_GRAPH_WORKER_BATCH_SIZE
        });
    }
}