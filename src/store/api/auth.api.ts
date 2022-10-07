import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@src/store/api/axiosBaseQuery';
import {
  AuthApiLoginQuery,
  AuthApiLoginQueryResult,
} from '@src/types/auth.api.types';

export const authApi = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    login: build.mutation<AuthApiLoginQueryResult, AuthApiLoginQuery>({
      query: ({ username, password }) => ({
        url: '/login',
        method: 'POST',
        data: {
          username,
          password,
        },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
