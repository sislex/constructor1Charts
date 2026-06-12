import type { SellSettings } from '@domainTypes/domain';
import './SettingsPanels.css';

export interface SellSettingsPanelProps {
  value: SellSettings;
  profitCurrency: string;
  onChange: (value: SellSettings) => void;
}

export function SellSettingsPanel({ value, profitCurrency, onChange }: SellSettingsPanelProps) {
  const sellPercent = value.sellPercent ?? 100;
  const percentError =
    value.sellMode === 'PARTIAL' && (sellPercent <= 0 || sellPercent > 100)
      ? 'Partial SELL percent must be between 0 and 100.'
      : null;

  return (
    <div className="settings-panel" aria-label="SELL settings">
      <div className="settings-panel__grid">
        <label>
          <span>SELL Mode</span>
          <select
            value={value.sellMode}
            onChange={(event) =>
              onChange({ ...value, sellMode: event.target.value as SellSettings['sellMode'] })
            }
          >
            <option value="FULL_POSITION">Full position</option>
            <option value="PARTIAL">Partial</option>
          </select>
        </label>
        <label>
          <span>SELL Amount</span>
          <input
            min="0"
            step="0.01"
            type="number"
            value={value.sellAmount}
            onChange={(event) => onChange({ ...value, sellAmount: Number(event.target.value) })}
          />
        </label>
        <label>
          <span>Currency</span>
          <input
            readOnly
            value={profitCurrency || value.sellCurrency}
            onChange={() => undefined}
          />
        </label>
        {value.sellMode === 'PARTIAL' ? (
          <label>
            <span>SELL Percent</span>
            <input
              max="100"
              min="0"
              step="1"
              type="number"
              value={sellPercent}
              onChange={(event) => onChange({ ...value, sellPercent: Number(event.target.value) })}
            />
          </label>
        ) : null}
      </div>
      {percentError ? <p className="settings-panel__error">{percentError}</p> : null}
    </div>
  );
}
