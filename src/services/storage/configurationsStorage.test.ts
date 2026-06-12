import { describe, expect, it } from 'vitest';
import { readStoredConfigurations, writeStoredConfigurations } from './configurationsStorage';
import type { BotConfiguration } from '@domainTypes/domain';

describe('configurationsStorage', () => {
  it('reads and writes valid configurations', () => {
    const storage = new MapStorage();
    const configurations = [createConfiguration()];

    writeStoredConfigurations(configurations, storage);

    expect(readStoredConfigurations(storage)).toEqual(configurations);
  });

  it('returns empty list for invalid storage payloads', () => {
    const storage = new MapStorage();

    storage.setItem('arbidex.configurations', '{"bad":true}');
    expect(readStoredConfigurations(storage)).toEqual([]);

    storage.setItem('arbidex.configurations', 'not-json');
    expect(readStoredConfigurations(storage)).toEqual([]);
  });
});

function createConfiguration(): BotConfiguration {
  return {
    id: 'config-1',
    name: 'ETH Arbitrage Bot',
    tags: [],
    enabled: true,
    selectedSources: ['bybit|ETH/USDC|askPrice'],
    tradingMarket: 'bybit|ETH/USDC|askPrice',
    profitCurrency: 'USDC',
    weightedAverage: { enabled: false, sources: [] },
    conditions: [],
    conditionGroups: [],
    demoSettings: { enabled: true, demoTransactionDelayMs: 5000 },
    advancedSettings: {
      defaultSlippagePercent: 0.1,
      tradingFeePercent: 0.1,
      gasFee: 0,
      autoSaveEnabled: false,
      autoSaveIntervalMs: 30000
    },
    buySettings: { buyAmount: 100, buyCurrency: 'USDC', buyAmountType: 'FIXED' },
    sellSettings: { sellAmount: 100, sellCurrency: 'USDC', sellMode: 'FULL_POSITION' },
    createdAt: '2026-06-12T00:00:00.000Z',
    updatedAt: '2026-06-12T00:00:00.000Z',
    status: 'draft'
  };
}

class MapStorage implements Storage {
  private readonly data = new Map<string, string>();
  length = 0;

  clear(): void {
    this.data.clear();
    this.length = 0;
  }

  getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }

  key(index: number): string | null {
    return Array.from(this.data.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.data.delete(key);
    this.length = this.data.size;
  }

  setItem(key: string, value: string): void {
    this.data.set(key, value);
    this.length = this.data.size;
  }
}
