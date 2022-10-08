import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@src/components/Button/Button';
import { Flex, Title } from '@src/components/styled';
import RHFTextField from '@src/components/TextField/RHFTextField';
import { CreateNewArticleFormWrapper } from '@src/feautures/CreateNewArticleForm/createNewArticleForm.styles';
import {
  CreateNewArticleQuery,
  createNewArticleValidationSchema,
} from '@src/types/articles.api.types';
import { ImagesAPIResponse } from '@src/types/images.api.types';
import { appAxios } from '@src/utils/axios';
import MarkdownEditor from '@uiw/react-markdown-editor';
import axios from 'axios';

const CreateNewArticleForm: React.FC = React.memo(() => {
  const {
    register,
    handleSubmit,
    resetField,
    setError,
    control,
    watch,
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
      const formData = new FormData();
      formData.append('image', image[0]);
      const res = await appAxios.post<ImagesAPIResponse>('/images', formData);
      await appAxios.post<CreateNewArticleQuery>('/articles', {
        perex,
        content,
        title,
        imageId: res.data[0]?.imageId,
      });
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

  const handleDeleteImage = () => {
    resetField('image');
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
      <input type="file" {...register('image')} />
      {watch('image') && <img src={URL.createObjectURL(watch('image')[0])} />}
      <Button primary={false} onClick={handleDeleteImage}>
        delete image
      </Button>
      <RHFTextField<CreateNewArticleQuery>
        name="perex"
        label="Article Perex"
        placeholder="My first article perex"
        errors={errors}
        register={register}
      />
      <Controller
        name="content"
        control={control}
        render={({ field: { value, onChange } }) => (
          <MarkdownEditor value={value} onChange={onChange} />
        )}
      />
    </CreateNewArticleFormWrapper>
  );
});

CreateNewArticleForm.displayName = 'CreateNewArticleForm';
export default CreateNewArticleForm;
