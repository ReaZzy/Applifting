import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@src/store/slices/auth.slice';

// NOTE FOR REVIEW: I'd prefer to don't use such a big global stores as
// Redux or Apollo link for project like this. I think it's better to use
// a simple context here, but it's not as maintainable. That's why I'd use
// something like Recoil here, but, unfortunately, as I understood it's prohibited
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
