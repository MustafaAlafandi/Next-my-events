import {
  buildDataPath,
  readFile,
  writeOnFile,
} from "../../../helper/backend-functions.js";
export default function handler(req, res) {
  const method = req.method;
  const eventId = req.query.eventId;
  const filePath = buildDataPath("comments");
  let comments = readFile(filePath);
  if (method === "GET") {
    comments = comments[eventId];
    res.status(200).json({ message: "Success", comments });
  } else if (method === "POST") {
    const data = {
      id: new Date().toDateString(),
      ...req.body,
    };
    comments[eventId].push(data);
    comments = JSON.stringify(comments);
    writeOnFile(filePath, comments);
    res.status(200).json({ message: "Success" });
  } else res.status(404).json({ message: "Unsupported request" });
}
