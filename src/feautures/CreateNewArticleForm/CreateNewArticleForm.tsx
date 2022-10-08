import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '@src/api/auth.api';
import Button from '@src/components/Button/Button';
import { Flex, Title } from '@src/components/styled';
import RHFTextField from '@src/components/TextField/RHFTextField';
import { CreateNewArticleFormWrapper } from '@src/feautures/CreateNewArticleForm/createNewArticleForm.styles';
import { setAccessToken } from '@src/store/slices/auth.slice';
import { useTypedDispatch } from '@src/store/store.hooks';
import {
  AuthApiLoginQuery,
  loginFormValidationSchema,
} from '@src/types/auth.api.types';
import axios from 'axios';
import { Editor, EditorState } from 'draft-js';

import 'draft-js/dist/Draft.css';

const CreateNewArticleForm: React.FC = React.memo(() => {
  const { mutateAsync } = useLoginMutation();
  const dispatch = useTypedDispatch();

  const {
    register,
    handleSubmit,
    resetField,
    setError,
    watch,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<AuthApiLoginQuery>({
    resolver: zodResolver(loginFormValidationSchema),
    criteriaMode: 'all',
    defaultValues: {
      password: EditorState.createEmpty(),
    },
  });

  const onSubmit: SubmitHandler<AuthApiLoginQuery> = async ({
    username,
    password,
  }) => {
    try {
      const res = await mutateAsync({ username, password });
      if (res.status.toString().startsWith('2')) {
        return dispatch(setAccessToken(res.data.access_token));
      }
    } catch (err) {
      resetField('password');

      if (err instanceof axios.AxiosError) {
        setError(
          'password',
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
        <Button type="submit">Publish article</Button>
      </Flex>

      <RHFTextField<AuthApiLoginQuery>
        name="title"
        label="Article Title"
        placeholder="My first article"
        errors={errors}
        register={register}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Editor editorState={value} onChange={onChange} />
        )}
      />
    </CreateNewArticleFormWrapper>
  );
});

CreateNewArticleForm.displayName = 'CreateNewArticleForm';
export default CreateNewArticleForm;
