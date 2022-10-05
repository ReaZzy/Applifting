type FunctionReturnString = <T extends Array<string | number>>(
  ...args: T
) => string;

export type Path = Record<
  string,
  | string
  | FunctionReturnString
  | { [key: string]: Path | string | FunctionReturnString }
>;
