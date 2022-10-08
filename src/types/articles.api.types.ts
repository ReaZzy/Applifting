import { z } from 'zod';

export const createNewArticleValidationSchema = z.object({
  perex: z
    .string({
      invalid_type_error: 'Username must be a string',
      required_error: 'Username is required field',
    })
    .min(2)
    .max(32),
  image: z.any(),
  title: z
    .string({
      invalid_type_error: 'Username must be a string',
      required_error: 'Username is required field',
    })
    .min(2)
    .max(32),
  content: z
    .string({
      invalid_type_error: 'Password must be a string',
      required_error: 'Password is required field',
    })
    .min(6)
    .max(32),
});

export type CreateNewArticleQuery = z.infer<
  typeof createNewArticleValidationSchema
>;
