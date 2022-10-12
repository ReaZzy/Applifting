import { ArticleComment } from '@src/types/articles.api.types';
import { appAxios } from '@src/utils/axios.utils';
import { AxiosResponse } from 'axios';

import { getArticleMoreInfoQueryKey } from './articles.api';
import { queryClient } from './queryClient';

export const uploadComment = async (
  comment: Pick<ArticleComment, 'articleId' | 'author' | 'content'>,
) => {
  const res = await appAxios.post<
    Pick<ArticleComment, 'articleId' | 'author' | 'content'>
  >('/comments', comment);
  if (res?.status.toString().startsWith('2')) {
    await queryClient.invalidateQueries(
      getArticleMoreInfoQueryKey(comment.articleId),
    );
  }
  return res;
};

export const voteUpComment = async (commentId: string) => {
  return appAxios.post<void, AxiosResponse<ArticleComment>>(
    `/comments/${commentId}/vote/up`,
  );
};

export const voteDownComment = async (commentId: string) => {
  return appAxios.post<void, AxiosResponse<ArticleComment>>(
    `/comments/${commentId}/vote/down`,
  );
};
