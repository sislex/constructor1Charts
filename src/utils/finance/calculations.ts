export function calculatePnL(entryPrice: number, currentPrice: number, amount: number): number {
  return (currentPrice - entryPrice) * amount;
}

export function calculatePnLPercent(entryPrice: number, currentPrice: number): number {
  if (entryPrice === 0) {
    return 0;
  }

  return ((currentPrice - entryPrice) / entryPrice) * 100;
}

export function calculateSlippagePercent(expectedPrice: number, executionPrice: number): number {
  if (expectedPrice === 0) {
    return 0;
  }

  return ((executionPrice - expectedPrice) / expectedPrice) * 100;
}

export function calculateTradingFee(notional: number, feePercent: number): number {
  return notional * (feePercent / 100);
}

export function calculateProfitAfterFees(
  grossProfit: number,
  entryNotional: number,
  exitNotional: number,
  tradingFeePercent: number,
  gasFee: number
): number {
  const fees =
    calculateTradingFee(entryNotional, tradingFeePercent) +
    calculateTradingFee(exitNotional, tradingFeePercent) +
    gasFee;

  return grossProfit - fees;
}
