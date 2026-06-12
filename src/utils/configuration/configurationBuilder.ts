import type { BotConfiguration, WeightedAverageConfig } from '@domainTypes/domain';

export interface BuildConfigurationInput {
  id: string;
  name: string;
  selectedSources: string[];
  tradingMarket: string;
  profitCurrency: string;
  weightedAverage: WeightedAverageConfig;
  createdAt: string;
  updatedAt: string;
}

export function buildBotConfiguration(input: BuildConfigurationInput): BotConfiguration {
  return {
    id: input.id,
    name: input.name.trim(),
    description: '',
    tags: [],
    enabled: true,
    selectedSources: input.selectedSources,
    tradingMarket: input.tradingMarket,
    profitCurrency: input.profitCurrency,
    weightedAverage: input.weightedAverage,
    conditions: [],
    conditionGroups: [],
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
    buySettings: {
      buyAmount: 100,
      buyCurrency: input.profitCurrency,
      buyAmountType: 'FIXED'
    },
    sellSettings: {
      sellAmount: 100,
      sellCurrency: input.profitCurrency,
      sellMode: 'FULL_POSITION'
    },
    createdAt: input.createdAt,
    updatedAt: input.updatedAt,
    status: 'draft'
  };
}

export function serializeBotConfiguration(configuration: BotConfiguration): string {
  return JSON.stringify(configuration, null, 2);
}
