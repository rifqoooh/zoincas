import { selectTransactionsSchema } from '@/validators/db/transactions';
import { zodEnumFromZodObject } from '@/validators/utilities';
import { z } from 'zod';
import { createRoute } from './create-route';
import { replaceSpaceString } from './utilities';

export const rootSearchParams = z.object({
  url: z.string().optional(),
});

export const signInSearchParams = z.object({
  callbackURL: z.string().optional(),
});

export const dashboardSearchParams = z.object({
  startDate: z.coerce.number().optional(),
  endDate: z.coerce.number().optional(),
  balance: z.string().optional(),
});

export const transactionsSearchParams = z.object({
  page: z.coerce.number().int().positive().optional(),
  perPage: z.coerce.number().int().positive().optional(),
  sort: z
    .object({
      id: zodEnumFromZodObject(selectTransactionsSchema),
      desc: z.boolean(),
    })
    .array()
    .transform((val) => JSON.stringify(val))
    .optional(),
  description: z
    .string()
    .transform((val) => replaceSpaceString(val))
    .optional(),
  balance: z
    .string()
    .uuid()
    .array()
    .transform((val) => val.join(','))
    .optional(),
  category: z
    .string()
    .uuid()
    .array()
    .transform((val) => val.join(','))
    .optional(),
  budget: z
    .string()
    .uuid()
    .array()
    .transform((val) => val.join(','))
    .optional(),
  datetime: z.coerce
    .number()
    .array()
    .max(2)
    .transform((val) => val.join(','))
    .optional(),
});

export const Routes = {
  root: createRoute(() => '/'),
  signIn: createRoute(() => '/sign-in'),
  signUp: createRoute(() => '/sign-up'),
  dashboard: createRoute(
    () => '/dashboard',
    z.object({}),
    dashboardSearchParams
  ),
  balances: createRoute(() => '/balances'),
  categories: createRoute(() => '/categories'),
  transactions: createRoute(
    () => '/transactions',
    z.object({}),
    transactionsSearchParams
  ),
  budgets: createRoute(() => '/budgets'),
};
