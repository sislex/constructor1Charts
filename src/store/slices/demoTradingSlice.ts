import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ActionHistoryItem, DemoPosition, Transaction } from '@domainTypes/domain';

export interface DemoTradingState {
  activeTransactionId: string | null;
  transactions: Transaction[];
  actionHistory: ActionHistoryItem[];
  position: DemoPosition;
}

const emptyPosition: DemoPosition = {
  status: 'NO_POSITION',
  entryPrice: 0,
  currentPrice: 0,
  amount: 0,
  currency: '',
  realizedPnL: 0,
  unrealizedPnL: 0,
  openedStep: 0,
  openedTimestamp: 0
};

const initialState: DemoTradingState = {
  activeTransactionId: null,
  transactions: [],
  actionHistory: [],
  position: emptyPosition
};

export const demoTradingSlice = createSlice({
  name: 'demoTrading',
  initialState,
  reducers: {
    transactionCreated(state, action: PayloadAction<Transaction>) {
      state.transactions.push(action.payload);
      state.activeTransactionId = action.payload.id;
    },
    transactionCompleted(state, action: PayloadAction<Transaction>) {
      state.transactions = state.transactions.map((transaction) =>
        transaction.id === action.payload.id ? action.payload : transaction
      );
      state.activeTransactionId = null;
    },
    actionHistoryAdded(state, action: PayloadAction<ActionHistoryItem>) {
      state.actionHistory.push(action.payload);
    },
    positionUpdated(state, action: PayloadAction<DemoPosition>) {
      state.position = action.payload;
    }
  }
});

export const {
  transactionCreated,
  transactionCompleted,
  actionHistoryAdded,
  positionUpdated
} = demoTradingSlice.actions;
