import * as cdk from "@aws-cdk/core";
export declare class KaiUserPool extends cdk.Construct {
    readonly id: string;
    private static readonly _userPoolId;
    private static readonly _userPoolClientId;
    private readonly _userPool;
    private readonly _userPoolClient;
    constructor(scope: cdk.Construct, id: string);
    get userPoolId(): string;
    get userPoolClientId(): string;
}
