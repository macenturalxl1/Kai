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
exports.KaiRestApi = void 0;
const cdk = require("@aws-cdk/core");
const api = require("@aws-cdk/aws-apigateway");
const lambda = require("@aws-cdk/aws-lambda");
const sqs = require("@aws-cdk/aws-sqs");
const path = require("path");
const constants_1 = require("../constants");
class KaiRestApi extends cdk.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        this.id = id;
        // REST API
        const restApi = new api.RestApi(this, this.node.uniqueId + "RestApi"); // Could add a default 404 handler here
        const graphsResource = restApi.root.addResource("graphs");
        const graph = graphsResource.addResource("{graphId}");
        // Service Functions all share the same code and timeout 
        const lambdas = new lambda.AssetCode(path.join(__dirname, "lambdas"));
        const lambdaTimeout = cdk.Duration.seconds(30);
        // POST handlers
        this._addGraphQueue = new sqs.Queue(this, "AddGraphQueue", {
            visibilityTimeout: constants_1.ADD_GRAPH_TIMEOUT
        });
        const addGraphLambda = new lambda.Function(this, "AddGraphHandler", {
            runtime: lambda.Runtime.PYTHON_3_7,
            code: lambdas,
            handler: "add_graph_request.handler",
            timeout: lambdaTimeout,
            environment: {
                sqs_queue_url: this.addGraphQueue.queueUrl,
                graph_table_name: props.graphTable.tableName
            }
        });
        props.graphTable.grantWriteData(addGraphLambda);
        this.addGraphQueue.grantSendMessages(addGraphLambda);
        graphsResource.addMethod("POST", new api.LambdaIntegration(addGraphLambda));
        // DELETE handlers
        this._deleteGraphQueue = new sqs.Queue(this, "DeleteGraphQueue", {
            visibilityTimeout: constants_1.DELETE_GRAPH_TIMEOUT
        });
        const deleteGraphLambda = new lambda.Function(this, "DeleteGraphHandler", {
            runtime: lambda.Runtime.PYTHON_3_7,
            code: lambdas,
            handler: "delete_graph_request.handler",
            timeout: lambdaTimeout,
            environment: {
                sqs_queue_url: this.deleteGraphQueue.queueUrl,
                graph_table_name: props.graphTable.tableName
            }
        });
        props.graphTable.grantWriteData(deleteGraphLambda);
        this.deleteGraphQueue.grantSendMessages(deleteGraphLambda);
        graph.addMethod("DELETE", new api.LambdaIntegration(deleteGraphLambda));
        // GET handlers
        const getGraphsLambda = new lambda.Function(this, "GetGraphsHandler", {
            runtime: lambda.Runtime.PYTHON_3_7,
            code: lambdas,
            handler: "get_graph_request.handler",
            timeout: lambdaTimeout,
            environment: {
                graph_table_name: props.graphTable.tableName
            }
        });
        props.graphTable.grantReadData(getGraphsLambda);
        // Both GET and GET all are served by the same lambda
        const getGraphIntegration = new api.LambdaIntegration(getGraphsLambda);
        graphsResource.addMethod("GET", getGraphIntegration);
        graph.addMethod("GET", getGraphIntegration);
    }
    get addGraphQueue() {
        return this._addGraphQueue;
    }
    get deleteGraphQueue() {
        return this._deleteGraphQueue;
    }
}
exports.KaiRestApi = KaiRestApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2FpLXJlc3QtYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsia2FpLXJlc3QtYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7R0FjRzs7O0FBRUgscUNBQXFDO0FBQ3JDLCtDQUErQztBQUMvQyw4Q0FBOEM7QUFDOUMsd0NBQXdDO0FBQ3hDLDZCQUE2QjtBQUU3Qiw0Q0FBdUU7QUFFdkUsTUFBYSxVQUFXLFNBQVEsR0FBRyxDQUFDLFNBQVM7SUFJekMsWUFBWSxLQUFvQixFQUFXLEVBQVUsRUFBRSxLQUFzQjtRQUN6RSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRHNCLE9BQUUsR0FBRixFQUFFLENBQVE7UUFFakQsV0FBVztRQUNYLE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyx1Q0FBdUM7UUFDOUcsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUQsTUFBTSxLQUFLLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV0RCx5REFBeUQ7UUFDekQsTUFBTSxPQUFPLEdBQUcsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDdEUsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFL0MsZ0JBQWdCO1FBQ2hCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDdkQsaUJBQWlCLEVBQUUsNkJBQWlCO1NBQ3ZDLENBQUMsQ0FBQztRQUVI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ICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgKiBhcyBjZGsgZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcbmltcG9ydCAqIGFzIGFwaSBmcm9tIFwiQGF3cy1jZGsvYXdzLWFwaWdhdGV3YXlcIjtcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tIFwiQGF3cy1jZGsvYXdzLWxhbWJkYVwiO1xuaW1wb3J0ICogYXMgc3FzIGZyb20gXCJAYXdzLWNkay9hd3Mtc3FzXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBLYWlSZXN0QXBpUHJvcHMgfSBmcm9tIFwiLi9rYWktcmVzdC1hcGktcHJvcHNcIjtcbmltcG9ydCB7IERFTEVURV9HUkFQSF9USU1FT1VULCBBRERfR1JBUEhfVElNRU9VVCB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcblxuZXhwb3J0IGNsYXNzIEthaVJlc3RBcGkgZXh0ZW5kcyBjZGsuQ29uc3RydWN0IHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9hZGRHcmFwaFF1ZXVlOiBzcXMuUXVldWU7XG4gICAgcHJpdmF0ZSByZWFkb25seSBfZGVsZXRlR3JhcGhRdWV1ZTogc3FzLlF1ZXVlO1xuXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIHJlYWRvbmx5IGlkOiBzdHJpbmcsIHByb3BzOiBLYWlSZXN0QXBpUHJvcHMpIHtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkKTtcbiAgICAgICAgLy8gUkVTVCBBUElcbiAgICAgICAgY29uc3QgcmVzdEFwaSA9IG5ldyBhcGkuUmVzdEFwaSh0aGlzLCB0aGlzLm5vZGUudW5pcXVlSWQgKyBcIlJlc3RBcGlcIik7IC8vIENvdWxkIGFkZCBhIGRlZmF1bHQgNDA0IGhhbmRsZXIgaGVyZVxuICAgICAgICBjb25zdCBncmFwaHNSZXNvdXJjZSA9IHJlc3RBcGkucm9vdC5hZGRSZXNvdXJjZShcImdyYXBoc1wiKTtcbiAgICAgICAgY29uc3QgZ3JhcGggPSBncmFwaHNSZXNvdXJjZS5hZGRSZXNvdXJjZShcIntncmFwaElkfVwiKTtcblxuICAgICAgICAvLyBTZXJ2aWNlIEZ1bmN0aW9ucyBhbGwgc2hhcmUgdGhlIHNhbWUgY29kZSBhbmQgdGltZW91dCBcbiAgICAgICAgY29uc3QgbGFtYmRhcyA9IG5ldyBsYW1iZGEuQXNzZXRDb2RlKHBhdGguam9pbihfX2Rpcm5hbWUsIFwibGFtYmRhc1wiKSk7XG4gICAgICAgIGNvbnN0IGxhbWJkYVRpbWVvdXQgPSBjZGsuRHVyYXRpb24uc2Vjb25kcygzMCk7XG5cbiAgICAgICAgLy8gUE9TVCBoYW5kbGVyc1xuICAgICAgICB0aGlzLl9hZGRHcmFwaFF1ZXVlID0gbmV3IHNxcy5RdWV1ZSh0aGlzLCBcIkFkZEdyYXBoUXVldWVcIiwgeyBcbiAgICAgICAgICAgIHZpc2liaWxpdHlUaW1lb3V0OiBBRERfR1JBUEhfVElNRU9VVFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBhZGRHcmFwaExhbWJkYSA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgXCJBZGRHcmFwaEhhbmRsZXJcIiwge1xuICAgICAgICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuUFlUSE9OXzNfNyxcbiAgICAgICAgICAgIGNvZGU6IGxhbWJkYXMsXG4gICAgICAgICAgICBoYW5kbGVyOiBcImFkZF9ncmFwaF9yZXF1ZXN0LmhhbmRsZXJcIixcbiAgICAgICAgICAgIHRpbWVvdXQ6IGxhbWJkYVRpbWVvdXQsXG4gICAgICAgICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICAgICAgICAgIHNxc19xdWV1ZV91cmw6IHRoaXMuYWRkR3JhcGhRdWV1ZS5xdWV1ZVVybCxcbiAgICAgICAgICAgICAgICBncmFwaF90YWJsZV9uYW1lOiBwcm9wcy5ncmFwaFRhYmxlLnRhYmxlTmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBwcm9wcy5ncmFwaFRhYmxlLmdyYW50V3JpdGVEYXRhKGFkZEdyYXBoTGFtYmRhKTtcbiAgICAgICAgdGhpcy5hZGRHcmFwaFF1ZXVlLmdyYW50U2VuZE1lc3NhZ2VzKGFkZEdyYXBoTGFtYmRhKTtcbiAgICAgICAgZ3JhcGhzUmVzb3VyY2UuYWRkTWV0aG9kKFwiUE9TVFwiLCBuZXcgYXBpLkxhbWJkYUludGVncmF0aW9uKGFkZEdyYXBoTGFtYmRhKSk7XG5cbiAgICAgICAgLy8gREVMRVRFIGhhbmRsZXJzXG4gICAgICAgIHRoaXMuX2RlbGV0ZUdyYXBoUXVldWUgPSBuZXcgc3FzLlF1ZXVlKHRoaXMsIFwiRGVsZXRlR3JhcGhRdWV1ZVwiLCB7IFxuICAgICAgICAgICAgdmlzaWJpbGl0eVRpbWVvdXQ6IERFTEVURV9HUkFQSF9USU1FT1VUXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGRlbGV0ZUdyYXBoTGFtYmRhID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCBcIkRlbGV0ZUdyYXBoSGFuZGxlclwiLCB7XG4gICAgICAgICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5QWVRIT05fM183LFxuICAgICAgICAgICAgY29kZTogbGFtYmRhcyxcbiAgICAgICAgICAgIGhhbmRsZXI6IFwiZGVsZXRlX2dyYXBoX3JlcXVlc3QuaGFuZGxlclwiLFxuICAgICAgICAgICAgdGltZW91dDogbGFtYmRhVGltZW91dCxcbiAgICAgICAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgICAgICAgICAgc3FzX3F1ZXVlX3VybDogdGhpcy5kZWxldGVHcmFwaFF1ZXVlLnF1ZXVlVXJsLFxuICAgICAgICAgICAgICAgIGdyYXBoX3RhYmxlX25hbWU6IHByb3BzLmdyYXBoVGFibGUudGFibGVOYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHByb3BzLmdyYXBoVGFibGUuZ3JhbnRXcml0ZURhdGEoZGVsZXRlR3JhcGhMYW1iZGEpO1xuICAgICAgICB0aGlzLmRlbGV0ZUdyYXBoUXVldWUuZ3JhbnRTZW5kTWVzc2FnZXMoZGVsZXRlR3JhcGhMYW1iZGEpO1xuICAgICAgICBncmFwaC5hZGRNZXRob2QoXCJERUxFVEVcIiwgbmV3IGFwaS5MYW1iZGFJbnRlZ3JhdGlvbihkZWxldGVHcmFwaExhbWJkYSkpO1xuXG4gICAgICAgIC8vIEdFVCBoYW5kbGVyc1xuICAgICAgICBjb25zdCBnZXRHcmFwaHNMYW1iZGEgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIFwiR2V0R3JhcGhzSGFuZGxlclwiLCB7XG4gICAgICAgICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5QWVRIT05fM183LFxuICAgICAgICAgICAgY29kZTogbGFtYmRhcyxcbiAgICAgICAgICAgIGhhbmRsZXI6IFwiZ2V0X2dyYXBoX3JlcXVlc3QuaGFuZGxlclwiLFxuICAgICAgICAgICAgdGltZW91dDogbGFtYmRhVGltZW91dCxcbiAgICAgICAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgICAgICAgICAgZ3JhcGhfdGFibGVfbmFtZTogcHJvcHMuZ3JhcGhUYWJsZS50YWJsZU5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcHJvcHMuZ3JhcGhUYWJsZS5ncmFudFJlYWREYXRhKGdldEdyYXBoc0xhbWJkYSk7XG4gICAgICAgIC8vIEJvdGggR0VUIGFuZCBHRVQgYWxsIGFyZSBzZXJ2ZWQgYnkgdGhlIHNhbWUgbGFtYmRhXG4gICAgICAgIGNvbnN0IGdldEdyYXBoSW50ZWdyYXRpb24gPSBuZXcgYXBpLkxhbWJkYUludGVncmF0aW9uKGdldEdyYXBoc0xhbWJkYSk7XG4gICAgICAgIGdyYXBoc1Jlc291cmNlLmFkZE1ldGhvZChcIkdFVFwiLCBnZXRHcmFwaEludGVncmF0aW9uKTtcbiAgICAgICAgZ3JhcGguYWRkTWV0aG9kKFwiR0VUXCIsIGdldEdyYXBoSW50ZWdyYXRpb24pO1xuXG4gICAgfVxuXG4gICAgcHVibGljIGdldCBhZGRHcmFwaFF1ZXVlKCk6IHNxcy5RdWV1ZSB7IFxuICAgICAgICByZXR1cm4gdGhpcy5fYWRkR3JhcGhRdWV1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGRlbGV0ZUdyYXBoUXVldWUoKTogc3FzLlF1ZXVlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlbGV0ZUdyYXBoUXVldWU7XG4gICAgfVxufSJdfQ==