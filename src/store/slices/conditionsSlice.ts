import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BotState, Condition, ConditionGroup } from '@domainTypes/domain';

export interface ConditionsState {
  items: Condition[];
  groups: ConditionGroup[];
  botState: BotState;
}

const initialState: ConditionsState = {
  items: [],
  groups: [],
  botState: 'IDLE'
};

export const conditionsSlice = createSlice({
  name: 'conditions',
  initialState,
  reducers: {
    conditionAdded(state, action: PayloadAction<Condition>) {
      state.items.push(action.payload);
    },
    conditionGroupAdded(state, action: PayloadAction<ConditionGroup>) {
      state.groups.push(action.payload);
    },
    botStateChanged(state, action: PayloadAction<BotState>) {
      state.botState = action.payload;
    }
  }
});

export const { conditionAdded, conditionGroupAdded, botStateChanged } = conditionsSlice.actions;
