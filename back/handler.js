'use strict';

module.exports.registerKebab = async (event) => {
  return successResponse(200, "Success");
};

module.exports.listKebabRegistrations = async (event) => {
  return successResponse(200, [
    {
      id: 1,
      registrationDate: '2021-02-11-1200',
      price: '100',
      currency: 'DKK',
      notes: "Extra spicy this time",
      paid: false
    },
    {
      id: 2,
      registrationDate: '2021-02-12-1200',
      price: '100',
      currency: 'DKK',
      notes: null,
      paid: false
    }
  ])
}

// Response helpers
const errorResponse = function (error, customResponse, headers = {}) {
  return {
    statusCode: error.statusCode || error || 500,
    headers: {
      'Access-Control-Allow-Origin': '*',
      ...headers
    },
    body: JSON.stringify({ message: error.message || error.statusMessage || customResponse })
  }
};

const successResponse = function (status, body = {}, headers = {}) {
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