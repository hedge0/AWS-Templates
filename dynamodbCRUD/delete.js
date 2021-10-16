let AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
let DynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'NEW_TABLE';

exports.handler = async (event) => {
    let response = {};
    let statuscode = 200;
    let params = {
        TableName: tableName,
        Key: {
            Key: event.Key
        }
    };

    try {
        await DynamoDB.delete(params).promise();
        response = {'message': "Data Removed"};
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
