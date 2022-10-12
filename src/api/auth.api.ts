import { getArticlesInfinityQueryKey } from '@src/api/articles.api';
import { queryClient } from '@src/api/queryClient';
import {
  AuthApiLoginQuery,
  AuthApiLoginQueryResult,
} from '@src/types/auth.api.types';
import { appAxios } from '@src/utils/axios.utils';

// NOTE FOR REVIEW: There aren't any request for current user, so it's hard to
// check is user logged in or not
export const loginRequest = async ({
  username,
  password,
}: AuthApiLoginQuery) => {
  const res = await appAxios.post<AuthApiLoginQueryResult>('/login', {
    username,
    password,
  });
  if (res?.status.toString().startsWith('2')) {
    await queryClient.invalidateQueries(getArticlesInfinityQueryKey());
  }
  return res;
};
