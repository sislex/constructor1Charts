import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UiState {
  sidebarCollapsed: boolean;
  activeRouteTitle: string;
}

const initialState: UiState = {
  sidebarCollapsed: false,
  activeRouteTitle: 'Bot Configurations'
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload;
    },
    setActiveRouteTitle(state, action: PayloadAction<string>) {
      state.activeRouteTitle = action.payload;
    }
  }
});

export const { setSidebarCollapsed, setActiveRouteTitle } = uiSlice.actions;
