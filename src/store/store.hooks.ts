import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { RootState, TypedDispatch } from '@src/types/store.types';

export const useTypedDispatch: () => TypedDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
