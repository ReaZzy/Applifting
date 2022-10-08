import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { PATH_APP } from '@src/router/paths';
import { accessTokenSelector } from '@src/store/slices/auth.slice';
import { useTypedSelector } from '@src/store/store.hooks';

interface GoBackFromAuthGuardProps {
  children?: React.ReactElement;
}

const GuestGuard: React.FC<GoBackFromAuthGuardProps> = ({ children }) => {
  const location = useLocation();
  const accessToken = useTypedSelector(accessTokenSelector);

  if (accessToken) {
    return (
      <Navigate
        to={location.state?.from ?? PATH_APP.root}
        replace
        state={{ ...location.state, from: location.pathname }}
      />
    );
  }
  return children || <Outlet />;
};

export default GuestGuard;
