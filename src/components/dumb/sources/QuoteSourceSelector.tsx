import { useMemo, useState } from 'react';
import type { QuoteField, QuoteSource, SourceType } from '@domainTypes/domain';
import { QuoteSourceCard } from './QuoteSourceCard';
import './QuoteSourceSelector.css';

export interface QuoteSourceSelectorProps {
  sources: QuoteSource[];
  selectedKeys: string[];
  loading?: boolean;
  error?: string | null;
  onSelectionChange: (keys: string[]) => void;
}

type SourceTypeFilter = 'ALL' | SourceType;
type QuoteFieldFilter = 'ALL' | QuoteField;

export function QuoteSourceSelector({
  sources,
  selectedKeys,
  loading = false,
  error = null,
  onSelectionChange
}: QuoteSourceSelectorProps) {
  const [search, setSearch] = useState('');
  const [sourceType, setSourceType] = useState<SourceTypeFilter>('ALL');
  const [field, setField] = useState<QuoteFieldFilter>('ALL');

  const selectedSet = useMemo(() => new Set(selectedKeys), [selectedKeys]);
  const filteredSources = useMemo(
    () =>
      sources.filter((source) => {
        const query = search.trim().toLowerCase();
        const parsed = source.parsed;
        const matchesSearch =
          query.length === 0 ||
          source.key.toLowerCase().includes(query) ||
          parsed.source.toLowerCase().includes(query) ||
          parsed.pair.toLowerCase().includes(query);
        const matchesType = sourceType === 'ALL' || parsed.sourceType === sourceType;
        const matchesField = field === 'ALL' || parsed.field === field;

        return matchesSearch && matchesType && matchesField;
      }),
    [field, search, sourceType, sources]
  );

  function toggleSelection(key: string) {
    if (selectedSet.has(key)) {
      onSelectionChange(selectedKeys.filter((selectedKey) => selectedKey !== key));
      return;
    }

    onSelectionChange([...selectedKeys, key]);
  }

  if (loading) {
    return <div className="quote-source-selector__state">Loading quote sources...</div>;
  }

  if (error) {
    return <div className="quote-source-selector__state quote-source-selector__state--error">{error}</div>;
  }

  return (
    <section className="quote-source-selector" aria-label="Quote source selector">
      <div className="quote-source-selector__toolbar">
        <input
          aria-label="Search quote sources"
          placeholder="Search source, pair, field"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select
          aria-label="Filter source type"
          value={sourceType}
          onChange={(event) => setSourceType(event.target.value as SourceTypeFilter)}
        >
          <option value="ALL">All types</option>
          <option value="CEX">CEX</option>
          <option value="DEX">DEX</option>
        </select>
        <select
          aria-label="Filter quote field"
          value={field}
          onChange={(event) => setField(event.target.value as QuoteFieldFilter)}
        >
          <option value="ALL">All fields</option>
          <option value="bidPrice">bidPrice</option>
          <option value="askPrice">askPrice</option>
          <option value="bidPool">bidPool</option>
          <option value="askPool">askPool</option>
        </select>
      </div>

      {filteredSources.length === 0 ? (
        <div className="quote-source-selector__state">No quote sources match current filters.</div>
      ) : (
        <div className="quote-source-selector__grid">
          {filteredSources.map((source) => (
            <QuoteSourceCard
              key={source.key}
              selected={selectedSet.has(source.key)}
              source={source}
              onToggle={toggleSelection}
            />
          ))}
        </div>
      )}
    </section>
  );
}
