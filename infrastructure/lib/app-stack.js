"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppStack = void 0;
const cdk = require("@aws-cdk/core");
const sam = require("@aws-cdk/aws-sam");
const graph_platform_1 = require("./platform/graph-platform");
const kai_rest_api_1 = require("./rest-api/kai-rest-api");
const constants_1 = require("./constants");
const aws_lambda_1 = require("@aws-cdk/aws-lambda");
const graph_database_1 = require("./database/graph-database");
const worker_1 = require("./workers/worker");
const user_pool_1 = require("./authentication/user-pool");
// The main stack for Kai
class AppStack extends cdk.Stack {
    constructor(scope, id, props) {
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
        new user_pool_1.KaiUserPool(this, "KaiUserPool");
        // Graph Platform
        const platform = new graph_platform_1.GraphPlatForm(this, "GraphPlatform");
        // Graph Table
        const graphDBProps = this.node.tryGetContext("graphDatabaseProps");
        const database = new graph_database_1.GraphDatabase(this, "GraphDatabase", graphDBProps);
        // REST API
        const kaiRest = new kai_rest_api_1.KaiRestApi(this, "KaiRestApi", {
            graphTable: database.table
        });
        // Kubectl Lambda layer
        const samApp = new sam.CfnApplication(this, "SamLayer", {
            location: {
                applicationId: constants_1.LAMBDA_LAYER_ARN,
                semanticVersion: constants_1.LAMBDA_LAYER_VERSION
            },
            parameters: {
                LayerName: `${this.node.uniqueId}-kubectl-layer`
            }
        });
        const layerVersionArn = samApp.getAtt("Outputs.LayerVersionArn").toString();
        const kubectlLambdaLayer = aws_lambda_1.LayerVersion.fromLayerVersionArn(this, "KubectlLambdaLayer", layerVersionArn);
        // Workers
        new worker_1.Worker(this, "AddGraphWorker", {
            cluster: platform.eksCluster,
            queue: kaiRest.addGraphQueue,
            kubectlLayer: kubectlLambdaLayer,
            graphTable: database.table,
            handler: "add_graph.handler",
            timeout: constants_1.ADD_GRAPH_TIMEOUT,
            batchSize: constants_1.ADD_GRAPH_WORKER_BATCH_SIZE
        });
        new worker_1.Worker(this, "DeleteGraphWorker", {
            cluster: platform.eksCluster,
            queue: kaiRest.deleteGraphQueue,
            kubectlLayer: kubectlLambdaLayer,
            graphTable: database.table,
            handler: "delete_graph.handler",
            timeout: constants_1.DELETE_GRAPH_TIMEOUT,
            batchSize: constants_1.DELETE_GRAPH_WORKER_BATCH_SIZE
        });
    }
}
exports.AppStack = AppStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7R0FjRzs7O0FBRUgscUNBQXFDO0FBQ3JDLHdDQUF3QztBQUl4Qyw4REFBMEQ7QUFDMUQsMERBQXFEO0FBQ3JELDJDQUEySztBQUMzSyxvREFBbUQ7QUFDbkQsOERBQTBEO0FBQzFELDZDQUEwQztBQUMxQywwREFBeUQ7QUFHekQseUJBQXlCO0FBQ3pCLE1BQWEsUUFBUyxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ25DLFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDaEUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsYUFBYTtRQUNiLHNEQUFzRDtRQUN0RCw0QkFBNEI7UUFDNUIsK0NBQStDO1FBQy9DLHlGQUF5RjtRQUN6RixNQUFNO1FBRU4sMEVBQTBFO1FBRTFFLDBGQUEwRjtRQUMxRix1QkFBdUI7UUFDdkIsVUFBVTtRQUNWLDRCQUE0QjtRQUM1QixvQ0FBb0M7UUFDcEMsaURBQWlEO1FBQ2pELGFBQWE7UUFDYixtREFBbUQ7UUFDbkQsVUFBVTtRQUNWLFFBQVE7UUFDUixPQUFPO1FBRVAsa0RBQWtEO1FBRWxELGlEQUFpRDtRQUNqRCxpQ0FBaUM7UUFDakMsbUJBQW1CO1FBQ25CLGdDQUFnQztRQUNoQyxTQUFTO1FBQ1Qsc0NBQXNDO1FBQ3RDLE1BQU07UUFDTixpREFBaUQ7UUFFakQsWUFBWTtRQUNaLElBQUksdUJBQVcsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFckMsaUJBQWlCO1FBQ2pCLE1BQU0sUUFBUSxHQUFHLElBQUksOEJBQWEsQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFFMUQsY0FBYztRQUNkLE1BQU0sWUFBWSxHQUF1QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3ZGLE1BQU0sUUFBUSxHQUFHLElBQUksOEJBQWEsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRXhFLFdBQVc7UUFDWCxNQUFNLE9BQU8sR0FBRyxJQUFJLHlCQUFVLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUMvQyxVQUFVLEVBQUUsUUFBUSxDQUFDLEtBQUs7U0FDN0IsQ0FBQyxDQUFDO1FBRUgsdUJBQXVCO1FBQ3ZCLE1BQU0sTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ3BELFFBQVEsRUFBRTtnQkFDTixhQUFhLEVBQUUsNEJBQWdCO2dCQUMvQixlQUFlLEVBQUUsZ0NBQW9CO2FBQ3hDO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxnQkFBZ0I7YUFDbkQ7U0FDSixDQUFDLENBQUM7UUFFSCxNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUUsTUFBTSxrQkFBa0IsR0FBRyx5QkFBWSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUV6RyxVQUFVO1FBQ1YsSUFBSSxlQUFNLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQy9CLE9BQU8sRUFBRSxRQUFRLENBQUMsVUFBVTtZQUM1QixLQUFLLEVBQUUsT0FBTyxDQUFDLGFBQWE7WUFDNUIsWUFBWSxFQUFFLGtCQUFrQjtZQUNoQyxVQUFVLEVBQUUsUUFBUSxDQUFDLEtBQUs7WUFDMUIsT0FBTyxFQUFFLG1CQUFtQjtZQUM1QixPQUFPLEVBQUUsNkJBQWlCO1lBQzFCLFNBQVMsRUFBRSx1Q0FBMkI7U0FDekMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxlQUFNLENBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFO1lBQ2xDLE9BQU8sRUFBRSxRQUFRLENBQUMsVUFBVTtZQUM1QixLQUFLLEVBQUUsT0FBTyxDQUFDLGdCQUFnQjtZQUMvQixZQUFZLEVBQUUsa0JBQWtCO1lBQ2hDLFVBQVUsRUFBRSxRQUFRLENBQUMsS0FBSztZQUMxQixPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLE9BQU8sRUFBRSxnQ0FBb0I7WUFDN0IsU0FBUyxFQUFFLDBDQUE4QjtTQUM1QyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUF0RkQsNEJBc0ZDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIwIENyb3duIENvcHlyaWdodFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgKiBhcyBzYW0gZnJvbSBcIkBhd3MtY2RrL2F3cy1zYW1cIjtcbmltcG9ydCAqIGFzIHMzIGZyb20gJ0Bhd3MtY2RrL2F3cy1zMyc7XG5pbXBvcnQgKiBhcyBpYW0gZnJvbSAnQGF3cy1jZGsvYXdzLWlhbSc7XG5pbXBvcnQgKiBhcyBjbG91ZGZyb250IGZyb20gJ0Bhd3MtY2RrL2F3cy1jbG91ZGZyb250JztcbmltcG9ydCB7IEdyYXBoUGxhdEZvcm0gfSBmcm9tIFwiLi9wbGF0Zm9ybS9ncmFwaC1wbGF0Zm9ybVwiO1xuaW1wb3J0IHsgS2FpUmVzdEFwaSB9IGZyb20gXCIuL3Jlc3QtYXBpL2thaS1yZXN0LWFwaVwiO1xuaW1wb3J0IHsgTEFNQkRBX0xBWUVSX0FSTiwgTEFNQkRBX0xBWUVSX1ZFUlNJT04sIEFERF9HUkFQSF9USU1FT1VULCBERUxFVEVfR1JBUEhfVElNRU9VVCwgREVMRVRFX0dSQVBIX1dPUktFUl9CQVRDSF9TSVpFLCBBRERfR1JBUEhfV09SS0VSX0JBVENIX1NJWkUgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IExheWVyVmVyc2lvbiB9IGZyb20gXCJAYXdzLWNkay9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgeyBHcmFwaERhdGFiYXNlIH0gZnJvbSBcIi4vZGF0YWJhc2UvZ3JhcGgtZGF0YWJhc2VcIjtcbmltcG9ydCB7IFdvcmtlciB9IGZyb20gXCIuL3dvcmtlcnMvd29ya2VyXCI7XG5pbXBvcnQgeyBLYWlVc2VyUG9vbCB9IGZyb20gXCIuL2F1dGhlbnRpY2F0aW9uL3VzZXItcG9vbFwiO1xuaW1wb3J0IHsgR3JhcGhEYXRhYmFzZVByb3BzIH0gZnJvbSBcIi4vZGF0YWJhc2UvZ3JhcGgtZGF0YWJhc2UtcHJvcHNcIjtcblxuLy8gVGhlIG1haW4gc3RhY2sgZm9yIEthaVxuZXhwb3J0IGNsYXNzIEFwcFN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgICAgICAvLyBTMyBIb3N0aW5nXG4gICAgICAgIC8vIGNvbnN0IGJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgJ015S2FpQnVja2V0Jywge1xuICAgICAgICAvLyAgICAgYnVja2V0TmFtZTogJ2thaS11aScsXG4gICAgICAgIC8vICAgICB3ZWJzaXRlSW5kZXhEb2N1bWVudDogJ2luZGV4Lmh0bWwnLCAvLyAxXG4gICAgICAgIC8vICAgICBibG9ja1B1YmxpY0FjY2VzczogbmV3IHMzLkJsb2NrUHVibGljQWNjZXNzKHsgcmVzdHJpY3RQdWJsaWNCdWNrZXRzOiBmYWxzZSB9KSAvLyAyXG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIC8vIGNvbnN0IGNsb3VkRnJvbnRPQUkgPSBuZXcgY2xvdWRmcm9udC5PcmlnaW5BY2Nlc3NJZGVudGl0eSh0aGlzLCAnT0FJJyk7XG5cbiAgICAgICAgLy8gY29uc3QgZGlzdHJpYnV0aW9uID0gbmV3IGNsb3VkZnJvbnQuQ2xvdWRGcm9udFdlYkRpc3RyaWJ1dGlvbih0aGlzLCAnTXlEaXN0cmlidXRpb24nLCB7XG4gICAgICAgIC8vICAgICBvcmlnaW5Db25maWdzOiBbXG4gICAgICAgIC8vICAgICAgIHtcbiAgICAgICAgLy8gICAgICAgICBzM09yaWdpblNvdXJjZToge1xuICAgICAgICAvLyAgICAgICAgICAgczNCdWNrZXRTb3VyY2U6IGJ1Y2tldCxcbiAgICAgICAgLy8gICAgICAgICAgIG9yaWdpbkFjY2Vzc0lkZW50aXR5OiBjbG91ZEZyb250T0FJLFxuICAgICAgICAvLyAgICAgICAgIH0sXG4gICAgICAgIC8vICAgICAgICAgYmVoYXZpb3JzOiBbeyBpc0RlZmF1bHRCZWhhdmlvcjogdHJ1ZSB9XVxuICAgICAgICAvLyAgICAgICB9XG4gICAgICAgIC8vICAgICBdXG4gICAgICAgIC8vICAgfSlcblxuICAgICAgICAvLyBidWNrZXQuZ3JhbnRSZWFkKGNsb3VkRnJvbnRPQUkuZ3JhbnRQcmluY2lwYWwpO1xuXG4gICAgICAgIC8vIGNvbnN0IGJ1Y2tldFBvbGljeSA9IG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgLy8gICAgIGFjdGlvbnM6IFsnczM6R2V0T2JqZWN0J10sXG4gICAgICAgIC8vICAgICByZXNvdXJjZXM6IFtcbiAgICAgICAgLy8gICAgICAgYCR7YnVja2V0LmJ1Y2tldEFybn0vKmBcbiAgICAgICAgLy8gICAgIF0sXG4gICAgICAgIC8vICAgICBwcmluY2lwYWxzOiBbbmV3IGlhbS5BbnlvbmUoKV0sXG4gICAgICAgIC8vIH0pO1xuICAgICAgICAvLyBidWNrZXQuYWRkVG9SZXNvdXJjZVBvbGljeShidWNrZXRQb2xpY3kpOyAvLyA0XG5cbiAgICAgICAgLy8gVXNlciBQb29sXG4gICAgICAgIG5ldyBLYWlVc2VyUG9vbCh0aGlzLCBcIkthaVVzZXJQb29sXCIpO1xuXG4gICAgICAgIC8vIEdyYXBoIFBsYXRmb3JtXG4gICAgICAgIGNvbnN0IHBsYXRmb3JtID0gbmV3IEdyYXBoUGxhdEZvcm0odGhpcywgXCJHcmFwaFBsYXRmb3JtXCIpO1xuXG4gICAgICAgIC8vIEdyYXBoIFRhYmxlXG4gICAgICAgIGNvbnN0IGdyYXBoREJQcm9wczogR3JhcGhEYXRhYmFzZVByb3BzID0gdGhpcy5ub2RlLnRyeUdldENvbnRleHQoXCJncmFwaERhdGFiYXNlUHJvcHNcIik7XG4gICAgICAgIGNvbnN0IGRhdGFiYXNlID0gbmV3IEdyYXBoRGF0YWJhc2UodGhpcywgXCJHcmFwaERhdGFiYXNlXCIsIGdyYXBoREJQcm9wcyk7XG5cbiAgICAgICAgLy8gUkVTVCBBUElcbiAgICAgICAgY29uc3Qga2FpUmVzdCA9IG5ldyBLYWlSZXN0QXBpKHRoaXMsIFwiS2FpUmVzdEFwaVwiLCB7XG4gICAgICAgICAgICBncmFwaFRhYmxlOiBkYXRhYmFzZS50YWJsZVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBLdWJlY3RsIExhbWJkYSBsYXllclxuICAgICAgICBjb25zdCBzYW1BcHAgPSBuZXcgc2FtLkNmbkFwcGxpY2F0aW9uKHRoaXMsIFwiU2FtTGF5ZXJcIiwge1xuICAgICAgICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbklkOiBMQU1CREFfTEFZRVJfQVJOLFxuICAgICAgICAgICAgICAgIHNlbWFudGljVmVyc2lvbjogTEFNQkRBX0xBWUVSX1ZFUlNJT05cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAgICAgTGF5ZXJOYW1lOiBgJHt0aGlzLm5vZGUudW5pcXVlSWR9LWt1YmVjdGwtbGF5ZXJgXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGxheWVyVmVyc2lvbkFybiA9IHNhbUFwcC5nZXRBdHQoXCJPdXRwdXRzLkxheWVyVmVyc2lvbkFyblwiKS50b1N0cmluZygpO1xuICAgICAgICBjb25zdCBrdWJlY3RsTGFtYmRhTGF5ZXIgPSBMYXllclZlcnNpb24uZnJvbUxheWVyVmVyc2lvbkFybih0aGlzLCBcIkt1YmVjdGxMYW1iZGFMYXllclwiLCBsYXllclZlcnNpb25Bcm4pO1xuXG4gICAgICAgIC8vIFdvcmtlcnNcbiAgICAgICAgbmV3IFdvcmtlcih0aGlzLCBcIkFkZEdyYXBoV29ya2VyXCIsIHtcbiAgICAgICAgICAgIGNsdXN0ZXI6IHBsYXRmb3JtLmVrc0NsdXN0ZXIsXG4gICAgICAgICAgICBxdWV1ZToga2FpUmVzdC5hZGRHcmFwaFF1ZXVlLFxuICAgICAgICAgICAga3ViZWN0bExheWVyOiBrdWJlY3RsTGFtYmRhTGF5ZXIsXG4gICAgICAgICAgICBncmFwaFRhYmxlOiBkYXRhYmFzZS50YWJsZSxcbiAgICAgICAgICAgIGhhbmRsZXI6IFwiYWRkX2dyYXBoLmhhbmRsZXJcIixcbiAgICAgICAgICAgIHRpbWVvdXQ6IEFERF9HUkFQSF9USU1FT1VULFxuICAgICAgICAgICAgYmF0Y2hTaXplOiBBRERfR1JBUEhfV09SS0VSX0JBVENIX1NJWkVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmV3IFdvcmtlcih0aGlzLCBcIkRlbGV0ZUdyYXBoV29ya2VyXCIsIHtcbiAgICAgICAgICAgIGNsdXN0ZXI6IHBsYXRmb3JtLmVrc0NsdXN0ZXIsXG4gICAgICAgICAgICBxdWV1ZToga2FpUmVzdC5kZWxldGVHcmFwaFF1ZXVlLFxuICAgICAgICAgICAga3ViZWN0bExheWVyOiBrdWJlY3RsTGFtYmRhTGF5ZXIsXG4gICAgICAgICAgICBncmFwaFRhYmxlOiBkYXRhYmFzZS50YWJsZSxcbiAgICAgICAgICAgIGhhbmRsZXI6IFwiZGVsZXRlX2dyYXBoLmhhbmRsZXJcIixcbiAgICAgICAgICAgIHRpbWVvdXQ6IERFTEVURV9HUkFQSF9USU1FT1VULFxuICAgICAgICAgICAgYmF0Y2hTaXplOiBERUxFVEVfR1JBUEhfV09SS0VSX0JBVENIX1NJWkVcbiAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==