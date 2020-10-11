/* eslint-disable import/prefer-default-export */
import { v4 as uudi } from 'uuid';
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event) {
  const { title } = JSON.parse(event.body);
  const now = new Date();

  const auction = {
    id: uudi(),
    title,
    status: 'OPEN',
    createdAt: now.toISOString(),
  };

  await dynamodb.put({
    TableName: 'AuctionsTable',
    Item: auction,
  }).promise();
  return {
    statusCode: 201,
    body: JSON.stringify({ auction }),
  };
}

export const handler = createAuction;
