import type {
  AdvancedSettings,
  BotConfiguration,
  BuySettings,
  Condition,
  DemoSettings,
  SellSettings,
  WeightedAverageConfig
} from '@domainTypes/domain';

export interface BuildConfigurationInput {
  id: string;
  name: string;
  selectedSources: string[];
  tradingMarket: string;
  profitCurrency: string;
  weightedAverage: WeightedAverageConfig;
  buySettings: BuySettings;
  sellSettings: SellSettings;
  demoSettings: DemoSettings;
  advancedSettings: AdvancedSettings;
  conditions: Condition[];
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
    conditions: input.conditions,
    conditionGroups: [],
    demoSettings: input.demoSettings,
    advancedSettings: input.advancedSettings,
    buySettings: input.buySettings,
    sellSettings: input.sellSettings,
    createdAt: input.createdAt,
    updatedAt: input.updatedAt,
    status: 'draft'
  };
}

export function serializeBotConfiguration(configuration: BotConfiguration): string {
  return JSON.stringify(configuration, null, 2);
}
