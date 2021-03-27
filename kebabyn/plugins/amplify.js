import Amplify, { Auth } from 'aws-amplify'
import awsConfig from '../aws-exports'

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
)

const [
  localRedirectSignIn,
  productionRedirectSignIn,
] = awsConfig.Auth.oauth.redirectSignIn.split(',')

const [
  localRedirectSignOut,
  productionRedirectSignOut,
] = awsConfig.Auth.oauth.redirectSignOut.split(',')

const updatedAwsConfig = {
  ...awsConfig,
  Auth: {
    ...awsConfig.Auth,
    oauth: {
      ...awsConfig.Auth.oauth,
      redirectSignIn: isLocalhost
        ? localRedirectSignIn
        : productionRedirectSignIn,
      redirectSignOut: isLocalhost
        ? localRedirectSignOut
        : productionRedirectSignOut,
    },
  },
  API: {
    endpoints: [
      {
        name: 'KebabynAPI',
        endpoint: `https://g8k7yxd5xf.execute-api.eu-central-1.amazonaws.com`,
        region: 'eu-central-1',
        custom_header: async () => {
          return {
            Authorization: `Bearer ${(await Auth.currentSession())
              .getIdToken()
              .getJwtToken()}`,
          }
        },
      },
    ],
  },
}

Amplify.configure(updatedAwsConfig)
