import { calculateAssets, calculateLiabilities } from "../calculations/calc";
import { IAccount } from "../interfaces/IAccount";
import { IGeneralLedgerCalculation } from "../interfaces/IGeneralLedgerCalculation";
import { IGeneralLedgerMetrics } from "../interfaces/IGeneralLedgerMetrics";
import { formatCurrencyWithCommas, formatPercentage } from "../utils/formatter";
import { formatAndPrintMetrics } from "./displayGeneralLedgerResult";

let ledgerCalculationUtilObject: IGeneralLedgerCalculation = {
  revenue: 0,
  expenses: 0,
  salesDebit: 0,
  totalAssetsDebit: 0,
  totalAssetsCredit: 0,
  totalLiabilitiesDebit: 0,
  totalLiabilitiesCredit: 0,
};

// Categories for assets and liabilities
const assetDebitTypes = ["current", "bank", "current_accounts_receivable"];
const assetCreditTypes = ["current", "bank", "current_accounts_receivable"];
const liabilityDebitTypes = ["current", "current_accounts_payable"];
const liabilityCreditTypes = ["current", "current_accounts_payable"];

const formatDataForGeneralLedgerCalculations = (
  accountingData: IAccount,
  totals: IGeneralLedgerCalculation
) => {
  accountingData.data.forEach((account) => {
    // Revenue Calculation
    if (account.account_category === "revenue") {
      totals.revenue += account.total_value;
    }

    // Expenses Calculation
    if (account.account_category === "expense") {
      totals.expenses += account.total_value;
    }

    // Sales Debit Calculation for Gross Profit Margin
    if (account.account_type === "sales" && account.value_type === "debit") {
      totals.salesDebit += account.total_value;
    }

    if (account.account_category === "assets") {
      calculateAssets(account, assetDebitTypes, assetCreditTypes, totals);
    }

    if (account.account_category === "liability") {
      calculateLiabilities(
        account,
        liabilityDebitTypes,
        liabilityCreditTypes,
        totals
      );
    }

    return totals;
  });
};

export const handleGeneralLedgerCalculations = (accountingData: IAccount) => {
  // Perform ledger calculations
  formatDataForGeneralLedgerCalculations(
    accountingData,
    ledgerCalculationUtilObject
  );

  // Destructure the utility object for easier access
  const {
    totalAssetsDebit,
    totalAssetsCredit,
    totalLiabilitiesCredit,
    totalLiabilitiesDebit,
    revenue,
    expenses,
    salesDebit,
  } = ledgerCalculationUtilObject;

  const ledgerCalulatedValues: IGeneralLedgerMetrics = {
    revenue: "",
    expenses: "",
    grossProfitMargin: "",
    netProfitMargin: "",
    workingCapitalRatio: "",
  };

  ledgerCalulatedValues.revenue = formatCurrencyWithCommas(revenue);
  ledgerCalulatedValues.expenses = formatCurrencyWithCommas(expenses);

  // Calculate financial metrics
  const assets = totalAssetsDebit - totalAssetsCredit;
  const liabilities = totalLiabilitiesCredit - totalLiabilitiesDebit;

  ledgerCalulatedValues.workingCapitalRatio =
    liabilities === 0 ? "0%" : formatPercentage(assets, liabilities);

  ledgerCalulatedValues.grossProfitMargin =
    revenue === 0 ? "0%" : formatPercentage(salesDebit, revenue);

  ledgerCalulatedValues.netProfitMargin =
    revenue === 0 ? "0%" : formatPercentage(revenue - expenses, revenue);

  formatAndPrintMetrics(ledgerCalulatedValues);
};
