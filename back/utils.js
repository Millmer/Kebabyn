const _ = require('lodash');
const { allowedUserEmails } = require('./constants');

module.exports.errorResponse = function (error, customResponse, headers = {}) {
  return {
    statusCode: error.statusCode || error || 500,
    headers: {
      'Access-Control-Allow-Origin': '*',
      ...headers
    },
    body: JSON.stringify({ message: error.message || error.statusMessage || customResponse })
  }
};

module.exports.successResponse = function (status, body = {}, headers = {}) {
  return {
    statusCode: status || 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      ...headers
    },
    isBase64Encoded: false,
    body: JSON.stringify(body)
  }
};

module.exports.getCognitoUser = async (event) => {
  const decodedJWT = _.get(event, 'requestContext.authorizer.jwt.claims', '');
  const user = _.pick(decodedJWT, ['cognito:username', 'email', 'name'])
  if (user) {
      console.info('Got user: ', user.email);
      return user;
  } else {
      console.error('Cognito User not found');
      throw {
          statusCode: 404,
          statusMessage: 'User not found'
      };
  }
}

module.exports.authorizeUser = async (event) => {
  const decodedJWT = _.get(event, 'requestContext.authorizer.jwt.claims', '');

  console.info('Authorize user for cognito user: ', decodedJWT);

  if(!allowedUserEmails.includes(decodedJWT.email)) {
      console.error(`User ${decodedJWT.name} (${decodedJWT.email}) is not authorized to claim kebabs`);
      throw {
          statusCode: 403,
          statusMessage: 'User is not authorized to claim kebabs resource'
      };
  }
};