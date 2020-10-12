import { ISchema } from '../../domain/schema';
import { IElements } from '../../domain/elements-schema';
import { ITypesSchema } from '../../domain/types-schema';

export interface ICreateGraphRequestBody {
    graphName: string;
    administrators: Array<string>;
    schema: {
        elements: IElements;
        types: ITypesSchema;
    };
}
