export type RoutePath = Record<
  string,
  string | { [key: string]: RoutePath | string }
>;

// NOTE FOR REVIEW: I separated it for 3 different paths objects for readability
// reasons

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
    articleView: string;
    addArticle: string;
    editArticle: string;
  };
  about: string;
}
