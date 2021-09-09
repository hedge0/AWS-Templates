var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
var DynamoDB = new AWS.DynamoDB.DocumentClient();
var tableName = 'NEW_TABLE';

exports.handler = async (event) => {
    var response = [];
    var statuscode = 200;
    var items;
    var params = {
        TableName: tableName
    };
        
    do {
        items = await DynamoDB.scan(params).promise();
        items.Items.forEach((item) => response.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
    } 
    while(typeof items.LastEvaluatedKey !== "undefined");
        
    return {
        'statusCode': statuscode,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': response,
        'isBase64Encoded': false
    };
};