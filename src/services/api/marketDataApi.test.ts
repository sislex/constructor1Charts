import { describe, expect, it } from 'vitest';
import { mapQuoteKeysResponse } from './marketDataApi';

describe('marketDataApi mappers', () => {
  it('maps array string responses to quote sources', () => {
    const sources = mapQuoteKeysResponse(['bybit|ETH/USDC|askPrice']);

    expect(sources).toHaveLength(1);
    expect(sources[0].parsed.sourceType).toBe('CEX');
  });

  it('maps detail array responses', () => {
    const sources = mapQuoteKeysResponse([
      {
        key: 'binance|ETH/USDT|bidPrice',
        memorySize: 2048,
        pointsCount: 10,
        lastValue: '3524.12',
        lastTimestamp: 1726156800000
      }
    ]);

    expect(sources[0]).toMatchObject({
      key: 'binance|ETH/USDT|bidPrice',
      memorySize: 2048,
      pointsCount: 10,
      lastValue: 3524.12
    });
  });

  it('maps object responses and skips invalid keys', () => {
    const sources = mapQuoteKeysResponse({
      'bybit|ETH/USDC|askPrice': { memory: 100, count: 2, value: 10 },
      'bad-key': { memory: 100 }
    });

    expect(sources).toHaveLength(1);
    expect(sources[0].key).toBe('bybit|ETH/USDC|askPrice');
  });
});
