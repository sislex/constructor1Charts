import type { QuoteSource } from '@domainTypes/domain';
import { getQuoteSourceLabel } from '@utils/tokenResolver/tokenResolver';
import './WeightedAverageSourceRow.css';

export interface WeightedAverageSourceRowProps {
  source: QuoteSource;
  weight: number;
  disabled?: boolean;
  onWeightChange: (key: string, weight: number) => void;
}

export function WeightedAverageSourceRow({
  source,
  weight,
  disabled = false,
  onWeightChange
}: WeightedAverageSourceRowProps) {
  return (
    <label className="weighted-average-source-row">
      <span>{getQuoteSourceLabel(source.parsed)}</span>
      <input
        disabled={disabled}
        min="0"
        step="0.01"
        type="number"
        value={weight}
        onChange={(event) => onWeightChange(source.key, Number(event.target.value))}
      />
    </label>
  );
}
