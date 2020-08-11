import * as cdk from "@aws-cdk/core";
import * as dynamo from "@aws-cdk/aws-dynamodb";
import { GraphDatabaseProps } from "./graph-database-props";
/**
 * The underlying database for Graphs.
 */
export declare class GraphDatabase extends cdk.Construct {
    private readonly _table;
    constructor(scope: cdk.Construct, id: string, props: GraphDatabaseProps);
    get table(): dynamo.Table;
}
