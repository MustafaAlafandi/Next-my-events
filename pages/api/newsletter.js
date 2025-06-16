import { MongoClient } from "mongodb";
import "dotenv/config"
export default async function handler(req, res) {
  const email = req.body.email;
  if (req.method === "POST") {
    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address. " });
    }
    const url = process.env.MongoDBURL;
    const dbName = "auth";
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("emails");
    await collection.insertOne({ email });
    res.status(201).json({ message: "Signed Up" });
    client.close();
  }
}
// mongodb+srv://mustafaalafandi1194:vE3COWazG2tg2Hfn@cluster0.2tp8rjv.mongodb.net/
