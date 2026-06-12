import type { RootState } from '@store/rootReducer';

export const selectTheme = (state: RootState) => state.settings.theme;
export const selectChartEngine = (state: RootState) => state.settings.chartEngine;
