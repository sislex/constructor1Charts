import type { RootState } from '@store/rootReducer';

export const selectQuoteSources = (state: RootState) => state.marketData.quoteSources;
export const selectQuoteSourcesLoading = (state: RootState) => state.marketData.loading;
export const selectQuoteSourcesError = (state: RootState) => state.marketData.error;
