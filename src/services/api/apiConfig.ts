export interface ApiConfig {
  marketDataBaseUrl: string;
}

const defaultMarketDataBaseUrl = 'http://89.125.68.35:3002';

export function getApiConfig(): ApiConfig {
  return {
    marketDataBaseUrl: import.meta.env.VITE_MARKET_DATA_BASE_URL ?? defaultMarketDataBaseUrl
  };
}
