import { useEffect, useState } from 'react';
import { ConfigurationFormShell } from '@components/dumb/forms/ConfigurationFormShell';
import type {
  AdvancedSettings,
  BuySettings,
  DemoSettings,
  SellSettings,
  WeightedAverageConfig
} from '@domainTypes/domain';
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
  const [buySettings, setBuySettings] = useState<BuySettings>({
    buyAmount: 100,
    buyCurrency: '',
    buyAmountType: 'FIXED'
  });
  const [sellSettings, setSellSettings] = useState<SellSettings>({
    sellAmount: 100,
    sellCurrency: '',
    sellMode: 'FULL_POSITION'
  });
  const [demoSettings, setDemoSettings] = useState<DemoSettings>({
    enabled: true,
    demoTransactionDelayMs: 5000
  });
  const [advancedSettings, setAdvancedSettings] = useState<AdvancedSettings>({
    defaultSlippagePercent: 0.1,
    tradingFeePercent: 0.1,
    gasFee: 0,
    autoSaveEnabled: false,
    autoSaveIntervalMs: 30000
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
      buySettings: {
        ...buySettings,
        buyCurrency: profitCurrency
      },
      sellSettings: {
        ...sellSettings,
        sellCurrency: profitCurrency
      },
      demoSettings,
      advancedSettings,
      createdAt: now,
      updatedAt: now
    });

    setExportedJson(serializeBotConfiguration(configuration));
  }

  return (
    <ConfigurationFormShell
      advancedSettings={advancedSettings}
      buySettings={{ ...buySettings, buyCurrency: profitCurrency }}
      demoSettings={demoSettings}
      exportedJson={exportedJson}
      latestValues={latestValues}
      name={name}
      profitCurrency={profitCurrency}
      quoteSources={quoteSources}
      quoteSourcesError={quoteSourcesError}
      quoteSourcesLoading={quoteSourcesLoading && quoteSources.length === 0}
      selectedSources={selectedSources}
      sellSettings={{ ...sellSettings, sellCurrency: profitCurrency }}
      tradingMarket={tradingMarket}
      weightedAverage={weightedAverage}
      onAdvancedSettingsChange={setAdvancedSettings}
      onBuySettingsChange={setBuySettings}
      onDemoSettingsChange={setDemoSettings}
      onExportJson={handleExportJson}
      onNameChange={setName}
      onSellSettingsChange={setSellSettings}
      onSourcesChange={handleSourcesChange}
      onTradingMarketChange={setTradingMarket}
      onWeightedAverageChange={setWeightedAverage}
    />
  );
}
