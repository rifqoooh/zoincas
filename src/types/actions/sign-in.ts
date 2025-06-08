import type {
  SignInOutputSchema,
  signInSchema,
} from '@/validators/actions/sign-in';
import type { z } from 'zod/v4';

export type SignInType = z.infer<typeof signInSchema>;
export type SignInOutputType = z.infer<typeof SignInOutputSchema>;
