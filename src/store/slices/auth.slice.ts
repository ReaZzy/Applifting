import {
  type PayloadAction,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '@src/types/store';

interface AuthState {
  value: number;
}

const initialState: AuthState = {
  value: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = authSlice.actions;
export const valueSelector = createSelector(
  (state: RootState) => state.auth.value,
  (state) => state,
);

export const authReducer = authSlice.reducer;
