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
const core_1 = require("@aws-cdk/core");
const graph_database_1 = require("../../lib/database/graph-database");
const assert_1 = require("@aws-cdk/assert");
function createDB(stack, minCapacity = 1, maxCapacity = 25, targetUtilization = 80) {
    return new graph_database_1.GraphDatabase(stack, "TestDB", {
        maxCapacity: maxCapacity,
        minCapacity: minCapacity,
        targetUtilizationPercent: targetUtilization
    });
}
test("should create a database", () => {
    // Given
    const stack = new core_1.Stack();
    // When
    createDB(stack);
    // Then
    assert_1.expect(stack).to(assert_1.haveResource("AWS::DynamoDB::Table"));
});
test("should use the graphId as a primary key", () => {
    // Given
    const stack = new core_1.Stack();
    // When
    createDB(stack);
    // Then
    assert_1.expect(stack).to(assert_1.haveResource("AWS::DynamoDB::Table", {
        "KeySchema": [
            {
                "AttributeName": "graphId",
                "KeyType": "HASH"
            }
        ],
        "AttributeDefinitions": [
            {
                "AttributeName": "graphId",
                "AttributeType": "S"
            }
        ]
    }));
});
test("should be able to pass in the autoscaling properties", () => {
    // Given
    const stack = new core_1.Stack();
    // When
    createDB(stack, 3, 300, 50);
    // Then
    assert_1.expect(stack).to(assert_1.haveResource("AWS::ApplicationAutoScaling::ScalableTarget", {
        MaxCapacity: 300,
        MinCapacity: 3
    }));
    assert_1.expect(stack).to(assert_1.haveResource("AWS::ApplicationAutoScaling::ScalingPolicy", {
        "TargetTrackingScalingPolicyConfiguration": {
            "PredefinedMetricSpecification": {
                "PredefinedMetricType": "DynamoDBReadCapacityUtilization"
            },
            "TargetValue": 50
        }
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGgtZGF0YWJhc2UudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdyYXBoLWRhdGFiYXNlLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7OztHQWNHOztBQUVILHdDQUFzQztBQUN0QyxzRUFBa0U7QUFDbEUsNENBQW9FO0FBRXBFLFNBQVMsUUFBUSxDQUFDLEtBQVksRUFBRSxXQUFXLEdBQUcsQ0FBQyxFQUFFLFdBQVcsR0FBQyxFQUFFLEVBQUUsaUJBQWlCLEdBQUcsRUFBRTtJQUNuRixPQUFPLElBQUksOEJBQWEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFO1FBQ3RDLFdBQVcsRUFBRSxXQUFXO1FBQ3hCLFdBQVcsRUFBRSxXQUFXO1FBQ3hCLHdCQUF3QixFQUFFLGlCQUFpQjtLQUM5QyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsSUFBSSxDQUFDLDBCQUEwQixFQUFFLEdBQUcsRUFBRTtJQUNsQyxRQUFRO0lBQ1IsTUFBTSxLQUFLLEdBQUcsSUFBSSxZQUFLLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBQ1AsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWhCLE9BQU87SUFDUCxlQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLHFCQUFZLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO0FBQzlELENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLHlDQUF5QyxFQUFFLEdBQUcsRUFBRTtJQUNqRCxRQUFRO0lBQ1IsTUFBTSxLQUFLLEdBQUcsSUFBSSxZQUFLLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBQ1AsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWhCLE9BQU87SUFDUCxlQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLHFCQUFZLENBQUMsc0JBQXNCLEVBQUU7UUFDckQsV0FBVyxFQUFFO1lBQ1Q7Z0JBQ0ksZUFBZSxFQUFFLFNBQVM7Z0JBQzFCLFNBQVMsRUFBRSxNQUFNO2FBQ3BCO1NBQ0o7UUFDRCxzQkFBc0IsRUFBRTtZQUNwQjtnQkFDSSxlQUFlLEVBQUUsU0FBUztnQkFDMUIsZUFBZSxFQUFFLEdBQUc7YUFDdkI7U0FDSjtLQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ1IsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsc0RBQXNELEVBQUUsR0FBRyxFQUFFO0lBQzlELFFBQVE7SUFDUixNQUFNLEtBQUssR0FBRyxJQUFJLFlBQUssRUFBRSxDQUFDO0lBRTFCLE9BQU87SUFDUCxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFNUIsT0FBTztJQUNQLGVBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMscUJBQVksQ0FBQyw2Q0FBNkMsRUFBRTtRQUM1RSxXQUFXLEVBQUUsR0FBRztRQUNoQixXQUFXLEVBQUUsQ0FBQztLQUNqQixDQUFDLENBQUMsQ0FBQztJQUVKLGVBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMscUJBQVksQ0FBQyw0Q0FBNEMsRUFBRTtRQUMzRSwwQ0FBMEMsRUFBRTtZQUN4QywrQkFBK0IsRUFBRTtnQkFDN0Isc0JBQXNCLEVBQUUsaUNBQWlDO2FBQzVEO1lBQ0QsYUFBYSxFQUFFLEVBQUU7U0FDcEI7S0FDSixDQUFDLENBQUMsQ0FBQztBQUNSLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIwIENyb3duIENvcHlyaWdodFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgeyBTdGFjayB9IGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XG5pbXBvcnQgeyBHcmFwaERhdGFiYXNlIH0gZnJvbSBcIi4uLy4uL2xpYi9kYXRhYmFzZS9ncmFwaC1kYXRhYmFzZVwiO1xuaW1wb3J0IHsgZXhwZWN0IGFzIGV4cGVjdENESywgaGF2ZVJlc291cmNlIH0gZnJvbSBcIkBhd3MtY2RrL2Fzc2VydFwiO1xuXG5mdW5jdGlvbiBjcmVhdGVEQihzdGFjazogU3RhY2ssIG1pbkNhcGFjaXR5ID0gMSwgbWF4Q2FwYWNpdHk9MjUsIHRhcmdldFV0aWxpemF0aW9uID0gODApIHtcbiAgICByZXR1cm4gbmV3IEdyYXBoRGF0YWJhc2Uoc3RhY2ssIFwiVGVzdERCXCIsIHtcbiAgICAgICAgbWF4Q2FwYWNpdHk6IG1heENhcGFjaXR5LFxuICAgICAgICBtaW5DYXBhY2l0eTogbWluQ2FwYWNpdHksXG4gICAgICAgIHRhcmdldFV0aWxpemF0aW9uUGVyY2VudDogdGFyZ2V0VXRpbGl6YXRpb25cbiAgICB9KTtcbn1cblxudGVzdChcInNob3VsZCBjcmVhdGUgYSBkYXRhYmFzZVwiLCAoKSA9PiB7XG4gICAgLy8gR2l2ZW5cbiAgICBjb25zdCBzdGFjayA9IG5ldyBTdGFjaygpO1xuXG4gICAgLy8gV2hlblxuICAgIGNyZWF0ZURCKHN0YWNrKTtcblxuICAgIC8vIFRoZW5cbiAgICBleHBlY3RDREsoc3RhY2spLnRvKGhhdmVSZXNvdXJjZShcIkFXUzo6RHluYW1vREI6OlRhYmxlXCIpKTtcbn0pO1xuXG50ZXN0KFwic2hvdWxkIHVzZSB0aGUgZ3JhcGhJZCBhcyBhIHByaW1hcnkga2V5XCIsICgpID0+IHtcbiAgICAvLyBHaXZlblxuICAgIGNvbnN0IHN0YWNrID0gbmV3IFN0YWNrKCk7XG5cbiAgICAvLyBXaGVuXG4gICAgY3JlYXRlREIoc3RhY2spO1xuXG4gICAgLy8gVGhlblxuICAgIGV4cGVjdENESyhzdGFjaykudG8oaGF2ZVJlc291cmNlKFwiQVdTOjpEeW5hbW9EQjo6VGFibGVcIiwge1xuICAgICAgICBcIktleVNjaGVtYVwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJBdHRyaWJ1dGVOYW1lXCI6IFwiZ3JhcGhJZFwiLFxuICAgICAgICAgICAgICAgIFwiS2V5VHlwZVwiOiBcIkhBU0hcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcIkF0dHJpYnV0ZURlZmluaXRpb25zXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIkF0dHJpYnV0ZU5hbWVcIjogXCJncmFwaElkXCIsXG4gICAgICAgICAgICAgICAgXCJBdHRyaWJ1dGVUeXBlXCI6IFwiU1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KSk7XG59KTtcblxudGVzdChcInNob3VsZCBiZSBhYmxlIHRvIHBhc3MgaW4gdGhlIGF1dG9zY2FsaW5nIHByb3BlcnRpZXNcIiwgKCkgPT4ge1xuICAgIC8vIEdpdmVuXG4gICAgY29uc3Qgc3RhY2sgPSBuZXcgU3RhY2soKTtcblxuICAgIC8vIFdoZW5cbiAgICBjcmVhdGVEQihzdGFjaywgMywgMzAwLCA1MCk7XG5cbiAgICAvLyBUaGVuXG4gICAgZXhwZWN0Q0RLKHN0YWNrKS50byhoYXZlUmVzb3VyY2UoXCJBV1M6OkFwcGxpY2F0aW9uQXV0b1NjYWxpbmc6OlNjYWxhYmxlVGFyZ2V0XCIsIHtcbiAgICAgICAgTWF4Q2FwYWNpdHk6IDMwMCxcbiAgICAgICAgTWluQ2FwYWNpdHk6IDNcbiAgICB9KSk7XG5cbiAgICBleHBlY3RDREsoc3RhY2spLnRvKGhhdmVSZXNvdXJjZShcIkFXUzo6QXBwbGljYXRpb25BdXRvU2NhbGluZzo6U2NhbGluZ1BvbGljeVwiLCB7XG4gICAgICAgIFwiVGFyZ2V0VHJhY2tpbmdTY2FsaW5nUG9saWN5Q29uZmlndXJhdGlvblwiOiB7XG4gICAgICAgICAgICBcIlByZWRlZmluZWRNZXRyaWNTcGVjaWZpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICBcIlByZWRlZmluZWRNZXRyaWNUeXBlXCI6IFwiRHluYW1vREJSZWFkQ2FwYWNpdHlVdGlsaXphdGlvblwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJUYXJnZXRWYWx1ZVwiOiA1MFxuICAgICAgICB9XG4gICAgfSkpO1xufSk7Il19