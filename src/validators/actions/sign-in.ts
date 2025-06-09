import { requiredString } from '@/validators/utilities';
import { z } from 'zod/v4';

export const signInSchema = z.object({
  email: requiredString.email('Invalid email address'),
  password: requiredString
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at most 64 characters'),
});

export type SignInType = z.infer<typeof signInSchema>;

export const SignInOutputSchema = z.object({
  redirect: z.boolean(),
  token: z.string(),
  url: z.string().optional(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
    image: z.string().nullable().optional(),
    emailVerified: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
});

export type SignInOutputType = z.infer<typeof SignInOutputSchema>;
