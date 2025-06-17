import { connectDB, insertDocument, getArrayOfData } from "@/helper/db-util";
export default async function handler(req, res) {
  const method = req.method;
  const eventId = req.query.eventId;
  const dbName = "events";
  const collectionName = "comments";
  let client;
  try {
    client = await connectDB();
  } catch (error) {
    res.status(500).json({ message: "Connecting with the database failed." });
    return;
  }
  if (method === "GET") {
    try {
      const comments = await getArrayOfData(
        client,
        dbName,
        collectionName,
        { eventId },
        { _id: -1 }
      );
      res.status(200).json({ message: "Success", comments });
    } catch (error) {
      res.status(500).json({ message: "Get data from database failed." });
      return;
    }
  } else if (method === "POST") {
    const comment = { ...req.body, eventId };
    try {
      await insertDocument(client, dbName, collectionName, comment);
      res.status(200).json({ message: "Success", comment });
    } catch (error) {
      res.status(500).json({ message: "Inserting data to database failed." });
    }
  }
  client.close();
}
