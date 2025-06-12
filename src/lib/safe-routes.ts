import { z } from 'zod';
import { createRoute } from './create-route';

export const RootSearchParams = z.object({
  url: z.string().optional(),
});

export const SignInSearchParams = z.object({
  callbackURL: z.string().optional(),
});

export const Routes = {
  root: createRoute(() => '/', z.object({}), RootSearchParams),
  signIn: createRoute(() => '/sign-in', z.object({}), SignInSearchParams),
};
