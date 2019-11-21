var AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    const userEmail = event.requestContext.authorizer.claims['cognito:username'];
    var params = {
        TableName: "TodoMario",
        KeyConditionExpression: "#key = :str",
        ExpressionAttributeNames:{
            "#key": "user_email"
        },
        ExpressionAttributeValues: {
            ":str": userEmail
        }
    };

    console.log("event:", event);
    ddb.query(params, function(err, data) {
        console.log("dynamo_data:", data);
        console.log("dynamo_err:", err);
        if(err){
            callback(null, {
                statusCode: 500,
                body: JSON.stringify({
                  Error: err.message,
                  Reference: context.awsRequestId,
                }),
                headers: {
                  'Access-Control-Allow-Origin': '*',
                },
            });
        }
        context.done(null, data);
    });
};