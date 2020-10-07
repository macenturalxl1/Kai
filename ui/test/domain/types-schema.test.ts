import { TypesSchema } from '../../src/domain/types-schema';

describe('Types Schema Validation', () => {
    it('should return Types Schema is empty when Types is empty', () => {
        const notifications = new TypesSchema('').validate();

        expect(notifications.errorMessage()).toBe('Types Schema is empty');
    });
    it('should return invalid JSON notifications when string is not JSON format', () => {
        const invalidJsonString = 'invalid: blahJson';

        const notifications = new TypesSchema(invalidJsonString).validate();

        expect(notifications.errorMessage()).toBe('Types Schema is not valid JSON');
    });
    it('should return Types Schema does not contain types when Types doesnt have types', () => {
        const rawElementsSchema = JSON.stringify({
            junction: {
                description: 'A road junction represented by a String.',
                class: 'java.lang.String',
            },
        });

        const notifications = new TypesSchema(rawElementsSchema).validate();

        expect(notifications.errorMessage()).toBe(
            'Types Schema does not contain property types, ["junction"] are invalid Types schema root properties'
        );
    });
    it('should return invalid properties notification when invalid properties is in Types schema', () => {
        const rawSchema = JSON.stringify({
            junction: {
                description: 'A road junction represented by a String.',
                class: 'java.lang.String',
            },
            types: {},
        });

        const notifications = new TypesSchema(rawSchema).validate();

        expect(notifications.errorMessage()).toBe('["junction"] are invalid Types schema root properties');
    });
    it('should return all invalid properties notification when multi invalid properties is in Types schema', () => {
        const rawSchema = JSON.stringify({
            road: {
                description: 'A road represented by a String.',
                class: 'java.lang.String',
            },
            junction: {
                description: 'A road junction represented by a String.',
                class: 'java.lang.String',
            },
            types: {},
        });

        const notifications = new TypesSchema(rawSchema).validate();

        expect(notifications.errorMessage()).toBe('["road", "junction"] are invalid Types schema root properties');
    });
});
