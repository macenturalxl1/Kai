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
const assert_1 = require("@aws-cdk/assert");
const cdk = require("@aws-cdk/core");
const aws_eks_1 = require("@aws-cdk/aws-eks");
const aws_sqs_1 = require("@aws-cdk/aws-sqs");
const aws_lambda_1 = require("@aws-cdk/aws-lambda");
const constants_1 = require("../../lib/constants");
const worker_1 = require("../../lib/workers/worker");
const aws_dynamodb_1 = require("@aws-cdk/aws-dynamodb");
function createWorker(stack, extraSGs, handler = "testHandler", timeout = cdk.Duration.minutes(10), batchSize = 3) {
    if (extraSGs !== undefined) {
        stack.node.setContext("extraIngressSecurityGroups", extraSGs);
    }
    const donorCluster = new aws_eks_1.Cluster(stack, "testCluster", { version: aws_eks_1.KubernetesVersion.V1_17 });
    const donorQueue = new aws_sqs_1.Queue(stack, "testQueue");
    const table = new aws_dynamodb_1.Table(stack, "test", {
        partitionKey: { name: "test", type: aws_dynamodb_1.AttributeType.STRING }
    });
    const layer = aws_lambda_1.LayerVersion.fromLayerVersionArn(stack, "testLayer", constants_1.LAMBDA_LAYER_ARN);
    return new worker_1.Worker(stack, "testWorker", {
        queue: donorQueue,
        cluster: donorCluster,
        kubectlLayer: layer,
        graphTable: table,
        handler: handler,
        timeout: timeout,
        batchSize: batchSize
    });
}
test("Should create a Lambda Function", () => {
    // Given
    const stack = new cdk.Stack();
    // When
    createWorker(stack);
    // Then
    assert_1.expect(stack).to(assert_1.haveResource("AWS::Lambda::Function"));
});
test("Should use handler name in properties", () => {
    // Given
    const stack = new cdk.Stack();
    // When
    createWorker(stack, undefined, "MyHandlerTest");
    // Then
    assert_1.expect(stack).to(assert_1.haveResource("AWS::Lambda::Function", {
        Handler: "MyHandlerTest"
    }));
});
test("Should use timeout supplied in properties", () => {
    // Given
    const stack = new cdk.Stack();
    // When
    createWorker(stack, undefined, undefined, cdk.Duration.minutes(5));
    // Then
    assert_1.expect(stack).to(assert_1.haveResource("AWS::Lambda::Function", {
        Timeout: 300
    }));
});
test("Should use batchSize supplied in properties for SQS Queue", () => {
    // Given
    const stack = new cdk.Stack();
    // When
    createWorker(stack, undefined, undefined, undefined, 7);
    // Then
    assert_1.expect(stack).to(assert_1.haveResource("AWS::Lambda::EventSourceMapping", {
        BatchSize: 7
    }));
});
test("Should not populate Environment with extra_security_groups when none supplied", () => {
    // Given
    const stack = new cdk.Stack();
    // When
    createWorker(stack); // second argument is security groups
    // Then
    expectLambdaEnvironmentContainsNoExtraSecurityGroups(stack);
});
test("Should not populate Environment with extra_security_groups when empty string supplied", () => {
    // Given
    const stack = new cdk.Stack();
    // When
    createWorker(stack, ""); // second argument is security groups
    // Then
    expectLambdaEnvironmentContainsNoExtraSecurityGroups(stack);
});
function expectLambdaEnvironmentContainsNoExtraSecurityGroups(stack) {
    assert_1.expect(stack).to(assert_1.haveResource("AWS::Lambda::Function", {
        Environment: {
            "Variables": {
                "cluster_name": {
                    "Ref": "testClusterFF806018"
                },
                "graph_table_name": {
                    "Ref": "testAF53AC38"
                }
            }
        }
    }));
}
test("should allow lambda to consume messages from queue and describe cluster", () => {
    // Given
    const stack = new cdk.Stack();
    // When
    createWorker(stack);
    // Then
    assert_1.expect(stack).to(assert_1.haveResourceLike("AWS::IAM::Policy", {
        "PolicyDocument": {
            "Statement": [
                {
                    "Action": [
                        "sqs:ReceiveMessage",
                        "sqs:ChangeMessageVisibility",
                        "sqs:GetQueueUrl",
                        "sqs:DeleteMessage",
                        "sqs:GetQueueAttributes"
                    ],
                    "Effect": "Allow",
                    "Resource": {
                        "Fn::GetAtt": [
                            "testQueue601B0FCD",
                            "Arn"
                        ]
                    }
                },
                {
                    "Action": "eks:DescribeCluster",
                    "Effect": "Allow",
                    "Resource": {
                        "Fn::GetAtt": [
                            "testClusterFF806018",
                            "Arn"
                        ]
                    }
                }
            ]
        }
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3b3JrZXIudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7O0dBY0c7O0FBRUgsNENBQXNGO0FBQ3RGLHFDQUFxQztBQUNyQyw4Q0FBOEQ7QUFDOUQsOENBQXlDO0FBQ3pDLG9EQUFtRDtBQUNuRCxtREFBdUQ7QUFDdkQscURBQWtEO0FBQ2xELHdEQUE2RDtBQUU3RCxTQUFTLFlBQVksQ0FBQyxLQUFnQixFQUFFLFFBQWlCLEVBQUUsT0FBTyxHQUFHLGFBQWEsRUFBRSxPQUFPLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxHQUFHLENBQUM7SUFDakksSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO1FBQ3hCLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLDRCQUE0QixFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ2pFO0lBQ0QsTUFBTSxZQUFZLEdBQUcsSUFBSSxpQkFBTyxDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsRUFBRSxPQUFPLEVBQUUsMkJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUM3RixNQUFNLFVBQVUsR0FBRyxJQUFJLGVBQUssQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDakQsTUFBTSxLQUFLLEdBQUcsSUFBSSxvQkFBSyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUU7UUFDbkMsWUFBWSxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsNEJBQWEsQ0FBQyxNQUFNLEVBQUM7S0FDM0QsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxLQUFLLEdBQUcseUJBQVksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLDRCQUFnQixDQUFDLENBQUM7SUFFckYsT0FBTyxJQUFJLGVBQU0sQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFF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Ii8qXG4gKiBDb3B5cmlnaHQgMjAyMCBDcm93biBDb3B5cmlnaHRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHsgZXhwZWN0IGFzIGV4cGVjdENESywgaGF2ZVJlc291cmNlLCBoYXZlUmVzb3VyY2VMaWtlIH0gZnJvbSBcIkBhd3MtY2RrL2Fzc2VydFwiO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XG5pbXBvcnQgeyBDbHVzdGVyLCBLdWJlcm5ldGVzVmVyc2lvbiB9IGZyb20gXCJAYXdzLWNkay9hd3MtZWtzXCI7XG5pbXBvcnQgeyBRdWV1ZSB9IGZyb20gXCJAYXdzLWNkay9hd3Mtc3FzXCI7XG5pbXBvcnQgeyBMYXllclZlcnNpb24gfSBmcm9tIFwiQGF3cy1jZGsvYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHsgTEFNQkRBX0xBWUVSX0FSTiB9IGZyb20gXCIuLi8uLi9saWIvY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBXb3JrZXIgfSBmcm9tIFwiLi4vLi4vbGliL3dvcmtlcnMvd29ya2VyXCI7XG5pbXBvcnQgeyBUYWJsZSwgQXR0cmlidXRlVHlwZSB9IGZyb20gXCJAYXdzLWNkay9hd3MtZHluYW1vZGJcIjtcblxuZnVuY3Rpb24gY3JlYXRlV29ya2VyKHN0YWNrOiBjZGsuU3RhY2ssIGV4dHJhU0dzPzogc3RyaW5nLCBoYW5kbGVyID0gXCJ0ZXN0SGFuZGxlclwiLCB0aW1lb3V0ID0gY2RrLkR1cmF0aW9uLm1pbnV0ZXMoMTApLCBiYXRjaFNpemUgPSAzKTogV29ya2VyIHtcbiAgICBpZiAoZXh0cmFTR3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzdGFjay5ub2RlLnNldENvbnRleHQoXCJleHRyYUluZ3Jlc3NTZWN1cml0eUdyb3Vwc1wiLCBleHRyYVNHcyk7XG4gICAgfVxuICAgIGNvbnN0IGRvbm9yQ2x1c3RlciA9IG5ldyBDbHVzdGVyKHN0YWNrLCBcInRlc3RDbHVzdGVyXCIsIHsgdmVyc2lvbjogS3ViZXJuZXRlc1ZlcnNpb24uVjFfMTcgfSk7XG4gICAgY29uc3QgZG9ub3JRdWV1ZSA9IG5ldyBRdWV1ZShzdGFjaywgXCJ0ZXN0UXVldWVcIik7XG4gICAgY29uc3QgdGFibGUgPSBuZXcgVGFibGUoc3RhY2ssIFwidGVzdFwiLCB7XG4gICAgICAgIHBhcnRpdGlvbktleToge25hbWU6IFwidGVzdFwiLCB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklOR31cbiAgICB9KTtcbiAgICBjb25zdCBsYXllciA9IExheWVyVmVyc2lvbi5mcm9tTGF5ZXJWZXJzaW9uQXJuKHN0YWNrLCBcInRlc3RMYXllclwiLCBMQU1CREFfTEFZRVJfQVJOKTtcblxuICAgIHJldHVybiBuZXcgV29ya2VyKHN0YWNrLCBcInRlc3RXb3JrZXJcIiwge1xuICAgICAgICBxdWV1ZTogZG9ub3JRdWV1ZSxcbiAgICAgICAgY2x1c3RlcjogZG9ub3JDbHVzdGVyLFxuICAgICAgICBrdWJlY3RsTGF5ZXI6IGxheWVyLFxuICAgICAgICBncmFwaFRhYmxlOiB0YWJsZSxcbiAgICAgICAgaGFuZGxlcjogaGFuZGxlcixcbiAgICAgICAgdGltZW91dDogdGltZW91dCxcbiAgICAgICAgYmF0Y2hTaXplOiBiYXRjaFNpemVcbiAgICB9KTtcbn1cblxudGVzdChcIlNob3VsZCBjcmVhdGUgYSBMYW1iZGEgRnVuY3Rpb25cIiwgKCkgPT4ge1xuICAgIC8vIEdpdmVuXG4gICAgY29uc3Qgc3RhY2sgPSBuZXcgY2RrLlN0YWNrKCk7XG5cbiAgICAvLyBXaGVuXG4gICAgY3JlYXRlV29ya2VyKHN0YWNrKTtcblxuICAgIC8vIFRoZW5cbiAgICBleHBlY3RDREsoc3RhY2spLnRvKGhhdmVSZXNvdXJjZShcIkFXUzo6TGFtYmRhOjpGdW5jdGlvblwiKSk7XG59KTtcblxudGVzdChcIlNob3VsZCB1c2UgaGFuZGxlciBuYW1lIGluIHByb3BlcnRpZXNcIiwgKCkgPT4ge1xuICAgIC8vIEdpdmVuXG4gICAgY29uc3Qgc3RhY2sgPSBuZXcgY2RrLlN0YWNrKCk7XG5cbiAgICAvLyBXaGVuXG4gICAgY3JlYXRlV29ya2VyKHN0YWNrLCB1bmRlZmluZWQsIFwiTXlIYW5kbGVyVGVzdFwiKTtcblxuICAgIC8vIFRoZW5cbiAgICBleHBlY3RDREsoc3RhY2spLnRvKGhhdmVSZXNvdXJjZShcIkFXUzo6TGFtYmRhOjpGdW5jdGlvblwiLCB7XG4gICAgICAgIEhhbmRsZXI6IFwiTXlIYW5kbGVyVGVzdFwiXG4gICAgfSkpO1xufSk7XG5cbnRlc3QoXCJTaG91bGQgdXNlIHRpbWVvdXQgc3VwcGxpZWQgaW4gcHJvcGVydGllc1wiLCAoKSAgPT4ge1xuICAgIC8vIEdpdmVuXG4gICAgY29uc3Qgc3RhY2sgPSBuZXcgY2RrLlN0YWNrKCk7XG5cbiAgICAvLyBXaGVuXG4gICAgY3JlYXRlV29ya2VyKHN0YWNrLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgY2RrLkR1cmF0aW9uLm1pbnV0ZXMoNSkpO1xuXG4gICAgLy8gVGhlblxuICAgIGV4cGVjdENESyhzdGFjaykudG8oaGF2ZVJlc291cmNlKFwiQVdTOjpMYW1iZGE6OkZ1bmN0aW9uXCIsIHtcbiAgICAgICAgVGltZW91dDogMzAwXG4gICAgfSkpO1xufSk7XG5cbnRlc3QoXCJTaG91bGQgdXNlIGJhdGNoU2l6ZSBzdXBwbGllZCBpbiBwcm9wZXJ0aWVzIGZvciBTUVMgUXVldWVcIiwgKCkgID0+IHtcbiAgICAvLyBHaXZlblxuICAgIGNvbnN0IHN0YWNrID0gbmV3IGNkay5TdGFjaygpO1xuXG4gICAgLy8gV2hlblxuICAgIGNyZWF0ZVdvcmtlcihzdGFjaywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgNyk7XG5cbiAgICAvLyBUaGVuXG4gICAgZXhwZWN0Q0RLKHN0YWNrKS50byhoYXZlUmVzb3VyY2UoXCJBV1M6OkxhbWJkYTo6RXZlbnRTb3VyY2VNYXBwaW5nXCIsIHtcbiAgICAgICAgQmF0Y2hTaXplOiA3XG4gICAgfSkpO1xufSk7XG5cbnRlc3QoXCJTaG91bGQgbm90IHBvcHVsYXRlIEVudmlyb25tZW50IHdpdGggZXh0cmFfc2VjdXJpdHlfZ3JvdXBzIHdoZW4gbm9uZSBzdXBwbGllZFwiLCAoKSA9PiB7XG4gICAgLy8gR2l2ZW5cbiAgICBjb25zdCBzdGFjayA9IG5ldyBjZGsuU3RhY2soKTtcblxuICAgIC8vIFdoZW5cbiAgICBjcmVhdGVXb3JrZXIoc3RhY2spOyAvLyBzZWNvbmQgYXJndW1lbnQgaXMgc2VjdXJpdHkgZ3JvdXBzXG5cbiAgICAvLyBUaGVuXG4gICAgZXhwZWN0TGFtYmRhRW52aXJvbm1lbnRDb250YWluc05vRXh0cmFTZWN1cml0eUdyb3VwcyhzdGFjayk7XG59KTtcblxudGVzdChcIlNob3VsZCBub3QgcG9wdWxhdGUgRW52aXJvbm1lbnQgd2l0aCBleHRyYV9zZWN1cml0eV9ncm91cHMgd2hlbiBlbXB0eSBzdHJpbmcgc3VwcGxpZWRcIiwgKCkgPT4ge1xuICAgIC8vIEdpdmVuXG4gICAgY29uc3Qgc3RhY2sgPSBuZXcgY2RrLlN0YWNrKCk7XG5cbiAgICAvLyBXaGVuXG4gICAgY3JlYXRlV29ya2VyKHN0YWNrLCBcIlwiKTsgLy8gc2Vjb25kIGFyZ3VtZW50IGlzIHNlY3VyaXR5IGdyb3Vwc1xuXG4gICAgLy8gVGhlblxuICAgIGV4cGVjdExhbWJkYUVudmlyb25tZW50Q29udGFpbnNOb0V4dHJhU2VjdXJpdHlHcm91cHMoc3RhY2spO1xufSk7XG5cbmZ1bmN0aW9uIGV4cGVjdExhbWJkYUVudmlyb25tZW50Q29udGFpbnNOb0V4dHJhU2VjdXJpdHlHcm91cHMoc3RhY2s6IGNkay5TdGFjaykge1xuICAgIGV4cGVjdENESyhzdGFjaykudG8oaGF2ZVJlc291cmNlKFwiQVdTOjpMYW1iZGE6OkZ1bmN0aW9uXCIsIHtcbiAgICAgICAgRW52aXJvbm1lbnQ6ICB7XG4gICAgICAgICAgICBcIlZhcmlhYmxlc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJjbHVzdGVyX25hbWVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcIlJlZlwiOiBcInRlc3RDbHVzdGVyRkY4MDYwMThcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJncmFwaF90YWJsZV9uYW1lXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJSZWZcIjogXCJ0ZXN0QUY1M0FDMzhcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKTtcbn1cblxudGVzdChcInNob3VsZCBhbGxvdyBsYW1iZGEgdG8gY29uc3VtZSBtZXNzYWdlcyBmcm9tIHF1ZXVlIGFuZCBkZXNjcmliZSBjbHVzdGVyXCIsICgpID0+IHtcbiAgICAvLyBHaXZlblxuICAgIGNvbnN0IHN0YWNrID0gbmV3IGNkay5TdGFjaygpO1xuXG4gICAgLy8gV2hlblxuICAgIGNyZWF0ZVdvcmtlcihzdGFjayk7XG5cbiAgICAvLyBUaGVuXG4gICAgZXhwZWN0Q0RLKHN0YWNrKS50byhoYXZlUmVzb3VyY2VMaWtlKFwiQVdTOjpJQU06OlBvbGljeVwiLCB7XG4gICAgICAgIFwiUG9saWN5RG9jdW1lbnRcIjoge1xuICAgICAgICAgICAgXCJTdGF0ZW1lbnRcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJBY3Rpb25cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcXM6UmVjZWl2ZU1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3FzOkNoYW5nZU1lc3NhZ2VWaXNpYmlsaXR5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNxczpHZXRRdWV1ZVVybFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcXM6RGVsZXRlTWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcXM6R2V0UXVldWVBdHRyaWJ1dGVzXCJcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgXCJFZmZlY3RcIjogXCJBbGxvd1wiLFxuICAgICAgICAgICAgICAgICAgICBcIlJlc291cmNlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRm46OkdldEF0dFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXN0UXVldWU2MDFCMEZDRFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXJuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcIkFjdGlvblwiOiBcImVrczpEZXNjcmliZUNsdXN0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJFZmZlY3RcIjogXCJBbGxvd1wiLFxuICAgICAgICAgICAgICAgICAgICBcIlJlc291cmNlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRm46OkdldEF0dFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXN0Q2x1c3RlckZGODA2MDE4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBcm5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfSkpO1xufSk7XG5cblxuIl19