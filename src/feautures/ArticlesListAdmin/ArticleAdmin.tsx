import React, { useMemo } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useArticleDelete } from '@src/api/articles.api';
import Button from '@src/components/Button/Button';
import { Flex } from '@src/components/styled';
import { PATH_APP } from '@src/router/paths';
import { Article } from '@src/types/articles.api.types';
import { getFormattedDate } from '@src/utils/date.utils';
import { useTheme } from 'styled-components';

type ArticleAdminProps = {
  checkedArticles: Array<string>;
  setCheckedArticles: React.Dispatch<Array<string>>;
} & Omit<Article, 'imageId'>;

const ArticleAdmin: React.FC<ArticleAdminProps> = React.memo(
  ({
    articleId,
    createdAt,
    lastUpdatedAt,
    title,
    perex,
    setCheckedArticles,
    checkedArticles,
  }) => {
    const theme = useTheme();
    const { isLoading, mutateAsync } = useArticleDelete();

    const isChecked = useMemo(
      () => checkedArticles.includes(articleId),
      [articleId, checkedArticles],
    );

    const handleDeleteArticle = async () => {
      const res = await mutateAsync(articleId);
      if (res.status.toString().startsWith('2')) {
        toast(`Article ${articleId} deleted successfully`, {
          type: 'success',
          toastId: `${articleId}-delete-success`,
        });
      }
    };
    const handleCheck = () => {
      if (isChecked) {
        return setCheckedArticles(
          checkedArticles.filter((article) => article !== articleId),
        );
      }
      setCheckedArticles([...checkedArticles, articleId]);
    };

    return (
      <tr>
        <td>
          <Button primary={isChecked} onClick={handleCheck}>
            {isChecked ? 'Unselect' : 'Select'}
          </Button>
        </td>
        <td>{articleId}</td>
        <td>{getFormattedDate(createdAt)}</td>
        <td>{getFormattedDate(lastUpdatedAt)}</td>
        <td>{title}</td>
        <td>{perex}</td>
        <td>
          <Flex gap={`${theme.spacing.common}px`}>
            <Link
              to={generatePath(PATH_APP.article.editArticle, { articleId })}
            >
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
  },
);

ArticleAdmin.displayName = 'ArticleAdmin';
export default ArticleAdmin;
