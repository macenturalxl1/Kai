import { Graph } from '../domain/graph';
import { API } from 'aws-amplify';

export class RestClient {

  public static async getAllGraphs(): Promise<Graph[]> {
      const response = await API.get('kairestapi', '/graphs', {});
      console.log(response)

      return response.map((jsonObject: any) => {
        return new Graph(jsonObject.graphId, jsonObject.currentState)
      });
  }

  public static async getGraphById(graphId: number): Promise<Graph> {
      const response = await fetch('/graphs/' + graphId);
      const body = await response.json();
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }

      return new Graph(body.graphId, body.currentState);
  }

  public static async deleteGraphById(graphId: number): Promise<void> {
    const response = await fetch('/graphs/' + graphId, {
      method: 'delete',
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message) 
    }
  }

}
