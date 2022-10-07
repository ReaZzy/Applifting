import React, { useState } from 'react';
import { useArticlesQuery } from '@src/api/articles.api';

const ArticlesList: React.FC = React.memo(() => {
  const [offset, setOffset] = useState<number>(10);
  const { isLoading } = useArticlesQuery(offset);
  return isLoading ? 'Loading ...' : 'YAY!!!';
});

ArticlesList.displayName = 'ArticlesList';
export default ArticlesList;
