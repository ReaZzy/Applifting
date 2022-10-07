export interface ArticlesApiQueryResult {
  articleId: string;
  title: string;
  perex: string;
  imageUrl: string;
  createdAt: string;
  lastUpdatedAt: string;
}

export interface Comment {
  commentId: string;
  articleId: string;
  author: string;
  content: string;
  postedAt: string;
  score: number;
}

export interface ArticleFull extends ArticlesApiQueryResult {
  content: string;
}
