import { z } from 'zod';

export const commentFormValidationSchema = z.object({
  comment: z
    .string({
      invalid_type_error: 'Comment must be a string',
      required_error: 'Comment is required',
    })
    .min(2)
    .max(256),
});

export type CommentUploadQuery = z.infer<typeof commentFormValidationSchema>;
