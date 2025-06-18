import { connectDB, getArrayOfData } from "../../../helper/db-util";
const dbName = "events";
const collectionName = "events";

export default async function handler(req, res) {
  const method = req.method;
  const featured = req.query.featured;
  let client;
  try {
    client = await connectDB();
  } catch (error) {
    res.status(500).json({ message: "Failed to connect with database." });
  }
  if (method === "GET") {
    let events;
    if (featured) {
      try {
        events = await getArrayOfData(
          client,
          dbName,
          collectionName,
          { isFeatured: true },
          { _id: -1 }
        );
      } catch (error) {
        res.status(200).json({ message: "Failed to get data from the server" });
      }
    } else {
      try {
        events = await getArrayOfData(
          client,
          dbName,
          collectionName,
          {},
          { _id: -1 }
        );
      } catch (error) {
        res.status(200).json({ message: "Failed to get data from the server" });
      }
    }
    res.status(200).json({ message: "success",events });
    client.close();
  }
}
