import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@src/store/slices/auth.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
