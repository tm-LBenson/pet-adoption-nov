import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
const TABLE = "animals";

const client = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
  },
});
// process === import.meta

const docClient = DynamoDBDocumentClient.from(client);

export async function scanAnimals() {
  const { Items } = await docClient.send(new ScanCommand({TableName: TABLE}));
  return Items || [];
}

export async function createAnimal(animal) {
  await docClient.send(new PutCommand({ TableName: TABLE, Item: animal }));
}

