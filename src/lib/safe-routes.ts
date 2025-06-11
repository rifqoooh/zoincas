import { z } from 'zod';
import { createRoute } from './create-route';

export const SignInSearchParams = z.object({
  callbackURL: z.string().optional(),
});

export const Routes = {
  root: createRoute(() => '/'),
  signIn: createRoute(() => '/sign-in', z.object({}), SignInSearchParams),
};
