import { describe, expect, it } from 'vitest';
import { parseQuoteKeyOrThrow } from '@utils/parser/quoteKeyParser';
import { getProfitCurrency } from './profitCurrency';

describe('getProfitCurrency', () => {
  it('returns quote asset for CEX pairs', () => {
    expect(getProfitCurrency(parseQuoteKeyOrThrow('bybit|ETH/USDC|askPrice'))).toBe('USDC');
  });

  it('resolves quote asset symbol for DEX pairs', () => {
    const parsed = parseQuoteKeyOrThrow(
      'dex:arbitrum|0xaf88d065e77c8cc2239327c5edb3a432268e5831/0x82af49447d8a07e3bd95bd0d56f35241523fbab1|bidPrice'
    );

    expect(getProfitCurrency(parsed)).toBe('WETH');
  });
});
