import { useEffect, useState } from 'react';
import { ConfigurationFormShell } from '@components/dumb/forms/ConfigurationFormShell';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  selectQuoteSources,
  selectQuoteSourcesError,
  selectQuoteSourcesLoading
} from '@store/selectors/marketDataSelectors';
import { loadQuoteKeysSucceeded } from '@store/slices/marketDataSlice';
import { getProfitCurrency } from '@utils/market/profitCurrency';
import { mockQuoteSources } from '../mocks/quoteSources';

export function ConfigurationFormPageContainer() {
  const dispatch = useAppDispatch();
  const quoteSources = useAppSelector(selectQuoteSources);
  const quoteSourcesLoading = useAppSelector(selectQuoteSourcesLoading);
  const quoteSourcesError = useAppSelector(selectQuoteSourcesError);
  const [name, setName] = useState('');
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [tradingMarket, setTradingMarket] = useState('');
  const selectedTradingMarket = quoteSources.find((source) => source.key === tradingMarket);
  const profitCurrency = selectedTradingMarket ? getProfitCurrency(selectedTradingMarket.parsed) : '';

  useEffect(() => {
    if (quoteSources.length === 0) {
      dispatch(loadQuoteKeysSucceeded(mockQuoteSources));
    }
  }, [dispatch, quoteSources.length]);

  function handleSourcesChange(sources: string[]) {
    setSelectedSources(sources);

    if (tradingMarket && !sources.includes(tradingMarket)) {
      setTradingMarket('');
    }
  }

  return (
    <ConfigurationFormShell
      name={name}
      profitCurrency={profitCurrency}
      quoteSources={quoteSources}
      quoteSourcesError={quoteSourcesError}
      quoteSourcesLoading={quoteSourcesLoading && quoteSources.length === 0}
      selectedSources={selectedSources}
      tradingMarket={tradingMarket}
      onNameChange={setName}
      onSourcesChange={handleSourcesChange}
      onTradingMarketChange={setTradingMarket}
    />
  );
}
