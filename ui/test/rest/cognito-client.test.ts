import { CognitoClient } from '../../src/rest/cognito-client';

describe('ResetTempPasswrod Service', () => {
    it('should reset the password successfully with no errors', () => {
        const username = 'John Smith';
        const password = 'Password1';
        const onSuccess = jest.fn();
        const onFailure = jest.fn();

        CognitoClient.login(username, password, onSuccess, onFailure);

        // expect(onFailure).toHaveBeenCalledTimes(1);
    });
});
