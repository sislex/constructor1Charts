import type { ParsedQuoteKey, QuoteField, SourceType } from '@domainTypes/domain';

const quoteFields: ReadonlySet<string> = new Set(['bidPrice', 'askPrice', 'bidPool', 'askPool']);

export type ParseQuoteKeyResult =
  | { ok: true; value: ParsedQuoteKey }
  | { ok: false; error: string; raw: string };

export function getSourceType(source: string): SourceType {
  return source.startsWith('dex:') ? 'DEX' : 'CEX';
}

export function parseQuoteKey(raw: string): ParseQuoteKeyResult {
  const trimmed = raw.trim();

  if (!trimmed) {
    return { ok: false, error: 'Quote key is empty.', raw };
  }

  const parts = trimmed.split('|');

  if (parts.length !== 3) {
    return { ok: false, error: 'Quote key must contain source, pair and field.', raw };
  }

  const [source, pair, field] = parts;
  const pairParts = pair.split('/');

  if (!source || !pair || !field || pairParts.length !== 2 || !pairParts[0] || !pairParts[1]) {
    return { ok: false, error: 'Quote key contains invalid source, pair or field.', raw };
  }

  if (!quoteFields.has(field)) {
    return { ok: false, error: `Unsupported quote field: ${field}.`, raw };
  }

  const sourceType = getSourceType(source);
  const network = sourceType === 'DEX' ? source.replace(/^dex:/, '') : undefined;

  return {
    ok: true,
    value: {
      raw,
      source,
      sourceType,
      network,
      pair,
      baseAsset: pairParts[0],
      quoteAsset: pairParts[1],
      field: field as QuoteField
    }
  };
}

export function parseQuoteKeyOrThrow(raw: string): ParsedQuoteKey {
  const result = parseQuoteKey(raw);

  if (!result.ok) {
    throw new Error(result.error);
  }

  return result.value;
}
