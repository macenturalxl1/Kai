import { AuthClientFactory } from '../../../src/rest/clients/auth-client-factory';
import { IAuthClient } from '../../../src/rest/clients/authclient';
import { CognitoClient } from '../../../src/rest/clients/cognito-client';
import { RbacClient } from '../../../src/rest/clients/rbac-client';

describe('Auth Factory', () => {
    afterEach(() => (process.env = Object.assign(process.env, { REACT_APP_PLATFORM: '' })));
    it('should return CognitoClient when REACT_APP_PLATFORM ENV is OPENSHIFT', () => {
        process.env = Object.assign(process.env, { REACT_APP_PLATFORM: 'OPENSHIFT' });

        const client: IAuthClient = new AuthClientFactory().create();

        expect(client).toBeInstanceOf(RbacClient);
    });
    it('should return CognitoClient when REACT_APP_PLATFORM ENV is AWS', () => {
        process.env = Object.assign(process.env, { REACT_APP_PLATFORM: 'AWS' });

        const client: IAuthClient = new AuthClientFactory().create();

        expect(client).toBeInstanceOf(CognitoClient);
    });
    it('should return by default CognitoClient when REACT_APP_PLATFORM ENV is not a defined type', () => {
        process.env = Object.assign(process.env, { REACT_APP_PLATFORM: '' });

        const client: IAuthClient = new AuthClientFactory().create();

        expect(client).toBeInstanceOf(CognitoClient);
    });
});