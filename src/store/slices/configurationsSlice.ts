import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BotConfiguration } from '@domainTypes/domain';

export interface ConfigurationsState {
  items: BotConfiguration[];
  loading: boolean;
  error: string | null;
  search: string;
}

const initialState: ConfigurationsState = {
  items: [],
  loading: false,
  error: null,
  search: ''
};

export const configurationsSlice = createSlice({
  name: 'configurations',
  initialState,
  reducers: {
    loadConfigurationsRequested(state) {
      state.loading = true;
      state.error = null;
    },
    loadConfigurationsSucceeded(state, action: PayloadAction<BotConfiguration[]>) {
      state.loading = false;
      state.items = action.payload;
    },
    loadConfigurationsFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    configurationSaved(state, action: PayloadAction<BotConfiguration>) {
      const existingIndex = state.items.findIndex((item) => item.id === action.payload.id);

      if (existingIndex >= 0) {
        state.items[existingIndex] = action.payload;
        return;
      }

      state.items.push(action.payload);
    },
    setConfigurationsSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    }
  }
});

export const {
  loadConfigurationsRequested,
  loadConfigurationsSucceeded,
  loadConfigurationsFailed,
  configurationSaved,
  setConfigurationsSearch
} = configurationsSlice.actions;
