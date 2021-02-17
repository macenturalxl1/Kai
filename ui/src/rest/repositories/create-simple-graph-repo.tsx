import { RestClient, IApiResponse } from '../clients/rest-client';
import { ICreateSimpleGraphRequestBody } from '../http-message-interfaces/request-interfaces';

export class CreateSimpleGraphRepo {
    public async create(graphId: string, description: string): Promise<void> {
        const httpRequestBody: ICreateSimpleGraphRequestBody = {
            graphId: graphId,
            description: description,
        };
        const response: IApiResponse<undefined> = await RestClient.post(httpRequestBody);

        if (response.status !== 201) {
            throw new Error(`Expected status code 201 for Created Graph but got (${response.status})`);
        }
    }
}
