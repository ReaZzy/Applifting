import React, { useState } from 'react';
import { useArticlesQuery } from '@src/api/articles.api';
import Button from '@src/components/Button/Button';
import Spinner from '@src/components/Spinner/Spinner';

const ArticleListAdmin: React.FC = () => {
  const [offset, setOffset] = useState<number>(0);
  const { isLoading, data } = useArticlesQuery(offset, 10, {
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

  return (
    <div>
      {isLoading && <Spinner />}
      123
      <Button
        onClick={handlePrevPage}
        isLoading={isLoading}
        disabled={!canFetchPrevious}
      >
        prev
      </Button>
      123
      <Button
        onClick={handleNextPage}
        isLoading={isLoading}
        disabled={!canFetchNext}
      >
        next
      </Button>
    </div>
  );
};

ArticleListAdmin.displayName = 'ArticleListAdmin';
export default ArticleListAdmin;
