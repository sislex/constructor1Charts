import { describe, expect, it } from 'vitest';
import { buildBotConfiguration, serializeBotConfiguration } from './configurationBuilder';

describe('configurationBuilder', () => {
  it('builds minimal bot configuration JSON contract', () => {
    const configuration = buildBotConfiguration({
      id: 'config-1',
      name: ' ETH Arbitrage ',
      selectedSources: ['bybit|ETH/USDC|askPrice'],
      tradingMarket: 'bybit|ETH/USDC|askPrice',
      profitCurrency: 'USDC',
      weightedAverage: {
        enabled: true,
        sources: [{ key: 'bybit|ETH/USDC|askPrice', weight: 1 }]
      },
      createdAt: '2026-06-12T00:00:00.000Z',
      updatedAt: '2026-06-12T00:00:00.000Z'
    });

    expect(configuration).toMatchObject({
      id: 'config-1',
      name: 'ETH Arbitrage',
      selectedSources: ['bybit|ETH/USDC|askPrice'],
      tradingMarket: 'bybit|ETH/USDC|askPrice',
      profitCurrency: 'USDC',
      status: 'draft',
      demoSettings: {
        enabled: true,
        demoTransactionDelayMs: 5000
      }
    });
  });

  it('serializes configuration with stable indentation', () => {
    const configuration = buildBotConfiguration({
      id: 'config-1',
      name: 'ETH Arbitrage',
      selectedSources: [],
      tradingMarket: '',
      profitCurrency: 'USDC',
      weightedAverage: { enabled: false, sources: [] },
      createdAt: '2026-06-12T00:00:00.000Z',
      updatedAt: '2026-06-12T00:00:00.000Z'
    });

    expect(serializeBotConfiguration(configuration)).toContain('\n  "name": "ETH Arbitrage"');
  });
});
