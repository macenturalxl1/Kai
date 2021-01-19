// Enter the generated IDs after cdk deploymeny and User Pool has been created.
// If running in production mode the .env variables are defined and will be used.
// The following config details can be found at:
export const poolData = {
    // Cognito > User Pools > KaiUserPool... > (on homepage) Pool Id: e.g. eu-west-2_aBc123
    // @ts-ignore
    UserPoolId: window._env_.REACT_APP_COGNITO_USERPOOLID ?? 'eu-west-2_SHP4oCV3z',
    // Cognito > User Pools > KaiUserPool... > (left nav column) General Settings > App Clients > App client Id
    // @ts-ignore
    ClientId: window._env_.REACT_APP_COGNITO_CLIENTID ?? '3bh47aq26ercmk4e9u7ocksoji',
};
