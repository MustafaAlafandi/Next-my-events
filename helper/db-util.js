import { MongoClient } from "mongodb";
import "dotenv/config";

const url = process.env.MongoDBURL;

export async function connectDB() {
  const client = new MongoClient(url);
  await client.connect();
  return client;
}
export async function insertDocument(client, dbName, collectionName, document) {
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  await collection.insertOne(document);
}
export async function getArrayOfData(
  client,
  dbName,
  collectionName,
  find,
  sort
) {
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  return collection.find(find).sort(sort).toArray();
}
