import { describe, expect, it } from 'vitest';
import {
  calculatePnL,
  calculatePnLPercent,
  calculateProfitAfterFees,
  calculateSlippagePercent,
  calculateTradingFee
} from './calculations';

describe('financial calculations', () => {
  it('calculates PnL and PnL percent', () => {
    expect(calculatePnL(100, 110, 2)).toBe(20);
    expect(calculatePnLPercent(100, 110)).toBe(10);
  });

  it('handles zero entry price', () => {
    expect(calculatePnLPercent(0, 110)).toBe(0);
  });

  it('calculates slippage and fees', () => {
    expect(calculateSlippagePercent(100, 101)).toBe(1);
    expect(calculateTradingFee(1000, 0.1)).toBe(1);
  });

  it('calculates profit after fees and gas', () => {
    expect(calculateProfitAfterFees(20, 1000, 1020, 0.1, 2)).toBeCloseTo(15.98);
  });
});
