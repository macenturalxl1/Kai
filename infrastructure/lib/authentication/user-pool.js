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
exports.KaiUserPool = void 0;
const cdk = require("@aws-cdk/core");
const cognito = require("@aws-cdk/aws-cognito");
const user_pool_config_1 = require("./user-pool-config");
class KaiUserPool extends cdk.Construct {
    constructor(scope, id) {
        super(scope, id);
        this.id = id;
        let userPoolConfiguration = this.node.tryGetContext("userPoolConfiguration");
        let userPoolConfig;
        if (userPoolConfiguration) {
            if (typeof userPoolConfiguration == "string") {
                userPoolConfiguration = JSON.parse(userPoolConfiguration);
            }
            userPoolConfig = user_pool_config_1.UserPoolConfig.fromConfig(userPoolConfiguration);
        }
        else {
            userPoolConfig = user_pool_config_1.UserPoolConfig.DEFAULT;
        }
        if (userPoolConfig.useExternalPool && userPoolConfig.externalPool) {
            this._userPool = cognito.UserPool.fromUserPoolId(this, KaiUserPool._userPoolId, userPoolConfig.externalPool.userPoolId);
            this._userPoolClient = cognito.UserPoolClient.fromUserPoolClientId(this, KaiUserPool._userPoolClientId, userPoolConfig.externalPool.userPoolClientId);
        }
        else {
            let userPoolProps = {};
            if (userPoolConfig.defaultPoolConfig && userPoolConfig.defaultPoolConfig.userPoolProps) {
                userPoolProps = userPoolConfig.defaultPoolConfig.userPoolProps;
            }
            this._userPool = new cognito.UserPool(this, KaiUserPool._userPoolId, userPoolProps);
            const userPoolClientProps = { "userPool": this._userPool };
            if (userPoolConfig.defaultPoolConfig && userPoolConfig.defaultPoolConfig.userPoolClientOptions) {
                Object.assign(userPoolClientProps, userPoolConfig.defaultPoolConfig.userPoolClientOptions);
            }
            this._userPoolClient = this._userPool.addClient(KaiUserPool._userPoolClientId, userPoolClientProps);
        }
    }
    get userPoolId() {
        return this._userPool.userPoolId;
    }
    get userPoolClientId() {
        return this._userPoolClient.userPoolClientId;
    }
}
exports.KaiUserPool = KaiUserPool;
KaiUserPool._userPoolId = "KaiUserPool";
KaiUserPool._userPoolClientId = "KaiUserPoolClient";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wb29sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci1wb29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7R0FjRzs7O0FBRUgscUNBQXFDO0FBQ3JDLGdEQUFnRDtBQUNoRCx5REFBb0Q7QUFFcEQsTUFBYSxXQUFZLFNBQVEsR0FBRyxDQUFDLFNBQVM7SUFRMUMsWUFBWSxLQUFvQixFQUFXLEVBQVU7UUFDakQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQURzQixPQUFFLEdBQUYsRUFBRSxDQUFRO1FBR2pELElBQUkscUJBQXFCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUM3RSxJQUFJLGNBQThCLENBQUM7UUFFbkMsSUFBSSxxQkFBcUIsRUFBRTtZQUN2QixJQUFJLE9BQU8scUJBQXFCLElBQUksUUFBUSxFQUFFO2dCQUMxQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDN0Q7WUFDRCxjQUFjLEdBQUcsaUNBQWMsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQztTQUNyRTthQUFNO1lBQ0gsY0FBYyxHQUFHLGlDQUFjLENBQUMsT0FBTyxDQUFDO1NBQzNDO1FBRUQsSUFBSSxjQUFjLENBQUMsZUFBZSxJQUFJLGNBQWMsQ0FBQyxZQUFZLEVBQUU7WUFFL0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hILElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLGlCQUFpQixFQUFFLGNBQWMsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUV6SjthQUFNO1lBRUgsSUFBSSxhQUFhLEdBQTBCLEVBQUUsQ0FBQztZQUM5QyxJQUFJLGNBQWMsQ0FBQyxpQkFBaUIsSUFBSSxjQUFjLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFO2dCQUNwRixhQUFhLEdBQUcsY0FBYyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQzthQUNsRTtZQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBRXBGLE1BQU0sbUJBQW1CLEdBQWdDLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN4RixJQUFJLGNBQWMsQ0FBQyxpQkFBaUIsSUFBSSxjQUFjLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLEVBQUU7Z0JBQzVGLE1BQU0sQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsY0FBYyxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDOUY7WUFFRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3ZHO0lBQ0wsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUFXLGdCQUFnQjtRQUN2QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUM7SUFDakQsQ0FBQzs7QUFwREwsa0NBcURDO0FBbkQyQix1QkFBVyxHQUFHLGFBQWEsQ0FBQztBQUM1Qiw2QkFBaUIsR0FBRyxtQkFBbUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyMCBDcm93biBDb3B5cmlnaHRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0ICogYXMgY2RrIGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XG5pbXBvcnQgKiBhcyBjb2duaXRvIGZyb20gXCJAYXdzLWNkay9hd3MtY29nbml0b1wiO1xuaW1wb3J0IHsgVXNlclBvb2xDb25maWcgfSBmcm9tIFwiLi91c2VyLXBvb2wtY29uZmlnXCI7XG5cbmV4cG9ydCBjbGFzcyBLYWlVc2VyUG9vbCBleHRlbmRzIGNkay5Db25zdHJ1Y3Qge1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX3VzZXJQb29sSWQgPSBcIkthaVVzZXJQb29sXCI7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX3VzZXJQb29sQ2xpZW50SWQgPSBcIkthaVVzZXJQb29sQ2xpZW50XCI7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IF91c2VyUG9vbDogY29nbml0by5JVXNlclBvb2w7XG4gICAgcHJpdmF0ZSByZWFkb25seSBfdXNlclBvb2xDbGllbnQ6IGNvZ25pdG8uSVVzZXJQb29sQ2xpZW50O1xuXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIHJlYWRvbmx5IGlkOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgICAgICBsZXQgdXNlclBvb2xDb25maWd1cmF0aW9uID0gdGhpcy5ub2RlLnRyeUdldENvbnRleHQoXCJ1c2VyUG9vbENvbmZpZ3VyYXRpb25cIik7XG4gICAgICAgIGxldCB1c2VyUG9vbENvbmZpZzogVXNlclBvb2xDb25maWc7XG5cbiAgICAgICAgaWYgKHVzZXJQb29sQ29uZmlndXJhdGlvbikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB1c2VyUG9vbENvbmZpZ3VyYXRpb24gPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIHVzZXJQb29sQ29uZmlndXJhdGlvbiA9IEpTT04ucGFyc2UodXNlclBvb2xDb25maWd1cmF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVzZXJQb29sQ29uZmlnID0gVXNlclBvb2xDb25maWcuZnJvbUNvbmZpZyh1c2VyUG9vbENvbmZpZ3VyYXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXNlclBvb2xDb25maWcgPSBVc2VyUG9vbENvbmZpZy5ERUZBVUxUO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVzZXJQb29sQ29uZmlnLnVzZUV4dGVybmFsUG9vbCAmJiB1c2VyUG9vbENvbmZpZy5leHRlcm5hbFBvb2wpIHtcblxuICAgICAgICAgICAgdGhpcy5fdXNlclBvb2wgPSBjb2duaXRvLlVzZXJQb29sLmZyb21Vc2VyUG9vbElkKHRoaXMsIEthaVVzZXJQb29sLl91c2VyUG9vbElkLCB1c2VyUG9vbENvbmZpZy5leHRlcm5hbFBvb2wudXNlclBvb2xJZCk7XG4gICAgICAgICAgICB0aGlzLl91c2VyUG9vbENsaWVudCA9IGNvZ25pdG8uVXNlclBvb2xDbGllbnQuZnJvbVVzZXJQb29sQ2xpZW50SWQodGhpcywgS2FpVXNlclBvb2wuX3VzZXJQb29sQ2xpZW50SWQsIHVzZXJQb29sQ29uZmlnLmV4dGVybmFsUG9vbC51c2VyUG9vbENsaWVudElkKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBsZXQgdXNlclBvb2xQcm9wczogY29nbml0by5Vc2VyUG9vbFByb3BzID0ge307XG4gICAgICAgICAgICBpZiAodXNlclBvb2xDb25maWcuZGVmYXVsdFBvb2xDb25maWcgJiYgdXNlclBvb2xDb25maWcuZGVmYXVsdFBvb2xDb25maWcudXNlclBvb2xQcm9wcykge1xuICAgICAgICAgICAgICAgIHVzZXJQb29sUHJvcHMgPSB1c2VyUG9vbENvbmZpZy5kZWZhdWx0UG9vbENvbmZpZy51c2VyUG9vbFByb3BzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl91c2VyUG9vbCA9IG5ldyBjb2duaXRvLlVzZXJQb29sKHRoaXMsIEthaVVzZXJQb29sLl91c2VyUG9vbElkLCB1c2VyUG9vbFByb3BzKTtcblxuICAgICAgICAgICAgY29uc3QgdXNlclBvb2xDbGllbnRQcm9wczogY29nbml0by5Vc2VyUG9vbENsaWVudFByb3BzID0geyBcInVzZXJQb29sXCI6IHRoaXMuX3VzZXJQb29sIH07XG4gICAgICAgICAgICBpZiAodXNlclBvb2xDb25maWcuZGVmYXVsdFBvb2xDb25maWcgJiYgdXNlclBvb2xDb25maWcuZGVmYXVsdFBvb2xDb25maWcudXNlclBvb2xDbGllbnRPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih1c2VyUG9vbENsaWVudFByb3BzLCB1c2VyUG9vbENvbmZpZy5kZWZhdWx0UG9vbENvbmZpZy51c2VyUG9vbENsaWVudE9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl91c2VyUG9vbENsaWVudCA9IHRoaXMuX3VzZXJQb29sLmFkZENsaWVudChLYWlVc2VyUG9vbC5fdXNlclBvb2xDbGllbnRJZCwgdXNlclBvb2xDbGllbnRQcm9wcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHVzZXJQb29sSWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJQb29sLnVzZXJQb29sSWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB1c2VyUG9vbENsaWVudElkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VyUG9vbENsaWVudC51c2VyUG9vbENsaWVudElkO1xuICAgIH1cbn1cbiJdfQ==