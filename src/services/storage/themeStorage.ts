import type { AppTheme } from '@store/slices/settingsSlice';

const storageKey = 'arbidex.theme';

export function readStoredTheme(storage: Storage = window.localStorage): AppTheme | null {
  const value = storage.getItem(storageKey);

  if (value === 'dark' || value === 'light') {
    return value;
  }

  return null;
}

export function writeStoredTheme(theme: AppTheme, storage: Storage = window.localStorage): void {
  storage.setItem(storageKey, theme);
}
