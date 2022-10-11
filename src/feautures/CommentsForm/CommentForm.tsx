import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { uploadComment } from '@src/api/comments.api';
import Button from '@src/components/Button/Button';
import { Flex } from '@src/components/styled';
import RHFTextField from '@src/components/TextField/RHFTextField';
import { CommentsFormWrapper } from '@src/feautures/CommentsForm/commentsForm.styles';
import {
  commentFormValidationSchema,
  CommentUploadQuery,
} from '@src/types/comments.api.types';
import axios from 'axios';
import { useTheme } from 'styled-components';

interface CommentsFormProps {
  articleId: string;
}

const CommentsForm: React.FC<CommentsFormProps> = ({ articleId }) => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CommentUploadQuery>({
    resolver: zodResolver(commentFormValidationSchema),
    criteriaMode: 'all',
    defaultValues: {
      comment: '',
      author: '',
    },
  });

  const onSubmit: SubmitHandler<CommentUploadQuery> = async ({
    comment,
    author,
  }) => {
    try {
      await uploadComment({
        content: comment,
        articleId,
        author,
      });
      reset();
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        setError(
          'comment',
          {
            type: 'server',
            message: error.response?.data?.message ?? 'Something went wrong',
          },
          { shouldFocus: true },
        );
      }
    }
  };

  return (
    <CommentsFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDirection="column" gap={`${theme.spacing.common * 2}px`}>
        <RHFTextField<CommentUploadQuery>
          name="author"
          label="Author"
          placeholder="Write your name"
          register={register}
          errors={errors}
        />
        <RHFTextField<CommentUploadQuery>
          name="comment"
          label="Comment"
          placeholder="Write your opinion"
          register={register}
          errors={errors}
        />
      </Flex>

      <Button type="submit" isLoading={isSubmitting} disabled={!isDirty}>
        Upload
      </Button>
    </CommentsFormWrapper>
  );
};

CommentsForm.displayName = 'CommentsForm';
export default CommentsForm;
