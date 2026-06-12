import type { BotConfiguration } from '@domainTypes/domain';

const storageKey = 'arbidex.configurations';

export function readStoredConfigurations(storage: Storage = window.localStorage): BotConfiguration[] {
  const value = storage.getItem(storageKey);

  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as unknown;

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isStoredConfiguration);
  } catch {
    return [];
  }
}

export function writeStoredConfigurations(
  configurations: BotConfiguration[],
  storage: Storage = window.localStorage
): void {
  storage.setItem(storageKey, JSON.stringify(configurations));
}

function isStoredConfiguration(value: unknown): value is BotConfiguration {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<BotConfiguration>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    Array.isArray(candidate.selectedSources) &&
    typeof candidate.tradingMarket === 'string'
  );
}
