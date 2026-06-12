import { useEffect, useState } from 'react';
import { ConfigurationFormShell } from '@components/dumb/forms/ConfigurationFormShell';
import type { WeightedAverageConfig } from '@domainTypes/domain';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  selectQuoteSources,
  selectQuoteSourcesError,
  selectQuoteSourcesLoading
} from '@store/selectors/marketDataSelectors';
import { loadQuoteKeysSucceeded } from '@store/slices/marketDataSlice';
import { getProfitCurrency } from '@utils/market/profitCurrency';
import { buildBotConfiguration, serializeBotConfiguration } from '@utils/configuration/configurationBuilder';
import { mockQuoteSources } from '../mocks/quoteSources';

export function ConfigurationFormPageContainer() {
  const dispatch = useAppDispatch();
  const quoteSources = useAppSelector(selectQuoteSources);
  const quoteSourcesLoading = useAppSelector(selectQuoteSourcesLoading);
  const quoteSourcesError = useAppSelector(selectQuoteSourcesError);
  const latestValues = useAppSelector((state) => state.marketData.latestValues);
  const [name, setName] = useState('');
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [tradingMarket, setTradingMarket] = useState('');
  const [weightedAverage, setWeightedAverage] = useState<WeightedAverageConfig>({
    enabled: false,
    sources: []
  });
  const [exportedJson, setExportedJson] = useState('');
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

    setWeightedAverage((current) => ({
      ...current,
      sources: current.sources.filter((source) => sources.includes(source.key))
    }));
    setExportedJson('');
  }

  function handleExportJson() {
    const now = new Date().toISOString();
    const configuration = buildBotConfiguration({
      id: 'draft-configuration',
      name,
      selectedSources,
      tradingMarket,
      profitCurrency,
      weightedAverage,
      createdAt: now,
      updatedAt: now
    });

    setExportedJson(serializeBotConfiguration(configuration));
  }

  return (
    <ConfigurationFormShell
      exportedJson={exportedJson}
      latestValues={latestValues}
      name={name}
      profitCurrency={profitCurrency}
      quoteSources={quoteSources}
      quoteSourcesError={quoteSourcesError}
      quoteSourcesLoading={quoteSourcesLoading && quoteSources.length === 0}
      selectedSources={selectedSources}
      tradingMarket={tradingMarket}
      weightedAverage={weightedAverage}
      onExportJson={handleExportJson}
      onNameChange={setName}
      onSourcesChange={handleSourcesChange}
      onTradingMarketChange={setTradingMarket}
      onWeightedAverageChange={setWeightedAverage}
    />
  );
}
