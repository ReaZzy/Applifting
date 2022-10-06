type FunctionReturnString<T extends Array<unknown> = Array<any>> = (
  ...args: T
) => string;

interface DirtyRoute<T extends Array<unknown> = Array<any>> {
  name: string;
  navigate: FunctionReturnString<T>;
}

type Path = Record<
  string,
  string | DirtyRoute | { [key: string]: Path | string | DirtyRoute }
>;

export interface PathsAuth extends Path {
  login: string;
}

export interface PathsError extends Path {
  page404: string;
  page500: string;
}

export interface PathsApp extends Path {
  root: string;
  blog: {
    root: string;
    blogView: DirtyRoute<[number]>;
    addBlog: string;
    editBlog: DirtyRoute<[number]>;
  };
  about: string;
}
