import React, { useEffect } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useArticleDelete } from '@src/api/articles.api';
import Button from '@src/components/Button/Button';
import { Flex } from '@src/components/styled';
import { PATH_APP } from '@src/router/paths';
import { Article } from '@src/types/articles.api.types';
import { getFormattedDate } from '@src/utils/date.utils';
import { useTheme } from 'styled-components';

const ArticleAdmin: React.FC<Omit<Article, 'imageId'>> = ({
  articleId,
  createdAt,
  lastUpdatedAt,
  title,
  perex,
}) => {
  const theme = useTheme();
  const { isLoading, mutateAsync, isSuccess } = useArticleDelete(articleId);

  const handleDeleteArticle = async () => {
    await mutateAsync(articleId);
  };

  useEffect(() => {
    if (isSuccess) {
      toast('Article deleted successfully', {
        type: 'success',
        toastId: `${articleId}-delete-success`,
      });
    }
  }, [articleId, isSuccess]);

  return (
    <tr>
      <td>{articleId}</td>
      <td>{getFormattedDate(createdAt)}</td>
      <td>{getFormattedDate(lastUpdatedAt)}</td>
      <td>{title}</td>
      <td>{perex}</td>
      <td>
        <Flex gap={`${theme.spacing.common}px`}>
          <Link to={generatePath(PATH_APP.article.editArticle, { articleId })}>
            <Button>Edit</Button>
          </Link>
          <Button
            onClick={handleDeleteArticle}
            isLoading={isLoading}
            primary={false}
          >
            Delete
          </Button>
        </Flex>
      </td>
    </tr>
  );
};

ArticleAdmin.displayName = 'ArticleAdmin';
export default ArticleAdmin;
