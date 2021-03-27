export default {
  development: {
    Auth: {
      region: 'eu-central-1',
      userPoolId: 'eu-central-1_MDRU6Y6DW',
      userPoolWebClientId: '7ch9a3m5i6oi6kgsi9mb46lmg8',
      oauth: {
        domain: 'auth.kebabyn.com',
        scope: ['profile', 'email', 'openid'],
        redirectSignIn: 'http://localhost:3000/',
        redirectSignOut: 'http://localhost:3000/auth/login/',
        responseType: 'token',
      },
    },
  },
  production: {
    Auth: {
      region: 'eu-central-1',
      userPoolId: 'eu-central-1_MDRU6Y6DW',
      userPoolWebClientId: '7ch9a3m5i6oi6kgsi9mb46lmg8',
      oauth: {
        domain: 'auth.kebabyn.com',
        scope: ['profile', 'email', 'openid'],
        redirectSignIn: 'https://kebabyn.com/',
        redirectSignOut: 'https://kebabyn.com/auth/login/',
        responseType: 'token',
      },
    },
  },
}
