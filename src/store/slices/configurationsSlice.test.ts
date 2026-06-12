import { describe, expect, it } from 'vitest';
import {
  configurationDeleted,
  configurationDuplicated,
  configurationSaved,
  configurationsSlice
} from './configurationsSlice';
import type { BotConfiguration } from '@domainTypes/domain';

describe('configurationsSlice', () => {
  it('saves, updates and deletes configurations', () => {
    const configuration = createConfiguration('config-1', 'ETH Bot');
    let state = configurationsSlice.reducer(undefined, configurationSaved(configuration));

    expect(state.items).toHaveLength(1);

    state = configurationsSlice.reducer(
      state,
      configurationSaved({ ...configuration, name: 'Updated Bot' })
    );

    expect(state.items).toHaveLength(1);
    expect(state.items[0].name).toBe('Updated Bot');

    state = configurationsSlice.reducer(state, configurationDeleted('config-1'));

    expect(state.items).toHaveLength(0);
  });

  it('duplicates configurations', () => {
    const configuration = createConfiguration('config-1', 'ETH Bot');
    let state = configurationsSlice.reducer(undefined, configurationSaved(configuration));

    state = configurationsSlice.reducer(
      state,
      configurationDuplicated({
        id: 'config-1',
        newId: 'config-2',
        createdAt: '2026-06-12T01:00:00.000Z'
      })
    );

    expect(state.items).toHaveLength(2);
    expect(state.items[1]).toMatchObject({
      id: 'config-2',
      name: 'ETH Bot Copy',
      status: 'draft'
    });
  });
});

function createConfiguration(id: string, name: string): BotConfiguration {
  return {
    id,
    name,
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
