import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '@src/store/api/auth.api';
import {
  accessTokenSelector,
  setAccessToken,
} from '@src/store/slices/auth.slice';
import { useTypedDispatch, useTypedSelector } from '@src/store/store.hooks';
import {
  AuthApiLoginQuery,
  loginFormValidationSchema,
} from '@src/types/auth.api.types';

const Login: React.FC = () => {
  const [login] = useLoginMutation();
  const auth = useTypedSelector(accessTokenSelector);
  const dispatch = useTypedDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthApiLoginQuery>({
    resolver: zodResolver(loginFormValidationSchema),
  });
  const onSubmit: SubmitHandler<AuthApiLoginQuery> = async ({
    username,
    password,
  }) => {
    const res = await login({ username, password }).unwrap();
    console.log(res.access_token);
    dispatch(setAccessToken(res.access_token));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue="test" {...register('username')} />
      {errors.username && <span>{errors.username.message}</span>}
      <input {...register('password')} />

      {errors.password && <span>{errors.password.message}</span>}
      <input type="submit" />
      {auth}
    </form>
  );
};

export default Login;
