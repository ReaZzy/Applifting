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
    {
      path: PATH_APP.blog.root,
      children: [
        {
          path: '',
          element: <Homepage />,
        },
        {
          path: PATH_APP.blog.blogView.name,
          element: <div>view blog</div>,
        },
        {
          path: PATH_APP.blog.addBlog,
          element: <div>add blog</div>,
        },
        {
          path: PATH_APP.blog.editBlog.name,
          element: <div>edit blog</div>,
        },
      ],
    },
  ]);
};

export default Router;
