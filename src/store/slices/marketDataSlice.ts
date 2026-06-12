import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DataChangeEvent } from '@domainTypes/domain';

export interface MarketDataState {
  quoteKeys: string[];
  latestValues: Record<string, number>;
  loading: boolean;
  error: string | null;
}

const initialState: MarketDataState = {
  quoteKeys: [],
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
    loadQuoteKeysSucceeded(state, action: PayloadAction<string[]>) {
      state.loading = false;
      state.quoteKeys = action.payload;
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
