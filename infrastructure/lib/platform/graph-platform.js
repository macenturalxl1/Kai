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
exports.GraphPlatForm = void 0;
const cdk = require("@aws-cdk/core");
const eks = require("@aws-cdk/aws-eks");
const iam = require("@aws-cdk/aws-iam");
const ec2 = require("@aws-cdk/aws-ec2");
const alb_policy_statement_1 = require("./alb-policy-statement");
const node_group_config_1 = require("./node-group-config");
const aws_eks_1 = require("@aws-cdk/aws-eks");
class GraphPlatForm extends cdk.Construct {
    constructor(scope, id) {
        super(scope, id);
        // Get contextual values
        const vpcId = this.node.tryGetContext("vpcId");
        // Master role
        const mastersRole = new iam.Role(this, "MasterRole", {
            assumedBy: new iam.AccountRootPrincipal()
        });
        // VPC 
        let vpc;
        // if (vpcId != null) {
        //     // Use an existing vpc
        //     if (vpcId == GraphPlatForm.DEFAULT_VPC) {
        //         vpc = ec2.Vpc.fromLookup(this, "eksClusterVpc", {
        //             isDefault: true
        //         });
        //     } else {
        //         vpc = ec2.Vpc.fromLookup(this, "eksClusterVpc", {
        //             vpcId: vpcId
        //         });
        //     }
        // } else {
        // Create one
        // todo allow user to specify vpc properties
        vpc = new ec2.Vpc(this, "KaiVpc");
        // }
        // Create cluster
        this._eksCluster = new eks.Cluster(this, "EksCluster", {
            kubectlEnabled: true,
            vpc: vpc,
            mastersRole: mastersRole,
            defaultCapacity: 0,
            version: aws_eks_1.KubernetesVersion.V1_17,
        });
        // Create node group
        let unparsedRequestedNodeGroup = this.node.tryGetContext("clusterNodegroup");
        let nodeGroupOptions;
        if (unparsedRequestedNodeGroup != null) {
            // if it's a string (for example if passed from the command line), convert to object
            if (typeof unparsedRequestedNodeGroup == "string") {
                unparsedRequestedNodeGroup = JSON.parse(unparsedRequestedNodeGroup);
            }
            const requestedNodeGroup = node_group_config_1.NodeGroupConfig.fromConfig(unparsedRequestedNodeGroup);
            nodeGroupOptions = requestedNodeGroup.toNodeGroupOptions();
        }
        else {
            nodeGroupOptions = node_group_config_1.NodeGroupConfig.DEFAULT_NODE_GROUP;
        }
        this.eksCluster.addNodegroup("graphNodes", nodeGroupOptions).role.addToPolicy(alb_policy_statement_1.albPolicyStatement);
        // Add Ingress Controller
        const albServiceAccount = new eks.ServiceAccount(this, "ALBIngressController", {
            cluster: this.eksCluster,
            name: "alb-ingress-controller",
            namespace: "kube-system"
        });
        albServiceAccount.addToPolicy(alb_policy_statement_1.albPolicyStatement);
        this.eksCluster.addChart("ALBIngress", {
            chart: "aws-alb-ingress-controller",
            repository: "http://storage.googleapis.com/kubernetes-charts-incubator",
            release: "alb-ingress",
            version: "0.1.14",
            namespace: "kube-system",
            values: {
                autoDiscoverAwsRegion: true,
                autoDiscoverAwsVpcID: true,
                clusterName: this.eksCluster.clusterName,
                rbac: {
                    serviceAccount: {
                        name: albServiceAccount.serviceAccountName,
                        create: false
                    }
                }
            }
        });
    }
    get eksCluster() {
        return this._eksCluster;
    }
}
exports.GraphPlatForm = GraphPlatForm;
GraphPlatForm.DEFAULT_VPC = "DEFAULT";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGgtcGxhdGZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJncmFwaC1wbGF0Zm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7O0dBY0c7OztBQUVILHFDQUFxQztBQUNyQyx3Q0FBd0M7QUFDeEMsd0NBQXdDO0FBQ3hDLHdDQUF3QztBQUN4QyxpRUFBNEQ7QUFDNUQsMkRBQXNEO0FBQ3RELDhDQUFxRDtBQUdyRCxNQUFhLGFBQWMsU0FBUSxHQUFHLENBQUMsU0FBUztJQUs1QyxZQUFZLEtBQW9CLEVBQUUsRUFBVTtRQUN4QyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLHdCQUF3QjtRQUN4QixNQUFNLEtBQUssR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV2RCxjQUFjO1FBQ2QsTUFBTSxXQUFXLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDakQsU0FBUyxFQUFFLElBQUksR0FBRyxDQUFDLG9CQUFvQixFQUFFO1NBQzVDLENBQUMsQ0FBQztRQUVILE9BQU87UUFDUCxJQUFJLEdBQWEsQ0FBQztRQUNsQix1QkFBdUI7UUFDdkIsNkJBQTZCO1FBQzdCLGdEQUFnRDtRQUNoRCw0REFBNEQ7UUFDNUQsOEJBQThCO1FBQzlCLGNBQWM7UUFDZCxlQUFlO1FBQ2YsNERBQTREO1FBQzVELDJCQUEyQjtRQUMzQixjQUFjO1FBQ2QsUUFBUTtRQUNSLFdBQVc7UUFDUCxhQUFhO1FBQ2IsNENBQTRDO1FBQzVDLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLElBQUk7UUFFSixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNuRCxjQUFjLEVBQUUsSUFBSTtZQUNwQixHQUFHLEVBQUUsR0FBRztZQUNSLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLGVBQWUsRUFBRSxDQUFDO1lBQ2xCLE9BQU8sRUFBRSwyQkFBaUIsQ0FBQyxLQUFLO1NBQ25DLENBQUMsQ0FBQztRQUVILG9CQUFvQjtRQUVwQixJQUFJLDBCQUEwQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDN0UsSUFBSSxnQkFBc0MsQ0FBQztRQUMzQyxJQUFJLDBCQUEwQixJQUFJLElBQUksRUFBRTtZQUNwQyxvRkFBb0Y7WUFDcEYsSUFBSSxPQUFPLDBCQUEwQixJQUFJLFFBQVEsRUFBRTtnQkFDL0MsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2FBQ3ZFO1lBRUQsTUFBTSxrQkFBa0IsR0FBRyxtQ0FBZSxDQUFDLFVBQVUsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQ2xGLGdCQUFnQixHQUFHLGtCQUFrQixDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDOUQ7YUFBTTtZQUNILGdCQUFnQixHQUFHLG1DQUFlLENBQUMsa0JBQWtCLENBQUM7U0FDekQ7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLHlDQUFrQixDQUFDLENBQUM7UUFFbEcseUJBQXlCO1FBQ3pCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxzQkFBc0IsRUFBRTtZQUMzRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDeEIsSUFBSSxFQUFFLHdCQUF3QjtZQUM5QixTQUFTLEVBQUUsYUFBYTtTQUMzQixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxXQUFXLENBQUMseUNBQWtCLENBQUMsQ0FBQztRQUdsRCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDbkMsS0FBSyxFQUFFLDRCQUE0QjtZQUNuQyxVQUFVLEVBQUUsMkRBQTJEO1lBQ3ZFLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLE9BQU8sRUFBRSxRQUFRO1lBQ2pCLFNBQVMsRUFBRSxhQUFhO1lBQ3hCLE1BQU0sRUFBRTtnQkFDSixxQkFBcUIsRUFBRSxJQUFJO2dCQUMzQixvQkFBb0IsRUFBRSxJQUFJO2dCQUMxQixXQUFXLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXO2dCQUN4QyxJQUFJLEVBQUU7b0JBQ0YsY0FBYyxFQUFFO3dCQUNaLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxrQkFBa0I7d0JBQzFDLE1BQU0sRUFBRSxLQUFLO3FCQUNoQjtpQkFDSjthQUNKO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNqQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQzs7QUE5Rkwsc0NBK0ZDO0FBN0YyQix5QkFBVyxHQUFXLFNBQVMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyMCBDcm93biBDb3B5cmlnaHRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0ICogYXMgY2RrIGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XG5pbXBvcnQgKiBhcyBla3MgZnJvbSBcIkBhd3MtY2RrL2F3cy1la3NcIjtcbmltcG9ydCAqIGFzIGlhbSBmcm9tIFwiQGF3cy1jZGsvYXdzLWlhbVwiO1xuaW1wb3J0ICogYXMgZWMyIGZyb20gXCJAYXdzLWNkay9hd3MtZWMyXCI7XG5pbXBvcnQgeyBhbGJQb2xpY3lTdGF0ZW1lbnQgfSBmcm9tIFwiLi9hbGItcG9saWN5LXN0YXRlbWVudFwiO1xuaW1wb3J0IHsgTm9kZUdyb3VwQ29uZmlnIH0gZnJvbSBcIi4vbm9kZS1ncm91cC1jb25maWdcIjtcbmltcG9ydCB7IEt1YmVybmV0ZXNWZXJzaW9uIH0gZnJvbSBcIkBhd3MtY2RrL2F3cy1la3NcIjtcbmltcG9ydCB7IFN1Ym5ldFR5cGUgfSBmcm9tIFwiQGF3cy1jZGsvYXdzLWVjMlwiO1xuXG5leHBvcnQgY2xhc3MgR3JhcGhQbGF0Rm9ybSBleHRlbmRzIGNkay5Db25zdHJ1Y3Qge1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgREVGQVVMVF9WUEM6IHN0cmluZyA9IFwiREVGQVVMVFwiXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZWtzQ2x1c3RlcjogZWtzLkNsdXN0ZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgICAgIC8vIEdldCBjb250ZXh0dWFsIHZhbHVlc1xuICAgICAgICBjb25zdCB2cGNJZDogc3RyaW5nID0gdGhpcy5ub2RlLnRyeUdldENvbnRleHQoXCJ2cGNJZFwiKTtcblxuICAgICAgICAvLyBNYXN0ZXIgcm9sZVxuICAgICAgICBjb25zdCBtYXN0ZXJzUm9sZSA9IG5ldyBpYW0uUm9sZSh0aGlzLCBcIk1hc3RlclJvbGVcIiwge1xuICAgICAgICAgICAgYXNzdW1lZEJ5OiBuZXcgaWFtLkFjY291bnRSb290UHJpbmNpcGFsKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVlBDIFxuICAgICAgICBsZXQgdnBjOiBlYzIuSVZwYztcbiAgICAgICAgLy8gaWYgKHZwY0lkICE9IG51bGwpIHtcbiAgICAgICAgLy8gICAgIC8vIFVzZSBhbiBleGlzdGluZyB2cGNcbiAgICAgICAgLy8gICAgIGlmICh2cGNJZCA9PSBHcmFwaFBsYXRGb3JtLkRFRkFVTFRfVlBDKSB7XG4gICAgICAgIC8vICAgICAgICAgdnBjID0gZWMyLlZwYy5mcm9tTG9va3VwKHRoaXMsIFwiZWtzQ2x1c3RlclZwY1wiLCB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGlzRGVmYXVsdDogdHJ1ZVxuICAgICAgICAvLyAgICAgICAgIH0pO1xuICAgICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICB2cGMgPSBlYzIuVnBjLmZyb21Mb29rdXAodGhpcywgXCJla3NDbHVzdGVyVnBjXCIsIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgdnBjSWQ6IHZwY0lkXG4gICAgICAgIC8vICAgICAgICAgfSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgb25lXG4gICAgICAgICAgICAvLyB0b2RvIGFsbG93IHVzZXIgdG8gc3BlY2lmeSB2cGMgcHJvcGVydGllc1xuICAgICAgICAgICAgdnBjID0gbmV3IGVjMi5WcGModGhpcywgXCJLYWlWcGNcIik7XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyBDcmVhdGUgY2x1c3RlclxuICAgICAgICB0aGlzLl9la3NDbHVzdGVyID0gbmV3IGVrcy5DbHVzdGVyKHRoaXMsIFwiRWtzQ2x1c3RlclwiLCB7XG4gICAgICAgICAgICBrdWJlY3RsRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHZwYzogdnBjLFxuICAgICAgICAgICAgbWFzdGVyc1JvbGU6IG1hc3RlcnNSb2xlLFxuICAgICAgICAgICAgZGVmYXVsdENhcGFjaXR5OiAwLFxuICAgICAgICAgICAgdmVyc2lvbjogS3ViZXJuZXRlc1ZlcnNpb24uVjFfMTcsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENyZWF0ZSBub2RlIGdyb3VwXG4gICAgICAgIFxuICAgICAgICBsZXQgdW5wYXJzZWRSZXF1ZXN0ZWROb2RlR3JvdXAgPSB0aGlzLm5vZGUudHJ5R2V0Q29udGV4dChcImNsdXN0ZXJOb2RlZ3JvdXBcIik7XG4gICAgICAgIGxldCBub2RlR3JvdXBPcHRpb25zOiBla3MuTm9kZWdyb3VwT3B0aW9ucztcbiAgICAgICAgaWYgKHVucGFyc2VkUmVxdWVzdGVkTm9kZUdyb3VwICE9IG51bGwpIHtcbiAgICAgICAgICAgIC8vIGlmIGl0J3MgYSBzdHJpbmcgKGZvciBleGFtcGxlIGlmIHBhc3NlZCBmcm9tIHRoZSBjb21tYW5kIGxpbmUpLCBjb252ZXJ0IHRvIG9iamVjdFxuICAgICAgICAgICAgaWYgKHR5cGVvZiB1bnBhcnNlZFJlcXVlc3RlZE5vZGVHcm91cCA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgdW5wYXJzZWRSZXF1ZXN0ZWROb2RlR3JvdXAgPSBKU09OLnBhcnNlKHVucGFyc2VkUmVxdWVzdGVkTm9kZUdyb3VwKTtcbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3RlZE5vZGVHcm91cCA9IE5vZGVHcm91cENvbmZpZy5mcm9tQ29uZmlnKHVucGFyc2VkUmVxdWVzdGVkTm9kZUdyb3VwKTtcbiAgICAgICAgICAgIG5vZGVHcm91cE9wdGlvbnMgPSByZXF1ZXN0ZWROb2RlR3JvdXAudG9Ob2RlR3JvdXBPcHRpb25zKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlR3JvdXBPcHRpb25zID0gTm9kZUdyb3VwQ29uZmlnLkRFRkFVTFRfTk9ERV9HUk9VUDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZWtzQ2x1c3Rlci5hZGROb2RlZ3JvdXAoXCJncmFwaE5vZGVzXCIsIG5vZGVHcm91cE9wdGlvbnMpLnJvbGUuYWRkVG9Qb2xpY3koYWxiUG9saWN5U3RhdGVtZW50KTtcblxuICAgICAgICAvLyBBZGQgSW5ncmVzcyBDb250cm9sbGVyXG4gICAgICAgIGNvbnN0IGFsYlNlcnZpY2VBY2NvdW50ID0gbmV3IGVrcy5TZXJ2aWNlQWNjb3VudCh0aGlzLCBcIkFMQkluZ3Jlc3NDb250cm9sbGVyXCIsIHtcbiAgICAgICAgICAgIGNsdXN0ZXI6IHRoaXMuZWtzQ2x1c3RlcixcbiAgICAgICAgICAgIG5hbWU6IFwiYWxiLWluZ3Jlc3MtY29udHJvbGxlclwiLFxuICAgICAgICAgICAgbmFtZXNwYWNlOiBcImt1YmUtc3lzdGVtXCJcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBhbGJTZXJ2aWNlQWNjb3VudC5hZGRUb1BvbGljeShhbGJQb2xpY3lTdGF0ZW1lbnQpO1xuXG5cbiAgICAgICAgdGhpcy5la3NDbHVzdGVyLmFkZENoYXJ0KFwiQUxCSW5ncmVzc1wiLCB7XG4gICAgICAgICAgICBjaGFydDogXCJhd3MtYWxiLWluZ3Jlc3MtY29udHJvbGxlclwiLFxuICAgICAgICAgICAgcmVwb3NpdG9yeTogXCJodHRwOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9rdWJlcm5ldGVzLWNoYXJ0cy1pbmN1YmF0b3JcIixcbiAgICAgICAgICAgIHJlbGVhc2U6IFwiYWxiLWluZ3Jlc3NcIixcbiAgICAgICAgICAgIHZlcnNpb246IFwiMC4xLjE0XCIsXG4gICAgICAgICAgICBuYW1lc3BhY2U6IFwia3ViZS1zeXN0ZW1cIixcbiAgICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgICAgIGF1dG9EaXNjb3ZlckF3c1JlZ2lvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhdXRvRGlzY292ZXJBd3NWcGNJRDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjbHVzdGVyTmFtZTogdGhpcy5la3NDbHVzdGVyLmNsdXN0ZXJOYW1lLFxuICAgICAgICAgICAgICAgIHJiYWM6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZUFjY291bnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGFsYlNlcnZpY2VBY2NvdW50LnNlcnZpY2VBY2NvdW50TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZTogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBla3NDbHVzdGVyKCk6IGVrcy5DbHVzdGVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Vrc0NsdXN0ZXI7XG4gICAgfVxufSJdfQ==