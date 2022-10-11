import React from 'react';
import { useRoutes } from 'react-router-dom';
import AuthGuard from '@src/guards/AuthGuard';
import GuestGuard from '@src/guards/GuestGuard';
import withSuspense from '@src/hocs/withSuspense';
import DefaultLayout from '@src/layouts/defaultLayout/Default.layout';
import { PATH_APP, PATH_AUTH, PATH_ERROR_PAGE } from '@src/router/paths';

const Homepage = withSuspense(React.lazy(() => import('@src/pages/Homepage')));
const Login = withSuspense(React.lazy(() => import('@src/pages/Login/Login')));
const CreateNewArticle = withSuspense(
  React.lazy(() => import('@src/pages/CreateNewArticle/CreateNewArticle')),
);
const EditArticle = withSuspense(
  React.lazy(() => import('@src/pages/EditArticle/EditArticle')),
);
const ArticleView = withSuspense(
  React.lazy(() => import('@src/pages/ArticleView/ArticleView')),
);
const ArticlesAdmin = withSuspense(
  React.lazy(() => import('@src/pages/ArticlesAdmin')),
);
const NotFound = withSuspense(React.lazy(() => import('@src/pages/NotFound')));

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
              element: <ArticleView />,
            },

            {
              element: <AuthGuard />,
              children: [
                {
                  index: true,
                  element: <ArticlesAdmin />,
                },
                {
                  path: PATH_APP.article.addArticle,
                  element: <CreateNewArticle />,
                },
                {
                  path: PATH_APP.article.editArticle,
                  element: <EditArticle />,
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
        { path: PATH_ERROR_PAGE.page404, element: <NotFound /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]);

export default AppRouter;
