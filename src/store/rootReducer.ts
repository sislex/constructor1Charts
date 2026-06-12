import { combineReducers } from '@reduxjs/toolkit';
import { conditionsSlice } from './slices/conditionsSlice';
import { configurationsSlice } from './slices/configurationsSlice';
import { demoTradingSlice } from './slices/demoTradingSlice';
import { marketDataSlice } from './slices/marketDataSlice';
import { playerSlice } from './slices/playerSlice';
import { settingsSlice } from './slices/settingsSlice';
import { uiSlice } from './slices/uiSlice';

export const rootReducer = combineReducers({
  configurations: configurationsSlice.reducer,
  marketData: marketDataSlice.reducer,
  player: playerSlice.reducer,
  conditions: conditionsSlice.reducer,
  demoTrading: demoTradingSlice.reducer,
  settings: settingsSlice.reducer,
  ui: uiSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
