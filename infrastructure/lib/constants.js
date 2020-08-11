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
exports.ADD_GRAPH_TIMEOUT = exports.DELETE_GRAPH_TIMEOUT = exports.DELETE_GRAPH_WORKER_BATCH_SIZE = exports.ADD_GRAPH_WORKER_BATCH_SIZE = exports.LAMBDA_LAYER_VERSION = exports.LAMBDA_LAYER_ARN = void 0;
const core_1 = require("@aws-cdk/core");
exports.LAMBDA_LAYER_ARN = "arn:aws:serverlessrepo:us-east-1:903779448426:applications/lambda-layer-kubectl";
exports.LAMBDA_LAYER_VERSION = "2.0.0-beta3";
// worker batch size
exports.ADD_GRAPH_WORKER_BATCH_SIZE = 3; // can only be one of 3, 2, or 1 as Max timeout for visibility is 15 minutes
exports.DELETE_GRAPH_WORKER_BATCH_SIZE = 5; // can go up to 7
// timeouts
const TIMEOUT_FOR_ADDING_GRAPH_IN_MINUTES = 5; // how long it should take for one graph to be added
const TIMEOUT_FOR_DELETING_GRAPH_IN_MINUTES = 2; // how long it should take for one graph to be deleted
exports.DELETE_GRAPH_TIMEOUT = core_1.Duration.minutes(TIMEOUT_FOR_DELETING_GRAPH_IN_MINUTES * exports.DELETE_GRAPH_WORKER_BATCH_SIZE);
exports.ADD_GRAPH_TIMEOUT = core_1.Duration.minutes(TIMEOUT_FOR_ADDING_GRAPH_IN_MINUTES * exports.ADD_GRAPH_WORKER_BATCH_SIZE);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uc3RhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7R0FjRzs7O0FBRUgsd0NBQXlDO0FBRTVCLFFBQUEsZ0JBQWdCLEdBQUcsaUZBQWlGLENBQUM7QUFDckcsUUFBQSxvQkFBb0IsR0FBRyxhQUFhLENBQUM7QUFFbEQsb0JBQW9CO0FBQ1AsUUFBQSwyQkFBMkIsR0FBRyxDQUFDLENBQUMsQ0FBQyw0RUFBNEU7QUFDN0csUUFBQSw4QkFBOEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxpQkFBaUI7QUFDbEUsV0FBVztBQUNYLE1BQU0sbUNBQW1DLEdBQUcsQ0FBQyxDQUFDLENBQUMsb0RBQW9EO0FBQ25HLE1BQU0scUNBQXFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0RBQXNEO0FBRTFGLFFBQUEsb0JBQW9CLEdBQUcsZUFBUSxDQUFDLE9BQU8sQ0FBQyxxQ0FBcUMsR0FBRyxzQ0FBOEIsQ0FBQyxDQUFDO0FBQ2hILFFBQUEsaUJBQWlCLEdBQUcsZUFBUSxDQUFDLE9BQU8sQ0FBQyxtQ0FBbUMsR0FBRyxtQ0FBMkIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIwIENyb3duIENvcHlyaWdodFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgeyBEdXJhdGlvbiB9IGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XG5cbmV4cG9ydCBjb25zdCBMQU1CREFfTEFZRVJfQVJOID0gXCJhcm46YXdzOnNlcnZlcmxlc3NyZXBvOnVzLWVhc3QtMTo5MDM3Nzk0NDg0MjY6YXBwbGljYXRpb25zL2xhbWJkYS1sYXllci1rdWJlY3RsXCI7IFxuZXhwb3J0IGNvbnN0IExBTUJEQV9MQVlFUl9WRVJTSU9OID0gXCIyLjAuMC1iZXRhM1wiO1xuXG4vLyB3b3JrZXIgYmF0Y2ggc2l6ZVxuZXhwb3J0IGNvbnN0IEFERF9HUkFQSF9XT1JLRVJfQkFUQ0hfU0laRSA9IDM7IC8vIGNhbiBvbmx5IGJlIG9uZSBvZiAzLCAyLCBvciAxIGFzIE1heCB0aW1lb3V0IGZvciB2aXNpYmlsaXR5IGlzIDE1IG1pbnV0ZXNcbmV4cG9ydCBjb25zdCBERUxFVEVfR1JBUEhfV09SS0VSX0JBVENIX1NJWkUgPSA1OyAvLyBjYW4gZ28gdXAgdG8gN1xuLy8gdGltZW91dHNcbmNvbnN0IFRJTUVPVVRfRk9SX0FERElOR19HUkFQSF9JTl9NSU5VVEVTID0gNTsgLy8gaG93IGxvbmcgaXQgc2hvdWxkIHRha2UgZm9yIG9uZSBncmFwaCB0byBiZSBhZGRlZFxuY29uc3QgVElNRU9VVF9GT1JfREVMRVRJTkdfR1JBUEhfSU5fTUlOVVRFUyA9IDI7IC8vIGhvdyBsb25nIGl0IHNob3VsZCB0YWtlIGZvciBvbmUgZ3JhcGggdG8gYmUgZGVsZXRlZFxuXG5leHBvcnQgY29uc3QgREVMRVRFX0dSQVBIX1RJTUVPVVQgPSBEdXJhdGlvbi5taW51dGVzKFRJTUVPVVRfRk9SX0RFTEVUSU5HX0dSQVBIX0lOX01JTlVURVMgKiBERUxFVEVfR1JBUEhfV09SS0VSX0JBVENIX1NJWkUpO1xuZXhwb3J0IGNvbnN0IEFERF9HUkFQSF9USU1FT1VUID0gRHVyYXRpb24ubWludXRlcyhUSU1FT1VUX0ZPUl9BRERJTkdfR1JBUEhfSU5fTUlOVVRFUyAqIEFERF9HUkFQSF9XT1JLRVJfQkFUQ0hfU0laRSk7Il19