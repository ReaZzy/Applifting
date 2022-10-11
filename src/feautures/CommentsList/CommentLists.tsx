import React from 'react';
import { Flex, Title } from '@src/components/styled';
import { ArticleComment } from '@src/types/articles.api.types';

import Comment from './Comment/Comment';

interface CommentsListProps {
  comments: Array<ArticleComment>;
}

const CommentsList: React.FC<CommentsListProps> = React.memo(({ comments }) => {
  return (
    <Flex flexDirection="column">
      <Title>Comments</Title>
      {comments.map((comment) => (
        <Comment
          key={comment.commentId}
          commentId={comment.commentId}
          author={comment.author}
          content={comment.content}
          createdAt={comment.createdAt}
          score={comment.score}
        />
      ))}
    </Flex>
  );
});

CommentsList.displayName = 'CommentsList';
export default CommentsList;
