import type { DemoSettings } from '@domainTypes/domain';
import './SettingsPanels.css';

export interface DemoSettingsPanelProps {
  value: DemoSettings;
  onChange: (value: DemoSettings) => void;
}

export function DemoSettingsPanel({ value, onChange }: DemoSettingsPanelProps) {
  const delayError =
    value.demoTransactionDelayMs < 0 ? 'Demo transaction delay cannot be negative.' : null;

  return (
    <div className="settings-panel" aria-label="Demo settings">
      <div className="settings-panel__grid">
        <label className="settings-panel__toggle">
          <input
            checked={value.enabled}
            type="checkbox"
            onChange={(event) => onChange({ ...value, enabled: event.target.checked })}
          />
          <span>Demo Mode</span>
        </label>
        <label>
          <span>Transaction Delay, ms</span>
          <input
            min="0"
            step="100"
            type="number"
            value={value.demoTransactionDelayMs}
            onChange={(event) =>
              onChange({ ...value, demoTransactionDelayMs: Number(event.target.value) })
            }
          />
        </label>
      </div>
      {delayError ? <p className="settings-panel__error">{delayError}</p> : null}
    </div>
  );
}
