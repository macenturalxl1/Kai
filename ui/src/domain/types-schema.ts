import { Notifications } from './notifications';
import { typeIsOrHasBaseType } from 'tslint/lib/language/typeUtils';

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
            return;
        }
        if (typeof this.types.types !== 'object') {
            notes.addError(`Types is a ${typeof this.types.types} and not an object of types objects`);
            return;
        }
        Object.keys(this.types.types).filter((typeName: string) => {
            const type: IType = this.types.types[typeName];
            if (type.description !== undefined && typeof type.description !== 'string') {
                notes.addError(
                    `description in ${typeName} type is a ${typeof type.description}, it needs to be a string`
                );
            }
            if (type.class !== undefined && typeof type.class !== 'string') {
                notes.addError(`class in ${typeName} type is a ${typeof type.class}, it needs to be a string`);
            }
            if (type.validateFunctions !== undefined) {
                if (!Array.isArray(type.validateFunctions)) {
                    notes.addError(
                        `validateFunctions in ${typeName} type is a ${typeof type.validateFunctions}, it needs to be an Array of objects`
                    );
                    return;
                }
            }
            if (type.aggregateFunction !== undefined) {
                if (typeof type.aggregateFunction !== 'object') {
                    notes.addError(
                        `aggregateFunction in ${typeName} type is a ${typeof type.aggregateFunction}, it needs to be an object`
                    );
                }
            }
            if (type.serialiser !== undefined) {
                if (typeof type.serialiser !== 'object') {
                    notes.addError(
                        `serialiser in ${typeName} type is a ${typeof type.serialiser}, it needs to be an object`
                    );
                }
            }
        });
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
interface IType {
    description: string;
    class: string;
    validateFunctions: Array<Object>;
    aggregateFunction: {
        class: string;
    };
    serialiser: {
        class: string;
    };
}
