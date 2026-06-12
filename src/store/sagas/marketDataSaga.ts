import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchQuoteSources } from '@services/api/marketDataApi';
import type { QuoteSource } from '@domainTypes/domain';
import {
  loadQuoteKeysFailed,
  loadQuoteKeysRequested,
  loadQuoteKeysSucceeded
} from '@store/slices/marketDataSlice';

export function* loadQuoteKeysSaga() {
  try {
    const sources: QuoteSource[] = yield call(fetchQuoteSources);
    yield put(loadQuoteKeysSucceeded(sources));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load quote sources.';
    yield put(loadQuoteKeysFailed(message));
  }
}

export function* marketDataSaga() {
  yield takeLatest(loadQuoteKeysRequested.type, loadQuoteKeysSaga);
}
