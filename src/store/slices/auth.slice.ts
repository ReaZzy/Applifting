import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@src/types/store.types';
import {
  getTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
} from '@src/utils/auth.utils';

interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: getTokenFromLocalStorage() ?? null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (
      state,
      payload: PayloadAction<AuthState['accessToken']>,
    ) => {
      state.accessToken = payload.payload;
      setAccessTokenToLocalStorage(payload.payload);
    },
  },
});

export const { setAccessToken } = authSlice.actions;

// NOTE FOR REVIEW: I use here a simple selectors instead of reselect
// for performance reasons. Reselect is slower for such cases
export const accessTokenSelector = (state: RootState) => state.auth.accessToken;

export const authReducer = authSlice.reducer;
