import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
  region: "us-east-1",
});

console.log("🧩 DynamoDBClient inicializado con región:", client.config.region);

export const dynamoClient = DynamoDBDocumentClient.from(client);