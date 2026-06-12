import type { QuoteSource } from '@domainTypes/domain';
import { getDisplayPair, getQuoteSourceLabel } from '@utils/tokenResolver/tokenResolver';
import './QuoteSourceCard.css';

export interface QuoteSourceCardProps {
  source: QuoteSource;
  selected: boolean;
  disabled?: boolean;
  onToggle: (key: string) => void;
}

export function QuoteSourceCard({
  source,
  selected,
  disabled = false,
  onToggle
}: QuoteSourceCardProps) {
  const { parsed } = source;
  const label = getQuoteSourceLabel(parsed);
  const sourceName = parsed.sourceType === 'DEX' ? parsed.network ?? parsed.source : parsed.source;

  return (
    <button
      aria-pressed={selected}
      className={`quote-source-card${selected ? ' quote-source-card--selected' : ''}`}
      disabled={disabled}
      type="button"
      onClick={() => onToggle(source.key)}
    >
      <span className="quote-source-card__topline">
        <span className="quote-source-card__type">{parsed.sourceType}</span>
        <span className="quote-source-card__source">{sourceName}</span>
        <span className="quote-source-card__field">{parsed.field}</span>
      </span>
      <span className="quote-source-card__pair">{getDisplayPair(parsed)}</span>
      <span className="quote-source-card__meta">
        {source.pointsCount ?? 0} points · {source.memorySize ?? 0} memory
      </span>
      <span className="quote-source-card__raw">{label}</span>
    </button>
  );
}
