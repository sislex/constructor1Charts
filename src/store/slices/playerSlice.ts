import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PlayerState } from '@domainTypes/domain';

const initialState: PlayerState = {
  mode: 'replay',
  isPlaying: false,
  currentStep: 0,
  totalSteps: 0,
  playbackSpeed: 1,
  livePaused: false
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    startReplayRequested(state) {
      state.mode = 'replay';
      state.isPlaying = true;
    },
    pauseReplayRequested(state) {
      state.isPlaying = false;
    },
    stepForwardRequested(state) {
      state.currentStep = Math.min(state.currentStep + 1, state.totalSteps);
    },
    stepBackwardRequested(state) {
      state.currentStep = Math.max(state.currentStep - 1, 0);
    },
    setCurrentStepRequested(state, action: PayloadAction<number>) {
      state.currentStep = Math.max(0, Math.min(action.payload, state.totalSteps));
      state.livePaused = state.mode === 'live' && state.currentStep < state.totalSteps;
    },
    setTotalSteps(state, action: PayloadAction<number>) {
      state.totalSteps = Math.max(0, action.payload);
    },
    setPlaybackSpeed(state, action: PayloadAction<number>) {
      state.playbackSpeed = action.payload > 0 ? action.payload : 1;
    },
    startLiveRequested(state) {
      state.mode = 'live';
      state.isPlaying = true;
      state.livePaused = false;
    },
    stopLiveRequested(state) {
      state.isPlaying = false;
      state.livePaused = false;
    }
  }
});

export const {
  startReplayRequested,
  pauseReplayRequested,
  stepForwardRequested,
  stepBackwardRequested,
  setCurrentStepRequested,
  setTotalSteps,
  setPlaybackSpeed,
  startLiveRequested,
  stopLiveRequested
} = playerSlice.actions;
