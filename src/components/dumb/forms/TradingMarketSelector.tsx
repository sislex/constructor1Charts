import type { QuoteSource } from '@domainTypes/domain';
import { getQuoteSourceLabel } from '@utils/tokenResolver/tokenResolver';
import './TradingMarketSelector.css';

export interface TradingMarketSelectorProps {
  selectedSources: QuoteSource[];
  value: string;
  disabled?: boolean;
  onChange: (key: string) => void;
}

export function TradingMarketSelector({
  selectedSources,
  value,
  disabled = false,
  onChange
}: TradingMarketSelectorProps) {
  if (selectedSources.length === 0) {
    return (
      <div className="trading-market-selector__empty">
        Select quote sources before choosing a trading market.
      </div>
    );
  }

  return (
    <label className="trading-market-selector">
      <span>Trading Market</span>
      <select
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Select market</option>
        {selectedSources.map((source) => (
          <option key={source.key} value={source.key}>
            {getQuoteSourceLabel(source.parsed)}
          </option>
        ))}
      </select>
    </label>
  );
}
