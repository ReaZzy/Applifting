import React from 'react';
import ArticlesList from '@src/feautures/ArticlesList/ArticlesList';

const Homepage: React.FC = () => {
  return (
    <div>
      Recent articles
      <ArticlesList />
    </div>
  );
};

export default Homepage;
