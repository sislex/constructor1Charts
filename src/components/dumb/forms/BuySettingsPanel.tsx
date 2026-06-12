import type { BuySettings } from '@domainTypes/domain';
import './SettingsPanels.css';

export interface BuySettingsPanelProps {
  value: BuySettings;
  profitCurrency: string;
  onChange: (value: BuySettings) => void;
}

export function BuySettingsPanel({ value, profitCurrency, onChange }: BuySettingsPanelProps) {
  const amountError = value.buyAmount <= 0 ? 'BUY amount must be greater than 0.' : null;

  return (
    <div className="settings-panel" aria-label="BUY settings">
      <div className="settings-panel__grid">
        <label>
          <span>Amount Type</span>
          <select
            value={value.buyAmountType}
            onChange={(event) =>
              onChange({ ...value, buyAmountType: event.target.value as BuySettings['buyAmountType'] })
            }
          >
            <option value="FIXED">Fixed</option>
            <option value="PERCENT">Percent</option>
          </select>
        </label>
        <label>
          <span>BUY Amount</span>
          <input
            min="0"
            step="0.01"
            type="number"
            value={value.buyAmount}
            onChange={(event) => onChange({ ...value, buyAmount: Number(event.target.value) })}
          />
        </label>
        <label>
          <span>Currency</span>
          <input
            readOnly
            value={profitCurrency || value.buyCurrency}
            onChange={() => undefined}
          />
        </label>
      </div>
      {amountError ? <p className="settings-panel__error">{amountError}</p> : null}
    </div>
  );
}
