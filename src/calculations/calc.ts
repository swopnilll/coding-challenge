import { IAccount } from "../interfaces/IAccount";
import { IGeneralLedger } from "../interfaces/IGeneralLedger";

// Helper function to calculate sums based on category, value type, and account types
const calculateSum = (accountCategory: string, valueType: string, accountTypes: string[], account: IGeneralLedger): number => {
    return account.account_category === accountCategory &&
           account.value_type === valueType &&
           accountTypes.includes(account.account_type)
      ? account.total_value
      : 0;
  };
  
  // Method to calculate assets (from debit and credit)
  const calculateAssets = (account: IGeneralLedger, assetDebitTypes: string[], assetCreditTypes: string[], totals: any) => {
    if (account.account_category === 'assets') {
      if (account.value_type === 'debit' && assetDebitTypes.includes(account.account_type)) {
        totals.totalAssetsDebit += account.total_value;
      }
      if (account.value_type === 'credit' && assetCreditTypes.includes(account.account_type)) {
        totals.totalAssetsCredit += account.total_value;
      }
    }
  };
  
  // Method to calculate liabilities (from debit and credit)
  const calculateLiabilities = (account: IGeneralLedger, liabilityDebitTypes: string[], liabilityCreditTypes: string[], totals: any) => {
    if (account.account_category === 'liability') {
      if (account.value_type === 'debit' && liabilityDebitTypes.includes(account.account_type)) {
        totals.totalLiabilitiesDebit += account.total_value;
      }
      if (account.value_type === 'credit' && liabilityCreditTypes.includes(account.account_type)) {
        totals.totalLiabilitiesCredit += account.total_value;
      }
    }
  };
  
  // Main function to calculate all financial metrics
  export const calculateFinancialMetrics = (accountingData: IAccount) => {
    // Initialize totals object to store metrics
    let totals = {
      revenue: 0,
      expenses: 0,
      salesDebit: 0,
      totalAssetsDebit: 0,
      totalAssetsCredit: 0,
      totalLiabilitiesDebit: 0,
      totalLiabilitiesCredit: 0,
    };
  
    // Categories for assets and liabilities
    const assetDebitTypes = ['current', 'bank', 'current_accounts_receivable'];
    const assetCreditTypes = ['current', 'bank', 'current_accounts_receivable'];
    const liabilityDebitTypes = ['current', 'current_accounts_payable'];
    const liabilityCreditTypes = ['current', 'current_accounts_payable'];
  
    // Single loop to calculate all metrics
    accountingData.data.forEach(account => {
      // Revenue Calculation
      if (account.account_category === 'revenue') {
        totals.revenue += account.total_value;
      }
  
      // Expenses Calculation
      if (account.account_category === 'expense') {
        totals.expenses += account.total_value;
      }
  
      // Sales Debit Calculation for Gross Profit Margin
      if (account.account_type === 'sales' && account.value_type === 'debit') {
        totals.salesDebit += account.total_value;
      }
  
      // Handle Assets (Debit and Credit)
      calculateAssets(account, assetDebitTypes, assetCreditTypes, totals);
  
      // Handle Liabilities (Debit and Credit)
      calculateLiabilities(account, liabilityDebitTypes, liabilityCreditTypes, totals);
    });
  
    // Calculate the financial ratios
    const assets = totals.totalAssetsDebit - totals.totalAssetsCredit;
    const liabilities = totals.totalLiabilitiesCredit - totals.totalLiabilitiesDebit;
    
    const workingCapitalRatio = liabilities === 0 ? 0 : assets / liabilities;
    const grossProfitMargin = totals.revenue === 0 ? 0 : (totals.salesDebit / totals.revenue) * 100;
    const netProfitMargin = totals.revenue === 0 ? 0 : ((totals.revenue - totals.expenses) / totals.revenue) * 100;
  
    return {
      revenue: totals.revenue,
      expenses: totals.expenses,
      grossProfitMargin,
      netProfitMargin,
      workingCapitalRatio,
    };
  };
  