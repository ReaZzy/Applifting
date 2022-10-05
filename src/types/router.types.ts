type FunctionReturnString<T extends Array<unknown> = Array<any>> = (
  ...args: T
) => string;

type Path = Record<
  string,
  | string
  | FunctionReturnString
  | { [key: string]: Path | string | FunctionReturnString }
>;

export interface PathsAuth extends Path {
  root: string;
}

export interface PathsError extends Path {
  page404: string;
  page500: string;
}

export interface PathsApp extends Path {
  root: string;
}
