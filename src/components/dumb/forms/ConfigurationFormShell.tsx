import { Link } from 'react-router-dom';
import { Button } from '@components/dumb/common/Button';
import { QuoteSourceSelector } from '@components/dumb/sources/QuoteSourceSelector';
import type {
  AdvancedSettings,
  BuySettings,
  Condition,
  DemoSettings,
  QuoteSource,
  SellSettings,
  WeightedAverageConfig
} from '@domainTypes/domain';
import { ProfitCurrencyField } from './ProfitCurrencyField';
import { TradingMarketSelector } from './TradingMarketSelector';
import { WeightedAveragePanel } from './WeightedAveragePanel';
import { BuySettingsPanel } from './BuySettingsPanel';
import { SellSettingsPanel } from './SellSettingsPanel';
import { DemoSettingsPanel } from './DemoSettingsPanel';
import { AdvancedSettingsPanel } from './AdvancedSettingsPanel';
import { ConditionsBuilder, type ConditionDraft } from '@components/dumb/conditions/ConditionsBuilder';
import './ConfigurationFormShell.css';

export interface ConfigurationFormShellProps {
  name: string;
  selectedSources: string[];
  quoteSources: QuoteSource[];
  quoteSourcesLoading: boolean;
  quoteSourcesError: string | null;
  tradingMarket: string;
  profitCurrency: string;
  weightedAverage: WeightedAverageConfig;
  buySettings: BuySettings;
  sellSettings: SellSettings;
  demoSettings: DemoSettings;
  advancedSettings: AdvancedSettings;
  conditions: Condition[];
  conditionDraft: ConditionDraft;
  latestValues: Record<string, number>;
  exportedJson: string;
  onNameChange: (name: string) => void;
  onSourcesChange: (sources: string[]) => void;
  onTradingMarketChange: (market: string) => void;
  onWeightedAverageChange: (weightedAverage: WeightedAverageConfig) => void;
  onBuySettingsChange: (settings: BuySettings) => void;
  onSellSettingsChange: (settings: SellSettings) => void;
  onDemoSettingsChange: (settings: DemoSettings) => void;
  onAdvancedSettingsChange: (settings: AdvancedSettings) => void;
  onConditionDraftChange: (draft: ConditionDraft) => void;
  onAddCondition: () => void;
  onSaveConfiguration: () => void;
  onExportJson: () => void;
}

export function ConfigurationFormShell({
  name,
  selectedSources,
  quoteSources,
  quoteSourcesLoading,
  quoteSourcesError,
  tradingMarket,
  profitCurrency,
  weightedAverage,
  buySettings,
  sellSettings,
  demoSettings,
  advancedSettings,
  conditions,
  conditionDraft,
  latestValues,
  exportedJson,
  onNameChange,
  onSourcesChange,
  onTradingMarketChange,
  onWeightedAverageChange,
  onBuySettingsChange,
  onSellSettingsChange,
  onDemoSettingsChange,
  onAdvancedSettingsChange,
  onConditionDraftChange,
  onAddCondition,
  onSaveConfiguration,
  onExportJson
}: ConfigurationFormShellProps) {
  const nameError = name.trim().length === 0 ? 'Configuration name is required.' : null;
  const sourcesError = selectedSources.length === 0 ? 'Select at least one quote source.' : null;
  const selectedQuoteSources = quoteSources.filter((source) => selectedSources.includes(source.key));
  const tradingMarketError =
    tradingMarket.length === 0 || !selectedSources.includes(tradingMarket)
      ? 'Trading market is required.'
      : null;
  const canSave = !nameError && !sourcesError && !tradingMarketError;

  return (
    <main className="configuration-form">
      <header className="configuration-form__header">
        <div>
          <Link className="configuration-form__back" to="/">
            Dashboard
          </Link>
          <h1>Create Configuration</h1>
        </div>
        <Button disabled={!canSave} variant="primary" onClick={onSaveConfiguration}>
          Save Configuration
        </Button>
      </header>

      <section className="configuration-form__section" aria-labelledby="general-section">
        <h2 id="general-section">General</h2>
        <label className="configuration-form__field">
          <span>Configuration Name</span>
          <input
            aria-invalid={Boolean(nameError)}
            placeholder="ETH Arbitrage Bot"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
          />
        </label>
        {nameError ? <p className="configuration-form__error">{nameError}</p> : null}
      </section>

      <section className="configuration-form__section" aria-labelledby="sources-section">
        <div className="configuration-form__section-header">
          <div>
            <h2 id="sources-section">Sources</h2>
            <p>{selectedSources.length} selected</p>
          </div>
        </div>
        <QuoteSourceSelector
          error={quoteSourcesError}
          loading={quoteSourcesLoading}
          selectedKeys={selectedSources}
          sources={quoteSources}
          onSelectionChange={onSourcesChange}
        />
        {sourcesError ? <p className="configuration-form__error">{sourcesError}</p> : null}
      </section>

      <section className="configuration-form__section" aria-labelledby="market-section">
        <div className="configuration-form__section-header">
          <div>
            <h2 id="market-section">Trading Market</h2>
            <p>Profit currency is calculated automatically from the selected market pair.</p>
          </div>
          <ProfitCurrencyField value={profitCurrency} />
        </div>
        <TradingMarketSelector
          selectedSources={selectedQuoteSources}
          value={tradingMarket}
          onChange={onTradingMarketChange}
        />
        {tradingMarketError ? (
          <p className="configuration-form__error">{tradingMarketError}</p>
        ) : null}
      </section>

      <section className="configuration-form__section" aria-labelledby="weighted-average-section">
        <div className="configuration-form__section-header">
          <div>
            <h2 id="weighted-average-section">Weighted Average</h2>
            <p>Combine selected quote sources into one calculated price.</p>
          </div>
        </div>
        <WeightedAveragePanel
          latestValues={latestValues}
          selectedSources={selectedQuoteSources}
          value={weightedAverage}
          onChange={onWeightedAverageChange}
        />
      </section>

      <section className="configuration-form__section" aria-labelledby="trade-settings-section">
        <div className="configuration-form__section-header">
          <div>
            <h2 id="trade-settings-section">Buy / Sell Settings</h2>
            <p>Configure demo execution amounts for BUY and SELL actions.</p>
          </div>
        </div>
        <BuySettingsPanel
          profitCurrency={profitCurrency}
          value={buySettings}
          onChange={onBuySettingsChange}
        />
        <SellSettingsPanel
          profitCurrency={profitCurrency}
          value={sellSettings}
          onChange={onSellSettingsChange}
        />
      </section>

      <section className="configuration-form__section" aria-labelledby="runtime-settings-section">
        <div className="configuration-form__section-header">
          <div>
            <h2 id="runtime-settings-section">Demo and Advanced Settings</h2>
            <p>Set transaction delay, slippage, fees, gas and auto-save behavior.</p>
          </div>
        </div>
        <DemoSettingsPanel value={demoSettings} onChange={onDemoSettingsChange} />
        <AdvancedSettingsPanel value={advancedSettings} onChange={onAdvancedSettingsChange} />
      </section>

      <section className="configuration-form__section" aria-labelledby="conditions-section">
        <div className="configuration-form__section-header">
          <div>
            <h2 id="conditions-section">Conditions</h2>
            <p>Create BUY / SELL rules that will be exported with the bot configuration.</p>
          </div>
        </div>
        <ConditionsBuilder
          conditions={conditions}
          draft={conditionDraft}
          onAddCondition={onAddCondition}
          onDraftChange={onConditionDraftChange}
        />
      </section>

      <section className="configuration-form__section" aria-labelledby="json-section">
        <div className="configuration-form__section-header">
          <div>
            <h2 id="json-section">JSON Configuration</h2>
            <p>Generated configuration for arbiDexServerBots.</p>
          </div>
          <Button disabled={!canSave} onClick={onExportJson}>
            Export JSON
          </Button>
        </div>
        <pre className="configuration-form__json" aria-label="Generated JSON">
          {exportedJson || 'Complete required fields to generate JSON.'}
        </pre>
      </section>
    </main>
  );
}
