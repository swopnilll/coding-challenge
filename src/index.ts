import * as path from 'path';
import { readJsonData } from './utils/dataLoader';
import { calculateFinancialMetrics } from './calculations/calc';


// Example usage: assuming `data.json` is in the same directory as this script
const filePath = 'data.json';

const data = readJsonData(filePath);

if (data) {
  const {revenue,
    expenses,
    grossProfitMargin,
    netProfitMargin,
    workingCapitalRatio} = calculateFinancialMetrics(data);

    console.log({revenue,
        expenses,
        grossProfitMargin,
        netProfitMargin,
        workingCapitalRatio})
} else {
  console.log('Failed to read or parse the data.');
}