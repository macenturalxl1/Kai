import { AuthApiClient } from './auth-api-client';
import { IAuthClient } from './authclient';
import { CognitoClient } from './cognito-client';
import { RbacClient } from './rbac-client';

export class AuthClientFactory {
    // @ts-ignore
    private readonly platform = window._env_.REACT_APP_API_PLATFORM;

    public create(): IAuthClient {
        switch (this.platform) {
            case 'AWS': {
                return new CognitoClient();
            }
            case 'OPENSHIFT': {
                return new RbacClient();
            }
            default: {
                return new AuthApiClient();
            }
        }
    }
}
