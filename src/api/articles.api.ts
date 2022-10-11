import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
} from 'react-query';
import { UseQueryOptions } from 'react-query/types/react/types';
import { getImageQueryKey } from '@src/api/images.api';
import { queryClient } from '@src/api/queryClient';
import {
  Article,
  ArticleFull,
  CreateNewArticleQuery,
} from '@src/types/articles.api.types';
import { PaginatedResult } from '@src/types/common.types';
import { appAxios } from '@src/utils/axios.utils';
import { AxiosError, AxiosResponse } from 'axios';

export const getArticlesQueryKey = (offset?: number) => {
  if (!offset) return ['articles'];
  return ['articles', offset];
};
export const getArticlesInfinityQueryKey = () => ['articles-infinite'];

export const getArticlesRequest = (offset: number, limit = 10) =>
  appAxios.get<PaginatedResult<Article>>('/articles', {
    params: { offset, limit },
  });
export const useArticlesQuery = (
  offset: number,
  limit = 10,
  options?: UseQueryOptions<
    AxiosResponse<PaginatedResult<Article>>,
    AxiosError
  >,
) =>
  useQuery<AxiosResponse<PaginatedResult<Article>>, AxiosError>(
    getArticlesInfinityQueryKey(),
    () => getArticlesRequest(offset, limit),
    options,
  );

export const useInfiniteArticlesQuery = (
  offset: number,
  limit = 10,
  options?: UseInfiniteQueryOptions<
    AxiosResponse<PaginatedResult<Article>>,
    AxiosError
  >,
) =>
  useInfiniteQuery<AxiosResponse<PaginatedResult<Article>>, AxiosError>(
    getArticlesQueryKey(),
    ({ pageParam = offset }) => getArticlesRequest(pageParam, limit),
    options,
  );

export const getArticleMoreInfoQueryKey = (articleId: string) => [
  'article',
  articleId,
];

export const useArticleMoreInfoQuery = (
  articleId: string,
  options?: UseQueryOptions<AxiosResponse<ArticleFull>, AxiosError>,
) =>
  useQuery<AxiosResponse<ArticleFull>, AxiosError>(
    getArticleMoreInfoQueryKey(articleId),
    () => {
      return appAxios.get<ArticleFull>(`/articles/${articleId}`);
    },
    options,
  );

export const createArticleRequest = async ({
  perex,
  content,
  imageId,
  title,
}: Omit<CreateNewArticleQuery, 'image'> & { imageId?: string }) => {
  try {
    const res = await appAxios.post<ArticleFull>('/articles', {
      perex,
      content,
      imageId,
      title,
    });
    if (res?.status.toString().startsWith('2')) {
      await queryClient.invalidateQueries(getArticlesQueryKey());
      await queryClient.invalidateQueries(getArticlesInfinityQueryKey());
      await queryClient.invalidateQueries(getImageQueryKey(imageId));
      if (res?.data?.imageId) {
        await queryClient.invalidateQueries(
          getImageQueryKey(res?.data?.imageId),
        );
      }
      return res;
    }
  } catch (e) {
    console.warn(e);
  }
};

export const patchArticleRequest = async ({
  perex,
  content,
  imageId,
  title,
  articleId,
}: Omit<CreateNewArticleQuery, 'image'> & {
  imageId?: string;
  articleId: string;
}) => {
  try {
    const res = await appAxios.patch<ArticleFull>(`/articles/${articleId}`, {
      perex,
      content,
      imageId,
      title,
    });
    if (res?.status.toString().startsWith('2')) {
      await queryClient.invalidateQueries(
        getArticleMoreInfoQueryKey(articleId),
      );
      await queryClient.invalidateQueries(getArticlesQueryKey());
      await queryClient.invalidateQueries(getArticlesInfinityQueryKey());
      if (res?.data?.imageId) {
        await queryClient.invalidateQueries(
          getImageQueryKey(res?.data?.imageId),
        );
      }
      return res;
    }
  } catch (e) {
    console.warn(e);
  }
};

export const deleteArticleRequest = async (articleId: string) => {
  try {
    const res = await appAxios.delete<void>(`/articles/${articleId}`);
    if (res?.status.toString().startsWith('2')) {
      await queryClient.invalidateQueries(
        getArticleMoreInfoQueryKey(articleId),
      );
      await queryClient.invalidateQueries(getArticlesQueryKey());
      await queryClient.invalidateQueries(getArticlesInfinityQueryKey());

      return res;
    }
  } catch (e) {
    console.warn(e);
  }
};
