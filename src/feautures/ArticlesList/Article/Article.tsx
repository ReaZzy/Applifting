import React from 'react';
import { generatePath } from 'react-router-dom';
import ServerImage from '@src/components/ServerImage/ServerImage';
import {
  ArticleContentWrapper,
  ArticleImageWrapper,
  ArticleWrapper,
} from '@src/feautures/ArticlesList/Article/article.styles';
import { PATH_APP } from '@src/router/paths';
import { getFormattedDate } from '@src/utils/date.utils';
import { useTheme } from 'styled-components';

import { Heading, Paragraph } from '../../../components/styled';

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
    return (
      <ArticleWrapper
        to={generatePath(PATH_APP.article.articleView, { articleId })}
      >
        <ArticleImageWrapper>
          <ServerImage imageId={imageId} />
        </ArticleImageWrapper>

        <ArticleContentWrapper
          flexDirection="column"
          gap={`${theme.spacing.common * 2}px`}
        >
          <Heading>{title}</Heading>
          {getFormattedDate(lastUpdatedAt)}
          <Paragraph>{perex}</Paragraph>
        </ArticleContentWrapper>
      </ArticleWrapper>
    );
  },
);

Article.displayName = 'Article';
export default Article;
