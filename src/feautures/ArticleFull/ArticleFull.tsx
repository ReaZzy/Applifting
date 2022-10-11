import React, { useMemo } from 'react';
import { generatePath, Link, useParams } from 'react-router-dom';
import { useArticleMoreInfoQuery } from '@src/api/articles.api';
import Button from '@src/components/Button/Button';
import ServerImage from '@src/components/ServerImage/ServerImage';
import Spinner from '@src/components/Spinner/Spinner';
import { Flex, Paragraph, Title } from '@src/components/styled';
import { ContentWrapper } from '@src/feautures/ArticleFull/articleFull.styles';
import { PATH_APP } from '@src/router/paths';
import { accessTokenSelector } from '@src/store/slices/auth.slice';
import { useTypedSelector } from '@src/store/store.hooks';
import { getFormattedDate } from '@src/utils/date.utils';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useTheme } from 'styled-components';

const ArticleFull: React.FC = React.memo(() => {
  const theme = useTheme();
  const isAuth = useTypedSelector(accessTokenSelector);
  const { articleId } = useParams<{ articleId: string }>() as {
    articleId: string;
  };
  const { isLoading, data, isSuccess } = useArticleMoreInfoQuery(articleId, {
    staleTime: Infinity,
    retry: 3,
  });

  const getEditArticleButton = useMemo(() => {
    if (!isAuth || !data?.data?.articleId) return;
    return (
      <Link
        to={generatePath(PATH_APP.article.editArticle, {
          articleId: data.data.articleId,
        })}
      >
        <Button primary={false}>Edit article</Button>
      </Link>
    );
  }, [data?.data?.articleId, isAuth]);

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
    </Flex>
  );
});

ArticleFull.displayName = 'ArticleFull';
export default ArticleFull;
