import { z } from 'zod';

const MAX_FILE_SIZE = 500000;
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const createNewArticleValidationSchema = z.object({
  perex: z
    .string({
      invalid_type_error: 'Perex must be a string',
      required_error: 'Perex is required field',
    })
    .min(2)
    .max(128),
  image: z
    .any()
    .optional()
    .refine(
      (file: File) => !file || file?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`,
    )
    .refine(
      (file: File) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
  title: z
    .string({
      invalid_type_error: 'Title must be a string',
      required_error: 'Title is required field',
    })
    .min(2)
    .max(64),
  content: z
    .string({
      invalid_type_error: 'Content must be a string',
      required_error: 'Content is required field',
    })
    .min(128),
});

export type CreateNewArticleQuery = z.infer<
  typeof createNewArticleValidationSchema
>;

export interface ArticleComment {
  commentId: string;
  articleId: string;
  author: string;
  content: string;
  createdAt: string;
  score: number;
}

export interface ArticleFull {
  articleId: string;
  title: string;
  perex: string;
  content: string;
  imageId: null | string;
  createdAt: string;
  lastUpdatedAt: string;
  comments: Array<ArticleComment>;
}

export type Article = Omit<ArticleFull, 'comments' | 'content'>;
