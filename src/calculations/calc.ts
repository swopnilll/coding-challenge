import { IAccount } from "../interfaces/IAccount";
import { IGeneralLedger } from "../interfaces/IGeneralLedger";
import { IGeneralLedgerCalculation } from "../interfaces/IGeneralLedgerCalculation";

// Method to calculate assets (from debit and credit)
export const calculateAssets = (
  account: IGeneralLedger,
  assetDebitTypes: string[],
  assetCreditTypes: string[],
  totals: IGeneralLedgerCalculation
) => {
  if (
    account.value_type === "debit" &&
    assetDebitTypes.includes(account.account_type)
  ) {
    totals.totalAssetsDebit += account.total_value;
  }
  if (
    account.value_type === "credit" &&
    assetCreditTypes.includes(account.account_type)
  ) {
    totals.totalAssetsCredit += account.total_value;
  }
};

// Method to calculate liabilities (from debit and credit)
export const calculateLiabilities = (
  account: IGeneralLedger,
  liabilityDebitTypes: string[],
  liabilityCreditTypes: string[],
  totals: IGeneralLedgerCalculation
) => {
  if (account.account_category === "liability") {
    if (
      account.value_type === "debit" &&
      liabilityDebitTypes.includes(account.account_type)
    ) {
      totals.totalLiabilitiesDebit += account.total_value;
    }
    if (
      account.value_type === "credit" &&
      liabilityCreditTypes.includes(account.account_type)
    ) {
      totals.totalLiabilitiesCredit += account.total_value;
    }
  }
};
