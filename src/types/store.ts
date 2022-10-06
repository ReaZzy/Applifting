import { store } from '@src/store/store';

export type RootState = ReturnType<typeof store.getState>;
export type TypedDispatch = typeof store.dispatch;
