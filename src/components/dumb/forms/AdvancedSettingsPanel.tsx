import type { AdvancedSettings } from '@domainTypes/domain';
import './SettingsPanels.css';

export interface AdvancedSettingsPanelProps {
  value: AdvancedSettings;
  onChange: (value: AdvancedSettings) => void;
}

export function AdvancedSettingsPanel({ value, onChange }: AdvancedSettingsPanelProps) {
  const numericError =
    value.defaultSlippagePercent < 0 ||
    value.tradingFeePercent < 0 ||
    value.gasFee < 0 ||
    value.autoSaveIntervalMs < 0
      ? 'Advanced numeric settings cannot be negative.'
      : null;

  return (
    <div className="settings-panel" aria-label="Advanced settings">
      <div className="settings-panel__grid">
        <label>
          <span>Default Slippage, %</span>
          <input
            min="0"
            step="0.01"
            type="number"
            value={value.defaultSlippagePercent}
            onChange={(event) =>
              onChange({ ...value, defaultSlippagePercent: Number(event.target.value) })
            }
          />
        </label>
        <label>
          <span>Trading Fee, %</span>
          <input
            min="0"
            step="0.01"
            type="number"
            value={value.tradingFeePercent}
            onChange={(event) => onChange({ ...value, tradingFeePercent: Number(event.target.value) })}
          />
        </label>
        <label>
          <span>Gas Fee</span>
          <input
            min="0"
            step="0.01"
            type="number"
            value={value.gasFee}
            onChange={(event) => onChange({ ...value, gasFee: Number(event.target.value) })}
          />
        </label>
        <label className="settings-panel__toggle">
          <input
            checked={value.autoSaveEnabled}
            type="checkbox"
            onChange={(event) => onChange({ ...value, autoSaveEnabled: event.target.checked })}
          />
          <span>Auto Save</span>
        </label>
        <label>
          <span>Auto Save Interval, ms</span>
          <input
            min="0"
            step="1000"
            type="number"
            value={value.autoSaveIntervalMs}
            onChange={(event) =>
              onChange({ ...value, autoSaveIntervalMs: Number(event.target.value) })
            }
          />
        </label>
      </div>
      {numericError ? <p className="settings-panel__error">{numericError}</p> : null}
    </div>
  );
}
