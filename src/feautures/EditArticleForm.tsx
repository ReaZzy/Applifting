import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  patchArticleRequest,
  useArticleMoreInfoQuery,
} from '@src/api/articles.api';
import { createImageRequest, deleteImage, getImage } from '@src/api/images.api';
import Button from '@src/components/Button/Button';
import RHFFileInput from '@src/components/FileInput/RHFFileInput';
import RHFMarkdownEditor from '@src/components/MarkdownEditor/RHFMarkdownEditor';
import Spinner from '@src/components/Spinner/Spinner';
import { Flex, Title } from '@src/components/styled';
import RHFTextField from '@src/components/TextField/RHFTextField';
import { CreateNewArticleFormWrapper } from '@src/feautures/CreateNewArticleForm/createNewArticleForm.styles';
import {
  CreateNewArticleQuery,
  createNewArticleValidationSchema,
} from '@src/types/articles.api.types';
import axios from 'axios';

const EditArticleForm: React.FC = React.memo(() => {
  const [articleImage, setArticleImage] = useState<Blob | File | null>(null);
  const { articleId } = useParams<{ articleId: string }>() as {
    articleId: string;
  };
  const { isLoading, data } = useArticleMoreInfoQuery(articleId, {
    staleTime: Infinity,
  });

  const {
    register,
    handleSubmit,
    resetField,
    reset,
    setError,
    control,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CreateNewArticleQuery>({
    resolver: zodResolver(createNewArticleValidationSchema),
    criteriaMode: 'all',
  });

  useEffect(() => {
    (async () => {
      if (data?.data) {
        const { imageId, title, content, perex } = data.data;
        let image;
        if (imageId) {
          image = await getImage(imageId);
        }
        setArticleImage(image?.data ?? null);
        reset({
          image: image?.data ?? null,
          perex,
          title,
          content,
        });
      }
    })();
  }, [data?.data, reset]);

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

      const articleRes = await patchArticleRequest({
        perex,
        content,
        title,
        imageId: imageRes?.data[0]?.imageId,
        articleId,
      });
      toast(`Article ${articleId} was successfully updated!`, {
        type: 'success',
        toastId: `article-updated-${articleId}`,
      });
      if (
        data?.data?.imageId &&
        (articleRes?.data?.imageId !== data?.data?.imageId || !image)
      ) {
        await deleteImage(data.data.imageId, data?.data?.articleId);
      }
      reset({
        image: image ?? null,
        perex,
        title,
        content,
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

  if (isLoading) return <Spinner />;
  return (
    <CreateNewArticleFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Flex gap="32px" alignItems="center">
        <Title>Edit article</Title>
        <Button
          type="submit"
          isLoading={isSubmitting}
          // NOTE FOR REVIEW: as I understood react-hook-form shallowEqual always
          // returns true for files, so we need to check it separately
          disabled={!isDirty && watch('image') === articleImage}
        >
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

EditArticleForm.displayName = 'EditArticleForm';
export default EditArticleForm;
