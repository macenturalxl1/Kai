import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { RestClient } from '../rest-client';
import { poolData } from '../cognito-config';

export class SignOutRepo {
    public signOut() {
        // const authenticationData = {
        //     Username: username,
        //     Password: password,
        // };
        // const authenticationDetails = new AuthenticationDetails(authenticationData);
        //
        const userPool = new CognitoUserPool(poolData);
        // const userData = {
        //     Username: username,
        //     Pool: userPool,
        // };
        const currentUser = userPool.getCurrentUser();
        if (currentUser !== null) {
            currentUser.signOut();
        }
    }
}
