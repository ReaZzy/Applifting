import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH_AUTH } from '@src/router/paths';
import { accessTokenSelector } from '@src/store/slices/auth.slice';
import { useTypedSelector } from '@src/store/store.hooks';

interface AuthGuardProps {
  children?: React.ReactElement;
  redirectPath?: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ redirectPath, children }) => {
  const location = useLocation();
  const accessToken = useTypedSelector(accessTokenSelector);
  if (!accessToken) {
    toast('You must be authorized to view this page', {
      type: 'error',
      toastId: 'redirect-no-auth',
    });
    return (
      <Navigate
        to={redirectPath ?? PATH_AUTH.login}
        replace
        state={{ ...location.state, from: location.pathname }}
      />
    );
  }
  return children || <Outlet />;
};

export default AuthGuard;
