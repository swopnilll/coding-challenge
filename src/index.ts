import { readJsonData } from "./utils/dataLoader";

import { IAccount } from "./interfaces/IAccount";

import { handleGeneralLedgerCalculations } from "./operations/generalLedger";

const filePath = "data.json";

const data: IAccount | null = readJsonData(filePath);

if (data) {
  switch (data.object_category) {
    case "general-ledger":
      handleGeneralLedgerCalculations(data);
      break;

    default:
      break;
  }
} else {
  console.log("Failed to read or parse the data.");
}
