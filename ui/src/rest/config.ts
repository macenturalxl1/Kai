const _env = window as any;

export class Config {
    static REACT_APP_API_PLATFORM = _env.REACT_APP_API_PLATFORM;
    static REACT_APP_KAI_REST_API_HOST = _env.REACT_APP_KAI_REST_API_HOST;
    static REACT_APP_COGNITO_USERPOOLID = _env.REACT_APP_COGNITO_USERPOOLID;
    static REACT_APP_COGNITO_CLIENTID = _env.REACT_APP_COGNITO_CLIENTID;
    static REACT_APP_AUTH_ENDPOINT = _env.REACT_APP_AUTH_ENDPOINT;
    //To use locally, uncomment below and comment above
    // static REACT_APP_API_PLATFORM = 'test'
    // static REACT_APP_KAI_REST_API_HOST = 'http://localhost:4000';
    // static REACT_APP_COGNITO_USERPOOLID = _env.REACT_APP_COGNITO_USERPOOLID;
    // static REACT_APP_COGNITO_CLIENTID = _env.REACT_APP_COGNITO_CLIENTID;
    // static REACT_APP_AUTH_ENDPOINT = 'http://localhost:4000';

}


