import {
  formatCurrencyWithCommas,
  formatPercentage,
} from "../../src/utils/formatter";

describe("formatPercentage", () => {
  it("should calculate and format the percentage correctly for valid inputs", () => {
    expect(formatPercentage(50, 200)).toBe("25.0%");
    expect(formatPercentage(75, 300)).toBe("25.0%");
    expect(formatPercentage(1, 3)).toBe("33.3%");
  });

  it("should return 0.0% when the part is 0", () => {
    expect(formatPercentage(0, 100)).toBe("0.0%");
  });

  it("should handle total as 0 and avoid division by zero", () => {
    expect(formatPercentage(50, 0)).toBe("0.0%");
  });

  it("should handle negative values correctly", () => {
    expect(formatPercentage(-50, 200)).toBe("-25.0%");
    expect(formatPercentage(50, -200)).toBe("-25.0%");
    expect(formatPercentage(-50, -200)).toBe("25.0%");
  });

  it("should throw an error if part or total is not a number", () => {
    expect(() => formatPercentage("test" as unknown as number, 100)).toThrow(
      "Both part and total must be valid numbers"
    );
    expect(() => formatPercentage(100, "test" as unknown as number)).toThrow(
      "Both part and total must be valid numbers"
    );
    expect(() =>
      formatPercentage("test" as unknown as number, "test" as unknown as number)
    ).toThrow("Both part and total must be valid numbers");
  });
});

describe("formatCurrencyWithCommas", () => {
  it("should return formatted number with commas", () => {
    // Test a valid number input
    const result = formatCurrencyWithCommas(1234567);
    expect(result).toBe("$1,234,567");
  });

  it("should round and format decimal numbers correctly", () => {
    const result = formatCurrencyWithCommas(1234567.89);
    expect(result).toBe("$1,234,568");
  });

  it("should throw an error if the input is not a number", () => {
    expect(() => formatCurrencyWithCommas("test" as unknown as number)).toThrow(
      "Input must be a number"
    );
  });
});
