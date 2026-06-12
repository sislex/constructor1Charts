import { describe, expect, it } from 'vitest';
import { getDisplayPair, getQuoteSourceLabel, resolveTokenSymbol, shortenAddress } from './tokenResolver';
import { parseQuoteKeyOrThrow } from '@utils/parser/quoteKeyParser';

describe('tokenResolver', () => {
  it('resolves known DEX token addresses', () => {
    expect(
      resolveTokenSymbol('0xaf88d065e77c8cc2239327c5edb3a432268e5831', 'arbitrum')
    ).toBe('USDC');
  });

  it('shortens unknown addresses', () => {
    expect(shortenAddress('0x1234567890abcdef')).toBe('0x1234...cdef');
  });

  it('builds display pair without mutating raw key', () => {
    const parsed = parseQuoteKeyOrThrow(
      'dex:arbitrum|0xaf88d065e77c8cc2239327c5edb3a432268e5831/0x82af49447d8a07e3bd95bd0d56f35241523fbab1|bidPrice'
    );

    expect(getDisplayPair(parsed)).toBe('USDC/WETH');
    expect(parsed.raw).toContain('0xaf88d065e77c8cc2239327c5edb3a432268e5831');
  });

  it('builds user-facing labels', () => {
    const parsed = parseQuoteKeyOrThrow('bybit|ETH/USDC|askPrice');

    expect(getQuoteSourceLabel(parsed)).toBe('[CEX][Bybit] ETH/USDC askPrice');
  });
});
