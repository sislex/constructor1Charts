import { runSaga } from 'redux-saga';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockQuoteSources } from '../../mocks/quoteSources';
import { fetchQuoteSources } from '@services/api/marketDataApi';
import { loadQuoteKeysFailed, loadQuoteKeysSucceeded } from '@store/slices/marketDataSlice';
import { loadQuoteKeysSaga } from './marketDataSaga';

vi.mock('@services/api/marketDataApi', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@services/api/marketDataApi')>();

  return {
    ...actual,
    fetchQuoteSources: vi.fn()
  };
});

const fetchQuoteSourcesMock = vi.mocked(fetchQuoteSources);

describe('marketDataSaga', () => {
  beforeEach(() => {
    fetchQuoteSourcesMock.mockReset();
  });

  it('loads quote sources successfully', async () => {
    const dispatched: unknown[] = [];
    fetchQuoteSourcesMock.mockResolvedValue(mockQuoteSources);

    await runSaga({ dispatch: (action) => dispatched.push(action) }, loadQuoteKeysSaga).toPromise();

    expect(dispatched).toEqual([loadQuoteKeysSucceeded(mockQuoteSources)]);
  });

  it('handles quote source load errors', async () => {
    const dispatched: unknown[] = [];
    fetchQuoteSourcesMock.mockRejectedValue(new Error('Network down'));

    await runSaga({ dispatch: (action) => dispatched.push(action) }, loadQuoteKeysSaga).toPromise();

    expect(dispatched).toEqual([loadQuoteKeysFailed('Network down')]);
  });
});
