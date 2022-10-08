import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '@src/api/auth.api';
import RHFTextField from '@src/components/TextField/RHFTextField';
import { setAccessToken } from '@src/store/slices/auth.slice';
import { useTypedDispatch } from '@src/store/store.hooks';
import {
  AuthApiLoginQuery,
  loginFormValidationSchema,
} from '@src/types/auth.api.types';

const LoginForm: React.FC = React.memo(() => {
  const { mutateAsync, error } = useLoginMutation();
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
    const res = await mutateAsync({ username, password });
    if (res.status.toString().startsWith('2')) {
      dispatch(setAccessToken(res.data.access_token));
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <button type="submit">Submit</button>
    </form>
  );
});

LoginForm.displayName = 'LoginForm';
export default LoginForm;
