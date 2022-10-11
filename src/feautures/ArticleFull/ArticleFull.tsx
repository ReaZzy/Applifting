import React, { useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { generatePath, Link, useParams } from 'react-router-dom';
import {
  getArticleMoreInfoQueryKey,
  useArticleMoreInfoQuery,
} from '@src/api/articles.api';
import Button from '@src/components/Button/Button';
import ServerImage from '@src/components/ServerImage/ServerImage';
import Spinner from '@src/components/Spinner/Spinner';
import { Flex, Paragraph, Title } from '@src/components/styled';
import { ContentWrapper } from '@src/feautures/ArticleFull/articleFull.styles';
import CommentsForm from '@src/feautures/CommentsForm/CommentForm';
import { useReactQuerySubscription } from '@src/hooks/useQuerySubsription';
import { PATH_APP } from '@src/router/paths';
import { accessTokenSelector } from '@src/store/slices/auth.slice';
import { useTypedSelector } from '@src/store/store.hooks';
import {
  ArticleComment,
  ArticleFull as ArticleFullResponse,
} from '@src/types/articles.api.types';
import { getFormattedDate } from '@src/utils/date.utils';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { AxiosResponse } from 'axios';
import { useTheme } from 'styled-components';

import CommentsList from '../CommentsList/CommentLists';

const ArticleFull: React.FC = React.memo(() => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const accessToken = useTypedSelector(accessTokenSelector);
  const { articleId } = useParams<{ articleId: string }>() as {
    articleId: string;
  };
  const { isLoading, data, isSuccess } = useArticleMoreInfoQuery(articleId, {
    staleTime: Infinity,
    retry: 3,
  });

  const getEditArticleButton = useMemo(() => {
    if (!accessToken || !data?.data?.articleId) return;
    return (
      <Link
        to={generatePath(PATH_APP.article.editArticle, {
          articleId: data.data.articleId,
        })}
      >
        <Button primary={false}>Edit article</Button>
      </Link>
    );
  }, [data?.data?.articleId, accessToken]);

  useReactQuerySubscription<{
    changeType: string;
    comment: Omit<ArticleComment, 'articleId'>;
  }>(async (wsEvent) => {
    const wsEventData: {
      changeType: string;
      comment: Omit<ArticleComment, 'articleId'>;
    } = JSON.parse(wsEvent.data as unknown as string);
    if (
      ['commentUpVoted', 'commentDownVoted'].includes(wsEventData?.changeType)
    ) {
      await queryClient.invalidateQueries(
        getArticleMoreInfoQueryKey(articleId),
      );
      return queryClient.setQueriesData(
        getArticleMoreInfoQueryKey(articleId),
        (oldData) => {
          if (typeof oldData !== 'object' || oldData === null) return oldData;
          const update = (entity: ArticleFullResponse) => {
            const isCommentArticle = entity.articleId === articleId;

            if (isCommentArticle) {
              const comments = entity.comments.map((entityComment) => {
                if (
                  entityComment.commentId === wsEventData?.comment?.commentId
                ) {
                  return { ...entityComment, ...wsEventData?.comment };
                }
                return entityComment;
              });
              return { ...entity, comments };
            }
            return entity;
          };

          return {
            ...oldData,
            data: update((oldData as AxiosResponse<ArticleFullResponse>).data),
          };
        },
      );
    }
    if (['commentCreated'].includes(wsEventData?.changeType)) {
      return queryClient.invalidateQueries(
        getArticleMoreInfoQueryKey(articleId),
      );
    }
  });

  if (isLoading || !isSuccess) return <Spinner />;

  return (
    <Flex flexDirection="column" gap={`${theme.spacing.common * 3}px`}>
      <Flex flexDirection="column" gap={`${theme.spacing.common}px`}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          gap={`${theme.spacing.common}px`}
        >
          <Title>{data.data.title}</Title>
          {getEditArticleButton}
        </Flex>

        <Paragraph>{getFormattedDate(data.data.lastUpdatedAt)}</Paragraph>
      </Flex>

      {data.data.imageId && (
        <ServerImage imageId={data.data.imageId} maxHeight="420px" />
      )}
      <ContentWrapper>
        <MarkdownEditor.Markdown source={data.data.content} />
      </ContentWrapper>
      {accessToken && <CommentsForm articleId={data?.data?.articleId} />}

      <CommentsList comments={data?.data?.comments} />
    </Flex>
  );
});

ArticleFull.displayName = 'ArticleFull';
export default ArticleFull;
