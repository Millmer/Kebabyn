'use strict';
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();
const { errorResponse, successResponse, getCognitoUser, authorizeUser } = require('./utils');
const { minClaimDate, maxClaimDate } = require('./constants');

/**
 * Get list of claimed kebabs for the user
 * @param {*} event Event object passed by AWS Lambda
 * @returns List of kebabs
 */
module.exports.listKebabClaims = async (event) => {
  console.info('Event: %j',  event);
  try {
    await authorizeUser(event);
    const User = await getCognitoUser(event);

    const paramsGet = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      KeyConditionExpression: 'PrimaryKey = :userID AND begins_with(SortKey, :sortKey)',
      ExpressionAttributeValues: {
        ':userID': `USER:${User['cognito:username']}`,
        ':sortKey': 'KEBAB:'
      }
    }

    const kebabs = await documentClient.query(paramsGet).promise();

    return successResponse(200, { count: kebabs.Count, claims: kebabs.Items });
  } catch (err) {
    console.error('Failed to get claimed kebabs for user');
    console.error(err);
    return errorResponse(err, 'Failed to get claimed kebabs for user');
  }
};

/**
 * Claim a kebab
 * @param {*} event Event object passed by AWS Lambda
 * @returns Nothing
 */
module.exports.claimKebab = async (event) => {
  console.info('Event %j', event);
  if (typeof event.body === 'string') event.body = JSON.parse(event.body);
  try {
    await authorizeUser(event);
    const User = await getCognitoUser(event);
    
    const ClaimQuantity = event.body.quantity;

    if (ClaimQuantity > 2 || ClaimQuantity <= 0) {
      return errorResponse({ statusCode: 400, message: 'You can only claim a maximum of 2 kebabs a day'});
    }

    let ClaimDate = new Date(event.body.claimDate)
    if (ClaimDate) {
      const minDate = new Date(minClaimDate);
      const maxDate = new Date(maxClaimDate);
      if (ClaimDate < minDate || ClaimDate > maxDate) {
        return errorResponse({ statusCode: 400, message: `Cheeky. You can only make claims between ${minDate.toDateString()} and ${maxDate.toDateString()}`});
      }
      ClaimDate = ClaimDate.toISOString()
    } else {
      return errorResponse({ statusCode: 400, message: 'Invalid Claim Date Sent' });
    }
    
    const paramsPut = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: {
        PrimaryKey: `USER:${User['cognito:username']}`,
        SortKey: `KEBAB:${ClaimDate.split("T")[0]}`,
        ClaimQuantity,
        ClaimDate,
        isPaid: false,
        PayAmount: 0,
        PayCurrency: 'DKK',
        PayDate: '',
        PayReference: '',
        Notes: '',
        UpdatedAt: Date.now()
      },
      ConditionExpression: 'attribute_not_exists(SortKey)'
    }
    await documentClient.put(paramsPut).promise();

    return successResponse(200, { message: "Success" });
  } catch (err) {
    console.error(err);
    if (err.code === 'ConditionalCheckFailedException') {
        console.error('Kebab Limit Reached for given date');
        return errorResponse({ statusCode: 400, message: 'Kebab Limit Reached for given date' });
    } else {
        return errorResponse(err, `Failed to claim kebabs`);
    }
  }
}
