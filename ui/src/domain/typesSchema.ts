import { Notifications } from './notifications';

export class TypesSchema {
    private types: any;

    constructor(types: string) {
        this.types = types;
    }
    public getTypes(): ITypesSchema {
        return this.types;
    }
    public validate(): Notifications {
        const notes: Notifications = new Notifications();
        if (this.types.length === 0) {
            notes.addError('Types Schema is empty');
            return notes;
        }
        if (!this.typesIsValidJson(notes)) {
            return notes;
        }
        this.validateTypes(notes);
        this.validateInvalidProperties(notes);
        return notes;
    }
    private typesIsValidJson(notes: Notifications): boolean {
        try {
            this.types = JSON.parse(this.types);
            return true;
        } catch (e) {
            notes.addError('Types Schema is not valid JSON');
            return false;
        }
    }
    private validateTypes(notes: Notifications): void {
        if (this.types.types === undefined) {
            notes.addError('Types Schema does not contain property types');
        }
    }
    private validateInvalidProperties(notes: Notifications): void {
        const invalidProperties = Object.keys(this.types).filter((key) => key !== 'types');

        if (invalidProperties.length > 0) {
            notes.addError(
                '["' + invalidProperties.join('", "').toString() + '"] are invalid Types schema root properties'
            );
        }
    }
}
export interface ITypesSchema {
    types: object;
}
