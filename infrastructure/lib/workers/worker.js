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
exports.Worker = void 0;
const core_1 = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const path = require("path");
const aws_iam_1 = require("@aws-cdk/aws-iam");
const aws_lambda_event_sources_1 = require("@aws-cdk/aws-lambda-event-sources");
class Worker extends core_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        this.createConstructs(id, props);
    }
    createConstructs(id, props) {
        const extraSecurityGroups = this.node.tryGetContext("extraIngressSecurityGroups");
        // Build environment for Lambda
        const environment = {
            "cluster_name": props.cluster.clusterName,
            "graph_table_name": props.graphTable.tableName
        };
        if (extraSecurityGroups) {
            environment["extra_security_groups"] = extraSecurityGroups;
        }
        // Create worker from Lambda
        const worker = new lambda.Function(this, id + "Lambda", {
            runtime: lambda.Runtime.PYTHON_3_7,
            code: new lambda.AssetCode(path.join(__dirname, "lambdas")),
            handler: props.handler,
            layers: [props.kubectlLayer],
            timeout: props.timeout,
            environment: environment
        });
        worker.addEventSource(new aws_lambda_event_sources_1.SqsEventSource(props.queue, {
            batchSize: props.batchSize
        }));
        // Add permisssions to role
        worker.addToRolePolicy(new aws_iam_1.PolicyStatement({
            actions: ["eks:DescribeCluster", "ec2:DescribeVpcs"],
            resources: [props.cluster.clusterArn]
        }));
        props.graphTable.grantReadWriteData(worker);
        const workerRole = worker.role;
        if (workerRole == undefined) {
            throw new Error("Worker must have an associated IAM Role");
        }
        else {
            props.cluster.awsAuth.addMastersRole(workerRole);
        }
    }
}
exports.Worker = Worker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid29ya2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7R0FjRzs7O0FBRUgsd0NBQTBDO0FBRTFDLDhDQUE4QztBQUM5Qyw2QkFBNkI7QUFDN0IsOENBQW1EO0FBQ25ELGdGQUFtRTtBQUVuRSxNQUFhLE1BQU8sU0FBUSxnQkFBUztJQUVqQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQ3hELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsRUFBVSxFQUFFLEtBQWtCO1FBQ25ELE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUVsRiwrQkFBK0I7UUFDL0IsTUFBTSxXQUFXLEdBQStCO1lBQzVDLGNBQWMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDekMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTO1NBQ2pELENBQUM7UUFDRixJQUFJLG1CQUFtQixFQUFFO1lBQ3JCLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLG1CQUFtQixDQUFDO1NBQzlEO1FBRUQsNEJBQTRCO1FBQzVCLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLFFBQVEsRUFBRTtZQUNwRCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVO1lBQ2xDLElBQUksRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDM0QsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO1lBQ3RCLE1BQU0sRUFBRSxDQUFFLEtBQUssQ0FBQyxZQUFZLENBQUU7WUFDOUIsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO1lBQ3RCLFdBQVcsRUFBRSxXQUFXO1NBQzNCLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSx5Q0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDbEQsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTO1NBQzdCLENBQUMsQ0FBQyxDQUFDO1FBRUosMkJBQTJCO1FBQzNCLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSx5QkFBZSxDQUFDO1lBQ3ZDLE9BQU8sRUFBRSxDQUFFLHFCQUFxQixFQUFFLGtCQUFrQixDQUFFO1lBQ3RELFNBQVMsRUFBRSxDQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFFO1NBQzFDLENBQUMsQ0FBQyxDQUFDO1FBRUosS0FBSyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU1QyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBRS9CLElBQUksVUFBVSxJQUFJLFNBQVMsRUFBRTtZQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7U0FDOUQ7YUFBTTtZQUNILEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNwRDtJQUNMLENBQUM7Q0FDSjtBQWpERCx3QkFpREMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjAgQ3Jvd24gQ29weXJpZ2h0XG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XG5pbXBvcnQgeyBXb3JrZXJQcm9wcyB9IGZyb20gXCIuL3dvcmtlci1wcm9wc1wiO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gXCJAYXdzLWNkay9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBQb2xpY3lTdGF0ZW1lbnQgfSBmcm9tIFwiQGF3cy1jZGsvYXdzLWlhbVwiO1xuaW1wb3J0IHsgU3FzRXZlbnRTb3VyY2UgfSBmcm9tIFwiQGF3cy1jZGsvYXdzLWxhbWJkYS1ldmVudC1zb3VyY2VzXCI7XG5cbmV4cG9ydCBjbGFzcyBXb3JrZXIgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IFdvcmtlclByb3BzKSB7XG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQ29uc3RydWN0cyhpZCwgcHJvcHMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQ29uc3RydWN0cyhpZDogc3RyaW5nLCBwcm9wczogV29ya2VyUHJvcHMpIHtcbiAgICAgICAgY29uc3QgZXh0cmFTZWN1cml0eUdyb3VwcyA9IHRoaXMubm9kZS50cnlHZXRDb250ZXh0KFwiZXh0cmFJbmdyZXNzU2VjdXJpdHlHcm91cHNcIik7XG5cbiAgICAgICAgLy8gQnVpbGQgZW52aXJvbm1lbnQgZm9yIExhbWJkYVxuICAgICAgICBjb25zdCBlbnZpcm9ubWVudDogeyBbaWQ6IHN0cmluZ10gOiBzdHJpbmc7IH0gPSB7XG4gICAgICAgICAgICBcImNsdXN0ZXJfbmFtZVwiOiBwcm9wcy5jbHVzdGVyLmNsdXN0ZXJOYW1lLFxuICAgICAgICAgICAgXCJncmFwaF90YWJsZV9uYW1lXCI6IHByb3BzLmdyYXBoVGFibGUudGFibGVOYW1lXG4gICAgICAgIH07XG4gICAgICAgIGlmIChleHRyYVNlY3VyaXR5R3JvdXBzKSB7XG4gICAgICAgICAgICBlbnZpcm9ubWVudFtcImV4dHJhX3NlY3VyaXR5X2dyb3Vwc1wiXSA9IGV4dHJhU2VjdXJpdHlHcm91cHM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgd29ya2VyIGZyb20gTGFtYmRhXG4gICAgICAgIGNvbnN0IHdvcmtlciA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgaWQgKyBcIkxhbWJkYVwiLCB7XG4gICAgICAgICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5QWVRIT05fM183LFxuICAgICAgICAgICAgY29kZTogbmV3IGxhbWJkYS5Bc3NldENvZGUocGF0aC5qb2luKF9fZGlybmFtZSwgXCJsYW1iZGFzXCIpKSxcbiAgICAgICAgICAgIGhhbmRsZXI6IHByb3BzLmhhbmRsZXIsXG4gICAgICAgICAgICBsYXllcnM6IFsgcHJvcHMua3ViZWN0bExheWVyIF0sXG4gICAgICAgICAgICB0aW1lb3V0OiBwcm9wcy50aW1lb3V0LFxuICAgICAgICAgICAgZW52aXJvbm1lbnQ6IGVudmlyb25tZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdvcmtlci5hZGRFdmVudFNvdXJjZShuZXcgU3FzRXZlbnRTb3VyY2UocHJvcHMucXVldWUsIHtcbiAgICAgICAgICAgIGJhdGNoU2l6ZTogcHJvcHMuYmF0Y2hTaXplXG4gICAgICAgIH0pKTtcblxuICAgICAgICAvLyBBZGQgcGVybWlzc3Npb25zIHRvIHJvbGVcbiAgICAgICAgd29ya2VyLmFkZFRvUm9sZVBvbGljeShuZXcgUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgICAgIGFjdGlvbnM6IFsgXCJla3M6RGVzY3JpYmVDbHVzdGVyXCIsIFwiZWMyOkRlc2NyaWJlVnBjc1wiIF0sXG4gICAgICAgICAgICByZXNvdXJjZXM6IFsgcHJvcHMuY2x1c3Rlci5jbHVzdGVyQXJuIF1cbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHByb3BzLmdyYXBoVGFibGUuZ3JhbnRSZWFkV3JpdGVEYXRhKHdvcmtlcik7XG4gICAgXG4gICAgICAgIGNvbnN0IHdvcmtlclJvbGUgPSB3b3JrZXIucm9sZTtcblxuICAgICAgICBpZiAod29ya2VyUm9sZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIldvcmtlciBtdXN0IGhhdmUgYW4gYXNzb2NpYXRlZCBJQU0gUm9sZVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb3BzLmNsdXN0ZXIuYXdzQXV0aC5hZGRNYXN0ZXJzUm9sZSh3b3JrZXJSb2xlKTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=