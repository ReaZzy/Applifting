import React from 'react';
import { useParams } from 'react-router-dom';
import { useArticleMoreInfoQuery } from '@src/api/articles.api';
import ServerImage from '@src/components/ServerImage/ServerImage';
import Spinner from '@src/components/Spinner/Spinner';
import { Flex, Title } from '@src/components/styled';
import {
  ContentImageWrapper,
  ContentWrapper,
} from '@src/feautures/ArticleFull/articleFull.styles';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useTheme } from 'styled-components';

const ArticleFull: React.FC = React.memo(() => {
  const theme = useTheme();
  const { articleId } = useParams<{ articleId: string }>() as {
    articleId: string;
  };
  const { isLoading, data } = useArticleMoreInfoQuery(articleId, {
    staleTime: Infinity,
  });

  if (isLoading) return <Spinner />;
  return (
    <Flex flexDirection="column" gap={`${theme.spacing.common * 3}px`}>
      <Title>{data?.data?.title}</Title>
      {data?.data?.imageId && (
        <ServerImage imageId={data.data.imageId} maxHeight="420px" />
      )}
      <ContentWrapper>
        <MarkdownEditor.Markdown source={data?.data?.content} />
      </ContentWrapper>
    </Flex>
  );
});

ArticleFull.displayName = 'ArticleFull';
export default ArticleFull;
