import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '@src/api/auth.api';
import Button from '@src/components/Button/Button';
import { Card, Heading } from '@src/components/styled';
import RHFTextField from '@src/components/TextField/RHFTextField';
import {
  LoginFormButtonWrapper,
  LoginFormInputsWrapper,
  LoginFormWrapper,
} from '@src/feautures/LoginForm/loginFormStyles';
import { setAccessToken } from '@src/store/slices/auth.slice';
import { useTypedDispatch } from '@src/store/store.hooks';
import {
  AuthApiLoginQuery,
  loginFormValidationSchema,
} from '@src/types/auth.api.types';
import axios from 'axios';

const LoginForm: React.FC = React.memo(() => {
  const { mutateAsync } = useLoginMutation();
  const dispatch = useTypedDispatch();

  const {
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<AuthApiLoginQuery>({
    resolver: zodResolver(loginFormValidationSchema),
    criteriaMode: 'all',
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
    <Card>
      <LoginFormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Heading>Login Form</Heading>
        <LoginFormInputsWrapper>
          <RHFTextField<AuthApiLoginQuery>
            name="username"
            label="username"
            errors={errors}
            register={register}
          />
          <RHFTextField<AuthApiLoginQuery>
            name="password"
            label="password"
            type="password"
            errors={errors}
            register={register}
          />
        </LoginFormInputsWrapper>

        <LoginFormButtonWrapper>
          <Button type="submit" isLoading={isSubmitting} disabled={!isDirty}>
            Submit
          </Button>
        </LoginFormButtonWrapper>
      </LoginFormWrapper>
    </Card>
  );
});

LoginForm.displayName = 'LoginForm';
export default LoginForm;
