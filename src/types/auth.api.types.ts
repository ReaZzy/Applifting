import { AuthApiTokenType } from '@src/types/enums/auth.api.enums';
import { z } from 'zod';

export interface AuthApiLoginQueryResult {
  access_token: string;
  expires_in: number;
  token_type: AuthApiTokenType;
}

export const loginFormValidationSchema = z.object({
  username: z
    .string({
      invalid_type_error: 'Username must be a string',
      required_error: 'Username is required field',
    })
    .min(2)
    .max(32),
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
      required_error: 'Password is required field',
    })
    .min(6)
    .max(32),
});

export type AuthApiLoginQuery = z.infer<typeof loginFormValidationSchema>;
