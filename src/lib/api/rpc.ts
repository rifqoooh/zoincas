import type {
  AuthType,
  BalancesType,
  BudgetPlansType,
  CategoriesType,
  TransactionsType,
} from '@/app/api/[[...route]]/route';

import { hc } from 'hono/client';

import { env } from '@/env';

export const admin = hc<AuthType>(env().NEXT_PUBLIC_APP_URL);
export const transactions = hc<TransactionsType>(env().NEXT_PUBLIC_APP_URL);
export const balances = hc<BalancesType>(env().NEXT_PUBLIC_APP_URL);
export const categories = hc<CategoriesType>(env().NEXT_PUBLIC_APP_URL);
export const budgetPlans = hc<BudgetPlansType>(env().NEXT_PUBLIC_APP_URL);

export const api = {
  ...admin.api,
  ...transactions.api,
  ...balances.api,
  ...categories.api,
  ...budgetPlans.api,
};
