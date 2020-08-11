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
exports.albPolicyStatement = void 0;
const aws_iam_1 = require("@aws-cdk/aws-iam");
exports.albPolicyStatement = new aws_iam_1.PolicyStatement({
    resources: ["*"],
    actions: [
        "acm:DescribeCertificate",
        "acm:ListCertificates",
        "acm:GetCertificate",
        "ec2:AuthorizeSecurityGroupIngress",
        "ec2:CreateSecurityGroup",
        "ec2:CreateTags",
        "ec2:DeleteTags",
        "ec2:DeleteSecurityGroup",
        "ec2:DescribeAccountAttributes",
        "ec2:DescribeAddresses",
        "ec2:DescribeInstances",
        "ec2:DescribeInstanceStatus",
        "ec2:DescribeInternetGateways",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeSubnets",
        "ec2:DescribeTags",
        "ec2:DescribeVpcs",
        "ec2:ModifyInstanceAttribute",
        "ec2:ModifyNetworkInterfaceAttribute",
        "ec2:RevokeSecurityGroupIngress",
        "elasticloadbalancing:AddListenerCertificates",
        "elasticloadbalancing:AddTags",
        "elasticloadbalancing:CreateListener",
        "elasticloadbalancing:CreateLoadBalancer",
        "elasticloadbalancing:CreateRule",
        "elasticloadbalancing:CreateTargetGroup",
        "elasticloadbalancing:DeleteListener",
        "elasticloadbalancing:DeleteLoadBalancer",
        "elasticloadbalancing:DeleteRule",
        "elasticloadbalancing:DeleteTargetGroup",
        "elasticloadbalancing:DeregisterTargets",
        "elasticloadbalancing:DescribeListenerCertificates",
        "elasticloadbalancing:DescribeListeners",
        "elasticloadbalancing:DescribeLoadBalancers",
        "elasticloadbalancing:DescribeLoadBalancerAttributes",
        "elasticloadbalancing:DescribeRules",
        "elasticloadbalancing:DescribeSSLPolicies",
        "elasticloadbalancing:DescribeTags",
        "elasticloadbalancing:DescribeTargetGroups",
        "elasticloadbalancing:DescribeTargetGroupAttributes",
        "elasticloadbalancing:DescribeTargetHealth",
        "elasticloadbalancing:ModifyListener",
        "elasticloadbalancing:ModifyLoadBalancerAttributes",
        "elasticloadbalancing:ModifyRule",
        "elasticloadbalancing:ModifyTargetGroup",
        "elasticloadbalancing:ModifyTargetGroupAttributes",
        "elasticloadbalancing:RegisterTargets",
        "elasticloadbalancing:RemoveListenerCertificates",
        "elasticloadbalancing:RemoveTags",
        "elasticloadbalancing:SetIpAddressType",
        "elasticloadbalancing:SetSecurityGroups",
        "elasticloadbalancing:SetSubnets",
        "elasticloadbalancing:SetWebACL",
        "iam:CreateServiceLinkedRole",
        "iam:GetServerCertificate",
        "iam:ListServerCertificates",
        "waf:GetWebACL",
        "waf-regional:GetWebACLForResource",
        "waf-regional:GetWebACL",
        "waf-regional:AssociateWebACL",
        "waf-regional:DisassociateWebACL",
        "tag:GetResources",
        "tag:TagResources"
    ]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxiLXBvbGljeS1zdGF0ZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbGItcG9saWN5LXN0YXRlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7O0dBY0c7OztBQUVILDhDQUFtRDtBQUV0QyxRQUFBLGtCQUFrQixHQUFvQixJQUFJLHlCQUFlLENBQUM7SUFDbkUsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDO0lBQ2hCLE9BQU8sRUFBRTtRQUNMLHlCQUF5QjtRQUN6QixzQkFBc0I7UUFDdEIsb0JBQW9CO1FBQ3BCLG1DQUFtQztRQUNuQyx5QkFBeUI7UUFDekIsZ0JBQWdCO1FBQ2hCLGdCQUFnQjtRQUNoQix5QkFBeUI7UUFDekIsK0JBQStCO1FBQy9CLHVCQUF1QjtRQUN2Qix1QkFBdUI7UUFDdkIsNEJBQTRCO1FBQzVCLDhCQUE4QjtRQUM5QiwrQkFBK0I7UUFDL0IsNEJBQTRCO1FBQzVCLHFCQUFxQjtRQUNyQixrQkFBa0I7UUFDbEIsa0JBQWtCO1FBQ2xCLDZCQUE2QjtRQUM3QixxQ0FBcUM7UUFDckMsZ0NBQWdDO1FBQ2hDLDhDQUE4QztRQUM5Qyw4QkFBOEI7UUFDOUIscUNBQXFDO1FBQ3JDLHlDQUF5QztRQUN6QyxpQ0FBaUM7UUFDakMsd0NBQXdDO1FBQ3hDLHFDQUFxQztRQUNyQyx5Q0FBeUM7UUFDekMsaUNBQWlDO1FBQ2pDLHdDQUF3QztRQUN4Qyx3Q0FBd0M7UUFDeEMsbURBQW1EO1FBQ25ELHdDQUF3QztRQUN4Qyw0Q0FBNEM7UUFDNUMscURBQXFEO1FBQ3JELG9DQUFvQztRQUNwQywwQ0FBMEM7UUFDMUMsbUNBQW1DO1FBQ25DLDJDQUEyQztRQUMzQyxvREFBb0Q7UUFDcEQsMkNBQTJDO1FBQzNDLHFDQUFxQztRQUNyQyxtREFBbUQ7UUFDbkQsaUNBQWlDO1FBQ2pDLHdDQUF3QztRQUN4QyxrREFBa0Q7UUFDbEQsc0NBQXNDO1FBQ3RDLGlEQUFpRDtRQUNqRCxpQ0FBaUM7UUFDakMsdUNBQXVDO1FBQ3ZDLHdDQUF3QztRQUN4QyxpQ0FBaUM7UUFDakMsZ0NBQWdDO1FBQ2hDLDZCQUE2QjtRQUM3QiwwQkFBMEI7UUFDMUIsNEJBQTRCO1FBQzVCLGVBQWU7UUFDZixtQ0FBbUM7UUFDbkMsd0JBQXdCO1FBQ3hCLDhCQUE4QjtRQUM5QixpQ0FBaUM7UUFDakMsa0JBQWtCO1FBQ2xCLGtCQUFrQjtLQUNyQjtDQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyMCBDcm93biBDb3B5cmlnaHRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHsgUG9saWN5U3RhdGVtZW50IH0gZnJvbSBcIkBhd3MtY2RrL2F3cy1pYW1cIjtcblxuZXhwb3J0IGNvbnN0IGFsYlBvbGljeVN0YXRlbWVudDogUG9saWN5U3RhdGVtZW50ID0gbmV3IFBvbGljeVN0YXRlbWVudCh7XG4gICAgcmVzb3VyY2VzOiBbXCIqXCJdLFxuICAgIGFjdGlvbnM6IFtcbiAgICAgICAgXCJhY206RGVzY3JpYmVDZXJ0aWZpY2F0ZVwiLFxuICAgICAgICBcImFjbTpMaXN0Q2VydGlmaWNhdGVzXCIsXG4gICAgICAgIFwiYWNtOkdldENlcnRpZmljYXRlXCIsXG4gICAgICAgIFwiZWMyOkF1dGhvcml6ZVNlY3VyaXR5R3JvdXBJbmdyZXNzXCIsXG4gICAgICAgIFwiZWMyOkNyZWF0ZVNlY3VyaXR5R3JvdXBcIixcbiAgICAgICAgXCJlYzI6Q3JlYXRlVGFnc1wiLFxuICAgICAgICBcImVjMjpEZWxldGVUYWdzXCIsXG4gICAgICAgIFwiZWMyOkRlbGV0ZVNlY3VyaXR5R3JvdXBcIixcbiAgICAgICAgXCJlYzI6RGVzY3JpYmVBY2NvdW50QXR0cmlidXRlc1wiLFxuICAgICAgICBcImVjMjpEZXNjcmliZUFkZHJlc3Nlc1wiLFxuICAgICAgICBcImVjMjpEZXNjcmliZUluc3RhbmNlc1wiLFxuICAgICAgICBcImVjMjpEZXNjcmliZUluc3RhbmNlU3RhdHVzXCIsXG4gICAgICAgIFwiZWMyOkRlc2NyaWJlSW50ZXJuZXRHYXRld2F5c1wiLFxuICAgICAgICBcImVjMjpEZXNjcmliZU5ldHdvcmtJbnRlcmZhY2VzXCIsXG4gICAgICAgIFwiZWMyOkRlc2NyaWJlU2VjdXJpdHlHcm91cHNcIixcbiAgICAgICAgXCJlYzI6RGVzY3JpYmVTdWJuZXRzXCIsXG4gICAgICAgIFwiZWMyOkRlc2NyaWJlVGFnc1wiLFxuICAgICAgICBcImVjMjpEZXNjcmliZVZwY3NcIixcbiAgICAgICAgXCJlYzI6TW9kaWZ5SW5zdGFuY2VBdHRyaWJ1dGVcIixcbiAgICAgICAgXCJlYzI6TW9kaWZ5TmV0d29ya0ludGVyZmFjZUF0dHJpYnV0ZVwiLFxuICAgICAgICBcImVjMjpSZXZva2VTZWN1cml0eUdyb3VwSW5ncmVzc1wiLFxuICAgICAgICBcImVsYXN0aWNsb2FkYmFsYW5jaW5nOkFkZExpc3RlbmVyQ2VydGlmaWNhdGVzXCIsXG4gICAgICAgIFwiZWxhc3RpY2xvYWRiYWxhbmNpbmc6QWRkVGFnc1wiLFxuICAgICAgICBcImVsYXN0aWNsb2FkYmFsYW5jaW5nOkNyZWF0ZUxpc3RlbmVyXCIsXG4gICAgICAgIFwiZWxhc3RpY2xvYWRiYWxhbmNpbmc6Q3JlYXRlTG9hZEJhbGFuY2VyXCIsXG4gICAgICAgIFwiZWxhc3RpY2xvYWRiYWxhbmNpbmc6Q3JlYXRlUnVsZVwiLFxuICAgICAgICBcImVsYXN0aWNsb2FkYmFsYW5jaW5nOkNyZWF0ZVRhcmdldEdyb3VwXCIsXG4gICAgICAgIFwiZWxhc3RpY2xvYWRiYWxhbmNpbmc6RGVsZXRlTGlzdGVuZXJcIixcbiAgICAgICAgXCJlbGFzdGljbG9hZGJhbGFuY2luZzpEZWxldGVMb2FkQmFsYW5jZXJcIixcbiAgICAgICAgXCJlbGFzdGljbG9hZGJhbGFuY2luZzpEZWxldGVSdWxlXCIsXG4gICAgICAgIFwiZWxhc3RpY2xvYWRiYWxhbmNpbmc6RGVsZXRlVGFyZ2V0R3JvdXBcIixcbiAgICAgICAgXCJlbGFzdGljbG9hZGJhbGFuY2luZzpEZXJlZ2lzdGVyVGFyZ2V0c1wiLFxuICAgICAgICBcImVsYXN0aWNsb2FkYmFsYW5jaW5nOkRlc2NyaWJlTGlzdGVuZXJDZXJ0aWZpY2F0ZXNcIixcbiAgICAgICAgXCJlbGFzdGljbG9hZGJhbGFuY2luZzpEZXNjcmliZUxpc3RlbmVyc1wiLFxuICAgICAgICBcImVsYXN0aWNsb2FkYmFsYW5jaW5nOkRlc2NyaWJlTG9hZEJhbGFuY2Vyc1wiLFxuICAgICAgICBcImVsYXN0aWNsb2FkYmFsYW5jaW5nOkRlc2NyaWJlTG9hZEJhbGFuY2VyQXR0cmlidXRlc1wiLFxuICAgICAgICBcImVsYXN0aWNsb2FkYmFsYW5jaW5nOkRlc2NyaWJlUnVsZXNcIixcbiAgICAgICAgXCJlbGFzdGljbG9hZGJhbGFuY2luZzpEZXNjcmliZVNTTFBvbGljaWVzXCIsXG4gICAgICAgIFwiZWxhc3RpY2xvYWRiYWxhbmNpbmc6RGVzY3JpYmVUYWdzXCIsXG4gICAgICAgIFwiZWxhc3RpY2xvYWRiYWxhbmNpbmc6RGVzY3JpYmVUYXJnZXRHcm91cHNcIixcbiAgICAgICAgXCJlbGFzdGljbG9hZGJhbGFuY2luZzpEZXNjcmliZVRhcmdldEdyb3VwQXR0cmlidXRlc1wiLFxuICAgICAgICBcImVsYXN0aWNsb2FkYmFsYW5jaW5nOkRlc2NyaWJlVGFyZ2V0SGVhbHRoXCIsXG4gICAgICAgIFwiZWxhc3RpY2xvYWRiYWxhbmNpbmc6TW9kaWZ5TGlzdGVuZXJcIixcbiAgICAgICAgXCJlbGFzdGljbG9hZGJhbGFuY2luZzpNb2RpZnlMb2FkQmFsYW5jZXJBdHRyaWJ1dGVzXCIsXG4gICAgICAgIFwiZWxhc3RpY2xvYWRiYWxhbmNpbmc6TW9kaWZ5UnVsZVwiLFxuICAgICAgICBcImVsYXN0aWNsb2FkYmFsYW5jaW5nOk1vZGlmeVRhcmdldEdyb3VwXCIsXG4gICAgICAgIFwiZWxhc3RpY2xvYWRiYWxhbmNpbmc6TW9kaWZ5VGFyZ2V0R3JvdXBBdHRyaWJ1dGVzXCIsXG4gICAgICAgIFwiZWxhc3RpY2xvYWRiYWxhbmNpbmc6UmVnaXN0ZXJUYXJnZXRzXCIsXG4gICAgICAgIFwiZWxhc3RpY2xvYWRiYWxhbmNpbmc6UmVtb3ZlTGlzdGVuZXJDZXJ0aWZpY2F0ZXNcIixcbiAgICAgICAgXCJlbGFzdGljbG9hZGJhbGFuY2luZzpSZW1vdmVUYWdzXCIsXG4gICAgICAgIFwiZWxhc3RpY2xvYWRiYWxhbmNpbmc6U2V0SXBBZGRyZXNzVHlwZVwiLFxuICAgICAgICBcImVsYXN0aWNsb2FkYmFsYW5jaW5nOlNldFNlY3VyaXR5R3JvdXBzXCIsXG4gICAgICAgIFwiZWxhc3RpY2xvYWRiYWxhbmNpbmc6U2V0U3VibmV0c1wiLFxuICAgICAgICBcImVsYXN0aWNsb2FkYmFsYW5jaW5nOlNldFdlYkFDTFwiLFxuICAgICAgICBcImlhbTpDcmVhdGVTZXJ2aWNlTGlua2VkUm9sZVwiLFxuICAgICAgICBcImlhbTpHZXRTZXJ2ZXJDZXJ0aWZpY2F0ZVwiLFxuICAgICAgICBcImlhbTpMaXN0U2VydmVyQ2VydGlmaWNhdGVzXCIsXG4gICAgICAgIFwid2FmOkdldFdlYkFDTFwiLFxuICAgICAgICBcIndhZi1yZWdpb25hbDpHZXRXZWJBQ0xGb3JSZXNvdXJjZVwiLFxuICAgICAgICBcIndhZi1yZWdpb25hbDpHZXRXZWJBQ0xcIixcbiAgICAgICAgXCJ3YWYtcmVnaW9uYWw6QXNzb2NpYXRlV2ViQUNMXCIsXG4gICAgICAgIFwid2FmLXJlZ2lvbmFsOkRpc2Fzc29jaWF0ZVdlYkFDTFwiLFxuICAgICAgICBcInRhZzpHZXRSZXNvdXJjZXNcIixcbiAgICAgICAgXCJ0YWc6VGFnUmVzb3VyY2VzXCJcbiAgICBdXG59KTsiXX0=