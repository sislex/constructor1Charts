export type SourceType = 'CEX' | 'DEX';

export type QuoteField = 'bidPrice' | 'askPrice' | 'bidPool' | 'askPool';

export type Operator =
  | 'GREATER_THAN'
  | 'LESS_THAN'
  | 'GREATER_OR_EQUAL'
  | 'LESS_OR_EQUAL'
  | 'EQUAL'
  | 'PERCENT_ABOVE'
  | 'PERCENT_BELOW'
  | 'BETWEEN';

export type BotState = 'IDLE' | 'BUY_PENDING' | 'BOUGHT' | 'SELL_PENDING' | 'SOLD' | 'ERROR';

export type TransactionStatus = 'CREATED' | 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';

export type ChartEventType =
  | 'BUY'
  | 'SELL'
  | 'BUY_PENDING'
  | 'SELL_PENDING'
  | 'TRANSACTION_SUCCESS'
  | 'TRANSACTION_FAILED'
  | 'CONDITION_TRIGGERED'
  | 'CONDITION_SKIPPED'
  | 'SLIPPAGE'
  | 'ERROR'
  | 'INFO';

export type ChartEventStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'SKIPPED' | 'INFO';

export type ActionSource = 'manual' | 'automatic';

export interface ParsedQuoteKey {
  raw: string;
  source: string;
  sourceType: SourceType;
  network?: string;
  pair: string;
  baseAsset: string;
  quoteAsset: string;
  field: QuoteField;
}

export interface QuoteSource {
  key: string;
  parsed: ParsedQuoteKey;
  memorySize?: number;
  pointsCount?: number;
  lastValue?: number;
  lastTimestamp?: number;
}

export interface WeightedAverageSource {
  key: string;
  weight: number;
}

export interface WeightedAverageConfig {
  enabled: boolean;
  sources: WeightedAverageSource[];
}

export interface ConditionExpression {
  metric: string;
  operator: Operator;
  value: number;
  base?: string;
}

export interface Condition {
  id: string;
  name: string;
  enabled: boolean;
  action: 'BUY' | 'SELL';
  priority: number;
  groupId?: string;
  when: ConditionExpression;
}

export interface ConditionGroup {
  id: string;
  name: string;
  operator: 'AND' | 'OR';
  conditions: string[];
}

export interface DemoSettings {
  enabled: boolean;
  demoTransactionDelayMs: number;
}

export interface AdvancedSettings {
  defaultSlippagePercent: number;
  tradingFeePercent: number;
  gasFee: number;
  autoSaveEnabled: boolean;
  autoSaveIntervalMs: number;
}

export interface BuySettings {
  buyAmount: number;
  buyCurrency: string;
  buyAmountType: 'FIXED' | 'PERCENT';
  comment?: string;
}

export interface SellSettings {
  sellAmount: number;
  sellCurrency: string;
  sellMode: 'FULL_POSITION' | 'PARTIAL';
  sellPercent?: number;
}

export interface BotConfiguration {
  id: string;
  name: string;
  description?: string;
  tags: string[];
  enabled: boolean;
  selectedSources: string[];
  tradingMarket: string;
  profitCurrency: string;
  weightedAverage: WeightedAverageConfig;
  conditions: Condition[];
  conditionGroups: ConditionGroup[];
  demoSettings: DemoSettings;
  advancedSettings: AdvancedSettings;
  buySettings: BuySettings;
  sellSettings: SellSettings;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'active' | 'paused' | 'error';
}

export interface PlayerState {
  mode: 'replay' | 'live';
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  playbackSpeed: number;
  currentTimestamp?: number;
  livePaused: boolean;
}

export interface QuoteChartPoint {
  step: number;
  timestamp: number;
  values: Record<string, number>;
  weightedAveragePrice?: number;
}

export interface ChartEvent {
  id: string;
  step: number;
  timestamp: number;
  type: ChartEventType;
  status: ChartEventStatus;
  price?: number;
  message?: string;
  conditionId?: string;
  transactionId?: string;
}

export interface PendingTransactionLine {
  transactionId: string;
  actionType: 'BUY' | 'SELL';
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  startStep: number;
  startTimestamp: number;
  startPrice: number;
  endStep?: number;
  endTimestamp?: number;
  endPrice?: number;
  message?: string;
}

export interface DemoPosition {
  status: 'NO_POSITION' | 'OPENED' | 'CLOSED';
  entryPrice: number;
  currentPrice: number;
  amount: number;
  currency: string;
  realizedPnL: number;
  unrealizedPnL: number;
  openedStep: number;
  openedTimestamp: number;
}

export interface Transaction {
  id: string;
  actionType: 'BUY' | 'SELL';
  status: TransactionStatus;
  market: string;
  startStep: number;
  startTimestamp: number;
  startPrice: number;
  amount: number;
  currency: string;
  endStep?: number;
  endTimestamp?: number;
  endPrice?: number;
  message?: string;
}

export interface ActionHistoryItem {
  id: string;
  timestamp: number;
  step: number;
  actionType: 'BUY' | 'SELL';
  actionSource: ActionSource;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'SKIPPED';
  market: string;
  price: number;
  amount: number;
  currency: string;
  slippagePercent?: number;
  message?: string;
}

export interface DataChangeEvent {
  key: string;
  point: {
    t?: number;
    v: number | string;
  };
}
