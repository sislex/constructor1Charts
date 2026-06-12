import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DataChangeEvent, QuoteSource } from '@domainTypes/domain';

export interface MarketDataState {
  quoteKeys: string[];
  quoteSources: QuoteSource[];
  latestValues: Record<string, number>;
  loading: boolean;
  error: string | null;
}

const initialState: MarketDataState = {
  quoteKeys: [],
  quoteSources: [],
  latestValues: {},
  loading: false,
  error: null
};

export const marketDataSlice = createSlice({
  name: 'marketData',
  initialState,
  reducers: {
    loadQuoteKeysRequested(state) {
      state.loading = true;
      state.error = null;
    },
    loadQuoteKeysSucceeded(state, action: PayloadAction<QuoteSource[]>) {
      state.loading = false;
      state.quoteSources = action.payload;
      state.quoteKeys = action.payload.map((source) => source.key);
    },
    loadQuoteKeysFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    marketDataChanged(state, action: PayloadAction<DataChangeEvent>) {
      const value = Number(action.payload.point.v);

      if (!Number.isNaN(value)) {
        state.latestValues[action.payload.key] = value;
      }
    }
  }
});

export const {
  loadQuoteKeysRequested,
  loadQuoteKeysSucceeded,
  loadQuoteKeysFailed,
  marketDataChanged
} = marketDataSlice.actions;
