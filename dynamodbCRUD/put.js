const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const DynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'NEW_TABLE';

exports.handler = async (event) => {
    let response;
    const params = {
        TableName: tableName,
        Item: {
            Key: event.Key,
            Value: event.Value
        }
    };

    try {
        reponse = await DynamoDB.put(params).promise()
    } catch (err) {
        response = err;
    }

    return response;
};
