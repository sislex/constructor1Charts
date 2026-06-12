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
    configurationDeleted(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    configurationDuplicated(state, action: PayloadAction<{ id: string; newId: string; createdAt: string }>) {
      const source = state.items.find((item) => item.id === action.payload.id);

      if (!source) {
        return;
      }

      state.items.push({
        ...source,
        id: action.payload.newId,
        name: `${source.name} Copy`,
        createdAt: action.payload.createdAt,
        updatedAt: action.payload.createdAt,
        status: 'draft'
      });
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
  configurationDeleted,
  configurationDuplicated,
  setConfigurationsSearch
} = configurationsSlice.actions;
