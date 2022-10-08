type FunctionReturnString<T extends Array<unknown> = Array<any>> = (
  ...args: T
) => string;

interface DirtyRoute<T extends Array<unknown> = Array<any>> {
  name: string;
  navigate: FunctionReturnString<T>;
}

export type RoutePath = Record<
  string,
  string | DirtyRoute | { [key: string]: RoutePath | string | DirtyRoute }
>;

export interface PathsAuth extends RoutePath {
  login: string;
}

export interface PathsError extends RoutePath {
  page404: string;
}

export interface PathsApp extends RoutePath {
  root: string;
  article: {
    root: string;
    articleView: DirtyRoute<[number]>;
    addArticle: string;
    editArticle: DirtyRoute<[number]>;
  };
  about: string;
}
