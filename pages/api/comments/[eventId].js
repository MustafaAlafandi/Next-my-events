import { MongoClient } from "mongodb";
export default async function handler(req, res) {
  const method = req.method;
  const eventId = req.query.eventId;
  const dbName = "events";
  const collectionName = "comments";
  const url = process.env.MongoDBURL;
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  if (method === "GET") {
    const comments = await collection.find({ eventId }).toArray();
    res.status(200).json({ message: "Success", comments });
  } else if (method === "POST") {
    const comment = { ...req.body, eventId };
    await collection.insertOne(comment);
    res.status(200).json({ message: "Success", comment });
  }
  client.close();
}
