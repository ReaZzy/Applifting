import React, { useEffect, useState } from 'react';
import { voteDownComment, voteUpComment } from '@src/api/comments.api';
import Button from '@src/components/Button/Button';
import { Flex, Heading, Paragraph } from '@src/components/styled';
import { accessTokenSelector } from '@src/store/slices/auth.slice';
import { useTypedSelector } from '@src/store/store.hooks';
import { ArticleComment } from '@src/types/articles.api.types';
import { getFormattedDate } from '@src/utils/date.utils';

type CommentProps = Omit<ArticleComment, 'articleId'>;

const Comment: React.FC<CommentProps> = React.memo(
  ({ commentId, author, content, createdAt, score }) => {
    const isAuth = useTypedSelector(accessTokenSelector);
    const [commentScore, setCommentScore] = useState<number>(score);

    useEffect(() => {
      setCommentScore(score);
    }, [score]);

    const handleVoteUpComment = async () => {
      const response = await voteUpComment(commentId);
      if (response) {
        setCommentScore(response.data.score);
      }
    };

    const handleVoteDownComment = async () => {
      const response = await voteDownComment(commentId);
      if (response) {
        setCommentScore(response.data.score);
      }
    };

    return (
      <Flex flexDirection="column">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading>{author}</Heading>
          <Paragraph>{getFormattedDate(createdAt)}</Paragraph>
        </Flex>
        <Paragraph>{content}</Paragraph>
        <Flex justifyContent="center" alignItems="center">
          {isAuth && <Button onClick={handleVoteDownComment}>Dislike</Button>}
          <div>{commentScore}</div>
          {isAuth && <Button onClick={handleVoteUpComment}>Like</Button>}
        </Flex>
      </Flex>
    );
  },
);

Comment.displayName = 'Comment';
export default Comment;
