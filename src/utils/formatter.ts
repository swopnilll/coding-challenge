export const formatCurrencyWithCommas = (number: number): string => {
  if (typeof number !== "number") {
    throw new Error("Input must be a number");
  }

  // Round the number to the nearest integer and format it with commas
  const roundedNumber = Math.round(number);

  // Return the formatted number with a '$' sign
  return `$${roundedNumber.toLocaleString()}`;
};

// Utility function to calculate percentage and format it with one decimal place and '%'
export const formatPercentage = (part: number, total: number): string => {
  if (typeof part !== "number" || typeof total !== "number") {
    throw new Error("Both part and total must be valid numbers");
  }

  if (total === 0) {
    return "0.0%"; // Avoid division by zero
  }

  // Calculate the percentage
  const percentage = (part / total) * 100;

  // Return the result with one decimal place and the '%' sign
  return `${percentage.toFixed(1)}%`;
};
