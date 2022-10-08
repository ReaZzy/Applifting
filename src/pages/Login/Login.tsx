import React from 'react';
import LoginForm from '@src/feautures/LoginForm/LoginForm';
import { FormWrapper } from '@src/pages/Login/loginPage.styles';

const Login: React.FC = () => {
  return (
    <FormWrapper>
      <LoginForm />
    </FormWrapper>
  );
};

export default Login;
