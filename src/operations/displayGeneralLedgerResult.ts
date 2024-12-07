import { IGeneralLedgerMetrics } from "../interfaces/IGeneralLedgerMetrics";

export const formatAndPrintMetrics = (metrics: IGeneralLedgerMetrics): void => {
  const labels: Record<keyof IGeneralLedgerMetrics, string> = {
    revenue: "Revenue",
    expenses: "Expenses",
    grossProfitMargin: "Gross Profit Margin",
    netProfitMargin: "Net Profit Margin",
    workingCapitalRatio: "Working Capital Ratio",
  };

  for (const key in metrics) {
    const label = labels[key as keyof IGeneralLedgerMetrics];
    const value = metrics[key as keyof IGeneralLedgerMetrics];

    console.log(`${label}: ${value}`);
  }
};
