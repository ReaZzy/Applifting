import { QueryOptions, useQuery, useQueryClient } from 'react-query';
import { UseQueryOptions } from 'react-query/types/react/types';
import { queryClient } from '@src/api/queryClient';
import { useQueryInvalidation } from '@src/hooks/useQueryInvalidation';
import {
  Article,
  ArticleFull,
  CreateNewArticleQuery,
} from '@src/types/articles.api.types';
import { PaginatedResult } from '@src/types/common.types';
import { appAxios } from '@src/utils/axios';
import { AxiosError, AxiosResponse } from 'axios';

export const getArticlesQueryKey = () => ['articles'];

export const useArticlesQuery = (offset: number, limit = 10) =>
  useQuery<AxiosResponse<PaginatedResult<Article>>, AxiosError>(
    getArticlesQueryKey(),
    () => {
      return appAxios.get<PaginatedResult<Article>>('/articles', {
        params: { offset, limit },
      });
    },
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
  return appAxios.post<ArticleFull>('/articles', {
    perex,
    content,
    imageId,
    title,
  });
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
      return res;
    }
  } catch (e) {
    console.warn(e);
  }
};
