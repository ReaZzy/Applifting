import React, { useMemo } from 'react';
import { generatePath, Link } from 'react-router-dom';
import {
  ArticleContentWrapper,
  ArticleImageWrapper,
  ArticleWrapper,
} from '@src/components/Article/article.styles';
import ServerImage from '@src/components/ServerImage/ServerImage';
import { PATH_APP } from '@src/router/paths';
import { useTheme } from 'styled-components';

import { Heading, Paragraph } from '../styled';

interface ArticleProps {
  imageId: string | null;
  title: string;
  articleId: string;
  lastUpdatedAt: string;
  perex: string;
}

const Article: React.FC<ArticleProps> = React.memo(
  ({ imageId, lastUpdatedAt, perex, title, articleId }) => {
    const theme = useTheme();

    const articleLastUpdatedDate = useMemo(() => {
      const lastUpdatedDate = new Date(lastUpdatedAt);
      const days = `0${lastUpdatedDate.getDate()}`.slice(-2);
      const months = `0${lastUpdatedDate.getMonth() + 1}`.slice(-2);
      const years = lastUpdatedDate.getFullYear();
      return `${months}/${days}/${years}`;
    }, [lastUpdatedAt]);

    return (
      <ArticleWrapper
        to={generatePath(PATH_APP.article.editArticle, { articleId })}
      >
        <ArticleImageWrapper>
          <ServerImage imageId={imageId} />
        </ArticleImageWrapper>

        <ArticleContentWrapper
          flexDirection="column"
          gap={`${theme.spacing.common * 2}px`}
        >
          <Heading>{title}</Heading>
          {articleLastUpdatedDate}
          <Paragraph>{perex}</Paragraph>
        </ArticleContentWrapper>
      </ArticleWrapper>
    );
  },
);

Article.displayName = 'Article';
export default Article;
