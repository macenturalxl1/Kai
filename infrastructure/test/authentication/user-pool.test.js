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
const user_pool_1 = require("../../lib/authentication/user-pool");
test("Should create default UserPool and UserPoolClient", () => {
    // Given
    const stack = new cdk.Stack();
    // When
    new user_pool_1.KaiUserPool(stack, "TestUserPool");
    // Then
    assert_1.expect(stack).to(assert_1.haveResource("AWS::Cognito::UserPool", {
        "AdminCreateUserConfig": {
            "AllowAdminCreateUserOnly": true
        }
    }));
    assert_1.expect(stack).to(assert_1.haveResource("AWS::Cognito::UserPoolClient", {
        "UserPoolId": {
            "Ref": "TestUserPoolKaiUserPool8F9565E7"
        },
        "SupportedIdentityProviders": [
            "COGNITO"
        ]
    }));
});
const userPoolProps = {
    "autoVerify": {
        "email": true
    },
    "selfSignUpEnabled": true
};
const userPoolClientOptions = {
    "generateSecret": true,
    "userPoolClientName": "TestClientName"
};
const userPoolConfigurationWithUserPoolProps = {
    "defaultPoolConfig": {
        "userPoolProps": userPoolProps
    }
};
const userPoolConfigurationWithUserPoolClientOptions = {
    "defaultPoolConfig": {
        "userPoolClientOptions": userPoolClientOptions
    }
};
test("Should apply String UserPoolProps configuration to default User Pool", () => {
    expectUserPoolPropsToBeApplied(JSON.stringify(userPoolConfigurationWithUserPoolProps));
});
test("Should apply Object UserPoolProps configuration to default User Pool", () => {
    expectUserPoolPropsToBeApplied(userPoolConfigurationWithUserPoolProps);
});
function expectUserPoolPropsToBeApplied(userPoolConfiguration) {
    // Given
    const stack = new cdk.Stack();
    stack.node.setContext("userPoolConfiguration", userPoolConfiguration);
    // When
    new user_pool_1.KaiUserPool(stack, "TestUserPool");
    // Then
    assert_1.expect(stack).to(assert_1.haveResource("AWS::Cognito::UserPool", {
        "AdminCreateUserConfig": {
            "AllowAdminCreateUserOnly": false
        },
        "AutoVerifiedAttributes": [
            "email"
        ]
    }));
}
test("Should apply String UserPoolClientOptions to default User Pool Client", () => {
    expectUserPoolClientOptionsToBeApplied(JSON.stringify(userPoolConfigurationWithUserPoolClientOptions));
});
test("Should apply Object UserPoolClientOptions to default User Pool Client", () => {
    expectUserPoolClientOptionsToBeApplied(userPoolConfigurationWithUserPoolClientOptions);
});
function expectUserPoolClientOptionsToBeApplied(userPoolConfiguration) {
    // Given
    const stack = new cdk.Stack();
    stack.node.setContext("userPoolConfiguration", userPoolConfiguration);
    // When
    new user_pool_1.KaiUserPool(stack, "TestUserPool");
    // Then
    assert_1.expect(stack).to(assert_1.haveResource("AWS::Cognito::UserPoolClient", {
        "ClientName": "TestClientName",
        "GenerateSecret": true
    }));
}
const externalPool = {
    "userPoolId": "testUserPoolId",
    "userPoolClientId": "testUserPoolClientId"
};
const userPoolConfigurationForExternalPool = {
    "externalPool": externalPool
};
test("Should apply Object external pool configuration", () => {
    expectExternalPoolConfigToBeApplied(userPoolConfigurationForExternalPool);
});
test("Should apply String external pool configuration", () => {
    expectExternalPoolConfigToBeApplied(JSON.stringify(userPoolConfigurationForExternalPool));
});
function expectExternalPoolConfigToBeApplied(userPoolConfiguration) {
    // Given
    const stack = new cdk.Stack();
    stack.node.setContext("userPoolConfiguration", userPoolConfiguration);
    // When
    const userPool = new user_pool_1.KaiUserPool(stack, "TestUserPool");
    // Then
    expect(userPool.userPoolId).toBe(externalPool.userPoolId);
    expect(userPool.userPoolClientId).toBe(externalPool.userPoolClientId);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wb29sLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyLXBvb2wudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7O0dBY0c7O0FBRUgsNENBQW9FO0FBQ3BFLHFDQUFxQztBQUNyQyxrRUFBZ0U7QUFFaEUsSUFBSSxDQUFDLG1EQUFtRCxFQUFFLEdBQUcsRUFBRTtJQUMzRCxRQUFRO0lBQ1IsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFOUIsT0FBTztJQUNQLElBQUksdUJBQVcsQ0FBQyxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFFdkMsT0FBTztJQUNQLGVBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMscUJBQVksQ0FBQyx3QkFBd0IsRUFBRTtRQUN2RCx1QkFBdUIsRUFBRTtZQUNyQiwwQkFBMEIsRUFBRSxJQUFJO1NBQ25DO0tBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixlQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLHFCQUFZLENBQUMsOEJBQThCLEVBQUU7UUFDN0QsWUFBWSxFQUFFO1lBQ1YsS0FBSyxFQUFFLGlDQUFpQztTQUMzQztRQUNELDRCQUE0QixFQUFFO1lBQzFCLFNBQVM7U0FDWjtLQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ1IsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLGFBQWEsR0FBRztJQUNsQixZQUFZLEVBQUU7UUFDVixPQUFPLEVBQUUsSUFBSTtLQUNoQjtJQUNELG1CQUFtQixFQUFFLElBQUk7Q0FDNUIsQ0FBQztBQUVGLE1BQU0scUJBQXFCLEdBQUc7SUFDMUIsZ0JBQWdCLEVBQUUsSUFBSTtJQUN0QixvQkFBb0IsRUFBRSxnQkFBZ0I7Q0FDekMsQ0FBQztBQUVGLE1BQU0sc0NBQXNDLEdBQUc7SUFDM0MsbUJBQW1CLEVBQUU7UUFDakIsZUFBZSxFQUFFLGFBQWE7S0FDakM7Q0FDSixD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SSx1QkFBVyxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQztJQUVyRSxPQUFPO0lBQ1AsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzFELE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDMUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyMCBDcm93biBDb3B5cmlnaHRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHsgZXhwZWN0IGFzIGV4cGVjdENESywgaGF2ZVJlc291cmNlIH0gZnJvbSBcIkBhd3MtY2RrL2Fzc2VydFwiO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XG5pbXBvcnQgeyBLYWlVc2VyUG9vbH0gZnJvbSBcIi4uLy4uL2xpYi9hdXRoZW50aWNhdGlvbi91c2VyLXBvb2xcIjtcblxudGVzdChcIlNob3VsZCBjcmVhdGUgZGVmYXVsdCBVc2VyUG9vbCBhbmQgVXNlclBvb2xDbGllbnRcIiwgKCkgPT4ge1xuICAgIC8vIEdpdmVuXG4gICAgY29uc3Qgc3RhY2sgPSBuZXcgY2RrLlN0YWNrKCk7XG5cbiAgICAvLyBXaGVuXG4gICAgbmV3IEthaVVzZXJQb29sKHN0YWNrLCBcIlRlc3RVc2VyUG9vbFwiKTtcblxuICAgIC8vIFRoZW5cbiAgICBleHBlY3RDREsoc3RhY2spLnRvKGhhdmVSZXNvdXJjZShcIkFXUzo6Q29nbml0bzo6VXNlclBvb2xcIiwge1xuICAgICAgICBcIkFkbWluQ3JlYXRlVXNlckNvbmZpZ1wiOiB7XG4gICAgICAgICAgICBcIkFsbG93QWRtaW5DcmVhdGVVc2VyT25seVwiOiB0cnVlXG4gICAgICAgIH1cbiAgICB9KSk7XG4gICAgZXhwZWN0Q0RLKHN0YWNrKS50byhoYXZlUmVzb3VyY2UoXCJBV1M6OkNvZ25pdG86OlVzZXJQb29sQ2xpZW50XCIsIHtcbiAgICAgICAgXCJVc2VyUG9vbElkXCI6IHtcbiAgICAgICAgICAgIFwiUmVmXCI6IFwiVGVzdFVzZXJQb29sS2FpVXNlclBvb2w4Rjk1NjVFN1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiU3VwcG9ydGVkSWRlbnRpdHlQcm92aWRlcnNcIjogW1xuICAgICAgICAgICAgXCJDT0dOSVRPXCJcbiAgICAgICAgXVxuICAgIH0pKTtcbn0pO1xuXG5jb25zdCB1c2VyUG9vbFByb3BzID0ge1xuICAgIFwiYXV0b1ZlcmlmeVwiOiB7XG4gICAgICAgIFwiZW1haWxcIjogdHJ1ZVxuICAgIH0sXG4gICAgXCJzZWxmU2lnblVwRW5hYmxlZFwiOiB0cnVlXG59O1xuXG5jb25zdCB1c2VyUG9vbENsaWVudE9wdGlvbnMgPSB7XG4gICAgXCJnZW5lcmF0ZVNlY3JldFwiOiB0cnVlLFxuICAgIFwidXNlclBvb2xDbGllbnROYW1lXCI6IFwiVGVzdENsaWVudE5hbWVcIlxufTtcblxuY29uc3QgdXNlclBvb2xDb25maWd1cmF0aW9uV2l0aFVzZXJQb29sUHJvcHMgPSB7XG4gICAgXCJkZWZhdWx0UG9vbENvbmZpZ1wiOiB7XG4gICAgICAgIFwidXNlclBvb2xQcm9wc1wiOiB1c2VyUG9vbFByb3BzXG4gICAgfVxufTtcblxuY29uc3QgdXNlclBvb2xDb25maWd1cmF0aW9uV2l0aFVzZXJQb29sQ2xpZW50T3B0aW9ucyA9IHtcbiAgICBcImRlZmF1bHRQb29sQ29uZmlnXCI6IHtcbiAgICAgICAgXCJ1c2VyUG9vbENsaWVudE9wdGlvbnNcIjogdXNlclBvb2xDbGllbnRPcHRpb25zXG4gICAgfVxufTtcblxudGVzdChcIlNob3VsZCBhcHBseSBTdHJpbmcgVXNlclBvb2xQcm9wcyBjb25maWd1cmF0aW9uIHRvIGRlZmF1bHQgVXNlciBQb29sXCIsICgpID0+IHtcbiAgICBleHBlY3RVc2VyUG9vbFByb3BzVG9CZUFwcGxpZWQoSlNPTi5zdHJpbmdpZnkodXNlclBvb2xDb25maWd1cmF0aW9uV2l0aFVzZXJQb29sUHJvcHMpKTtcbn0pO1xuXG5cbnRlc3QoXCJTaG91bGQgYXBwbHkgT2JqZWN0IFVzZXJQb29sUHJvcHMgY29uZmlndXJhdGlvbiB0byBkZWZhdWx0IFVzZXIgUG9vbFwiLCAoKSA9PiB7XG4gICAgZXhwZWN0VXNlclBvb2xQcm9wc1RvQmVBcHBsaWVkKHVzZXJQb29sQ29uZmlndXJhdGlvbldpdGhVc2VyUG9vbFByb3BzKTtcbn0pO1xuXG5mdW5jdGlvbiBleHBlY3RVc2VyUG9vbFByb3BzVG9CZUFwcGxpZWQodXNlclBvb2xDb25maWd1cmF0aW9uOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IHN0cmluZykge1xuXG4gICAgLy8gR2l2ZW5cbiAgICBjb25zdCBzdGFjayA9IG5ldyBjZGsuU3RhY2soKTtcbiAgICBzdGFjay5ub2RlLnNldENvbnRleHQoXCJ1c2VyUG9vbENvbmZpZ3VyYXRpb25cIiwgdXNlclBvb2xDb25maWd1cmF0aW9uKTtcblxuICAgIC8vIFdoZW5cbiAgICBuZXcgS2FpVXNlclBvb2woc3RhY2ssIFwiVGVzdFVzZXJQb29sXCIpO1xuXG4gICAgLy8gVGhlblxuICAgIGV4cGVjdENESyhzdGFjaykudG8oaGF2ZVJlc291cmNlKFwiQVdTOjpDb2duaXRvOjpVc2VyUG9vbFwiLCB7XG4gICAgICAgIFwiQWRtaW5DcmVhdGVVc2VyQ29uZmlnXCI6IHtcbiAgICAgICAgICAgIFwiQWxsb3dBZG1pbkNyZWF0ZVVzZXJPbmx5XCI6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIFwiQXV0b1ZlcmlmaWVkQXR0cmlidXRlc1wiOiBbXG4gICAgICAgICAgICBcImVtYWlsXCJcbiAgICAgICAgXVxuICAgIH0pKTtcbn1cblxudGVzdChcIlNob3VsZCBhcHBseSBTdHJpbmcgVXNlclBvb2xDbGllbnRPcHRpb25zIHRvIGRlZmF1bHQgVXNlciBQb29sIENsaWVudFwiLCAoKSA9PiB7XG4gICAgZXhwZWN0VXNlclBvb2xDbGllbnRPcHRpb25zVG9CZUFwcGxpZWQoSlNPTi5zdHJpbmdpZnkodXNlclBvb2xDb25maWd1cmF0aW9uV2l0aFVzZXJQb29sQ2xpZW50T3B0aW9ucykpO1xufSk7XG5cblxudGVzdChcIlNob3VsZCBhcHBseSBPYmplY3QgVXNlclBvb2xDbGllbnRPcHRpb25zIHRvIGRlZmF1bHQgVXNlciBQb29sIENsaWVudFwiLCAoKSA9PiB7XG4gICAgZXhwZWN0VXNlclBvb2xDbGllbnRPcHRpb25zVG9CZUFwcGxpZWQodXNlclBvb2xDb25maWd1cmF0aW9uV2l0aFVzZXJQb29sQ2xpZW50T3B0aW9ucyk7XG59KTtcblxuZnVuY3Rpb24gZXhwZWN0VXNlclBvb2xDbGllbnRPcHRpb25zVG9CZUFwcGxpZWQodXNlclBvb2xDb25maWd1cmF0aW9uOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IHN0cmluZykge1xuXG4gICAgLy8gR2l2ZW5cbiAgICBjb25zdCBzdGFjayA9IG5ldyBjZGsuU3RhY2soKTtcbiAgICBzdGFjay5ub2RlLnNldENvbnRleHQoXCJ1c2VyUG9vbENvbmZpZ3VyYXRpb25cIiwgdXNlclBvb2xDb25maWd1cmF0aW9uKTtcblxuICAgIC8vIFdoZW5cbiAgICBuZXcgS2FpVXNlclBvb2woc3RhY2ssIFwiVGVzdFVzZXJQb29sXCIpO1xuXG4gICAgLy8gVGhlblxuICAgIGV4cGVjdENESyhzdGFjaykudG8oaGF2ZVJlc291cmNlKFwiQVdTOjpDb2duaXRvOjpVc2VyUG9vbENsaWVudFwiLCB7XG4gICAgICAgIFwiQ2xpZW50TmFtZVwiOiBcIlRlc3RDbGllbnROYW1lXCIsXG4gICAgICAgIFwiR2VuZXJhdGVTZWNyZXRcIjogdHJ1ZVxuICAgIH0pKTtcbn1cblxuY29uc3QgZXh0ZXJuYWxQb29sID0ge1xuICAgIFwidXNlclBvb2xJZFwiOiBcInRlc3RVc2VyUG9vbElkXCIsXG4gICAgXCJ1c2VyUG9vbENsaWVudElkXCI6IFwidGVzdFVzZXJQb29sQ2xpZW50SWRcIlxufTtcblxuY29uc3QgdXNlclBvb2xDb25maWd1cmF0aW9uRm9yRXh0ZXJuYWxQb29sID0ge1xuICAgIFwiZXh0ZXJuYWxQb29sXCI6IGV4dGVybmFsUG9vbFxufTtcblxudGVzdChcIlNob3VsZCBhcHBseSBPYmplY3QgZXh0ZXJuYWwgcG9vbCBjb25maWd1cmF0aW9uXCIsICgpID0+IHtcbiAgICBleHBlY3RFeHRlcm5hbFBvb2xDb25maWdUb0JlQXBwbGllZCh1c2VyUG9vbENvbmZpZ3VyYXRpb25Gb3JFeHRlcm5hbFBvb2wpO1xufSk7XG5cbnRlc3QoXCJTaG91bGQgYXBwbHkgU3RyaW5nIGV4dGVybmFsIHBvb2wgY29uZmlndXJhdGlvblwiLCAoKSA9PiB7XG4gICAgZXhwZWN0RXh0ZXJuYWxQb29sQ29uZmlnVG9CZUFwcGxpZWQoSlNPTi5zdHJpbmdpZnkodXNlclBvb2xDb25maWd1cmF0aW9uRm9yRXh0ZXJuYWxQb29sKSk7XG59KTtcblxuZnVuY3Rpb24gZXhwZWN0RXh0ZXJuYWxQb29sQ29uZmlnVG9CZUFwcGxpZWQodXNlclBvb2xDb25maWd1cmF0aW9uOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IHN0cmluZykge1xuXG4gICAgLy8gR2l2ZW5cbiAgICBjb25zdCBzdGFjayA9IG5ldyBjZGsuU3RhY2soKTtcbiAgICBzdGFjay5ub2RlLnNldENvbnRleHQoXCJ1c2VyUG9vbENvbmZpZ3VyYXRpb25cIiwgdXNlclBvb2xDb25maWd1cmF0aW9uKTtcblxuICAgIC8vIFdoZW5cbiAgICBjb25zdCB1c2VyUG9vbDogS2FpVXNlclBvb2wgPSBuZXcgS2FpVXNlclBvb2woc3RhY2ssIFwiVGVzdFVzZXJQb29sXCIpO1xuXG4gICAgLy8gVGhlblxuICAgIGV4cGVjdCh1c2VyUG9vbC51c2VyUG9vbElkKS50b0JlKGV4dGVybmFsUG9vbC51c2VyUG9vbElkKTtcbiAgICBleHBlY3QodXNlclBvb2wudXNlclBvb2xDbGllbnRJZCkudG9CZShleHRlcm5hbFBvb2wudXNlclBvb2xDbGllbnRJZCk7XG59XG4iXX0=