import { selectTransactionsSchema } from '@/validators/db/transactions';
import { zodEnumFromZodObject } from '@/validators/utilities';
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
  signUp: createRoute(() => '/sign-up'),
  dashboard: createRoute(
    () => '/dashboard',
    z.object({
      startDate: z.coerce.number().optional(),
      endDate: z.coerce.number().optional(),
      balance: z.string().optional(),
    })
  ),
  balances: createRoute(() => '/balances'),
  categories: createRoute(() => '/categories'),
  transactions: createRoute(
    () => '/transactions',
    z.object({
      page: z.coerce.number().int().positive().optional(),
      perPage: z.coerce.number().int().positive().optional(),
      sort: z
        .object({
          id: zodEnumFromZodObject(selectTransactionsSchema),
          desc: z.boolean(),
        })
        .array()
        .optional(),
      description: z.string().optional(),
      balance: z.string().array().optional(),
      category: z.string().array().optional(),
      budget: z.string().array().optional(),
      datetime: z.coerce.number().array().max(2).optional(),
    })
  ),
  budgets: createRoute(() => '/budgets'),
};
