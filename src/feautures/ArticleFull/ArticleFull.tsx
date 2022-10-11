import React from 'react';
import { useParams } from 'react-router-dom';
import { useArticleMoreInfoQuery } from '@src/api/articles.api';
import Button from '@src/components/Button/Button';
import Spinner from '@src/components/Spinner/Spinner';
import { Flex, Title } from '@src/components/styled';
import { CreateNewArticleFormWrapper } from '@src/feautures/CreateNewArticleForm/createNewArticleForm.styles';

const ArticleFull: React.FC = React.memo(() => {
  const { articleId } = useParams<{ articleId: string }>() as {
    articleId: string;
  };
  const { isLoading, data } = useArticleMoreInfoQuery(articleId, {
    staleTime: Infinity,
  });

  if (isLoading) return <Spinner />;
  return (
    <>
      <Title>{data?.data?.title}</Title>
    </>
  );
});

ArticleFull.displayName = 'ArticleFull';
export default ArticleFull;
