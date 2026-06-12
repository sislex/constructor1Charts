import { describe, expect, it } from 'vitest';
import { readStoredTheme, writeStoredTheme } from './themeStorage';

describe('themeStorage', () => {
  it('reads valid stored theme', () => {
    const storage = new MapStorage();
    storage.setItem('arbidex.theme', 'light');

    expect(readStoredTheme(storage)).toBe('light');
  });

  it('ignores invalid stored theme', () => {
    const storage = new MapStorage();
    storage.setItem('arbidex.theme', 'system');

    expect(readStoredTheme(storage)).toBeNull();
  });

  it('writes theme', () => {
    const storage = new MapStorage();
    writeStoredTheme('dark', storage);

    expect(storage.getItem('arbidex.theme')).toBe('dark');
  });
});

class MapStorage implements Storage {
  private readonly data = new Map<string, string>();
  length = 0;

  clear(): void {
    this.data.clear();
    this.length = 0;
  }

  getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }

  key(index: number): string | null {
    return Array.from(this.data.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.data.delete(key);
    this.length = this.data.size;
  }

  setItem(key: string, value: string): void {
    this.data.set(key, value);
    this.length = this.data.size;
  }
}
