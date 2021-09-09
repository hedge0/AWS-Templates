var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
var DynamoDB = new AWS.DynamoDB.DocumentClient();
var tableName = 'NEW_TABLE';

exports.handler = async (event) => {
    var response = {};
    var statuscode = 200;
    var params = {
        TableName: tableName,
        Item: {
          Key: event.Key,
          Value: event.Value
        }
    };

    try {
        await DynamoDB.put(params).promise();
        response = {'message': "Data Added"};
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