import { useMutation } from 'react-query';
import {
  AuthApiLoginQuery,
  AuthApiLoginQueryResult,
} from '@src/types/auth.api.types';
import { appAxios } from '@src/utils/axios';
import { AxiosError, AxiosResponse } from 'axios';

export const useLoginMutation = () =>
  useMutation<
    AxiosResponse<AuthApiLoginQueryResult>,
    AxiosError,
    AuthApiLoginQuery
  >((data) => {
    return appAxios.post<AuthApiLoginQueryResult>('/login', data);
  });
