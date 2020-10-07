import { Notifications } from './notifications';

export class Elements {
    private elements: any;
    constructor(elements: string) {
        this.elements = elements;
    }
    public getElements(): IElements {
        return this.elements;
    }

    public validate(): Notifications {
        const notes: Notifications = new Notifications();
        if (this.elements.length === 0) {
            notes.addError('Elements Schema is empty');
            return notes;
        }
        if (!this.elementsIsValidJson(notes)) {
            return notes;
        }
        this.validateEntities(notes);
        this.validateEdges(notes);
        this.validateInvalidProperties(notes);
        return notes;
    }
    private elementsIsValidJson(notes: Notifications): boolean {
        try {
            this.elements = JSON.parse(this.elements);
            return true;
        } catch (e) {
            notes.addError('Elements Schema is not valid JSON');
            return false;
        }
    }

    private validateEntities(notes: Notifications): void {
        if (this.elements.entities === undefined) {
            notes.addError('Elements Schema does not contain property entities');
            return;
        }
        if (typeof this.elements.entities !== 'object') {
            notes.addError(`Entities is type ${typeof this.elements.entities} and not object keys`);
            return;
        }
        const invalidEntities = Object.keys(this.elements.entities).filter((key) => typeof key === 'object');
        if (invalidEntities.length > 0) {
            notes.addError('Invalid entities in Elements Schema, missing entity objects');
        }
        const entities = Object.keys(this.elements.entities).filter((entity) => entity.de)
    }
    private validateEdges(notes: Notifications): void {
        if (this.elements.edges === undefined) {
            notes.addError('Elements Schema does not contain property edges');
        }
    }
    private validateInvalidProperties(notes: Notifications): void {
        const invalidProperties = Object.keys(this.elements).filter((key) => key !== 'entities' && key !== 'edges');

        if (invalidProperties.length > 0) {
            notes.addError(
                '["' + invalidProperties.join('", "').toString() + '"] are invalid Elements schema root properties'
            );
        }
    }
}
export interface IElements {
    entities: object;
    edges: object;
}
interface IEntity {
    description: string;
    vertex: string;
    properties: object;
    groupBy: Array<string>;
}
