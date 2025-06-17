import { MongoClient } from "mongodb";
import "dotenv/config";
const url = process.env.MongoDBURL;
const dbName = "auth";
async function connectDB() {
  const client = new MongoClient(url);
  await client.connect();
  return client;
}
async function insertDocument(client, document) {
  const db = client.db(dbName);
  const collection = db.collection("emails");
  await collection.insertOne(document);
}
export default async function handler(req, res) {
  const email = req.body.email;
  if (req.method === "POST") {
    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address. " });
    }
    let client;
    try {
      client = await connectDB();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed." });
      return;
    }
    try {
      await insertDocument(client, { email });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed." });
    }
    res.status(201).json({ message: "Signed Up" });
  }
}
// mongodb+srv://mustafaalafandi1194:vE3COWazG2tg2Hfn@cluster0.2tp8rjv.mongodb.net/
