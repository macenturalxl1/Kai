import { ElementsSchema } from '../../src/domain/elements-schema';

describe('Elements Validation', () => {
    it('should return Elements schema is empty when elements is empty', () => {
        const notifications = new ElementsSchema('').validate();

        expect(notifications.errorMessage()).toBe('Elements Schema is empty');
    });
    it('should return invalid JSON notifications when string is not JSON format', () => {
        const invalidJsonString = 'invalid: blahJson';

        const notifications = new ElementsSchema(invalidJsonString).validate();

        expect(notifications.errorMessage()).toBe('Elements Schema is not valid JSON');
    });
    it('should return Elements Schema does not contain entities when Elements doesnt have entities', () => {
        const rawElementsSchema = JSON.stringify({ edges: {} });

        const notifications = new ElementsSchema(rawElementsSchema).validate();

        expect(notifications.errorMessage()).toBe('Elements Schema does not contain property entities');
    });
    it('should return Elements Schema does not contain edges when Elements doesnt have edges', () => {
        const rawElementsSchema = JSON.stringify({ entities: {} });

        const notifications = new ElementsSchema(rawElementsSchema).validate();

        expect(notifications.errorMessage()).toBe('Elements Schema does not contain property edges');
    });
    it('should return invalid properties notification when invalid properties is in Elements schema', () => {
        const rawSchema = JSON.stringify({
            unknownProperty: {},
            entities: {},
            edges: {},
        });

        const notifications = new ElementsSchema(rawSchema).validate();

        expect(notifications.errorMessage()).toBe('["unknownProperty"] are invalid Elements schema root properties');
    });
    it('should return all invalid properties notification when multi invalid properties is in Elements schema', () => {
        const rawSchema = JSON.stringify({
            unknownProperty: {},
            anotherInvalidProp: {},
            entities: {},
            edges: {},
        });

        const notifications = new ElementsSchema(rawSchema).validate();

        expect(notifications.errorMessage()).toBe(
            '["unknownProperty", "anotherInvalidProp"] are invalid Elements schema root properties'
        );
    });

    describe('Entities validation', () => {
        it('should not return any errors if entities have entity objects and description, vertex, props and groupBy', () => {
            const rawSchema = JSON.stringify({
                entities: {
                    Cardinality: {
                        description:
                            'An entity that is added to every vertex representing the connectivity of the vertex.',
                        vertex: 'anyVertex',
                        properties: {
                            edgeGroup: 'set',
                            hllp: 'hllp',
                            count: 'count.long',
                        },
                        groupBy: ['edgeGroup'],
                    },
                },
                edges: {
                    RoadUse: {
                        description: 'A directed edge representing vehicles moving from junction A to junction B.',
                        source: 'junction',
                        destination: 'junction',
                        directed: 'true',
                        properties: {
                            startDate: 'date.earliest',
                            endDate: 'date.latest',
                            count: 'count.long',
                            countByVehicleType: 'counts.freqmap',
                        },
                    },
                },
            });

            const notifications = new ElementsSchema(rawSchema).validate();

            expect(notifications.isEmpty()).toBe(true);
        });
        it('should return invalid entities in Elements schema when entities is not type object', () => {
            const rawSchema = JSON.stringify({
                entities: 'invalid: blahJson',
                edges: {
                    RoadUse: {
                        description: 'A directed edge representing vehicles moving from junction A to junction B.',
                        source: 'junction',
                        destination: 'junction',
                        directed: 'true',
                        properties: {
                            startDate: 'date.earliest',
                            endDate: 'date.latest',
                            count: 'count.long',
                            countByVehicleType: 'counts.freqmap',
                        },
                    },
                },
            });

            const notifications = new ElementsSchema(rawSchema).validate();

            expect(notifications.errorMessage()).toBe('Entities is type string and not an object of Entity objects');
        });
        it('should return description is missing error if Entity doesnt have description', () => {
            const rawSchema = JSON.stringify({
                entities: {
                    Cardinality: {
                        vertex: 'anyVertex',
                        properties: {
                            edgeGroup: 'set',
                            hllp: 'hllp',
                            count: 'count.long',
                        },
                        groupBy: ['edgeGroup'],
                    },
                },
                edges: {
                    RoadUse: {
                        description: 'A directed edge representing vehicles moving from junction A to junction B.',
                        source: 'junction',
                        destination: 'junction',
                        directed: 'true',
                        properties: {
                            startDate: 'date.earliest',
                            endDate: 'date.latest',
                            count: 'count.long',
                            countByVehicleType: 'counts.freqmap',
                        },
                    },
                },
            });

            const notifications = new ElementsSchema(rawSchema).validate();

            expect(notifications.errorMessage()).toBe('Cardinality entity is missing ["description"]');
        });
        it('should all entitiy values that are missing in error when entity is empty', () => {
            const rawSchema = JSON.stringify({
                entities: {
                    NumberOfElements: {},
                },
                edges: {
                    RoadUse: {
                        description: 'A directed edge representing vehicles moving from junction A to junction B.',
                        source: 'junction',
                        destination: 'junction',
                        directed: 'true',
                        properties: {
                            startDate: 'date.earliest',
                            endDate: 'date.latest',
                            count: 'count.long',
                            countByVehicleType: 'counts.freqmap',
                        },
                    },
                },
            });

            const notifications = new ElementsSchema(rawSchema).validate();

            expect(notifications.errorMessage()).toBe(
                'NumberOfElements entity is missing ["description", "vertex", "properties", "groupBy"]'
            );
        });
    });
});
