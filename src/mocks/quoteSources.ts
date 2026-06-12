import type { QuoteSource } from '@domainTypes/domain';
import { mapQuoteKeysResponse, type QuoteKeyDetailResponse } from '@services/api/marketDataApi';

export const mockQuoteKeyDetails: QuoteKeyDetailResponse[] = [
  {
    key: 'bybit|ETH/USDC|askPrice',
    memorySize: 2048,
    pointsCount: 12000,
    lastValue: 3524.12,
    lastTimestamp: 1726156800000
  },
  {
    key: 'bybit|ETH/USDC|bidPrice',
    memorySize: 2048,
    pointsCount: 12000,
    lastValue: 3523.74,
    lastTimestamp: 1726156800000
  },
  {
    key: 'binance|ETH/USDT|bidPrice',
    memorySize: 4096,
    pointsCount: 22000,
    lastValue: 3522.91,
    lastTimestamp: 1726156800000
  },
  {
    key: 'dex:arbitrum|0xaf88d065e77c8cc2239327c5edb3a432268e5831/0x82af49447d8a07e3bd95bd0d56f35241523fbab1|bidPrice',
    memorySize: 1024,
    pointsCount: 8200,
    lastValue: 0.000284,
    lastTimestamp: 1726156800000
  }
];

export const mockQuoteSources: QuoteSource[] = mapQuoteKeysResponse(mockQuoteKeyDetails);
