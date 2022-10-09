import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { generatePath, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { createArticleRequest } from '@src/api/articles.api';
import { createImageRequest } from '@src/api/images.api';
import Button from '@src/components/Button/Button';
import RHFFileInput from '@src/components/FileInput/RHFFileInput';
import RHFMarkdownEditor from '@src/components/MarkdownEditor/RHFMarkdownEditor';
import { Flex, Title } from '@src/components/styled';
import RHFTextField from '@src/components/TextField/RHFTextField';
import { CreateNewArticleFormWrapper } from '@src/feautures/CreateNewArticleForm/createNewArticleForm.styles';
import { PATH_APP } from '@src/router/paths';
import {
  CreateNewArticleQuery,
  createNewArticleValidationSchema,
} from '@src/types/articles.api.types';
import axios from 'axios';

const CreateNewArticleForm: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    resetField,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateNewArticleQuery>({
    resolver: zodResolver(createNewArticleValidationSchema),
    criteriaMode: 'all',
  });

  const onSubmit: SubmitHandler<CreateNewArticleQuery> = async ({
    perex,
    content,
    title,
    image,
  }) => {
    try {
      let imageRes;
      if (image instanceof File) {
        imageRes = await createImageRequest(image);
      }
      const articleResponse = await createArticleRequest({
        perex,
        content,
        title,
        imageId: imageRes?.data[0]?.imageId,
      });
      navigate(
        generatePath(PATH_APP.article.editArticle, {
          articleId: articleResponse.data?.articleId,
        }),
      );
    } catch (err) {
      resetField('title');

      if (err instanceof axios.AxiosError) {
        setError(
          'title',
          {
            type: 'server',
            message: err.response?.data?.message ?? 'Something went wrong',
          },
          { shouldFocus: true },
        );
      }
    }
  };

  return (
    <CreateNewArticleFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Flex gap="32px" alignItems="center">
        <Title>Create new article</Title>
        <Button type="submit" isLoading={isSubmitting}>
          Publish article
        </Button>
      </Flex>

      <RHFTextField<CreateNewArticleQuery>
        name="title"
        label="Article Title"
        placeholder="My first article"
        errors={errors}
        register={register}
      />
      <RHFFileInput<CreateNewArticleQuery>
        name="image"
        label="Featured image"
        resetField={resetField}
        control={control}
      />

      <RHFTextField<CreateNewArticleQuery>
        name="perex"
        label="Article Perex"
        placeholder="My first article perex"
        errors={errors}
        register={register}
      />
      <RHFMarkdownEditor<CreateNewArticleQuery>
        name="content"
        label="Content"
        control={control}
      />
    </CreateNewArticleFormWrapper>
  );
});

CreateNewArticleForm.displayName = 'CreateNewArticleForm';
export default CreateNewArticleForm;
