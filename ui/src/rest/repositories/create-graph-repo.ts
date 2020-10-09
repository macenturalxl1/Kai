import { RestClient, IApiResponse } from '../rest-client';
import { ICreateGraphRequestBody } from '../http-message-interfaces/request-interfaces';
import { Schema } from '../../domain/schema';
import { ElementsSchema } from '../../domain/elements-schema';
import { TypesSchema } from '../../domain/types-schema';

export class CreateGraphRepo {
    public async create(
        graphName: string,
        administrators: Array<string>,
        elementsSchema: ElementsSchema,
        typesSchema: TypesSchema
    ): Promise<void> {
        const httpRequestBody: ICreateGraphRequestBody = {
            graphName: graphName,
            administrators: administrators,
            schema: {
                elements: elementsSchema.getElements(),
                types: typesSchema.getTypes(),
            },
        };

        const response: IApiResponse<undefined> = await RestClient.post(httpRequestBody);

        if (response.status !== 201) {
            throw new Error(`Expected status code 201 for Created Graph but got (${response.status})`);
        }
    }
}
