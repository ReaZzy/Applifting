import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { uploadComment } from '@src/api/comments.api';
import Button from '@src/components/Button/Button';
import RHFTextField from '@src/components/TextField/RHFTextField';
import { CommentsFormWrapper } from '@src/feautures/CommentsForm/commentsForm.styles';
import {
  commentFormValidationSchema,
  CommentUploadQuery,
} from '@src/types/comments.api.types';
import axios from 'axios';

interface CommentsFormProps {
  articleId: string;
  author: string;
}

const CommentsForm: React.FC<CommentsFormProps> = ({ articleId, author }) => {
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
    },
  });

  const onSubmit: SubmitHandler<CommentUploadQuery> = async ({ comment }) => {
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
      <RHFTextField<CommentUploadQuery>
        name="comment"
        label="Comment"
        placeholder="Write your opinion"
        register={register}
        errors={errors}
      />
      <Button type="submit" isLoading={isSubmitting} disabled={!isDirty}>
        Upload
      </Button>
    </CommentsFormWrapper>
  );
};

CommentsForm.displayName = 'CommentsForm';
export default CommentsForm;
