import { connectDB, getArrayOfData } from "@/helper/db-util";
const dbName = "events";
const collectionName = "events";
export default async function handler(req, res) {
  const method = req.method;
  const params = req.query;
  let client;
  const filterData = params.slug;
  if (method === "GET") {
    try {
      client = await connectDB();
    } catch (error) {
      res.status(500).json({ message: "Couldn't connect with database" });
    }
    const filteredYear = filterData?.[0];
    const filteredMonth = filterData?.[1];
    let monthIsExist = true;
    if (filteredMonth === "-") monthIsExist = false;
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;
    if (
      isNaN(numYear) ||
      (isNaN(numMonth) && monthIsExist) ||
      numYear > 2030 ||
      numYear < 2021 ||
      (numMonth < 1 && monthIsExist) ||
      (numMonth > 12 && monthIsExist)
    ) {
      res.status(500).json({ message: "Invalid Input" });
    }
    let events;
    try {
      events = await getArrayOfData(client, dbName, collectionName, {}, {});
    } catch (error) {
      res.status(500).res({ message: "Couldn't get data from database" });
    }
    let filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === numYear &&
        (eventDate.getMonth() === numMonth - 1 || !numMonth)
      );
    });
    res.status(200).json({ message: "Success", filteredEvents });
  }
  client.close();
}
