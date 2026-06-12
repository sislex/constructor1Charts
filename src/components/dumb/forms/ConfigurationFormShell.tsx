import { Link } from 'react-router-dom';
import { Button } from '@components/dumb/common/Button';
import { QuoteSourceSelector } from '@components/dumb/sources/QuoteSourceSelector';
import type { QuoteSource } from '@domainTypes/domain';
import { ProfitCurrencyField } from './ProfitCurrencyField';
import { TradingMarketSelector } from './TradingMarketSelector';
import './ConfigurationFormShell.css';

export interface ConfigurationFormShellProps {
  name: string;
  selectedSources: string[];
  quoteSources: QuoteSource[];
  quoteSourcesLoading: boolean;
  quoteSourcesError: string | null;
  tradingMarket: string;
  profitCurrency: string;
  onNameChange: (name: string) => void;
  onSourcesChange: (sources: string[]) => void;
  onTradingMarketChange: (market: string) => void;
}

export function ConfigurationFormShell({
  name,
  selectedSources,
  quoteSources,
  quoteSourcesLoading,
  quoteSourcesError,
  tradingMarket,
  profitCurrency,
  onNameChange,
  onSourcesChange,
  onTradingMarketChange
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
        <Button disabled={!canSave} variant="primary">
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
    </main>
  );
}
