import { NodegroupOptions } from "@aws-cdk/aws-eks";
export interface INodeGroupConfig {
    instanceType?: string;
    minSize?: number;
    maxSize?: number;
    desiredSize?: number;
}
export declare class NodeGroupConfig implements INodeGroupConfig {
    static readonly DEFAULT_NODE_GROUP: NodegroupOptions;
    private readonly _instanceType;
    private readonly _minSize;
    private readonly _maxSize;
    private readonly _desiredSize;
    constructor(instanceType?: string, minSize?: number, maxSize?: number, desiredSize?: number);
    get instanceType(): string | undefined;
    get minSize(): number | undefined;
    get maxSize(): number | undefined;
    get desiredSize(): number | undefined;
    /**
     * Performs a typesafe conversion into a NodeGroupConfig class
     * @param config config object
     */
    static fromConfig(config: INodeGroupConfig): NodeGroupConfig;
    private static isConfig;
    /**
     * Converts this config object into one that can be used with the CDK.
     */
    toNodeGroupOptions(): NodegroupOptions;
}
