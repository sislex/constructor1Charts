import type { QuoteSource } from '@domainTypes/domain';
import { parseQuoteKey } from '@utils/parser/quoteKeyParser';
import { getApiConfig, type ApiConfig } from './apiConfig';

export interface QuoteKeyDetailResponse {
  key?: string;
  memorySize?: number;
  memory?: number;
  pointsCount?: number;
  count?: number;
  lastValue?: number | string;
  value?: number | string;
  lastTimestamp?: number;
  timestamp?: number;
}

export type QuoteKeysResponse = string[] | QuoteKeyDetailResponse[] | Record<string, QuoteKeyDetailResponse>;

export class MarketDataApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message);
    this.name = 'MarketDataApiError';
  }
}

export async function fetchQuoteSources(config: ApiConfig = getApiConfig()): Promise<QuoteSource[]> {
  const url = new URL('/store/keys', config.marketDataBaseUrl);
  url.searchParams.set('detail', 'true');
  url.searchParams.set('memory', 'true');

  const response = await fetch(url);

  if (!response.ok) {
    throw new MarketDataApiError('Failed to load quote sources.', response.status);
  }

  const payload = (await response.json()) as QuoteKeysResponse;

  return mapQuoteKeysResponse(payload);
}

export function mapQuoteKeysResponse(payload: QuoteKeysResponse): QuoteSource[] {
  const details = normalizeQuoteKeyDetails(payload);

  return details.flatMap((detail) => {
    const key = detail.key;

    if (!key) {
      return [];
    }

    const parsed = parseQuoteKey(key);

    if (!parsed.ok) {
      return [];
    }

    return [
      {
        key,
        parsed: parsed.value,
        memorySize: detail.memorySize ?? detail.memory,
        pointsCount: detail.pointsCount ?? detail.count,
        lastValue: toOptionalNumber(detail.lastValue ?? detail.value),
        lastTimestamp: detail.lastTimestamp ?? detail.timestamp
      }
    ];
  });
}

function normalizeQuoteKeyDetails(payload: QuoteKeysResponse): QuoteKeyDetailResponse[] {
  if (Array.isArray(payload)) {
    return payload.map((item) => (typeof item === 'string' ? { key: item } : item));
  }

  return Object.entries(payload).map(([key, detail]) => ({
    key,
    ...detail
  }));
}

function toOptionalNumber(value: number | string | undefined): number | undefined {
  if (value === undefined) {
    return undefined;
  }

  const numericValue = Number(value);
  return Number.isNaN(numericValue) ? undefined : numericValue;
}
