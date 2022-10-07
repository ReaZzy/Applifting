import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@src/store/api/auth.api';
import { authReducer } from '@src/store/slices/auth.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
