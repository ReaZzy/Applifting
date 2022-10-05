import React from 'react';
import { useRoutes } from 'react-router-dom';
import withSuspense from '@src/hocs/withSuspense';
import { PATH_APP } from '@src/router/paths';

const Homepage = withSuspense(React.lazy(() => import('@src/pages/Homepage')));

const Router: React.FC = () => {
  return useRoutes([
    {
      path: PATH_APP.root,
      element: <Homepage />,
    },
  ]);
};

export default Router;
