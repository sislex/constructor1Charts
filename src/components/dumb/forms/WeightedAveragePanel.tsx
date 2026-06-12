import type { QuoteSource, WeightedAverageConfig } from '@domainTypes/domain';
import { calculateWeightedAverage, validateWeights } from '@utils/weightedAverage/weightedAverage';
import { WeightedAverageSourceRow } from './WeightedAverageSourceRow';
import './WeightedAveragePanel.css';

export interface WeightedAveragePanelProps {
  selectedSources: QuoteSource[];
  latestValues: Record<string, number>;
  value: WeightedAverageConfig;
  onChange: (value: WeightedAverageConfig) => void;
}

export function WeightedAveragePanel({
  selectedSources,
  latestValues,
  value,
  onChange
}: WeightedAveragePanelProps) {
  const validation = value.enabled ? validateWeights(value.sources) : { valid: true, errors: [] };
  const weightedPrice = value.enabled ? calculateWeightedAverage(latestValues, value.sources) : undefined;

  function toggleEnabled(enabled: boolean) {
    onChange({
      enabled,
      sources: enabled ? ensureSources(value.sources, selectedSources) : value.sources
    });
  }

  function handleWeightChange(key: string, weight: number) {
    onChange({
      ...value,
      sources: ensureSources(value.sources, selectedSources).map((source) =>
        source.key === key ? { ...source, weight } : source
      )
    });
  }

  const rows = ensureSources(value.sources, selectedSources);

  return (
    <section className="weighted-average-panel" aria-label="Weighted average">
      <label className="weighted-average-panel__toggle">
        <input
          checked={value.enabled}
          type="checkbox"
          onChange={(event) => toggleEnabled(event.target.checked)}
        />
        <span>Enable Weighted Average</span>
      </label>

      {selectedSources.length === 0 ? (
        <div className="weighted-average-panel__empty">Select quote sources to configure weights.</div>
      ) : (
        <div className="weighted-average-panel__rows">
          {selectedSources.map((source) => {
            const row = rows.find((weightedSource) => weightedSource.key === source.key);

            return (
              <WeightedAverageSourceRow
                key={source.key}
                disabled={!value.enabled}
                source={source}
                weight={row?.weight ?? 0}
                onWeightChange={handleWeightChange}
              />
            );
          })}
        </div>
      )}

      <div className="weighted-average-panel__summary">
        <span>Total weight: {rows.reduce((sum, source) => sum + source.weight, 0).toFixed(2)}</span>
        <span>Weighted price: {weightedPrice === undefined ? 'N/A' : weightedPrice.toFixed(6)}</span>
      </div>

      {!validation.valid ? (
        <ul className="weighted-average-panel__errors">
          {validation.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function ensureSources(
  currentSources: WeightedAverageConfig['sources'],
  selectedSources: QuoteSource[]
): WeightedAverageConfig['sources'] {
  if (selectedSources.length === 0) {
    return [];
  }

  const currentByKey = new Map(currentSources.map((source) => [source.key, source.weight]));
  const defaultWeight = 1 / selectedSources.length;

  return selectedSources.map((source) => ({
    key: source.key,
    weight: currentByKey.get(source.key) ?? Number(defaultWeight.toFixed(4))
  }));
}
