import { ArticleComment } from '@src/types/articles.api.types';
import { appAxios } from '@src/utils/axios.utils';
import { AxiosResponse } from 'axios';

import { getArticleMoreInfoQueryKey } from './articles.api';
import { queryClient } from './queryClient';

export const uploadComment = async (
  comment: Pick<ArticleComment, 'articleId' | 'author' | 'content'>,
) => {
  try {
    const res = await appAxios.post<
      Pick<ArticleComment, 'articleId' | 'author' | 'content'>
    >('/comments', comment);
    if (res?.status.toString().startsWith('2')) {
      await queryClient.invalidateQueries(
        getArticleMoreInfoQueryKey(comment.articleId),
      );
      return res;
    }
  } catch (e) {
    console.warn(e);
  }
};

export const voteUpComment = async (commentId: string) => {
  try {
    const res = await appAxios.post<void, AxiosResponse<ArticleComment>>(
      `/comments/${commentId}/vote/up`,
    );
    if (res?.status.toString().startsWith('2')) {
      return res;
    }
  } catch (e) {
    console.warn(e);
  }
};

export const voteDownComment = async (commentId: string) => {
  try {
    const res = await appAxios.post<void, AxiosResponse<ArticleComment>>(
      `/comments/${commentId}/vote/down`,
    );
    if (res?.status.toString().startsWith('2')) {
      return res;
    }
  } catch (e) {
    console.warn(e);
  }
};
