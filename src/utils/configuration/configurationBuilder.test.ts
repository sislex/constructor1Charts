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
      buySettings: {
        buyAmount: 100,
        buyCurrency: 'USDC',
        buyAmountType: 'FIXED'
      },
      sellSettings: {
        sellAmount: 100,
        sellCurrency: 'USDC',
        sellMode: 'FULL_POSITION'
      },
      demoSettings: {
        enabled: true,
        demoTransactionDelayMs: 5000
      },
      advancedSettings: {
        defaultSlippagePercent: 0.1,
        tradingFeePercent: 0.1,
        gasFee: 0,
        autoSaveEnabled: false,
        autoSaveIntervalMs: 30000
      },
      conditions: [
        {
          id: 'condition-1',
          name: 'Take Profit',
          enabled: true,
          action: 'SELL',
          priority: 1,
          when: {
            metric: 'positionProfitPercent',
            operator: 'GREATER_OR_EQUAL',
            value: 0.5
          }
        }
      ],
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
      conditions: [
        {
          id: 'condition-1',
          name: 'Take Profit',
          enabled: true,
          action: 'SELL',
          priority: 1,
          when: {
            metric: 'positionProfitPercent',
            operator: 'GREATER_OR_EQUAL',
            value: 0.5
          }
        }
      ],
      buySettings: {
        buyAmount: 100,
        buyCurrency: 'USDC',
        buyAmountType: 'FIXED'
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
      buySettings: {
        buyAmount: 100,
        buyCurrency: 'USDC',
        buyAmountType: 'FIXED'
      },
      sellSettings: {
        sellAmount: 100,
        sellCurrency: 'USDC',
        sellMode: 'FULL_POSITION'
      },
      demoSettings: {
        enabled: true,
        demoTransactionDelayMs: 5000
      },
      advancedSettings: {
        defaultSlippagePercent: 0.1,
        tradingFeePercent: 0.1,
        gasFee: 0,
        autoSaveEnabled: false,
        autoSaveIntervalMs: 30000
      },
      conditions: [],
      createdAt: '2026-06-12T00:00:00.000Z',
      updatedAt: '2026-06-12T00:00:00.000Z'
    });

    expect(serializeBotConfiguration(configuration)).toContain('\n  "name": "ETH Arbitrage"');
  });
});
