import { RestClient, IApiResponse} from "../clients/rest-client";
import { ICreateSimpleGraphRequestBody} from "../http-message-interfaces/request-interfaces";

export class CreateSimpleGraphRepo {
    public async create (
        graphName: string,
        graphDescription: string
    ): Promise<void> {
        const httpRequestBody: ICreateSimpleGraphRequestBody = {
            graphDescription: graphName,
            graphId: graphDescription,
        };
        const response: IApiResponse<undefined> = await RestClient.post(httpRequestBody);

        if (response.status !== 201) {
            throw new Error(`Expected status code 201 for Created Graph but got (${response.status})`);
        }
    }

}