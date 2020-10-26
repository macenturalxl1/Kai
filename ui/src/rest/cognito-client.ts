import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { RestClient } from './rest-client';
import { poolData } from './cognito-config';

export class CognitoClient {
    private static cognitoUser: CognitoUser;
    private static authenticationDetails: AuthenticationDetails;

    public static login(username: string, password: string, onSuccess: Function, onError: Function) {
        this.initCognitoUser(username, password);

        this.cognitoUser.authenticateUser(this.authenticationDetails, {
            onSuccess: function (result) {
                // Use the idToken for Logins Map when Federating User Pools with identity pools or when
                // passing through an Authorization Header to an API Gateway Authorizer
                const idToken = result.getIdToken().getJwtToken();
                RestClient.setJwtToken(idToken);
                onSuccess();
            },

            onFailure: function (error) {
                onError(error.message);
            },
        });
    }

    public static loginAndSetNewPassword(
        username: string,
        tempPassword: string,
        newPassword: string,
        onSuccess: Function,
        onError: Function
    ) {
        this.initCognitoUser(username, tempPassword);

        const cognitoUser = this.cognitoUser;

        cognitoUser.authenticateUser(this.authenticationDetails, {
            onSuccess: function (result) {
                // Use the idToken for Logins Map when Federating User Pools with identity pools or when
                // passing through an Authorization Header to an API Gateway Authorizer
                const idToken = result.getIdToken().getJwtToken();
                RestClient.setJwtToken(idToken);
                onSuccess();
            },

            onFailure: function (error) {
                onError(error.message);
            },

            newPasswordRequired: function (userAttributes) {
                // User was signed up by an admin and must provide new password and required attributes,
                // if any, to complete authentication.
                // The api doesn't accept email_verified field back
                delete userAttributes.email_verified;

                // Get these details and call
                cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);
            },
        });
    }

    private static initCognitoUser(username: string, password: string) {
        const authenticationData = {
            Username: username,
            Password: password,
        };
        this.authenticationDetails = new AuthenticationDetails(authenticationData);

        const userPool = new CognitoUserPool(poolData);
        const userData = {
            Username: username,
            Pool: userPool,
        };
        this.cognitoUser = new CognitoUser(userData);
    }
}
