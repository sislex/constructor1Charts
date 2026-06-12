import type { ParsedQuoteKey } from '@domainTypes/domain';

export interface TokenMetadata {
  address: string;
  symbol: string;
  network?: string;
}

export type TokenMetadataMap = Record<string, TokenMetadata>;

export const defaultTokenMetadata: TokenMetadataMap = {
  'arbitrum:0xaf88d065e77c8cc2239327c5edb3a432268e5831': {
    address: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
    symbol: 'USDC',
    network: 'arbitrum'
  },
  'arbitrum:0x82af49447d8a07e3bd95bd0d56f35241523fbab1': {
    address: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    symbol: 'WETH',
    network: 'arbitrum'
  }
};

function metadataKey(network: string | undefined, address: string): string {
  return `${network ?? 'unknown'}:${address.toLowerCase()}`;
}

export function shortenAddress(address: string): string {
  if (!address.startsWith('0x') || address.length <= 12) {
    return address;
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function resolveTokenSymbol(
  addressOrSymbol: string,
  network: string | undefined,
  metadata: TokenMetadataMap = defaultTokenMetadata
): string {
  if (!addressOrSymbol.startsWith('0x')) {
    return addressOrSymbol;
  }

  return metadata[metadataKey(network, addressOrSymbol)]?.symbol ?? shortenAddress(addressOrSymbol);
}

export function getDisplayPair(
  parsedKey: ParsedQuoteKey,
  metadata: TokenMetadataMap = defaultTokenMetadata
): string {
  if (parsedKey.sourceType === 'CEX') {
    return parsedKey.pair;
  }

  const base = resolveTokenSymbol(parsedKey.baseAsset, parsedKey.network, metadata);
  const quote = resolveTokenSymbol(parsedKey.quoteAsset, parsedKey.network, metadata);

  return `${base}/${quote}`;
}

export function getQuoteSourceLabel(parsedKey: ParsedQuoteKey): string {
  const sourceLabel =
    parsedKey.sourceType === 'DEX'
      ? parsedKey.network?.replace(/^\w/, (letter) => letter.toUpperCase()) ?? 'Unknown'
      : parsedKey.source.replace(/^\w/, (letter) => letter.toUpperCase());

  return `[${parsedKey.sourceType}][${sourceLabel}] ${getDisplayPair(parsedKey)} ${parsedKey.field}`;
}
