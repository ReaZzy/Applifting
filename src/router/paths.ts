import { PathsApp, PathsAuth, PathsError } from '@src/types/router.types';

const ROUTER_ROOT_APP = process.env.ROUTER_ROOT_APP ?? '/';

export const PATH_AUTH: PathsAuth = {
  login: '/login',
};

export const PATH_ERROR_PAGE: PathsError = {
  page404: '/404',
};

export const PATH_APP: PathsApp = {
  root: ROUTER_ROOT_APP,
  article: {
    root: '/article',
    articleView: {
      name: '/article/:articleId',
      navigate: (articleId) => `/blog/${articleId}`,
    },
    addArticle: '/article/add',
    editArticle: {
      name: '/article/:articleId/edit',
      navigate: (articleId) => `/article/${articleId}/edit`,
    },
  },
  about: '/about',
};
