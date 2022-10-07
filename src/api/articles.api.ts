import { useQuery } from 'react-query';
import {
  ArticleFull,
  ArticlesApiQueryResult,
} from '@src/types/articles.api.types';
import { PaginatedResult } from '@src/types/common.types';
import { appAxios } from '@src/utils/axios';
import { AxiosError, AxiosResponse } from 'axios';

export const getArticlesQueryKey = () => ['articles'];

export const useArticlesQuery = (offset: number, limit = 10) =>
  useQuery<AxiosResponse<PaginatedResult<ArticlesApiQueryResult>>, AxiosError>(
    getArticlesQueryKey(),
    () => {
      return appAxios.get<PaginatedResult<ArticlesApiQueryResult>>(
        '/articles',
        {
          params: { offset, limit },
        },
      );
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
