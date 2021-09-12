var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
var DynamoDB = new AWS.DynamoDB.DocumentClient();
var tableName = 'NEW_TABLE';

exports.handler = async (event) => {
    var response = {};
    var statuscode = 200;
    var params = {
        TableName: tableName,
        Key: {
            Key: event.Key
        },
        ReturnValues: "ALL_OLD"
    };

    try {
        var retrievedData = await DynamoDB.delete(params).promise();
        params = {
            TableName: tableName,
            Item: {
              Key: event.newKey,
              Value: retrievedData.Attributes.Value
            }
        };
    
        try {
            await DynamoDB.put(params).promise();
            response = {'message': "Data Updated"};
        } 
        catch(err) {
            response = err;
            statuscode = 400;
        }
    } 
    catch(err) {
        response = err;
        statuscode = 400;
    }
    
    return {
        'statusCode': statuscode,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': response,
        'isBase64Encoded': false
    };
};
