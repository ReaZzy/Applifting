import React from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';
import { PATH_APP } from '@src/router/paths';
import { accessTokenSelector } from '@src/store/slices/auth.slice';
import { useTypedSelector } from '@src/store/store.hooks';

interface GoBackFromAuthGuardProps {
  children?: React.ReactElement;
}

const GuestGuard: React.FC<GoBackFromAuthGuardProps> = ({ children }) => {
  const accessToken = useTypedSelector(accessTokenSelector);

  if (accessToken) {
    if (window.history.length > 0) {
      // react-router-dom v6 types problem
      return <Navigate to={-1 as To} replace />;
    }
    return <Navigate to={PATH_APP.root} replace />;
  }
  return children || <Outlet />;
};

export default GuestGuard;
