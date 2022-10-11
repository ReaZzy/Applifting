import React from 'react';
import ArticleFull from '@src/feautures/ArticleFull/ArticleFull';
import { CreateNewArticleWrapper } from '@src/pages/CreateNewArticle/createNewArticle.styles';

const ArticleView: React.FC = () => {
  return (
    <CreateNewArticleWrapper>
      <ArticleFull />
    </CreateNewArticleWrapper>
  );
};

export default ArticleView;
