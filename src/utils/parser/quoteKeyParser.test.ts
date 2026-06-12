import { describe, expect, it } from 'vitest';
import { getSourceType, parseQuoteKey, parseQuoteKeyOrThrow } from './quoteKeyParser';

describe('parseQuoteKey', () => {
  it('parses CEX quote keys', () => {
    const parsed = parseQuoteKeyOrThrow('bybit|ETH/USDC|askPrice');

    expect(parsed).toMatchObject({
      raw: 'bybit|ETH/USDC|askPrice',
      source: 'bybit',
      sourceType: 'CEX',
      pair: 'ETH/USDC',
      baseAsset: 'ETH',
      quoteAsset: 'USDC',
      field: 'askPrice'
    });
    expect(parsed.network).toBeUndefined();
  });

  it('parses DEX quote keys with network', () => {
    const parsed = parseQuoteKeyOrThrow(
      'dex:arbitrum|0xaf88d065e77c8cc2239327c5edb3a432268e5831/0x82af49447d8a07e3bd95bd0d56f35241523fbab1|bidPrice'
    );

    expect(parsed.sourceType).toBe('DEX');
    expect(parsed.network).toBe('arbitrum');
    expect(parsed.field).toBe('bidPrice');
  });

  it('supports all declared quote fields', () => {
    for (const field of ['bidPrice', 'askPrice', 'bidPool', 'askPool']) {
      const result = parseQuoteKey(`bybit|ETH/USDC|${field}`);
      expect(result.ok).toBe(true);
    }
  });

  it('returns typed errors for malformed input', () => {
    expect(parseQuoteKey('').ok).toBe(false);
    expect(parseQuoteKey('bybit|ETH/USDC').ok).toBe(false);
    expect(parseQuoteKey('bybit|ETH/USDC|lastPrice').ok).toBe(false);
  });

  it('detects source type', () => {
    expect(getSourceType('dex:arbitrum')).toBe('DEX');
    expect(getSourceType('bybit')).toBe('CEX');
  });
});
