exports.handler = async function(event) {
  // Load the AWS SDK for Node.js
  var AWS = require('aws-sdk');
  // Set the region 
  //AWS.config.update({region: 'REGION'});

  // Create the DynamoDB service object
  var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var params = {
    TableName: 'users',
    Item: {
      'id' : {N: '001'},
      'name' : {S: 'Elvis'},
      'address': {S: 'Coronel'},
    }
  };

  // Call DynamoDB to add the item to the table
  ddb.putItem(params, function(err, data) {
    if (err) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "text/plain" },
        body: err
      };
    } else {
      return {
        statusCode: 201,
        headers: { "Content-Type": "text/plain" },
        body: `save user!` + data
      };
    }
  });
};