import { Elements } from '../../src/domain/elements';

describe('Elements Validation', () => {
    it('should return Elements schema is empty when elements is empty', () => {
        const notifications = new Elements('').validate();

        expect(notifications.errorMessage()).toBe('Elements Schema is empty');
    });
    it('should return invalid JSON notifications when string is not JSON format', () => {
        const invalidJsonString = 'invalid: blahJson';

        const notifications = new Elements(invalidJsonString).validate();

        expect(notifications.errorMessage()).toBe('Elements Schema is not valid JSON');
    });
    it('should return Elements Schema does not contain entities when Elements doesnt have entities', () => {
        const rawElementsSchema = JSON.stringify({ edges: {} });

        const notifications = new Elements(rawElementsSchema).validate();

        expect(notifications.errorMessage()).toBe('Elements Schema does not contain property entities');
    });
    it('should return Elements Schema does not contain edges when Elements doesnt have edges', () => {
        const rawElementsSchema = JSON.stringify({ entities: {} });

        const notifications = new Elements(rawElementsSchema).validate();

        expect(notifications.errorMessage()).toBe('Elements Schema does not contain property edges');
    });
    it('should return invalid properties notification when invalid properties is in Elements schema', () => {
        const rawSchema = JSON.stringify({
            unknownProperty: {},
            entities: {},
            edges: {},
        });

        const notifications = new Elements(rawSchema).validate();

        expect(notifications.errorMessage()).toBe('["unknownProperty"] are invalid Elements schema root properties');
    });
    it('should return all invalid properties notification when multi invalid properties is in Elements schema', () => {
        const rawSchema = JSON.stringify({
            unknownProperty: {},
            anotherInvalidProp: {},
            entities: {},
            edges: {},
        });

        const notifications = new Elements(rawSchema).validate();

        expect(notifications.errorMessage()).toBe(
            '["unknownProperty", "anotherInvalidProp"] are invalid Elements schema root properties'
        );
    });
    it('should not return any errors if the edges and entities are valid in Elements Schema', () => {
        const rawSchema = JSON.stringify({
            entities: {
                Cardinality: {
                    description: 'An entity that is added to every vertex representing the connectivity of the vertex.',
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

        const notifications = new Elements(rawSchema).validate();

        expect(notifications.isEmpty()).toBe(true);
    });
    it('should return invalid entities in Elements schema when entities is invalid', () => {
        //given I have an elements schema
        //when I create an elements schema with invalid entities
        //then it should return an invalid entities error
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

        const notifications = new Elements(rawSchema).validate();

        expect(notifications.errorMessage()).toBe('Entities is type string and not object keys');
    });
    it('should return description is missing in entities if entities doesnt have description', () => {
        //given I have an elements schema
        //when I create an elemnts schema with a missing description in entities
        //then it should return description is missing in entities
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

        const notifications = new Elements(rawSchema).validate();

        expect(notifications.errorMessage()).toBe('entities does not have a description, in Elements Schema');
    });
});
