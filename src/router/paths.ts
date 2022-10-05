import { Path } from '@src/types/router.types';
import { getPathFromRoot } from '@src/utils/router.utils';

const ROUTER_ROOT_AUTH = process.env.ROOT_AUTH ?? '/auth';
const ROUTER_ROOT_APP = process.env.ROUTER_ROOT_APP ?? '/';

export const PATH_AUTH: Path = {
  root: getPathFromRoot(ROUTER_ROOT_AUTH, '/login'),
};

export const PATH_ERROR_PAGE: Path = {
  page404: '/404',
  page500: '/500',
};
export const PATH_APP: Path = {
  root: ROUTER_ROOT_APP,
};
