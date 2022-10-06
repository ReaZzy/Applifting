import { PathsApp, PathsAuth, PathsError } from '@src/types/router.types';

const ROUTER_ROOT_APP = process.env.ROUTER_ROOT_APP ?? '/';

export const PATH_AUTH: PathsAuth = {
  login: '/login',
};

export const PATH_ERROR_PAGE: PathsError = {
  page404: '/404',
  page500: '/500',
};

export const PATH_APP: PathsApp = {
  root: ROUTER_ROOT_APP,
  blog: {
    root: '/blog',
    blogView: {
      name: '/blog/:blogId',
      navigate: (blogId) => `/blog/${blogId}`,
    },
    addBlog: '/blog/add',
    editBlog: {
      name: '/blog/:blogId/edit',
      navigate: (blogId) => `/blog/${blogId}/edit`,
    },
  },
  about: '/about',
};
