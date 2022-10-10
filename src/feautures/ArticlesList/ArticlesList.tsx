import React, { useMemo, useRef } from 'react';
import { useInfiniteArticlesQuery } from '@src/api/articles.api';
import Article from '@src/components/Article/Article';
import Spinner from '@src/components/Spinner/Spinner';
import { Flex, InvisibleElement } from '@src/components/styled';
import { useIntersectionObserver } from '@src/hooks/useIntersectionObserver';
import { useTheme } from 'styled-components';

const ArticlesList: React.FC = React.memo(() => {
  const theme = useTheme();
  const { isLoading, data, fetchNextPage, isFetchingNextPage } =
    useInfiniteArticlesQuery(0, 10, {
      getNextPageParam: (lastPage) => {
        const lastPagePagination = lastPage?.data?.pagination;
        if (!lastPagePagination) return;
        return lastPagePagination.offset + lastPagePagination.limit >
          lastPagePagination.total
          ? undefined
          : lastPagePagination.offset + 10;
      },
      staleTime: Infinity,
    });

  const currentPagination = data?.pages?.at(-1)?.data?.pagination;
  const lastElement = useRef(null);

  useIntersectionObserver(
    lastElement,
    async (entries) => {
      if (entries[0]?.isIntersecting) {
        await fetchNextPage();
      }
    },
    {
      threshold: 0,
      rootMargin: '0px',
      root: null,
      observe:
        Number(currentPagination?.total) >
        Number(currentPagination?.offset) + Number(currentPagination?.limit),
    },
  );

  const getArticlesList = useMemo(() => {
    if (data?.pages?.length === 0 || isLoading) return <Spinner />;
    return data?.pages.map((articlesPage) =>
      articlesPage.data?.items?.map(
        ({ articleId, title, perex, imageId, lastUpdatedAt }) => (
          <Article
            key={articleId}
            imageId={imageId}
            articleId={articleId}
            perex={perex}
            title={title}
            lastUpdatedAt={lastUpdatedAt}
          />
        ),
      ),
    );
  }, [data?.pages, isLoading]);

  return (
    <Flex gap={`${theme.spacing.common * 4}px`} flexDirection="column">
      {getArticlesList}
      {isFetchingNextPage && <Spinner />}
      <InvisibleElement ref={lastElement} />
    </Flex>
  );
});

ArticlesList.displayName = 'ArticlesList';
export default ArticlesList;
