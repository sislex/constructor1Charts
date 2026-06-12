import { describe, expect, it } from 'vitest';
import { rootReducer } from './rootReducer';
import { setTheme } from './slices/settingsSlice';

describe('rootReducer', () => {
  it('creates initial state for all planned slices', () => {
    const state = rootReducer(undefined, { type: 'unknown' });

    expect(Object.keys(state)).toEqual([
      'configurations',
      'marketData',
      'player',
      'conditions',
      'demoTrading',
      'settings',
      'ui'
    ]);
  });

  it('updates settings state', () => {
    const state = rootReducer(undefined, setTheme('light'));

    expect(state.settings.theme).toBe('light');
  });
});
