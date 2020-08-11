import * as cognito from "@aws-cdk/aws-cognito";
export interface IUserPoolConfig {
    externalPool?: IExternalPool;
    defaultPoolConfig?: IDefaultPoolConfig;
}
export interface IExternalPool {
    userPoolId: string;
    userPoolClientId: string;
}
export interface IDefaultPoolConfig {
    userPoolProps?: cognito.UserPoolProps;
    userPoolClientOptions?: cognito.UserPoolClientOptions;
}
export declare class UserPoolConfig implements IUserPoolConfig {
    static readonly DEFAULT: UserPoolConfig;
    private readonly _externalPool;
    private readonly _defaultPoolConfig;
    constructor(externalPool?: IExternalPool, defaultPoolConfig?: IDefaultPoolConfig);
    get useExternalPool(): boolean;
    get useDefaultPool(): boolean;
    get externalPool(): IExternalPool | undefined;
    get defaultPoolConfig(): IDefaultPoolConfig | undefined;
    static fromConfig(config?: IUserPoolConfig): UserPoolConfig;
    private static isValidConfig;
}
