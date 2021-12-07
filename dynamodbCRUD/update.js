let AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const DynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'NEW_TABLE';

exports.handler = async (event) => {
    let response;
    let params = {
        TableName: tableName,
        Key: {
            Key: event.Key
        },
        UpdateExpression: 'set value = :val',
        ExpressionAttributeValues: {
          ':val': event.Value
        }
    };

    try {
        reponse = await DynamoDB.update(params).promise()
    } catch (err) {
        response = err;
    }

    return response;
};
