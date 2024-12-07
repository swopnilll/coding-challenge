import * as fs from "fs";

import { IAccount } from "../interfaces/IAccount";

export const readJsonData = (filePath: string): IAccount | null => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading or parsing the file:", err);
    return null;
  }
};
