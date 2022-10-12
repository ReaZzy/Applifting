import React, { useMemo, useState } from 'react';
import { useArticlesQuery } from '@src/api/articles.api';
import Button from '@src/components/Button/Button';
import Spinner from '@src/components/Spinner/Spinner';
import { Flex, Paragraph } from '@src/components/styled';
import ArticleAdmin from '@src/feautures/ArticlesListAdmin/ArticleAdmin';
import { useTheme } from 'styled-components';

const ArticleListAdmin: React.FC = () => {
  const theme = useTheme();
  const [offset, setOffset] = useState<number>(0);
  const { isLoading, data, isSuccess } = useArticlesQuery(offset, 10, {
    staleTime: Infinity,
  });

  const currentPagination = data?.data?.pagination;
  const canFetchPrevious = offset > 0;
  const canFetchNext =
    Number(currentPagination?.limit) + Number(currentPagination?.offset) <
    Number(currentPagination?.total);

  const handleNextPage = () => {
    if (!canFetchNext) return;
    setOffset((prev) => prev + 10);
  };
  const handlePrevPage = () => {
    if (!canFetchPrevious) return;
    setOffset((prev) => prev - 10);
  };

  const getAdminArticlesList = useMemo(() => {
    if (isLoading || !isSuccess) return <Spinner />;
    return data?.data?.items.map((article) => (
      <ArticleAdmin
        articleId={article.articleId}
        perex={article.perex}
        title={article.title}
        lastUpdatedAt={article.lastUpdatedAt}
        createdAt={article.lastUpdatedAt}
      />
    ));
  }, [data?.data?.items, isLoading, isSuccess]);

  return (
    <div>
      <Flex gap={`${theme.spacing.common * 2}px`} flexDirection="column">
        <table>
          <tr>
            <th>Article id</th>
            <th>Created at</th>
            <th>Last updated at</th>
            <th>Title</th>
            <th>Perex</th>
            <th>Actions</th>
          </tr>
          {getAdminArticlesList}
        </table>
      </Flex>
      <Flex gap={`${theme.spacing.common * 2}px`}>
        <Paragraph>Total: {currentPagination?.total ?? 0}</Paragraph>
        <Paragraph>
          Page: {Math.floor(Number(currentPagination?.offset ?? 0) / 10) + 1}
        </Paragraph>
        <Button
          onClick={handlePrevPage}
          isLoading={isLoading}
          disabled={!canFetchPrevious}
        >
          Previous page
        </Button>
        <Button
          onClick={handleNextPage}
          isLoading={isLoading}
          disabled={!canFetchNext}
        >
          Next page
        </Button>
      </Flex>
    </div>
  );
};

ArticleListAdmin.displayName = 'ArticleListAdmin';
export default ArticleListAdmin;
