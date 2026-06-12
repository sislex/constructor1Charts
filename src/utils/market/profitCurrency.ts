import type { ParsedQuoteKey } from '@domainTypes/domain';
import { resolveTokenSymbol, type TokenMetadataMap } from '@utils/tokenResolver/tokenResolver';

export function getProfitCurrency(
  parsedKey: ParsedQuoteKey,
  metadata?: TokenMetadataMap
): string {
  return resolveTokenSymbol(parsedKey.quoteAsset, parsedKey.network, metadata);
}
