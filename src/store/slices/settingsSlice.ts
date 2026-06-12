import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type AppTheme = 'dark' | 'light';
export type ChartEngine = 'd3' | 'ag-charts' | 'highcharts' | 'tradingview-lightweight' | 'echarts';

export interface SettingsState {
  theme: AppTheme;
  chartEngine: ChartEngine;
}

const initialState: SettingsState = {
  theme: 'dark',
  chartEngine: 'tradingview-lightweight'
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<AppTheme>) {
      state.theme = action.payload;
    },
    setChartEngine(state, action: PayloadAction<ChartEngine>) {
      state.chartEngine = action.payload;
    }
  }
});

export const { setTheme, setChartEngine } = settingsSlice.actions;
