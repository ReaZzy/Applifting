import { useQuery } from 'react-query';
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

export const useArticleMoreInfoQuery = (articleId: string) =>
  useQuery<AxiosResponse<ArticleFull>, AxiosError>(
    getArticleMoreInfoQueryKey(articleId),
    () => {
      return appAxios.get<ArticleFull>(`/article/${articleId}`);
    },
  );

export const createArticleRequest = async ({
  perex,
  content,
  imageId,
  title,
}: Omit<CreateNewArticleQuery, 'image'> & { imageId?: string }) => {
  return appAxios.post<ArticleFull>('/articles', {
    perex: perex,
    content,
    imageId,
    title,
  });
};
