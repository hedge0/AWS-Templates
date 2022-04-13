const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const DynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'NEW_TABLE';

exports.handler = async (event) => {
  const response = [];
  let items;
  const params = {
    TableName: tableName
  };

  do {
    items = await DynamoDB.query(params).promise();
    items.Items.forEach((item) => response.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  }
  while (typeof items.LastEvaluatedKey !== 'undefined');

  return response;
};
