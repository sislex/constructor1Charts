import { describe, expect, it } from 'vitest';
import { calculateWeightedAverage, normalizeWeights, validateWeights } from './weightedAverage';

describe('weighted average utilities', () => {
  it('calculates weighted average for decimal weights', () => {
    expect(
      calculateWeightedAverage(
        { binance: 100, bybit: 200 },
        [
          { key: 'binance', weight: 0.75 },
          { key: 'bybit', weight: 0.25 }
        ]
      )
    ).toBe(125);
  });

  it('normalizes percent weights', () => {
    expect(
      normalizeWeights([
        { key: 'a', weight: 50 },
        { key: 'b', weight: 50 }
      ])
    ).toEqual([
      { key: 'a', weight: 0.5 },
      { key: 'b', weight: 0.5 }
    ]);
  });

  it('validates weight sums', () => {
    expect(validateWeights([{ key: 'a', weight: 1 }]).valid).toBe(true);
    expect(validateWeights([{ key: 'a', weight: 0.2 }]).valid).toBe(false);
    expect(validateWeights([{ key: 'a', weight: -1 }]).valid).toBe(false);
  });

  it('returns undefined when a price is missing', () => {
    expect(
      calculateWeightedAverage(
        { a: 10 },
        [
          { key: 'a', weight: 0.5 },
          { key: 'b', weight: 0.5 }
        ]
      )
    ).toBeUndefined();
  });
});
