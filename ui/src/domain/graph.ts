export class Graph {
    private graphId: string;
    private description: string;

    constructor(graphId: string, description: string) {
        this.graphId = graphId;
        this.description = description;
    }

    public getId(): string {
        console.log(this.graphId);
        
        return this.graphId;
    }

    public getStatus(): string {
        return this.description;
    }
}
