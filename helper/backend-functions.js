import path from "path";
import fs from "fs";
export function buildDataPath(dataName) {
  return path.join(process.cwd(), "data", dataName + ".json");
}
export function readFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath));
}
export function writeOnFile(filePath, writeValue) {
  fs.writeFileSync(filePath, writeValue);
}
