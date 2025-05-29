import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  UpdateCommand,
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
  const { Items } = await docClient.send(new ScanCommand({ TableName: TABLE }));
  return Items || [];
}

export async function createAnimal(animal) {
  await docClient.send(new PutCommand({ TableName: TABLE, Item: animal }));
}

export async function deleteAnimal(id) {
  await docClient.send(new DeleteCommand({ TableName: TABLE, Key: { id } }));
}



export async function updateAnimalImage(id, imageUrl) {
  await docClient.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: { id },
      UpdateExpression: "SET #imageUrl = :url",
      ExpressionAttributeNames: { "#imageUrl": "imageUrl" },
      ExpressionAttributeValues: { ":url": imageUrl },
    }),
  );
}

export async function toggleAdopted(id, adopted) {
  await docClient.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: { id },
      UpdateExpression: "SET #adopted = :val",
      ExpressionAttributeNames: { "#adopted": "adopted" },
      ExpressionAttributeValues: { ":val": adopted },
    }),
  );
}
