import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import withSuspense from '@src/hocs/withSuspense';
import DefaultLayout from '@src/layouts/Default.layout';
import { PATH_APP, PATH_AUTH } from '@src/router/paths';

const Homepage = withSuspense(React.lazy(() => import('@src/pages/Homepage')));

export const appRouter = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
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
            children: [
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
        ],
      },
      { path: PATH_APP.about, element: <div>about</div> },
      {
        path: PATH_AUTH.login,
        element: (
          <div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
            <div>login</div>
          </div>
        ),
      },
    ],
  },
]);
