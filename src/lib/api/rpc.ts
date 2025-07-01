import type {
  AuthType,
  BalancesType,
  BudgetPlansType,
  CategoriesType,
  TransactionsType,
} from '@/app/api/[[...route]]/route';

import { hc } from 'hono/client';

import { env } from '@/env';

export const admin = hc<AuthType>(env().NEXT_PUBLIC_APP_URL).api;
export const transactions = hc<TransactionsType>(env().NEXT_PUBLIC_APP_URL).api
  .transactions;
export const balances = hc<BalancesType>(env().NEXT_PUBLIC_APP_URL).api
  .balances;
export const categories = hc<CategoriesType>(env().NEXT_PUBLIC_APP_URL).api
  .categories;
export const budgetPlans = hc<BudgetPlansType>(env().NEXT_PUBLIC_APP_URL).api[
  'budget-plans'
];
