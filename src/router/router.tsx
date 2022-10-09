import React from 'react';
import { useRoutes } from 'react-router-dom';
import AuthGuard from '@src/guards/AuthGuard';
import GuestGuard from '@src/guards/GuestGuard';
import withSuspense from '@src/hocs/withSuspense';
import DefaultLayout from '@src/layouts/defaultLayout/Default.layout';
import { PATH_APP, PATH_AUTH } from '@src/router/paths';

const Homepage = withSuspense(React.lazy(() => import('@src/pages/Homepage')));
const Login = withSuspense(React.lazy(() => import('@src/pages/Login/Login')));
const CreateNewArticle = withSuspense(
  React.lazy(() => import('@src/pages/CreateNewArticle/CreateNewArticle')),
);

const AppRouter: React.FC = () =>
  useRoutes([
    {
      element: <DefaultLayout />,
      children: [
        {
          path: PATH_APP.root,
          element: <Homepage />,
        },
        {
          path: PATH_APP.article.root,
          children: [
            {
              path: PATH_APP.article.articleView,
              element: <div>view blog</div>,
            },

            {
              element: <AuthGuard />,
              children: [
                {
                  index: true,
                  element: <div>My articles</div>,
                },
                {
                  path: PATH_APP.article.addArticle,
                  element: <CreateNewArticle />,
                },
                {
                  path: PATH_APP.article.editArticle,
                  element: <div>edit blog</div>,
                },
              ],
            },
          ],
        },
        { path: PATH_APP.about, element: <div>about</div> },
        {
          element: <GuestGuard />,
          children: [
            {
              path: PATH_AUTH.login,
              element: <Login />,
            },
          ],
        },
      ],
    },
  ]);

export default AppRouter;
