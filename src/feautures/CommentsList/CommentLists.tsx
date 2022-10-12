import React, { useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import { Flex, Title } from '@src/components/styled';
import { ArticleComment } from '@src/types/articles.api.types';

import Comment from './Comment';

interface CommentsListProps {
  comments: Array<ArticleComment>;
}

const CommentsList: React.FC<CommentsListProps> = React.memo(({ comments }) => {
  const getComments = useMemo(
    () =>
      comments.map((comment) => (
        <Comment
          key={comment.commentId}
          commentId={comment.commentId}
          author={comment.author}
          content={comment.content}
          createdAt={comment.createdAt}
          score={comment.score}
        />
      )),
    [comments],
  );
  return (
    <Flex flexDirection="column">
      <Title>Comments</Title>
      {getComments}
    </Flex>
  );
});

CommentsList.displayName = 'CommentsList';
export default CommentsList;
