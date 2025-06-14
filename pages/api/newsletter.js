import {
  buildDataPath,
  readFile,
  writeOnFile,
} from "../../helper/backend-functions.js";
export default function handler(req, res) {
  console.log("body",req.body);
console.log("method",req.method);
  if (req.method === "POST") {
    const filePath = buildDataPath("newsletter");
    let newsletter = readFile(filePath);
    const data = { id: new Date().toDateString(), email: req.body.email };
    newsletter.push(data);
    newsletter = JSON.stringify(newsletter);
    writeOnFile(filePath, newsletter);
    res.status(200).json({ message: "Success" });
  }
  else
  res.status(404).json({message: "Unsupported request"});
}
