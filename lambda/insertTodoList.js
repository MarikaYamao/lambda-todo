var AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    const userEmail = event.authorizer.claims['cognito:username'];

    console.log("event:", event);
    ddb.put({
        "TableName": "TodoMario",
        "Item": {
            "TodoId": (new Date).getTime().toString(),
            "content": event.content,
            "done": false,
            "user_email": userEmail,
            "created_at": new Date().toISOString(),
            "updated_at": new Date().toISOString()
        }
    }, function( err, data ) {
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
    });
};